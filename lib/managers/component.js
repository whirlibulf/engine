var ComponentPool = require("./componentpool");

function ComponentManager() {
    this.factories = {};
    this.instances = {};
    this.pools = {};
}

ComponentManager.prototype.use = function (id, factory) {
    if (typeof factory !== "function") {
        return false;
    }

    if (id === "" || typeof id !== "string") {
        return false;
    }

    if (this.factories.hasOwnProperty(id)) {
        return false;
    }

    this.factories[id] = factory;
    return true;
};

ComponentManager.prototype.create = function (id, options) {
    var instance, index;

    id = id.toString() || "";
    if (!this.factories.hasOwnProperty(id)) {
        return false;
    }

    if (!this.pools.hasOwnProperty(id)) {
        this.pools[id] = new ComponentPool(this.factories[id]);
    }

    instance = this.pools[id].acquire();
    this.factories[id].call(instance, options);

    if (!instance || typeof instance !== "object") {
        console.error("Component factory '" + id + "' did not return an object");
        return false;
    }

    if (!this.instances[id]) {
        this.instances[id] = [];
    }

    index = this.instances[id].length;
    instance._id = index;

    this.instances[id].push(instance);

    return index;
};

ComponentManager.prototype.get = function (type, id) {
    var list;
    list = this.instances[type];

    if (list === undefined) {
        return null;
    }

    if (id === undefined) {
        return list;
    }

    return list[id];
};

ComponentManager.prototype.setEntity = function (type, id, entity) {
    var component;

    component = this.get(type, id);
    if (component === null) {
        return false;
    }

    component._entity = entity;
    return true;
};

module.exports = ComponentManager;
