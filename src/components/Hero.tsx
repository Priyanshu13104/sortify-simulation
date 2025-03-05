
import React, { useEffect, useState } from "react";
import { ArrowDownAZ, BarChart2 } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  // Sample array for sorting animation
  const [array, setArray] = useState([35, 15, 80, 25, 65, 40, 55, 30]);
  const [sorting, setSorting] = useState(false);

  // Bubble sort animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let sortingArray = [...array];
    let step = 0;
    
    const animateBubbleSort = () => {
      if (step >= sortingArray.length - 1) {
        setSorting(false);
        // Reset and start again
        setTimeout(() => {
          setArray([35, 15, 80, 25, 65, 40, 55, 30]);
          setSorting(true);
        }, 2000);
        return;
      }

      const newArray = [...sortingArray];
      
      for (let i = 0; i < sortingArray.length - step - 1; i++) {
        if (newArray[i] > newArray[i + 1]) {
          // Swap elements
          const temp = newArray[i];
          newArray[i] = newArray[i + 1];
          newArray[i + 1] = temp;
        }
      }
      
      sortingArray = newArray;
      setArray(newArray);
      step++;
      
      timeoutId = setTimeout(animateBubbleSort, 800);
    };

    if (sorting) {
      timeoutId = setTimeout(animateBubbleSort, 800);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [sorting, array]);

  // Start the animation when component mounts
  useEffect(() => {
    setSorting(true);
    return () => setSorting(false);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-16 sm:py-24">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <BarChart2 className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Visualize Sorting Algorithms
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Understand how different sorting algorithms work by watching them in action. Compare efficiency, learn about time complexity, and see the step-by-step process of organizing data.
            </p>
          </div>
          
          <div className="mt-12 sm:mt-16">
            <div className="mx-auto max-w-2xl overflow-hidden rounded-xl shadow-lg">
              <div className="bg-white p-4 h-64 flex items-center justify-center">
                <div className="text-center w-full">
                  <div className="flex justify-center space-x-2">
                    {array.map((height, i) => (
                      <div 
                        key={i}
                        className="bg-primary w-8 rounded-t-md transition-all duration-500"
                        style={{ 
                          height: `${height}%`,
                          transition: 'height 0.5s ease-in-out'
                        }}
                      >
                        <div className="text-white font-bold text-sm mt-2">
                          {height}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    {sorting ? "Sorting in progress..." : "Sorting complete!"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-x-6">
            <button
              onClick={onStart}
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center"
            >
              <ArrowDownAZ className="mr-2 h-4 w-4" />
              Start Visualizing
            </button>
            <a href="#learn-more" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
