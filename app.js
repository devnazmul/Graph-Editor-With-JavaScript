myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const ctx = myCanvas.getContext("2d");

const graph = new Graph([], []);

const graphEditor = new GraphEditor(myCanvas, graph);

const animate = () => {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graphEditor.display();
  requestAnimationFrame(animate);
};

animate();
