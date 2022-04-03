import pagarme, { CardInterface, CardValidateInterface } from 'pagarme';

const encryption_key = process.env.PAGARME_ENCRYPTION_KEY;

export const PaymentService = {
    validate(card: CardInterface): CardValidateInterface {
        return pagarme.validate({ card }).card;
    },

    getHash(card: CardInterface): Promise<string> {
        return pagarme.client
            .connect({ encryption_key: encryption_key })
            .then((client) => client.security.encrypt(card));
    },
};
