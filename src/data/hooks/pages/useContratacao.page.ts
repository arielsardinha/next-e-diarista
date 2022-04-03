import { useState, useMemo, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import {
    CadastroClienteFormDataInterface,
    LoginFormDataInterface,
    NovaDiariaFormDataInterface,
    PagamentoFormDataInterface,
} from 'data/@types/FormInterface';
import { ServicoInterface } from 'data/@types/ServicoInterface';
import useApi, { useApiHateoas } from '../useApi.hook';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import { ValidationService } from 'data/services/ValidationService';
import { DateService } from 'data/services/DateService';
import { houseParts } from '@partials/encontrar-diarista/_detalhes-servico';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import {
    ApiService,
    ApiServiceHateoas,
    linksResolver,
} from 'data/services/ApiService';
import { UserContext } from 'data/contexts/UserContext';
import { UserInterface } from 'data/@types/UserInterface';
import { TextFormatService } from 'data/services/TextFormatService';
import { LoginService } from 'data/services/LoginService';

export default function useContratacao() {
    const [step, setStep] = useState(1),
        [hasLogin, setHasLogin] = useState(false),
        [loginError, setLoginError] = useState(''),
        breadcrumItems = ['Detalhes da diária', 'Idntificação', 'Pagamento'],
        serviceForm = useForm<NovaDiariaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.address().concat(
                    FormSchemaService.detalheServico()
                )
            ),
        }),
        clientForm = useForm<CadastroClienteFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.userData().concat(
                    FormSchemaService.newContact()
                )
            ),
        }),
        loginForm = useForm<LoginFormDataInterface>({
            resolver: yupResolver(FormSchemaService.login()),
        }),
        paymentForm = useForm<PagamentoFormDataInterface>({
            resolver: yupResolver(FormSchemaService.payment()),
        }),
        { externalServicesState } = useContext(ExternalServicesContext),
        { userState, userDispatch } = useContext(UserContext),
        servicos = useApiHateoas<ServicoInterface[]>(
            externalServicesState.externalServices,
            'listar_servicos'
        ).data,
        dadosFaxina = serviceForm.watch('faxina'),
        cepFaxina = serviceForm.watch('endereco.cep'),
        [podemosAtender, setPodemosAtender] = useState(true),
        [novaDiaria, setNovaDiaria] = useState({} as DiariaInterface),
        tipoLimpeza = useMemo<ServicoInterface>(() => {
            if (servicos && dadosFaxina?.servico) {
                const selectedService = servicos.find(
                    (service) => service.id === dadosFaxina.servico
                );
                if (selectedService) {
                    return selectedService;
                }
            }
            return {} as ServicoInterface;
        }, [servicos, dadosFaxina]),
        { tamanhoCasa, totalPrice, totalTime } = useMemo<{
            tamanhoCasa: string[];
            totalPrice: number;
            totalTime: number;
        }>(
            () => ({
                tamanhoCasa: listarComodos(dadosFaxina),
                totalPrice: calcularPreco(dadosFaxina, tipoLimpeza),
                totalTime: calcularTempoServico(dadosFaxina, tipoLimpeza),
            }),
            //eslint-disable-next-line
            [
                tipoLimpeza,
                dadosFaxina,
                dadosFaxina?.quantidade_Quartos,
                dadosFaxina?.quantidade_salas,
                dadosFaxina?.quantidade_cozinhas,
                dadosFaxina?.quantidade_banheiros,
                dadosFaxina?.quantidade_quintais,
                dadosFaxina?.quantidade_outros,
            ]
        );
    useEffect(() => {
        const cep = ((cepFaxina as string) || '')?.replace(/\D/g, '');
        if (ValidationService.cep(cep)) {
            ApiServiceHateoas(
                externalServicesState.externalServices,
                'verificar_disponibilidade_atendimento',
                (request) => {
                    request<{ disponibilidade: boolean }>({
                        params: { cep },
                    })
                        .then((response) => {
                            setPodemosAtender(response.data.disponibilidade);
                        })
                        .catch((_error) => {
                            setPodemosAtender(false);
                        });
                }
            );
        } else {
            setPodemosAtender(true);
        }
    }, [cepFaxina]);

    useEffect(
        () => {
            if (
                dadosFaxina &&
                ValidationService.hora(dadosFaxina.hora_inicio) &&
                totalTime >= 0
            ) {
                serviceForm.setValue(
                    'faxina.hora_termino',
                    DateService.addHours(
                        dadosFaxina?.hora_inicio as string,
                        totalTime
                    ),
                    { shouldValidate: true }
                );
            } else {
                serviceForm.setValue('faxina.hora_termino', '');
            }
        },
        //eslint-disable-next-line
        [dadosFaxina?.hora_inicio, totalTime]
    );

    function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {
        if (userState.user.nome_completo) {
            criarDiaria(userState.user);
        } else {
            setStep(2);
        }
    }

    async function onLoginFormSubmit(data: { login: LoginFormDataInterface }) {
        const loginSucess = await login(data.login);
        if (loginSucess) {
            const user = await LoginService.getUser();
            if (user) {
                criarDiaria(user);

                setStep(3);
            }
        }
    }

    async function login(
        credentials: LoginFormDataInterface
    ): Promise<boolean> {
        const loginSucess = await LoginService.login(credentials);
        if (loginSucess) {
            const user = await LoginService.getUser();
            userDispatch({ type: 'SET_USER', payload: user });
        } else {
            setLoginError('E-mail e/ou Senha inválidos');
        }
        return loginSucess;
    }

    function onClientFormSubmit(data: CadastroClienteFormDataInterface) {
        console.log(data);
    }

    function onPaymentFormSubmit(data: PagamentoFormDataInterface) {
        console.log(data);
    }

    function listarComodos(dadosFaxina: DiariaInterface): string[] {
        const comodos: string[] = [];
        if (dadosFaxina) {
            houseParts.forEach((housePart) => {
                const total = dadosFaxina[
                    housePart.name as keyof DiariaInterface
                ] as number;
                if (total > 0) {
                    const nome =
                        total > 1 ? housePart.plural : housePart.singular;
                    comodos.push(`${total} ${nome}`);
                }
            });
        }
        return comodos;
    }

    function calcularTempoServico(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                tipoLimpeza.horas_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                tipoLimpeza.horas_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.horas_quarto * dadosFaxina.quantidade_Quartos;
            total +=
                tipoLimpeza.horas_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.horas_sala * dadosFaxina.quantidade_salas;
            total += tipoLimpeza.horas_outros * dadosFaxina.quantidade_outros;
        }
        return total;
    }
    function calcularPreco(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                tipoLimpeza.valor_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                tipoLimpeza.valor_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.valor_outros * dadosFaxina.quantidade_outros;
            total += tipoLimpeza.valor_quarto * dadosFaxina.quantidade_Quartos;
            total +=
                tipoLimpeza.valor_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.valor_sala * dadosFaxina.quantidade_salas;
        }

        return Math.max(total, tipoLimpeza.valor_minimo);
    }

    async function criarDiaria(user: UserInterface) {
        if (user.nome_completo) {
            const serviceData = serviceForm.getValues();
            ApiServiceHateoas(
                user.links,
                'cadastrar_diaria',
                async (request) => {
                    try {
                        const novaDiaria = (
                            await request<DiariaInterface>({
                                data: {
                                    ...serviceData.endereco,
                                    ...serviceData.faxina,
                                    cep: TextFormatService.getNumberFromText(
                                        serviceData.endereco.cep
                                    ),
                                    preco: totalPrice,
                                    tempo_atendimento:
                                        TextFormatService.reverseDate(
                                            (serviceData.faxina
                                                .data_atendimento as string) +
                                                'T' +
                                                serviceData.faxina.hora_inicio
                                        ),
                                },
                            })
                        ).data;

                        if (novaDiaria) {
                            setStep(3);
                            setNovaDiaria(novaDiaria);
                        }
                    } catch (error) {}
                }
            );
        }
    }

    return {
        step,
        setStep,
        breadcrumItems,
        serviceForm,
        onServiceFormSubmit,
        clientForm,
        onClientFormSubmit,
        loginForm,
        onLoginFormSubmit,
        servicos,
        hasLogin,
        setHasLogin,
        loginError,
        setLoginError,
        onPaymentFormSubmit,
        paymentForm,
        tamanhoCasa,
        tipoLimpeza,
        totalPrice,
        podemosAtender,
    };
}
