const PARTICLE_COLOR = { "electron": '#0000FF', "antielectron": "#7902b5", "proton": "#FF0000" }
// const LOREMIPSUM = "b-кварк, прелестный кварк, красивый кварк — кварк с зарядом -1/3 e, принадлежащий к третьему поколению. Он является более лёгким членом третьего поколения, в который входит также значительно более тяжёлый t-кварк. Имеет массу порядка  4,5 ГэВ , что  почти в 5 раз тяжелее нуклона. Время жизни b-кварка составляет около 10^-12 c<br> Существование третьего поколения кварков, включающего b- и t-кварки, было предсказано в 1973 году Макото Кобаяси и Тосихидэ Маскавой для объяснения явления нарушения CP-симметрии. <br>Экспериментальное подтверждение данное предсказание получило в 1977 году в лаборатории Фермилаб коллаборацией Колумбия.<br>Кварки - бесструктурные точечные частицы со спином  1/2 ћ, участвующие в сильном взаимодействии (как и во всех остальных) и являющиеся элементарными составляющими всех адронов.<br>Адроны - связанные системы кварков и антикварков. Существуют адроны двух типов – барионы (барионный заряд B=1), состоящие из трёх кварков (qqq), и являющиеся фермионами и мезоны (B=0), состоящие из кварка и антикварка (-qq) и являющиеся бозонами.<br>Существует шесть типов кварков, обозначаемых буквами u, d, s, c, b, t (от английских слов up, down, strange, charmed, bottom, top). Говорят о шести “ароматах” кварков. Каждый кварк имеет барионное число В =  1/3 и дробный электрический заряд. Кварки u, c, t имеют заряд +2/3, а кварки d, s, b, - заряд       -1/3 (в единицах элементарного заряда e = 1.6*10^-19 Кл). Кварки имеют массы. Самый лёгкий кварк u (масса 2 МэВ), самый тяжёлый – t (его масса 174 ГэВ). <br>Одно из уникальных свойств кварков это конфаймент. Конфайнмент− удержание цветных кварков и глюонов внутри бесцветных адронов. Согласно модели кварков все адроны состоят из кварков. Переносчиками сильного взаимодействия между кварками являются глюоны. Кварки и глюоны характеризуются квантовым числом цвет. Однако ни в природе, ни в экспериментах при высоких энергиях кварки и глюоны в свободном состоянии в виде цветных объектов не обнаружены. ";


const PARTICLE_NAMES = [
  { "name": "Бозон Хиггса", "link": "images/particles/bozon.gif", "text": TEXT["БОЗОН ХИГГСА"] },
  { "name": "Нижний", "link": "images/particles/nizhniy.gif", "text": TEXT['D-КВАРК'] },
  { "name": "Верхний", "link": "images/particles/verhniy.gif", "text": TEXT["U-КВАРК"] },
  { "name": "Очарованный", "link": "images/particles/ocharovany.gif", "text": TEXT["C-КВАРК"] },
  { "name": "Истинный", "link": "images/particles/istiniy.gif", "text": TEXT["T-КВАРК"] },
  { "name": "Странный", "link": "images/particles/stranii.gif", "text": TEXT["ЭЛЕКТРОН"] },
  { "name": "Прелестный", "link": "images/particles/prelestni.gif", "text": TEXT["B-КВАРК"] },
  { "name": "Глюон", "link": "images/particles/gluon.gif", "text": TEXT["ГЛЮОН"] },
  { "name": "Фотон", "link": "images/particles/photon.gif", "text": TEXT["ФОТОН"] },
  { "name": "Z Бозон", "link": "images/particles/zbozon.gif", "text": TEXT["Z-БОЗОН"] },
  { "name": "W Бозон", "link": "images/particles/wbozon.gif", "text": TEXT["W-БОЗОН"] },
  { "name": "Электрон", "link": "images/particles/electron.gif", "text": TEXT["ЭЛЕКТРОН"] },
  { "name": "Мюон", "link": "images/particles/muon.gif", "text": TEXT["МЮОН"] },
  { "name": "Тау", "link": "images/particles/tau.gif", "text": TEXT["ЭЛЕКТРОН"] },
  { "name": "Электронное Нейтрино", "link": "images/particles/eneitrino.gif", "text": TEXT["ЭЛЕКТРОННОЕ НЕЙТРИНО"] },
  { "name": "Мюонное Нейтрино", "link": "images/particles/muneitrino.gif", "text": TEXT["МЮОННОЕ НЕЙТРИНО"] },
  { "name": "Тау Нейтрино", "link": "images/particles/tauneitrino.gif", "text": TEXT["ТАУ НЕЙТРИНО"] }
]



