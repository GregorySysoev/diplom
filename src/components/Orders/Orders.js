import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as orderStatuses from './statuses';
import Typography from "@material-ui/core/Typography";

const headCells = [
    { id: 'name', label: 'Номер заказа' },
    { id: 'room', label: 'Имя' },
    { id: 'date', label: 'Дата создания заказа' },
];

function createData(name, room, date) {
    return { name, room,  date };
}

const pendingRows = [
    // createData('№2', 'Константин Голуб', '05.07.2020 17:39'),
];
const completedRows = [
    // createData('№2', 'Константин Голуб', '05.07.2020 17:39'),
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

function Orders() {
    const [currentStatus, setCurrentStatus] = React.useState(orderStatuses.PENDING);

    const rowsToDisplay =
        currentStatus === orderStatuses.PENDING
            ? pendingRows
            : currentStatus === orderStatuses.COMPLETED
                ? completedRows
                : [];
                
    const handleOrderStatusChange = event => {
        setCurrentStatus(+event.target.value);
    };

    const classes = useStyles();

    return (
        <div className="uk-container uk-margin-top uk-margin-bottom">
            <div className="uk-margin-top">
                <a className="uk-link-muted" href="/actions">Назад, к доступным действиям</a>
            </div>
            <h2>Заказы</h2>
            <div>
                <div className="uk-margin uk-child-width-auto uk-flex uk-flex-column">
                    <label>
                        <input
                            type="radio"
                            value={orderStatuses.PENDING}
                            checked={currentStatus === orderStatuses.PENDING}
                            onChange={handleOrderStatusChange}
                        /> Новые
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={orderStatuses.COMPLETED}
                            checked={currentStatus === orderStatuses.COMPLETED}
                            onChange={handleOrderStatusChange}
                        /> Обработанные
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
                                {rowsToDisplay.length === 0 ? (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subheading" className={classes.emptyTitle}>
                                                Пусто
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : rowsToDisplay.map((row, index) =>
                                    <TableRow
                                        hover
                                        key={row.name}
                                        className={classes.row}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.room}</TableCell>
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

export default Orders;
