import {
    CepResponse,
    CidadeInterface,
    EstadoInterface,
} from 'data/@types/EnderecoInterface';
import { ApiService } from './ApiService';

export const LocationService = {
    estados(): EstadoInterface[] {
        return [
            { nome: 'Acre', uf: 'AC' },
            { nome: 'Alagoas', uf: 'AL' },
            { nome: 'Amapá', uf: 'AP' },
            { nome: 'Amazonas', uf: 'AM' },
            { nome: 'Bahia', uf: 'BA' },
            { nome: 'Ceará', uf: 'CE' },
            { nome: 'Distrito Federal', uf: 'DF' },
            { nome: 'Espírito Santo', uf: 'ES' },
            { nome: 'Goiás', uf: 'GO' },
            { nome: 'Maranhão', uf: 'MA' },
            { nome: 'Mato Grosso', uf: 'MT' },
            { nome: 'Mato Grosso do Sul', uf: 'MS' },
            { nome: 'Minas Gerais', uf: 'MG' },
            { nome: 'Paraná', uf: 'PR' },
            { nome: 'Paraíba', uf: 'PB' },
            { nome: 'Pará', uf: 'PA' },
            { nome: 'Pernambuco', uf: 'PE' },
            { nome: 'Piauí', uf: 'PI' },
            { nome: 'Rio Grande do Norte', uf: 'RN' },
            { nome: 'Rio Grande do Sul', uf: 'RS' },
            { nome: 'Rio de Janeiro', uf: 'RJ' },
            { nome: 'Rondônia', uf: 'RO' },
            { nome: 'Roraima', uf: 'RR' },
            { nome: 'Santa Catarina', uf: 'SC' },
            { nome: 'Sergipe', uf: 'SE' },
            { nome: 'São Paulo', uf: 'SP' },
            { nome: 'Tocantins', uf: 'TO' },
        ];
    },
    async cidades(estado: string): Promise<CidadeInterface[] | undefined> {
        try {
            const response = await ApiService.request<
                { nome: string; id: number }[]
            >({
                baseURL:
                    'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
                url: `${estado}/municipios`,
            });

            return response.data.map((cidade) => ({
                cidade: cidade.nome,
                codigo_ibge: cidade.id,
            }));
        } catch (error) {}
    },
    async cep(cep: string): Promise<CepResponse | undefined> {
        try {
            const response = await ApiService.request<CepResponse>({
                url: 'api/enderecos?cep=' + cep.replace(/\D/g, ''),
            });

            return response.data;
        } catch (error) {}
    },
};
