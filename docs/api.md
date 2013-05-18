---
layout: docs
title: API
---

## use (system)

Add a system to the game.

Systems will be executed each loop in the same order that they were added to the game.

`system` should be an instance of an object.

Returns `true` if the system was added, otherwise returns `false`.

Example:

{% highlight javascript %}
var Stats = require("stats.js-system");
game.use(new Stats());
{% endhighlight %}


## use (type, component)

Add a component type to the game.

`type` should be the string ID of the component.

`component` should be a factory function that returns a new component instance when called with an options object.

Returns `true` if the component was added, otherwise returns `false`.

Example:

{% highlight javascript %}
game.use("position", require("position-component"));
game.use("size", require("size-component"));
{% endhighlight %}

## create (id, \[template\])

Create a new entity.

`id` should be the string ID of the entity.

`template` is an optional object of components to add to the entity.

Returns `true` if the entity was created, otherwise returns `false`.

Example:

{% highlight javascript %}
game.create("empty entity");

game.create("player", {
  "position": {
    "x": 100,
    "y": 100
  },
  "size": {
    "width": 100,
    "height": 100
  }
});
{% endhighlight %}


## add (entity, component, \[options\])

Add a new component instance to an already existing entity.

`entity` should be the string ID of an already existing entity.

`component` should be the name of the component.

`options` is an optional options object that will be passed to the component factory.

Returns `true` if the component was added, otherwise returns `false`.

Example:

{% highlight javascript %}
game.create("player");
game.add("player", "position", {"x": 100, "y": 100});
game.add("player", "size", {"width": 100, "height": 100});
{% endhighlight %}


## get (id)

Get an entity by its ID.

`id` should be the string ID of the target entity.

Returns an object mapping component types to component IDs, or `undefined` if the entity does not exist.

In most cases, this function is not needed.
See the overload of the `get` function below for a more useful function.

Example:

{% highlight javascript %}
game.create("player", {
  "position": {"x": 100, "y": 100},
  "size": {"x": 100, "y": 100}
});

var player = game.get("player");

/*
  The player object:
  {
    id: "player",
    position: 5,
    size: 2
  }
*/
{% endhighlight %}


## get (id, component)

Get a specific component from an entity.

`id` should be the string ID of the target entity.

`component` should be the string ID of the component type.

Returns the component instance if found, or `undefined` if not found.

Example:

{% highlight javascript %}
game.create("player", {
  "position": {"x": 100, "y": 100},
  "size": {"x": 100, "y": 100}
});

var position = game.get("player", "position");

/*
  The position object:
  {
    "x": 100,
    "y": 100
  }
*/
{% endhighlight %}


## remove (id)

**To be implemented**


## getAll (component)

Get all entities that contain a specific component type.

`component` should be the string ID of the component type.

Returns a list of entity ID strings, or an empty list if no results.

Example:

{% highlight javascript %}
game.create("player 1", {"position": {"x": 100, "y": 100}});
game.create("player 2", {"position": {"x": 300, "y": 300}});

//get all entities with a position component
var entities = game.getAll("position");

/*
  The entities object:
  ["player 1", "player 2"]
*/

//print all x positions of all entities
for (var i = 0; i < entities.length; ++i) {
  var position = game.get(entities[i], "position");
  console.log(position.x);
}
{% endhighlight %}
