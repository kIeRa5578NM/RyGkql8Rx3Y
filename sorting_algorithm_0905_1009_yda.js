// 代码生成时间: 2025-09-05 10:09:20
 * It showcases best practices for code structure, error handling, and maintainability.
 */

// Import necessary Ember modules
import Ember from 'ember';

// Define a service to encapsulate sorting logic
export default Ember.Service.extend({
  // Method to sort an array of numbers using the bubble sort algorithm
  bubbleSort(arr) {
    if (!Array.isArray(arr)) {
      // Error handling if input is not an array
      throw new Error('Input must be an array.');
    }

    if (arr.length < 2) {
      // Early return for arrays with one or no elements
      return arr;
    }

    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          // Swap elements if they are in the wrong order
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);

    return arr;
  },

  // Method to sort an array of numbers using the selection sort algorithm
  selectionSort(arr) {
    if (!Array.isArray(arr)) {
      // Error handling if input is not an array
      throw new Error('Input must be an array.');
    }

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        // Swap elements if the minimum element is not already in the correct position
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }

    return arr;
  },

  // Additional sorting methods can be added here, following the same pattern
});
