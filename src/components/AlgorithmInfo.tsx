
import React from "react";
import { AlgorithmInfo as AlgorithmInfoType } from "@/types/types";
import { Clock, Database, CheckCircle2, Info } from "lucide-react";

interface AlgorithmInfoProps {
  info: AlgorithmInfoType;
  comparisons: number;
  swaps: number;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ info, comparisons, swaps }) => {
  return (
    <div className="glass-panel space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">Algorithm Information</h3>
        <div className={`chip ${info.isStable ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
          {info.isStable ? "Stable" : "Unstable"}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1">
            <Clock size={12} className="text-primary" /> Time Complexity
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-gray-500 mb-0.5">Best</div>
              <div className="text-sm font-medium">{info.timeComplexity.best}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-gray-500 mb-0.5">Average</div>
              <div className="text-sm font-medium">{info.timeComplexity.average}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-gray-500 mb-0.5">Worst</div>
              <div className="text-sm font-medium">{info.timeComplexity.worst}</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1">
            <Database size={12} className="text-primary" /> Space Complexity
          </h4>
          <div className="bg-gray-50 p-2 rounded-md">
            <div className="text-sm font-medium">{info.spaceComplexity}</div>
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1">
            <Info size={12} className="text-primary" /> Description
          </h4>
          <div className="bg-gray-50 p-2 rounded-md">
            <p className="text-xs text-gray-700 leading-relaxed">{info.description}</p>
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1">
            <CheckCircle2 size={12} className="text-primary" /> Current Performance
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-gray-500 mb-0.5">Comparisons</div>
              <div className="text-sm font-medium">{comparisons}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-gray-500 mb-0.5">Swaps</div>
              <div className="text-sm font-medium">{swaps}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;
