
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';
export function ChallengeBox() {
    
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountDownContext);

    function handleChallengeSucceeed () {
      completeChallenge();
      resetCountdown();
    }

    function handleChallengeFailed () {
      resetChallenge()
      resetCountdown();
    }
 
    return (
        
            <div className={styles.challengeBoxContainer}>
                {activeChallenge ? (
                   <div className={styles.challengeActive}>
                       <header>Ganhe {activeChallenge.amount} xp</header>
                       <main>
                           <img src={`icons/${activeChallenge.type}.svg`}/>
                           <strong>Novo desafio</strong>
                           <p>{activeChallenge.description}</p>
                       </main>
                       <footer>
                           <button 
                            type="button"
                            onClick={handleChallengeFailed}
                            className={styles.challengeFailedButton}
                            >Falhei</button>
                           <button 
                           type="button"
                           className={styles.challengeSucceededButton}
                           onClick={handleChallengeSucceeed}
                           >Completei</button>
                       </footer>
                   </div>
                )
                 :(
                 <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="level Up"/>
                            Avance de level completando desafios
                        
                    </p>
                </div>)}
            </div>
      
    )
}