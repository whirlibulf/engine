---
layout: docs
title: Installation
---

## Requirements

[Node.js](http://nodejs.org) is required to run `component`.

[Component](https://github.com/component/component) is required to install and build the engine, and systems and components.

## Install

Once you get the requirements installed, you can run this command to install
the whirlibulf engine into the working folder:

<div class="shell">
  <span class="path">~</span>
  <span class="prompt">$</span>
  <span class="command">component install whirlibulf/engine</span>
</div>

See [Basic Usage]({{ site.url }}/docs/basic-usage.html) for more information on how to use whirlibulf.

## Component (the tool)

The word `component` may have been confusing so far, since it has been used with
two different meanings.

[Component](https://github.com/component/component) (the tool) is a client-side
package manager. It is used to install the engine and any other required packages.
It is similar to `npm` for node.js, `gem` for ruby, and `composer` for PHP.

It is also used to build and package the game.

## Component (the whirlibulf thing)

[Components]({{ site.url }}/docs/components.html) in whirlibulf are something
else entirely.
Components for the game engine are data structures used by game entities to store
data that may be used by systems.

Generally in the rest of the documentation, any reference to a `component` is a
reference to a whirlibulf game component.
