import { useState } from 'react';

export default function useCadastroDiarista() {
    const [step, setStep] = useState(1),
        breadcrumbItems = ['Identificação', 'Cidades atendidas'];

    return { step, breadcrumbItems };
}
