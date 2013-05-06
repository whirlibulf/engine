var Loop = require("./loop.js");

function Game() {
  var that = this;

  this._systems = [];
  this._components = {};
  this._objects = [];

  this.loop = new Loop();

  this.loop.on("update", function (dt) {
    that.update(dt);
  });
  this.loop.on("render", function (dt) {
    that.render(dt);
  });

  console.log("Engine loaded");
}



/**
 * Register an instance of a system to the game
 * Systems are updated in the order in which they are added to the game
 */
Game.prototype.addSystem = function (system) {
  if (typeof system !== "object") {
    return false;
  }

  if (system.emit) {
    system.emit("register", this);
  }

  this._systems.push(system);
  return true;
};



/**
 * Register component factories to the game
 */
Game.prototype.addComponent = function (component) {
  if (typeof component !== "object") {
    return false;
  }

  if (!component.id) {
    return false;
  }

  if (this._components.hasOwnProperty(component.id)) {
    return false;
  }

  this._components[component.id] = component;
  return true;
};



Game.prototype.createObject = function (template) {
};



Game.prototype.start = function (fps) {
  this.loop.start(fps);
};

Game.prototype.update = function (dt) {
  var i;
  for (i = 0; i < this._systems.length; ++i) {
    if (this._systems[i].update) {
      this._systems[i].update(dt);
    }
  }
};

Game.prototype.render = function (dt) {
  var i;
  for (i = 0; i < this._systems.length; ++i) {
    if (this._systems[i].render) {
      this._systems[i].render(dt);
    }
  }
};

module.exports = Game;
