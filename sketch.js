let recorder;
function setup() {
  const canvas = createCanvas(500, 500);

  console.log(canvas);
  recorder = new Recorder(canvas);
}

function draw() {
  background(200);

  fill(255, 0, 0);
  noStroke();
  ellipse(
    (sin(frameCount * 0.05) * width) / 2 + width / 2,
    height / 2,
    100,
    100
  );
}

function mousePressed() {
  if (!recorder.recording) {
    recorder.start();
  } else {
    recorder.stop();
  }
}
