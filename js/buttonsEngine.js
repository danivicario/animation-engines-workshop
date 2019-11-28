const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const shuffle = array => array.sort(() => Math.random() - 0.5);

document.querySelector(".button-1").onmouseover = function() {
  gsap.to(".button-1", 0.5, {
    rotate: 5,
    yoyo: true,
    repeat: 1
  });
};

document.querySelector(".button-2").onmouseover = function() {
  gsap.to(".button-2", 0.5, {
    backgroundColor: "#333",
    color: "white",
    yoyo: true,
    repeat: 1
  });
};

document.querySelector(".button-3").onclick = function() {
  gsap.to(".button-3", 0.5, {
    padding: 25,
    yoyo: true,
    repeat: 1,
    ease: "elastic.out(1, 0.3)"
  });
};
