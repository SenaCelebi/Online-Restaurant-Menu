import React from 'react'
import Add from '@material-ui/icons/AddCircle';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton, Checkbox, Typography } from '@material-ui/core';
import firebase from '../../../Config'




export default function MenuDialog() {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [alert, setAlert] = React.useState(false)
    const [done, setDone] = React.useState(false)
    const [ava, setAva] = React.useState(false);

    const [values, setValues] = React.useState({
        cat: '',
        id: '',
        name: '',
        desc: '',
        price: '',
        image: ''
    })

    const handleClickSubmit = () => {
        addMeal(values.cat, values.id, values.name, ava, values.desc, values.price, values.image)
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setError(false)
        setOpen(false);
        setAva(false)
    };

    const onhandleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value.trim() })

    }
    const getAva = (event) => {
        setAva(event.target.checked)
        console.log(ava)
    }

    var dup = false
    var d = ''
    const db = firebase.database();
    const MenuRef = db.ref().child('Menu')
        MenuRef.on('value', snap => {
            snap.forEach(childSnapshot => {
                childSnapshot.forEach(childSnapshot => {
                    if (values.id == '' || values.id == childSnapshot.val().MealId) {
                        values.id = Math.floor(Math.random() * 500)
                    }
                    if (values.name == childSnapshot.val().MealName) {
                        dup = true
                    }
                })
            })
        })

    function addMeal(cat, id, name, ava, desc, price, image) {
        var aval = ''
        if (!dup) {
            if (cat != '' || name != '' || price != '') {
                if (ava) {
                    aval = 'Available'
                } else { aval = 'Not Available' }

                MenuRef.child(cat).child(id).update({
                    MealName: name,
                    MealId: id,
                    MealAvailability: aval,
                    MealDesc: desc,
                    MealPrice: Number(price),
                    MealImage: image,
                    MealType: cat
                })
                setOpen(false);
                setAva(false)
                setDone(true)
            } else {
                setError(true)
            }
        } else {
            setError(true)
            setAlert(true)
        }

    }

    const handleAlert = () => { setAlert(false) }
    const Alert = (
        <Dialog open={alert}>
            <DialogTitle> Meal already exits </DialogTitle>
            <DialogContent>
            <DialogContentText>Please change your meal name</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAlert}>
                    Ok
                    </Button>
            </DialogActions> 
        </Dialog>
    )

    const handleDone = () => { setDone(false) }
    const Done = (
        <Dialog open={done}>
            <DialogTitle> Meal Has Been Added </DialogTitle>
            <DialogActions>
                <Button onClick={handleDone}>
                    Ok
                    </Button>
            </DialogActions>
        </Dialog>
    )




    return (
        <form>
            <IconButton title='Add Table/Meal' color="primary" onClick={handleClickOpen}>
                <Add />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle >Add Meal</DialogTitle>
                <DialogContent>
                    <DialogContentText inline>
                        Please Make sure that you type the values correctly.
        </DialogContentText>
                    <DialogContentText inline>
                        Capital Letters should be capitalized as this form is Case Sensitive
        </DialogContentText>
                    <TextField
                        margin="dense"
                        fullWidth
                        required
                        error={error}
                        label="Category"
                        onChange={onhandleChange('cat')}
                    />
                    <TextField
                        error={error}
                        margin="dense"
                        fullWidth
                        required
                        label="Meal Name"
                        onChange={onhandleChange('name')}
                    />
                    <Typography>
                        Available:
                        <Checkbox checked={values.ava} onChange={getAva} />
                    </Typography>
                    <TextField
                        margin="none"
                        fullWidth
                        multiline
                        rows={4}
                        label="Meal Description"
                        onChange={onhandleChange('desc')}
                    />
                    <TextField
                        error={error}
                        margin="dense"
                        fullWidth
                        required
                        label="Meal Price"
                        type='number'
                        onChange={onhandleChange('price')}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        label="Meal Image"
                        onChange={onhandleChange('image')}
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
            {Alert}
            {Done}
        </form>
    )
}