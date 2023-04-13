import './Card.css';

export default function Card({card, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card);
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
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