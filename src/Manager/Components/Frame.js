import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, InputLabel, Input, Menu, Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button, Grid } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import firebase from '../../Config'


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function MainAppBar() {
  document.title = 'Welcome Manager'
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false)
  const [Kopen, setKOpen] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [cError, setcError] = React.useState(false)
  const [values, setValues] = React.useState({
    oldManager: '',
    managerPassword: '',
    oldKitchen: '',
    kitchenPassword: '',
    showPassword: false,
    confirmK: '',
    confirmC: ''
  })

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleOpen = (event) => {
    setOpen(true);
  }
  const handleClose = (event) => {
    setError(false)
    setcError(false)
    setOpen(false);
  }
  const handleKOpen = (event) => {
    setKOpen(true);
  }
  const handleKClose = (event) => {
    setError(false)
    setKOpen(false);
  }


  const onhandleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })

  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  function onKitchenSubmit() {
    const db = firebase.database();
    const UserInfo = db.ref().child('UserInfo')
    UserInfo.on('value', snap => {
      if (values.oldKitchen !== '' || values.kitchenPassword !== '') {
        if (values.oldKitchen === snap.val().KitchenCode) {
          if (values.kitchenPassword === values.confirmK) {
            UserInfo.update({ KitchenCode: values.kitchenPassword })
            setKOpen(false)
            setError(false)
            setcError(false)
            setValues({ showPassword: false })
          } else {
            setcError(true)
          }
        } else {
          setError(true)
        }
      } else {
        setError(true)
      }
    })
  }


  function onManagerSubmit() {
    const db = firebase.database();
    const UserInfo = db.ref().child('UserInfo')
    UserInfo.on('value', snap => {
      if (values.oldManager !== '' || values.managerPassword !== '') {
        if (values.oldManager === snap.val().ManagerCode) {
          if (values.managerPassword === values.confirmC) {
            UserInfo.update({ ManagerCode: values.managerPassword })
            setOpen(false)
            setError(false)
            setcError(false)
            setValues({ showPassword: false })
          } else {
            setcError(true)
          }
        } else {
          setError(true)
        }
      } else {
        setError(true)
      }
    })

  }


  const handleChangeManager = (
    <Dialog open={open}>
      <DialogTitle> Change Manager Password</DialogTitle>
      <DialogContent>
        <Grid direction="vertical">
          <Grid item>
            <FormControl margin='normal'>
              <InputLabel>Old Password</InputLabel>
              <Input
                error={error}
                type={values.showPassword ? 'text' : 'password'}
                fullWidth
                required
                onChange={onhandleChange('oldManager')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel>New Password</InputLabel>
              <Input
                type={values.showPassword ? 'text' : 'password'}
                fullWidth
                required
                onChange={onhandleChange('managerPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel>Confirm New Password</InputLabel>
              <Input
                error={cError}
                type={values.showPassword ? 'text' : 'password'}
                fullWidth
                required
                onChange={onhandleChange('confirmC')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={onManagerSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )

  const handleChangeKitchen = (
    <Dialog open={Kopen}>
      <DialogTitle> Change Kitchen Password</DialogTitle>
      <DialogContent>
        <Grid direction="vertical">
          <Grid item>
            <FormControl fullwidth>
              <InputLabel>Old Password</InputLabel>
              <Input
                error={error}
                type={values.showPassword ? 'text' : 'password'}
                fullWidth
                required
                onChange={onhandleChange('oldKitchen')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel>New Password</InputLabel>
              <Input
                type={values.showPassword ? 'text' : 'password'}
                fullWidth
                required
                onChange={onhandleChange('kitchenPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Grid item>
              <FormControl>
                <InputLabel>Confirm New Password</InputLabel>
                <Input
                  type={values.showPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  error={cError}
                  onChange={onhandleChange('confirmK')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleKClose}>
          Cancel
        </Button>
        <Button onClick={onKitchenSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpen}>Change Manager Passoword</MenuItem>
      <MenuItem onClick={handleKOpen}>Change Kitchen Password</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" align="right">
            Manager
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              title="More Options"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {handleChangeManager}
      {handleChangeKitchen}
    </div>
  );
}