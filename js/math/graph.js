class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
    this.segPoints = [];
  }

  // CHECK EXISTANCE
  alreadyExistPoint(point) {
    return this.points.find((p) => p.equals(point));
  }
  alreadyExistSegment(seg) {
    return this.segments.find((s) => s.equals(seg));
  }

  // TRY TO ADD
  tryToAddPoint(point) {
    if (!this.alreadyExistPoint(point)) {
      this.addPoint(point);
    }
  }

  tryToAddSegment(seg) {
    if (!this.alreadyExistSegment(seg)) {
      this.addSegment(seg);
    }
  }

  // ADD
  addPoint(point) {
    this.points.push(point);
  }
  addSegment(seg) {
    this.segments.push(seg);
  }

  // REMOVE
  removePoint(point) {
    const segs = this.getSegmentByPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }
  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  // TOTAL POINTS AND SEGMENTS
  numberOfPoint() {
    return this.points.length;
  }
  numberOfSegment() {
    return this.segments.length;
  }

  // GET SEGMENT OR POINT
  getSegmentByPoint(point) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  // DRAW
  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
