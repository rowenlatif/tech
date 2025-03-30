let timer;
let timeRemaining;
let isTimerRunning = false;
let clockInterval;


document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);


function startTimer() {
   if (isTimerRunning) return;


   let minutes = document.getElementById("minutesInput").value;
   if (isNaN(minutes) || minutes <= 0) return;
  
   timeRemaining = minutes * 60;
   isTimerRunning = true;


   // Stop clock if it's running
   clearInterval(clockInterval);
   document.getElementById("status").innerHTML = "Mode: Timer";


   timer = setInterval(() => {
       timeRemaining--;
       let mins = Math.floor(timeRemaining / 60);
       let secs = timeRemaining % 60;
       document.getElementById("display").innerHTML = mins + ":" + secs;


       if (timeRemaining == 0) {
           clearTimeout(timer);
           isTimerRunning = false;
           showClock();
       }
   }, 1000);
}


function showClock() {
   clearInterval(clockInterval);


   if (isTimerRunning) return;


   document.getElementById("status").innerHTML = "Mode: Clock";


   clockInterval = setInterval(() => {
       let now = new Date();
       let hours = now.getHours();
       let minutes = now.getMinutes();
       let seconds = now.getSeconds();
       document.getElementById("display").innerHTML = hours + ":" + minutes + ":" + seconds;
   }, 1000);
}


function resetTimer() {
   clearInterval(timer);
   isTimerRunning = false;
   showClock();
}