// src/components/layout/staff-avatar-menu/staff-avatar-menu.tsx

/**
 * File purpose:
 * Provides the staff avatar menu for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component gives staff users quick access to My Staff Account, Security,
 * Notification Preferences, and Logout.
 *
 * Key exports:
 * - StaffAvatarMenu renders the current staff avatar dropdown.
 *
 * Business relevance:
 * My Staff Account is for the currently logged-in staff member only.
 *
 * Security note:
 * Logout/session operations must be completed by backend/auth flows. This menu
 * must not store tokens, secrets, or backend-only permission truth.
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { AdminShellStaff } from '../admin-shell/admin-shell';
import { DropdownMenu } from '../../ui/dropdown-menu/dropdown-menu';

import styles from './staff-avatar-menu.module.css';

export interface StaffAvatarMenuProps {
  staff: AdminShellStaff;
  onLogout?: () => void;
}

function getInitials(displayName: string): string {
  return displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function StaffAvatarMenu({ staff, onLogout }: StaffAvatarMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu
      items={[
        {
          key: 'profile',
          label: 'My Profile',
          onSelect: () => {
            window.location.href = '/my-profile';
          },
        },
        {
          key: 'security',
          label: 'Security',
          onSelect: () => {
            window.location.href = '/my-profile/security';
          },
        },
        {
          key: 'notifications',
          label: 'Notification Preferences',
          onSelect: () => {
            window.location.href = '/my-profile/notifications';
          },
        },
        {
          key: 'logout',
          label: 'Logout',
          tone: 'danger',
          onSelect: () => {
            onLogout?.();
          },
        },
      ]}
      onOpenChange={setOpen}
      open={open}
      trigger={
        <button aria-label="Open staff account menu" className={styles.trigger} type="button">
          <span className={styles.avatar}>
            {staff.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="" src={staff.avatarUrl} />
            ) : (
              getInitials(staff.displayName)
            )}
          </span>
          <span className={styles.identity}>
            <span className={styles.name}>{staff.displayName}</span>
            <span className={styles.email}>{staff.email}</span>
          </span>
        </button>
      }
    />
  );
}
