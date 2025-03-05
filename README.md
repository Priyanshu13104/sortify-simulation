# Sorting Techniques Visualizer

## Overview

The **Sorting Techniques Visualizer** is a web-based educational tool designed to help students understand and compare various sorting algorithms. The tool visually demonstrates the step-by-step process of different sorting techniques while providing insights into each algorithm’s performance. By offering an interactive and engaging experience, students can explore how each sorting algorithm behaves and understand their time complexities and efficiencies.

## Features

- **Sorting Algorithms**: The following sorting algorithms are included:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort
  - Radix Sort
  - Bucket Sort
- **Real-time Visualization**: The sorting process will be visualized in a box taking up 70% of the screen. The visualization shows the sorting steps and animations for an immersive experience.
- **User Input**: 
  - Users can input custom arrays to see how the algorithms sort different datasets.
  - Users can control the speed of the sorting visualization to observe fast or slow sorting actions.
- **Educational Stats**: Real-time statistics such as the time complexity of the algorithm, the number of comparisons, and the number of swaps will be displayed.
- **Side-by-side Comparison**: Users will be able to compare sorting algorithms by running them in parallel and observing differences in performance.
- **Reset on Reload**: The tool will reset all data and settings when the page is reloaded, ensuring a fresh start.

## Target Audience

This tool is intended for:
- Students learning data structures and algorithms.
- Educators who want to demonstrate sorting techniques visually in a classroom setting.
- Anyone curious about how different sorting algorithms work.

## Technical Stack

- **Frontend**: 
  - React.js for building a dynamic and interactive user interface.
  - Tailwind CSS for styling and making the design vibrant and user-friendly.
- **Backend**:
  - Python for handling the core logic of the sorting algorithms.
  - The sorting algorithms are implemented in Python for optimal performance and accuracy.
- **Integration**: 
  - React and Python are integrated to provide seamless communication between the user’s inputs and the sorting logic.

## Conceptual Data Model

- The tool does not store any persistent data. All user inputs (such as custom arrays) are processed in memory, and the settings will reset once the page is reloaded.

## Installation

### Prerequisites

- Node.js (for running the React frontend)
- Python (for running the backend sorting algorithms)

### Steps to Set Up the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/sorting-techniques-visualizer.git
   cd sorting-techniques-visualizer

2. **Frontend Setup**
   ```bash
   npm install
   npm run dev

3. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt

4. **Launch Applicaiton**
    - Once both the frontend and backend are running, open your browser and go to http://localhost to start using the sorting visualizer.

## How to Use

- **Select Array Size From the given Range**: Users can select prefered array size from the range 5 - 50.
- **Adjust Speed**: Modify the speed of the visualization to observe the sorting steps at different paces.
- **Select an Algorithm**: Choose any sorting algorithm from the list to see how it sorts the array.
- **Reset**: Reload the page to reset the array and start again.

## User Interface Design Principles

- **Vibrant and Engaging**: The design will focus on a lively, interactive interface to engage students. The sorting visualization will be large and centered, taking up 70% of the screen.
- **Educational Stats**: Alongside the visualization, real-time statistics (comparisons, time complexity) will be prominently displayed to enhance understanding.
- **Controls**: Simple controls will be available for users to adjust the speed, input custom arrays, and compare algorithms.

## Future Expansion

- **Additional Sorting Algorithms**: More sorting techniques may be added in the future to expand the tool’s educational value.
- **Mobile Support**: The application could be adapted to work on mobile devices for broader accessibility.
- **Advanced Visualizations**: Future versions may include advanced visual effects or interactive tutorials to make the learning process even more engaging.

## Contact

For any questions or feedback, please reach out at:

- **Email**: your-priyanshuprajapati13@gmail.com
- **GitHub**: [Priyanshu13104](https://github.com/Priyanshu13104)

