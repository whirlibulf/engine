---
layout: docs
title: Systems
---

Systems are added to the engine with the `use` function:

{% highlight javascript %}
game.use(require("some-system"));
{% endhighlight %}

The parameter is the constructor function for creating a new instance of the System;

Each system will be called in the update and render loop in the order in which they were added to the engine.

## Writing a System

### init

The `init` function is needed to acquire the instance of whirlibulf.

{% highlight javascript %}
System.prototype.init = function (engine) {
    console.log("System loaded");
    this.engine = engine;
};
{% endhighlight %}

`init` is called when a system has been successfully added to a whirlibulf instance.

### update

The `update` function is for systems to hook into the update loop of whirlibulf.

The parameter is the time passed since the last update frame.
This value is dependent on the `fps` value passed to the whirlibulf `start` function.

{% highlight javascript %}
System.prototype.update = function (dt) {
    //Do something here
};
{% endhighlight %}

### render

The `render` function is similar to the `update` function.
This function is called during the render loop of whirlibulf. 
It will be called as often as possible with `requestAnimationFrame`.

This function has no parameters.

{% highlight javascript %}
System.prototype.render = function () {
    //Draw something here
};
{% endhighlight %}

### Working with entities and components

Systems perform all the work of updating components.

The first thing a system should do is tell the engine which components it requires.
This is done with the `index` function:

{% highlight javascript %}
System.prototype.init = function (engine) {
    this.engine = engine;
    this.index = this.engine.index(["position", "velocity"]);
};
{% endhighlight %}

This system will tell the engine to index all entities that have both a position and velocity component.
The value returned is the index key, which can be used in the update loop to fetch the entities in the index:

{% highlight javascript %}
System.prototype.update = function (dt) {
    var entities = this.engine.getAll(this.index);
};
{% endhighlight %}

In the above code, `entities` is now a list of entity IDs for entities that match the component requirements.

### Example System

Here is an example system for updating entity positions based on their velocity:

{% highlight javascript %}
function System(options) {
    //Initialize variables (optional)
    this.engine = null;
    this.index = null;
}

System.prototype.init = function (engine) {
    console.log("Kinematics system loaded");

    //Save a reference to the engine, because it will be used in the update function
    this.engine = engine;

    //Tell the engine to index all entities that have velocity and position components
    this.index = this.engine.index(["velocity", "position"]);
};

System.prototype.update = function (dt) {
    var entities, i, velocity, position;

    dt /= 1000;

    //Get all the entities indexed for this system
    entities = this.engine.getAll(this.index);

    //Loop through each entity one by one
    for (i = 0; i < entities.length; ++i) {
        //Get the velocity and position components of the entity
        velocity = this.engine.get(entities[i], "velocity");
        position = this.engine.get(entities[i], "position");

        //Update the position component properties
        position.x += (velocity.x || 0) * dt;
        position.y += (velocity.y || 0) * dt;
        position.z += (velocity.z || 0) * dt;
    }
};
{% endhighlight %}
