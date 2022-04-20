import { DiariaInterface } from 'data/@types/DiariaInterface';
import { DiariaContext } from 'data/contexts/DiariasContext';
import useIsMobile from 'data/hooks/useIsMobile';
import usePagination from 'data/hooks/usePagination.hook';
import { linksResolver } from 'data/services/ApiService';
import { useContext } from 'react';

export default function useMinhasDiarias() {
    const isMobile = useIsMobile(),
        { diariasState } = useContext(DiariaContext),
        { diarias } = diariasState,
        filterdData = diarias,
        { currentPage, setCurrentPage, totalPages, itemsPorPage } =
            usePagination(diarias, 5);

    function podeVisualizar(diaria: DiariaInterface): boolean {
        return linksResolver(diaria.links, 'self') != undefined;
    }

    return {
        filterdData,
        isMobile,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPorPage,
        podeVisualizar
    };
}
