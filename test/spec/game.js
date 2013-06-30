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
    expect(game.use).toBeDefined();
    expect(game.create).toBeDefined();
    expect(game.add).toBeDefined();
    expect(game.get).toBeDefined();
    expect(game.remove).toBeDefined();
    expect(game.loop).toBeDefined();
    expect(game.start).toBeDefined();
  });

  describe("use", function () {
    it("should add a system object to the game", function () {
      game.use({});

      expect(game._systems.length).toEqual(1);

      game.use({});

      expect(game._systems.length).toEqual(2);
    });

    it("should send a 'register' event to the system", function () {
      game.use(mock.system);

      expect(mock.system.init).toHaveBeenCalled();
    });

    it("should add a component factory to the game", function () {
      var result;
      result = game.use('test', function () {});

      expect(game._components.test).toBeDefined();
      expect(result).toBe(true);
    });

    it("should not add duplicate component types", function () {
      var result;
      result = game.use('test', function () {});

      expect(game._components.test).toBeDefined();
      expect(result).toBe(true);

      result = game.use('test', function () {});

      expect(game._components.test).toBeDefined();
      expect(result).toBe(false);
    });

    it("should reject components without an ID", function () {
      var result;

      result = game.use(function () {});
      expect(result).toBe(false);

      result = game.use();
      expect(result).toBe(false);

      result = game.use(undefined, function () {});
      expect(result).toBe(false);

      result = game.use('', function () {});
      expect(result).toBe(false);
    });
  });

  describe("create", function () {
    it("should reject objects without an ID", function () {
      var result;
      result = game.create();

      expect(result).toBe(false);
    });

    it("should create an empty object if no template is supplied", function () {
      var result;
      result = game.create('test');

      expect(result).toBe(true);
      expect(game._objects.test).toBeDefined();
    });

    it("should not create duplicate objects with the same ID", function () {
      var result;
      result = game.create('test');

      expect(result).toBe(true);
      expect(game._objects.test).toBeDefined();

      result = game.create('test');

      expect(result).toBe(false);
      expect(game._objects.test).toBeDefined();
    });
  });

  describe("get", function () {
    it("should return the correct object", function () {
      var obj;
      game.create('test1');
      game.create('test2');

      obj = game.get('test1');
      expect(obj.id).toBe('test1');

      obj = game.get('test2');
      expect(obj.id).toBe('test2');
    });

    it("should return undefined if the object does not exist", function () {
      expect(game.get('test')).not.toBeDefined();
    });
  });

  describe("remove", function () {
    it("should be tested", function () {
      expect(false).toBe(true);
    });
  });

  describe("add", function () {
    it("should not do anything if the object does not exist", function () {
      var result;
      result = game.add('test', 'test', {});

      expect(result).toBe(false);
    });

    it("should not do anything if the component does not exist", function () {
      var result;
      game.create('test');
      result = game.add('test', 'test', {});

      expect(result).toBe(false);
    });

    it("should add a new component instance to the object", function () {
      game.use('test', mock.component);
      game.create('test');

      result = game.add('test', 'test', {});

      expect(result).toBe(true);

      //make sure object exists
      result = game.get('test');
      expect(result).toBeDefined();
      expect(result.test).toBeDefined();

      //make sure component exists
      result = game.get('test', 'test');
      expect(result).toBeDefined();
    });
  });

  describe("_createComponent", function () {
    it("should not do anything if the component does not exist", function () {
      var result;
      result = game._createComponent('test');

      expect(result).toBe(false);
    });

    it("should return the component instance's index after it is created", function () {
      var result;
      game.use('test', mock.component);
      result = game._createComponent('test');

      expect(result).toBe(0);
      expect(game._componentsByType.test.length).toBe(1);
    });
  });

  describe("config", function () {
      it("should add a value to the config dict", function () {
          game.config("test", true);
          expect(game._config["test"]).toBe(true);
      });

      it("should return a value added to the config", function () {
          game.config("test", true);
          expect(game.config("test")).toBe(true);

          //It should remember the value
          expect(game.config("test")).toBe(true);
      });

      it("should set a value to undefined if explicitly called with undefined value", function () {
          game.config("test", true);
          expect(game.config("test")).toBe(true);
          game.config("test", undefined);
          expect(game.config("test")).toBe(undefined);
      });
  });
});
