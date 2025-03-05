
/**
 * API utilities for communicating with the Python backend
 */

import { SortingStepHistory, SortingAlgorithm } from "@/types/types";

const API_URL = "http://localhost:8000"; // Change this in production

export interface SortingResponse {
  history: SortingStepHistory;
  stats: {
    comparisons: number;
    swaps: number;
  };
}

/**
 * Send a request to the backend to sort an array
 */
export const sortArray = async (
  array: number[],
  algorithm: SortingAlgorithm
): Promise<SortingResponse> => {
  try {
    const response = await fetch(`${API_URL}/sort`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        array,
        algorithm,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to get sorting results");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in sortArray:", error);
    throw error;
  }
}
