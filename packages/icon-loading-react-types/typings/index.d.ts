import { IntrinsicLoadingCircle } from './circle';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'loading-circle-1': IntrinsicLoadingCircle;
      'loading-circle-2': IntrinsicLoadingCircle;
      'loading-circle-3': IntrinsicLoadingCircle;
      'loading-circle-4': IntrinsicLoadingCircle;
      'loading-circle-5': IntrinsicLoadingCircle;
    }
  }
}

export {};
