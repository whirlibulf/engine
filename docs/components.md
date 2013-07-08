---
layout: docs
title: Components
---

## Writing a Component Type

Components in whirlibulf are created through a regular Javascript constructor function.
The constructor can take a single parameter, an `options` object with initial component properties.

The constructor will be used to re-initialize components through the component pooling system.
This means the constructor should reset any properties that were not present in the `options` parameter.

Here is an example of a position component:

{% highlight javascript %}
function PositionComponent(options) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.z = options.z || 0;
}
{% endhighlight %}

## Using a Component

Component types can be added to the engine by passing the constructor to the `use` function:

{% highlight javascript %}
game.use("position", PositionComponent);
{% endhighlight %}

The first parameter is the name of the component, and the second parameter is the constructor function.

It is possible to use the same constructor function for multiple component types:

{% highlight javascript %}
game.use("worldPosition", PositionComponent);
game.use("otherPosition", PositionComponent);
{% endhighlight %}

Note that prepackaged systems may only work with specific components.
For example, the `2d-canvas-system` only recognizes position components called `position`.

Once a component type has been registered with the engine, they can be used by entities:

{% highlight javascript %}
game.create("entity", {
    "worldPosition": {
        "x": 5,
        "y": 20
    },
    "otherPosition": {
        "x": 20,
        "y": 5,
        "z": 30
    }
});

game.add("entity", "position", {"x": 50, "y": 30});
{% endhighlight %}
