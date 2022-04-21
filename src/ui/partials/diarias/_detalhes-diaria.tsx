import { CircularProgress, Container } from '@material-ui/core';
import useDetalhesDiaria from 'data/hooks/pages/diarias/useDetalhesDiaria.page';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';

// import { Component } from './_detalhes-diaria.styled';

const DetalhesDiaria: React.FC<{ id: string }> = ({ id }) => {
    const { diaria, diarista, cliente } = useDetalhesDiaria(id);

    if (!diaria.id) {
        return (
            <Container>
                <CircularProgress sx={{ textAlign: 'center' }} />
            </Container>
        );
    }

    return (
        <Container>
            <PageTitle title={`Detalhes da diária: #${id}`} />
        </Container>
    );
};

export default DetalhesDiaria;
