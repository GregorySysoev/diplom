import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import categories from './categories';

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

const rowsBeforeAdd = [];

const rowsAfterAdd = [
    createData('Вок с курицей и лапшой удон', categories.WOK, true, true, '350₽'),
];

const rowsAfterFastForwardAdd = [
    ...rowsAfterAdd,
    createData('Вок с морепродуктами и лапшой удон', categories.WOK, true, false, '400₽'),
    createData('Вок с курицей и овощами', categories.WOK, true, false, '290₽'),
    createData('Вок со свининой и лапшой удон', categories.WOK, true, false, '330₽'),
    createData('Смузи манго-апельсин', categories.DRINK, true, false, 'от 230 до 620₽'),
    createData('Смузи смородина-кокос', categories.DRINK, true, false, 'от 230 до 620₽'),
    createData('Red bull', categories.DRINK, true, false, 'от 250 до 450₽'),
    createData('Coca-cola', categories.DRINK, true, false, 'от 120 до 220₽'),
    createData('Bonaqua газ.', categories.DRINK, true, false, '60₽'),
    createData('Фреш яблочный', categories.DRINK, true, false, '320₽'),
    createData('Салаты', categories.SALAD, true, false, '250₽'),
    createData('Салат с говядиной', categories.SALAD, true, false, '500₽'),
    createData('Салат с крабом и кальмаром', categories.SALAD, true, false, '400₽'),
    createData('Салат с копчёным лососем', categories.SALAD, true, false, '350₽'),
    createData('Салат с авокадо', categories.SALAD, true, false, '280₽'),
    createData('Сырники', categories.DESSERT, true, false, '200₽'),
    createData('Тирамису', categories.DESSERT, true, false, '220₽'),
    createData('Пирожное “Любовь”', categories.DESSERT, true, false, '290₽'),
    createData('Удон', categories.SOUP, true, false, '340₽'),
    createData('Том Ям', categories.SOUP, true, false, '380₽'),
    createData('Лакса', categories.SOUP, true, false, '260₽'),
    createData('Суп со свининой', categories.SOUP, true, false, '270₽'),
    createData('Том Кха', categories.SOUP, true, false, '280₽'),
    createData('Ясай Тяхан', categories.RICE, true, false, '130₽'),
    createData('Сифудо Тяхан', categories.RICE, true, false, '270₽'),
    createData('Сякэ Тяхан', categories.RICE, true, false, '260₽'),
    createData('Курица по-тайваньски', categories.HOT_DISHES, true, false, '350₽'),
    createData('Свиные ребрышки гриль', categories.HOT_DISHES, true, false, '480₽'),
    createData('Стейк из свинины', categories.HOT_DISHES, true, false, '450₽'),
    createData('Мидии в соусе Том-Ям', categories.HOT_DISHES, true, false, 'от 390 до 740₽'),
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
    emptyTitle: {
        textAlign: 'center',
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
