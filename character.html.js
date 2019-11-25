// Dani Vicario - character.html experiment (canvas)- Mon Nov 25 14:11:21 CET 2019

// eslint-disable-next-line no-unused-vars
const globalCompositeOperationModes = {
  "normal": "source-over",
  "source-in": "source-in",
  "source-out": "source-out",
  "source-atop": "source-atop",
  "destination-over": "destination-over",
  "destination-in": "destination-in",
  "destination-out": "destination-out",
  "destination-atop": "destination-atop",
  "lighter": "lighter",
  "copy": "copy",
  "xor": "xor",
  "multiply": "multiply",
  "screen": "screen",
  "overlay": "overlay",
  "darken": "darken",
  "lighten": "lighten",
  "color-dodge": "color-dodge",
  "color-burn": "color-burn",
  "hard-light": "hard-light",
  "soft-light": "soft-light",
  "difference": "difference",
  "exclusion": "exclusion",
  "hue": "hue",
  "saturation": "saturation",
  "color": "color",
  "luminosity": "luminosity"
};

// eslint-disable-next-line func-names
CanvasRenderingContext2D.prototype.rotateImageFromCenter = function(
  imageCanvas,
  angleInDegrees,
  placeImageInX,
  placeImageInY,
  width,
  height
) {
  this.save();

  if (width === undefined && height === undefined) {
    this.translate(placeImageInX, placeImageInY);
    this.rotate((angleInDegrees * Math.PI) / 180);
    this.drawImage(imageCanvas, -imageCanvas.width / 2, -imageCanvas.height / 2);
  } else {
    this.translate(placeImageInX, placeImageInY);
    this.rotate((angleInDegrees * Math.PI) / 180);
    this.drawImage(imageCanvas, -width / 2, -height / 2, width, height);
  }

  this.restore();
};

// eslint-disable-next-line no-unused-vars
Math.randomFloat = (min, max) => Math.random() * (max - min) + min;
// eslint-disable-next-line no-unused-vars
Math.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// eslint-disable-next-line no-unused-vars
Math.shuffle = (array, _) => array.sort(() => Math.random() - 0.5);

/** @type HTMLCanvasElement */
const canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const ctx = canvasDOMEl.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
// eslint-disable-next-line no-unused-vars
const w2 = w / 2;
// eslint-disable-next-line no-unused-vars
const h2 = h / 2;

// eslint-disable-next-line no-unused-vars
const { PI } = Math;
// eslint-disable-next-line no-unused-vars
const PI_DOUBLE = 2 * Math.PI;
// eslint-disable-next-line no-unused-vars
const PI_HALF = Math.PI / 2;

canvasDOMEl.setAttribute("height", window.innerHeight);
canvasDOMEl.setAttribute("width", window.innerWidth);

ctx.save();

function startGame(assets) {
  // ctx.rotateImageFromCenter(assets.angryBirdsBackground, 0, w2, h2);
  // ctx.drawImage(assets.angryBirdsCharacters, 810, 770, 43, 43, 100, 620, 43, 43);

  var Example = Example || {};

  Example.slingshot = function() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composites = Matter.Composites,
      Events = Matter.Events,
      Constraint = Matter.Constraint,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
      world = engine.world;

    // create renderer
    var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        showAngleIndicator: true
      }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
      rockOptions = { density: 0.004 },
      rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
      anchor = { x: 170, y: 450 },
      elastic = Constraint.create({
        pointA: anchor,
        bodyB: rock,
        stiffness: 0.05
      });

    var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
      return Bodies.rectangle(x, y, 25, 40);
    });

    var ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true });

    var pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, function(x, y) {
      return Bodies.rectangle(x, y, 25, 40);
    });

    World.add(engine.world, [ground, pyramid, ground2, pyramid2, rock, elastic]);

    Events.on(engine, "afterUpdate", function() {
      if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
        rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
        World.add(engine.world, rock);
        elastic.bodyB = rock;
      }
    });

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function() {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
      }
    };
  };
}

function preloadAndStartGame(ctx) {
  let loadedAssets = 0;
  let totalAssets = 2;
  let angryBirdsCharacters;
  let angryBirdsBackground;

  function onPreload() {
    loadedAssets++;

    if (loadedAssets === totalAssets) {
      startGame({
        angryBirdsBackground: angryBirdsBackground,
        angryBirdsCharacters: angryBirdsCharacters
      });
    }
  }

  function preloadAssets() {
    angryBirdsCharacters = new Image();
    angryBirdsCharacters.src = "images/angrybirds.png";

    angryBirdsBackground = new Image();
    angryBirdsBackground.src = "images/angrybirdsbackground.png";

    angryBirdsCharacters.onload = onPreload;
    angryBirdsBackground.onload = onPreload;
  }

  preloadAssets();
}

preloadAndStartGame(ctx);
