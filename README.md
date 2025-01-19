# Thinking Framework Decision Tree (TFDT)

TFDT is a web application designed to help users navigate through decision trees and receive tailored recommendations for business frameworks and tools.

## **Features**
- Interactive decision tree navigation
- Framework/tool recommendations based on user input
- Clean and modular frontend and backend architecture

---

## **Project Structure**
```plaintext
TFDT/
│   .gitignore          # Files/directories Git should ignore
│   LICENSE             # Licensing information for the project
│   README.md           # Project description
│   reorganize.ps1      # Script for automating reorganization
│
├── Backend/            # Backend logic
│   ├── app.js          # Main backend script
│   └── decision_tree.json  # Backend's copy of the decision tree
│
├── Frontend/           # React-based frontend application
│   ├── public/         # Static assets served to the client
│   │   └── decision_tree.json  # Decision tree file for the frontend
│   ├── src/            # React source code
│   │   ├── index.css   # CSS for the app
│   │   ├── QuestionCard.js  # React component for questions
│   │   └── ResultCard.js    # React component for results
