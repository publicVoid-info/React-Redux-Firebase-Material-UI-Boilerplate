import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { closeSettingsDialog } from '../store/actions'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import AccountTab from './AccountTab'
import AppearanceTab from './AppearanceTab'

const styles = theme => ({
  tabs: {
    marginBottom: theme.spacing(1)
  },
  dialog: {
    '& .MuiDialog-paper': {
      margin: '24px'
    }
  }
})

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 0
    }
  }

  handleKeyPress = event => {
    const key = event.key

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return
    }

    if (key === 'Enter') {
      this.props.closeSettingsDialog()
    }
  }

  changeTab = (event, value) => {
    this.setState({
      selectedTab: value
    })
  }

  changeIndex = index => {
    this.setState({
      selectedTab: index
    })
  }

  render() {
    const { selectedTab } = this.state

    return (
      <Dialog
        open={this.props.settingsDialog.open}
        onClose={this.props.closeSettingsDialog}
        onKeyPress={this.handleKeyPress}
      >
        <DialogTitle>Settings</DialogTitle>

        <Tabs
          indicatorColor="primary"
          textColor="primary"
          onChange={this.changeTab}
          value={selectedTab}
          variant="fullWidth"
        >
          <Tab label="Account" />
          <Tab label="Appearance" />
        </Tabs>

        <DialogContent>
          {selectedTab === 0 && <AccountTab />}

          {selectedTab === 1 && <AppearanceTab />}
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = state => {
  const storeState = state
  return storeState
}

export default connect(mapStateToProps, {
  closeSettingsDialog
})(withStyles(styles)(Settings))
