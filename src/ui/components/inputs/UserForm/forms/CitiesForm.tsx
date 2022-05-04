import {
    Autocomplete,
    CircularProgress,
    TextField,
    Typography,
} from '@mui/material';
import { CidadeInterface } from 'data/@types/EnderecoInterface';
import useCitiesForm from 'data/hooks/components/inputs/UserForm/forms/useCitiesForm';
import ChipField from 'ui/components/data-display/ChipField/ChipField';
import { CitiesSelection } from '../UserForm.style';

export const CitiesForm: React.FC<{ estado: string }> = ({ estado }) => {
    const { options, handleNewCity, handleDelete, citiesList, citiesName } =
        useCitiesForm(estado);
    return (
        <CitiesSelection>
            <Autocomplete
                value={{ cidade: '' } as CidadeInterface}
                onChange={(_ev, newValue) =>
                    newValue && handleNewCity(newValue.cidade)
                }
                disablePortal
                options={options}
                getOptionLabel={(option) => option.cidade}
                loading={citiesList.length === 0}
                loadingText={'Carregando cidades...'}
                style={{ gridArea: 'busca-cidade' }}
                noOptionsText={'Nenhuma cidade com esse nome'}
                renderInput={({ InputProps, ...params }) => (
                    <TextField
                        label={'Busque pelo nome da cidade'}
                        {...params}
                        inputProps={{
                            ...InputProps,
                            endAdornment: (
                                <>
                                    {citiesList.length ? (
                                        <i className={'twf-search'} />
                                    ) : (
                                        <CircularProgress
                                            size={20}
                                            color={'inherit'}
                                        />
                                    )}
                                    {InputProps.endAdornment}
                                </>
                            ),
                        }}
                        required={false}
                    />
                )}
            />
            <Typography>Cidades selecionadas</Typography>
            <ChipField
                itemsList={citiesName}
                onDelete={handleDelete}
                emptyMessage={'Nenhuma cidade selecionada ainda'}
            />
        </CitiesSelection>
    );
};
