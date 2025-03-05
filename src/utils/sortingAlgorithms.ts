
import { SortingStepHistory, SortingStep } from "@/types/types";

// Helper function to clone the current state for history tracking
const cloneStep = (step: SortingStep): SortingStep => {
  return {
    array: [...step.array],
    comparingIndices: [...step.comparingIndices],
    sortedIndices: [...step.sortedIndices],
    selectedIndices: [...step.selectedIndices],
    pivotIndices: [...step.pivotIndices],
  };
};

// Bubble Sort Algorithm
export const bubbleSort = (inputArray: number[]): SortingStepHistory => {
  const history: SortingStepHistory = [];
  const array = [...inputArray];
  const n = array.length;
  
  // Initial state
  history.push({
    array: [...array],
    comparingIndices: [],
    sortedIndices: [],
    selectedIndices: [],
    pivotIndices: [],
  });
  
  let swapped: boolean;
  
  for (let i = 0; i < n; i++) {
    swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing two elements
      const currentStep = cloneStep(history[history.length - 1]);
      currentStep.comparingIndices = [j, j + 1];
      history.push(currentStep);
      
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        
        // Record the swap
        const swapStep = cloneStep(currentStep);
        swapStep.array = [...array];
        swapStep.selectedIndices = [j, j + 1];
        history.push(swapStep);
      }
    }
    
    // Mark the last element of this pass as sorted
    const sortedStep = cloneStep(history[history.length - 1]);
    sortedStep.sortedIndices = [...sortedStep.sortedIndices, n - i - 1];
    sortedStep.comparingIndices = [];
    sortedStep.selectedIndices = [];
    history.push(sortedStep);
    
    // If no swapping occurred in this pass, the array is already sorted
    if (!swapped) break;
  }
  
  // Mark all elements as sorted in the final step
  const finalStep = cloneStep(history[history.length - 1]);
  finalStep.sortedIndices = Array.from({ length: n }, (_, i) => i);
  finalStep.comparingIndices = [];
  finalStep.selectedIndices = [];
  history.push(finalStep);
  
  return history;
};

// Selection Sort Algorithm
export const selectionSort = (inputArray: number[]): SortingStepHistory => {
  const history: SortingStepHistory = [];
  const array = [...inputArray];
  const n = array.length;
  
  // Initial state
  history.push({
    array: [...array],
    comparingIndices: [],
    sortedIndices: [],
    selectedIndices: [],
    pivotIndices: [],
  });
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Mark current position
    const selectionStep = cloneStep(history[history.length - 1]);
    selectionStep.selectedIndices = [i];
    history.push(selectionStep);
    
    for (let j = i + 1; j < n; j++) {
      // Compare current minimum with next element
      const compareStep = cloneStep(history[history.length - 1]);
      compareStep.comparingIndices = [minIndex, j];
      history.push(compareStep);
      
      if (array[j] < array[minIndex]) {
        // Update minimum index
        minIndex = j;
        
        // Show new minimum
        const newMinStep = cloneStep(history[history.length - 1]);
        newMinStep.selectedIndices = [minIndex];
        history.push(newMinStep);
      }
    }
    
    if (minIndex !== i) {
      // Swap the found minimum element with the first element
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      
      // Record the swap
      const swapStep = cloneStep(history[history.length - 1]);
      swapStep.array = [...array];
      swapStep.selectedIndices = [i, minIndex];
      history.push(swapStep);
    }
    
    // Mark the position as sorted
    const sortedStep = cloneStep(history[history.length - 1]);
    sortedStep.sortedIndices = [...sortedStep.sortedIndices, i];
    sortedStep.comparingIndices = [];
    sortedStep.selectedIndices = [];
    history.push(sortedStep);
  }
  
  // Mark last element as sorted in the final step
  const finalStep = cloneStep(history[history.length - 1]);
  finalStep.sortedIndices = Array.from({ length: n }, (_, i) => i);
  finalStep.comparingIndices = [];
  finalStep.selectedIndices = [];
  history.push(finalStep);
  
  return history;
};