var current_phase = 1
const particle_id = { 1: 2 }
var particle_emoji1_color = PARTICLE_COLOR["electron"]
var particle_emoji2_color = PARTICLE_COLOR["proton"]
var isClicked = false
// var uartSocket = new WebSocket("ws://127.0.0.1:8000")
var uartSocket = new WebSocket("ws://192.168.1.10:8000")

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function max(a, b) {
  return (a > b) ? a : b
}

function min(a, b) {
  return (a > b) ? b : a
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
var ctx = document.getElementById('canvas').getContext('2d');
var start_time = Date.now() / 1000; // start time in seconds
var bg_ctx = document.getElementById('background').getContext('2d');
const canvas_width = 1920;
const canvas_height = 1080;
function init() {
  intervalId = setInterval(() => window.requestAnimationFrame(draw), 16.6)

}
window.requestAnimationFrame(draw_bg)
class BackParticle {
  constructor(x, y, r, speed, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;
    this.angle = angle;
    this.color = 255;
  }
  move() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.r *= 0.99;
    this.speed *= 0.99;
    this.color = this.color * 0.99;
  }
  draw() {
    bg_ctx.beginPath();
    bg_ctx.fillStyle = `rgb(${this.color}, ${this.color}, ${this.color})`
    bg_ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    bg_ctx.fill()
  }
  check() {
    if (this.x < canvas_width && this.x >= 0 && this.y >= 0 && this.y < canvas_height && this.r >= 1) return true;
    return false;
  }
}
class Particle {
  constructor(x, y, angle, distance_to_pass, time_to_pass, radius, color) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = radius;
    this.color = color;
    this.angle_speed = 0;
    this.distance_to_pass = distance_to_pass;
    this.time_to_pass = time_to_pass;
    this.epsilon = 2 * distance_to_pass / time_to_pass / time_to_pass;
  }

  move() {
    this.angle_speed += this.epsilon / 60;
    this.angle += this.angle_speed;
    this.x = 475 + this.radius * Math.cos(this.angle);
    this.y = 525 + this.radius * Math.sin(this.angle);

  }

  draw() {
    ctx.beginPath();

    ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();

  }
}

var r = 335;

var particle1 = new Particle(0, r, Math.PI, 12.5 * 2 * Math.PI, 200, r, particle_emoji1_color);
var particle2 = new Particle(r * 2, r, 0, 12 * 2 * Math.PI, 200, r, particle_emoji2_color);
var backParticles = []
function draw_bg() {
  bg_ctx.fillStyle = 'rgb(0, 0, 0)';
  bg_ctx.fillRect(0, 0, canvas_width, canvas_height);
  var new_backParticles = []
  for (var i = 0; i < backParticles.length; ++i) {
    backParticles[i].draw();
    backParticles[i].move();
    if (backParticles[i].check()) new_backParticles.push(backParticles[i]);
  }
  backParticles = new_backParticles;

  if (backParticles.length < 40) backParticles.push(new BackParticle(getRandomInt(canvas_width),
    getRandomInt(canvas_height),
    6 * Math.random(),
    3 * Math.random(),
    Math.random() * 2 * Math.PI))
  window.requestAnimationFrame(draw_bg)
}

function draw() {

  ctx.clearRect(0, 0, 900, 900);

  ctx.beginPath()
  particle1.draw();
  particle2.draw();
  particle1.move();
  particle2.move();
}

function animate_collider_balls() {
  init()
}
function reset_balls() {

  particle1.x = 0;
  particle1.y = r;
  particle1.angle = Math.PI;
  particle1.angle_speed = 0;
  particle1.color = particle_emoji1_color

  particle2.x = r * 2;
  particle2.y = r;
  particle2.angle = 0;
  particle2.angle_speed = 0;
  particle2.color = particle_emoji2_color

}

