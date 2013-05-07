var Loop = require("./loop.js");

function Game() {
  var that = this;

  this._systems = [];
  this._components = {}; //component factories
  this._objects = {} //collections of related components of different types
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
  if (!id) {
    console.error('createObject call is missing an object ID');
    return false;
  }

  if (this._objects.hasOwnProperty(id)) {
    console.error('An object with this id already exists');
    return false;
  }

  var obj, component;

  obj = {
    id: id
  };

  this._objects[id] = obj;

  if (template) {
    for (component in template) {
      if (template.hasOwnProperty(component)) {
        this.addComponentToObject(id, component, template[component]);
      }
    }
  }

  return true;
};

/**
 * Get an object by its ID
 */
Game.prototype.getObject = function (id) {
  return this._objects[id];
};

/**
 * Remove an object and all its components from the game
 */
Game.prototype.removeObject = function (id) {
};

/**
 * Create a new component instance
 */
Game.prototype.createComponent = function (id, options) {
  var instance, index;

  if (!this._components.hasOwnProperty(id)) {
    return false;
  }

  instance = this._components[id].createComponent(options);

  if (!instance || typeof instance !== 'object') {
    console.error("Component factory '" + id + "' did not return a component");
    return false;
  }

  if (!this._componentsByType[id]) {
    this._componentsByType[id] = [];
  }

  index = this._componentsByType[id].length;
  instance._index = index;

  this._componentsByType[id].push(instance);

  return index;
};

/**
 * Add a new component instance to an object
 */
Game.prototype.addComponentToObject = function (objectID, componentID, options) {
  var component, obj;

  obj = this.getObject(objectID);
  if (obj === undefined) {
    console.error("Object '" + objectID + "' does not exist");
    return false;
  }

  if (obj.hasOwnProperty(componentID)) {
    console.error("Object already has component '" + componentID + "'");
    return false;
  }

  component = this.createComponent(componentID, options);

  if (component === false) {
    console.error("Component '" + componentID + "' does not exist");
    return false;
  }

  this._componentsByType[componentID][component]._object = obj;
  obj[componentID] = component;
  return true;
};

/**
 * Get all instances of a component
 */
Game.prototype.getComponentInstances = function (component) {
  return this._componentsByType[component] || [];
};

/**
 * Get a specific instance of a component
 */
Game.prototype.getComponentInstance = function (component, index) {
  return this.getComponentInstances(component)[index];
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