import React from 'react';
import { GetStaticProps } from 'next';
import { DiariaProvider } from 'data/contexts/DiariasContext';
import MinhasDiarias from 'ui/partials/diarias/_minhas-diarias';

// import { Component } from '@styles/pages/diarias.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Diárias',
        },
    };
};

const Diarias: React.FC = () => {
    return (
        <DiariaProvider>
            <MinhasDiarias>Diarias</MinhasDiarias>
        </DiariaProvider>
    );
};

export default Diarias;
