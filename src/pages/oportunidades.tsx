import React from 'react';
import { GetStaticProps } from 'next';
import useOportunidadesTrabalho from 'data/hooks/pages/useOportunidades.page';
import {
    Box,
    Container,
    Divider,
    Snackbar,
    Typography,
} from '@material-ui/core';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import DataList from 'ui/components/data-display/DataList/DataList';
import Table, {
    TableRow,
    TableCell,
    TablePagination,
} from 'ui/components/data-display/Table/Table';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import JobInformation from 'ui/components/data-display/JobInformation/JobInformation';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import { TextFormatService } from 'data/services/TextFormatService';

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
        oportunidadeSelecionada,
        setOportunidadeSelecionada,
        seCandidatar,
        mensagemSnackbar,
        setMensagemSnackbar,
        totalComodos,
    } = useOportunidadesTrabalho();
    return (
        <>
            <Container sx={{ mb: 5, p: 0 }}>
                <PageTitle title={'Oportunidades de trabalho'} />
                {oportunidades.length > 0 ? (
                    isMobile ? (
                        <>
                            {oportunidades.map((item) => (
                                <DataList
                                    key={item.id}
                                    header={
                                        <>
                                            Data:{' '}
                                            {TextFormatService.reverseDate(
                                                item.data_atendimento as string
                                            )}
                                            <br />
                                            {item.nome_servico}
                                            <br />
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </>
                                    }
                                    body={
                                        <>
                                            Cidade: {item.cidade} <br /> Número
                                            de cômodos: {totalComodos(item)}
                                        </>
                                    }
                                />
                            ))}
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
                                data={oportunidades}
                                itemsPorPage={itemsPorPage}
                                currentPage={currentPage}
                                rowElement={(item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <strong>
                                                {TextFormatService.reverseDate(
                                                    item.data_atendimento as string
                                                )}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            {item.nome_servico}
                                        </TableCell>
                                        <TableCell>
                                            {totalComodos(item)} cômodos
                                        </TableCell>
                                        <TableCell>
                                            {item.cidade} - {item.estado}
                                        </TableCell>
                                        <TableCell>
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </TableCell>
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
            {oportunidadeSelecionada && (
                <Dialog
                    isOpen={oportunidadeSelecionada !== undefined}
                    title={'Se candidatar à diária'}
                    subtitle={
                        'Tem certeza que deseja se candidatar à diária abaixo ?'
                    }
                    onClose={() => setOportunidadeSelecionada(undefined)}
                    onConfirm={() => seCandidatar(oportunidadeSelecionada)}
                >
                    <Box>
                        <JobInformation>
                            <>
                                <div>
                                    Data: <strong>01/01/2022</strong>
                                </div>
                                <div>Praça da sé, 1B - Sé, São paulo - SP</div>
                                <div>
                                    <strong>Valor: R$ 140,00</strong>
                                </div>
                            </>
                        </JobInformation>
                    </Box>
                    <UserInformation
                        name={'Ariel'}
                        rating={3}
                        picture={'https://github.com/arielsardinha.png'}
                    />
                    <Divider />
                    {oportunidadeSelecionada?.avaliacoes_cliente.length > 0 && (
                        <>
                            <Typography
                                sx={{
                                    p: 3,
                                    fontWeight: 'medium',
                                    bgcolor: 'grey.50',
                                }}
                            >
                                Última avaliação do cliente
                            </Typography>
                            <UserInformation
                                name={'Ariel'}
                                rating={3}
                                picture={'https://github.com/arielsardinha.png'}
                                isRating={true}
                                description={'Algum texto'}
                            />
                        </>
                    )}
                    <Typography
                        sx={{ py: 2 }}
                        variant={'subtitle2'}
                        color={'textSecondary'}
                    >
                        Ao se candidatar você ainda não é o(a) diarista
                        escolhido(a) para realizar o trabalho. Vamos analisar
                        suas qualificações e a distância para o local da diária.
                        Caso você seja a pessoa selecionada, receberá um email
                        avisando. Atente-se à sua caixa de entrada!
                    </Typography>
                </Dialog>
            )}
            <Snackbar
                open={mensagemSnackbar.length > 0}
                message={mensagemSnackbar}
                autoHideDuration={4000}
                onClose={() => setMensagemSnackbar('')}
            />
        </>
    );
};

export default Oportunidades;
