import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const headCells = [
    { id: 'name', label: 'Название' },
    { id: 'category', label: 'Категория' },
    { id: 'hasPortions', label: 'Есть порции' },
    { id: 'hasOptions', label: 'Есть опции' },
    { id: 'priceRange', label: 'Цена' },
    { id: 'delete', label: '' },
];

function createData(name, category, hasPortions, hasOptions, priceRange) {
    return { name, category, hasPortions, hasOptions, priceRange };
}

const rows = [
    // здесь можно добавить данные (лучше в порядке возрастания названия)
    createData('Коньяк "Грузия"', 'Алкоголь', true, false, 'от 250 до 1200₽'),
    createData('Коньяк "Грузия" 2', 'Алкоголь', false, false, null),
    createData('Вареники со сметаной', 'Горячее', true, false, 'от 100 до 250₽')
];

const useStyles = makeStyles((theme) => ({
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
    row: {
        cursor: 'pointer',
    },
}));

export default function FoodServiceList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Напитки и еда
                    </Typography>
                </Toolbar>
                <TableContainer>
                    <Table
                        className={classes.table}
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell key={headCell.id}>
                                        {headCell.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) =>
                                <TableRow
                                    hover
                                    key={row.name}
                                    className={classes.row}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.hasPortions ? <CheckIcon /> : <ClearIcon />}</TableCell>
                                    <TableCell>{row.hasOptions ? <CheckIcon /> : <ClearIcon />}</TableCell>
                                    <TableCell>{row.priceRange === null ? <NotInterestedIcon /> : row.priceRange}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
