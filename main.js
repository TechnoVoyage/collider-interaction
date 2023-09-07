const TIME_CHOOSE = 2
const TIME_ACCELERATING = 25
const TIME_READ = 15
const RUNNING_DURATION = 21000
const PARTICLE_COLOR = { "electron": '#0000FF', "antielectron": "#7902b5", "proton": "#FF0000" }
const LOREMIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const PARTICLE_NAMES = [{ "name": "Бозон Хиггса", "link": "first_atom.gif", "text": LOREMIPSUM }, { "name": "Нижний", "link": "first_atom.gif", "text": LOREMIPSUM },
{ "name": "Верхний", "link": "first_atom.gif", "text": LOREMIPSUM }, { "name": "Очарованный", "link": "first_atom.gif", "text": LOREMIPSUM },
{ "name": "Истинный", "link": "first_atom.gif", "text": LOREMIPSUM }, { "name": "Странный", "link": "first_atom.gif", "text": LOREMIPSUM },
{ "name": "Прелестный", "link": "first_atom.gif", "text": LOREMIPSUM }, { "name": "Глюон", "link": "first_atom.gif", "text": LOREMIPSUM },
{ "name": "Фотон", "link": "first_atom.gif", "text": LOREMIPSUM }, { "name": "Z Бозон", "link": "first_atom.gif", "text": LOREMIPSUM },
{ "name": "W Бозон", "link": "first_atom.gif", "text": LOREMIPSUM }, { "name": "Электрон", "link": "first_atom.gif", "text": LOREMIPSUM },
{ "name": "Мюон", "link": "first_atom.gif", "text": LOREMIPSUM }, { "name": "Тау", "link": "first_atom.gif", "text": LOREMIPSUM },
{ "name": "Элейтронное Нейтрино", "link": "first_atom.gif", "text": LOREMIPSUM }, { "name": "Мюонное Нейтрино", "link": "first_atom.gif", "text": LOREMIPSUM },
{ "name": "Тау Нейтрино", "link": "first_atom.gif", "text": LOREMIPSUM }
]

element_index = getRandomInt(17)
document.getElementsByClassName('new-particle-header')[1].innerHTML = PARTICLE_NAMES[element_index]['name'];
document.getElementsByClassName('new-particle-text')[0].innerHTML = PARTICLE_NAMES[element_index]['text'];
// document.getElementsByClassName('new-particle-image')[0].src = PARTICLE_NAMES[element_index]['link'];

var current_timer = TIME_CHOOSE
var current_phase = 1
const particle_id = { 1: 2 }
var particle_emoji1_color = PARTICLE_COLOR["electron"]
var particle_emoji2_color = PARTICLE_COLOR["proton"]
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

document.getElementsByClassName("timer-header")[0].textContent = current_timer
document.getElementById("canvas").width = 1920;
document.getElementById("canvas").height = 1080;


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
  opacity: 0.6,
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
  anime({
    targets: '.right-space',
    translateX: 200,
    duration: 2000,
    easing: 'easeInOutExpo',
    });
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






//     const explode_gif = document.getElementById("explode");
//     if (!hide) explode_gif.src = "images/boom.gif";
//     else explode_gif.src = "images/boom.gif";
// }

