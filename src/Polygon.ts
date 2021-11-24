import p5 from "p5";
import { Point } from "./Point";
import { distancePointToLineSegment} from "./helper";

export class Polygon {
  // points define the polygon clockwise or counter-clockwise, meaning the first point creates a line segment to
  // the second point, then the second point creates a line segment to the third point, and so on, until
  // the last point connects to the first point
  points: Point[];

  constructor(points: Point[]) {
    this.points = points;
  }

  pointInPolygon(point: Point): boolean {
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

  // private addPointAt(point: Point, index: number): void {
  addPointAt(point: Point, index: number): void {
    this.points.splice(index, 0, point);
  }

  private deletePointAt(index: number): void {
    this.points.splice(index, 1);
  }

  private getIndexClosestLineSegment(p: Point): number {
    let closestIndex = 0;
    let closestDistance = Infinity;
    for (let i = 0; i < this.points.length - 1; i++) {
      const dist = distancePointToLineSegment(
        p,
        this.points[i],
        this.points[i + 1 < this.points.length ? i + 1 : 0]
      );
      if (dist < closestDistance) {
        closestDistance = dist;
        closestIndex = i;
      }
    }
    return closestIndex;
  }

  // doesn't draw if less than 3 points after insertion
  insertPointAndDraw(p: p5, point: Point) {
    // find line segment that is closest to point
    // insert point between the points of that line segment
    const index = this.getIndexClosestLineSegment(point);
    this.addPointAt(point, index);
    this.drawTriangle(
      p,
      this.points[index - 1 < 0 ? this.points.length - 1 : index - 1],
      this.points[index],
      this.points[index + 1 < this.points.length ? index + 1 : 0]
    );
  }

  drawPolygon(p: p5) {
    p.beginShape();
    this.points.forEach((point) => p.vertex(point.x, point.y));
    p.endShape(p.CLOSE);
  }

  drawTriangle(p: p5, p1: Point, p2: Point, p3: Point) {
    p.beginShape();
    p.vertex(p1.x, p1.y);
    p.vertex(p2.x, p2.y);
    p.vertex(p3.x, p3.y);
    p.endShape(p.CLOSE);
  }
}


