  var Frame, Sprite,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Frame = (function() {
    function Frame(sx, sy, sWidth, sHeight) {
      this.sx = sx;
      this.sy = sy;
      this.sWidth = sWidth;
      this.sHeight = sHeight;
    }

    return Frame;

  })();

  Sprite = (function() {
    function Sprite(context, img, x, y, width, height, frames) {
      this.context = context;
      this.img = img;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.frames = frames;
      this.changeFrame = __bind(this.changeFrame, this);
      this.draw = __bind(this.draw, this);
      this.frame = 0;
    }

    Sprite.prototype.draw = function() {
      var frame;
      frame = this.frames[this.frame];
      return this.context.drawImage(this.img, frame.sx, frame.sy, frame.sWidth, frame.sHeight, this.x, this.y, this.width, this.height);
    };

    Sprite.prototype.changeFrame = function() {
      return this.frame = (this.frame + 1) % this.frames.length;
    };

    return Sprite;

  })();

  init = function() {
    var backgroundImg, canvas, context;
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext("2d");
    backgroundImg = new Image(800, 600);
    backgroundImg.src = "./duckhunt-background.gif";
    return backgroundImg.onload = function() {
      var frames, sprite;
      frames = [];
      frames.push(new Frame(0, 0, 256, 240));
      sprite = new Sprite(context, backgroundImg, 0, 0, 800, 600, frames);
      return sprite.draw();
    };
  };
