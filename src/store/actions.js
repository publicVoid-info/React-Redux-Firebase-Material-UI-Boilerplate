import readingTime from 'reading-time'
import { settings, colors } from '../helpers/settings'
import { createMuiTheme } from '@material-ui/core/styles'
import { execCallback } from '../helpers/utils'

export const actionTypes = {
  UPDATE_THEME: 'UPDATE_THEME',
  SET_SEARCHINPUT: 'SET_SEARCHINPUT',
  SET_USER: 'SET_USER',
  SET_AUTHREADY: 'SET_AUTHREADY',
  SET_VERIFYEMAIL: 'SET_VERIFYEMAIL',
  SET_SIGNEDIN: 'SET_SIGNEDIN',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  SETTINGS_OPEN: 'SETTINGS_OPEN',
  SETTINGS_CLOSE: 'SETTINGS_CLOSE',
  SIGNIN_OPEN: 'SIGNIN_OPEN',
  SIGNIN_CLOSE: 'SIGNIN_CLOSE',
  SIGNUP_OPEN: 'SIGNUP_OPEN',
  SIGNUP_CLOSE: 'SIGNUP_CLOSE',
  SNACKBAR_OPEN: 'SNACKBAR_OPEN',
  SNACKBAR_CLOSE: 'SNACKBAR_CLOSE',
  WELCOME_OPEN: 'WELCOME_OPEN',
  WELCOME_CLOSE: 'WELCOME_CLOSE',
  RESETPASSWORD_OPEN: 'RESETPASSWORD_OPEN',
  RESETPASSWORD_CLOSE: 'RESETPASSWORD_CLOSE'
}

export const setSearchInput = input => {
  return {
    type: actionTypes.SET_SEARCHINPUT,
    payload: input
  }
}

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: user
  }
}

export const setAuthReady = value => {
  return {
    type: actionTypes.SET_AUTHREADY,
    payload: value
  }
}

export const setVerifyEmail = value => {
  return {
    type: actionTypes.SET_VERIFYEMAIL,
    payload: value
  }
}

export const setSignedIn = value => {
  return {
    type: actionTypes.SET_SIGNEDIN,
    payload: value
  }
}

export const toggleDrawer = open => {
  return {
    type: actionTypes.TOGGLE_DRAWER,
    payload: open
  }
}

export const openSignInDialog = () => {
  return {
    type: actionTypes.SIGNIN_OPEN,
    payload: true
  }
}

export const closeSignInDialog = callback => {
  execCallback(callback)

  return {
    type: actionTypes.SIGNIN_CLOSE,
    payload: false
  }
}

export const openSignUpDialog = () => {
  return {
    type: actionTypes.SIGNUP_OPEN,
    payload: true
  }
}

export const closeSignUpDialog = callback => {
  execCallback(callback)

  return {
    type: actionTypes.SIGNUP_CLOSE,
    payload: false
  }
}

export const openSettingsDialog = () => {
  return {
    type: actionTypes.SETTINGS_OPEN,
    payload: true
  }
}

export const closeSettingsDialog = callback => {
  execCallback(callback)

  return {
    type: actionTypes.SETTINGS_CLOSE,
    payload: false
  }
}

export const openWelcomeDialog = () => {
  return {
    type: actionTypes.WELCOME_OPEN,
    payload: true
  }
}

export const closeWelcomeDialog = callback => {
  execCallback(callback)

  return {
    type: actionTypes.WELCOME_CLOSE,
    payload: false
  }
}

export const openResetPasswordDialog = () => {
  return {
    type: actionTypes.RESETPASSWORD_OPEN,
    payload: true
  }
}

export const closeResetPasswordDialog = callback => {
  execCallback(callback)

  return {
    type: actionTypes.RESETPASSWORD_CLOSE,
    payload: false
  }
}

export const openSnackbar = message => {
  const snack = {
    autoHideDuration: readingTime(message).time * 2,
    message: message,
    open: true
  }

  return {
    type: actionTypes.SNACKBAR_OPEN,
    payload: snack
  }
}

export const closeSnackbar = () => {
  const snack = {
    autoHideDuration: 0,
    message: '',
    open: false
  }

  return {
    type: actionTypes.SNACKBAR_CLOSE,
    payload: snack
  }
}

export const updateTheme = (palette, removeLocalStorage) => {
  if (!palette) {
    palette = {
      primaryColor: settings.theme.primaryColor.name,
      secondaryColor: settings.theme.secondaryColor.name,
      type: settings.theme.type
    }
  }

  if (!palette.primaryColor) {
    palette.primaryColor = settings.theme.primaryColor.name
  }

  if (!palette.secondaryColor) {
    palette.secondaryColor = settings.theme.secondaryColor.name
  }

  if (!palette.type) {
    palette.type = settings.theme.type
  }

  const theme = createMuiTheme({
    palette: {
      primary: colors.find(color => color.id === palette.primaryColor).import,
      secondary: colors.find(color => color.id === palette.secondaryColor)
        .import,
      type: palette.type
    }
  })

  if (removeLocalStorage) {
    localStorage.removeItem('theme')
  } else {
    localStorage.setItem(
      'theme',
      JSON.stringify({
        primaryColor: palette.primaryColor,
        secondaryColor: palette.secondaryColor,
        type: palette.type
      })
    )
  }

  return {
    type: actionTypes.UPDATE_THEME,
    payload: { palette, theme }
  }
}
