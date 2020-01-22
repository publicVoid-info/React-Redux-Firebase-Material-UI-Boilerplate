/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js')

firebase.initializeApp({ messagingSenderId: '' })

const messaging = firebase.messaging()

messaging
  .getToken()
  .then(currentToken => {})
  .catch(err => {
    console.log(err)
  })

messaging.setBackgroundMessageHandler(payload => {
  const title = payload.title
  const options = {
    body: payload.data.status
  }

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(title, options)
})
