---
layout: docs
title: Entities
---

**Important**: In the whirlibulf source and documentation, entities are
sometimes referred to simply as **game objects**.

Entities in whirlibulf are related groups of components.

Entities contain no functionality, and no game data.
They only have a list of components that have been added to the entity, and the
component IDs.

The data structure of an entity is:

{% highlight javascript %}
{
  id: "entity ID",
  <component>: <componentID>,
  ...
}
{% endhighlight %}

`component` is the type of component that belongs to that entity.

`componentID` is the number ID of the component instance.

As you can see by the lack of game data contained in an entity, it is not very
useful to work directly with entities.

The design of whirlibulf means all the heavy lifting is done by systems, working
on the data contained by components.

## Creating Entities

The [create]({{ site.url }}/docs/api-create.html) function creates a new entity:

{% highlight javascript %}
game.create('entity1');
{% endhighlight %}

This creates an empty object with the ID `entity1`.

To add components to the entity, you can use the [add]({{ site.url }}/docs/api-add.html)
function:

{% highlight javascript %}
game.add('entity1', 'position', {"x": 100, "y": 100});
{% endhighlight %}

This will add a `position` component to the entity.

However, there is a more data-oriented way of creating entities in one function call:

{% highlight javascript %}
game.create('entity1', {
  "position": {
    "x": 100,
    "y": 100
  }
});
{% endhighlight %}

This code creates an entity with a `position` component automatically added.

If you were to extract the set of components into a separate variable, you could
use that as a template for multiple entities:

{% highlight javascript %}
var template = {
  "position": {
    "x": 100,
    "y": 100
  }
};
game.create('entity1', template);
game.create('entity2', template);
game.create('entity3', template);
game.create('entity4', template);
{% endhighlight %}

This creates four entities, all with their own `position` component.
