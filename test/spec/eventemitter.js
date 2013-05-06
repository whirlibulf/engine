describe("EventEmitter", function () {
  var EventEmitter = require("engine/lib/eventemitter"),
    e,
    spy1,
    spy2;

  beforeEach(function () {
    e = new EventEmitter();
    spy1 = jasmine.createSpy("spy1");
    spy2 = jasmine.createSpy("spy2");
  });

  describe("on", function () {
    it("should add a listener", function () {
      e.on("event", spy1);

      expect(e.listeners).toBeDefined();
      expect(e.listeners.event).toBeDefined();
      expect(e.listeners.event.length).toEqual(1);
      expect(e.listeners.event[0]).toBe(spy1);
    });
  });

  describe("emit", function () {
    it("should callback all listeners for an event", function () {
      e.on("event", spy1);
      e.on("event", spy2);
      e.emit("event");

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });

    it("should not callback listeners for other events", function () {
        e.on("event1", spy1);
        e.on("event2", spy2);
        e.emit("event1");

        expect(spy1).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
    });

    it("should callback with the emitted parameters", function () {
      e.on("event", spy1);
      e.emit("event", true, 123, "test", [1, 2, false], {"test": true});

      expect(spy1).toHaveBeenCalledWith(true, 123, "test", [1, 2, false], {"test": true});
    });
  });

  describe("once", function () {
    it("should remove the listener after it is called", function () {
      e.once("event", spy1);
      e.emit("event");

      expect(spy1).toHaveBeenCalled();
      expect(e.listeners.event.length).toEqual(0);
    });

    it("should callback with the emitted parameters", function () {
      e.once("event", spy1);
      e.emit("event", true, 123, "test", [1, 2, false], {"test": true});

      expect(spy1).toHaveBeenCalledWith(true, 123, "test", [1, 2, false], {"test": true});
    });
  });

  describe("removeListener", function () {
    it("should remove the listener from the event", function () {
      e.on("event", spy1);
      e.removeListener("event", spy1);

      expect(e.listeners.event.length).toEqual(0);
    });

    it("should not remove other listeners from the event", function () {
      e.on("event1", spy1);
      e.on("event2", spy2);
      e.removeAllListeners("event1");

      expect(e.listeners.event1.length).toEqual(0);
      expect(e.listeners.event2.length).toEqual(1);
    });
  });

  describe("removeAllListeners", function () {
    it("should remove all listeners from an event", function () {
      e.on("event", spy1);
      e.on("event", spy2);
      e.removeAllListeners("event");

      expect(e.listeners.event.length).toEqual(0);
    });

    it("should remove all listeners", function () {
      e.on("event1", spy1);
      e.on("event2", spy2);
      e.removeAllListeners();

      expect(e.listeners.event1).not.toBeDefined();
      expect(e.listeners.event2).not.toBeDefined();
    });
  });
});
