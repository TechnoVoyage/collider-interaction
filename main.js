
function init(){
  window.requestAnimationFrame(draw);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const particles = []

function add_explosion(x, y, count){
  for (let i = 0; i < count; ++i){
    particles.push([x, y, Math.random() * 2 * Math.PI, 2 + Math.random() * 3, (-0.5 + Math.random()) * 0.02])
  }
}

function update_particles(){
  const newParticles = []
  for (let i = 0; i < particles.length; ++i){
    if (particles[i][0] >= 0 && particles[i][0] < 800 && particles[i][1] >= 0 && particles[i][1] < 800){
      newParticles.push(particles[i])
    }
  }
  particles.length = 0
  for (let i = 0; i < newParticles.length; ++i){
    particles.push(newParticles[i])
  }
}

function getCursorPosition(canvas, event){
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  add_explosion(x, y, 100)
}

document.getElementById('canvas').addEventListener("click", function (e){
  getCursorPosition(document.getElementById('canvas'), e)
})

function draw(){
  var ctx = document.getElementById('canvas').getContext('2d');
  //ctx.clearRect(0, 0, 800, 800);
  
  ctx.fillStyle = 'black'
  
  for (let i = 0; i < particles.length; ++i){
    ctx.beginPath()
    
    var xnow = particles[i][0]
    var ynow = particles[i][1]
    var xnext = particles[i][0] + particles[i][3] * Math.cos(particles[i][2])
    var ynext = particles[i][1] + particles[i][3] * Math.sin(particles[i][2])
    particles[i][0] = xnext
    particles[i][1] = ynext
    particles[i][3] *= 0.99
    particles[i][2] += particles[i][4]
    ctx.lineTo(xnow, ynow)
    ctx.lineTo(xnext, ynext)
    ctx.closePath()
    ctx.stroke()
    //ctx.arc(particles[i][0], particles[i][1], 5, 0, 2 * Math.PI, true)

    
    
    ctx.fill()
    
  }

  update_particles()
  
  window.requestAnimationFrame(draw)
}
init()