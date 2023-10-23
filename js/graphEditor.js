class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d");

    this.selected = null;
    this.hovered = null;
    this.dragging = false;

    this.mouse = null;

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

        if (this.hovered) {
          this.#select(this.hovered);
          this.dragging = true;
          return;
        }
        this.graph.addPoint(this.mouse);
        this.#select(this.mouse);
        this.hovered = this.mouse;
      }
    });

    // HOVER
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse = new Point(e.offsetX, e.offsetY);

      this.hovered = getNearestPoint(this.mouse, this.graph.points);
      if (this.dragging === true) {
        this.selected.x = this.mouse.x;
        this.selected.y = this.mouse.y;
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
      if (this.hovered) {
        new Segment(this.selected, this.hovered).draw(ctx);
      } else {
        new Segment(this.selected, this.mouse).draw(ctx, { dash: [5, 5] });
      }

      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
