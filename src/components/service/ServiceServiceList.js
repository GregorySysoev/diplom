import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TablePagination from '@material-ui/core/TablePagination';
import categories from "./categories";

const headCells = [
    { id: 'name', label: 'Название' },
    { id: 'category', label: 'Категория' },
    { id: 'price', label: 'Цена' },
    { id: 'delete', label: '' },
];

function createData(name, category, price) {
    return { name, category, price };
}

const rowsBeforeAdd = [];

const rowsAfterAdd = [
    createData('Уборка в номере', categories.SERVICE, 0),
];

const rowsAfterFastForwardAdd = [
    ...rowsAfterAdd,
    createData('Просьба разбудить', categories.SERVICE, 0),
    createData('Прачечная', categories.SERVICE, 0),
    createData('Няня', categories.SERVICE, 300),
    createData('Транспорт до жд вокзала', categories.TRANSPORT, 110),
    createData('Вызвать такси', categories.TRANSPORT, 0),
    createData('Аренда велосипеда', categories.TRANSPORT, 500),
    createData('Пропуск на парковку', categories.TRANSPORT, 0),
    createData('Абонемент в спортзал', categories.ENTERTAINMENT, 300),
    createData('Массаж', categories.ENTERTAINMENT, 1500),
    createData('Аренда бильярдного стола', categories.ENTERTAINMENT, 1000),
    createData('Боулинг', categories.ENTERTAINMENT, 1000),
    createData('Футболка “Адмирал” мужская', categories.SOUVENIR, 1000),
    createData('Футболка “Владивосток” женская', categories.SOUVENIR, 1000),
    createData('Магнитик “Владивосток”', categories.SOUVENIR, 100),
];

const rows = rowsBeforeAdd;

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

    const rowsPerPage = 5;
    const [currentPage, setCurrentPage] = React.useState(0);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
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
                            {rows.length === 0 ? (
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="subheading" className={classes.emptyTitle}>
                                            Пусто
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : rows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map(row =>
                                    <TableRow
                                        hover
                                        key={row.name}
                                        className={classes.row}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell>{!row.price ? <i>Бесплатно</i> : `${row.price}₽`}</TableCell>
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
                {rows.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[rowsPerPage]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={currentPage}
                        onChangePage={(event, newPage) => setCurrentPage(newPage)}
                        labelDisplayedRows={({from, to, count}) => `${from}-${to} из ${count}`}
                    />
                )}
            </Paper>
        </div>
    );
}
