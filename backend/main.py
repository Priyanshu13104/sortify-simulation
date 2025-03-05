from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional, Literal
import uvicorn
import math

app = FastAPI(title="Sorting Algorithms API")

# Add CORS middleware to allow frontend to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SortRequest(BaseModel):
    array: List[int]
    algorithm: Literal["bubble", "selection", "insertion", "merge", "quick", "heap", "radix", "bucket"]


# Sorting algorithm implementations with history tracking
def bubble_sort(input_array: List[int]) -> List[Dict[str, Any]]:
    """
    Implementation of the bubble sort algorithm with history tracking
    """
    history = []
    array = input_array.copy()
    n = len(array)
    
    # Initial state
    history.append({
        "array": array.copy(),
        "comparingIndices": [],
        "sortedIndices": [],
        "selectedIndices": [],
        "pivotIndices": [],
    })
    
    for i in range(n):
        # Flag to optimize if no swaps are performed
        swapped = False
        
        for j in range(0, n - i - 1):
            # Record comparing indices
            comparing_step = history[-1].copy()
            comparing_step["comparingIndices"] = [j, j + 1]
            history.append(comparing_step)
            
            if array[j] > array[j + 1]:
                # Swap elements
                array[j], array[j + 1] = array[j + 1], array[j]
                swapped = True
                
                # Record the swap
                swap_step = history[-1].copy()
                swap_step["array"] = array.copy()
                swap_step["selectedIndices"] = [j, j + 1]
                history.append(swap_step)
        
        # Mark the last element as sorted
        sorted_step = history[-1].copy()
        sorted_step["sortedIndices"] = list(range(n - i - 1, n))
        history.append(sorted_step)
        
        # If no swaps were performed, the array is already sorted
        if not swapped:
            break
    
    # Final state - all sorted
    final_step = history[-1].copy()
    final_step["sortedIndices"] = list(range(n))
    final_step["comparingIndices"] = []
    final_step["selectedIndices"] = []
    history.append(final_step)
    
    return history
    
def selection_sort(input_array: List[int]) -> List[Dict[str, Any]]:
    """
    Implementation of the selection sort algorithm with history tracking
    """
    history = []
    array = input_array.copy()
    n = len(array)

    # Initial state
    history.append({
        "array": array.copy(),
        "comparingIndices": [],
        "sortedIndices": [],
        "selectedIndices": [],
        "pivotIndices": [],
    })

    for i in range(n):
        min_index = i
        # Highlight the current minimum
        select_step = history[-1].copy()
        select_step["selectedIndices"] = [min_index]
        history.append(select_step)

        for j in range(i + 1, n):
            # Comparing indices
            comparing_step = history[-1].copy()
            comparing_step["comparingIndices"] = [j, min_index]
            history.append(comparing_step)

            if array[j] < array[min_index]:
                min_index = j
                # Highlight the new minimum
                select_step = history[-1].copy()
                select_step["selectedIndices"] = [min_index]
                history.append(select_step)

        # Swap the found minimum element with the first element
        if min_index != i:
            array[i], array[min_index] = array[min_index], array[i]

            # Record the swap
            swap_step = history[-1].copy()
            swap_step["array"] = array.copy()
            swap_step["selectedIndices"] = [i, min_index]
            history.append(swap_step)

        # Mark the sorted element
        sorted_step = history[-1].copy()
        sorted_step["sortedIndices"] = list(range(i + 1))
        history.append(sorted_step)

    # Final state - all sorted
    final_step = history[-1].copy()
    final_step["sortedIndices"] = list(range(n))
    final_step["comparingIndices"] = []
    final_step["selectedIndices"] = []
    history.append(final_step)

    return history

