function main() {
  const container = document.getElementById('container');
  const text = document.getElementById('text');
  
  const totalTime = 7500;
  const breatheTime = (totalTime / 5) * 2;
  const holdTime = totalTime / 5;
  
  breathAnimation();
  
  function breathAnimation() {
    text.innerText = 'Breathe In!';
    container.className = 'container grow';
  
    setTimeout(() => {
      text.innerText = 'Hold';
  
      setTimeout(() => {
        text.innerText = 'Breathe Out!';
        container.className = 'container shrink';
      }, holdTime);
    }, breatheTime);
  }
  
  setInterval(breathAnimation, totalTime);
}

function loadBackgraund() {
  var img = new Image();
  img.onload = function(ev) {
   document.body.classList.add('background');
  }
 
  img.src = './bg.jpg';
}

loadBackgraund();
addEventListener('load', (event) => {
  main();
});

 