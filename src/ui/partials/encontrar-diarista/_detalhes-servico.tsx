import React from 'react';
import { AddressForm } from 'ui/components/inputs/UserForm/UserForm';
import { ServicoInterface } from 'data/@types/ServicoInterface';
import {
    Typography,
    Divider,
    Tooltip,
    Button,
    Container,
} from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';
import ToggleButtonGroup, {
    ToggleButton,
} from 'ui/components/inputs/ToggleButtonGroup/ToggleButtonGroup';
import ItemCounter from 'ui/components/inputs/ItemCounter/ItemCounter';

import { ItemsContainer } from './_detalhes-servico.styled';
import TextFieldMaskStories from 'ui/components/inputs/TextFieldMask/TextFieldMask.stories';
import TextFieldMask from 'ui/components/inputs/TextFieldMask/TextFieldMask';
import { TextFieldStyled } from 'ui/components/inputs/TextField/TextField.style';
interface DetalhesServicoProps {
    servicos?: ServicoInterface[];
    podemosAtender?: boolean;
    comodos?: number;
}

export const houseParts = [
    {
        singular: 'Cozinha',
        plural: 'Cozinhas',
        name: 'quantidade_cozinhas',
    },
    {
        singular: 'Sala',
        plural: 'Salas',
        name: 'quantidade_salas',
    },
    {
        singular: 'Banheiro',
        plural: 'Banheiros',
        name: 'quantidade_banheiros',
    },
    {
        singular: 'Quarto',
        plural: 'Quartos',
        name: 'quantidade_Quartos',
    },
    {
        singular: 'Quintal',
        plural: 'Quintais',
        name: 'quantidade_quintais',
    },
    {
        singular: 'Outros',
        plural: 'Outros',
        name: 'quantidade_outros',
    },
];

const DetalhesServico: React.FC<DetalhesServicoProps> = ({
    servicos = [],
    comodos = 0,
    podemosAtender,
}) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    return (
        <>
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Qual tipo de limpeza você precisa ?
            </Typography>
            <Controller
                name={'faxina.servico'}
                defaultValue={servicos[0].id}
                control={control}
                render={({ field }) => (
                    <ToggleButtonGroup
                        exclusive
                        value={field.value}
                        onChange={(_event, value) =>
                            field.onChange(value || servicos[0].id)
                        }
                    >
                        {servicos.map((servico) => (
                            <ToggleButton value={servico.id} key={servico.id}>
                                <i
                                    className={
                                        servico.icone || 'twf-cleaning-1'
                                    }
                                />{' '}
                                {servico.nome}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                )}
            />
            <Divider sx={{ my: 5 }} />
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Qual o tamanho da sua casa ?
            </Typography>
            <ItemsContainer>
                {houseParts.map((item) => (
                    <Controller
                        key={item.name}
                        name={'faxina.' + item.name}
                        defaultValue={0}
                        control={control}
                        render={({ field }) => (
                            <ItemCounter
                                label={item.singular}
                                plural={item.plural}
                                counter={field.value}
                                onInc={() => field.onChange(field.value + 1)}
                                onDec={() =>
                                    field.onChange(Math.max(0, field.value - 1))
                                }
                            />
                        )}
                    />
                ))}
            </ItemsContainer>
            <Divider sx={{ my: 5 }} />
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Qual data você gostaria de receber o/a diarista ?
            </Typography>
            <ItemsContainer>
                <Controller
                    name={'faxina.data_atendimento'}
                    defaultValue={''}
                    control={control}
                    render={({ field: { ref, ...inputProps } }) => (
                        <TextFieldMask
                            {...inputProps}
                            inputRef={ref}
                            mask={'99/99/9999'}
                            label={'Data'}
                            error={
                                errors?.faxina?.data_atendimento !== undefined
                            }
                            helperText={
                                errors?.faxina?.data_atendimento?.message
                            }
                        />
                    )}
                />

                <Controller
                    name={'faxina.hora_inicio'}
                    defaultValue={''}
                    control={control}
                    render={({ field: { ref, ...inputProps } }) => (
                        <TextFieldMask
                            {...inputProps}
                            inputRef={ref}
                            mask={'99:99'}
                            label={'Hora Início'}
                            error={errors?.faxina?.hora_inicio !== undefined}
                            helperText={errors?.faxina?.hora_inicio?.message}
                        />
                    )}
                />
                <Controller
                    name={'faxina.hora_termino'}
                    defaultValue={''}
                    control={control}
                    render={({ field: { ref, ...inputProps } }) => (
                        <Tooltip title={'Campo automático'}>
                            <div>
                                <TextFieldMask
                                    fullWidth
                                    {...inputProps}
                                    inputRef={ref}
                                    mask={'99:99'}
                                    inputProps={{
                                        readOnly: true,
                                        disable: true,
                                    }}
                                    label={'Hora Término'}
                                    error={
                                        errors?.faxina?.data_atendimento !==
                                        undefined
                                    }
                                    helperText={
                                        errors?.faxina?.data_atendimento
                                            ?.message
                                    }
                                />
                            </div>
                        </Tooltip>
                    )}
                />
            </ItemsContainer>
            <Divider sx={{ my: 5 }} />

            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Obervações
            </Typography>
            <TextFieldStyled
                label={'Quer acrescentar algum detalhe ?'}
                {...register('faxina.observacoes')}
                fullWidth
                multiline
            />
            <Divider sx={{ my: 5 }} />
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Qual endereço será realizado a limpeza ?
            </Typography>
            <AddressForm />
            {!podemosAtender && (
                <Typography color={'error'} sx={{ pb: 2 }} align={'center'}>
                    Infelizmnte ainda não atendemos na sua região
                </Typography>
            )}
            <Container sx={{ textAlign: 'right' }}>
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    type={'submit'}
                    disabled={comodos == 0 || !podemosAtender}
                >
                    Ir para identificação
                </Button>
            </Container>
        </>
    );
};

export default DetalhesServico;
