const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

let parsedCollisions;
let collisionBlocks;
let background;
let doors;
const player = new Player({
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
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;

            if (level === 4) level = 1;
            levels[level].init();
            gsap.to(overlay, {
              opacity: 0,
            });
            player.switchSprite("idleRight");
            player.preventInput = false;
          },
        });
      },
    },
  },
});

let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;

      if (player.currentAnimation) {
        player.currentAnimation.isActive = false;
      }

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "assets/img/backgroundLevel1.png",
      });

      doors = [
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
    },
  },

  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 100;
      player.position.y = 145;

      if (player.currentAnimation) {
        player.currentAnimation.isActive = false;
      }

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "assets/img/backgroundLevel2.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 771.7,
            y: 335.5,
          },
          imageSrc: "assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 10,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },

  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 740;
      player.position.y = 205;

      if (player.currentAnimation) {
        player.currentAnimation.isActive = false;
      }

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "assets/img/backgroundLevel3.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 175.7,
            y: 335.3,
          },
          imageSrc: "assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 10,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
};

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

const overlay = {
  opacity: 0,
};

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.draw();
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.draw();
  // });

  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init();
animate();
