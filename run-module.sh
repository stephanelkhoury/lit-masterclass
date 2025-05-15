#!/bin/zsh

# Script to run any of the 8 modules in the Lit Masterclass

# Define color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Display header
echo "${BLUE}============================================${NC}"
echo "${BLUE}     Lit Masterclass Module Runner         ${NC}"
echo "${BLUE}============================================${NC}"
echo ""

# Function to run a module
run_module() {
  local module_num=$1
  local module_dir
  
  case $module_num in
    1) module_dir="01-getting-started" ;;
    2) module_dir="02-reactivity-and-templates" ;;
    3) module_dir="03-components-and-slots" ;;
    4) module_dir="04-styling-and-theming" ;;
    5) module_dir="05-directives-and-advanced-logic" ;;
    6) module_dir="06-integration-examples" ;;
    7) module_dir="07-testing" ;;
    8) module_dir="08-project-final" ;;
    *) echo "${RED}Invalid module number.${NC}"; exit 1 ;;
  esac
  
  echo "${YELLOW}Running module ${module_num}: ${module_dir}${NC}"
  
  # Check if the module directory exists
  if [ ! -d "$module_dir" ]; then
    echo "${RED}Error: Module directory $module_dir not found!${NC}"
    exit 1
  fi
  
  # Navigate to module directory
  cd "$module_dir" || exit 1
  
  # Special case for module 7 (testing)
  if [ "$module_num" -eq 7 ]; then
    echo "${GREEN}Running tests for module 7...${NC}"
    npm test
    exit 0
  fi
  
  # Special case for module 8's chart demo
  if [ "$module_num" -eq 8 ] && [ -f "run-charts-demo.sh" ]; then
    echo "${YELLOW}Module 8 has a charts demo. Do you want to run it? (y/n)${NC}"
    read -r run_charts
    if [[ "$run_charts" == "y" || "$run_charts" == "Y" ]]; then
      bash run-charts-demo.sh
      exit 0
    fi
  fi
  
  # Check if we need to install dependencies
  if [ ! -d "node_modules" ]; then
    echo "${YELLOW}Installing dependencies for $module_dir...${NC}"
    npm install
  fi
  
  # Run the development server
  echo "${GREEN}Starting development server...${NC}"
  npm run dev
}

# Display available modules
echo "Available modules:"
echo "${GREEN}1${NC} - Getting Started"
echo "${GREEN}2${NC} - Reactivity and Templates"
echo "${GREEN}3${NC} - Components and Slots"
echo "${GREEN}4${NC} - Styling and Theming"
echo "${GREEN}5${NC} - Directives and Advanced Logic"
echo "${GREEN}6${NC} - Integration Examples"
echo "${GREEN}7${NC} - Testing"
echo "${GREEN}8${NC} - Project Final"
echo ""

# Ask user which module to run
echo "${YELLOW}Enter the module number to run (1-8):${NC}"
read -r module_choice

run_module "$module_choice"
