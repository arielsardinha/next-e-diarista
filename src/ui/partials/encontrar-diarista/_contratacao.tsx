import React from 'react';
import { FormProvider } from 'react-hook-form';
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography,
    Container,
} from '@material-ui/core';
import useContratacao from 'data/hooks/pages/useContratacao.page';
import useIsMobile from 'data/hooks/useIsMobile';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import SideInformation from 'ui/components/data-display/SideInformation/SideInformation';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import { UserFormContainer } from 'ui/components/inputs/UserForm/UserForm';
import { PageFormContainer } from 'ui/components/inputs/UserForm/UserForm.style';
import Breadcrumb from 'ui/components/navigation/Breadcrumb/Breadcrumb';
import DetalhesServico from './_detalhes-servico';
import CadastroClinte, { LoginCliente } from './_cadastro-clinte';
import InformacoesPagamento from './_informacoes-pagamento';
import Link from 'ui/components/navigation/Link/Link';
import { TextFormatService } from 'data/services/TextFormatService';
import DataList from 'ui/components/data-display/DataList/DataList';

// import { Component } from './_contratacao.styled';

const Contratacao: React.FC = () => {
    const isMobile = useIsMobile(),
        {
            step,
            setStep,
            breadcrumItems,
            serviceForm,
            onServiceFormSubmit,
            servicos,
            hasLogin,
            setHasLogin,
            clientForm,
            onClientFormSubmit,
            loginForm,
            onLoginFormSubmit,
            loginError,
            setLoginError,
            onPaymentFormSubmit,
            paymentForm,
            tamanhoCasa,
            tipoLimpeza,
            totalPrice,
            podemosAtender,
        } = useContratacao(),
        dataAtendimento = serviceForm.watch('faxina.data_atendimento');

    if (!servicos || servicos.length < 1) {
        return (
            <Container sx={{ textAlign: 'center', my: 10 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <div>
            {!isMobile && <SafeEnvironment />}
            <Breadcrumb
                selected={breadcrumItems[step - 1]}
                items={breadcrumItems}
            />
            {!isMobile && [2, 3].includes(step) && (
                <DataList
                    header={
                        <Typography
                            color={'primary'}
                            sx={{ fontWeight: 'thin' }}
                        >
                            O valor total do serviço é:{' '}
                            {TextFormatService.currency(totalPrice)}
                        </Typography>
                    }
                    body={
                        <>
                            {tipoLimpeza?.nome}
                            <br />
                            Tamanho: {tamanhoCasa.join(', ')}
                            <br />
                            Data: {dataAtendimento}
                        </>
                    }
                />
            )}
            {step === 1 && (
                <PageTitle title={'Nos conte um pouco sobre o serviço !'} />
            )}
            {step === 2 && (
                <PageTitle
                    title={'Precisamos conhecer um pouco sobre você !'}
                    subtitle={
                        !hasLogin ? (
                            <span>
                                Caso já tenha cadastro,{' '}
                                <Button onClick={() => setHasLogin(true)}>
                                    clique aqui
                                </Button>
                            </span>
                        ) : (
                            <span>
                                Caso não tenha cadastro,{' '}
                                <Button onClick={() => setHasLogin(false)}>
                                    clique aqui
                                </Button>
                            </span>
                        )
                    }
                />
            )}
            <UserFormContainer>
                <PageFormContainer fullWidth={step === 4}>
                    <Paper sx={{ p: 4 }}>
                        <FormProvider {...serviceForm}>
                            <form
                                onSubmit={serviceForm.handleSubmit(
                                    onServiceFormSubmit
                                )}
                                hidden={step != 1}
                            >
                                <DetalhesServico
                                    servicos={servicos}
                                    comodos={tamanhoCasa.length}
                                    podemosAtender={podemosAtender}
                                />
                            </form>
                        </FormProvider>
                        <FormProvider {...clientForm}>
                            <form
                                onSubmit={clientForm.handleSubmit(
                                    onClientFormSubmit
                                )}
                                hidden={step != 2 || hasLogin}
                            >
                                <CadastroClinte onBack={() => setStep(1)} />
                            </form>
                        </FormProvider>
                        {step == 2 && hasLogin && (
                            <FormProvider {...loginForm}>
                                <form
                                    onSubmit={loginForm.handleSubmit(
                                        onLoginFormSubmit
                                    )}
                                >
                                    {loginError && (
                                        <Typography
                                            color={'error'}
                                            align={'center'}
                                            sx={{ mb: 2 }}
                                        >
                                            {loginError}dwadadad
                                        </Typography>
                                    )}
                                    <LoginCliente onBack={() => setStep(1)} />
                                </form>
                            </FormProvider>
                        )}

                        {step == 3 && (
                            <FormProvider {...clientForm}>
                                <form
                                    onSubmit={paymentForm.handleSubmit(
                                        onPaymentFormSubmit
                                    )}
                                >
                                    <InformacoesPagamento />
                                </form>
                            </FormProvider>
                        )}
                        {step == 4 && (
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    color={'secondary'}
                                    sx={{ fontSize: '82px' }}
                                >
                                    <i className={'twf-check-circle'} />
                                </Typography>
                                <Typography
                                    color={'secondary'}
                                    sx={{ fontSize: '22px', pb: 3 }}
                                >
                                    Pagamento realizado com sucesso !
                                </Typography>
                                <Typography
                                    variant={'body2'}
                                    color={'textSecondary'}
                                    sx={{
                                        maxWidth: '410px',
                                        mb: 3,
                                        mx: 'auto',
                                    }}
                                >
                                    Sua diária foi paga com sucesso! Já estamos
                                    procurando o(a) melhor profissional para
                                    atender sua residência. Caso nenhum(a)
                                    profissional seja encontrado(a), devolvemos
                                    seu dinheiro automaticamente 24 horas antes
                                    da data agendada. Você também pode cancelar
                                    a sua diária sem nenhuma multa até 24 horas
                                    antes da hora do agendamento.
                                </Typography>
                                <Link
                                    href={'/diarias'}
                                    Component={Button}
                                    mui={{
                                        color: 'secondary',
                                        variant: 'contained',
                                    }}
                                >
                                    Ir para minhas diárias
                                </Link>
                            </Box>
                        )}
                    </Paper>
                    {!isMobile && step !== 4 && (
                        <SideInformation
                            title={'Detalhes'}
                            items={[
                                {
                                    title: 'Tipo',
                                    description: [tipoLimpeza?.nome],
                                    icon: 'twf-check-circle',
                                },
                                {
                                    title: 'Tamanho',
                                    description: tamanhoCasa,
                                    icon: 'twf-check-circle',
                                },
                                {
                                    title: 'Data',
                                    description: [dataAtendimento as string],
                                    icon: 'twf-check-circle',
                                },
                            ]}
                            footer={{
                                text: TextFormatService.currency(totalPrice),
                                icon: 'twf-check-circle',
                            }}
                        />
                    )}
                </PageFormContainer>
            </UserFormContainer>
        </div>
    );
};

export default Contratacao;
