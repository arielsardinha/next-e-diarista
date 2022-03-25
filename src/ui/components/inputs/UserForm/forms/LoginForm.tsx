import { useFormContext } from 'react-hook-form';
import Link from 'ui/components/navigation/Link/Link';
import { TextFieldStyled } from '../../TextField/TextField.style';
import { LoginData } from '../UserForm.style';

export const LoginForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <LoginData>
            <TextFieldStyled
                label={'E-mail'}
                type={'email'}
                {...register('login.email')}
                helperText={errors?.login?.email !== undefined}
            />
            <TextFieldStyled
                label={'Senha'}
                type={'password'}
                {...register('login.password')}
                helperText={errors?.login?.password !== undefined}
            />
            <Link href="/recuperar-senha">Esqueci minha senha</Link>
        </LoginData>
    );
};
