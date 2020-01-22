import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { settings } from '../helpers/settings'

import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import CodeIcon from '@material-ui/icons/Code'
import GetAppIcon from '@material-ui/icons/GetApp'
import AddIcon from '@material-ui/icons/Add'
import Container from '@material-ui/core/Container'

import EmptyState from '../components/EmptyState'
import LaunchScreen from './LaunchScreen'

const styles = theme => ({
  emptyStateIcon: {
    fontSize: theme.spacing(12)
  },
  installButton: {
    display: 'none',
    marginTop: theme.spacing(1)
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1),
    position: 'fixed',
    bottom: 0,
    right: theme.spacing(2)
  }
})

let installPromptEvent

const handleInstallApp = () => {
  installPromptEvent.prompt()
  installPromptEvent.userChoice.then(choice => {
    // Clear the saved prompt since it can't be used again
    installPromptEvent = null
    document.querySelector('#install-app').style.display = 'none'
  })
}

window.addEventListener('beforeinstallprompt', event => {
  document.querySelector('#install-app').style.display = 'inline-flex'
  installPromptEvent = event
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault()
})

class HomeContent extends Component {
  render() {
    // Styling
    const { classes } = this.props

    if (!this.props.isSignedIn) {
      if (this.props.isAuthReady) {
        return <LaunchScreen />
      } else {
        return (
          <EmptyState
            icon={
              <CodeIcon className={classes.emptyStateIcon} color="action" />
            }
            title={settings.title}
            description={settings.description}
            button={
              <Button
                id="install-app"
                className={classes.installButton}
                variant="outlined"
                color="primary"
                onClick={handleInstallApp}
              >
                <GetAppIcon className={classes.buttonIcon} />
                Get App
              </Button>
            }
          />
        )
      }
    }

    return (
      this.props.user && (
        <React.Fragment>
          <Container className={classes.container} maxWidth="md"></Container>

          <Link to="/">
            <Fab className={classes.fab} color="primary" label="Add">
              <AddIcon />
            </Fab>
          </Link>
        </React.Fragment>
      )
    )
  }
}

const mapStateToProps = state => {
  const storeState = state
  return storeState
}

export default connect(mapStateToProps, {})(withStyles(styles)(HomeContent))
