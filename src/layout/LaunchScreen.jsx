import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  circularProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
})

class LaunchScreen extends Component {
  render() {
    // Styling
    const { classes } = this.props

    return <CircularProgress className={classes.circularProgress} />
  }
}

export default withStyles(styles)(LaunchScreen)
