import { useState } from 'react';

export default function useEncontrarDiaristaPage() {
    const [podeContratar, setPodeContratar] = useState(false);

    return { podeContratar, setPodeContratar };
}
