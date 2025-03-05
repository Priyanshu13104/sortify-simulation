
import React, { useState } from "react";
import { ChevronDown, Github, Home, List } from "lucide-react";
import { SortingAlgorithm } from "@/types/types";
import { getAlgorithmInfo } from "@/utils/sortingAlgorithms";

interface NavbarProps {
  currentAlgorithm: SortingAlgorithm;
  onAlgorithmChange: (algorithm: SortingAlgorithm) => void;
  onGoHome?: () => void;
  hasStarted?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  currentAlgorithm,
  onAlgorithmChange,
  onGoHome,
  hasStarted = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const algorithms: SortingAlgorithm[] = [
    "bubble",
    "selection",
    "insertion",
    "merge",
    "quick",
    "heap",
    "radix",
    "bucket"
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAlgorithmSelect = (algorithm: SortingAlgorithm) => {
    onAlgorithmChange(algorithm);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6H21M3 12H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span onClick={onGoHome} className="ml-2 text-xl font-semibold text-gray-900 cursor-pointer">
                Sorting Visualizer
              </span>
            </div>
            
            {hasStarted && (
              <div className="ml-6 relative">
                <button
                  onClick={toggleDropdown}
                  className="px-3 py-2 text-sm font-medium rounded-md bg-primary text-white flex items-center"
                >
                  <List className="mr-2 h-4 w-4" />
                  {getAlgorithmInfo(currentAlgorithm).name}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {algorithms.map((algo) => (
                        <button
                          key={algo}
                          onClick={() => handleAlgorithmSelect(algo)}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            currentAlgorithm === algo
                              ? "bg-gray-100 text-primary font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          role="menuitem"
                        >
                          {getAlgorithmInfo(algo).name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center">
            {hasStarted && onGoHome && (
              <button
                onClick={onGoHome}
                className="text-gray-600 hover:text-gray-900 mr-4 flex items-center"
              >
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </button>
            )}
            <a
              href="https://github.com/Priyanshu13104/sortify-simulations"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <Github className="h-5 w-5 mr-1" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
