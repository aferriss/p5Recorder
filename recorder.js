class Recorder {
  constructor(p5Inst, settings = {}) {
    this.p5 = p5Inst;
    this.canvas = document.getElementById("defaultCanvas0"); // p5Inst.canvas;

    this.settings = settings;

    this.audioStream = null;
    this.videoStream = null;
    this.mediaRecorder = null;

    this.audioChunks = [];
    this.videoChunks = [];

    this.fps = settings.fps || 60;
    this.filename = settings.filename || "sketch.webm";

    this.recording = false;
  }

  createStreams() {
    this.videoStream = this.canvas.captureStream(this.fps);
  }

  start() {
    console.log("recording");
    this.createStreams();
    this.setupMediaRecorder();
    this.mediaRecorder.start();
    console.log(this.mediaRecorder);

    this.recording = true;
  }

  stop() {
    console.log("stopping");
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.recording = false;
    } else {
      console.log(
        "Media Recorder has not been setup. You may have forgotten to call start"
      );
    }
  }

  setupMediaRecorder() {
    this.audioChunks = [];
    this.videoChunks = [];

    this.mediaRecorder = new MediaRecorder(this.videoStream, {
      mimeType: "video/webm; codecs=vp8",
      videoBitsPerSecond: 2500000,
    });

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        console.log("pushing");
        this.videoChunks.push(e.data);
      } else {
        console.log("Data is 0");
      }
    };

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
