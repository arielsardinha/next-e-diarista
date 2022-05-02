import { Oportunidade } from 'data/@types/OportunidadeInterface';
import useIsMobile from '../useIsMobile';
import usePagination from '../usePagination.hook';

export default function useOportunidadesTrabalho() {
    const isMobile = useIsMobile(),
        oportunidades = [] as Oportunidade[],
        { currentPage, setCurrentPage, totalPages, itemsPorPage } =
            usePagination(oportunidades || [], 5);
    return {
        isMobile,
        oportunidades,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPorPage,
    };
}