// Insertion Sort Algorithm
export const insertionSort = (inputArray: number[]): SortingStepHistory => {
  const history: SortingStepHistory = [];
  const array = [...inputArray];
  const n = array.length;
  
  // Initial state
  history.push({
    array: [...array],
    comparingIndices: [],
    sortedIndices: [0], // First element is always considered sorted
    selectedIndices: [],
    pivotIndices: [],
  });
  
  for (let i = 1; i < n; i++) {
    // Select current element to insert
    const selectStep = cloneStep(history[history.length - 1]);
    selectStep.selectedIndices = [i];
    history.push(selectStep);
    
    let j = i;
    
    while (j > 0) {
      // Compare with previous element
      const compareStep = cloneStep(history[history.length - 1]);
      compareStep.comparingIndices = [j, j - 1];
      history.push(compareStep);
      
      if (array[j] < array[j - 1]) {
        // Swap elements
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
        
        // Record the swap
        const swapStep = cloneStep(history[history.length - 1]);
        swapStep.array = [...array];
        swapStep.selectedIndices = [j - 1];
        history.push(swapStep);
        
        j--;
      } else {
        break;
      }
    }
    
    // Mark as sorted up to current index
    const sortedStep = cloneStep(history[history.length - 1]);
    sortedStep.sortedIndices = Array.from({ length: i + 1 }, (_, idx) => idx);
    sortedStep.comparingIndices = [];
    sortedStep.selectedIndices = [];
    history.push(sortedStep);
  }
  
  // Final state - all sorted
  const finalStep = cloneStep(history[history.length - 1]);
  finalStep.sortedIndices = Array.from({ length: n }, (_, i) => i);
  finalStep.comparingIndices = [];
  finalStep.selectedIndices = [];
  history.push(finalStep);
  
  return history;
};

