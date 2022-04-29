import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { EnderecoInterface } from 'data/@types/EnderecoInterface';
import { CadastroDiaristaFormDataInterface } from 'data/@types/FormInterface';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import {
    ApiService,
    ApiServiceHateoas,
    linksResolver,
} from 'data/services/ApiService';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { LocalStorage } from 'data/services/StorageService';
import { TextFormatService } from 'data/services/TextFormatService';
import { UserService } from 'data/services/UserService';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useCadastroDiarista() {
    const [step, setStep] = useState(1),
        breadcrumbItems = ['Identificação', 'Cidades atendidas'],
        userForm = useForm<CadastroDiaristaFormDataInterface>({
            resolver: FormSchemaService.userData()
                .concat(FormSchemaService.address())
                .concat(FormSchemaService.newContact()),
        }),
        addressListForm = useForm<CadastroDiaristaFormDataInterface>(),
        [isWaitingResponse, setIsWaitingResponse] = useState(false),
        [newUser, setNewUser] = useState<UserInterface>(),
        [newAddress, setNewAddress] = useState<EnderecoInterface>(),
        { externalServicesState } = useContext(ExternalServicesContext),
        [sucessoCadastro, setSucessoCadastro] = useState(false),
        enderecosAtendidos = addressListForm.watch('enderecosAtendidos');

    async function onUserSubmit(data: CadastroDiaristaFormDataInterface) {
        setIsWaitingResponse(true);
        const newUserLink = linksResolver(
            externalServicesState.externalServices,
            'cadastrar_usuario'
        );

        if (newUserLink) {
            try {
                await cadastrarUsuario(data, newUserLink);
            } catch (error) {
                handleUserError(error);
            }
        }
    }

    function handleUserError(error: any) {
        UserService.handleNewUserError(error, userForm);
        setIsWaitingResponse(false);
    }

    async function cadastrarUsuario(
        data: CadastroDiaristaFormDataInterface,
        link: ApiLinksInterface
    ) {
        const newUser = await UserService.cadastrar(
            data.usuario,
            UserType.Diarista,
            link
        );

        if (newUser) {
            setNewUser(newUser);
            cadastrarEndereco(data, newUser);
            setIsWaitingResponse(false);
            setStep(2);
        }
    }

    function cadastrarEndereco(
        data: CadastroDiaristaFormDataInterface,
        newUser: UserInterface
    ) {
        ApiService.defaults.headers.Authorization =
            'Bearer' + newUser?.token?.access;

        LocalStorage.set('token', newUser?.token?.access);
        LocalStorage.set('token_refresh', newUser);

        ApiServiceHateoas(
            newUser.links,
            'cadastrar_endereco',
            async (request) => {
                const newAddress = (
                    await request<EnderecoInterface>({
                        data: {
                            ...data.endereco,
                            cep: TextFormatService.getNumbersFromText(
                                data?.endereco?.cep
                            ),
                        },
                    })
                ).data;

                newAddress && setNewAddress(newAddress);
            }
        );
    }

    async function onAddressSubmit(data: CadastroDiaristaFormDataInterface) {
        if (newUser) {
            ApiServiceHateoas(
                newUser.links,
                'relacionar_cidades',
                async (request) => {
                    try {
                        setIsWaitingResponse(true);
                        await request<any>({
                            data: { cidades: data?.enderecosAtendidos },
                        });
                        setSucessoCadastro(true);
                    } catch (error) {}
                }
            );
        }
    }

    return {
        step,
        breadcrumbItems,
        userForm,
        addressListForm,
        isWaitingResponse,
        sucessoCadastro,
        enderecosAtendidos,
        onUserSubmit,
        onAddressSubmit,
        newAddress,
    };
}
