import { Container } from '@material-ui/core';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';

// import { Component } from './_detalhes-diaria.styled';

const DetalhesDiaria: React.FC<{ id: string }> = ({ id }) => {
    return (
        <Container>
            <PageTitle title={`Detalhes da diária: #${id}`} />
        </Container>
    );
};

export default DetalhesDiaria;
