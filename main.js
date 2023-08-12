


function init(){
  window.requestAnimationFrame(draw);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function max(a, b){
  return (a > b) ? a : b
}

function min(a, b){
  return (a > b) ? b : a
}


class Particle{
  constructor (x, y, angle, speed, angle_speed, color, color_change_speed){
    this.x = x
    this.y = y
    this.xnext = this.x + this.speed * Math.cos(this.angle)
    this.ynext = this.y + this.speed * Math.sin(this.angle)
    this.angle = angle
    this.speed = speed
    this.angle_speed = angle_speed
    this.color = color, 
    this.color_change_speed = color_change_speed
  }
  check_coords(){
    const canvas_width = document.getElementById('canvas').width
    const canvas_height = document.getElementById('canvas').height
    return (this.x >= 0 && this.x < canvas_width && this.y >= 0 && this.y < canvas_height) ? true : false 
  }
  move(){
    this.x += this.speed * Math.cos(this.angle)
    this.y += this.speed * Math.sin(this.angle)
    this.speed *= 0.99
    this.angle += this.angle_speed
    this.angle_speed *= 0.99
    this.xnext = this.x + this.speed * Math.cos(this.angle)
    this.ynext = this.y + this.speed * Math.sin(this.angle)
    this.color[0] = max(0, this.color[0] - 66 * this.color_change_speed)
    this.color[1] = min(255, this.color[1] + (255 - 117) * this.color_change_speed)
    this.color[2] = max(128, this.color[2] - (245 - 128) * ( this.color_change_speed))
  }
  draw(ctx){
    ctx.lineTo(this.x, this.y)
    
    ctx.lineTo(this.xnext, this.ynext)
  }
}


const particles = []

function add_explosion(x, y, count){
  for (let i = 0; i < count; ++i){
    particles.push(new Particle(
      x, 
      y, 
      Math.random() * 2 * Math.PI,   // angle
      2 + Math.random() * 3,         // speed
      (-0.5 + Math.random()) * 0.02, // angle speed
      [66, 117, 245],                // color
      Math.random() * 0.03     // color change speed
    ))
  }
}

function update_particles(){
  const newParticles = []
  for (let i = 0; i < particles.length; ++i){
    if (particles[i].check_coords()){
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
  
  ctx.fillStyle = 'white'
  
  
  for (let i = 0; i < particles.length; ++i){
    ctx.beginPath()
    color = particles[i].color
    ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    particles[i].draw(ctx)
    particles[i].move()
    
    ctx.closePath()
    ctx.stroke()
    
    ctx.fill()
    
  }

  update_particles()
  
  window.requestAnimationFrame(draw)
}
init()

var animation = anime.timeline({
  targets: '.selector-box',
  translateX: -1000, 
  easing: 'easeInOutExpo', 
  autoplay: false
})
animation.add({
  targets: '.start-button', 
  translateY: 300, 
  easing: 'easeInOutExpo',
}, 0)
animation.add({
  targets: '.header', 
  translateY: -100, 
  easing: 'easeInOutExpo', 
}, 0)
animation.add({
  targets: '.collider', 
  width: 950, 
  height: 950, 
  left: 460, 
  top: 20
})

document.getElementById('start-button').addEventListener('click', animation.play)


var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 15,
    stretch: 10,
    depth: 150,
    modifier: 1,
    slideShadows: true,
  },
  freeMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});