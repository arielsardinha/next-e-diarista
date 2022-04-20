import { useMemo, useState } from 'react';

export default function usePagination(itemsList: unknown[], itemsPorPage = 10) {
    const [currentPage, setCurrentPage] = useState(1),
        totalPages = useMemo(() => {
            if (itemsList.length > itemsPorPage) {
                return Math.ceil(itemsList.length / itemsPorPage);
            }
            return 1;
        }, [itemsList, itemsPorPage]);
    return { currentPage, setCurrentPage, totalPages, itemsPorPage };
}
