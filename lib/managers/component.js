function ComponentManager() {
    this.factories = {};
    this.instances = {};
}

ComponentManager.prototype.add = function (id, factory) {
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

    instance = this.factories[id](options);

    if (!instance || typeof instance !== "object") {
        console.error("Component factory '" + id + "' did not return an object");
        return false;
    }

    if (!this.instances[id]) {
        this.instances[id] = [];
    }

    index = this.instances[id].length;
    instance._index = index;

    this.instances[id].push(instance);

    return index;
};

ComponentManager.prototype.get = function (type, id) {
    var list;
    list = this.instances[type];

    if (list === undefined) {
        return false;
    }

    if (id === undefined) {
        return list;
    }

    return list[id];
};

module.exports = ComponentManager;
