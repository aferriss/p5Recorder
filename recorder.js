class Recorder {
  constructor(p5Inst, settings = {}) {
    // Hold on to the p5 instance
    this.p5 = p5Inst;

    // Some member variables for keeping our streams around
    this.videoStream = null;
    this.mediaRecorder = null;
    this.videoChunks = [];

    // Settings
    this.settings = settings;
    this.fps = settings.fps || 60;
    this.filename = settings.filename || "sketch.webm";
    this.codec = settings.codec || "video/webm; codecs=vp8,opus";
    this.videoBitsPerSecond = settings.videoBitsPerSecond || 2500000;

    // Are we recording or not
    this.recording = false;
  }

  createStreams() {
    // Create an audio stream destination node
    const audioStreamDestinationNode = this.p5
      .getAudioContext()
      .createMediaStreamDestination();

    // Connect p5's sound to the stream destination
    this.p5.soundOut.output.connect(audioStreamDestinationNode);

    // Get the tracks from the stream destination
    const audioTracks = audioStreamDestinationNode.stream.getAudioTracks();

    // Get the capture stream from the p5 canvas
    this.videoStream = this.p5.canvas.captureStream(this.fps);

    // Add the audio to the canvas stream
    this.videoStream.addTrack(audioTracks[0]);
  }

  // Start recording
  start() {
    if (!this.recording) {
      this.createStreams();
      this.setupMediaRecorder();
      this.mediaRecorder.start();
      this.recording = true;
    }
  }

  // Stop recording
  stop(filename) {
    if (this.mediaRecorder) {
      if (this.recording) {
        this.filename = filename || this.filename;
        this.mediaRecorder.stop();
        this.recording = false;
      }
    } else {
      console.log(
        "Media Recorder has not been setup. You may have forgotten to call start"
      );
    }
  }

  setupMediaRecorder() {
    this.videoChunks = [];

    // Creates a media recorder object
    this.mediaRecorder = new MediaRecorder(this.videoStream, {
      mimeType: this.codec,
      videoBitsPerSecond: this.videoBitsPerSecond,
    });

    // When we have data chunks, push them into the array
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        this.videoChunks.push(e.data);
      } else {
        console.log("Data is 0");
      }
    };

    // When we stop, get the data, create a link and prompt the user to save a video
    this.mediaRecorder.onstop = (e) => {
      const blob = URL.createObjectURL(new Blob(this.videoChunks));
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.style = "display: none";
      link.href = blob;
      link.download = this.filename;
      link.click();
      URL.revokeObjectURL(blob);
    };
  }
}
