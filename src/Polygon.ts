import p5 from "p5";
import { Point } from "./Point";
import { distancePointToLineSegment, drawTriangleOnCanvas } from "./helper";

export class Polygon {
  // points define the polygon clockwise or counter-clockwise, meaning the first point creates a line segment to
  // the second point, then the second point creates a line segment to the third point, and so on, until
  // the last point connects to the first point
  private points: Point[];

  constructor(points: Point[]) {
    this.points = points;
  }

  private pointInPolygon(point: Point): boolean {
    let inside = false;
    for (
      let i = 0, j = this.points.length - 1;
      i < this.points.length;
      j = i++
    ) {
      if (
        this.points[i].y > point.y != this.points[j].y > point.y &&
        point.x <
          ((this.points[j].x - this.points[i].x) *
            (point.y - this.points[i].y)) /
            (this.points[j].y - this.points[i].y) +
            this.points[i].x
      ) {
        inside = !inside;
      }
    }
    return inside;
  }

  private addPointAt(point: Point, index: number): void {
    this.points.splice(index, 0, point);
  }

  private deletePointAt(index: number): void {
    this.points.splice(index, 1);
  }

  private getIndexClosestLineSegment(p: Point): number {
    let closestIndex = 0;
    let closestDistance = Infinity;
    for (let i = 0; i < this.points.length; i++) {
      const dist = distancePointToLineSegment(
        p,
        this.points[i],
        this.points[i + 1 < this.points.length ? i + 1 : 0]
      );
      // console.log(
      //   "Distance from " +
      //     "(" +
      //     p.x +
      //     ", " +
      //     p.y +
      //     ")" +
      //     " to line starting at " +
      //     "(" +
      //     this.points[i].x +
      //     ", " +
      //     this.points[i].y +
      //     ")" +
      //     " and ending at " +
      //     "(" +
      //     this.points[i + 1 < this.points.length ? i + 1 : 0].x +
      //     ", " +
      //     this.points[i + 1 < this.points.length ? i + 1 : 0].y +
      //     ")" +
      //     dist,
      //   closestDistance
      // );
      if (dist < closestDistance) {
        closestDistance = dist;
        closestIndex = i;
      }
    }
    // console.log("so closest index is " + closestIndex);
    return closestIndex;
  }

  addPoint(p: p5, point: Point): void {
    if (this.pointInPolygon(point)) {
      // this.insertInnerPoint(p, point);
    } else {
      this.insertOuterPoint(p, point);
    }
  }

  /*
    Currently places a dot signifying a point inside the polygon.
  */
  private insertInnerPoint(p: p5, point: Point): void {
    p.push();
    p.strokeWeight(10);
    p.point(point.x, point.y);
    p.pop();
  }

  /*
    Inserts a point in the polygon data structure and draws a triangle for the newly added point.
    doesn't draw if less than 3 points after insertion
  */
  private insertOuterPoint(p: p5, point: Point): void {
    // find line segment that is closest to point
    // insert point between the points of that line segment
    const index = this.getIndexClosestLineSegment(point) + 1;

    this.addPointAt(point, index);

    if (this.points.length > 2) {
      p.fill(p.random(255), p.random(255), p.random(255));
      drawTriangleOnCanvas(
        p,
        this.points[index - 1 < 0 ? this.points.length - 1 : index - 1],
        this.points[index],
        this.points[index + 1 < this.points.length ? index + 1 : 0]
      );
    }
  }

  draw(p: p5): void {
    p.push();
    p.noFill();
    p.stroke(200, 0, 0);
    p.strokeWeight(4);
    p.beginShape();
    this.points.forEach((point) => p.vertex(point.x, point.y));
    p.endShape(p.CLOSE);
    p.pop();
  }
}
