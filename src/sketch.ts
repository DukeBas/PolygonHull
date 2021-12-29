import p5 from "p5";
import { Point } from "./point";
import { Polygon } from "./polygon";

const sketch = (p: p5) => {
  let polygon: Polygon;

  p.setup = () => {
    // configure canvas
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.disableFriendlyErrors = true; // disable friendly errors for increased performance
    canvas.position(0, 0); // make canvas start in top-left corner
    canvas.style("z-index", "-1"); // set canvas as background
    p.frameRate(60); // target framerate
    initialiseCanvas(p);

    // initalise polygon singleton
    polygon = new Polygon([
      new Point(p.random(p.width), p.random(p.height)),
      new Point(p.random(p.width), p.random(p.height)),
    ]);
  };

  p.windowResized = () => {
    initialiseCanvas(p);
  };

  p.draw = () => {
    const newPoint = new Point(p.random(p.width), p.random(p.height));
    polygon.addPoint(p, newPoint);
    // polygon.draw(p);
  };

  // set functions as global functions
  window.saveCanvas = () => p.saveCanvas("canvas", "png");
  window.windowResized = p.windowResized;
};

function initialiseCanvas(p: p5) {
  if (p.frameCount > 0) {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
  p.background(0);
  p.stroke(255);
}

const sketchP = new p5(sketch);
