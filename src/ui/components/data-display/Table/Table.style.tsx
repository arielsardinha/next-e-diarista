import { styled } from '@material-ui/core/styles';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Pagination,
    Paper,
} from '@material-ui/core';
// import { TableProps } from './Table';

export const TablePaper = styled(Paper)`
    padding: ${({ theme }) => '0 ' + theme.spacing(4)};
`;
export const TableStyle = styled(Table)`
    &.MuiTable-root {
        border-collapse: collapse;
        border-spacing: 0 ${({ theme }) => theme.spacing(3)};
    }
`;
export const TableHeadStyle = styled(TableHead)`
    text-transform: uppercase;
    .MuiTableCell-root {
        font-weight: bold;
    }
`;
export const TableBodyStyle = styled(TableBody)`
    .MuiTableRow-root {
        background-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;
export const TableCellStyle = styled(TableCell)`
    .MuiTableCell-root {
        border: none;
        padding: ${({ theme }) => theme.spacing(5) + ' ' + theme.spacing(4)};
        color: ${({ theme }) => theme.palette.text.secondary};
    }
`;
export const TableContainerStyle = styled(TableContainer)``;
export const TableRowStyle = styled(TableRow)``;
export const TablePaginationStyle = styled(Pagination)``;
