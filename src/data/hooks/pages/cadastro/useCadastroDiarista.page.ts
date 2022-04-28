import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useCadastroDiarista() {
    const [step, setStep] = useState(1),
        breadcrumbItems = ['Identificação', 'Cidades atendidas'],
        userForm = useForm()

    return { step, breadcrumbItems,userForm};
}
