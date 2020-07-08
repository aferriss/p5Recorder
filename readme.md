## p5 Recorder

This is a small wrapper around the [Media Recorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) for easy use with [p5.js](https://p5js.org/). By default the video output format is in the open source / royalty free [webM](https://www.webmproject.org/) using the [vp8](https://en.wikipedia.org/wiki/VP8) compression format, and the [Opus](https://en.wikipedia.org/wiki/Opus_(audio_format)) audio codec. 

There is a small example included in the repo to get you started. 


### Usage

#### Import 
To use the recorder, first move the recorder.js script into your project folder add the recorder script to your index.html file.

```html
<script src="recorder.js"></script>
```

#### Initialize  

Next you will need to initialize an instance of the recorder from within the setup function. By default the only argument you need to provide to the recorder is the `this` keyword, so that the recorder can read properties from this p5.js instance.

```javascript
let recorder;
function setup(){
    createCanvas(500,500);
    recorder = new Recorder(this);
}
```

#### Start

To begin recording, call:

```javascript
recorder.start();
```

#### Stopping & Saving

To finish recording, call

```javascript
recorder.stop();
```


### Options and Defaults

The recorder is setup with some sane defaults to make it easy to begin recording. However, you can override them with a settings object to gain more control.

1. `fps` : The frames per second of video to try and record. Defaults to `60`
2. `filename`: The name to use when saving a file to disk. Defaults to `sketch.webm`
3. `codec`: The audio and video codecs to use. Defaults to `video/webm; codecs=vp8,opus`
4. `videoBitsPerSecond`: The bitrate to use when encoding. Defaults to `2500000`

Additionally you can set the output filename when calling stop, like so `recorder.stop("coolVideo.webm")`


### Support

At the current moment, Safari for iOS and desktop are completely unsupported and unlikely to be in the future. 

Chrome and Firefox have both been tested and seem stable.

Codec support also varies by browser, so you may need to try a few different combinations if you don't want to use webm / vp8 / opus. Personally, I've found that that combination gives me the best results, especially when recording in Firefox. Take a look at the links below for more codec options:  
- https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter 
- https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs

The Media Recorder api is a work in progress and probably isn't the best option if you want to record something extremely accurately. It will often drop frames when rendering gets slow in an attempt to keep things realtime. Hopefully they change this in the future, but for the present moment, this is what we've got. 

Pull requests are welcome if you'd like to make improvements!