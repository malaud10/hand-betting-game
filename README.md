# Hand Betting Game 🀄

A web-based betting game built with Mahjong tiles. Bet higher or lower on the next hand's total value and try to achieve the highest score before the game ends.

How to play:-

• 4 tiles are drawn each round

• Guess Higher or Lower for the next hand

• Correct = +1 point

• Honor tiles: win +1 value, lose −1

• Tile hits 0 or 10 → game ends

• 3rd reshuffle → game ends

## Setup

1. Clone the repository

```bash
   git clone https://github.com/malaud10/hand-betting-game.git
```

2. Install dependencies

```bash
   npm install
```

3. Start the development server

```bash
   npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173)

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- React Router v7

## Project Structure

```
src/
├── components/
│   ├── game/        → Game screen components
│   └── landing/     → Landing page components
├── config/          → Tile registry and data
├── context/         → Game context provider
├── hooks/           → useGame and useGameContext
└── utils/           → Deck management utilities
```

## AI Usage

This project was built with AI assistance :

**AI assisted with:**

- Initial architecture planning and folder structure
- Boilerplate and utility functions (shuffle algorithm, deck creation)
- Framer Motion animation syntax
- Debugging and error fixing
- Code refactoring suggestions

**Written independently:**

- Game logic decisions and rules interpretation
- Component structure and design decisions
- Visual design and tile styling
- State management approach
- All game design choices (scoring, hand size, deck composition)
