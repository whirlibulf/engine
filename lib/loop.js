var Emitter = require('emitter'),
raf = require('raf');

function Loop() {
    this.setFPS(60);
    this.running = false;
    this.tick = this._tick.bind(this);
    this.lastFrame = 0;
    this.accumulator = 0;
}

Emitter(Loop.prototype);

Loop.prototype.setFPS = function (fps) {
    this.fps = fps;
    this.delta = 1000 / this.fps;
};

Loop.prototype._tick = function () {
    var now, dt;

    if (!this.isRunning()) {
        return;
    }

    now = Date.now();
    this.accumulator += now - this.lastFrame;
    if (this.accumulator > 250) {
        this.accumulator = 250;
    }
    this.lastFrame = now;

    while (this.canTick()) {
        this.emit('update', this.delta);
    }

    this.emit('render');
    raf(this.tick);
};

Loop.prototype.canTick = function () {
    if (this.accumulator >= this.delta) {
        this.accumulator -= this.delta;
        return true;
    }

    return false;
};

Loop.prototype.start = function (fps) {
    that = this;

    if (fps) {
        this.setFPS(fps);
    }

    if (this.isRunning()) {
        return;
    }

    this.lastFrame = Date.now();
    this.accumulator = 0;

    this.running = true;
    raf(this.tick);
};

Loop.prototype.stop = function () {
    this.running = false;
};

Loop.prototype.isRunning = function () {
    return this.running;
};

module.exports = Loop;
