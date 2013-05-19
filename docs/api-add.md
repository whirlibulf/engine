---
layout: docs
title: API - add
---

This function is for adding new components to an already existing entity.

This function is an alternative to `create(id, template)`, if you want to create
game entities procedurally.

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