var new_particle_tl = anime.timeline({
  easing: 'easeInOutExpo',
  duration: 1500,
  autoplay: false,
  begin: function () {
    document.querySelector(".new-particle-text").style.top = "1000px"
    document.getElementById("continue-new-particle").disabled = true
    document.getElementById("canvas").style.visibility = "hidden"
  }
});
new_particle_tl.add({
  targets: "#explosion-video",
  opacity: 1,
  begin: function () {
    document.getElementById("explosion-video").currentTime = 0;
    document.getElementById("explosion-video").play();
  }
}).finished.then()
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
  isClicked = false
  anime({
    targets: '.right-space',
    translateX: 200,
    duration: 1000,
    easing: 'easeInOutExpo',
  });
  element_index = getRandomInt(17)
  document.getElementById('new-particle-name').innerHTML = PARTICLE_NAMES[element_index]['name'];
  const node = document.getElementsByClassName('new-particle-plain')[0];
  MathJax.typesetClear([node]);
  node.innerHTML = PARTICLE_NAMES[element_index]['text'];
  MathJax.typesetPromise([node]).then(() => {
    // the new content is has been typeset
    PARTICLE_NAMES[element_index]['text']
  });
  //PARTICLE_NAMES[element_index]['text'];
  document.getElementById('new-particle-image').src = PARTICLE_NAMES[element_index]['link'];
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
var dur = 800
var move_swiper_right = anime({
  targets: '.selector-box',
  translateX: 1000,
  easing: 'easeInOutExpo',
  autoplay: false,
  duration: dur,
})
var move_collider_tl = anime.timeline({
  targets: '.left-space',
  translateX: 0,
  easing: 'easeInOutExpo',
  duration: dur,
  autoplay: false,
})
move_collider_tl.add({
  targets: '.start-button',
  translateY: 300,
  easing: 'easeInOutExpo',
  duration: dur,
}, `-=${dur}`)
// move_collider_tl.add({
//   targets: ['.header-name', '.header-choose'],
//   translateY: -100,
//   easing: 'easeInOutExpo',
// })
move_collider_tl.add({
  targets: "#start_button",
  translateY: 300,
  easing: 'easeInOutExpo',
})

move_collider_tl.add({
  targets: '.collider ',
  width: 950,
  height: 950,
  left: 260,
  top: 100,
  duration: dur,
}).finished.then(function () {
  reset_balls()
  document.getElementById("canvas").style.visibility = "visible"
  animate_collider_balls()
})


move_collider_tl.add({
  targets: '.accelerating-countdown-header',
  translateY: 200,
})

function hide_collider() {

  document.getElementById("particle1").src = "images/particles/electron.gif"
  document.getElementById("particle2").src = "images/particles/antielectron.gif"
  document.getElementById("particle3").src = "images/particles/proton.gif"
  document.getElementById("particle4").src = "images/particles/proton.gif"
  document.getElementById("particle5").src = "images/particles/electron.gif"
  document.getElementById("particle6").src = "images/particles/proton.gif"
  document.getElementById("particle7").src = "images/particles/antielectron.gif"
  document.getElementById("particle8").src = "images/particles/proton.gif"

  
  setTimeout(function () {
    move_swiper_right.direction = "reverse"
    move_swiper_right.play()
  },1000)
  move_collider_tl.direction = "reverse"
  move_collider_tl.play()

  
  anime({
    targets: "#explosion-video",
    duration: 500,
    opacity: 0,
    easing: 'easeInOutExpo',

  }).finished.then(function () {
    document.getElementById("explosion-video").pause()
    new_particle_hide();
  })
}

