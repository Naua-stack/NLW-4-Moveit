import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";
interface CountDownContextData {
    minutes : number;
    seconds : number;
    hasFinished : boolean;
    isActive : boolean;
    startCountDown : () => void;
    resetCountdown : () => void
}
interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;
export const CountDownContext = createContext({} as CountDownContextData);
export function CountDownProvider({children} : CountdownProviderProps){
    const {startNewChallenge} = useContext(ChallengesContext)
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    function startCountDown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])
  return(
      <CountDownContext.Provider value={{
          minutes,
          seconds,
          hasFinished,
          isActive,
          startCountDown,
          resetCountdown
      }}>
          {children}
      </CountDownContext.Provider>
  )
}

