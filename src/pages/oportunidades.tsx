import React from 'react';
import { GetStaticProps } from 'next';
import useOportunidadesTrabalho from 'data/hooks/pages/useOportunidades.page';
import { Container, Typography } from '@material-ui/core';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import DataList from 'ui/components/data-display/DataList/DataList';
import Table, {
    TableRow,
    TableCell,
    TablePagination,
} from 'ui/components/data-display/Table/Table';

// import { Component } from '@styles/pages/oportunidades.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Oportunidades',
        },
    };
};

const Oportunidades: React.FC = () => {
    const {
        isMobile,
        oportunidades,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPorPage,
    } = useOportunidadesTrabalho();
    return (
        <>
            <Container sx={{ mb: 5, p: 0 }}>
                <PageTitle title={'Oportunidades de trabalho'} />
                {oportunidades.length > 0 ? (
                    isMobile ? (
                        <>
                            <DataList
                                header={
                                    <>
                                        Data: 01/01/2000 <br /> Limpeza Pesada{' '}
                                        <br /> R$ 140,00
                                    </>
                                }
                                body={
                                    <>
                                        Cidade: São paulo <br /> Número de
                                        cômodos: 2
                                    </>
                                }
                            />
                        </>
                    ) : (
                        <>
                            <Table
                                header={[
                                    'Data',
                                    'Tipo de Serviço',
                                    'Número de cômodos',
                                    'Cidade',
                                    'Valor',
                                    '',
                                ]}
                                data={[]}
                                rowElement={() => (
                                    <TableRow>
                                        <TableCell>
                                            <strong>01/01/2022</strong>
                                        </TableCell>
                                        <TableCell>Limpeza Pesada</TableCell>
                                        <TableCell>3 cômodos</TableCell>
                                        <TableCell>São Paulo - SP</TableCell>
                                        <TableCell>R$ 140,00</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                )}
                            />
                            <TablePagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(_event, nextPage) =>
                                    setCurrentPage(nextPage)
                                }
                            />
                        </>
                    )
                ) : (
                    <Typography align={'center'}>
                        Nenhuma oportunidade ainda
                    </Typography>
                )}
            </Container>
        </>
    );
};

export default Oportunidades;
