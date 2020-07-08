let recorder;
let osc;
let recordButton;

function setup() {
  createCanvas(500, 500);

  // Create a new recorder
  // The recorder will record whatever is in p5's default canvas and audio output
  // This means that to change the size of your recording, you'll need to change the size of your canvas.
  // By default it will record at 60fps and use the webm / vp6 video codec, and the opus audio codec.
  // The default output filename is sketch.webm

  // Initialize the recorder with the this keyword, which is a reference to the p5 instance itself.
  recorder = new Recorder(this);

  // we could initialize the recorder with some custom options ex:
  // recorder = new Recorder(this, {fps: 15, filename: "coolsketch.webm"})

  // Create an oscillator to test sound recording
  osc = new p5.Oscillator("sine");

  // create a button for starting / stopping recordings
  recordButton = createButton("Start Recording");
  recordButton.position(5, height + 5);
  recordButton.mousePressed(onRecordButtonPressed);

  fill(255, 0, 0);
  noStroke();
}

function draw() {
  background(200);

  // an ellipse moving back and forth
  let x = (sin(frameCount * 0.05) * width) / 2 + width / 2;
  ellipse(x, height / 2, 100, 100);
}

function mousePressed() {
  // play a sound on mouse press
  osc.start();
}

function onRecordButtonPressed() {
  // If we're not recording, start recording, otherwise stop recording.
  // Swap out the labels on the button too
  if (!recorder.recording) {
    recorder.start();
    recordButton.elt.innerHTML = "Stop Recording";
  } else {
    // You can also optionally provide a sketch name upon calling stop
    recorder.stop("amazingSketch.webm");
    recordButton.elt.innerHTML = "Start Recording";
  }
}
