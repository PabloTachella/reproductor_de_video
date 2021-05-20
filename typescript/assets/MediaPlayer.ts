class MediaPlayer{
    //Cuando tengo una etiqueta <video> en HTML el elemento 
    //representa un HTMLVideoElement que hereda de HTMLMediaElement
    media: HTMLMediaElement 
    plugins: Array<any>
    container: HTMLElement

    constructor(configObj){
      this.media = configObj.element
      this.plugins = configObj.plugins || []

      this.initPlayer()
      this.initPlugins()
    }

    initPlayer() {
      //Creo un contenedor para introducir los anuncios
      this.container = document.createElement('div')
      this.container.style.position = 'relative'

      //Hacemos al contenedor pariente del media y luego introducimos el media en el contenedor
      this.media.parentNode.insertBefore(this.container, this.media)
      this.container.appendChild(this.media)
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