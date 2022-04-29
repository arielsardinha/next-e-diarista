import useCitiesForm from 'data/hooks/components/inputs/UserForm/forms/useCitiesForm';
import { CitiesSelection } from '../UserForm.style';

export const CitiesForm: React.FC<{ estado: string }> = ({ estado }) => {
    const {
        options,
        handleNewCity,
        handleDelete,
        citiesList: listaCidades,
        citiesName,
    } = useCitiesForm(estado);
    return <CitiesSelection></CitiesSelection>;
};
