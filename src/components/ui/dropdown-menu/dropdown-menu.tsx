// src/components/ui/dropdown-menu/dropdown-menu.tsx

/**
 * File purpose:
 * Provides a shared DropdownMenu primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used for avatar menus, table row actions, filters, and lightweight action menus.
 *
 * Security note:
 * Dropdown action visibility is not authorization. Backend checks remain final.
 */

'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useClickOutside } from '../../../hooks/use-click-outside';
import { cn } from '../../../lib/utils/cn';

import styles from './dropdown-menu.module.css';

export interface DropdownMenuItem {
  key: string;
  label: string;
  disabled?: boolean;
  tone?: 'neutral' | 'danger';
  onSelect: () => void;
}

export interface DropdownMenuProps {
  open: boolean;
  trigger: ReactNode;
  items: readonly DropdownMenuItem[];
  onOpenChange: (open: boolean) => void;
  align?: 'left' | 'right';
}

export function DropdownMenu({
  open,
  trigger,
  items,
  onOpenChange,
  align = 'right',
}: DropdownMenuProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [placement, setPlacement] = useState<'above' | 'below'>('below');

  useClickOutside(ref, () => onOpenChange(false), {
    enabled: open,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    const updatePlacement = () => {
      const triggerBounds = ref.current?.getBoundingClientRect();
      const menuBounds = menuRef.current?.getBoundingClientRect();

      if (!triggerBounds || !menuBounds) {
        return;
      }

      const spacing = 12;
      const spaceBelow = window.innerHeight - triggerBounds.bottom;
      const spaceAbove = triggerBounds.top;
      const needsUpwardPlacement =
        spaceBelow < menuBounds.height + spacing && spaceAbove >= menuBounds.height + spacing;

      setPlacement(needsUpwardPlacement ? 'above' : 'below');
    };

    updatePlacement();
    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);

    return () => {
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={ref}>
      <div
        onClick={() => {
          if (!open) {
            setPlacement('below');
          }

          onOpenChange(!open);
        }}
      >
        {trigger}
      </div>
      {open ? (
        <div
          className={cn(styles.menu, styles[align], placement === 'above' && styles.above)}
          ref={menuRef}
          role="menu"
        >
          {items.map((item) => (
            <button
              className={cn(styles.item, item.tone === 'danger' && styles.danger)}
              disabled={item.disabled}
              key={item.key}
              onClick={() => {
                item.onSelect();
                onOpenChange(false);
              }}
              role="menuitem"
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
