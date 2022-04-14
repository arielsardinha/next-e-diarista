import React from 'react';
// import { } from '@material-ui/core';
import {
    TableStyle,
    TableContainerStyle,
    TableHeadStyle,
    TableRowStyle,
    TableCellStyle,
    TableBodyStyle,
    TablePaginationStyle,
    TablePaper,
} from './Table.style';

export interface TableProps<T> {
    header: string[];
    data: T[];
    rowElement: (item: T, index: number) => React.ReactNode;
}

export type TableComponentType = <T>(
    props: TableProps<T>
) => React.ReactElement;

const Table: TableComponentType = (props) => {
    return (
        <TablePaper>
            <TableContainerStyle>
                <TableStyle>
                    <TableHeadStyle>
                        <TableRowStyle>
                            {props.header.map((title, index) => {
                                <TableCellStyle key={index}>
                                    {title}
                                </TableCellStyle>;
                            })}
                        </TableRowStyle>
                    </TableHeadStyle>
                    <TableBodyStyle>
                        {props.data.map(props.rowElement)}
                    </TableBodyStyle>
                </TableStyle>
            </TableContainerStyle>
        </TablePaper>
    );
};

export default Table;
export const TableRow = TableRowStyle;
export const TableCell = TableCellStyle;
export const TablePagination = TablePaginationStyle;
