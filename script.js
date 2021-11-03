
const ninja = document.querySelector(".ninja")
const background = document.querySelector(".layer0");

let isJumping = false;
let position = 0;

let ninjaRun
let beeFlying

function animateNinja(){
  let position = 158.52;
  const interval = 80;

  ninjaRun = setInterval(()=>{
    document.querySelector(".ninja").style.backgroundPosition = `-${position}px 0px`
    if(position < 1426){
      position = position + 158.52;
    } else {
      position = 158.52
    }
  }, interval)
}

function animateBee(){
  let position = 130;
  const interval = 20;

  ninjaRun = setInterval(()=>{
    document.querySelector(".bee").style.backgroundPosition = `-${position}px 0px`
    if(position < 780){
      position = position + 130;
    } else {
      position = 130
    }
  }, interval)
}

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {

  isJumping = true;
  const interval = 80; 

  let upInterval = setInterval(() => {
    if (position >= 200 ) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          ninja.style.bottom = position + "px";
        }
      }, interval);
    } else {
      position += 20;
      ninja.style.bottom = position + "px";
    }
  }, interval);
}

function createBee() {
  const bee = document.createElement("div");
  let beePosition = 1200 ;
  let randomTime = Math.random() * 6000;

  bee.classList.add("bee");
  bee.style.left = 1200 + "px";
  background.appendChild(bee);
  animateBee()

  let leftInterval = setInterval(() => {
    if (beePosition < -130) {
      clearInterval(leftInterval);
      background.removeChild(bee);
    } else if (beePosition > 0 && beePosition < 30 && position < 100){
      clearInterval(leftInterval)
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
    
    } else {
      beePosition -= 10;
      bee.style.left = beePosition + "px";
 
    }
  }, 20);

  setTimeout(createBee, randomTime);
  
}

animateNinja();
createBee();
  
document.addEventListener("keyup", handleKeyUp);
