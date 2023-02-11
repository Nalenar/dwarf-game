window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // jump
    case "w":
      if (player.velocity.y === 0) {
        player.velocity.y = -20;
      }
      break;

    // move left
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;

    // move right
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
