import { TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { FinancialData } from '../UserForm.style';

export const FinancialForm = () => {
    const { register } = useFormContext();
    return (
        <FinancialData>
            <TextField
                label={'Chave PIX'}
                defaultValue={''}
                {...register('usuario.chave_pix', { minLength: 5 })}
            />
        </FinancialData>
    );
};
