# Reorganize TFDT Project Script

# Step 1: Define folders for Backend and Frontend
Write-Host "Creating Backend and Frontend structure..."
mkdir Backend -Force
mkdir Frontend -Force
mkdir Frontend\src -Force
mkdir Frontend\public -Force

# Step 2: Move Backend files
Write-Host "Moving Backend files..."
if (Test-Path .\app.js) {
    Move-Item -Force -ErrorAction SilentlyContinue .\app.js .\Backend\
    Write-Host "Moved app.js to Backend/"
} else {
    Write-Host "app.js not found. Skipping..."
}

if (Test-Path .\decision_tree.json) {
    Move-Item -Force -ErrorAction SilentlyContinue .\decision_tree.json .\Backend\
    Write-Host "Moved decision_tree.json to Backend/"
} else {
    Write-Host "decision_tree.json not found in root. Skipping..."
}

# Step 3: Move Frontend files
Write-Host "Moving Frontend files..."
if (Test-Path .\QuestionCard.js) {
    Move-Item -Force -ErrorAction SilentlyContinue .\QuestionCard.js .\Frontend\src\
    Write-Host "Moved QuestionCard.js to Frontend/src/"
} else {
    Write-Host "QuestionCard.js not found. Skipping..."
}

if (Test-Path .\ResultCard.js) {
    Move-Item -Force -ErrorAction SilentlyContinue .\ResultCard.js .\Frontend\src\
    Write-Host "Moved ResultCard.js to Frontend/src/"
} else {
    Write-Host "ResultCard.js not found. Skipping..."
}

if (Test-Path .\index.css) {
    Move-Item -Force -ErrorAction SilentlyContinue .\index.css .\Frontend\src\
    Write-Host "Moved index.css to Frontend/src/"
} else {
    Write-Host "index.css not found. Skipping..."
}

if (Test-Path .\Frontend\public\decision_tree.json) {
    Move-Item -Force -ErrorAction SilentlyContinue .\Frontend\public\decision_tree.json .\Frontend\public\
    Write-Host "Moved decision_tree.json to Frontend/public/"
} else {
    Write-Host "decision_tree.json not found in Frontend/public. Skipping..."
}

# Step 4: Clean up redundant `TFDT` folder
Write-Host "Removing redundant TFDT folder if it exists..."
if (Test-Path .\TFDT) {
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue .\TFDT
    Write-Host "Removed redundant TFDT folder."
} else {
    Write-Host "TFDT folder not found. Skipping cleanup..."
}

# Step 5: Clean up duplicate or misplaced files
Write-Host "Ensuring root files are clean..."
if (Test-Path .\TFDT\.gitignore) {
    Remove-Item -Force -ErrorAction SilentlyContinue .\TFDT\.gitignore
    Write-Host "Removed duplicate .gitignore from TFDT/"
}
if (Test-Path .\TFDT\LICENSE) {
    Remove-Item -Force -ErrorAction SilentlyContinue .\TFDT\LICENSE
    Write-Host "Removed duplicate LICENSE from TFDT/"
}
if (Test-Path .\TFDT\README.md) {
    Remove-Item -Force -ErrorAction SilentlyContinue .\TFDT\README.md
    Write-Host "Removed duplicate README.md from TFDT/"
}

# Step 6: Verify Final Structure
Write-Host "Final Structure:"
tree /F

Write-Host "Project reorganization completed successfully!"
