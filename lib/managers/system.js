function SystemManager() {
    this.systems = [];
    this.head = null;
    this.tail = null;
    this.count = 0;
}

SystemManager.prototype.add = function (system) {
    var current;

    if (typeof system !== "object" && typeof system !== "function") {
        console.error("Systems must be object instances");
        return false;
    }

    if (typeof system === "function") {
        system = new system();
    }

    current = {
        "system": system,
        "next": null
    };

    if (this.head === null) {
        this.head = current;
    }

    if (this.tail !== null) {
        this.tail.next = current;
    }

    this.tail = current;
    this.count++;

    return system;
};

SystemManager.prototype.update = function (dt) {
    var current;
    for (current = this.head; current; current = current.next) {
        if (current.system.update) {
            current.system.update(dt);
        }
    }
};

SystemManager.prototype.render = function () {
    var current;
    for (current = this.head; current; current = current.next) {
        if (current.system.render) {
            current.system.render();
        }
    }
};

module.exports = SystemManager;
