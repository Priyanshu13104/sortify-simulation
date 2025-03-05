
# Sorting Algorithm Visualizer - Python Backend

This is the Python backend for the Sorting Algorithm Visualizer. It provides a RESTful API for sorting arrays using various algorithms and returns the step-by-step history of the sorting process.

## Setup

1. Make sure you have Python 3.8+ installed
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python main.py
   ```

The server will start on http://localhost:8000

## API Endpoints

### GET /
Welcome message

### POST /sort
Sorts an array using the specified algorithm

Request body:
```json
{
  "array": [5, 3, 8, 4, 2],
  "algorithm": "bubble"
}
```

Supported algorithms:
- bubble
- selection
- insertion
- (more to be implemented)

Response:
```json
{
  "history": [...],  // Step-by-step history of the sort
  "stats": {
    "comparisons": 10,
    "swaps": 4
  }
}
```

## Adding More Algorithms

To add more sorting algorithms, implement them in the `main.py` file and add them to the `SORT_ALGORITHMS` dictionary.
