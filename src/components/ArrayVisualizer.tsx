
import React from "react";
import { ArrayBarProps, SortingStep } from "@/types/types";

// Single array bar component
const ArrayBar: React.FC<ArrayBarProps> = ({ value, state, height, index }) => {
  // Define color based on bar state
  const getBarColor = () => {
    switch (state) {
      case "comparing":
        return "bg-amber-400";
      case "sorted":
        return "bg-emerald-400";
      case "selected":
        return "bg-rose-500";
      case "pivot":
        return "bg-violet-500";
      default:
        return "bg-blue-500";
    }
  };

  // Determine whether to show value inside the bar based on array size
  const shouldShowValueInside = height.replace('%', '') > '15';

  return (
    <div
      className={`array-bar ${getBarColor()} relative flex flex-col justify-end items-center transition-all`}
      style={{
        height,
        transform: state === "selected" ? "scale(1.05)" : "scale(1)",
        width: "100%",
        minWidth: "4px", // Narrower width for larger arrays
        maxWidth: "30px", // But limit max width for visual aesthetics
        margin: "0 1px", // Smaller margin between bars
        borderRadius: "4px 4px 0 0",
      }}
    >
      {shouldShowValueInside && (
        <span className="text-white font-medium text-xs mb-1 truncate max-w-full px-1">
          {value}
        </span>
      )}
      <span 
        className="array-bar-label text-xs font-medium absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        style={{ 
          color: state === "sorted" ? "#065f46" : 
                 state === "comparing" ? "#92400e" : 
                 state === "selected" ? "#be123c" : 
                 state === "pivot" ? "#6b21a8" : "#1e3a8a",
          fontSize: "0.65rem" // Smaller font size for the label
        }}
      >
        {value}
      </span>
    </div>
  );
};

interface ArrayVisualizerProps {
  currentStep: SortingStep;
  maxValue: number;
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  currentStep,
  maxValue,
}) => {
  const getBarState = (index: number): "default" | "comparing" | "sorted" | "selected" | "pivot" => {
    if (currentStep.pivotIndices?.includes(index)) return "pivot";
    if (currentStep.selectedIndices?.includes(index)) return "selected";
    if (currentStep.comparingIndices?.includes(index)) return "comparing";
    if (currentStep.sortedIndices?.includes(index)) return "sorted";
    return "default";
  };

  // Calculate dynamic spacing based on array size
  const arraySize = currentStep.array.length;
  const containerPadding = arraySize > 50 ? "pb-16" : "pb-12"; // More padding for larger arrays

  return (
    <div className={`visualizer-container h-80 flex items-end justify-center ${containerPadding} mb-8`}>
      <div className="flex items-end justify-center w-full h-full" style={{ overflow: "visible" }}>
        {currentStep.array.map((value, index) => (
          <ArrayBar
            key={`${index}-${value}`}
            value={value}
            state={getBarState(index)}
            height={`${(value / maxValue) * 80}%`}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;
