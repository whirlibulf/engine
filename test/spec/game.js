describe("Game", function () {
  var Game = require("engine/lib/game"),
    game,
    mock,
    system,
    component;

  beforeEach(function () {
    game = new Game();
    mock = {};

    //mock system
    mock.system = jasmine.createSpyObj('system', ['init']);

    //mock component
    mock.component = function () {
      return {};
    };
    spyOn(mock, 'component').andCallThrough();
  });

  it("should initialise all the core functions of whirlibulf", function () {
    expect(game.addSystem).toBeDefined();
    expect(game.addComponent).toBeDefined();
    expect(game.createObject).toBeDefined();
    expect(game.loop).toBeDefined();
  });

  describe("addSystem", function () {
    it("should add a system object to the game", function () {
      game.addSystem({});

      expect(game._systems.length).toEqual(1);

      game.addSystem({});

      expect(game._systems.length).toEqual(2);
    });

    it("should send a 'register' event to the system", function () {
      game.addSystem(mock.system);

      expect(mock.system.init).toHaveBeenCalled();
    });
  });

  describe("addComponent", function () {
    it("should add a component factory to the game", function () {
      var result;
      result = game.addComponent('test', function () {});

      expect(game._components.test).toBeDefined();
      expect(result).toBe(true);
    });

    it("should not add duplicate component types", function () {
      var result;
      result = game.addComponent('test', function () {});

      expect(game._components.test).toBeDefined();
      expect(result).toBe(true);

      result = game.addComponent('test', function () {});

      expect(game._components.test).toBeDefined();
      expect(result).toBe(false);
    });

    it("should reject components without an ID", function () {
      var result;

      result = game.addComponent(function () {});
      expect(result).toBe(false);

      result = game.addComponent();
      expect(result).toBe(false);

      result = game.addComponent(undefined, function () {});
      expect(result).toBe(false);

      result = game.addComponent('', function () {});
      expect(result).toBe(false);
    });
  });

  describe("createObject", function () {
    it("should reject objects without an ID", function () {
      var result;
      result = game.createObject();

      expect(result).toBe(false);
    });

    it("should create an empty object if no template is supplied", function () {
      var result;
      result = game.createObject('test');

      expect(result).toBe(true);
      expect(game._objects.test).toBeDefined();
    });

    it("should not create duplicate objects with the same ID", function () {
      var result;
      result = game.createObject('test');

      expect(result).toBe(true);
      expect(game._objects.test).toBeDefined();

      result = game.createObject('test');

      expect(result).toBe(false);
      expect(game._objects.test).toBeDefined();
    });
  });

  describe("getObject", function () {
    it("should return the correct object", function () {
      var obj;
      game.createObject('test1');
      game.createObject('test2');

      obj = game.getObject('test1');
      expect(obj.id).toBe('test1');

      obj = game.getObject('test2');
      expect(obj.id).toBe('test2');
    });

    it("should return undefined if the object does not exist", function () {
      expect(game.getObject('test')).not.toBeDefined();
    });
  });

  describe("removeObject", function () {
    it("should be tested", function () {
      expect(false).toBe(true);
    });
  });

  describe("createComponent", function () {
    it("should not do anything if the component does not exist", function () {
      var result;
      result = game.createComponent('test');

      expect(result).toBe(false);
    });

    it("should return the component instance's index after it is created", function () {
      var result;
      game.addComponent('test', mock.component);
      result = game.createComponent('test');

      expect(result).toBe(0);
      expect(game._componentsByType.test.length).toBe(1);
    });
  });

  describe("addComponentToObject", function () {
    it("should not do anything if the object does not exist", function () {
      var result;
      result = game.addComponentToObject('test', 'test', {});

      expect(result).toBe(false);
    });

    it("should not do anything if the component does not exist", function () {
      var result;
      game.createObject('test');
      result = game.addComponentToObject('test', 'test', {});

      expect(result).toBe(false);
    });

    it("should add a new component instance to the object", function () {
      game.addComponent('test', mock.component);
      game.createObject('test');

      result = game.addComponentToObject('test', 'test', {});

      expect(result).toBe(true);

      result = game.getObject('test');
      expect(result.test).toBeDefined();
    });
  });
});
