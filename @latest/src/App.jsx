import { useState } from 'react'

function App() {

  let [urans, seturans]=useState("");
  let [computerans, setcomputerans]=useState("");
  let [result, setResult]=useState("");
  let [yourscore, setYourscore]=useState(0);
  let [computerscore, setComputerscore]=useState(0);
  let choices=["ROCK🪨", "PAPER📄", "SCISSOR✂️"];
  let handleClick=(choice) => {
    seturans(choice);

    let randomselect=Math.floor(Math.random() * choices.length);
    let computerans=choices[randomselect];
    setcomputerans(computerans);
    if (choice===computerans) {
      setResult("Its a tie");
    } else if (
      (choice==="ROCK🪨" && computerans==="SCISSOR✂️")||(choice==="PAPER📄" && computerans==="ROCK🪨")||(choice==="SCISSOR✂️" && computerans==="PAPER📄")
    
      ) {
      setResult("You win");
        setYourscore(yourscore + 1);
      } else {
      setResult("Computer wins");
        setComputerscore(computerscore + 1);
      }
    };


  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <h3>Overview</h3>
      <p>Rock Paper Scissors is a game played between two people. Players can choose from options of Rock/Paper/Scissor. There is a combination of winning and losing conditions. If you dont know, just play, you'll figure it out lad!</p>
        <br /><br />
        <button onClick={()=> handleClick("ROCK🪨")} className='button'>🪨</button>
        <button onClick={()=> handleClick("PAPER📄")} className='button'>🧾</button>
        <button onClick={()=> handleClick("SCISSOR✂️")} className='button'>✂️</button>
        <br></br>
        <h2>Your choice is {urans}</h2>
        <h2>Computer's choice is {computerans}</h2>
        <h2>Result - {result}</h2>
        <h2>Your score is {yourscore}</h2>
        <h2>Computer's score is {computerscore}</h2>
        <br /><br />
        <button onClick={()=> {setYourscore(0); setComputerscore(0); setResult(""); seturans(""); setcomputerans("");}}>Reset</button>
      </div>
  )
}

export default App
