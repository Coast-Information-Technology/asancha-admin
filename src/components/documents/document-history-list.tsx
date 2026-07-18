// src/components/documents/document-history-list.tsx

/**
 * File purpose:
 * Renders a safe document history list for Asancha Admin.
 *
 * Role in the project:
 * This component displays document history timeline entries such as submission,
 * review, correction, replacement, approval, rejection, hold, archive, and
 * restore events.
 *
 * Key exports:
 * - DocumentHistoryList renders safe document history entries.
 *
 * Business relevance:
 * Document history gives staff operational traceability for document review and
 * correction workflows without exposing raw audit payloads.
 *
 * Security note:
 * Document history is not a raw audit log. It must not expose ObjectIds,
 * private document URLs, raw KYC files, private KYC notes, internal admin notes
 * to public users, secrets, or restricted audit payloads.
 */

import type { DocumentHistoryItem } from '../../features/documents/types/documents.types';

import { DocumentStatusBadge } from './document-status-badge';

import styles from './documents.module.css';

export interface DocumentHistoryListProps {
  history: readonly DocumentHistoryItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DocumentHistoryList({
  history,
  emptyTitle = 'No document history yet',
  emptyDescription = 'Document history entries will appear here after live document events are connected.',
}: DocumentHistoryListProps) {
  if (history.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>{emptyTitle}</p>
        <p className={styles.emptyDescription}>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <ul className={styles.historyList}>
      {history.map((item) => (
        <li className={styles.historyItem} key={item.historyPublicId}>
          <div className={styles.historyTop}>
            <div>
              <p className={styles.historyTitle}>{item.eventLabel}</p>
              <div className={styles.historyMeta}>
                <span>{item.createdAtLabel}</span>
                {item.actorLabel ? (
                  <>
                    <span aria-hidden="true">•</span>
                    <span>{item.actorLabel}</span>
                  </>
                ) : null}
              </div>
            </div>

            <DocumentStatusBadge status={item.status} />
          </div>

          <p className={styles.historySummary}>{item.safeSummary}</p>
        </li>
      ))}
    </ul>
  );
}
