import "../styles/Modal.css";

export default function Modal({ isOpen, onClose, currentScore, bestScore }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 5h2v2H5zm4 4H7V7h2zm2 2H9V9h2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm2-2v2h-2V9zm2-2v2h-2V7zm0 0V5h2v2z"
            />
          </svg>
        </button>
        <h2 className="modal-title">Game Over!</h2>
        <h3>You clicked the same Pokemon twice</h3>
        <div className="modal-content">
          <p>Your Score: {currentScore}</p>
          <p>Best Score: {bestScore}</p>
        </div>
        <button className="modal-button" onClick={onClose}>
          Play Again
        </button>
      </div>
    </div>
  );
}
