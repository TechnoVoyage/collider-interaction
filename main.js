const TIME_CHOOSE = 5
const TIME_ACCELERATING = 25
const TIME_READ = 10
const RUNNING_DURATION = 21000
const PARTICLE_COLOR = {"electron": '#0000FF', "antielectron": "#7902b5", "proton": "#FF0000"}
const PARTICLE_NAMES = [{"name": "Бозон Хиггса", "link": "images/particles/bozon.gif"}]
var current_timer = TIME_CHOOSE
var current_phase = 1
const particle_id = {1: 2 }
var particle_emoji1_color = PARTICLE_COLOR["electron"]
var particle_emoji2_color = PARTICLE_COLOR["antielectron"]
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
    this.speed = speed
    this.angle = angle
    this.xnext = this.x + this.speed * Math.cos(this.angle)
    this.ynext = this.y + this.speed * Math.sin(this.angle)
    
    
    this.angle_speed = angle_speed
    this.color = color
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
    this.color[3] = max(0, this.color[3] * this.color_fading_speed)
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
      20 + Math.random() * 3,         // speed
      (-0.5 + Math.random()) * 0.03, // angle speed
      [66, 117, 245, 1],                // color
      Math.random() * 0.1,     // color change speed
      0.97 - Math.random() * 0.2  // color fading speed
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

function explosion_in_cursos_position(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  add_explosion(x, y, 100)
}


var swiper = new Swiper(".swiper", {
  loop: true,
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 2,
  coverflowEffect: {
      rotate: 0,
      stretch: 25,
      depth: 230,
      modifier: 1.2,
      slideShadows: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function clear_canvas(){
  ctx = document.getElementById('canvas').getContext('2d')
  ctx.clearRect(0, 0, 1920, 1080);
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  for (let i = 0; i < particles.length; ++i) {
    ctx.beginPath()
    color = particles[i].color
    ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
    

    particles[i].draw(ctx)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
    particles[i].move()
  }

  update_particles()

  window.requestAnimationFrame(draw)
  alert("top: ", swiper_top.realIndex, "bot: ", swiper_bot.realIndex)
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
  back_points()
  move_collider_tl.play()
}
function show_collider() {
  // alert("top: ", swiper.realIndex)
  move_collider_tl.direction = "normal"


  move_collider_tl.play()
  setTimeout(() => {  run_collider(); }, 1000);
  
}

function back_points(){

  var back_points_tl = anime.timeline({
    targets: '.selector-box',
    translateX: -1000,
    easing: 'easeInOutExpo',
    autoplay: false
  })
  back_points_tl.add({
    targets: '.emoji1', 
    backgroundColor: particle_emoji1_color, 
    right: 3500,
    top: 250,
    
  })
  back_points_tl.add({
    targets: '.emoji2',  
    backgroundColor: particle_emoji2_color, 
    left: 2000,
    top: 250,
  },'-=1000')
  back_points_tl.play()
}
  

function run_collider(){
  document.getElementsByClassName("emoji1")[0].style.backgroundColor = particle_emoji1_color;
  document.getElementsByClassName("emoji2")[0].style.backgroundColor = particle_emoji2_color;
  document.getElementById("EMOJI_PATH_1").setAttribute('d', "M 210 220 A 50 50 0 1 1 1120 220 A 50 50 0 1 1 210 220 ".repeat(10) + "A 50 50 0 1 1 1120 180")
  document.getElementById("EMOJI_PATH_2").setAttribute('d', "M 1150 220 A 50 50 0 1 1 240 220 A 50 50 0 1 1 1150 220 ".repeat(10))
  let path1 = anime.path('#point-svg1 path');
  let path2 = anime.path('#point-svg2 path');

  var run_collider_tl = anime.timeline({
    targets: '.selector-box',
    translateX: -1000,
    easing: 'easeInOutExpo',
    autoplay: false
  })
  run_collider_tl.add({
    targets: '.emoji1',  
    right: 1625,
    
  })

  run_collider_tl.add({
    targets: '.emoji2',  
    left: 215,
  }) 
  
  run_collider_tl.add({
    targets: '.emoji1',
    translateX: path1('x'),
    translateY: path1('y'),
    duration: RUNNING_DURATION,   
    backgroundColor: '#FFF',
    easing: function(el, i, total) {
      return function(t) {
        // return Math.pow(Math.tan(t*Math.PI/4), 3)
        return Math.pow(t, 5)
      }
    }
      
  })
  var no_delay = '-=' + RUNNING_DURATION; 
  run_collider_tl.add({
    targets: '.emoji2',
    translateX: path2('x'),
    translateY: path2('y'),
    duration: RUNNING_DURATION,   
    backgroundColor: '#FFF',
    easing: function(el, i, total) {
      return function(t) {
        return Math.pow(t, 5)
      }
    }
      
  }, no_delay) 
  run_collider_tl.play()
  run_collider_tl.finished.then(function(){
    add_explosion(1400, 500, 200);
  })
}

function phase_choose() { //phase 1
    //hide_collider()
    clear_canvas()
    new_particle_hide()
}
function phase_accelerating() { //phase 2
    show_collider()
}
function phase_reading() { //phase 3
  //document.getElementById("new-particle-image").src = PARTICLE_NAMES.random()
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
      if(!animation_started) phase_accelerating();
      animation_started = true
      break;
    case 3:
        document.getElementsByClassName("timer-header")[0].textContent = "Возврат через: "+current_timer+"с."
        if(!animation_started) phase_reading();
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
        hide_collider()
        current_phase = 1;
        break;
    }
    animation_started = false
  }
}
setInterval(() => phase_timer_update(), 1000)