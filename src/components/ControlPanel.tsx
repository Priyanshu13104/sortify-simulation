
import React from "react";
import { 
  Play, Pause, SkipBack, SkipForward, RefreshCw, 
  BarChart, ChevronsUp, ChevronsDown, Shuffle
} from "lucide-react";

interface ControlPanelProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSpeedChange: (speed: number) => void;
  onArraySizeChange: (size: number) => void;
  onGenerateArray: (type: 'random' | 'nearly-sorted' | 'reversed') => void;
  speed: number;
  arraySize: number;
  isDisabled: boolean;
  currentStep: number;
  totalSteps: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onPrevStep,
  onNextStep,
  onSpeedChange,
  onArraySizeChange,
  onGenerateArray,
  speed,
  arraySize,
  isDisabled,
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="glass-panel space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Controls</h3>
        <div className="chip bg-gray-100 text-gray-600">
          Step {currentStep} / {totalSteps}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        <button
          onClick={onReset}
          disabled={isDisabled}
          className="button-icon p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none rounded-md"
          title="Reset"
        >
          <RefreshCw size={18} />
        </button>
        <button
          onClick={onPrevStep}
          disabled={isDisabled || currentStep <= 1}
          className="button-icon p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none rounded-md"
          title="Previous Step"
        >
          <SkipBack size={18} />
        </button>
        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={isDisabled || currentStep >= totalSteps}
          className={`button-icon p-2 ${isPlaying ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"} disabled:opacity-50 disabled:pointer-events-none rounded-md`}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          onClick={onNextStep}
          disabled={isDisabled || currentStep >= totalSteps}
          className="button-icon p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none rounded-md"
          title="Next Step"
        >
          <SkipForward size={18} />
        </button>
        <button
          onClick={() => onGenerateArray('random')}
          disabled={isDisabled}
          className="button-icon p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none rounded-md"
          title="Generate Random Array"
        >
          <Shuffle size={18} />
        </button>
      </div>

      <div className="space-y-3 pt-2">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-500">Animation Speed</label>
            <span className="text-xs text-gray-500">{speed}x</span>
          </div>
          <input
            type="range"
            min="0.25"
            max="3"
            step="0.25"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            disabled={isDisabled}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-500">Array Size</label>
            <span className="text-xs text-gray-500">{arraySize}</span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={arraySize}
            onChange={(e) => onArraySizeChange(parseInt(e.target.value))}
            disabled={isDisabled || isPlaying}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2">
        <button
          onClick={() => onGenerateArray('random')}
          disabled={isDisabled || isPlaying}
          className="text-xs py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Random
        </button>
        <button
          onClick={() => onGenerateArray('nearly-sorted')}
          disabled={isDisabled || isPlaying}
          className="text-xs py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Nearly Sorted
        </button>
        <button
          onClick={() => onGenerateArray('reversed')}
          disabled={isDisabled || isPlaying}
          className="text-xs py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Reversed
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