// Merge Sort Algorithm
export const mergeSort = (inputArray: number[]): SortingStepHistory => {
  const history: SortingStepHistory = [];
  const array = [...inputArray];
  
  // Initial state
  history.push({
    array: [...array],
    comparingIndices: [],
    sortedIndices: [],
    selectedIndices: [],
    pivotIndices: [],
  });
  
  // Helper function to merge two subarrays
  const merge = (start: number, mid: number, end: number) => {
    const leftSize = mid - start + 1;
    const rightSize = end - mid;
    
    // Create temporary arrays
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);
    
    // Show subarrays being merged
    const subArrayStep = cloneStep(history[history.length - 1]);
    subArrayStep.selectedIndices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    history.push(subArrayStep);
    
    let i = 0, j = 0, k = start;
    
    // Merge the two subarrays
    while (i < leftSize && j < rightSize) {
      // Compare elements from both subarrays
      const compareStep = cloneStep(history[history.length - 1]);
      compareStep.comparingIndices = [start + i, mid + 1 + j];
      history.push(compareStep);
      
      if (leftArray[i] <= rightArray[j]) {
        array[k] = leftArray[i];
        i++;
      } else {
        array[k] = rightArray[j];
        j++;
      }
      
      // Update array after placing an element
      const updateStep = cloneStep(history[history.length - 1]);
      updateStep.array = [...array];
      updateStep.selectedIndices = [k];
      history.push(updateStep);
      
      k++;
    }
    
    // Copy remaining elements from left subarray
    while (i < leftSize) {
      array[k] = leftArray[i];
      
      // Update array
      const leftRemainingStep = cloneStep(history[history.length - 1]);
      leftRemainingStep.array = [...array];
      leftRemainingStep.selectedIndices = [k];
      history.push(leftRemainingStep);
      
      i++;
      k++;
    }
    
    // Copy remaining elements from right subarray
    while (j < rightSize) {
      array[k] = rightArray[j];
      
      // Update array
      const rightRemainingStep = cloneStep(history[history.length - 1]);
      rightRemainingStep.array = [...array];
      rightRemainingStep.selectedIndices = [k];
      history.push(rightRemainingStep);
      
      j++;
      k++;
    }
    
    // Mark the merged subarray as sorted
    const mergedStep = cloneStep(history[history.length - 1]);
    for (let idx = start; idx <= end; idx++) {
      if (!mergedStep.sortedIndices.includes(idx)) {
        mergedStep.sortedIndices.push(idx);
      }
    }
    mergedStep.comparingIndices = [];
    mergedStep.selectedIndices = [];
    history.push(mergedStep);
  };
  
  // Recursive function to implement merge sort
  const mergeSortRecursive = (start: number, end: number) => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      
      // Show the split
      const splitStep = cloneStep(history[history.length - 1]);
      splitStep.selectedIndices = Array.from({ length: mid - start + 1 }, (_, i) => start + i);
      history.push(splitStep);
      
      // Recursively sort first and second halves
      mergeSortRecursive(start, mid);
      
      const rightSplitStep = cloneStep(history[history.length - 1]);
      rightSplitStep.selectedIndices = Array.from({ length: end - mid }, (_, i) => mid + 1 + i);
      history.push(rightSplitStep);
      
      mergeSortRecursive(mid + 1, end);
      
      // Merge the sorted halves
      merge(start, mid, end);
    } else if (start === end) {
      // A single element is always sorted
      const singleElementStep = cloneStep(history[history.length - 1]);
      if (!singleElementStep.sortedIndices.includes(start)) {
        singleElementStep.sortedIndices.push(start);
      }
      history.push(singleElementStep);
    }
  };
  
  mergeSortRecursive(0, array.length - 1);
  
  // Final state - all sorted
  const finalStep = cloneStep(history[history.length - 1]);
  finalStep.sortedIndices = Array.from({ length: array.length }, (_, i) => i);
  finalStep.comparingIndices = [];
  finalStep.selectedIndices = [];
  history.push(finalStep);
  
  return history;
};

// Quick Sort Algorithm
export const quickSort = (inputArray: number[]): SortingStepHistory => {
  const history: SortingStepHistory = [];
  const array = [...inputArray];
  
  // Initial state
  history.push({
    array: [...array],
    comparingIndices: [],
    sortedIndices: [],
    selectedIndices: [],
    pivotIndices: [],
  });
  
  // Partition function
  const partition = (low: number, high: number): number => {
    // Choose the rightmost element as pivot
    const pivot = array[high];
    
    // Show pivot
    const pivotStep = cloneStep(history[history.length - 1]);
    pivotStep.pivotIndices = [high];
    history.push(pivotStep);
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      // Compare current element with pivot
      const compareStep = cloneStep(history[history.length - 1]);
      compareStep.comparingIndices = [j, high];
      history.push(compareStep);
      
      if (array[j] <= pivot) {
        i++;
        
        // Swap elements
        [array[i], array[j]] = [array[j], array[i]];
        
        // Record the swap
        const swapStep = cloneStep(history[history.length - 1]);
        swapStep.array = [...array];
        swapStep.selectedIndices = i !== j ? [i, j] : [i];
        history.push(swapStep);
      }
    }
    
    // Move pivot to its final position
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    
    // Record the final pivot placement
    const finalPivotStep = cloneStep(history[history.length - 1]);
    finalPivotStep.array = [...array];
    finalPivotStep.selectedIndices = [i + 1, high];
    finalPivotStep.pivotIndices = [i + 1];
    history.push(finalPivotStep);
    
    // Mark pivot as sorted
    const sortedPivotStep = cloneStep(history[history.length - 1]);
    sortedPivotStep.sortedIndices = [...sortedPivotStep.sortedIndices, i + 1];
    sortedPivotStep.comparingIndices = [];
    sortedPivotStep.selectedIndices = [];
    history.push(sortedPivotStep);
    
    return i + 1;
  };
  
  // Recursive function to implement quick sort
  const quickSortRecursive = (low: number, high: number) => {
    if (low < high) {
      // Partition the array
      const pi = partition(low, high);
      
      // Sort elements before and after partition
      quickSortRecursive(low, pi - 1);
      quickSortRecursive(pi + 1, high);
    } else if (low === high) {
      // A single element is always sorted
      const singleElementStep = cloneStep(history[history.length - 1]);
      if (!singleElementStep.sortedIndices.includes(low)) {
        singleElementStep.sortedIndices.push(low);
      }
      history.push(singleElementStep);
    }
  };
  
  quickSortRecursive(0, array.length - 1);
  
  // Final state - all sorted
  const finalStep = cloneStep(history[history.length - 1]);
  finalStep.sortedIndices = Array.from({ length: array.length }, (_, i) => i);
  finalStep.comparingIndices = [];
  finalStep.selectedIndices = [];
  finalStep.pivotIndices = [];
  history.push(finalStep);
  
  return history;
};

