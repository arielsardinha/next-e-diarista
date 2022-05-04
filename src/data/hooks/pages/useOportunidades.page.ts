import { Oportunidade } from 'data/@types/OportunidadeInterface';
import { UserContext } from 'data/contexts/UserContext';
import { useContext, useState } from 'react';
import { useApiHateoas } from '../useApi.hook';
import useIsMobile from '../useIsMobile';
import usePagination from '../usePagination.hook';

export default function useOportunidadesTrabalho() {
    const isMobile = useIsMobile(),
        { userState } = useContext(UserContext),
        oportunidades =
            useApiHateoas<Oportunidade[]>(
                userState.user.links,
                'lista_oportunidades'
            ).data || ([] as Oportunidade[]),
        { currentPage, setCurrentPage, totalPages, itemsPorPage } =
            usePagination(oportunidades || [], 5),
        [oportunidadeSelecionada, setOportunidadeSelecionada] =
            useState<Oportunidade>(),
        [mensagemSnackbar, setMensagemSnackbar] = useState<string>('');

    function totalComodos(oportunidade: Oportunidade) {
        let total = 0;
        total += oportunidade.quantidade_banheiros;
        total += oportunidade.quantidade_cozinhas;
        total += oportunidade.quantidade_outros;
        total += oportunidade.quantidade_quartos;
        total += oportunidade.quantidade_quintais;
        total += oportunidade.quantidade_salas;
        return total;
    }

    function seCandidatar(oportunidade: Oportunidade) {}

    return {
        isMobile,
        oportunidades,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPorPage,
        oportunidadeSelecionada,
        setOportunidadeSelecionada,
        seCandidatar,
        mensagemSnackbar,
        setMensagemSnackbar,
        totalComodos
    };
}
