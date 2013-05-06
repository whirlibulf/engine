var EventEmitter = require('./eventemitter.js'),
  raf = require('raf');

function Loop() {
  EventEmitter.mixin(this);

  this.setFPS(60);
  this.running = false;
}

Loop.prototype.setFPS = function (fps) {
  this.fps = fps;
  this.delta = 1000 / this.fps;
};

Loop.prototype.start = function (fps) {
  var currentTime, accumulator, tick, newTime, frameTime, that;
  that = this;

  if (fps) {
    this.setFPS(fps);
  }

  if (this.isRunning()) {
    return;
  }

  tick = function () {
    if (!that.isRunning()) {
      return;
    }

    newTime = Date.now();
    frameTime = newTime - currentTime;
    if (frameTime > 250) {
      frameTime = 250;
    }
    currentTime = newTime;

    accumulator += frameTime;
    while (accumulator >= that.delta) {
      that.emit('update', that.delta);
      accumulator -= that.delta;
    }

    that.emit('render', frameTime);
    raf(tick);
  };

  currentTime = Date.now();
  accumulator = 0;

  this.running = true;
  raf(tick);
};

Loop.prototype.stop = function () {
  this.running = false;
};

Loop.prototype.isRunning = function () {
  return this.running;
};

module.exports = Loop;
