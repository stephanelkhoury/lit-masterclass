#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Run Vite with the charts demo as the entry point
npx vite --open charts-demo.html
