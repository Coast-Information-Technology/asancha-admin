// src/lib/constants/message-types.constants.ts

/**
 * File purpose:
 * Defines message type constants for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises message/conversation type values used by messages,
 * support queues, filters, user detail tabs, deal reservations, payments,
 * verification reviews, documents, bookings, property submissions, and API
 * partner support.
 *
 * Key exports:
 * - MESSAGE_TYPE_VALUES defines supported message type filters.
 * - MESSAGE_TYPE_LABELS defines staff-facing display labels.
 * - MESSAGE_TYPE_OPTIONS defines select/filter options.
 *
 * Business relevance:
 * The frontend menu label must be Messages. Backend conversations remain the
 * thread/container concept, while messages are individual items inside the
 * thread.
 *
 * Security note:
 * Message labels and filters are display helpers only. Backend conversation
 * visibility, participant permissions, internal notes, and safe user-facing
 * messages must be enforced by the backend.
 */

export const MESSAGE_TYPE_VALUES = [
  'support',
  'deal',
  'reservation',
  'payment',
  'verification',
  'document_review',
  'booking',
  'property_submission',
  'api_partner',
] as const;

export type MessageType = (typeof MESSAGE_TYPE_VALUES)[number];

export const MESSAGE_TYPE_LABELS: Record<MessageType, string> = {
  support: 'Support',
  deal: 'Deal',
  reservation: 'Reservation',
  payment: 'Payment',
  verification: 'Verification',
  document_review: 'Document Review',
  booking: 'Booking',
  property_submission: 'Property Submission',
  api_partner: 'API Partner',
};

export const MESSAGE_TYPE_DESCRIPTIONS: Record<MessageType, string> = {
  support: 'General user or staff support conversation.',
  deal: 'Conversation related to deal activity.',
  reservation: 'Conversation related to a deal reservation.',
  payment: 'Conversation related to payment status or payment review.',
  verification: 'Conversation related to verification status.',
  document_review: 'Conversation related to document review or correction.',
  booking: 'Conversation related to booking support.',
  property_submission: 'Conversation related to property submission.',
  api_partner: 'Conversation related to API partner access or support.',
};

export const MESSAGE_TYPE_OPTIONS = MESSAGE_TYPE_VALUES.map((type) => ({
  value: type,
  label: MESSAGE_TYPE_LABELS[type],
  description: MESSAGE_TYPE_DESCRIPTIONS[type],
}));

export const MESSAGE_STATUS_VALUES = ['open', 'closed', 'resolved', 'unread', 'read'] as const;

export type MessageStatusValue = (typeof MESSAGE_STATUS_VALUES)[number];

export const MESSAGE_STATUS_LABELS: Record<MessageStatusValue, string> = {
  open: 'Open',
  closed: 'Closed',
  resolved: 'Resolved',
  unread: 'Unread',
  read: 'Read',
};

export const MESSAGE_ASSIGNMENT_FILTER_VALUES = ['all', 'assigned_to_me', 'unassigned'] as const;

export type MessageAssignmentFilterValue = (typeof MESSAGE_ASSIGNMENT_FILTER_VALUES)[number];

export function getMessageTypeLabel(type: MessageType): string {
  return MESSAGE_TYPE_LABELS[type];
}
