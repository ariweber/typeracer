# TypeRacer

A browser game for practicing fast typing.

## What the app does

- Sentences appear on the screen, and you type them word by word.
- The timer starts on your first keystroke. You can pause it and resume from the same spot.
- Typing mistakes show up right away, and you can't move to the next word until you fix them.
- When the game ends, you see your time and your speed in words per minute (WPM).
- A leaderboard keeps your 6 best results.
- There are several sets of sentences: Hebrew, English, and code. On the "Edit sets" page you can create new sets and add or delete sentences.

Scores and sets are saved in your browser (localStorage), so they stay after you refresh the page.

## Installation and running

You need a recent (LTS) version of [Node.js](https://nodejs.org).

1. Get the project and go into its folder:
   ```
   git clone <repo-url>
   cd typeracer
   ```
2. Install the dependencies (do this once, and again after every fresh clone):
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open the address shown in the terminal in your browser, usually http://localhost:5173

## Other commands

| Command | What it does |
| --- | --- |
| `npm run build` | Builds a version ready to deploy (into the `dist` folder) |
| `npm run preview` | Runs the built version locally |
| `npm run lint` | Checks the code for problems |

## Project structure

```
src/
  main.tsx           Entry point: renders the app with the router
  App.tsx            Routes: "/" game, "/sets" set editor
  index.css          All styles
  types.ts           Shared types (Score, TextSet)

  pages/
    GamePage.tsx     The game screen and its logic
    SetsPage.tsx     Create and edit sentence sets

  components/
    TextDisplay.tsx  Shows the sentence and highlights the current word
    WordLetters.tsx  Colors each letter of the current word (correct/wrong)
    TypingInput.tsx  Typing box with error message
    Stopwatch.tsx    Timer with pause/resume
    Result.tsx       End-of-game summary (WPM, time, words)
    Leaderboard.tsx  Top scores table
    SetPicker.tsx    Dropdown for choosing a set
    AddTextForm.tsx  Small form for adding a sentence or set

  stores/            MobX state, saved to localStorage automatically
    setsStore.ts     Sentence sets
    leaderboardStore.ts  Scores

  hooks/
    useStopwatch.ts  Timer logic
    useLeaderboard.ts, useTextSets.ts  Older state hooks (replaced by stores, unused)

  utils/
    typing.ts        Word checks (error, word done, last word)
    textDisplay.ts   CSS classes for words and letters
    wpm.ts           Word count and WPM calculation
    leaderboard.ts   Load/save/sort scores
    textSets.ts      Load/save sets and clean up text

  data/
    texts.ts         Default sentence sets (Hebrew, English, code)
```

## Tech stack

React, TypeScript, Vite, MobX, and React Router.