def insertion_sort(input_array: List[int]) -> List[Dict[str, Any]]:
    """
    Implementation of the insertion sort algorithm with history tracking
    """
    history = []
    array = input_array.copy()
    n = len(array)

    # Initial state
    history.append({
        "array": array.copy(),
        "comparingIndices": [],
        "sortedIndices": [],
        "selectedIndices": [],
        "pivotIndices": [],
    })

    for i in range(1, n):
        key = array[i]
        j = i - 1

        # Select the key element
        select_step = history[-1].copy()
        select_step["selectedIndices"] = [i]
        history.append(select_step)

        # Move elements of arr[0..i-1], that are greater than key, to one position ahead
        # of their current position
        while j >= 0 and array[j] > key:
            # Comparing indices
            comparing_step = history[-1].copy()
            comparing_step["comparingIndices"] = [j, j + 1]
            history.append(comparing_step)

            array[j + 1] = array[j]

            # Record the shift
            shift_step = history[-1].copy()
            shift_step["array"] = array.copy()
            shift_step["selectedIndices"] = [j, j + 1]
            history.append(shift_step)

            j -= 1

        array[j + 1] = key

        # Record the insertion
        insert_step = history[-1].copy()
        insert_step["array"] = array.copy()
        insert_step["selectedIndices"] = [j + 1]
        history.append(insert_step)

        # Mark the sorted portion
        sorted_step = history[-1].copy()
        sorted_step["sortedIndices"] = list(range(i + 1))
        history.append(sorted_step)

    # Final state - all sorted
    final_step = history[-1].copy()
    final_step["sortedIndices"] = list(range(n))
    final_step["comparingIndices"] = []
    final_step["selectedIndices"] = []
    history.append(final_step)

    return history

def merge_sort(input_array: List[int]) -> List[Dict[str, Any]]:
    """
    Implementation of the merge sort algorithm with history tracking
    """
    history = []
    array = input_array.copy()
    n = len(array)
    
    # Initial state
    history.append({
        "array": array.copy(),
        "comparingIndices": [],
        "sortedIndices": [],
        "selectedIndices": [],
        "pivotIndices": [],
    })
    
    # Auxiliary storage for tracking sorted indices
    sorted_indices = set()
    
    def merge_sort_recursive(arr, left, right):
        if left < right:
            mid = (left + right) // 2
            
            # Record the division step
            division_step = history[-1].copy()
            division_step["selectedIndices"] = list(range(left, right + 1))
            division_step["pivotIndices"] = [mid]
            history.append(division_step)
            
            # Recursively sort both halves
            merge_sort_recursive(arr, left, mid)
            merge_sort_recursive(arr, mid + 1, right)
            
            # Merge the sorted halves
            merge(arr, left, mid, right)
    
    def merge(arr, left, mid, right):
        # Create temp arrays
        L = arr[left:mid+1]
        R = arr[mid+1:right+1]
        
        # Merge step visualization
        merge_step = history[-1].copy()
        merge_step["selectedIndices"] = list(range(left, right + 1))
        history.append(merge_step)
        
        i = j = 0
        k = left
        
        # Merge the two halves back into the original array
        while i < len(L) and j < len(R):
            # Comparing elements from both sub-arrays
            compare_step = history[-1].copy()
            compare_step["comparingIndices"] = [left + i, mid + 1 + j]
            history.append(compare_step)
            
            if L[i] <= R[j]:
                arr[k] = L[i]
                
                # Record the placement
                place_step = history[-1].copy()
                place_step["array"] = array.copy()
                place_step["selectedIndices"] = [k]
                history.append(place_step)
                
                i += 1
            else:
                arr[k] = R[j]
                
                # Record the placement
                place_step = history[-1].copy()
                place_step["array"] = array.copy()
                place_step["selectedIndices"] = [k]
                history.append(place_step)
                
                j += 1
            k += 1
        
        # Copy any remaining elements from L
        while i < len(L):
            arr[k] = L[i]
            
            # Record the placement
            place_step = history[-1].copy()
            place_step["array"] = array.copy()
            place_step["selectedIndices"] = [k]
            history.append(place_step)
            
            i += 1
            k += 1
        
        # Copy any remaining elements from R
        while j < len(R):
            arr[k] = R[j]
            
            # Record the placement
            place_step = history[-1].copy()
            place_step["array"] = array.copy()
            place_step["selectedIndices"] = [k]
            history.append(place_step)
            
            j += 1
            k += 1
        
        # Mark the merged segment as sorted
        sorted_update = history[-1].copy()
        for idx in range(left, right + 1):
            sorted_indices.add(idx)
        sorted_update["sortedIndices"] = list(sorted_indices)
        sorted_update["comparingIndices"] = []
        sorted_update["selectedIndices"] = []
        history.append(sorted_update)
    
    # Start the recursive merge sort process
    merge_sort_recursive(array, 0, n - 1)
    
    # Final state - all sorted
    final_step = history[-1].copy()
    final_step["sortedIndices"] = list(range(n))
    final_step["comparingIndices"] = []
    final_step["selectedIndices"] = []
    final_step["pivotIndices"] = []
    history.append(final_step)
    
    return history

