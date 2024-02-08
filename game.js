let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");

const doorBot = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const doorBeach = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const doorSpace = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let closedDoor = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
const startButton = document.getElementById("start");
let currentlyPlaying = true;
let currentStreakBox = document.getElementById("current-streak");
let pointsBox = document.getElementById("points");
let numberOfStreaks = 0;
let points = 0;

const isBot = (door) => {
  if(door.src === doorBot){
    return true;
  }else{
    return false;
  }
}

const isClicked = (door) => {
  if(door.src === closedDoor){
    return false;
  }else{
    return true;
  }
};

const playDoor = (door) => {
  numClosedDoors--;
  if(numClosedDoors === 0){
    gameOver("win");
    numberOfStreaks++;
    currentStreakBox.innerHTML = numberOfStreaks;
    points = numberOfStreaks + points;
    pointsBox.innerHTML = points;
    
  }else if (isBot(door)){
    gameOver();
    numberOfStreaks = 0;
    currentStreakBox.innerHTML = numberOfStreaks;
  }
};

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if(choreDoor === 0){
    openDoor1 = doorBot;
    openDoor2 = doorBeach;
    openDoor3 = doorSpace;
  }else if(choreDoor === 1){
    openDoor2 = doorBot;
    openDoor1 = doorSpace;
    openDoor3 = doorBeach;
  }else{
    openDoor3 = doorBot;
    openDoor2 = doorSpace;
    openDoor1 = doorBeach;
  }
};

doorImage1.onclick = () => {
  if(!isClicked(doorImage1) && currentlyPlaying ){
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};

doorImage2.onclick = () => {
  if(!isClicked(doorImage2) && currentlyPlaying ){
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if(!isClicked(doorImage3) && currentlyPlaying ){
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

startButton.onclick = () => {
  if(!currentlyPlaying){  
    startRound();
  }
}

const startRound = () => {
  doorImage1.src = closedDoor;
  doorImage2.src = closedDoor;
  doorImage3.src = closedDoor; 
  numClosedDoors = 3;
  startButton.innerHTML = "Good luck!";
    startButton.style.display = "none";
  startButton.style.padding = "";
    startButton.style.backgroundColor = "";
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}

const gameOver = (status) => {
  if(status === 'win'){
    startButton.innerHTML = 'You win! Play again?';
    startButton.style.padding = "10px";
    startButton.style.backgroundColor = "#EAB441";
 
  }else{
    startButton.innerHTML = "Game over! Play again?";
    startButton.style.padding = "10px";
  }
  startButton.style.display = "block";
  currentlyPlaying = false;
};





startRound();

