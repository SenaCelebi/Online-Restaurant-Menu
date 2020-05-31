import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, withStyles } from '@material-ui/core';
import { Toolbar, Typography, Paper } from '@material-ui/core';
import { Checkbox, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../../../Config';
import MenuDialog from './MenuDialog';



function createData(name, desc, ava, price, cat) {
  return { name, desc, ava, price, cat };
}


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Meals' },
  { id: 'desc', numeric: true, disablePadding: true, label: 'Description' },
  { id: 'ava', numeric: true, disablePadding: true, label: 'Availibility' },
  { id: 'price', numeric: true, disablePadding: true, label: 'Price' },
  { id: 'cat', numeric: true, disablePadding: true, label: 'Category' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));


function Delete(itemName) {
  const deletClick = () => {
    const db = firebase.database()
    const ref = db.ref('Menu')
    ref.on('value', snap => {
      snap.forEach(childSnapshot => {
        const cat = childSnapshot.key
        childSnapshot.forEach(childSnapshot => {
          if (itemName == childSnapshot.val().MealName) {
            ref.child(cat).child(childSnapshot.key).remove()
          }
        })
      })
    })
    
  }
  return (
    <IconButton title="Delete Item" onClick={deletClick}>
      <DeleteIcon />
    </IconButton>
  )
}


const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  var { catNum, numSelected, itemName } = props;
  return (
    <Paper>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected <= 0 ? (
          <Typography className={classes.title} variant="h6">
            {catNum}
          </Typography>
        ) : (
            <Typography className={classes.title} color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          )}

        {numSelected <= 0 ? (
          <MenuDialog />
        ) : (
          Delete(itemName)
          )}
      </Toolbar>
    </Paper>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});



class EnhancedTable extends Component {
  constructor() {
    super();
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      rows: [],
      cat: [],
    }
  }


  componentDidMount() {
    const db = firebase.database()
    const ref = db.ref('Menu')
    const catTemp = []
    const lol = []
    var mealTemp = []


    ref.on('value', snap => {

      snap.forEach(childSnapshot => {      //Key is Cat, Val() is Meal Ids
        catTemp.push(childSnapshot.key)
        const tag = childSnapshot.key
        childSnapshot.forEach(childSnapshot => {  //Key is MealId, Val() is Info
          mealTemp.push(childSnapshot.val())
          lol.push(tag)
        })
      })
      var x = []
      mealTemp.map((i, index) => {
        if (i !== null) {
          var idk = createData(
            i.MealName,
            i.MealDesc,
            i.MealAvailability,
            i.MealPrice,
            i.MealType
          )
          x.push(idk)
          this.setState({
            rows: x,
            cat: catTemp,
            selected: []
          })
        }
      })
      mealTemp = []
    })
  }

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({
      order: isAsc ? 'desc' : 'asc',
      orderBy: property
    })
  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = this.state.rows.map((n) => n.name);
      this.setState({
        selected: newSelecteds
      })
      return;
    }
    this.setState({
      selected: []
    })
  };


  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
    }
    this.setState({
      selected: newSelected
    })
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    })
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    })
  };

  isSelected = (name) => this.state.selected.indexOf(name) !== -1;



  render() {
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Fragment>
            <EnhancedTableToolbar catNum={"Menu Items"} numSelected={this.state.selected.length} itemName={this.state.selected}/>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={this.state.dense ? 'small' : 'medium'}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={this.state.selected.length}
                  order={this.state.order}
                  orderBy={this.state.orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={this.state.rows.length}
                />
                <TableBody>
                  {stableSort(this.state.rows, getComparator(this.state.order, this.state.orderBy))
                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = this.isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => this.handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.name}
                          </TableCell>
                          <TableCell align="left">{row.desc}</TableCell>
                          <TableCell align="left">{row.ava}</TableCell>
                          <TableCell align="left">{row.price}</TableCell>
                          <TableCell align="left">{row.cat}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (this.state.dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={this.state.rows.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Fragment>
        </Paper>
      </div >
    );
  }

}

export default withStyles(styles)(EnhancedTable);