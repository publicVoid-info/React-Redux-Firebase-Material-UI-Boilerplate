import React, { Component } from 'react'
import { connect } from 'react-redux'

import { closeWelcomeDialog } from '../store/actions'

import { settings } from '../helpers/settings'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

import Button from '@material-ui/core/Button'

class Welcome extends Component {
  handleKeyPress = event => {
    const key = event.key

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return
    }

    if (key === 'Enter') {
      this.handleVerifyClick()
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.welcomeDialog.open}
        onClose={this.props.closeWelcomeDialog}
        onKeyPress={this.handleKeyPress}
      >
        <DialogTitle>Welcome to {settings.title}!</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Complete your account by verifying your e-mail address. An e-mail
            has been sent to your e-mail address containing instructions on how
            to verify your e-mail address.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={this.props.closeWelcomeDialog}
          >
            Ok
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
  closeWelcomeDialog
})(Welcome)
