import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]); 

  return seconds;
}
interface StopwatchProps {
  seconds: number;
  isRunning: boolean;
}
function Stopwatch({ seconds, isRunning }: StopwatchProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.text}>{seconds < 10 ? `00:0${seconds}` : `00:${seconds}`}</Text>
      <Text style={styles.status}>{isRunning ? "Running..." : "Paused"}</Text>
    </View>
  );
}
interface PracticeTrackerProps {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
}
function PracticeTracker({ solved, onSolve, onReset }: PracticeTrackerProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.text}>Solved: {solved}</Text>
      {/* Conditional rendering for reaching 5 */}
      {solved >= 5 && <Text style={styles.success}>Great job!</Text>}
      
      <View style={styles.buttonRow}>
        <Button title="Solve +1" onPress={onSolve} />
        <Button title="Reset" onPress={onReset} />
      </View>
    </View>
  );
}
export default function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const seconds = useStopwatch(isRunning);

  const handleSolve = () => setSolved((s) => s + 1);
  const handleReset = () => setSolved(0);
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lab Timer & Tracker</Text>
      
      <PracticeTracker 
        solved={solved} 
        onSolve={handleSolve} 
        onReset={handleReset} 
      />
      
      <Stopwatch 
        seconds={seconds} 
        isRunning={isRunning} 
      />
      
      <View style={styles.buttonRow}>
        <Button title="Start" onPress={handleStart} />
        <Button title="Stop" onPress={handleStop} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  section: { marginVertical: 20, alignItems: 'center' },
  text: { fontSize: 20 },
  status: { fontSize: 16, color: 'gray', marginTop: 5 },
  success: { fontSize: 18, color: 'green', fontWeight: 'bold', marginTop: 5 },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 10 }
});