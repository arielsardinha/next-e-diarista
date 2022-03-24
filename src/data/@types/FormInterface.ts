import { DiariaInterface } from './DiariaInterface';
import { EnderecoInterface } from './EnderecoInterface';
import { UserInterface } from './UserInterface';

export interface NovaDiariaFormDataInterface {
    endereco: EnderecoInterface;
    faxina: DiariaInterface;
}

export interface CadastroClienteFormDataInterface {
    usuario: UserInterface;
}
