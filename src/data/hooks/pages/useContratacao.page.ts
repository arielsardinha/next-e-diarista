import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { NovaDiariaFormDataInterface } from 'data/@types/FormInterface';

export default function useContratacao() {
    const [step, setStep] = useState(1),
        breadcrumItems = ['Detalhes da diária', 'Idntificação', 'Pagamento'],
        serviceForm = useForm<NovaDiariaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.address().concat(
                    FormSchemaService.detalheServico()
                )
            ),
        });

    return { step, breadcrumItems };
}
