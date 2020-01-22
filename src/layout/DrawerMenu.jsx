import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { toggleDrawer } from '../store/actions'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import DeleteIcon from '@material-ui/icons/Delete'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end'
  },
  drawerPaper: {
    width: 240,
    position: 'fixed',
    zIndex: '2'
  }
}))

function DrawerMenu(props) {
  const classes = useStyles()

  const handleClickMenu = () => {
    props.toggleDrawer(!props.drawer.open)
  }

  const handleClickCard = () => {
    props.toggleDrawer(false)
  }

  const handleClickTrash = () => {
    props.toggleDrawer(false)
  }

  return (
    <Drawer
      classes={{ paper: classes.drawerPaper }}
      onBackdropClick={handleClickMenu}
      open={props.open}
      variant="temporary"
      anchor="left"
      role="presentation"
    >
      <List>
        <ListItem
          className={classes.drawerHeader}
          button
          key={'Menu'}
          onClick={handleClickMenu}
        >
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </ListItem>
        <Divider />
        <ListItem button key={'Item1'} onClick={handleClickCard}>
          <ListItemIcon>
            <SpeakerNotesIcon />
          </ListItemIcon>
          <ListItemText primary={'Item1'} />
        </ListItem>
        <Divider />
        <ListItem button key={'Item2'} onClick={handleClickTrash}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={'Item2'} />
        </ListItem>
      </List>
    </Drawer>
  )
}

const mapStateToProps = state => {
  const storeState = state
  return storeState
}

export default connect(mapStateToProps, { toggleDrawer })(DrawerMenu)
