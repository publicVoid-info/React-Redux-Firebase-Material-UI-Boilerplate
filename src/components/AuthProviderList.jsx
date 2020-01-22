import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { getFirebase } from '../helpers/utils'

import {
  closeSignUpDialog,
  closeSignInDialog,
  openSnackbar
} from '../store/actions'

import { registerUser } from '../helpers/utils'

import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import GoogleIcon from 'mdi-material-ui/Google'

const styles = theme => ({
  dialogActions: {
    justifyContent: 'center',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(1)
  },
  google: {
    backgroundColor: '#4285f4',
    color: '#ffffff'
  },
  icon: {
    marginRight: theme.spacing(0.5)
  }
})

class AuthProviderList extends Component {
  handleProviderClick = () => {
    const f = getFirebase()
    f.auth()
      .signInWithPopup(new f.auth.GoogleAuthProvider())
      .then(r => {
        this.props.closeSignUpDialog(() => {
          if (r.additionalUserInfo.isNewUser) {
            registerUser(r.user)
          }

          this.props.closeSignInDialog(() => {
            this.props.openSnackbar(
              `Signed in as ${r.user.displayName || r.user.email}`
            )
          })
        })
      })
      .catch(r => {
        this.props.openSnackbar(r.message)
      })
  }

  render() {
    // Styling
    const { classes } = this.props

    return (
      <React.Fragment>
        <DialogActions className={classes.dialogActions}>
          <Button
            className={classes.google}
            variant="contained"
            onClick={this.handleProviderClick}
          >
            <GoogleIcon className={classes.icon} />
            Google
          </Button>
        </DialogActions>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const storeState = state
  return storeState
}

export default connect(mapStateToProps, {
  closeSignUpDialog,
  closeSignInDialog,
  openSnackbar
})(withStyles(styles)(AuthProviderList))
