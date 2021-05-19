class MediaPlayer{
    //Cuando tengo una etiqueta <video> en HTML el elemento 
    //representa un HTMLVideoElement que hereda de HTMLMediaElement
    media: HTMLMediaElement 
    plugins: Array<any>

    constructor(configObj){
      this.media = configObj.element
      this.plugins = configObj.plugins || []

      this.initPlugins()
    }

    private initPlugins(){
      this.plugins.forEach(plugin => {
        plugin.run(this)
      });
    }
    
    play(){
      this.media.play()
    }

    pause(){
      this.media.pause()
    }

    mute(){
      this.media.muted = true
    }

    unmute(){
      this.media.muted = false
    }

    togglePlay(){
      this.media.paused ? this.play() : this.pause()
    }

    toggleMute(){
      this.media.muted ? this.unmute() : this.mute()
    }
}

export default MediaPlayer