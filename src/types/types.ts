
export type SortingAlgorithm = 
  | 'bubble' 
  | 'selection' 
  | 'insertion' 
  | 'merge' 
  | 'quick' 
  | 'heap'
  | 'radix'
  | 'bucket';

export type BarState = 'default' | 'comparing' | 'sorted' | 'selected' | 'pivot';

export interface ArrayBarProps {
  value: number;
  state: BarState;
  height: string;
  index: number;
}

export interface AlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
  isStable: boolean;
}

export interface SortingStep {
  array: number[];
  comparingIndices: number[];
  sortedIndices: number[];
  selectedIndices: number[];
  pivotIndices: number[];
}

export type SortingStepHistory = SortingStep[];

export interface SortingAnimationState {
  history: SortingStepHistory;
  currentStep: number;
  isPlaying: boolean;
  isDone: boolean;
  totalSteps: number;
  comparisons: number;
  swaps: number;
}
