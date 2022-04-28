import React from 'react';
import { GetStaticProps } from 'next';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import Breadcrumb from 'ui/components/navigation/Breadcrumb/Breadcrumb';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Link from 'ui/components/navigation/Link/Link';
import useCadastroDiarista from 'data/hooks/pages/cadastro/useCadastroDiarista.page';
import { UserFormContainer } from 'ui/components/inputs/UserForm/UserForm';
import { PageFormContainer } from 'ui/components/inputs/UserForm/UserForm.style';

// import { Component } from '@styles/pages/cadastro/diarista.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Diarista',
        },
    };
};

const Diarista: React.FC = () => {
    const { step, breadcrumbItems } = useCadastroDiarista();
    return (
        <>
            <SafeEnvironment />
            <Breadcrumb
                items={breadcrumbItems}
                selected={breadcrumbItems[step - 1]}
            />
            {step == 1 && (
                <PageTitle
                    title={'Precisamos conhecer um pouco sobre você'}
                    subtitle={
                        <span>
                            Caso já tenha cadastro,{' '}
                            <Link href={'/login'}>Clique aqui</Link>
                        </span>
                    }
                />
            )}
            {step == 2 && (
                <PageTitle
                    title={'Quais cidades você atenderá'}
                    subtitle={
                        <span>
                            Você pode escolher se aceia ou não um serviço.
                            Então, não se preocupe se mora em uma grande cidade
                        </span>
                    }
                />
            )}
            <UserFormContainer >
             <PageFormContainer></PageFormContainer>
            </UserFormContainer>
        </>
    );
};

export default Diarista;
