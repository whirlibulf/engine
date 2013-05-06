describe("Game", function () {
  var Game = require("engine/lib/game"),
    game;

  beforeEach(function () {
    game = new Game();
  });

  it("should initialise all the core functions of whirlibulf", function () {
    expect(game.addSystem).toBeDefined();
    expect(game.addComponent).toBeDefined();
    expect(game.createObject).toBeDefined();
    expect(game.loop).toBeDefined();
  });
});
