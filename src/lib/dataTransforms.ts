import { DataPoint } from './types';

export type AggregationType = 'sum' | 'average' | 'min' | 'max' | 'count';
export type SortDirection = 'asc' | 'desc';

interface TransformOptions {
  aggregation?: {
    type: AggregationType;
    groupBy?: string;
  };
  filter?: {
    field: string;
    operator: 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains';
    value: any;
  }[];
  sort?: {
    field: string;
    direction: SortDirection;
  };
  limit?: number;
}

export function transformData(data: DataPoint[], options: TransformOptions): DataPoint[] {
  let transformed = [...data];

  // Apply filters
  if (options.filter) {
    transformed = transformed.filter(item => {
      return options.filter!.every(filter => {
        const value = (item as any)[filter.field];
        switch (filter.operator) {
          case 'eq': return value === filter.value;
          case 'gt': return value > filter.value;
          case 'lt': return value < filter.value;
          case 'gte': return value >= filter.value;
          case 'lte': return value <= filter.value;
          case 'contains': return String(value).includes(filter.value);
          default: return true;
        }
      });
    });
  }

  // Apply aggregation
  if (options.aggregation) {
    const groups = new Map<string, DataPoint[]>();
    
    transformed.forEach(item => {
      const key = options.aggregation?.groupBy 
        ? String((item as any)[options.aggregation.groupBy])
        : 'all';
      
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(item);
    });

    transformed = Array.from(groups.entries()).map(([key, group]) => {
      const value = group.reduce((acc, curr) => acc + curr.value, 0);
      
      switch (options.aggregation?.type) {
        case 'average':
          return {
            id: key,
            label: key,
            value: value / group.length,
          };
        case 'min':
          return {
            id: key,
            label: key,
            value: Math.min(...group.map(item => item.value)),
          };
        case 'max':
          return {
            id: key,
            label: key,
            value: Math.max(...group.map(item => item.value)),
          };
        case 'count':
          return {
            id: key,
            label: key,
            value: group.length,
          };
        case 'sum':
        default:
          return {
            id: key,
            label: key,
            value,
          };
      }
    });
  }

  // Apply sorting
  if (options.sort) {
    transformed.sort((a, b) => {
      const aValue = (a as any)[options.sort!.field];
      const bValue = (b as any)[options.sort!.field];
      const direction = options.sort!.direction === 'asc' ? 1 : -1;
      return (aValue > bValue ? 1 : -1) * direction;
    });
  }

  // Apply limit
  if (options.limit) {
    transformed = transformed.slice(0, options.limit);
  }

  return transformed;
}
