function EventEmitter() {
  this.listeners = {};
}

EventEmitter.prototype.on = function (name, callback) {
  this.listeners[name] = this.listeners[name] || [];

  if (typeof callback !== 'function') {
    return;
  }

  if (this.listeners[name].indexOf(callback) === -1) {
    this.listeners[name].push(callback);
  }
};

EventEmitter.prototype.removeListener = function (name, callback) {
  if (!this.listeners.hasOwnProperty(name)) {
    return;
  }

  var index = this.listeners[name].indexOf(callback);

  if (index === -1) {
    return;
  }

  this.listeners[name].splice(index, 1);
};

EventEmitter.prototype.removeAllListeners = function (name) {
  if (name === undefined) {
    this.listeners = {};
    return;
  }

  if (!this.listeners.hasOwnProperty(name)) {
    return;
  }

  this.listeners[name] = [];
};

EventEmitter.prototype.emit = function (name) {
  if (!this.listeners.hasOwnProperty(name)) {
    return;
  }

  var args, i, l, list;

  list = this.listeners[name];
  args = Array.prototype.slice.call(arguments, 1);

  for (i = 0; i < list.length; ++i) {
    list[i].apply(this, args);
  }
};

EventEmitter.prototype.once = function (name, callback) {
  var that = this;
  if (typeof callback !== 'function') {
    return;
  }

  this.on(name, function wrapper() {
    that.removeListener(name, wrapper);
    callback.apply(this, arguments);
  });
};

EventEmitter.mixin = function (obj) {
  var method;
  obj.listeners = {};
  for (method in EventEmitter.prototype) {
    if (!obj.hasOwnProperty(method)) {
      obj[method] = EventEmitter.prototype[method];
    }
  }
};

module.exports = EventEmitter;
