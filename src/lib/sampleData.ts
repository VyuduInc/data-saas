export function generateSampleData(type: string) {
  switch (type) {
    case 'timeseries':
      return Array.from({ length: 100 }, (_, i) => ({
        id: `data-${i}`,
        label: `Point ${i}`,
        value: Math.sin(i / 10) * 50 + Math.random() * 10 + 50,
        timestamp: new Date(Date.now() - (100 - i) * 24 * 60 * 60 * 1000),
      }));

    case 'comparison':
      return [
        { id: '1', label: 'Product A', value: 120 },
        { id: '2', label: 'Product B', value: 80 },
        { id: '3', label: 'Product C', value: 160 },
        { id: '4', label: 'Product D', value: 90 },
      ];

    case 'distribution':
      return Array.from({ length: 1000 }, (_, i) => ({
        id: `data-${i}`,
        label: `Point ${i}`,
        value: Math.random() * 100,
      }));

    default:
      return [];
  }
}
