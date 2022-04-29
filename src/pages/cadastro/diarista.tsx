import React from 'react';
import { GetStaticProps } from 'next';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import Breadcrumb from 'ui/components/navigation/Breadcrumb/Breadcrumb';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Link from 'ui/components/navigation/Link/Link';
import useCadastroDiarista from 'data/hooks/pages/cadastro/useCadastroDiarista.page';
import {
    AddressForm,
    CitiesForm,
    FinancialForm,
    NewContactForm,
    PictureForm,
    UserDataForm,
    UserFormContainer,
} from 'ui/components/inputs/UserForm/UserForm';
import { PageFormContainer } from 'ui/components/inputs/UserForm/UserForm.style';
import useIsMobile from 'data/hooks/useIsMobile';
import SideInformation from 'ui/components/data-display/SideInformation/SideInformation';
import { FormProvider } from 'react-hook-form';
import {
    Button,
    Container,
    Divider,
    Paper,
    Typography,
} from '@material-ui/core';
import Dialog from 'ui/components/feedback/Dialog/Dialog';

// import { Component } from '@styles/pages/cadastro/diarista.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Diarista',
        },
    };
};

const Diarista: React.FC = () => {
    const { step, breadcrumbItems, userForm, addressListForm } =
            useCadastroDiarista(),
        isMobile = useIsMobile();

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
            <UserFormContainer>
                <PageFormContainer>
                    {step === 1 && (
                        <FormProvider {...userForm}>
                            <Paper sx={{ p: 4 }}>
                                <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                                    Dados pessoais
                                </Typography>
                                <UserDataForm />
                                <Divider sx={{ mb: 5 }} />
                                <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                                    Financeiro
                                </Typography>
                                <FinancialForm />
                                <Divider sx={{ mb: 5 }} />
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Hora de self! Envie um self segurando o
                                    documento
                                </Typography>
                                <Typography sx={{ pb: 2 }}>
                                    Para sua segurança, todos os profissionais e
                                    clientes precisam enviar
                                </Typography>
                                <PictureForm />
                                <Typography
                                    sx={{ pt: 1, pb: 5 }}
                                    variant={'body2'}
                                >
                                    Essa foto não será vista por ninguém.
                                </Typography>
                                <Divider sx={{ mb: 5 }} />
                                <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                                    Endereço
                                </Typography>
                                <AddressForm />
                                <Divider sx={{ mb: 5 }} />
                                <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                                    Dados de acesso
                                </Typography>
                                <NewContactForm />
                                <Container sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant={'contained'}
                                        color={'secondary'}
                                        type={'submit'}
                                    >
                                        Cadastrar e escolher cidades
                                    </Button>
                                </Container>
                            </Paper>
                        </FormProvider>
                    )}

                    {step === 2 && (
                        <FormProvider {...addressListForm}>
                            <Paper sx={{ p: 4 }}>
                                <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                                    Selecione a cidade
                                </Typography>
                                <CitiesForm estado={'SP'} />
                                <Container sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant={'contained'}
                                        color={'secondary'}
                                        type={'submit'}
                                    >
                                        Finalizar o cadastro
                                    </Button>
                                </Container>
                            </Paper>
                        </FormProvider>
                    )}

                    {!isMobile && (
                        <SideInformation
                            title={'Como funciona?'}
                            items={[
                                {
                                    title: '1 - Cadastro',
                                    description: [
                                        'Voce faz o cadastro e escolhe as cidades atendidas',
                                    ],
                                },
                                {
                                    title: '2 - Receba Propostas',
                                    description: [
                                        'Voce receberá avisos por E-mail sobre novos serviços nas cidades atendidas',
                                    ],
                                },
                                {
                                    title: '3 - Diaria agendada',
                                    description: [
                                        'Se seu perfil for escolhido pelo cliente, voce receberá a confirmação do agendamento',
                                    ],
                                },
                            ]}
                        />
                    )}
                </PageFormContainer>
            </UserFormContainer>
            <Dialog
                title={'Cadastro realizado com sucesso !'}
                isOpen={false}
                noCancel
                confirmLabel={'Ver oportunidades'}
                onConfirm={() => window.location.reload()}
                onClose={() => {}}
            >
                Agora voce pode visualizar as oportunidades da região
            </Dialog>
        </>
    );
};

export default Diarista;
