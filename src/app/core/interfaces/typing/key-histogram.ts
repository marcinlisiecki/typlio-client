export interface KeyHistogram {
  keyCode: number;
  hitCount: number;
  missCount: number;
}

export interface KeyHistogramMap {
  [key: string]: {
    hitCount: number;
    missCount: number;
  };
}