function show_collider() {
  reset_balls()
  var particleTopName = document.getElementById("particle-top");
  var particleBottomName = document.getElementById("particle-bottom");
  var particleTopImg = document.getElementById("particle-top-img");
  var particleBottomImg = document.getElementById("particle-bottom-img");
  switch (swiper.realIndex) {
    case 0:
      particle_emoji1_color = PARTICLE_COLOR["electron"]
      particle_emoji2_color = PARTICLE_COLOR["antielectron"]
      particleTopName.textContent = "Электрон";
      particleBottomName.textContent = "Позитрон";
      particleTopImg.src = "images/particles/electron.gif"
      particleBottomImg.src = "images/particles/antielectron.gif"
      break;
    case 3:
      particle_emoji1_color = PARTICLE_COLOR["electron"]
      particle_emoji2_color = PARTICLE_COLOR["antielectron"]
      particleTopName.textContent = "Электрон";
      particleBottomName.textContent = "Позитрон";
      particleTopImg.src = "images/particles/electron.gif"
      particleBottomImg.src = "images/particles/antielectron.gif"
      break;
    case 1:
      particle_emoji1_color = PARTICLE_COLOR["proton"]
      particle_emoji2_color = PARTICLE_COLOR["proton"]
      particleTopName.textContent = "Протон"
      particleBottomName.textContent = "Протон";
      particleTopImg.src = "images/particles/proton.gif"
      particleBottomImg.src = "images/particles/proton.gif"
      break;
    case 2:
      particle_emoji1_color = PARTICLE_COLOR["electron"]
      particle_emoji2_color = PARTICLE_COLOR["proton"]
      particleTopName.textContent = "Электрон";
      particleBottomName.textContent = "Протон";
      particleTopImg.src = "images/particles/electron.gif"
      particleBottomImg.src = "images/particles/proton.gif"
      break;
    case 4:
      particle_emoji1_color = PARTICLE_COLOR["antielectron"]
      particle_emoji2_color = PARTICLE_COLOR["proton"]
      particleTopName.textContent = "Позитрон";
      particleBottomName.textContent = "Протон";
      particleTopImg.src = "images/particles/antielectron.gif"
      particleBottomImg.src = "images/particles/proton.gif"
      break;
  }


    move_swiper_right.play()

    move_collider_tl.direction = "normal"
    move_collider_tl.play()




  setTimeout(function () {
    for (i = 1; i < 9; i++) {
      document.getElementById("particle" + String(i)).src = "/images/collider.png"
    };
  }, 1000);

  setTimeout(() => { run_collider(); }, 1000);

}


let right_selected_particles = function () {
  setTimeout(function () {
    anime({
      targets: '.right-space',
      translateX: -350,
    }).finished.then(function () {
      document.getElementById("canvas").style.visibility = "visible"
      reset_balls();
    })
  }, 400);
}

function run_collider() {


  document.getElementsByClassName("animated-gif-up")[0].style.backgroundColor = particle_emoji1_color;
  document.getElementsByClassName("animated-gif-down")[0].style.backgroundColor = particle_emoji2_color;

  document.getElementsByClassName("selected-arrow-down")[0].style.stroke = particle_emoji1_color;
  document.getElementsByClassName("selected-arrow-up")[0].style.stroke = particle_emoji2_color;

  right_selected_particles();
}

function phase_choose() { //phase 1
  new_particle_hide()
}
function phase_accelerating() { //phase 2
  show_collider()
}
function phase_reading() { //phase 3
  new_particle_popup()
}
document.getElementById('continue-new-particle').onclick = function () {
  if (isClicked == false) {
    document.getElementById("collider-hole").src = "images/collider.png"
    animation_started = false;

    current_phase = 1;
    reset_balls()
    document.getElementById("canvas").style.visibility = "hidden"
    hide_collider()
  }
}
var animation_started = false
document.getElementById('start_button').addEventListener('click', function () {

  const start_button = document.getElementById('start_button')
  start_button.disabled = "disabled"
  start_button.style.backgroundColor = "#292929"
  start_button.style.borderColor = "#121212"
  start_button.innerHTML = "Ожидайте..."

  uartSocket.send("start")

})

uartSocket.onmessage = (event) => {
  console.log(event.data)
  if (event.data >= 1 && event.data < 8) {
    document.getElementById("collider-hole").src = "images/" + event.data + ".png"
  }
  if (event.data == 9) {
    document.getElementById("collider-hole").src = "images/8.png"
    phase_reading()
  }
  if (event.data == 1) {
    phase_accelerating();
    const start_button = document.getElementById('start_button')
    start_button.disabled = false;
    start_button.style.backgroundColor = "black"
    start_button.style.borderColor = "white"
    start_button.innerHTML = "Запуск"
  }

};
uartSocket.onerror = function(err) {
  console.error('Socket encountered error: ', err.message, 'Closing socket');
  uartSocket.close();
};
uartSocket.onclose = function(e) {
  console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
  setTimeout(function() {
    uartSocket = new WebSocket("ws://192.168.1.10:8000")
    // uartSocket = new WebSocket("ws://127.0.0.1:8000")
  }, 1000);
};
