import p5 from "p5";
import { Point } from "./point";

// export function distanceBetweenPoints(p1: Point, p2: Point): number {
//   return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
// }

export function distancePointToLineSegment(
  p: Point,
  // line segment defined by next two points
  p1: Point,
  p2: Point
): number {
  const A = p.x - p1.x;
  const B = p.y - p1.y;
  const C = p2.x - p1.x;
  const D = p2.y - p1.y;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;
  if (len_sq != 0) {
    // in case of 0 length line
    param = dot / len_sq;
  }

  let xx, yy;

  if (param < 0) {
    xx = p1.x;
    yy = p1.y;
  } else if (param > 1) {
    xx = p2.x;
    yy = p2.y;
  } else {
    xx = p1.x + param * C;
    yy = p1.y + param * D;
  }

  const dx = p.x - xx;
  const dy = p.y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

export function drawTriangleOnCanvas(p: p5, p1: Point, p2: Point, p3: Point): void {
  p.beginShape();
  p.vertex(p1.x, p1.y);
  p.vertex(p2.x, p2.y);
  p.vertex(p3.x, p3.y);
  p.endShape(p.CLOSE);
}