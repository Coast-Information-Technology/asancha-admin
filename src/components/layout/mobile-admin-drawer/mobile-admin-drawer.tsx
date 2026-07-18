// src/components/layout/mobile-admin-drawer/mobile-admin-drawer.tsx

/** Role-aware mobile navigation with visible child links. */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
  getNavigationSection,
  getNavigationSectionLabel,
  type AdminNavigationItem,
  type StaffNavigationRole,
} from '../../../lib/navigation/admin-top-bar-navigation';
import { getMobileAdminDrawerNavigation } from '../../../lib/navigation/mobile-admin-drawer-navigation';
import { isRouteActive } from '../../../lib/utils/routes';
import { useNotificationsStore } from '../../../store/notifications.store';
import { Drawer } from '../../ui/drawer/drawer';

import styles from './mobile-admin-drawer.module.css';

export interface MobileAdminDrawerProps {
  open: boolean;
  role: StaffNavigationRole;
  onClose: () => void;
}

function getNavigationIcon(iconName: string): LucideIcon {
  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];

  return icon ?? LucideIcons.Circle;
}

function getBadgeCount(item: AdminNavigationItem, unreadNotifications: number): number {
  return item.badgeKey === 'notificationUnreadCount' ? unreadNotifications : 0;
}

export function MobileAdminDrawer({ open, role, onClose }: MobileAdminDrawerProps) {
  const pathname = usePathname();
  const navigation = getMobileAdminDrawerNavigation(role);
  const unreadNotifications = useNotificationsStore((state) => state.unreadCount);

  return (
    <Drawer onClose={onClose} open={open} side="left" title="Admin navigation">
      <nav aria-label="Mobile drawer navigation" className={styles.nav}>
        {navigation.map((item, index) => {
          const section = getNavigationSection(item);
          const previousItem = index > 0 ? navigation[index - 1] : undefined;
          const previousSection = previousItem ? getNavigationSection(previousItem) : null;
          const Icon = getNavigationIcon(item.iconName);
          const active = isRouteActive(pathname, item.href);
          const badgeCount = getBadgeCount(item, unreadNotifications);

          return (
            <div className={styles.sectionGroup} key={item.href}>
              {section !== previousSection ? (
                <p className={styles.sectionLabel}>{getNavigationSectionLabel(section)}</p>
              ) : null}
              <Link
                aria-current={active ? 'page' : undefined}
                className={styles.link}
                data-active={active}
                href={item.href}
                onClick={onClose}
              >
                <span className={styles.iconBox}>
                  <Icon aria-hidden size={17} strokeWidth={2} />
                </span>
                <span className={styles.linkLabel}>{item.label}</span>
                {badgeCount > 0 ? <span className={styles.badge}>{badgeCount}</span> : null}
              </Link>

              {item.children?.length ? (
                <div className={styles.children}>
                  {item.children.map((child) => {
                    const childActive = isRouteActive(pathname, child.href, { exact: true });
                    const childBadgeCount = getBadgeCount(child, unreadNotifications);

                    return (
                      <Link
                        aria-current={childActive ? 'page' : undefined}
                        className={styles.childLink}
                        data-active={childActive}
                        href={child.href}
                        key={child.href}
                        onClick={onClose}
                      >
                        <span>{child.label}</span>
                        {childBadgeCount > 0 ? (
                          <span className={styles.badge}>{childBadgeCount}</span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </Drawer>
  );
}
