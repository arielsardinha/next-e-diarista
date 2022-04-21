import { EnderecoInterface } from 'data/@types/EnderecoInterface';
import { ValidationError } from 'yup';

const CurrencyFormatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
});

export const TextFormatService = {
    reverseDate(date: string): string {
        if (date.includes('/')) {
            return date.split('/').reverse().join('-');
        }

        if (date.includes('T')) {
            [date] = date.split('T');
        }
        return date.split('-').reverse().join('/');
    },

    currency(price = 0): string {
        if (isNaN(price)) {
            price = 0;
        }
        return CurrencyFormatter.format(price);
    },
    dataToString(date: Date, withTime = false): string {
        const time = date.toISOString();
        if (withTime) {
            return time.substring(0, 19);
        }
        return time.substring(0, 10);
    },

    getNumbersFromText(text: string = ''): string {
        return text.replace(/\D/g, '');
    },

    getAddress(endereco: EnderecoInterface): string {
        let enderecoFormatado = '';
        enderecoFormatado += convert(endereco.logradouro, 'virgula');
        enderecoFormatado += convert(endereco.numero, 'traco');
        enderecoFormatado += convert(endereco.bairro, 'virgula');
        enderecoFormatado += convert(endereco.cidade, 'traco');
        enderecoFormatado += convert(endereco.estado, '');

        function convert(
            value: string | undefined,
            type: 'virgula' | 'traco' | ''
        ): string {
            if (value) {
                switch (type) {
                    case 'virgula':
                        return `${value}, `;
                    case 'traco':
                        return `${value}- `;
                    case '':
                        return `${value}`;
                }
            }
            return '';
        }

        return enderecoFormatado;
    },
};