// Heap Sort Algorithm
export const heapSort = (inputArray: number[]): SortingStepHistory => {
  const history: SortingStepHistory = [];
  const array = [...inputArray];
  const n = array.length;
  
  // Initial state
  history.push({
    array: [...array],
    comparingIndices: [],
    sortedIndices: [],
    selectedIndices: [],
    pivotIndices: [],
  });
  
  // Helper function to heapify a subtree
  const heapify = (n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Show the current node and its children
    const nodeStep = cloneStep(history[history.length - 1]);
    nodeStep.selectedIndices = [i];
    if (left < n) nodeStep.comparingIndices.push(left);
    if (right < n) nodeStep.comparingIndices.push(right);
    history.push(nodeStep);
    
    // If left child is larger than root
    if (left < n) {
      const leftCompareStep = cloneStep(history[history.length - 1]);
      leftCompareStep.comparingIndices = [largest, left];
      history.push(leftCompareStep);
      
      if (array[left] > array[largest]) {
        largest = left;
      }
    }
    
    // If right child is larger than largest so far
    if (right < n) {
      const rightCompareStep = cloneStep(history[history.length - 1]);
      rightCompareStep.comparingIndices = [largest, right];
      history.push(rightCompareStep);
      
      if (array[right] > array[largest]) {
        largest = right;
      }
    }
    
    // If largest is not root
    if (largest !== i) {
      // Swap
      [array[i], array[largest]] = [array[largest], array[i]];
      
      // Record the swap
      const swapStep = cloneStep(history[history.length - 1]);
      swapStep.array = [...array];
      swapStep.selectedIndices = [i, largest];
      history.push(swapStep);
      
      // Recursively heapify the affected subtree
      heapify(n, largest);
    }
  };
  
  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [array[0], array[i]] = [array[i], array[0]];
    
    // Record the swap
    const swapStep = cloneStep(history[history.length - 1]);
    swapStep.array = [...array];
    swapStep.selectedIndices = [0, i];
    history.push(swapStep);
    
    // Mark as sorted
    const sortedStep = cloneStep(history[history.length - 1]);
    sortedStep.sortedIndices = [...sortedStep.sortedIndices, i];
    sortedStep.comparingIndices = [];
    sortedStep.selectedIndices = [];
    history.push(sortedStep);
    
    // Call heapify on the reduced heap
    heapify(i, 0);
  }
  
  // Mark the first element as sorted
  const finalStep = cloneStep(history[history.length - 1]);
  finalStep.sortedIndices = Array.from({ length: n }, (_, i) => i);
  finalStep.comparingIndices = [];
  finalStep.selectedIndices = [];
  history.push(finalStep);
  
  return history;
};

