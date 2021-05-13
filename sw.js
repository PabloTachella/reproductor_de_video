/** serviceWorker hace de intermediario entre el navegador y un servidor al que se le hace una peticion,
 * nos permite guadar en cache sierta información que será útil si el usuario pierde conexión a internet.
 * 
 * Este SW se instalará en el navegador. (self es como el this del serviceWorker) agregaré un eventListener 
 * que se disparará cuando se instale el Service Worker.
 */

const VERSION = 'v1'

self.addEventListener('install', event => {
    //quisiera que ciertos recursos ya estén disponibles en el caché para usar eventualmente en lugar de ir
    //ir a la red, para esta finalidad crearé un precache
    event.waitUntil(precache()) //espera a que el precache se complete
})

//Qiero que cuando ocurra una petición el SW revise si la tiene en caché
self.addEventListener('fetch', event => {
    //extraigo la petición
    const request = event.request

    //me fijo si la petición es GET
    if (request.method !== 'GET'){
        return
    }

    //buscar en caché si tengo el recurso
    event.respondWith(cacheResponse(request))

    //actualizar el caché para que el navegador no esté cargando un a versión anterior de nuestros archivos
    event.waitUntil(updateCache(request))
})



async function precache() {
    //caches es un elemento de la API del DOM
    const cache = await caches.open(VERSION) //devuelve la promesa de una instancia de un caché, en este caso v1
    return cache.addAll([
        '/',
        '/index.html',
        '/assets/index.js',
        '/assets/plugins/AutoPlay.js',
        '/assets/plugins/AutoPause.js',
        '/assets/index.css',
        '/assets/iFollowRivers.mp4'
    ])
}

async function cacheResponse (request) {
    const cache = await caches.open(VERSION)
    const response = await cache.match(request)

    //si en cache no se encontraba lo que estaba buscando entonces response será undefine, en ese caso con || fetch(request)
    //devuelvo lo que retorne la red ante la petición
    return response || fetch(request)
}

async function updateCache(request) {
    const cache = await caches.open(VERSION)
    const response = await fetch(request)
    return cache.put(request, response)
}