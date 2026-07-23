import type { AdminNavigationItem } from './admin-top-bar-navigation';

/** Replace the preview value with the backend onboarding queue count later. */
export const DEMO_ONBOARDING_REVIEW_COUNT = 4;

export function getNavigationBadgeCount(
  item: AdminNavigationItem,
  unreadNotifications: number,
): number {
  if (item.badgeKey === 'notificationUnreadCount') {
    return unreadNotifications;
  }

  if (item.badgeKey === 'onboardingReviewCount') {
    return DEMO_ONBOARDING_REVIEW_COUNT;
  }

  return 0;
}
