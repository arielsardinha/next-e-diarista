import { Oportunidade } from 'data/@types/OportunidadeInterface';
import useIsMobile from '../useIsMobile';

export default function useOportunidadesTrabalho() {
    const isMobile = useIsMobile(),
    oportunidades = [] as Oportunidade[];
    return { isMobile,oportunidades };
}
