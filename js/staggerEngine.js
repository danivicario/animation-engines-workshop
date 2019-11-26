const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const shuffle = array => array.sort(() => Math.random() - 0.5);

let totalBoxes = 240;
let tween;
let tl1;
let tl2;

function setupBoxes() {
  let boxes = Array(totalBoxes)
    .fill()
    .map((_, idx) => idx);

  boxes.forEach(() => {
    const domEl = document.createElement("div");
    domEl.style.width = domEl.style.height = `${window.innerWidth / 20}px`;
    document.body.appendChild(domEl);
  });
}

setupBoxes();

gsap.to("div", 1, {
  opacity: 1,
  stagger: {
    amount: 1.5,
    grid: "auto",
    from: "center"
  },
  //   borderRadius: 50,
  backgroundColor: () => `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}, 1)`
});
