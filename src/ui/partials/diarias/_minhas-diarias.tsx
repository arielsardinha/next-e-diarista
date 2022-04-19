import { Container } from '@material-ui/core';
import useMinhasDiarias from 'data/hooks/pages/diarias/useMinhasDiarias.page';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';

// import { Component } from './_minhas-diarias.styled';

const MinhasDiarias: React.FC = () => {
    const { isMobile } = useMinhasDiarias();
    return (
        <>
            <Container>
                <PageTitle title={'Minhas diárias'} />
            </Container>
        </>
    );
};

export default MinhasDiarias;
