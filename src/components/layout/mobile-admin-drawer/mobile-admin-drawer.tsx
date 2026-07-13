// src/components/layout/mobile-admin-drawer/mobile-admin-drawer.tsx

/**
 * File purpose:
 * Provides the mobile drawer navigation for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component renders role-aware mobile navigation using the approved mobile
 * drawer navigation helper.
 *
 * Key exports:
 * - MobileAdminDrawer renders the mobile admin drawer.
 *
 * Business relevance:
 * Mobile drawer navigation must include Messages and must remain role-aware.
 * Detail pages must not be drawer menu items.
 *
 * Security note:
 * Drawer visibility is frontend guidance only. Backend checks remain final.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { StaffNavigationRole } from '../../../lib/navigation/admin-top-bar-navigation';
import { getMobileAdminDrawerNavigation } from '../../../lib/navigation/mobile-admin-drawer-navigation';
import { isRouteActive } from '../../../lib/utils/routes';
import { Drawer } from '../../ui/drawer/drawer';

import styles from './mobile-admin-drawer.module.css';

export interface MobileAdminDrawerProps {
  open: boolean;
  role: StaffNavigationRole;
  onClose: () => void;
}

export function MobileAdminDrawer({ open, role, onClose }: MobileAdminDrawerProps) {
  const pathname = usePathname();
  const navigation = getMobileAdminDrawerNavigation(role);

  return (
    <Drawer onClose={onClose} open={open} side="left" title="Admin navigation">
      <nav aria-label="Mobile drawer navigation" className={styles.nav}>
        {navigation.map((item) => {
          const active = isRouteActive(pathname, item.href);

          return (
            <Link
              aria-current={active ? 'page' : undefined}
              className={styles.link}
              data-active={active}
              href={item.href}
              key={item.href}
            >
              <span className={styles.iconBox}>{item.iconName.slice(0, 1)}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </Drawer>
  );
}