def quick_sort(input_array: List[int]) -> List[Dict[str, Any]]:
    """
    Implementation of the quick sort algorithm with history tracking
    """
    history = []
    array = input_array.copy()
    n = len(array)
    
    # Initial state
    history.append({
        "array": array.copy(),
        "comparingIndices": [],
        "sortedIndices": [],
        "selectedIndices": [],
        "pivotIndices": [],
    })
    
    # Auxiliary storage for tracking sorted indices
    sorted_indices = set()
    
    def partition(arr, low, high):
        # Choose the rightmost element as pivot
        pivot = arr[high]
        
        # Record pivot selection
        pivot_step = history[-1].copy()
        pivot_step["pivotIndices"] = [high]
        pivot_step["selectedIndices"] = list(range(low, high + 1))
        history.append(pivot_step)
        
        i = low - 1  # Index of smaller element
        
        for j in range(low, high):
            # Comparing current element with pivot
            compare_step = history[-1].copy()
            compare_step["comparingIndices"] = [j, high]
            history.append(compare_step)
            
            if arr[j] <= pivot:
                # Increment index of smaller element
                i += 1
                
                if i != j:  # Avoid unnecessary swaps
                    # Swap arr[i] and arr[j]
                    arr[i], arr[j] = arr[j], arr[i]
                    
                    # Record the swap
                    swap_step = history[-1].copy()
                    swap_step["array"] = array.copy()
                    swap_step["selectedIndices"] = [i, j]
                    history.append(swap_step)
        
        # Swap arr[i+1] and arr[high] (put pivot in its correct position)
        if i + 1 != high:  # Avoid unnecessary swaps
            arr[i + 1], arr[high] = arr[high], arr[i + 1]
            
            # Record the swap
            swap_step = history[-1].copy()
            swap_step["array"] = array.copy()
            swap_step["selectedIndices"] = [i + 1, high]
            history.append(swap_step)
        
        # Mark pivot as sorted
        sorted_indices.add(i + 1)
        pivot_sorted_step = history[-1].copy()
        pivot_sorted_step["sortedIndices"] = list(sorted_indices)
        history.append(pivot_sorted_step)
        
        return i + 1
    
    def quick_sort_recursive(arr, low, high):
        if low < high:
            # pi is partitioning index
            pi = partition(arr, low, high)
            
            # Recursively sort elements before and after partition
            quick_sort_recursive(arr, low, pi - 1)
            quick_sort_recursive(arr, pi + 1, high)
            
            # After both recursive calls, mark this range as sorted
            if low == 0 and high == n - 1:
                sorted_step = history[-1].copy()
                sorted_step["sortedIndices"] = list(range(n))
                sorted_step["comparingIndices"] = []
                sorted_step["selectedIndices"] = []
                sorted_step["pivotIndices"] = []
                history.append(sorted_step)
    
    # Start the recursive quick sort process
    quick_sort_recursive(array, 0, n - 1)
    
    # Final state - all sorted
    if history[-1]["sortedIndices"] != list(range(n)):
        final_step = history[-1].copy()
        final_step["sortedIndices"] = list(range(n))
        final_step["comparingIndices"] = []
        final_step["selectedIndices"] = []
        final_step["pivotIndices"] = []
        history.append(final_step)
    
    return history

