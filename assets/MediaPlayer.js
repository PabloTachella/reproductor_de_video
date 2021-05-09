class MediaPlayer{
    constructor(configObj){
      this.media = configObj.element
    }
    
    playPause(){
      this.media.paused ? this.media.play() : this.media.pause()
    }
}

export default MediaPlayer