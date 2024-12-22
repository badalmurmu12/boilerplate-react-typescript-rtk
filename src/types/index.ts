export interface RootState {
    counter: CounterState;
  }
  
  export interface CounterState {
    value: number;
    status: 'idle' | 'loading' | 'failed';
  }