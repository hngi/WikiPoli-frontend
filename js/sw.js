// if supported
if ('serviceWorker' in navigator) {
  // console.log('Service Worker supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_pages.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Sevice Worker Error: ${err}`))
  })

}
