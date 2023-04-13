import { useEffect, useState } from 'react'
import Card from './components/Card';

import './App.css'

const cardImages = [
  {"src": "../img/helmet-1.png", matched: false},
  {"src": "../img/potion-1.png", matched: false},
  {"src": "../img/ring-1.png", matched: false},
  {"src": "../img/scroll-1.png", matched: false},
  {"src": "../img/shield-1.png", matched: false},
  {"src": "../img/sword-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

      setFirstChoice(null);
      setSecondChoice(null);
      setCards(shuffledCards);
      setTurns(0);
  }

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  }

  useEffect(() => {
    if(firstChoice && secondChoice){
      setDisabled(true);
      if(firstChoice.src === secondChoice.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === firstChoice.src){
              return {...card, matched: true}
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [firstChoice, secondChoice])

  useEffect(() => {
    shuffleCards();
  }, [])

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>new game</button>
      <div className="card-grid">
        {cards.map(card => (
          < Card 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === secondChoice || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>
          Turns: {turns}
      </p>
    </div>
  )
}

export default App
