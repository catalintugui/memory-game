import './Card.css';

export default function Card({card, handleChoice}) {

    const handleClick = () => {
        handleChoice(card)
    }

    return (
        <div className="card">
            <div>
              <img className="card-front" src={card.src} alt="card-front" />
              <img 
                className="card-back" 
                src="../img/cover.png" 
                alt="card-back" 
                onClick={handleClick}
              />
            </div>
        </div>
    )
}