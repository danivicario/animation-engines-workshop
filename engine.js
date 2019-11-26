const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const shuffle = array => array.sort(() => Math.random() - 0.5);

let floorPosition = 110;
let totalMonsters = 40;
let tween;
let tl1;
let tl2;

function setupButtons() {
  document.querySelector("#play").onclick = () => tween.play();
  document.querySelector("#pause").onclick = () => tween.pause();
  document.querySelector("#resume").onclick = () => tween.resume();
  document.querySelector("#reverse").onclick = () => tween.reverse();
  document.querySelector("#restart").onclick = () => tween.restart();
}

function setupMonsters() {
  let characters = Array(totalMonsters)
    .fill()
    .map((_, idx) => idx);

  characters.forEach(characterId => {
    const domEl = document.createElement("div");
    domEl.className = "character";
    domEl.innerHTML = `<img src='images/PNG/${characterId}.png'>`;
    document.body.appendChild(domEl);
  });
}

function showObstacle() {
  let obstacle = document.querySelector(".obstacle1");
  obstacle.style.display = `block`;
  obstacle.style.bottom = `${floorPosition}px`;
  obstacle.style.left = `700px`;
}

function generateJustOneMonster(requestedMonster) {
  let randomCharacter = requestedMonster || randomInt(0, totalMonsters - 1);
  let character = document.querySelectorAll(".character")[randomCharacter];

  character.style.display = "block";
  character.style.bottom = `${floorPosition}px`;

  return character;
}

setupButtons();
setupMonsters();

// example 1
// gsap.to(".sun", 1.5, {
//   scale: 0.8,
//   yoyo: 1,
//   repeat: -1
// });

// example 2
// let character = generateJustOneMonster();
// tween = gsap.to(character, 2, {
//   scale: 1,
//   left: "+=70vw",
//   ease: "power1.out"
// });

// example 3
// let character = generateJustOneMonster();
// tween = gsap.to(character, 1, {
//   scale: 1,
//   left: `+=${window.innerWidth / 2 - 200}`,
//   bottom: floorPosition + 20,
//   scale: 1.5,
//   ease: "power1.inOut"
// });

// example 4
// let character = generateJustOneMonster();
// let left = `${window.innerWidth / 2 - 100}px`;

// tween = gsap.fromTo(
//   character,
//   {
//     left: `${left}`,
//     bottom: 1000,
//     scale: 1,
//     opacity: 0
//   },
//   {
//     left: `${left}`,
//     bottom: floorPosition,
//     opacity: 1,
//     duration: 1.5,
//     rotation: 360 * 3,
//     ease: "bounce"
//   }
// );

// example 5
// document.querySelectorAll(".character").forEach((character, idx) => {
//   if (idx > 10) return;

//   character.style.display = "block";
//   character.style.left = `${180 * idx}px`;
//   character.style.bottom = `${floorPosition}px`;

//   tween = gsap.from(character, {
//     scale: 0.5,
//     opacity: 0,
//     delay: 0.25 * idx
//   });

//   tween = gsap.to(character, {
//     duration: 2,
//     scale: 1,
//     opacity: 1,
//     delay: 0.25 * idx,
//     stagger: 1,
//     ease: "elastic",
//     rotation: idx === 5 ? 360 : 0
//   });
// });

// example 6
// let character = generateJustOneMonster();

// var tl = new TimelineMax({ repeat: 0 });
// tl.to(character, 0, { bottom: floorPosition + 200 })
//   .to(character, 1, {
//     left: `+=${window.innerWidth - 50}`,
//     rotation: 360
//   })
//   .to(character, 0.5, {
//     transformOrigin: "left",
//     rotation: -180,
//     left: `${window.innerWidth - 50}`,
//     bottom: floorPosition
//   });

// example 7
// let character = generateJustOneMonster(21);

// var tl = new TimelineMax({ repeat: 0 });
// tl.to(character, 0, { bottom: floorPosition, scaleX: -1 })
//   .to(character, 1, { bottom: floorPosition, left: `+=500` })
//   .to(character, 1, {
//     scaleX: 1
//   })
//   .to(character, 1, {
//     scaleX: 1,
//     left: `-=500`
//   });

// example 8
// let character = generateJustOneMonster();

// var tl = new TimelineMax();
// tl.to(character, 0, { bottom: floorPosition, left: `${window.innerWidth / 2}` })
//   .to(character, 1.5, { bottom: floorPosition + 300, rotation: 100 })
//   .to(character, 0.5, { bottom: floorPosition, rotation: 0, ease: Bounce.easeOut });

// example 9
// let character1 = generateJustOneMonster(10);
// let character2 = generateJustOneMonster(11);

// tl1 = new TimelineMax();
// tl2 = new TimelineMax();

// tl1
//   .to(character1, 0, { scaleX: -1, bottom: floorPosition, left: 0 })
//   .to(character1, 1.5, {
//     left: `${window.innerWidth / 2 - 50}`
//   })
//   .to(character1, 0.5, {
//     left: `${-200}`,
//     rotate: -360
//   });

// tl2
//   .to(character2, 0, { bottom: floorPosition, left: `${window.innerWidth - 200}` })
//   .to(character2, 1.5, {
//     left: `${window.innerWidth / 2 + 50}`,
//     onComplete: () => {
//       let speechDOMEl = document.querySelector(".speech");
//       var tl3 = new TimelineMax();

//       tl3
//         .to(speechDOMEl, 0, {
//           opacity: 0,
//           left: `${window.innerWidth / 2 + 50}px`,
//           bottom: `${floorPosition + 100}px`
//         })
//         .to(speechDOMEl, 0.25, { opacity: 1 })
//         .to(speechDOMEl, 1, { opacity: 0 });
//     }
//   })
//   .to(character2, 0.5, {
//     left: `${window.innerWidth}`,
//     rotate: 360
//   });

// example 10
showObstacle();

let character = generateJustOneMonster(20);
let t1 = new TimelineMax();

t1.to(character, 0, { left: 400 })
  .to(character, 1, { left: 620 })
  .to(character, 1, { rotate: -40 })
  .to(character, 1, { bottom: 370, left: 880 })
  .to(character, 0.5, { bottom: floorPosition, left: 620, rotate: -320, ease: Linear.easeNone })
  .to(character, 0.75, { left: 200, rotate: -520 });
