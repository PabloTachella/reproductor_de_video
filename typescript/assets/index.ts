import MediaPlayer from './MediaPlayer'
import AutoPlay from './plugins/AutoPlay'
import AutoPause from './plugins/AutoPause'
import Ads from './plugins/ads'

const video = document.querySelector('video')
const btn_play: HTMLElement = document.querySelector('#play')
const btn_mute: HTMLElement = document.querySelector('#mute')

const player = new MediaPlayer( { element: video, plugins: [new AutoPlay(), new AutoPause(), new Ads()] } )
btn_play.onclick = () => player.togglePlay()
btn_mute.onclick = () => player.toggleMute()

/** 
if ('serviceWorker' in navigator) { //reviso si el navegador en el que estoy soporta serviceWorker
    navigator.serviceWorker.register('/sw.js').catch(error => console.error(error.message)) //indico que archivo usaré
}
*/