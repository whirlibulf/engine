# whirlibulf

## Requirements

* [Node.js](http://nodejs.org) (Required by component)
* [Component](https://github.com/component/component) (Required for installing packages and building)


## Installation

    $ component install whirlibulf/engine


## Introduction

Whirlibulf is an **Entity-Component-System** Javascript game engine.

On its own, it provides only very basic functionality, and is not very useful for developing a game.

The engine depends on external packages called **Systems** and **Components** to provide the tools to develop a game.

Here's some reading material if you haven't encountered the Entity-Component-System design before:

* http://t-machine.org/index.php/2007/11/11/entity-systems-are-the-future-of-mmog-development-part-2/
* http://gamedev.stackexchange.com/questions/31473/role-of-systems-in-entity-systems-architecture/31491#31491


## Getting Started

First, create a new project with `component`, the client package manager (see requirements above for a link):

    $ component create --local

Once component has created a new project for you, install the engine:

    $ component install whirlibulf/engine

Once the engine is installed, you can install systems and components that you
may need for your game.

For example:

    $ component install whirlibulf/2d-canvas-system
    $ component install whirlibulf/renderable-component
    $ component install whirlibulf/position-component
    $ component install whirlibulf/size-component

Once the systems and components are installed, just add them to the game and create your objects!

    var engine = require("engine");
    var Canvas = require("2d-canvas-system");

    //Create new game instance
    var game = new engine.Game();

    //Add the rendering system
    game.addSystem(new Canvas({
      element: document.getElementById('gameCanvas'),
      width: 800,
      height: 600
    });

    //Add supporting components
    game.addComponent('renderable', require('renderable-component');
    game.addComponent('position', require('position-component');
    game.addComponent('size', require('size-component');

    //Create a square in the middle of the screen
    game.createObject('square', {
      renderable: {
        type: 'rectangle',
        visible: true,
        zIndex: 0
      },
      size: {
        width: 100,
        height: 100
      },
      position: {
        x: 400,
        y: 300
      }
    });

    //Start the game
    game.start();


## Wiki

See the [wiki](https://github.com/whirlibulf/engine/wiki) for more information about the engine.

* [API](https://github.com/whirlibulf/engine/wiki/API)
* [Systems and Components](https://github.com/whirlibulf/engine/wiki/Systems-and-Components)
* [Instantiating Objects](https://github.com/whirlibulf/engine/wiki/Instantiating-Objects)
* [Creating a System](https://github.com/whirlibulf/engine/wiki/Creating-a-System)
* [Creating a Component](https://github.com/whirlibulf/engine/wiki/Creating-a-Component)


## Component (the tool), and Component (the whirlibulf thing)

The word `component` may be a bit confusing, since it is being used in two different
contexts here.

Component (the tool) is a client-side package manager.
It is used to install the engine and any other client-side packages, not necessarily
for whirlibulf.
It is similar to `npm` for node.js, `gem` for ruby, and `composer` for php.

Whirlibulf game components are something else entirely.
Components for the game engine are data structures used by game objects to store
data that may be used by systems.
These whirlibulf components (as well as systems) are published via component the tool.


## License

  MIT
