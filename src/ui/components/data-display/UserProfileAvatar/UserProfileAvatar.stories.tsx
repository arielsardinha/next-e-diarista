import { ComponentMeta, ComponentStory } from '@storybook/react';
import { UserType } from 'data/@types/UserInterface';

import UserProfileAvatar from './UserProfileAvatar';

export default {
    title: 'data-display/UserProfileAvatar',
    component: UserProfileAvatar,
    argTypes: {},
} as ComponentMeta<typeof UserProfileAvatar>;

const Template: ComponentStory<typeof UserProfileAvatar> = (args) => (
    <UserProfileAvatar {...args} />
);

export const Default = Template.bind({});
Default.args = {
    user: {
        nome_completo: 'Ariel Sardinha',
        nascimento: '1993-16-04',
        cpf: '99999999999',
        email: 'ariel@treinaweb.com',
        foto_usuario: 'https://github.com.br/arielsardinha.png',
        telefone: '(99) 99999-9999',
        tipo_usuario: UserType.Cliente,
        reputacao: 0,
        password: '',
        chave_pix: '',
    },
};
