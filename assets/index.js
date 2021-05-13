import MediaPlayer from './MediaPlayer.js'
import AutoPlay from './plugins/AutoPlay.js'
import AutoPause from './plugins/AutoPause.js'

const video = document.querySelector('video')
const btn_play = document.querySelector('#play')
const btn_mute = document.querySelector('#mute')

const player = new MediaPlayer( { element: video, plugins: [new AutoPlay(), new AutoPause()] } )
btn_play.onclick = () => player.togglePlay()
btn_mute.onclick = () => player.toggleMute()

if ('serviceWorker' in navigator) { //reviso si el navegador en el que estoy soporta serviceWorker
    navigator.serviceWorker.register('/sw.js').catch(error => console.error(error.message)) //indico que archivo usaré
}