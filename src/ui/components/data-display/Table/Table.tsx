import React from 'react';
// import { } from '@material-ui/core';
import {
    TablePaper,
    TableStyled,
    TableContainerStyled,
    TableHeadStyled,
    TableRowStyled,
    TableCellStyled,
    TableBodyStyled,
    TablePaginationStyled,
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
            <TableContainerStyled>
                <TableStyled>
                    <TableHeadStyled>
                        <TableRowStyled>
                            {props.header.map((title, index) => (
                                <TableCellStyled key={index}>
                                    {title}
                                </TableCellStyled>
                            ))}
                        </TableRowStyled>
                    </TableHeadStyled>
                    <TableBodyStyled>
                        {props.data.map(props.rowElement)}
                    </TableBodyStyled>
                </TableStyled>
            </TableContainerStyled>
        </TablePaper>
    );
};

export default Table;
export const TableRow = TableRowStyled;
export const TableCell = TableCellStyled;
export const TablePagination = TablePaginationStyled;
