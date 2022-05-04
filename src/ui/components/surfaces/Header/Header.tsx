import React, { useState, useEffect } from 'react';
import {
    Container,
    Toolbar,
    IconButton,
    MenuList,
    MenuItem,
    Divider,
} from '@mui/material';
import useIsMobile from 'data/hooks/useIsMobile';
import RoundedButton from 'ui/components/inputs/RoudedButton/RoundedButton';
import Link from 'ui/components/navigation/Link/Link';
import {
    HeaderAppBar,
    HeaderLogo,
    ButtonsContainer,
    HeaderDrawer,
} from './Header.style';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import UserHeaderMenu from 'ui/components/navigation/UserHeaderMenu/UserHeaderMenu';
import UserProfileAvatar from 'ui/components/data-display/UserProfileAvatar/UserProfileAvatar';

export interface HeaderProps {
    user: UserInterface;
    onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    const isMobile = useIsMobile();

    return isMobile ? (
        <HeaderMobile {...props} />
    ) : (
        <HeaderDesktop {...props} />
    );
};

const HeaderDesktop: React.FC<HeaderProps> = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false),
        hasUser = props.user.nome_completo.length > 0,
        userType = props.user.tipo_usuario;

    return (
        <HeaderAppBar>
            <Toolbar component={Container}>
                <Link href={'/'}>
                    <HeaderLogo
                        src={'/img/logos/logo.svg'}
                        alt={'e-diaristas'}
                    />
                </Link>

                <ButtonsContainer>
                    {hasUser && (
                        <>
                            {userType === UserType.Diarista ? (
                                <Link
                                    href={'/oportunidades'}
                                    Component={RoundedButton}
                                >
                                    Oportunidades
                                </Link>
                            ) : (
                                <Link
                                    href={'/encontrar-diarista'}
                                    Component={RoundedButton}
                                >
                                    Encontrar Diarista
                                </Link>
                            )}
                            <Link href={'/diarias'} Component={RoundedButton}>
                                Diarias
                            </Link>
                            {userType === UserType.Diarista && (
                                <Link
                                    href={'/pagamentos'}
                                    Component={RoundedButton}
                                >
                                    Pagamentos
                                </Link>
                            )}
                        </>
                    )}
                </ButtonsContainer>
                <div>&nbsp;</div>

                {hasUser ? (
                    <UserHeaderMenu
                        user={props.user}
                        isMenuOpen={isMenuOpen}
                        onClick={() => setIsMenuOpen(true)}
                        onMenuClick={() => setIsMenuOpen(false)}
                        onMenuClose={() => setIsMenuOpen(false)}
                        onLogout={props.onLogout}
                    />
                ) : (
                    <ButtonsContainer>
                        <Link
                            href={'/cadastro/diarista'}
                            Component={RoundedButton}
                            mui={{ color: 'primary', variant: 'contained' }}
                        >
                            Seja um(a) diarista
                        </Link>
                        <Link href={'/login'} Component={RoundedButton}>
                            Login
                        </Link>
                    </ButtonsContainer>
                )}
            </Toolbar>
        </HeaderAppBar>
    );
};

const HeaderMobile: React.FC<HeaderProps> = (props) => {
    const hasUser = props.user.nome_completo.length > 0,
        userType = props.user.tipo_usuario;
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!hasUser) {
            setMenuOpen(false);
        }
    }, [hasUser]);
    return (
        <HeaderAppBar>
            <Toolbar component={Container}>
                <IconButton
                    edge={'start'}
                    color={'inherit'}
                    onClick={() => setMenuOpen(true)}
                >
                    <i className={'twf-bars'} />
                </IconButton>

                <Link href={'/'}>
                    <HeaderLogo
                        src={'/img/logos/logo.svg'}
                        alt={'e-diaristas'}
                    />
                </Link>

                <HeaderDrawer
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    onClick={() => setMenuOpen(false)}
                >
                    {hasUser ? (
                        <>
                            <UserProfileAvatar user={props.user} />
                            <MenuList>
                                {userType === UserType.Diarista ? (
                                    <Link
                                        href={'/oportunidades'}
                                        Component={MenuItem}
                                    >
                                        Oportunidades
                                    </Link>
                                ) : (
                                    <Link
                                        href={'/encontrar-diarista'}
                                        Component={MenuItem}
                                    >
                                        Encontrar Diarista
                                    </Link>
                                )}
                                <Link href={'/diarias'} Component={MenuItem}>
                                    Diarias
                                </Link>
                                {userType === UserType.Diarista && (
                                    <Link
                                        href={'/pagamentos'}
                                        Component={MenuItem}
                                    >
                                        Pagamentos
                                    </Link>
                                )}
                                <Divider />
                                <Link
                                    href={'/alterar-dados'}
                                    Component={MenuItem}
                                >
                                    Alterar dados
                                </Link>
                                <Link
                                    href={''}
                                    onClick={props.onLogout}
                                    Component={MenuItem}
                                >
                                    Sair
                                </Link>
                            </MenuList>
                        </>
                    ) : (
                        <MenuList>
                            <Link href={'/login'} Component={MenuItem}>
                                Login
                            </Link>

                            <Divider />

                            <Link
                                href={'/cadastro/diarista'}
                                Component={MenuItem}
                            >
                                Seja um(a) diarista
                            </Link>
                        </MenuList>
                    )}
                </HeaderDrawer>
            </Toolbar>
        </HeaderAppBar>
    );
};

export default Header;
