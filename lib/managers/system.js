function SystemManager() {
    this.systems = [];
}

SystemManager.prototype.add = function (system) {
    if (typeof system !== "object") {
        return false;
    }

    this.systems.push(system);
    return true;
};

SystemManager.prototype.update = function (dt) {
    var i;

    for (i = 0; i < this.systems.length; ++i) {
        if (this.systems[i].update) {
            this.systems[i].update(dt);
        }
    }
};

SystemManager.prototype.render = function () {
    var i;

    for (i = 0; i < this.systems.length; ++i) {
        if (this.systems[i].render) {
            this.systems[i].render();
        }
    }
};

module.exports = SystemManager;
