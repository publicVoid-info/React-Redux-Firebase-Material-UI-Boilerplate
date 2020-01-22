import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fade, withStyles } from '@material-ui/core/styles'
import { getFirebase } from '../helpers/utils'
import { settings } from '../helpers/settings'

import {
  setSearchInput,
  toggleDrawer,
  openSignInDialog,
  openSignUpDialog,
  openSettingsDialog,
  openSnackbar
} from '../store/actions'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import Popover from '@material-ui/core/Popover'
import MenuIcon from '@material-ui/icons/Menu'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import PersonIcon from '@material-ui/icons/Person'

import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import DefaultDialog from '../components/DefaultDialog'
import Settings from '../components/Settings'
import Welcome from '../components/Welcome'
import DrawerMenu from './DrawerMenu'

const styles = theme => ({
  titulo: {
    flexGrow: '1',
    marginRight: theme.spacing(2)
  },
  signButton: {
    marginRight: theme.spacing(1)
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  search: {
    flexGrow: '1',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '50%'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
})

class AppToolbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      signOutDialog: {
        open: false
      },
      menu: {
        anchorEl: null
      }
    }
  }

  openMenu = event => {
    const anchorEl = event.currentTarget

    this.setState({
      menu: {
        anchorEl
      }
    })
  }

  closeMenu = () => {
    this.setState({
      menu: {
        anchorEl: null
      }
    })
  }

  handleSettingsClick = () => {
    this.closeMenu()
    this.props.openSettingsDialog()
  }

  handleSignOutClick = () => {
    this.closeMenu()

    if (this.props.drawer.open) {
      this.props.toggleDrawer(!this.props.drawer.open)
    }

    this.openSignOutDialog()
  }

  signOutDialogClick = () => {
    this.closeSignOutDialog(() => {
      getFirebase()
        .auth()
        .signOut()
        .then(() => {
          this.props.openSnackbar('Signed out')
        })
        .catch(reason => {
          this.props.openSnackbar(reason.message)
        })
    })
  }

  openSignOutDialog() {
    this.setState({
      signOutDialog: {
        open: true
      }
    })
  }

  closeSignOutDialog = callback => {
    this.setState(
      {
        signOutDialog: {
          open: false
        }
      },
      () => {
        if (callback && typeof callback === 'function') callback()
      }
    )
  }

  handleToggleDrawer = () => {
    if (this.props.isSignedIn) {
      this.props.toggleDrawer(!this.props.drawer.open)
    }
  }

  handleSignInClick = () => {
    this.props.openSignInDialog(true)
  }

  handleSignUpClick = () => {
    this.props.openSignUpDialog(true)
  }

  handleSearchInput = e => {
    this.props.setSearchInput(e.target.value)
  }

  render() {
    // Styling
    const { classes } = this.props
    const { menu } = this.state

    return (
      <AppBar color="primary" position="sticky">
        <DrawerMenu open={this.props.drawer.open} />
        <Toolbar variant="regular">
          <IconButton
            className={classes.menuButton}
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.titulo} color="inherit" variant="h5">
            {settings.title}
          </Typography>

          {this.props.isSignedIn && (
            <React.Fragment>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onInput={this.handleSearchInput}
                />
              </div>
              <IconButton color="inherit" onClick={this.openMenu}>
                {this.props.user && this.props.user.photoURL ? (
                  <Avatar alt="Avatar" src={this.props.user.photoURL} />
                ) : (
                  <PersonIcon />
                )}
              </IconButton>

              <Popover
                anchorEl={menu.anchorEl}
                open={Boolean(menu.anchorEl)}
                onClose={this.closeMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <MenuItem onClick={this.handleSettingsClick}>Settings</MenuItem>
                <MenuItem onClick={this.handleSignOutClick}>Sign out</MenuItem>
              </Popover>
            </React.Fragment>
          )}

          {!this.props.isSignedIn && (
            <React.Fragment>
              <Button
                className={classes.signButton}
                color="primary"
                variant="contained"
                onClick={this.handleSignUpClick}
              >
                Sign Up
              </Button>
              <Button
                className={classes.signButton}
                color="secondary"
                variant="contained"
                onClick={this.handleSignInClick}
              >
                Sign In
              </Button>

              {!this.props.isSignedIn && (
                <React.Fragment>
                  <SignUp />
                  <SignIn />
                </React.Fragment>
              )}
            </React.Fragment>
          )}

          <DefaultDialog
            open={this.state.signOutDialog.open}
            title="Sign out?"
            contentText="While signed out you are unable to manage your profile and conduct other activities that require you to be signed in."
            okText="Sign Out"
            highlightOkButton
            onClose={this.closeSignOutDialog}
            onCancelClick={this.closeSignOutDialog}
            onOkClick={this.signOutDialogClick}
          />
          <Settings />
          <Welcome />
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = state => {
  const storeState = state
  return storeState
}

export default connect(mapStateToProps, {
  setSearchInput,
  toggleDrawer,
  openSignInDialog,
  openSignUpDialog,
  openSettingsDialog,
  openSnackbar
})(withStyles(styles)(AppToolbar))
