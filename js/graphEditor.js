class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d");

    this.selected = null;
    this.hovered = null;
    this.dragging = false;

    this.#addEventListeners();
  }

  #addEventListeners() {
    // SELECT
    this.canvas.addEventListener("mousedown", (e) => {
      if (e.button == 2) {
        // MOUSE RIGHT CLICK
        if (this.selected) {
          this.selected = null;
        } else if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }
      if (e.button == 0) {
        // MOUSE LEFT CLICK
        const mouse = new Point(e.offsetX, e.offsetY);
        if (this.hovered) {
          this.#select(this.hovered);
          this.dragging = true;
          return;
        }
        this.graph.addPoint(mouse);
        this.#select(mouse);
        this.hovered = mouse;
      }
    });

    // HOVER
    this.canvas.addEventListener("mousemove", (e) => {
      const mouse = new Point(e.offsetX, e.offsetY);
      this.hovered = getNearestPoint(mouse, this.graph.points);
      if (this.dragging === true) {
        this.selected.x = mouse.x;
        this.selected.y = mouse.y;
      }
    });

    // CONTEXT MENU
    this.canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    this.canvas.addEventListener("mouseup", () => {
      this.dragging = false;
    });
  }
  #select(point) {
    if (this.selected) {
      this.graph.tryToAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected === point) {
      this.selected = null;
    }
  }
  display() {
    this.graph.draw(this.ctx);

    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