def heap_sort(input_array: List[int]) -> List[Dict[str, Any]]:
    """
    Implementation of the heap sort algorithm with history tracking
    """
    history = []
    array = input_array.copy()
    n = len(array)
    
    # Initial state
    history.append({
        "array": array.copy(),
        "comparingIndices": [],
        "sortedIndices": [],
        "selectedIndices": [],
        "pivotIndices": [],
    })
    
    def heapify(arr, n, i):
        largest = i  # Initialize largest as root
        left = 2 * i + 1
        right = 2 * i + 2
        
        # Record the current subtree we're examining
        subtree_step = history[-1].copy()
        subtree_step["selectedIndices"] = [i]
        if left < n:
            subtree_step["selectedIndices"].append(left)
        if right < n:
            subtree_step["selectedIndices"].append(right)
        history.append(subtree_step)
        
        # Check if left child exists and is greater than root
        if left < n:
            # Compare root with left child
            compare_left_step = history[-1].copy()
            compare_left_step["comparingIndices"] = [i, left]
            history.append(compare_left_step)
            
            if arr[left] > arr[largest]:
                largest = left
        
        # Check if right child exists and is greater than current largest
        if right < n:
            # Compare current largest with right child
            compare_right_step = history[-1].copy()
            compare_right_step["comparingIndices"] = [largest, right]
            history.append(compare_right_step)
            
            if arr[right] > arr[largest]:
                largest = right
        
        # If largest is not root
        if largest != i:
            # Swap root with largest
            arr[i], arr[largest] = arr[largest], arr[i]
            
            # Record the swap
            swap_step = history[-1].copy()
            swap_step["array"] = array.copy()
            swap_step["selectedIndices"] = [i, largest]
            history.append(swap_step)
            
            # Heapify the affected sub-tree
            heapify(arr, n, largest)
    
    # Build a max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(array, n, i)
    
    # Extract elements from the heap one by one
    sorted_indices = []
    for i in range(n - 1, 0, -1):
        # Swap root (maximum element) with last element
        array[0], array[i] = array[i], array[0]
        
        # Record the swap
        swap_step = history[-1].copy()
        swap_step["array"] = array.copy()
        swap_step["selectedIndices"] = [0, i]
        history.append(swap_step)
        
        # Add this position to sorted indices
        sorted_indices.append(i)
        sorted_step = history[-1].copy()
        sorted_step["sortedIndices"] = sorted_indices.copy()
        history.append(sorted_step)
        
        # Heapify reduced heap
        heapify(array, i, 0)
    
    # Final state - all sorted
    sorted_indices.append(0)  # The first element is also sorted now
    final_step = history[-1].copy()
    final_step["sortedIndices"] = list(range(n))
    final_step["comparingIndices"] = []
    final_step["selectedIndices"] = []
    final_step["pivotIndices"] = []
    history.append(final_step)
    
    return history

def radix_sort(input_array: List[int]) -> List[Dict[str, Any]]:
    """
    Implementation of the radix sort algorithm with history tracking
    """
    history = []
    array = input_array.copy()
    n = len(array)
    
    # Initial state
    history.append({
        "array": array.copy(),
        "comparingIndices": [],
        "sortedIndices": [],
        "selectedIndices": [],
        "pivotIndices": [],
    })
    
    # Find the maximum number to know number of digits
    max_num = max(array)
    
    # Do counting sort for every digit
    exp = 1
    while max_num // exp > 0:
        # Record the current digit we're examining
        digit_step = history[-1].copy()
        digit_step["pivotIndices"] = [int(math.log10(exp))]
        history.append(digit_step)
        
        # Count sort implementation for current digit
        output = [0] * n
        count = [0] * 10
        
        # Store count of occurrences
        for i in range(n):
            index = array[i] // exp % 10
            count[index] += 1
            
            # Highlight the element we're processing
            process_step = history[-1].copy()
            process_step["selectedIndices"] = [i]
            history.append(process_step)
        
        # Change count[i] so that count[i] contains actual
        # position of this digit in output[]
        for i in range(1, 10):
            count[i] += count[i - 1]
        
        # Build the output array
        for i in range(n - 1, -1, -1):
            index = array[i] // exp % 10
            output[count[index] - 1] = array[i]
            count[index] -= 1
            
            # Highlight the element we're placing
            place_step = history[-1].copy()
            place_step["selectedIndices"] = [i]
            history.append(place_step)
        
        # Copy the output array to arr[]
        for i in range(n):
            if array[i] != output[i]:
                array[i] = output[i]
                
                # Record the update
                update_step = history[-1].copy()
                update_step["array"] = array.copy()
                update_step["selectedIndices"] = [i]
                history.append(update_step)
        
        # Move to next digit
        exp *= 10
        
        # If this is the last digit, mark everything as sorted
        if max_num // exp == 0:
            sorted_step = history[-1].copy()
            sorted_step["sortedIndices"] = list(range(n))
            sorted_step["comparingIndices"] = []
            sorted_step["selectedIndices"] = []
            sorted_step["pivotIndices"] = []
            history.append(sorted_step)
    
    return history

