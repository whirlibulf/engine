---
layout: docs
title: API - create
---

This function is for creating new entities.

It can also add initial components to the new entity.

## create (id)

Create a new entity.

`id` should be the string ID of the entity.

Returns `true` if the entity was created, otherwise returns `false`.

Example:

{% highlight javascript %}
game.create("empty entity");
{% endhighlight %}


## create (id, template)

Create a new entity and add initial components specified in the `template` parameter.

Internally, this uses the `add` function to add the components in the `template`
parameter to the new entity.

`id` should be the string ID of the entity.

`template` is an optional object of components to add to the entity.

Returns `true` if the entity was created, otherwise returns `false`.

{% highlight javascript %}
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
