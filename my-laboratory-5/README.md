# IT313 React State & Hooks (Lab 5)

## Problem
Building a Lab Timer & Practice Tracker to monitor solved problems and elapsed time during laboratory sessions.

## Approach
- **useState**: Used to track `solved` count and `isRunning` status.
- **useEffect & Cleanup**: Used inside a custom hook (`useStopwatch`) to manage a `setInterval` timer, cleaning up the interval when the timer stops or unmounts.
- **Conditional Rendering**: Displays "Great job!" when 5 problems are solved, and toggles "Running..." / "Paused" text.
- **Lifting State Up**: `LabScreen` holds the core state and passes data/functions down to `PracticeTracker` and `Stopwatch` as props.
- **Custom Hook**: Extracted the timer logic into `useStopwatch` to keep the main component clean.

## How to Run
1. Install dependencies: `npm install`
2. Start the app: `npx expo start`
3. Scan the QR code using the Expo Go app on your mobile device.