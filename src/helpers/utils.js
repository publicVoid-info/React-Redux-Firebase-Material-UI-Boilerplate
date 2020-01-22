import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/performance'
import { settings } from './settings'

// Initialize Firebase
firebase.initializeApp(settings.credentials.firebase)
firebase.auth().useDeviceLanguage()

// eslint-disable-next-line no-unused-vars
const performance = firebase.performance()
performance.dataCollectionEnabled = true
performance.instrumentationEnabled = true

export function getFirestore() {
  return firebase.firestore()
}

export function getFirebase() {
  return firebase
}

export const registerUser = user => {
  if (!user) return

  getFirestore()
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      uid: user.uid
    })
    .catch(reason => console.log(reason.message))
}

export const execCallback = callback => {
  if (callback && typeof callback === 'function') {
    callback()
  }
}
