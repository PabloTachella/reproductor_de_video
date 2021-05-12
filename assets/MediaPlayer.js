class MediaPlayer{
    constructor(configObj){
      this.media = configObj.element
      this.plugins = configObj.plugins || []

      this._initPlugins()
    }

    _initPlugins(){
      const player = {
        media : this.media,
        play: () => this.play(),
        pause: () => this.pause(),
        get muted(){
          return this.media.muted
        },
        set muted(value){
          this.media.muted = value
        }
      }
      this.plugins.forEach(plugin => {
        plugin.run(player)
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