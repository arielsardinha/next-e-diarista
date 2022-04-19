import { DiariaContext } from 'data/contexts/DiariasContext';
import useIsMobile from 'data/hooks/useIsMobile';
import { useContext } from 'react';

export default function useMinhasDiarias() {
    const isMobile = useIsMobile(),
        { diariasState } = useContext(DiariaContext),
        { diarias } = diariasState;

    return {
        isMobile,
    };
}
