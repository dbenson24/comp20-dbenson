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

  window.init = function() {
    var actorsImg, backgroundImg, canvas, context, drawSprites, sprites;
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext("2d");
    sprites = [];
    backgroundImg = new Image();
    backgroundImg.onload = function() {
      var frames, sprite, temp;
      frames = [];
      frames.push(new Frame(0, 0, 256, 240));
      sprite = new Sprite(context, backgroundImg, 0, 0, 800, 600, frames);
      temp = [sprite];
      return sprites = temp.concat(sprites);
    };
    backgroundImg.src = "./duckhunt-background.gif";
    actorsImg = new Image();
    actorsImg.onload = function() {
      var bird1, bird1Frames, bird2, bird2Frames, bird3, bird3Frames, dog, dogFrames, walkDog;
      bird1Frames = [];
      bird1Frames.push(new Frame(0, 113, 40, 40));
      bird1Frames.push(new Frame(40, 113, 40, 40));
      bird1Frames.push(new Frame(80, 113, 40, 40));
      bird1 = new Sprite(context, actorsImg, 250, 150, 80, 80, bird1Frames);
      setInterval(bird1.changeFrame, 150);
      sprites.push(bird1);
      bird2Frames = [];
      bird2Frames.push(new Frame(125, 113, 40, 40));
      bird2Frames.push(new Frame(165, 113, 40, 40));
      bird2Frames.push(new Frame(205, 113, 40, 40));
      bird2 = new Sprite(context, actorsImg, 350, 150, 80, 80, bird2Frames);
      setInterval(bird2.changeFrame, 150);
      sprites.push(bird2);
      bird3Frames = [];
      bird3Frames.push(new Frame(260, 150, 40, 40));
      bird3Frames.push(new Frame(300, 150, 40, 40));
      bird3Frames.push(new Frame(340, 150, 40, 40));
      bird3 = new Sprite(context, actorsImg, 450, 150, 80, 80, bird3Frames);
      setInterval(bird3.changeFrame, 150);
      sprites.push(bird3);
      dogFrames = [];
      dogFrames.push(new Frame(0, 0, 60, 50));
      dogFrames.push(new Frame(60, 0, 60, 50));
      dogFrames.push(new Frame(120, 0, 60, 50));
      dogFrames.push(new Frame(180, 0, 60, 50));
      dogFrames.push(new Frame(240, 0, 60, 50));
      dog = new Sprite(context, actorsImg, 350, 350, 120, 100, dogFrames);
      setInterval(dog.changeFrame, 150);
      walkDog = function() {
        return dog.x = (dog.x + 10) % canvas.width;
      };
      setInterval(walkDog, 150);
      return sprites.push(dog);
    };
    actorsImg.src = "./duckhunt_various_sheet.png";
    drawSprites = function() {
      var s, _i, _len, _results;
      context.clearRect(0, 0, 800, 600);
      _results = [];
      for (_i = 0, _len = sprites.length; _i < _len; _i++) {
        s = sprites[_i];
        _results.push(s.draw());
      }
      return _results;
    };
    return setInterval(drawSprites, 30);
  };
