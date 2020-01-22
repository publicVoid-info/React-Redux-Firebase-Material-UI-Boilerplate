import React, { Component } from 'react'
import { connect } from 'react-redux'

import { closeResetPasswordDialog, openSnackbar } from '../store/actions'

import validate from 'validate.js'
import constraints from '../helpers/constraints'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { getFirebase } from '../helpers/utils'

const initialState = {
  emailAddress: '',

  errors: null
}

class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.state = initialState
  }

  resetPassword = () => {
    const { emailAddress } = this.state

    const errors = validate(
      {
        emailAddress: emailAddress
      },
      {
        emailAddress: constraints.emailAddress
      }
    )

    if (errors) {
      this.setState({ errors })
    } else {
      this.setState(
        {
          errors: null
        },
        () => {
          this.props
            .closeResetPasswordDialog(() => {
              getFirebase()
                .auth()
                .sendPasswordResetEmail(emailAddress)
                .then(() => {
                  this.props.openSnackbar(
                    `Password reset e-mail sent to ${emailAddress}`
                  )
                })
            })
            .catch(reason => {
              this.props.openSnackbar(reason.message)
            })
        }
      )
    }
  }

  handleExited = () => {
    this.setState(initialState)
  }

  handleKeyPress = event => {
    const key = event.key

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return
    }

    if (key === 'Enter') {
      event.preventDefault()

      this.resetPassword()
    }
  }

  handleEmailAddressChange = event => {
    const emailAddress = event.target.value

    this.setState({ emailAddress })
  }

  handleResetPasswordClick = () => {
    this.resetPassword()
  }

  render() {
    const { emailAddress, errors } = this.state

    return (
      <Dialog
        open={this.props.resetPasswordDialog.open}
        onClose={this.props.closeResetPasswordDialog}
        onExited={this.handleExited}
        onKeyPress={this.handleKeyPress}
      >
        <DialogTitle>Reset your password</DialogTitle>

        <DialogContent>
          <DialogContentText>
            An e-mail will be sent to your e-mail address containing
            instructions on how to reset your password.
          </DialogContentText>

          <form>
            <TextField
              autoComplete="email"
              autoFocus
              error={!!(errors && errors.emailAddress)}
              fullWidth
              helperText={
                errors && errors.emailAddress ? errors.emailAddress[0] : ''
              }
              margin="normal"
              onChange={this.handleEmailAddressChange}
              placeholder="E-mail address"
              required
              type="email"
              value={emailAddress}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={this.props.closeResetPasswordDialog}>
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={!emailAddress}
            variant="contained"
            onClick={this.handleResetPasswordClick}
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = state => {
  const storeState = state
  return storeState
}

export default connect(mapStateToProps, {
  closeResetPasswordDialog,
  openSnackbar
})(ResetPassword)
