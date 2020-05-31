import React from 'react'
import Add from '@material-ui/icons/AddCircle';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@material-ui/core';
import firebase from '../../../Config'



export default function MenuDialog() {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [cat, setCat] = React.useState('');
    const [id, setId] = React.useState(0);
    const [name, setName] = React.useState('');
    const [ava, setAva] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [image, setImage] = React.useState('');

    const handleClickSubmit = () => {
        addMeal(cat, id, name, ava, desc, price, image)
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setError(false)
        setOpen(false);
    };
    const getCat = (event) => {
        setCat(event.target.value)
    }
    const getId = (event) => {
        setId(event.target.value)
    }
    const getName = (event) => {
        setName(event.target.value)
    }
    const getAva = (event) => {
        setAva(event.target.value)
    }
    const getDesc = (event) => {
        setDesc(event.target.value)
    }
    const getPrice = (event) => {
        setPrice(event.target.value)
    }
    const getImage = (event) => {
        setImage(event.target.value)
    }


    function addMeal(cat, id, name, ava, desc, price, image) {
        const db = firebase.database();
        const MenuRef = db.ref().child('Menu')
        if (cat != '' || id != '' || name!='' || ava!='' || desc!='' || price!='' || image!='') {
                MenuRef.child(cat).child(id).update({
                    MealName: name,
                    MealId: id,
                    MealAvailability: ava,
                    MealDesc: desc,
                    MealPrice: Number(price),
                    MealImage: image,
                    MealType : cat
                })
                setOpen(false);
        } else {
            setError(true)
        }
    }




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
                        onChange={getCat}
                    />
                    <TextField
                        error={error}
                        margin="dense"
                        fullWidth
                        required
                        label="Meal ID"
                        onChange={getId}
                    />
                    <TextField
                        error={error}
                        margin="dense"
                        fullWidth
                        required
                        label="Meal Name"
                        onChange={getName}
                    />
                    <TextField
                        error={error}
                        margin="dense"
                        fullWidth
                        required
                        label="Meal Availability"
                        onChange={getAva}
                    />
                    <TextField
                        error={error}
                        margin="dense"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        label="Meal Description"
                        onChange={getDesc}
                    />
                    <TextField
                        error={error}
                        margin="dense"
                        fullWidth
                        required
                        label="Meal Price"
                        type='number'
                        onChange={getPrice}
                    />
                    <TextField
                        error={error}
                        margin="dense"
                        fullWidth
                        required
                        label="Meal Image"
                        onChange={getImage}
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
    )
}