
# engine

  

## Installation

    $ component install whirlibulf/engine

## API


## Getting Started

First, create a new project with component:

    $ component create

Once component has created a new project folder for you, install the engine:

    $ component install whirlibulf/engine

Once the engine is installed, you can install systems and components that you
may need for your game.

For example:

    $ component install whirlibulf/script-system


## Design

Game objects are simply collections of related components.

Components are primarily just data, containing the state of the object it belongs
to.

Systems contain most of the game logic, reading in component data and doing
something with them.

Some reading material with much better explanations:

* http://t-machine.org/index.php/2007/11/11/entity-systems-are-the-future-of-mmog-development-part-2/
* http://gamedev.stackexchange.com/questions/31473/role-of-systems-in-entity-systems-architecture/31491#31491


## Systems

Systems can implement an `update` function or a `render` function.

Systems can also extend `component/emitter` and listen for the `register` event
to know when it has been added to the game.

Example:

    function System() {
      var that = this;

      this.on('register', function (engine) {
        console.log('System loaded');
        that.engine = engine;
      });
    }

    Emitter(System.prototype);

    System.prototype.update = function (dt) {
      //Do stuff here
    };


## Component Factories and Components

Component factories create new component instances when they are needed by an object.

Component factories should have an 'id' property to identify the type of component.
They should also have a `createComponent` function, which returns a component instance.

Component instances are usually pure data - object literals.
However, they can also implement functions if necessary.

## License

  MIT
