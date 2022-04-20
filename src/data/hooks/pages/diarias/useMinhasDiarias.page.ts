import { DiariaContext } from 'data/contexts/DiariasContext';
import useIsMobile from 'data/hooks/useIsMobile';
import usePagination from 'data/hooks/usePagination.hook';
import { useContext } from 'react';

export default function useMinhasDiarias() {
    const isMobile = useIsMobile(),
        { diariasState } = useContext(DiariaContext),
        { diarias } = diariasState,
        filterdData = diarias,
        { currentPage, setCurrentPage, totalPages, itemsPorPage } =
            usePagination(diarias, 5);

    return {
        filterdData,
        isMobile,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPorPage,
    };
}
