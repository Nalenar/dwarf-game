class Player {
  constructor({ collisionBlocks = [] }) {
    this.position = {
      x: 200,
      y: 200,
    };
    this.width = 25;
    this.height = 25;
    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.gravity = 1;
    this.lastKey;
    this.collisionBlocks = collisionBlocks;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.velocity.x;
    this.checkForHorizontalCollisions();
    this.applyGravity();
    this.checkForVerticalCollisions();
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // if a collision exist
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // colossion on x axis going to left
        if (this.velocity.x < 0) {
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
        // collision on x axis going to right
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // if a collision exist
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // colossion on y axis going up
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
        // collision on y axis going down
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }
      }
    }
  }
}
