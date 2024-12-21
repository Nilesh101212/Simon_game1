let order=[];
let playerOrder=[];
let on=true;
let win = true;
let level=0;
// let isPlayerInputEnabled = false; 
const greenButton = document.querySelector("#green");
const redButton = document.querySelector("#red");
const yellowButton = document.querySelector("#yellow");
const blueButton = document.querySelector("#blue");
const scoreDisplay=document.querySelector("#score-display");
const startButton = document.querySelector("#start-button");

const colors = [greenButton, redButton, yellowButton, blueButton];

startButton.addEventListener("click",(e)=>{
   if(on || win)
   {
      play();
   }
})
function nextLevel() {
    level++;
    playerOrder = [];
    // scoreDisplay.textContent = `Score: ${level}`;
    flashSequence();
}
function play()
{
    win = false;
    order=[];
    playerOrder=[];
    scoreDisplay.innerHTML = `Score: 0`;
   for(let i=1;i<20;i++)
   {
       order.push(Math.floor(Math.random()*4)+1);
   }
   nextLevel();
}
function playColor(colorIndex)
{
  const button =colors[colorIndex-1];
  button.classList.add("active");
  setTimeout(()=>{
    button.classList.remove("active");
  },400);   
}
function flashSequence()
{
    let i=0;
    const interval=setInterval(()=>{
       if(i>=level)
       {
        clearInterval(interval);
        enablePlayerInput();
        return;
       }
       playColor(order[i]);
       i++;
    },1000);
}


  function handlePlayerInput(colorIndex)
{
    // if (!isPlayerInputEnabled) return;
    playerOrder.push(colorIndex);
    playColor(colorIndex);
    if(playerOrder[playerOrder.length-1] != order[playerOrder.length-1])
    {
        gameOver();
        return;
    }
    if(playerOrder.length==level)
        {
        scoreDisplay.textContent = `Score: ${level}`;
        disablePlayerInput();
        setTimeout(()=>{
            nextLevel();
        },2000);
    }
}
function enablePlayerInput() {
    colors.forEach((button) => {
        button.addEventListener("click", handleButtonClick);
    });
}
function disablePlayerInput() {
    colors.forEach((button) => {
        button.removeEventListener("click", handleButtonClick);
    });
}
function handleButtonClick(event) {
    const button = event.target;
    const colorIndex = colors.indexOf(button) + 1;
    handlePlayerInput(colorIndex);
}

function gameOver() {
    scoreDisplay.textContent = `Game Over! Final Score: ${level-1}`;
    on = true;
    win = false;
    disablePlayerInput();
    alert("Game Over! Click Start to try again.");
}

