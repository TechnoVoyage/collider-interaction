
const TIME_CHOOSE = 10
const TIME_ACCELERATING = 10
const TIME_READ = 10
var current_timer = TIME_CHOOSE
var current_phase = 1
const particle_id = {1: 2 }
function init() {
  window.requestAnimationFrame(draw);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function max(a, b) {
  return (a > b) ? a : b
}

function min(a, b) {
  return (a > b) ? b : a
}

document.getElementsByClassName("timer-header")[0].textContent = "Запуск коллайдера через: "+current_timer+"с."
document.getElementById("canvas").width = 1920;
document.getElementById("canvas").height = 1080;
class Particle {
  constructor(x, y, angle, speed, angle_speed, color, color_change_speed, color_fading_speed) {
    this.x = x
    this.y = y
    this.xnext = this.x + this.speed * Math.cos(this.angle)
    this.ynext = this.y + this.speed * Math.sin(this.angle)
    this.angle = angle
    this.speed = speed
    this.angle_speed = angle_speed
    this.color = color,
      this.color_change_speed = color_change_speed
    this.color_fading_speed = color_fading_speed
  }
  check_coords() {
    const canvas_width = document.getElementById('canvas').width
    const canvas_height = document.getElementById('canvas').height
    return (this.x >= 0 && this.x < canvas_width && this.y >= 0 && this.y < canvas_height) ? true : false
  }
  move() {
    this.x += this.speed * Math.cos(this.angle)
    this.y += this.speed * Math.sin(this.angle)
    this.speed *= 0.99
    this.angle += this.angle_speed
    this.angle_speed *= 0.99
    this.xnext = this.x + this.speed * Math.cos(this.angle)
    this.ynext = this.y + this.speed * Math.sin(this.angle)
    this.color[0] = max(0, this.color[0] - 66 * this.color_change_speed)
    this.color[1] = min(255, this.color[1] + (255 - 117) * this.color_change_speed)
    this.color[2] = max(128, this.color[2] - (245 - 128) * this.color_change_speed)
    this.color[3] = min(1, this.color[3] * this.color_fading_speed)
  }
  draw(ctx) {
    ctx.lineTo(this.x, this.y)

    ctx.lineTo(this.xnext, this.ynext)
  }
}


const particles = []

var new_particle_tl = anime.timeline({
  easing: 'easeInOutExpo',
  duration: 1500,
  autoplay: false,
  begin: function () {
      document.querySelector(".new-particle-text").style.top = "1000px"
      document.getElementById("continue-new-particle").disabled = true
  }
});
new_particle_tl.add({
  targets: ".new-particle-window",
  scale: 10,
  opacity: 1,
})
new_particle_tl.add({
  targets: ".new-particle-window",
  translateX: -500
})
new_particle_tl.add({
  begin: function () {
    var text = document.querySelector(".new-particle-text");
    text.style.visibility = "visible";
    document.getElementById("continue-new-particle").disabled = false
  },
  targets: ".new-particle-text",
  translateY: -1050
})
function new_particle_popup() {
  
  new_particle_tl.play()
}
function new_particle_hide() {
  var hide_tl = anime.timeline({
    easing: 'easeInOutExpo',
    duration: 1000,
  });
  hide_tl.add({
    targets: ".new-particle-window",
    translateY: -1500
  });
  hide_tl.add({
    targets: ".new-particle-window",
    begin: function () {
      new_particle_tl.seek(0);
      var text = document.querySelector(".new-particle-text");
      text.style.visibility = "hidden";
    }
  })
}
function add_explosion(x, y, count) {
  for (let i = 0; i < count; ++i) {
    particles.push(new Particle(
      x,
      y,
      Math.random() * 2 * Math.PI,   // angle
      2 + Math.random() * 3,         // speed
      (-0.5 + Math.random()) * 0.02, // angle speed
      [66, 117, 245, 0.01],                // color
      Math.random() * 0.03,     // color change speed
      1.01 + Math.random() * 0.04
    ))
  }
}

function update_particles() {
  const newParticles = []
  for (let i = 0; i < particles.length; ++i) {
    if (particles[i].check_coords()) {
      newParticles.push(particles[i])
    }
  }
  particles.length = 0
  for (let i = 0; i < newParticles.length; ++i) {
    particles.push(newParticles[i])
  }
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  add_explosion(x, y, 100)
}

document.getElementById('canvas').addEventListener("click", function (e) {
  getCursorPosition(document.getElementById('canvas'), e)
})
var swiper_top = new Swiper(".mySwiperTop", {
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
var swiper_bot = new Swiper(".mySwiperBottom", {
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
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  //ctx.clearRect(0, 0, 800, 800);

  ctx.fillStyle = 'white'


  for (let i = 0; i < particles.length; ++i) {
    ctx.beginPath()
    color = particles[i].color
    ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
    particles[i].draw(ctx)
    particles[i].move()

    ctx.closePath()
    ctx.stroke()

    ctx.fill()

  }

  update_particles()

  window.requestAnimationFrame(draw)
  //console.log("top: ", swiper_top.realIndex, "bot: ", swiper_bot.realIndex)
}
init()
var move_collider_tl = anime.timeline({
  targets: '.selector-box',
  translateX: -1000,
  easing: 'easeInOutExpo',
  autoplay: false
})
move_collider_tl.add({
  targets: '.start-button',
  translateY: 300,
  easing: 'easeInOutExpo',
}, 0)
move_collider_tl.add({
  targets: '.header',
  translateY: -100,
  easing: 'easeInOutExpo',
}, 0)
move_collider_tl.add({
  targets: '.collider',
  width: 950,
  height: 950,
  left: 460,
  top: 20
})
function hide_collider() {
  move_collider_tl.direction = "reverse"
  move_collider_tl.play()
}
function show_collider() {
  move_collider_tl.direction = "normal"
  move_collider_tl.play()
}

function phase_choose() { //phase 1
    new_particle_hide()
    hide_collider()
}
function phase_accelerating() { //phase 2
    show_collider()
}
function phase_reading() { //phase 3
  new_particle_popup()
}
var animation_started = false
function phase_timer_update() {
  current_timer -= 1
  switch (current_phase) {
    case 1:
      document.getElementsByClassName("timer-header")[0].textContent = "Запуск коллайдера через: "+current_timer+"с."
      if(!animation_started) phase_choose();
      animation_started = true
      break;
    case 2:
      document.getElementsByClassName("timer-header")[0].textContent = "Столкновение через: "+current_timer+"с."
      if(!animation_started) phase_accelerating();;
      animation_started = true
      break;
    case 3:
        document.getElementsByClassName("timer-header")[0].textContent = "Возврат через: "+current_timer+"с."
        if(!animation_started) phase_reading();;
      animation_started = true
        break;
  }

  if (current_timer == 0) {
    current_phase += 1
    switch (current_phase) {
      case 1:
        current_timer = TIME_CHOOSE;
        break;
      case 2:
        current_timer = TIME_ACCELERATING;
        break;
      case 3:
        current_timer = TIME_READ;
        break;
      case 4:
        current_timer = TIME_CHOOSE;
        current_phase = 1;
        break;
    }
    animation_started = false
  }
}
setInterval(() => phase_timer_update(), 1000)


