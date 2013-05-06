var Loop = require("./loop.js");

function Game() {
  var that = this;

  this._systems = [];
  this._components = {}; //component factories
  this._componentsByObject = []; //collections of related components of different types
  this._componentsByType = {}; //components indexed by component type

  this.loop = new Loop();

  this.loop.on("update", function (dt) {
    that._update(dt);
  });
  this.loop.on("render", function (dt) {
    that._render(dt);
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

  if (component.emit) {
    component.emit("register", this);
  }

  this._components[component.id] = component;
  return true;
};



/**
 * Create an object with the specified ID
 *
 * If template is supplied, an object will be created with the requested components
 * Otherwise, an empty object will be created
 */
Game.prototype.createObject = function (id, template) {
};

/**
 * Remove an object and all its components from the game
 */
Game.prototype.removeObject = function (id) {
};

/**
 * Add a new component instance to an object
 */
Game.prototype.createObjectComponent = function (obj, componentID, component, options) {
};

Game.prototype.addComponentToOBject = function (obj, componentID, instance) {
};

Game.prototype.createComponent = function (component, options) {
  var instance;

  if (!this._components.hasOwnProperty(component)) {
    return;
  }

  instance = this._components[component].createComponent(options);

  if (!this._componentsByType[component]) {
    this._componentsByType[component] = [];
  }

  this._componentsByType[component].push(instance);

  return instance;
};


Game.prototype.getComponentInstances = function (component) {
  return this._componentsByType[component] || [];
};



/**
 * Start the game loop
 * Supply an fps parameter to change the game update rate
 */
Game.prototype.start = function (fps) {
  this.loop.start(fps);
};

Game.prototype._update = function (dt) {
  var i;
  for (i = 0; i < this._systems.length; ++i) {
    if (this._systems[i].update) {
      this._systems[i].update(dt);
    }
  }
};

Game.prototype._render = function (dt) {
  var i;
  for (i = 0; i < this._systems.length; ++i) {
    if (this._systems[i].render) {
      this._systems[i].render(dt);
    }
  }
};

module.exports = Game;
