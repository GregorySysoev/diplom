import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as serviceTypes from '../types';
import * as orderStatuses from './statuses';

const headCells = [
    { id: 'name', label: 'Название' },
    { id: 'room', label: 'Комната' },
    { id: 'serviceType', label: 'Тип услуги' },
    { id: 'date', label: 'Дата создания заказа' },
];

function createData(name, room, serviceType, date) {
    return { name, room, serviceType, date };
}

// здесь можно добавить данные (лучше в порядке возрастания названия)
const pendingRows = [
    createData('Вареники со сметаной (pending)', '101', serviceTypes.SERVICE, '24.07.2020 11:53'),
];
const completedRows = [
    createData('Вареники со сметаной (completed)', '101', serviceTypes.SERVICE, '24.07.2020 11:53'),
];
const deniedRows = [
    createData('Вареники со сметаной (denied)', '101', serviceTypes.SERVICE, '24.07.2020 11:53'),
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

function ServiceOrderListPage() {
    const [currentStatus, setCurrentStatus] = React.useState(orderStatuses.PENDING);

    const rowsToDisplay =
        currentStatus === orderStatuses.PENDING
            ? pendingRows
            : currentStatus === orderStatuses.COMPLETED
                ? completedRows
                : currentStatus === orderStatuses.DENIED
                    ? deniedRows
                    : [];

    const handleOrderStatusChange = event => {
        setCurrentStatus(+event.target.value);
    };

    const classes = useStyles();

    return (
        <div className="uk-container uk-margin-top uk-margin-bottom">
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
                                    {headCells.map((headCell) => (
                                        <TableCell key={headCell.id}>
                                            {headCell.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsToDisplay.map((row, index) =>
                                    <TableRow
                                        hover
                                        key={row.name}
                                        className={classes.row}
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
                </Paper>
            </div>
        </div>
    );
}

export default ServiceOrderListPage;
