import { useState } from 'react';
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

export default function useContratacao() {
    const [step, setStep] = useState(3),
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
        servicos: ServicoInterface[] = [
            {
                id: 5,
                nome: 'Limpeza Comum',
                icone: 'twf-cleaning-1',
                horas_banheiro: 1,
                horas_cozinha: 1,
                horas_quarto: 1,
                horas_quintal: 1,
                horas_sala: 1,
                porcentagem_comissao: 10,
                qtd_horas: 2,
                valor_banheiro: 20,
                valor_cozinha: 20,
                valor_minimo: 33,
                valor_outros: 20,
                valor_quarto: 20,
                valor_quintal: 20,
                valor_sala: 20,
            },
        ];

    function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {
        console.log(data);
    }

    function onClientFormSubmit(data: CadastroClienteFormDataInterface) {
        console.log(data);
    }

    function onLoginFormSubmit(data: LoginFormDataInterface) {
        console.log(data);
    }

    function onPaymentFormSubmit(data: PagamentoFormDataInterface) {
        console.log(data);
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
    };
}