var move_collider_tl = anime.timeline({
  targets: '.selector-box',
  translateX: 1000,
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
  console.log(swiper.realIndex)
  switch (swiper.realIndex) {
    case 0:
      particle_emoji1_color = PARTICLE_COLOR["electron"]
      particle_emoji2_color = PARTICLE_COLOR["antielectron"]
      break;
    case 1:
      particle_emoji1_color = PARTICLE_COLOR["proton"]
      particle_emoji2_color = PARTICLE_COLOR["proton"]
      break;
    case 2:
      particle_emoji1_color = PARTICLE_COLOR["electron"]
      particle_emoji2_color = PARTICLE_COLOR["proton"]
      break;
    case 3:
      particle_emoji1_color = PARTICLE_COLOR["antielectron"]
      particle_emoji2_color = PARTICLE_COLOR["proton"]
      break;
  }
  move_collider_tl.direction = "normal"
  right_selected_particles()
  move_collider_tl.play()
  setTimeout(() => { run_collider(); }, 1000);

}

function back_points() {

  var back_points_tl = anime.timeline({
    targets: '.selector-box',
    easing: 'easeInOutExpo',
    autoplay: false
  })
  back_points_tl.add({
    targets: '.emoji1',
    opacity: [1, 0],
    backgroundColor: particle_emoji1_color,
    duration: 1000,

  })
  back_points_tl.add({
    targets: '.emoji2',
    opacity: [1, 0],
    backgroundColor: particle_emoji2_color,
    duration: 1000,
  }, '-=1000')
  back_points_tl.play()
  document.getElementsByClassName("emoji1")[0].style.visibility = "visible";
  document.getElementsByClassName("emoji2")[0].style.visibility = "visible";
}


let right_selected_particles = function() {
  setTimeout(function(){
    anime({
      targets: '.right-space',
      translateX: -215,
      });
    }, 1500);
}

function run_collider() {
  document.getElementsByClassName("emoji1")[0].style.backgroundColor = particle_emoji1_color;
  document.getElementsByClassName("emoji2")[0].style.backgroundColor = particle_emoji2_color;

  document.getElementsByClassName("animated-gif-up")[0].style.backgroundColor = particle_emoji1_color;
  document.getElementsByClassName("animated-gif-down")[0].style.backgroundColor = particle_emoji2_color;

  document.getElementsByClassName("selected-arrow-down")[0].style.stroke = particle_emoji1_color;
  document.getElementsByClassName("selected-arrow-up")[0].style.stroke = particle_emoji2_color;


  document.getElementById("EMOJI_PATH_1").setAttribute('d', "M 436 118 A 50 50 0 1 1 450 780 A 50 50 0 1 1 436 118 ".repeat(12) + "A 50 50 0 1 1 450 780")
  document.getElementById("EMOJI_PATH_2").setAttribute('d', "M 450 780 A 50 50 0 1 1 436 118 A 50 50 0 1 1 450 780 ".repeat(12))
  let path1 = anime.path('#point-svg1 path');
  let path2 = anime.path('#point-svg2 path');

  var run_collider_tl = anime.timeline({
    targets: '.selector-box',
    easing: 'easeInOutExpo',
    autoplay: false
  })
  run_collider_tl.add({
    targets: '.emoji1',
    opacity: [0, 1],
    duration: 1000,

  })

  run_collider_tl.add({
    targets: '.emoji2',
    opacity: [0, 1],
    duration: 1000,
  })

  run_collider_tl.add({
    targets: '.emoji1',
    translateX: path1('x'),
    translateY: path1('y'),
    duration: RUNNING_DURATION,
    backgroundColor: '#FFF',
    easing: function (el, i, total) {
      return function (t) {
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
    easing: function (el, i, total) {
      return function (t) {
        return Math.pow(t, 5)
      }
    }

  }, no_delay)
  run_collider_tl.play()
  run_collider_tl.finished.then(function () {
    document.getElementsByClassName("emoji1")[0].style.visibility = "hidden";
    document.getElementsByClassName("emoji2")[0].style.visibility = "hidden";
    particle_explode(hide=false)
  })
}

function phase_choose() { //phase 1
  //hide_collider()
  new_particle_hide()
}
function phase_accelerating() { //phase 2
  show_collider()
}
function phase_reading() { //phase 3
  //document.getElementById("new-particle-image").src = PARTICLE_NAMES.random()
  new_particle_popup()
}
function continue_button() {
  animation_started = false;
  current_timer += TIME_CHOOSE;
  current_phase = 1;
  hide_collider()
  console.log(current_phase)
}

var animation_started = false
function phase_timer_update() {
  current_timer -= 1
  switch (current_phase) {
    case 1:
      document.getElementsByClassName("timer-header")[0].textContent = current_timer
      if (!animation_started) phase_choose();
      animation_started = true
      break;
    case 2:
      document.getElementsByClassName("timer-header")[0].textContent = current_timer
      setTimeout(function(){
        anime({
          targets: '.timer-header',
        translateX: 730,
        duration: 1000,
        translateY: -470,
        })
        anime({
          targets: '.timer-header-word',
          translateX: 500,
          duration: 1000,
          translateY: -380,
        })
      }, 2000);
      if (!animation_started) phase_accelerating();
      animation_started = true
      break;
    case 3:
      document.getElementsByClassName("timer-header")[0].textContent = current_timer
      if (!animation_started) phase_reading();
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

