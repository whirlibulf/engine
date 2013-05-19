---
layout: docs
title: API - get
---

Get an entity or a component instance.

In most cases, it is more useful to get a component instance than an entity.

## get (id)

Get an entity by its ID.

`id` should be the string ID of the target entity.

Returns an object mapping component types to component IDs, or `undefined` if the entity does not exist.

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
