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
    function Sprite(context, img, x, y, width, height, frames, offset) {
      this.context = context;
      this.img = img;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.frames = frames;
      this.offset = offset;
      this.clearAnimations = __bind(this.clearAnimations, this);
      this.animate = __bind(this.animate, this);
      this.changeFrame = __bind(this.changeFrame, this);
      this.draw = __bind(this.draw, this);
      this.frame = 0;
      if (this.offset) {
        this.x = this.x + this.width;
        this.y = this.y + this.height;
      }
    }

    Sprite.prototype.draw = function() {
      var frame, offsetX, offsetY;
      frame = this.frames[this.frame];
      offsetX = 0;
      offsetY = 0;
      if (this.offset) {
        offsetX = this.width;
        offsetY = this.height;
      }
      return this.context.drawImage(this.img, frame.sx, frame.sy, frame.sWidth, frame.sHeight, this.x - offsetX, this.y - offsetY, this.width, this.height);
    };

    Sprite.prototype.changeFrame = function() {
      return this.frame = (this.frame + 1) % this.frames.length;
    };

    Sprite.prototype.animate = function(rate, dx, dy) {
      var change;
      change = (function(_this) {
        return function() {
          _this.x = (_this.x + dx) % (_this.context.canvas.width + _this.width);
          if (_this.x + _this.width < 0) {
            console.log("Min width reached at:", _this.x);
            _this.x = _this.context.canvas.width + _this.width;
          }
          _this.y = (_this.y + dy) % (_this.context.canvas.height + _this.height);
          if (_this.y + _this.height < 0) {
            console.log("Min height reached at:", _this.y);
            return _this.y = _this.context.canvas.height + _this.height;
          }
        };
      })(this);
      this.animation = setInterval(this.changeFrame, rate);
      return this.move = setInterval(change, rate);
    };

    Sprite.prototype.clearAnimations = function() {
      if (this.animation != null) {
        clearInterval(this.animation);
        this.animation = null;
      }
      if (this.move != null) {
        clearInterval(this.move);
        return this.move = null;
      }
    };

    return Sprite;

  })();

  window.init = function() {

    /*
    Retrieve the canvas and initialize the array of sprites
     */
    var actorsImg, backgroundImg, canvas, context, drawSprites, sprites;
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext("2d");
    sprites = [];

    /*
    Load the background image in and any other actors that will be on the canvas.
    Once each has been initialized push it onto the sprites array.
     */
    backgroundImg = new Image();
    backgroundImg.onload = function() {
      var frames, sprite, temp;
      frames = [];
      frames.push(new Frame(0, 0, 256, 240));
      sprite = new Sprite(context, backgroundImg, 0, 0, 800, 600, frames, false);

      /*
      Make sure that the background is drawn before any other sprites
       */
      temp = [sprite];
      return sprites = temp.concat(sprites);
    };
    backgroundImg.src = "./duckhunt-background.gif";
    actorsImg = new Image();
    actorsImg.onload = function() {

      /*
      Create the frames and initialize all the sprites
      setInterval is used to cycle through the animations
      setInterval is again used to change the x location of the dog
      to simulate walking
       */
      var bird1, bird1Frames, bird2, bird2Frames, bird3, bird3Frames, dog, dogFrames;
      bird1Frames = [];
      bird1Frames.push(new Frame(0, 113, 40, 40));
      bird1Frames.push(new Frame(40, 113, 40, 40));
      bird1Frames.push(new Frame(80, 113, 40, 40));
      bird1 = new Sprite(context, actorsImg, 250, 150, 80, 80, bird1Frames, true);
      bird1.animate(150, 10, 0);
      sprites.push(bird1);
      bird2Frames = [];
      bird2Frames.push(new Frame(125, 113, 40, 40));
      bird2Frames.push(new Frame(165, 113, 40, 40));
      bird2Frames.push(new Frame(205, 113, 40, 40));
      bird2 = new Sprite(context, actorsImg, 350, 150, 80, 80, bird2Frames, true);
      bird2.animate(150, 10, 0);
      sprites.push(bird2);
      bird3Frames = [];
      bird3Frames.push(new Frame(260, 150, 40, 40));
      bird3Frames.push(new Frame(300, 150, 40, 40));
      bird3Frames.push(new Frame(340, 150, 40, 40));
      bird3 = new Sprite(context, actorsImg, 450, 150, 80, 80, bird3Frames, true);
      bird3.animate(150, 10, -10);
      sprites.push(bird3);
      dogFrames = [];
      dogFrames.push(new Frame(0, 0, 60, 50));
      dogFrames.push(new Frame(60, 0, 60, 50));
      dogFrames.push(new Frame(120, 0, 60, 50));
      dogFrames.push(new Frame(180, 0, 60, 50));
      dogFrames.push(new Frame(240, 0, 60, 50));
      dog = new Sprite(context, actorsImg, 350, 350, 120, 100, dogFrames, true);
      dog.animate(150, 10, 0);
      return sprites.push(dog);
    };
    actorsImg.src = "./duckhunt_various_sheet.png";

    /*
    Logic for redrawing the canvas at about 33 fps
     */
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
