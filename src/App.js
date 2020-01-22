import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { getFirebase } from './helpers/utils'

import {
  setUser,
  setAuthReady,
  setSignedIn,
  updateTheme,
  closeSnackbar
} from './store/actions'

import Snackbar from '@material-ui/core/Snackbar'

import HomeContent from './layout/HomeContent'
import NotFoundContent from './layout/NotFoundContent'
import AppToolbar from './layout/AppToolbar'

class App extends Component {
  constructor(props) {
    super(props)

    this._isMounted = false
    this.firebase = getFirebase()
  }

  componentDidMount() {
    this._isMounted = true

    this.props.updateTheme(JSON.parse(localStorage.getItem('theme')))

    const self = this

    this.removeAuthObserver = self.firebase.auth().onAuthStateChanged(user => {
      if (self._isMounted) {
        self.props.setUser(user)
        self.props.setAuthReady(!!user)
        self.props.setSignedIn(!!user)
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
    this.removeAuthObserver()
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={this.props.theme}>
          <main>
            <div
              style={{
                minHeight: '100vh',
                backgroundColor: this.props.theme.palette.background.default
              }}
            >
              <AppToolbar />
              <Switch>
                <Route exact path="/" component={HomeContent} />
                <Route component={NotFoundContent} />
              </Switch>
              <Snackbar
                autoHideDuration={this.props.snackbar.autoHideDuration}
                message={this.props.snackbar.message}
                open={this.props.snackbar.open}
                onClose={this.props.closeSnackbar}
              />
            </div>
          </main>
        </MuiThemeProvider>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  const storeState = state
  return storeState
}

export default connect(mapStateToProps, {
  setUser,
  setAuthReady,
  setSignedIn,
  updateTheme,
  closeSnackbar
})(App)