def bucket_sort(input_array: List[int]) -> List[Dict[str, Any]]:
    """
    Implementation of the bucket sort algorithm with history tracking
    """
    history = []
    array = input_array.copy()
    n = len(array)
    
    # Initial state
    history.append({
        "array": array.copy(),
        "comparingIndices": [],
        "sortedIndices": [],
        "selectedIndices": [],
        "pivotIndices": [],
    })
    
    # Find maximum and minimum values
    max_val = max(array)
    min_val = min(array)
    
    # Number of buckets
    bucket_count = min(n, 10)  # Using 10 buckets or n buckets if n < 10
    
    # Range of each bucket
    bucket_range = (max_val - min_val) / bucket_count + 1
    
    # Create empty buckets
    buckets = [[] for _ in range(bucket_count)]
    
    # Put array elements in different buckets
    for i in range(n):
        # Find bucket index for this element
        bucket_index = min(int((array[i] - min_val) / bucket_range), bucket_count - 1)
        
        # Record which bucket this element goes into
        bucket_step = history[-1].copy()
        bucket_step["selectedIndices"] = [i]
        bucket_step["pivotIndices"] = [bucket_index]
        history.append(bucket_step)
        
        # Add to appropriate bucket
        buckets[bucket_index].append(array[i])
    
    # Sort individual buckets using insertion sort
    for i in range(bucket_count):
        if buckets[i]:
            # Record that we're sorting this bucket
            bucket_sort_step = history[-1].copy()
            bucket_sort_step["pivotIndices"] = [i]
            history.append(bucket_sort_step)
            
            # Insertion sort for this bucket
            for j in range(1, len(buckets[i])):
                key = buckets[i][j]
                k = j - 1
                
                while k >= 0 and buckets[i][k] > key:
                    buckets[i][k + 1] = buckets[i][k]
                    k -= 1
                
                buckets[i][k + 1] = key
    
    # Concatenate all buckets back into the array
    index = 0
    sorted_indices = []
    
    for i in range(bucket_count):
        for j in range(len(buckets[i])):
            array[index] = buckets[i][j]
            
            # Record the placement
            place_step = history[-1].copy()
            place_step["array"] = array.copy()
            place_step["selectedIndices"] = [index]
            history.append(place_step)
            
            # Mark this index as sorted
            sorted_indices.append(index)
            sorted_step = history[-1].copy()
            sorted_step["sortedIndices"] = sorted_indices.copy()
            history.append(sorted_step)
            
            index += 1
    
    # Final state - all sorted
    final_step = history[-1].copy()
    final_step["sortedIndices"] = list(range(n))
    final_step["comparingIndices"] = []
    final_step["selectedIndices"] = []
    final_step["pivotIndices"] = []
    history.append(final_step)
    
    return history

# Dictionary to map algorithm names to functions
SORT_ALGORITHMS = {
    "bubble": bubble_sort,
    "selection": selection_sort,
    "insertion": insertion_sort,
    "merge": merge_sort,
    "quick": quick_sort,
    "heap": heap_sort,
    "radix": radix_sort,
    "bucket": bucket_sort,
}

@app.get("/")
def read_root():
    return {"message": "Welcome to the Sorting Algorithm API"}

@app.post("/sort")
def sort_array(request: SortRequest):
    if request.algorithm not in SORT_ALGORITHMS:
        raise HTTPException(status_code=400, detail=f"Algorithm {request.algorithm} not supported")
    
    # Call the appropriate sorting function
    sort_func = SORT_ALGORITHMS[request.algorithm]
    history = sort_func(request.array)
    
    # Count operations
    comparisons = sum(1 for step in history if step["comparingIndices"])
    swaps = sum(1 for step in history if len(step["selectedIndices"]) >= 2)
    
    return {
        "history": history,
        "stats": {
            "comparisons": comparisons,
            "swaps": swaps
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
