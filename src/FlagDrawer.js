import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import labels from './labels'

export default class extends React.Component {
  render() {
    const { onClose } = this.props

    return (
      <Drawer anchor="bottom" open onClose={() => onClose(false)} className="drawer">
        <Typography variant="h5" component="h5">
          {labels('flag_heading')}
        </Typography>

        <List>
          <ListItem button onClick={() => onClose('flag_1')}>
            <ListItemText primary={labels('flag_1')} />
          </ListItem>
          <ListItem button onClick={() => onClose('flag_2')}>
            <ListItemText primary={labels('flag_2')} />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
