import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { v4 as uuidv4 } from 'uuid';
import * as serviceTypes from '../types';
import * as orderStatuses from './statuses';
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";

const headCells = [
    { id: 'name', label: 'Название' },
    { id: 'room', label: 'Комната' },
    { id: 'serviceType', label: 'Тип услуги' },
];

const headCellsWithSort = [
    { id: 'date', label: 'Дата создания заказа', sortDirection: 'asc' },
];

function createRow(name, room, serviceType, date, isDark = false) {
    return { id: uuidv4(), name, room, serviceType, date, isDark };
}

// здесь можно добавить данные (в порядке возрастания даты, сгруппировать по номеру заказа)
const room = '206';
const orderCreationDate = '05.07.2020 17:39';
let pendingRows = [
    // createRow('Смузи смородина-кокос', room, serviceTypes.FOOD, orderCreationDate),
    // createRow('Уборка в номере', room, serviceTypes.SERVICE, orderCreationDate),
];
const completedRows = [
    // createRow('Вок с курицей и лапшой удон', room, serviceTypes.FOOD, orderCreationDate),
];
const deniedRows = [

];

const delayMs = 2000;
const pendingRowsDelayed = [
    createRow('Смузи смородина-кокос', room, serviceTypes.FOOD, orderCreationDate),
    createRow('Вок с курицей и лапшой удон', room, serviceTypes.FOOD, orderCreationDate),
    createRow('Уборка в номере', room, serviceTypes.SERVICE, orderCreationDate),
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
    get rowDark() {
        return {
            ...this.row,
            backgroundColor: theme.palette.action.hover,
        };
    },
}));

function ServiceOrderListPage() {
    const [currentStatus, setCurrentStatus] = React.useState(orderStatuses.PENDING);
    const [rows, setRows] = React.useState([]);

    const getRowsByStatus = React.useCallback(status => {
        return status === orderStatuses.PENDING
            ? pendingRows
            : status === orderStatuses.COMPLETED
                ? completedRows
                : status === orderStatuses.DENIED
                    ? deniedRows
                    : [];
    }, [currentStatus]);

    React.useEffect(() => {
        setRows(getRowsByStatus(currentStatus));
    }, [currentStatus]);

    const addRows = React.useCallback(rows => {
        setRows([...rows, ...getRowsByStatus(currentStatus)]);
    }, [currentStatus]);

    React.useEffect(() => {
        setTimeout(() => {
            addRows(pendingRowsDelayed);
            pendingRows = [...pendingRows, ...pendingRowsDelayed];
        }, delayMs);
    }, []);

    const handleOrderStatusChange = event => {
        setCurrentStatus(+event.target.value);
    };

    const rowsPerPage = 5;
    const [currentPage, setCurrentPage] = React.useState(0);

    const classes = useStyles();

    return (
        <div className="uk-container uk-margin-top uk-margin-bottom">
            <div className="uk-margin-top">
                <a className="uk-link-muted" href="/actions">Назад, к доступным действиям</a>
            </div>
            <h2>Заказы услуг</h2>
            <div>
                <div className="uk-margin uk-child-width-auto uk-flex uk-flex-column">
                    <label>
                        <input
                            type="radio"
                            value={orderStatuses.PENDING}
                            checked={currentStatus === orderStatuses.PENDING}
                            onChange={handleOrderStatusChange}
                        /> Необработанные
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={orderStatuses.COMPLETED}
                            checked={currentStatus === orderStatuses.COMPLETED}
                            onChange={handleOrderStatusChange}
                        /> Обработанные
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={orderStatuses.DENIED}
                            checked={currentStatus === orderStatuses.DENIED}
                            onChange={handleOrderStatusChange}
                        /> Отклонённые
                    </label>
                </div>
            </div>

            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    {headCells.map(headCell => (
                                        <TableCell key={headCell.id}>
                                            {headCell.label}
                                        </TableCell>
                                    ))}

                                    {headCellsWithSort.map(headCell => (
                                        <TableCell key={headCell.id}>
                                            <TableSortLabel
                                                active={true}
                                                direction={headCell.sortDirection}
                                                onClick={() => {}}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
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
                                        key={row.id}
                                        className={row.isDark ? classes.rowDark : classes.row}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.room}</TableCell>
                                        <TableCell>
                                            {
                                                row.serviceType === serviceTypes.SERVICE
                                                    ? 'сервис'
                                                    : row.serviceType === serviceTypes.FOOD
                                                        ? 'еда/напитки'
                                                        : ''
                                            }
                                        </TableCell>
                                        <TableCell>{row.date}</TableCell>
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
        </div>
    );
}

export default ServiceOrderListPage;
