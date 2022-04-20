import { Container, Typography } from '@material-ui/core';
import { DiariaStatus } from 'data/@types/DiariaInterface';
import useMinhasDiarias from 'data/hooks/pages/diarias/useMinhasDiarias.page';
import { DiariaService } from 'data/services/DiariaService';
import { TextFormatService } from 'data/services/TextFormatService';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Status from 'ui/components/data-display/Status/Status';
import DataList from 'ui/components/data-display/DataList/DataList';
import Table, {
    TableCell,
    TablePagination,
    TableRow,
} from 'ui/components/data-display/Table/Table';

// import { Component } from './_minhas-diarias.styled';

const MinhasDiarias: React.FC = () => {
    const {
        isMobile,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPorPage,
        filterdData,
    } = useMinhasDiarias();
    return (
        <>
            <Container sx={{ mb: 5, p: 0 }}>
                <PageTitle title={'Minhas diárias'} />
                {filterdData.length > 0 ? (
                    isMobile ? (
                        <>
                            {filterdData.map((item) => (
                                <DataList
                                    key={item.id}
                                    header={
                                        <>
                                            Data:{' '}
                                            {TextFormatService.reverseDate(
                                                item.data_atendimento as string
                                            )}
                                            <br />
                                            {item.nome_servico}
                                        </>
                                    }
                                    body={
                                        <>
                                            Status:
                                            {
                                                DiariaService.getStatus(
                                                    item.status as DiariaStatus
                                                ).label
                                            }
                                            <br />
                                            Valor:{' '}
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </>
                                    }
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            <Table
                                header={[
                                    'Data',
                                    'Status',
                                    'Tipo de Serviço',
                                    'Valor',
                                    '',
                                    '',
                                ]}
                                data={filterdData}
                                itemsPorPage={itemsPorPage}
                                currentPage={currentPage}
                                rowElement={(item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <strong>
                                                {TextFormatService.reverseDate(
                                                    item.data_atendimento as string
                                                )}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            <Status
                                                color={
                                                    DiariaService.getStatus(
                                                        item.status as DiariaStatus
                                                    ).color
                                                }
                                            >
                                                {
                                                    DiariaService.getStatus(
                                                        item.status as DiariaStatus
                                                    ).label
                                                }
                                            </Status>
                                        </TableCell>
                                        <TableCell>
                                            {item.nome_servico}
                                        </TableCell>
                                        <TableCell>
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )}
                            />
                            <TablePagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(_event, nextPage) => {
                                    setCurrentPage(nextPage);
                                }}
                            />
                        </>
                    )
                ) : (
                    <Typography align={'center'}>
                        Nenhuma diária ainda
                    </Typography>
                )}
            </Container>
        </>
    );
};

export default MinhasDiarias;
