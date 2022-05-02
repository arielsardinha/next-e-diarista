import React from 'react';
import { GetStaticProps } from 'next';
import useOportunidadesTrabalho from 'data/hooks/pages/useOportunidades.page';
import { Container } from '@material-ui/core';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';

// import { Component } from '@styles/pages/oportunidades.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Oportunidades',
        },
    };
};

const Oportunidades: React.FC = () => {
    useOportunidadesTrabalho();
    return (
        <>
            <Container sx={{ mb: 5, p: 0 }}>
                <PageTitle title={'Oportunidades de trabalho'} />
            </Container>
        </>
    );
};

export default Oportunidades;
