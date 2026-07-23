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
  type StaffNavigationRole,
} from '../../../lib/navigation/admin-top-bar-navigation';
import { getMobileAdminDrawerNavigation } from '../../../lib/navigation/mobile-admin-drawer-navigation';
import { getNavigationBadgeCount } from '../../../lib/navigation/navigation-badges';
import { isRouteActive } from '../../../lib/utils/routes';
import { useAdminNavigationStore } from '../../../store/admin-navigation.store';
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

export function MobileAdminDrawer({ open, role, onClose }: MobileAdminDrawerProps) {
  const pathname = usePathname();
  const navigation = getMobileAdminDrawerNavigation(role);
  const expandedGroups = useAdminNavigationStore((state) => state.expandedGroups);
  const toggleExpandedGroup = useAdminNavigationStore((state) => state.toggleExpandedGroup);
  const unreadNotifications = useNotificationsStore((state) => state.unreadCount);

  return (
    <Drawer onClose={onClose} open={open} side="left" title="Admin navigation">
      <nav aria-label="Mobile drawer navigation" className={styles.nav}>
        {navigation.map((item, index) => {
          const section = getNavigationSection(item);
          const previousItem = index > 0 ? navigation[index - 1] : undefined;
          const previousSection = previousItem ? getNavigationSection(previousItem) : null;
          const Icon = getNavigationIcon(item.iconName);
          const hasChildren = Boolean(item.children?.length);
          const childActive = Boolean(
            item.children?.some((child) => isRouteActive(pathname, child.href)),
          );
          const active = isRouteActive(pathname, item.href) || childActive;
          const expanded = expandedGroups.includes(item.href);
          const renderAsSectionGroup = Boolean(item.renderAsSectionGroup);
          const badgeCount = getNavigationBadgeCount(item, unreadNotifications);

          return (
            <div
              className={styles.sectionGroup}
              data-section={section}
              data-section-start={section !== previousSection}
              key={item.href}
            >
              {section !== previousSection && !renderAsSectionGroup ? (
                <p className={styles.sectionLabel}>{getNavigationSectionLabel(section)}</p>
              ) : null}

              {hasChildren ? (
                <button
                  aria-expanded={expanded}
                  className={renderAsSectionGroup ? styles.sectionToggle : styles.link}
                  data-active={active}
                  onClick={() => toggleExpandedGroup(item.href)}
                  type="button"
                >
                  {!renderAsSectionGroup ? (
                    <span className={styles.iconBox}>
                      <Icon aria-hidden size={17} strokeWidth={2} />
                    </span>
                  ) : null}
                  <span className={styles.linkLabel}>{item.label}</span>
                  {badgeCount > 0 ? <span className={styles.badge}>{badgeCount}</span> : null}
                  <span className={styles.chevron}>
                    {expanded ? (
                      <LucideIcons.ChevronDown aria-hidden size={15} />
                    ) : (
                      <LucideIcons.ChevronRight aria-hidden size={15} />
                    )}
                  </span>
                </button>
              ) : (
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
              )}

              {hasChildren && expanded ? (
                <div className={styles.children}>
                  {item.children?.map((child) => {
                    const childActive = isRouteActive(pathname, child.href);
                    const childBadgeCount = getNavigationBadgeCount(child, unreadNotifications);
                    const ChildIcon = getNavigationIcon(child.iconName);

                    return (
                      <Link
                        aria-current={childActive ? 'page' : undefined}
                        className={styles.link}
                        data-active={childActive}
                        href={child.href}
                        key={child.href}
                        onClick={onClose}
                      >
                        <span className={styles.iconBox}>
                          <ChildIcon aria-hidden size={17} strokeWidth={2} />
                        </span>
                        <span className={styles.linkLabel}>{child.label}</span>
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
