---
layout: docs
title: API - getAll
---

This is the most important function for systems to allow them to process all
components of a specific type.

## getAll (component)

Get all entities that contain a specific component type.

`component` should be the string ID of the component type.

Returns a list of entity ID strings, or an empty list if no results.

Example:

{% highlight javascript %}
game.create("player 1", {"position": {"x": 100, "y": 100}});
game.create("player 2", {"position": {"x": 300, "y": 300}});
game.create("ball", {"position": {"x": 200, "y": 200}, "size": {"radius": 30}});
game.create("other", {"size": {"radius": 10}});

//get all entities with a position component
var entities = game.getAll("position");

/*
  The entities object:
  ["player 1", "player 2", "ball"]
*/

//print all x positions of all entities
for (var i = 0; i < entities.length; ++i) {
  var position = game.get(entities[i], "position");
  console.log(position.x);
}
{% endhighlight %}
