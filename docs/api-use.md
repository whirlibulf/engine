---
layout: docs
title: API - use
---

This function should only be used when the game is being set up.

It is for registering systems and components to the game.

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


