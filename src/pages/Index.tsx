import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArrayVisualizer from "@/components/ArrayVisualizer";
import ControlPanel from "@/components/ControlPanel";
import AlgorithmInfo from "@/components/AlgorithmInfo";
import { SortingAlgorithm, SortingStep, SortingStepHistory } from "@/types/types";
import {
  generateRandomArray,
  generateNearlySortedArray,
  generateReversedArray,
  getAlgorithmInfo,
} from "@/utils/sortingAlgorithms";
import { sortArray } from "@/utils/api";
import { toast } from "sonner";

const DEFAULT_ARRAY_SIZE = 20;
const DEFAULT_ALGORITHM: SortingAlgorithm = "bubble";
const DEFAULT_SPEED = 1;

const Index = () => {
  // State to track if the user has started visualizing
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  
  // State variables
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>(DEFAULT_ALGORITHM);
  const [array, setArray] = useState<number[]>([]);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [sortingHistory, setSortingHistory] = useState<SortingStepHistory>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED);
  const [arraySize, setArraySize] = useState<number>(DEFAULT_ARRAY_SIZE);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Refs
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  // Generate initial array
  useEffect(() => {
    generateNewArray("random");
    setIsInitialLoad(false);
  }, []);

  // Update algorithm information whenever algorithm or array changes
  useEffect(() => {
    if (array.length > 0 && !isInitialLoad) {
      runAlgorithm();
    }
  }, [algorithm, array]);

  // Animation effect
  useEffect(() => {
    if (isPlaying) {
      if (currentStepIndex >= sortingHistory.length - 1) {
        setIsPlaying(false);
        toast.success(`${getAlgorithmInfo(algorithm).name} completed!`, {
          description: `Performed ${comparisons} comparisons and ${swaps} swaps.`,
        });
        return;
      }

      const animate = (timestamp: number) => {
        if (!lastUpdateTimeRef.current) {
          lastUpdateTimeRef.current = timestamp;
        }

        const elapsed = timestamp - lastUpdateTimeRef.current;
        // Adjust speed - lower numbers mean faster animation
        const frameDelay = 1000 / (speed * 5);

        if (elapsed > frameDelay) {
          setCurrentStepIndex((prev) => {
            const next = prev + 1;
            if (next >= sortingHistory.length - 1) {
              setIsPlaying(false);
              toast.success(`${getAlgorithmInfo(algorithm).name} completed!`, {
                description: `Performed ${comparisons} comparisons and ${swaps} swaps.`,
              });
              return sortingHistory.length - 1;
            }
            return next;
          });
          lastUpdateTimeRef.current = timestamp;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, sortingHistory, speed, algorithm, comparisons, swaps]);

  // Run the current sorting algorithm
  const runAlgorithm = async () => {
    // Reset state
    setIsPlaying(false);
    setCurrentStepIndex(0);
    
    try {
      // Call the backend API
      const response = await sortArray([...array], algorithm);
      
      // Update state with results
      setSortingHistory(response.history);
      setComparisons(response.stats.comparisons);
      setSwaps(response.stats.swaps);
    } catch (error) {
      console.error("Error running algorithm:", error);
      toast.error("Failed to run sorting algorithm", {
        description: "There was an error connecting to the backend service.",
      });
      
      // Reset history in case of error
      setSortingHistory([]);
      setComparisons(0);
      setSwaps(0);
    }
  };

  // Generate new array
  const generateNewArray = (type: 'random' | 'nearly-sorted' | 'reversed') => {
    let newArray: number[] = [];
    
    switch (type) {
      case 'random':
        newArray = generateRandomArray(arraySize);
        break;
      case 'nearly-sorted':
        newArray = generateNearlySortedArray(arraySize);
        break;
      case 'reversed':
        newArray = generateReversedArray(arraySize);
        break;
      default:
        newArray = generateRandomArray(arraySize);
    }
    
    setArray(newArray);
    setMaxValue(Math.max(...newArray));
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setSortingHistory([]);
  };

  // Control functions
  const handlePlay = () => {
    if (currentStepIndex >= sortingHistory.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
    lastUpdateTimeRef.current = 0;
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(sortingHistory.length - 1, prev + 1));
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const handleArraySizeChange = (newSize: number) => {
    setArraySize(newSize);
    generateNewArray("random");
  };

  const handleAlgorithmChange = (newAlgorithm: SortingAlgorithm) => {
    if (newAlgorithm !== algorithm) {
      setAlgorithm(newAlgorithm);
      toast(`Switched to ${getAlgorithmInfo(newAlgorithm).name}`, {
        position: "top-right",
      });
    }
  };

  const handleStartVisualization = () => {
    setHasStarted(true);
    window.scrollTo({
      top: document.getElementById('visualizer')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  const handleGoHome = () => {
    setHasStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar
        currentAlgorithm={algorithm}
        onAlgorithmChange={handleAlgorithmChange}
        onGoHome={handleGoHome}
        hasStarted={hasStarted}
      />

      {!hasStarted ? (
        <Hero onStart={handleStartVisualization} />
      ) : (
        <main id="visualizer" className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center animate-fade-in opacity-0" style={{ animationDelay: "100ms" }}>
            <div className="w-full mb-8">
              <div className="text-center mb-8">
                <div className="chip mb-2 bg-blue-100 text-blue-700">{getAlgorithmInfo(algorithm).name}</div>
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Visualizing Sorting Algorithms</h1>
                <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                  Watch how different sorting algorithms organize data step-by-step, with real-time statistics and controls.
                </p>
              </div>

              <ArrayVisualizer
                currentStep={sortingHistory[currentStepIndex] || {
                  array,
                  comparingIndices: [],
                  sortedIndices: [],
                  selectedIndices: [],
                  pivotIndices: [],
                }}
                maxValue={maxValue}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-fade-in opacity-0" style={{ animationDelay: "300ms" }}>
              <ControlPanel
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onReset={handleReset}
                onPrevStep={handlePrevStep}
                onNextStep={handleNextStep}
                onSpeedChange={handleSpeedChange}
                onArraySizeChange={handleArraySizeChange}
                onGenerateArray={generateNewArray}
                speed={speed}
                arraySize={arraySize}
                isDisabled={sortingHistory.length === 0}
                currentStep={currentStepIndex + 1}
                totalSteps={sortingHistory.length}
              />

              <AlgorithmInfo
                info={getAlgorithmInfo(algorithm)}
                comparisons={comparisons}
                swaps={swaps}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Index;
