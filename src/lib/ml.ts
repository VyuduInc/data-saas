import * as tf from '@tensorflow/tfjs';
import { KMeans } from 'ml-kmeans';

export interface MLAnalysis {
  clusters?: {
    centroids: number[][];
    labels: number[];
  };
  predictions?: {
    values: number[];
    confidence: number[];
  };
}

export async function analyzeData(
  data: number[][],
  options: {
    enableClustering?: boolean;
    enablePrediction?: boolean;
    numClusters?: number;
    predictionSteps?: number;
  }
): Promise<MLAnalysis> {
  const result: MLAnalysis = {};

  if (options.enableClustering) {
    // Perform k-means clustering
    const numClusters = options.numClusters || 3;
    const kmeans = new KMeans(numClusters);
    const clustered = kmeans.predict(data);

    result.clusters = {
      centroids: kmeans.centroids,
      labels: clustered,
    };
  }

  if (options.enablePrediction && data.length > 0) {
    // Create and train a simple LSTM model for time series prediction
    const predictionSteps = options.predictionSteps || 5;
    const model = tf.sequential();
    
    model.add(tf.layers.lstm({
      units: 50,
      returnSequences: true,
      inputShape: [10, data[0].length],
    }));
    
    model.add(tf.layers.dense({ units: data[0].length }));

    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
    });

    // Prepare data for time series prediction
    const sequences = [];
    const labels = [];
    const windowSize = 10;

    for (let i = 0; i < data.length - windowSize; i++) {
      sequences.push(data.slice(i, i + windowSize));
      labels.push(data[i + windowSize]);
    }

    const xs = tf.tensor3d(sequences);
    const ys = tf.tensor2d(labels);

    // Train the model
    await model.fit(xs, ys, {
      epochs: 50,
      batchSize: 32,
    });

    // Make predictions
    const lastSequence = data.slice(-windowSize);
    const predictions = [];
    const confidence = [];

    for (let i = 0; i < predictionSteps; i++) {
      const input = tf.tensor3d([lastSequence]);
      const pred = model.predict(input) as tf.Tensor;
      const predArray = await pred.array() as number[][];
      
      predictions.push(...predArray[0]);
      confidence.push(0.8 - (i * 0.1)); // Decrease confidence as we predict further into the future
      
      lastSequence.shift();
      lastSequence.push(...predArray[0]);
      
      pred.dispose();
      input.dispose();
    }

    result.predictions = {
      values: predictions,
      confidence,
    };

    // Clean up tensors
    xs.dispose();
    ys.dispose();
    model.dispose();
  }

  return result;
}
