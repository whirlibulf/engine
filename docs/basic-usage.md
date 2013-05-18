---
layout: docs
title: Basic Usage
---

## New Project

First, create a new project with this command:

<div class="shell">
  <span class="path">~</span>
  <span class="prompt">$</span>
  <span class="command">component create --local foldername</span>
</div>

This will prompt you for a project name, description, and whether the project
contains Javascript, CSS and HTML.

Leave out the folder name to install into the current folder.

Answer yes to Javascript, and no to CSS and HTML (unless you are already
familiar with the `component` tool and know what you are doing).

## The Engine

When a new project has been set up, install the engine:

<div class="shell">
  <span class="path">~/foldername</span>
  <span class="prompt">$</span>
  <span class="command">component install whirlibulf/engine</span>
</div>

## Systems and Components

On its own, whirlibulf is not very useful.
It depends on [Systems]({{ site.url }}/docs/systems.html) and
[Components]({{ site.url }}/docs/components.html) to provide the functionality
in a game.
These can also be installed into the project folder in the same way, for example:

<br />
<span class="shell">
  <span class="path">~/foldername</span>
  <span class="prompt">$</span>
  <span class="command">component install whirlibulf/2d-canvas-system</span>
</span>
<br />
<span class="shell">
  <span class="path">~/foldername</span>
  <span class="prompt">$</span>
  <span class="command">component install whirlibulf/renderable-component</span>
</span>
<br />
<span class="shell">
  <span class="path">~/foldername</span>
  <span class="prompt">$</span>
  <span class="command">component install whirlibulf/position-component</span>
</span>
<br />
<span class="shell">
  <span class="path">~/foldername</span>
  <span class="prompt">$</span>
  <span class="command">component install whirlibulf/size-component</span>
</span>

These are the minimum required systems and components to draw a simple shape on a canvas.

Because of the way whirlibulf works, you could use your own rendering system, or
swap it out for a third-party compatible rendering system without changing any
of your entities or components.

You could potentially swap from an HTML5 canvas renderer to a DOM renderer, to a
WebGL renderer, to a SVG renderer with minimal effort.

The same applies to all kinds of systems. You could swap out physics, pathfinding,
controls, etc.

## Initial Code

Here is a basic example of using the systems and components above to draw some shapes:

{% highlight javascript linenos=table %}
var engine = require("engine");
var Canvas = require("2d-canvas-system");

//Create a new game instance
var game = new engine.Game();

//Register the rendering system
game.use(new Canvas({
  "element": document.getElementById("gameCanvas"),
  "width": 800,
  "height": 600
});

//Register the component types
game.use("renderable", require("renderable-component");
game.use("position", require("position-component");
game.use("size", require("size-component");

//Create a square in the middle of the screen
game.create("square", {
  "renderable": {
    "type": "rectangle",
    "visible": true,
    "zIndex": 0
  },
  "position": {
    "x": 400,
    "y": 300
  },
  "size": {
    "width": 100,
    "height": 100
  }
});

//Create a small circle on top of the square
game.create("circle", {
  "renderable": {
    "type": "circle",
    "visible": true,
    "zIndex": 1
  },
  "position": {
    "x": 400,
    "y": 300
  },
  "size": {
    "radius": 10
  }
});
{% endhighlight %}

The options used to initialize the canvas system and the components are specific
to the implementations of the systems and components.

**They are not part of the base engine.**

See more information about these systems and components in their respective
repositories:

* [2d-canvas-system](https://github.com/whirlibulf/2d-canvas-system)
* [renderable-component](https://github.com/whirlibulf/renderable-component)
* [position-component](https://github.com/whirlibulf/position-component)
* [size-component](https://github.com/whirlibulf/size-component)


## Building

To build the game, run this command:

<div class="shell">
  <span class="path">~/foldername</span>
  <span class="prompt">$</span>
  <span class="command">component build --dev</span>
</div>

Leave out the `dev` option if you want to make a final build.
The `dev` option adds a source map to make your game easier to debug in a browser.

This command takes the engine, all installed systems, components and other packages,
and puts them all into a single `build.js` file in the `build` folder.
The build process also includes your game code.

**Important**: All your own files to be included in the build process need to
be listed in the `component.json` file.


## The HTML file

To run the example code, an HTML file is needed to do two things:

1. Include the `build/build.js` file which includes all the game, engine and
third-party code.

2. Create a canvas element on the screen which will be used by the rendering system.
