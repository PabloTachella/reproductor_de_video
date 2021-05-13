/** En este módulo se dará lógica a la clase AutoPause, la cual nos permitirá pausar el video
automaticamente cuando se scrolee la página y el video ya no ocupe una parte considerable del
sector visible de la página */
class AutoPause {
    constructor() {
        this.threshold = 0.25
        this.handleIntersection = this.handleIntersection.bind(this)
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    }
    run(player) {
        this.player = player
        /** IntersectionObserver es una clase o herramienta ya existente en el DOM que nos va a 
         * permitir observar elementos y si estos elementos cruzan cierto humbral dentro de un
         * contenedor poder realizar alguna tarea. 
         * Rerecibe 2 argumentos
         * El primero es una función que escribiremos y que es notificada cada vez que el video
         * atraviesa el punto de ruptura de visibilidad en la pantalla,
         * y el segundo es un elemento de configuración, un humbral con el cual le estamos diciendo que el
         * punto de ruptura en el que se disparará la función será cuando el objeto llegue a un
         * 25% de visibilidad en la página
         */
        const observer = new IntersectionObserver(this.handleIntersection, {
            threshold: this.threshold
        })

        observer.observe(player.media) //indico que elemento será observado

        //visibilitychange es una herramienta del DOM que me permitirá enterarme si se cambia de pestaña y hacer algo en ese momento
        document.addEventListener('visibilitychange', this.handleVisibilityChange)
    }

    handleIntersection(entries) { //recibe una lista de los elementos observados y las observaciones
        const entry = entries[0]
        const isVisible = entry.intersectionRatio >= this.threshold 
        //intersectionRatio es una propiedad con el valor de la observación de que porcentaje del video era 
        //visible cuando se disparó la función

        isVisible ? this.player.play() : this.player.pause()
    }

    handleVisibilityChange() {
        const isVisible = document.visibilityState === 'visible'

        isVisible ? this.player.play() : this.player.pause()
    }
}

export default AutoPause