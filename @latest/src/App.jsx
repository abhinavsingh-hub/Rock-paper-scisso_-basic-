import { useState, useEffect } from 'react'

const WINNING_SCORE = 3;

function App() {
  const [urans, seturans] = useState("");
  const [computerans, setcomputerans] = useState("");
  const [result, setResult] = useState("");
  const [yourscore, setYourscore] = useState(0);
  const [computerscore, setComputerscore] = useState(0);
  const [tournamentWinner, setTournamentWinner] = useState(null);
  
  const choices = [
    { name: "ROCK🪨", icon: "🪨", label: "Rock" },
    { name: "PAPER📄", icon: "📄", label: "Paper" },
    { name: "SCISSOR✂️", icon: "✂️", label: "Scissors" }
  ];

  useEffect(() => {
    if (yourscore === WINNING_SCORE) {
      setTournamentWinner("PLAYER");
    } else if (computerscore === WINNING_SCORE) {
      setTournamentWinner("AI");
    }
  }, [yourscore, computerscore]);

  const handleClick = (choiceName) => {
    if (tournamentWinner) return;

    seturans(choiceName);

    const randomselect = Math.floor(Math.random() * choices.length);
    const compChoice = choices[randomselect].name;
    setcomputerans(compChoice);

    if (choiceName === compChoice) {
      setResult("It's a tie! 🤝");
    } else if (
      (choiceName === "ROCK🪨" && compChoice === "SCISSOR✂️") ||
      (choiceName === "PAPER📄" && compChoice === "ROCK🪨") ||
      (choiceName === "SCISSOR✂️" && compChoice === "PAPER📄")
    ) {
      setResult("You win! 🎉");
      setYourscore(prev => prev + 1);
    } else {
      setResult("Computer wins! 🤖");
      setComputerscore(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setYourscore(0);
    setComputerscore(0);
    setResult("");
    seturans("");
    setcomputerans("");
    setTournamentWinner(null);
  };

  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container">
        <header>
          <h1>RPS Royale</h1>
          <p className="description">
            Tournament Mode: First to <strong>{WINNING_SCORE}</strong> wins the match!
          </p>
        </header>

        <main className="glass-card">
          {tournamentWinner ? (
            <div className="result-section" style={{ background: tournamentWinner === "PLAYER" ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)" }}>
              <div className="status-label">Tournament Over</div>
              <h2 className="result-text" style={{ fontSize: '3rem' }}>
                {tournamentWinner === "PLAYER" ? "Match Champion! 🏆" : "AI Reigned Supreme! 🤖"}
              </h2>
              <button onClick={handleReset} className="reset-button" style={{ marginTop: '2rem', border: '2px solid' }}>
                Play Again
              </button>
            </div>
          ) : (
            <>
              <div className="choices-grid">
                {choices.map((choice) => (
                  <button 
                    key={choice.name}
                    onClick={() => handleClick(choice.name)} 
                    className="choice-button"
                    disabled={!!tournamentWinner}
                  >
                    <span>{choice.icon}</span>
                    <span className="choice-label">{choice.label}</span>
                  </button>
                ))}
              </div>

              {result && (
                <div className="result-section">
                  <div className="status-label">Round Result</div>
                  <h2 className="result-text">{result}</h2>
                </div>
              )}

              <div className="game-status">
                <div className="status-card">
                  <div className="status-label">Your Move</div>
                  <div className="status-value">{urans || "—"}</div>
                </div>
                <div className="status-card">
                  <div className="status-label">AI Move</div>
                  <div className="status-value">{computerans || "—"}</div>
                </div>
              </div>

              <div className="score-grid">
                <div className="score-box" style={{ borderLeft: yourscore > computerscore ? '4px solid #22c55e' : 'none' }}>
                  <div className="status-label">Player Score</div>
                  <div className="status-value">{yourscore}</div>
                </div>
                <div className="score-box" style={{ borderLeft: computerscore > yourscore ? '4px solid #ef4444' : 'none' }}>
                  <div className="status-label">AI Score</div>
                  <div className="status-value">{computerscore}</div>
                </div>
              </div>

              {(yourscore > 0 || computerscore > 0) && (
                <button onClick={handleReset} className="reset-button">
                  New Match
                </button>
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default App
