import { Socket } from 'socket.io-client';
import { Worker } from 'worker_threads';
import path from 'path';
import { EventEmitter } from 'events';

export interface BatchJob {
  id: string;
  files: File[];
  type: 'upload' | 'process' | 'export';
  options: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: any;
  error?: string;
}

export class BatchProcessor extends EventEmitter {
  private jobs: Map<string, BatchJob> = new Map();
  private workers: Worker[] = [];
  private maxWorkers: number;
  private socket?: Socket;

  constructor(options: { maxWorkers?: number; socket?: Socket }) {
    super();
    this.maxWorkers = options.maxWorkers || navigator.hardwareConcurrency || 4;
    this.socket = options.socket;
  }

  async addJob(job: Omit<BatchJob, 'status' | 'progress'>): Promise<string> {
    const newJob: BatchJob = {
      ...job,
      status: 'pending',
      progress: 0,
    };

    this.jobs.set(newJob.id, newJob);
    this.emit('jobAdded', newJob);
    this.processNextJob();

    return newJob.id;
  }

  private async processNextJob() {
    if (this.workers.length >= this.maxWorkers) return;

    const pendingJob = Array.from(this.jobs.values()).find(
      job => job.status === 'pending'
    );
    if (!pendingJob) return;

    pendingJob.status = 'processing';
    this.emit('jobStarted', pendingJob);

    const worker = new Worker(path.resolve(__dirname, 'batchWorker.js'), {
      workerData: {
        job: pendingJob,
      },
    });

    this.workers.push(worker);

    worker.on('message', (message: { type: string; data: any }) => {
      switch (message.type) {
        case 'progress':
          this.updateJobProgress(pendingJob.id, message.data);
          break;
        case 'complete':
          this.completeJob(pendingJob.id, message.data);
          break;
        case 'error':
          this.failJob(pendingJob.id, message.data);
          break;
      }
    });

    worker.on('error', (error) => {
      this.failJob(pendingJob.id, error.message);
    });

    worker.on('exit', () => {
      this.workers = this.workers.filter(w => w !== worker);
      this.processNextJob();
    });
  }

  private updateJobProgress(jobId: string, progress: number) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.progress = progress;
    this.emit('jobProgress', job);
    
    if (this.socket) {
      this.socket.emit('job_progress', { jobId, progress });
    }
  }

  private completeJob(jobId: string, result: any) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = 'completed';
    job.progress = 100;
    job.result = result;
    
    this.emit('jobCompleted', job);
    
    if (this.socket) {
      this.socket.emit('job_completed', { jobId, result });
    }
  }

  private failJob(jobId: string, error: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = 'failed';
    job.error = error;
    
    this.emit('jobFailed', job);
    
    if (this.socket) {
      this.socket.emit('job_failed', { jobId, error });
    }
  }

  getJob(jobId: string): BatchJob | undefined {
    return this.jobs.get(jobId);
  }

  getAllJobs(): BatchJob[] {
    return Array.from(this.jobs.values());
  }

  cancelJob(jobId: string): boolean {
    const job = this.jobs.get(jobId);
    if (!job || job.status !== 'processing') return false;

    const worker = this.workers.find(
      w => (w as any).workerData?.job.id === jobId
    );
    if (worker) {
      worker.terminate();
      this.failJob(jobId, 'Job cancelled by user');
      return true;
    }

    return false;
  }

  async cleanup(olderThan?: Date) {
    const threshold = olderThan || new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    for (const [jobId, job] of this.jobs.entries()) {
      if (job.status === 'completed' || job.status === 'failed') {
        if (new Date(job.result?.timestamp || 0) < threshold) {
          this.jobs.delete(jobId);
          this.emit('jobRemoved', jobId);
        }
      }
    }
  }
}
