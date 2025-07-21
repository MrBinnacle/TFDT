# Thinking Framework Decision Tree (TFDT)

TFDT helps users explore decision frameworks and tools through an interactive decision tree.

## Features
- Interactive navigation
- Framework recommendations
- Simple Node/React prototype

## Project structure
```
TFDT/
├── Backend/      # Express API prototype
├── Frontend/     # React demo UI
├── data/         # JSON decision tree data
└── docs/
    └── ARCHITECTURE.md  # Proposed redesign
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the recommended system overhaul using Next.js, Supabase and tRPC.

### Running locally

```
# start the backend API
npm install --prefix Backend
npm start --prefix Backend

# in a separate terminal start the frontend (requires a bundler like create-react-app)
npm install --prefix Frontend
npm start --prefix Frontend
```