// Radix Sort Algorithm
export const radixSort = (inputArray: number[]): SortingStepHistory => {
  const history: SortingStepHistory = [];
  const array = [...inputArray];
  const n = array.length;
  
  // Initial state
  history.push({
    array: [...array],
    comparingIndices: [],
    sortedIndices: [],
    selectedIndices: [],
    pivotIndices: [],
  });
  
  // Find the maximum number to know the number of digits
  let max = Math.max(...array);
  
  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    
    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(array[i] / exp) % 10;
      count[digit]++;
      
      // Show current digit being counted
      const countStep = cloneStep(history[history.length - 1]);
      countStep.selectedIndices = [i];
      countStep.pivotIndices = []; // Use pivotIndices to highlight the current digit position
      history.push(countStep);
    }
    
    // Change count[i] so that count[i] now contains actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(array[i] / exp) % 10;
      output[count[digit] - 1] = array[i];
      count[digit]--;
      
      // Show element being placed in output array
      const placeStep = cloneStep(history[history.length - 1]);
      placeStep.selectedIndices = [i];
      history.push(placeStep);
    }
    
    // Copy the output array to array[]
    for (let i = 0; i < n; i++) {
      array[i] = output[i];
      
      // Update array
      const updateStep = cloneStep(history[history.length - 1]);
      updateStep.array = [...array];
      updateStep.selectedIndices = [i];
      history.push(updateStep);
    }
    
    // After each digit pass, show progress
    const digitPassStep = cloneStep(history[history.length - 1]);
    digitPassStep.comparingIndices = [];
    digitPassStep.selectedIndices = [];
    history.push(digitPassStep);
  }
  
  // Final state - all sorted
  const finalStep = cloneStep(history[history.length - 1]);
  finalStep.sortedIndices = Array.from({ length: n }, (_, i) => i);
  finalStep.comparingIndices = [];
  finalStep.selectedIndices = [];
  history.push(finalStep);
  
  return history;
};

// Bucket Sort Algorithm
export const bucketSort = (inputArray: number[]): SortingStepHistory => {
  const history: SortingStepHistory = [];
  const array = [...inputArray];
  const n = array.length;
  
  // Initial state
  history.push({
    array: [...array],
    comparingIndices: [],
    sortedIndices: [],
    selectedIndices: [],
    pivotIndices: [],
  });
  
  if (n <= 0) return history;
  
  // Find minimum and maximum values
  let minValue = array[0];
  let maxValue = array[0];
  
  for (let i = 1; i < n; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
    
    // Show comparing min/max
    const minMaxStep = cloneStep(history[history.length - 1]);
    minMaxStep.comparingIndices = [i];
    history.push(minMaxStep);
  }
  
  // Create buckets
  const bucketCount = Math.min(Math.floor(Math.sqrt(n)), 10); // Number of buckets
  const bucketSize = Math.ceil((maxValue - minValue + 1) / bucketCount);
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
  
  // Put array elements in different buckets
  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.min(
      Math.floor((array[i] - minValue) / bucketSize),
      bucketCount - 1
    );
    buckets[bucketIndex].push(array[i]);
    
    // Show element being placed in bucket
    const bucketPlaceStep = cloneStep(history[history.length - 1]);
    bucketPlaceStep.selectedIndices = [i];
    bucketPlaceStep.pivotIndices = []; // Use pivotIndices to highlight the bucket index
    history.push(bucketPlaceStep);
  }
  
  // Sort individual buckets and concatenate
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    // Sort bucket (using insertion sort)
    buckets[i].sort((a, b) => a - b);
    
    // Show sorting each bucket
    const bucketSortStep = cloneStep(history[history.length - 1]);
    history.push(bucketSortStep);
    
    // Concatenate buckets back to array
    for (let j = 0; j < buckets[i].length; j++) {
      array[index] = buckets[i][j];
      
      // Show element being placed back in array
      const concatStep = cloneStep(history[history.length - 1]);
      concatStep.array = [...array];
      concatStep.selectedIndices = [index];
      history.push(concatStep);
      
      index++;
    }
  }
  
  // Final state - all sorted
  const finalStep = cloneStep(history[history.length - 1]);
  finalStep.sortedIndices = Array.from({ length: n }, (_, i) => i);
  finalStep.comparingIndices = [];
  finalStep.selectedIndices = [];
  history.push(finalStep);
  
  return history;
};

