var init = function() {
    var background, canvas, context;
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext("2d");
    background = new Image(800, 600);
    background.src = "./duckhunt-background.gif";
    background.onload = function() {
      context.drawImage(background, 0, 0, 800, 600);
    };
    console.log(background);
  };
