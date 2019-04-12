import React from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import labels from './labels'

export default class extends React.Component {
  render() {
    const { message, onClose } = this.props

    return (
      <Dialog
        open
        onClose={() => onClose(true)}
      >
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(true)} color="primary">
            {labels('ok')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}