import { ChartOptions } from 'chart.js';

export const DEFAULT_LINE_CHART_OPTIONS: ChartOptions<'line'> = {
  plugins: {
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      grid: {
        display: true,
        tickColor: '#0f172a',
        color: 'rgba(15, 23, 42, .35)',
      },
      beginAtZero: true,
      ticks: {
        color: '#334155',
        font: {
          size: 14,
          family: 'Ubuntu mono',
          weight: 'bold',
        },
      },
    },
    x: {
      title: {
        text: 'Seconds',
      },
      grid: {
        display: true,
        tickColor: '#0f172a',
        color: 'rgba(15, 23, 42, .35)',
      },
      ticks: {
        color: '#334155',
        font: {
          size: 14,
          family: 'Ubuntu mono',
          weight: 'bold',
        },
      },
    },
  },
};

export const DEFAULT_DATASET_STYLES = {
  borderColor: 'rgba(14, 165, 233, .4)',
  backgroundColor: 'rgba(14, 165, 233, .03)',
  fill: true,
  tension: 0.3,
  pointBackgroundColor: '#0ea5e9',
  pointBorderColor: 'rgba(14, 165, 233, .4)',
  pointRadius: 3,
  borderWidth: 3,
};
