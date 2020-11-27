---
layout: post
title:  "Visualising The Inner Workings of Grid Localisation"
date:   2020-11-23 21:00:00 +0000
categories: robotics grid-localisation
math: true
---
_Note: This post is work in progress._

So far I've implemented the code that divides the map into grids, as well as the motion model; however, I'm having trouble with the output of the motion model.
{:style="text-align: justify;"}

The motion model doesn't really model the robot's motion. For example, when the robot is turning 90&deg;, the model turns by 180&deg; under certain circumstances. I'm not really sure why that is though and it's quite hard to debug the motion model when it's running so many calculations. At the moment, I am running the code on a 5m x 10m map, with a grid resolution of 1m and and angular resolution of 45&deg;. This yields 200 grid cells:
{:style="text-align: justify;"}

$$5m \times 10m \times \frac{365°}{45°} \times 1 \textrm{ cell/m} = 200 \textrm{ cells} $$

For each iteration, the algorithm compares each cell against every other cells, which yields \\(200^2 = 40000\\) operations. Somewhere in those 40,000 operations something goes wrong and I need to find it!
{:style="text-align: justify;"}

I think a visualisation of what the code does can be quite helpful to debug this kind of problem. I managed to visualise the output of the algorithm (a probability distribution) by placing a coloured square at each of the grid cell locations on the map. For the angles, I places layers of these coloured maps on top of each other, each layer corresponding to an angle.
{:style="text-align: justify;"}

_Add image of visualisation here!_

A visualisation of the algorithm's output is certainly interesting, but it only tells me _what_ is wrong, as opposed to _why_ it is wrong or _how_ the algorithm came up with this particular output. I need to think of a way to visualise each or some of the operations that the algorithm goes through in order to come up with the final output.
{:style="text-align: justify;"}

Possible ideas:

1.  Some kind of an animation that visualises the motion of the robot for each step of the algorithm.