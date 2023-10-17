import { getCookie } from 'cookies-next';
import { limit } from 'firebase/firestore';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

export const TimerContext = createContext<TimerContextData>(
  {} as TimerContextData
);

interface TimerProps {
  children?: React.ReactNode;
  navigation?: any;
}

interface TimerContextData {
  startTimestamp: () => void;
  loadTime: () => void;
  time: number;
  setTime: any;
  start: any;
  limit: number;
  isRunning: boolean;
  setIsRunning: any;
}

export const TimerProvider: React.FC<TimerProps> = ({
  children,
  navigation
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  var limit = 60 * 60; // 5 minutes in seconds
  const [start, setStart] = useState<any>(null);
  const [time, setTime] = useState<number>(limit);

  // Save initial timestamp to AsyncStorage when timer starts
  async function startTimestamp() {
    const futureTime = 60 * 60; // Add 60 minutes (3600 seconds) in milliseconds
    setTime(futureTime);
    setIsRunning(true);
  }

  async function loadTime() {
    try {
      const user: any = await getCookie('user');
      const jsonUser = JSON.parse(user);
      const parsedValidation = JSON.parse(jsonUser.Validation);
      const limit = parsedValidation.LimitHour;
      const storedTimestamp = limit;
      console.log(storedTimestamp);
      if (storedTimestamp) {
        const limitHour: any = new Date(storedTimestamp).getTime();
        const currentTime: any = new Date().getTime();
        const remainingSeconds = Math.floor((limitHour - currentTime) / 1000);
        updateSeconds(remainingSeconds);

        console.log('Faltam : ' + remainingSeconds + ' segundos');
      }
    } catch (error) {
      console.log('Error loading initial timestamp:', error);
    }
  }

  function updateSeconds(value: number) {
    console.log(typeof value);

    if (value > 0) {
      limit = value;
      setTime(value);
      setIsRunning(true);
    }
  }

  // Joining all variables that we want to export
  return (
    <TimerContext.Provider
      value={{
        isRunning,
        setIsRunning,
        limit,
        loadTime,
        startTimestamp,
        start,
        time,
        setTime
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

// Exporting the variables, and can be used for GET this variables exported
export function useTimer() {
  const context = useContext(TimerContext);
  return context;
}
