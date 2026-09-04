import React from 'react'
import { XIcon } from '@phosphor-icons/react'

import { useMenu } from '@/common/hooks'
import { Button } from '@/common/components/button/Button'
import type { MenuSidebarProps } from '@/common/types'

export const MenuSidebar: React.FC<MenuSidebarProps> = ({
    title = 'Mi Evento',
}) => {
    const { isMenuOpen, onCloseMenu, activeTitle } = useMenu()

    const overlayClass = `menu-overlay ${isMenuOpen ? 'menu-overlay--open' : ''}`
    const sidebarClass = `menu-sidebar ${isMenuOpen ? 'menu-sidebar--open' : ''}`
    const headerTitle = activeTitle && activeTitle !== 'Menú' ? activeTitle : title

    return (
        <>
            <div className={overlayClass} onClick={onCloseMenu} aria-hidden="true" />

            <aside className={sidebarClass} aria-label="Menú de navegación">
                <header className="menu-sidebar__header">
                    <h2 className="menu-sidebar__title">{headerTitle}</h2>
                    <Button
                        variant="icon"
                        radius="full"
                        onClick={onCloseMenu}
                        icon={<XIcon size={22} />}
                        aria-label="Cerrar menú"
                    />
                </header>

                <div className="menu-sidebar__content">
                    Contenido del Menú
                </div>
            </aside>
        </>
    )
}