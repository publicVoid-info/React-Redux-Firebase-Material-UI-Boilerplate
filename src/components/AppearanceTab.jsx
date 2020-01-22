import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateTheme, openSnackbar } from '../store/actions'

import { settings, colors } from '../helpers/settings'

import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

const types = ['dark', 'light']

class AppearanceTab extends Component {
  constructor(props) {
    super(props)

    this.palette = this.props.palette

    this.colors = colors
  }

  handleResetClick = () => {
    setTimeout(this.resetTheme(), 137.5)
  }

  resetTheme = () => {
    this.props.updateTheme(
      {
        primaryColor: settings.theme.primaryColor.name,
        secondaryColor: settings.theme.secondaryColor.name,
        type: settings.theme.type
      },
      true
    )

    this.props.openSnackbar('Settings reset')
  }

  changePrimaryColor = event => {
    this.palette.primaryColor = event.target.value
    this.props.updateTheme(this.palette)
  }

  changeSecondaryColor = event => {
    this.palette.secondaryColor = event.target.value
    this.props.updateTheme(this.palette)
  }

  changeType = event => {
    this.palette.type = event.target.value
    this.props.updateTheme(this.palette)
  }

  render() {
    // Properties
    const primaryColor = this.props.palette.primaryColor
    const secondaryColor = this.props.palette.secondaryColor
    const type = this.props.theme.palette.type

    return (
      <React.Fragment>
        <DialogContentText>
          The app's primary and secondary colors, and their variants, help
          create a color theme that is harmonious, ensures accessible text, and
          distinguishes UI elements and surfaces from one another.
        </DialogContentText>

        <FormControl fullWidth margin="normal">
          <InputLabel>Primary color</InputLabel>

          <Select onChange={this.changePrimaryColor} value={primaryColor}>
            {colors.map(color => {
              return (
                <MenuItem key={color.id} value={color.id}>
                  {color.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Secondary color</InputLabel>

          <Select onChange={this.changeSecondaryColor} value={secondaryColor}>
            {colors.map(color => {
              return (
                <MenuItem key={color.id} value={color.id}>
                  {color.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>

          <Select onChange={this.changeType} value={type}>
            {types.map((type, index) => {
              return (
                <MenuItem key={index} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleResetClick}
          >
            Reset
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
  updateTheme,
  openSnackbar
})(AppearanceTab)
