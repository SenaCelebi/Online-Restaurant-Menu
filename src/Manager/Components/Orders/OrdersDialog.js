import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@material-ui/core';
import Add from '@material-ui/icons/AddCircle';
import firebase from '../../../Config';

export default function Digo() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false)
  const [values, setValues] = React.useState({
    tname: '',
    mname: '',
    status: '',
    totalPrice: 0
  })

  const handleClickSubmit = () => {
    addMealorTable()
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError(false)
    setOpen(false);
  };

  const onhandleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }


  function addMealorTable() {
    if (values.mname !== '' || values.tname !== '' || values.status !== '') {
      const db = firebase.database();
      const MenuRef = db.ref().child('Menu')
      const OrderRef = db.ref().child('Orders').child(values.tname);

      MenuRef.on('value', snap => {
        snap.forEach(childSnapshot => {
          childSnapshot.forEach(childSnapshot => {
            if (values.mname === childSnapshot.key || values.mname === childSnapshot.val().MealName) {
              const time = Date.now()
              OrderRef.child('Meals').child(time).set({
                MealName: childSnapshot.val().MealName,
                MealPrice: childSnapshot.val().MealPrice,
                TimeStamp: Date.now()
              })
            }
          })
        })
        OrderRef.child('Meals').child('1').update({
          MealName: "",
          MealPrice: 0,
          TimeStamp: ""
        })
        OrderRef.update({
          StatusOfOrder: values.status,
          title: values.tname
        })
      })
      setOpen(false)
    } else {
      setError(true)
    }
  }



  return (
    <form>
      <IconButton title='Add Table/Meal' variant="outlined" color="primary" onClick={handleClickOpen}>
        <Add />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >Add Table / Meal</DialogTitle>
        <DialogContent>
          <DialogContentText inline>
            Please Make sure that you type the values correctly.
          </DialogContentText>
          <DialogContentText inline>
            Capital Letters should be capitalized as this form is Case Sensitive
          </DialogContentText>
          <TextField
            error={error}
            margin="dense"
            fullWidth
            required
            label="Table Name"
            onChange={onhandleChange('tname')}
          />
          <TextField
            error={error}
            margin="dense"
            fullWidth
            required
            label="Meal ID/Name"
            onChange={onhandleChange('mname')}
          />
          <TextField
            error={error}
            margin="dense"
            fullWidth
            required
            label="Status of the Order"
            onChange={onhandleChange('status')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
                </Button>
          <Button onClick={handleClickSubmit} color="primary">
            Submit
                </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}




