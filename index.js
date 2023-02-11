const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

const parsedCollisions = collisionsLevel1.parse2D();
const collisionBlocks = parsedCollisions.createObjectsFrom2D();

const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "assets/img/backgroundLevel1.png",
});

const player = new Player({
  collisionBlocks,
  imageSrc: "assets/img/king/idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 7,
      loop: true,
      imageSrc: "assets/img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 7,
      loop: true,
      imageSrc: "assets/img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 5,
      loop: true,
      imageSrc: "assets/img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 5,
      loop: true,
      imageSrc: "assets/img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 10,
      loop: false,
      imageSrc: "assets/img/king/enterDoor.png",
    },
  },
});

const doors = [
  new Sprite({
    position: {
      x: 750,
      y: 271.7,
    },
    imageSrc: "assets/img/doorOpen.png",
    frameRate: 5,
    frameBuffer: 10,
    loop: false,
    autoplay: false,
  }),
];

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  backgroundLevel1.draw();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.draw();
  });

  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();
}

animate();
