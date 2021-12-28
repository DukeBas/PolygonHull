import p5 from "p5";
import { Point } from "./point";
import { Polygon } from "./polygon";

const sketch = (p: p5) => {
  let polygon: Polygon;

  p.preload = () => {};

  p.setup = () => {
    // configure canvas
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.disableFriendlyErrors = true; // disable friendly errors for increased performance
    canvas.position(0, 0); // make canvas start in top-left corner
    canvas.style("z-index", "-1"); // set canvas as background
    p.frameRate(2); // target framerate
    initialiseCanvas(p);

    // initalise polygon singleton
    polygon = new Polygon([
      // new Point(p.random(p.width), p.random(p.height)), 
      // new Point(p.random(p.width), p.random(p.height)), 
      new Point(100,100),
      new Point(500,100),
    ]);

    polygon.addPoint(p, new Point(300,300));
    polygon.addPoint(p, new Point(400,400));
    // polygon.insertPointAndDrawTriangle(p, new Point(400,400));
    polygon.addPoint(p, new Point(500,500));
    polygon.addPoint(p, new Point(100,500));
    polygon.addPoint(p, new Point(200,200));

    // polygon.insertPointAndDrawTriangle(p, new Point(p.random(p.width), p.random(p.height)));

    polygon.draw(p);
  };

  p.windowResized = () => {
    initialiseCanvas(p);
  };

  p.draw = () => {
    // p.background(0,200,200);
    // p.ellipse(100, 150, 180, 60);

    // const newPoint = new Point(p.random(p.width), p.random(p.height));

    // polygon.insertPointAndDrawTriangle(p, newPoint);

    if (p.frameCount > -1) {
      p.noLoop();
    }

    // if (p.frameCount % 5 !== 0) {
    //   if (polygon.pointInPolygon(newPoint)) {
    //     console.log("point in polygon");
    //   } else {
    //     polygon.insertPointAndDraw(p, newPoint);
    //   }
    // } else {
    //   polygon.draw(p);
    //   // p.noLoop();
    // }

    // p.noLoop();
  };

  // set functions as global functions
  window.saveCanvas = () => p.saveCanvas("canvas", "png");
  window.windowResized = p.windowResized;
};

function initialiseCanvas(p: p5){
  if (p.frameCount > 0){
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }  
  p.background(0);
  p.stroke(255);
}

const sketchP = new p5(sketch);
