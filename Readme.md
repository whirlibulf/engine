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

* [Systems and Components](https://github.com/whirlibulf/engine/wiki/Systems-and-Components)
* [Instantiating Objects](https://github.com/whirlibulf/engine/wiki/Instantiating-Objects)
* [Creating a System](https://github.com/whirlibulf/engine/wiki/Creating-a-System)
* [Creating a Component](https://github.com/whirlibulf/engine/wiki/Creating-a-Component)


## API

### addSystem(system)

Add an instance of a system to the game.

Example:

    var scriptSystem = require('script-system');
    game.addSystem(new scriptSystem());

Returns `true` if added, and `false` if there was a problem adding the system.

### addComponent(id, component)

Add an instance of a component factory to the game.

Example:

    var positionComponent = require('position-component');
    game.addComponent('position', positionComponent);

Returns `true` if added, and `false` if there was a problem adding the component.

### createObject(id, [template])

Create a new game object with the specified ID string.

If template is supplied, components will be created with the object and added automatically.

See [Instantiating Objects](https://github.com/whirlibulf/engine/wiki/Instantiating-Objects) for more information.

Example:

    game.createObject('object id', {'position': {'x': 0, 'y': 0}});

Returns `true` if the object was created, otherwise returns `false` if there was an error.

### getObject(id)

Get an object instance by its ID string.

This function should not normally be needed, it is provided for debugging purposes.

Example:

    game.createObject('object id');
    //...
    var obj = game.getObject('object id');

Returns the object instance if it was found, otherwise returns `undefined`.

### removeObject(id)

Removes an object and its components from the game entirely.

Example:

    game.createObject('object id');
    game.removeObject('object id');
    game.getObject('object id'); //returns undefined

### addComponentToObject(objectID, componentType, options)

Add a new component of type `componentType` to an existing object with ID `objectID`.

Example:

    game.createObject('object id');
    game.addComponentToObject('object id', 'position', {'x': 0, 'y': 0});

Returns `true` if the component was added, otherwise returns `false` if there was an error;

### getComponentInstances(componentType)

Get all component instances of the specified type.

Example:

    game.getComponentInstances('position');

Returns an array of component instances, or an empty array if none exist.

### getComponentInstance(objectID, componentType)

Get a particular component instance belonging to an object with ID `objectID`.

Example:

    game.getComponentInstance(12, 'position');

Returns the component instance, or `undefined` if it is not found.

### getObjectsWithComponent(componentType)

Get all objects that have a particular type of component.

Example:

    game.getObjectsWithComponent('renderable');


## Events

The game engine emits the following events:

### componentCreated

Emitted when a new component instance is created.

The new component instance is sent with the event.

### updateBegin

Emitted when the update tick begins.

### updateEnd

Emitted when all systems have finished updating.

### renderBegin

Emitted when the render tick begins.

### renderEnd

Emitted when all systems have finished rendering.

## License

  MIT
