import p5 from "p5";
import { Point } from "./point";
import { Polygon } from "./polygon";

const sketch = (p: p5) => {
  const polygon = new Polygon([]);

  p.preload = () => {};

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.disableFriendlyErrors = true; // disable friendly errors for increased performance
    console.log("p5 loaded!");

    canvas.position(0, 0); // make canvas start in top-left corner
    canvas.style("z-index", "-1"); // set canvas as background
    p.frameRate(60); // target framerate

    p.background(0);
    p.stroke(255);
    polygon.addPointAt(new Point(p.random(p.width), p.random(p.height)), 0);
    polygon.addPointAt(new Point(p.random(p.width), p.random(p.height)), 1);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    // p.background(0,200,200);
    // p.ellipse(100, 150, 180, 60);
    

    polygon.insertPointAndDraw(p, new Point(p.random(p.width), p.random(p.height)));

    p.noLoop();
  };

  // set functions as global functions
  window.saveCanvas = () => p.saveCanvas("canvas", "png");
  window.windowResized = p.windowResized;
};

const sketchP = new p5(sketch);
