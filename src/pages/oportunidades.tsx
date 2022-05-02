import React from 'react';
import { GetStaticProps } from 'next';
import useOportunidadesTrabalho from 'data/hooks/pages/useOportunidades.page';
import { Container, Typography } from '@material-ui/core';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import DataList from 'ui/components/data-display/DataList/DataList';

// import { Component } from '@styles/pages/oportunidades.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Oportunidades',
        },
    };
};

const Oportunidades: React.FC = () => {
    const { isMobile, oportunidades } = useOportunidadesTrabalho();
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
                        <>Desktop</>
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