// Get algorithm info
export const getAlgorithmInfo = (algorithm: string) => {
  const infoMap: Record<string, any> = {
    bubble: {
      name: "Bubble Sort",
      timeComplexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description:
        "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted.",
      isStable: true,
    },
    selection: {
      name: "Selection Sort",
      timeComplexity: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description:
        "An in-place comparison sorting algorithm that divides the input into a sorted and an unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.",
      isStable: false,
    },
    insertion: {
      name: "Insertion Sort",
      timeComplexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description:
        "A simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms but can be efficient for small data sets and is often used as part of more sophisticated algorithms.",
      isStable: true,
    },
    merge: {
      name: "Merge Sort",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      spaceComplexity: "O(n)",
      description:
        "An efficient, stable, divide-and-conquer algorithm. Merge sort divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
      isStable: true,
    },
    quick: {
      name: "Quick Sort",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(log n)",
      description:
        "An efficient, divide-and-conquer algorithm. Quicksort works by selecting a 'pivot' element and partitioning the array around the pivot so that elements less than the pivot are on the left and elements greater than the pivot are on the right.",
      isStable: false,
    },
    heap: {
      name: "Heap Sort",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      spaceComplexity: "O(1)",
      description:
        "A comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving it to the sorted region.",
      isStable: false,
    },
    radix: {
      name: "Radix Sort",
      timeComplexity: {
        best: "O(nk)",
        average: "O(nk)",
        worst: "O(nk)",
      },
      spaceComplexity: "O(n+k)",
      description:
        "A non-comparative sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same significant position and value. Radix sort uses counting sort as a subroutine to sort the digits.",
      isStable: true,
    },
    bucket: {
      name: "Bucket Sort",
      timeComplexity: {
        best: "O(n+k)",
        average: "O(n+k)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(n+k)",
      description:
        "A sorting algorithm that works by distributing the elements into a number of buckets, then sorting each bucket individually, and finally concatenating all the sorted buckets. Bucket sort is mainly useful when the input is uniformly distributed over a range.",
      isStable: true,
    },
  };

  return infoMap[algorithm] || {
    name: "Unknown Algorithm",
    timeComplexity: {
      best: "Unknown",
      average: "Unknown",
      worst: "Unknown",
    },
    spaceComplexity: "Unknown",
    description: "No information available for this algorithm.",
    isStable: false,
  };
};

// Generate a random array of a given size
export const generateRandomArray = (size: number, max: number = 100): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
};

// Generate a nearly sorted array
export const generateNearlySortedArray = (size: number, swapFactor: number = 0.1): number[] => {
  // Create a sorted array
  const array = Array.from({ length: size }, (_, i) => i + 1);
  
  // Perform some random swaps
  const swaps = Math.floor(size * swapFactor);
  for (let i = 0; i < swaps; i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
  }
  
  return array;
};

// Generate a reversed array
export const generateReversedArray = (size: number): number[] => {
  return Array.from({ length: size }, (_, i) => size - i);
};

// Get sorting algorithm function by name
export const getSortingAlgorithm = (algorithm: string) => {
  const algorithmMap: Record<string, any> = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort,
    quick: quickSort,
    heap: heapSort,
    radix: radixSort,
    bucket: bucketSort,
  };

  return algorithmMap[algorithm] || bubbleSort;
};

// Count operations
export const countOperations = (history: SortingStepHistory) => {
  const comparisons = history.filter(step => step.comparingIndices.length > 0).length;
  const swaps = history.filter(step => step.selectedIndices.length >= 2).length;
  
  return { comparisons, swaps };
};
