import MediaPlayer from '../MediaPlayer'

class AutoPause {
    private threshold: number
    player: MediaPlayer
    constructor() {
        this.threshold = 0.25
        this.handleIntersection = this.handleIntersection.bind(this)
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    }
    run(player) {
        this.player = player
        const observer = new IntersectionObserver(this.handleIntersection, {
            threshold: this.threshold
        })

        observer.observe(player.media) //indico que elemento será observado

        //visibilitychange es una herramienta del DOM que me permitirá enterarme si se cambia de pestaña y hacer algo en ese momento
        document.addEventListener('visibilitychange', this.handleVisibilityChange)
    }

    private handleIntersection(entries: IntersectionObserverEntry[]) { //recibe una lista de los elementos observados y las observaciones
        const entry = entries[0]
        const isVisible = entry.intersectionRatio >= this.threshold 
        //intersectionRatio es una propiedad con el valor de la observación de que porcentaje del video era 
        //visible cuando se disparó la función

        isVisible ? this.player.play() : this.player.pause()
    }

    private handleVisibilityChange() {
        const isVisible = document.visibilityState === 'visible'

        isVisible ? this.player.play() : this.player.pause()
    }
}

export default AutoPause