# whirlibulf

## Requirements

* [Node.js](http://nodejs.org) (Required by component)
* [Component](https://github.com/component/component) (Required for installing packages and building)


## Installation

    $ component install whirlibulf/engine


## Getting Started

First, create a new project with component:

    $ component create

Once component has created a new project folder for you, install the engine:

    $ component install whirlibulf/engine

Once the engine is installed, you can install systems and components that you
may need for your game.

For example:

    $ component install whirlibulf/2d-canvas-system
    $ component install whirlibulf/position-component
    $ component install whirlibulf/primitive-shapes-component
    $ component install whirlibulf/script-system
    $ component install whirlibulf/script-component


## Introduction

Whirlibulf is a Javascript game engine.

On its own, it provides only very basic functionality, and is not very useful for developing a game.

The engine depends on external packages called **Systems** and **Components** to provide the tools to develop a game.

Here's some reading material if you haven't encountered the entity-component-system design before:

* http://t-machine.org/index.php/2007/11/11/entity-systems-are-the-future-of-mmog-development-part-2/
* http://gamedev.stackexchange.com/questions/31473/role-of-systems-in-entity-systems-architecture/31491#31491


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

### getComponentInstance(componentType, componentID)

Get a particular component instance of type `componentType` with ID `componentID`.

Example:

    game.getComponentInstance('position', 12);

Returns the component instance, or `undefined` if it is not found.

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
