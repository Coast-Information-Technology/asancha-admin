import type { AdminNavigationItem } from './admin-top-bar-navigation';

/** Replace the preview value with the backend onboarding queue count later. */
export const DEMO_ONBOARDING_REVIEW_COUNT = 4;

/** Backend-backed attention counts will replace these zero-value placeholders. */
export const BACKEND_PENDING_ATTENTION_COUNT = 0;

/** Replace this preview value with the current staff message attention count. */
export const DEMO_MESSAGE_UNREAD_COUNT = 5;

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

  if (item.badgeKey === 'messageUnreadCount') {
    return DEMO_MESSAGE_UNREAD_COUNT;
  }

  if (
    item.badgeKey === 'verificationAttentionCount' ||
    item.badgeKey === 'supportAttentionCount' ||
    item.badgeKey === 'transactionCaseAttentionCount'
  ) {
    return BACKEND_PENDING_ATTENTION_COUNT;
  }

  return 0;
}
