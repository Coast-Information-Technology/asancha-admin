// src/components/listings/listings-table.tsx

/**
 * File purpose:
 * Renders a reusable listings table for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe listing list rows with listing title, connected
 * property, lifecycle status, review status, visibility status, reservation
 * status, pricing labels, timestamps, and a navigation action to the listing
 * detail page.
 *
 * Key exports:
 * - ListingsTable renders listing list items.
 *
 * Business relevance:
 * Listing tables power listing review, lifecycle management, publication
 * readiness, visibility support, reservation review, and review queue workflows.
 *
 * Security note:
 * Listing rows must use public IDs only and must not expose ObjectIds, private
 * KYC notes, internal admin notes, restricted document URLs, secrets, raw
 * provider payloads, private audit payloads, or unauthorised risk details.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';

import {
  LISTING_RESERVATION_STATUS_LABELS,
  LISTING_REVIEW_STATUS_LABELS,
} from '../../features/listings/constants/listings.constants';
import type {
  ListingListItem,
  ListingReservationStatus,
  ListingReviewStatus,
} from '../../features/listings/types/listings.types';

import { ListingStatusBadge } from './listing-status-badge';
import { ListingVisibilityBadge } from './listing-visibility-badge';

import styles from './listings.module.css';

export interface ListingsTableProps {
  listings: readonly ListingListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

function getReviewTone(status: ListingReviewStatus) {
  if (status === 'approved') {
    return 'success';
  }

  if (status === 'rejected') {
    return 'danger';
  }

  if (status === 'pending' || status === 'in_review' || status === 'correction_requested') {
    return 'warning';
  }

  if (status === 'on_hold') {
    return 'info';
  }

  return 'neutral';
}

function getReservationTone(status: ListingReservationStatus) {
  if (status === 'reserved' || status === 'completed') {
    return 'success';
  }

  if (status === 'expired' || status === 'cancelled') {
    return 'danger';
  }

  if (status === 'reservation_pending') {
    return 'warning';
  }

  return 'neutral';
}

export function ListingsTable({
  listings,
  emptyTitle = 'No listings found',
  emptyDescription = 'No listing records match this view yet. Try adjusting filters when live search is connected.',
}: ListingsTableProps) {
  if (listings.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>{emptyTitle}</p>
        <p className={styles.emptyDescription}>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Listing</th>
            <th scope="col">Property</th>
            <th scope="col">Status</th>
            <th scope="col">Review</th>
            <th scope="col">Visibility</th>
            <th scope="col">Reservation</th>
            <th scope="col">Value</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {listings.map((listing) => (
            <tr key={listing.listingPublicId}>
              <td>
                <p className={styles.listingTitle}>{listing.title}</p>
                <div className={styles.listingMeta}>
                  <span>{listing.listingPublicId}</span>
                </div>
              </td>

              <td>
                <p className={styles.propertyTitle}>{listing.propertyTitleLabel}</p>
                <div className={styles.propertyMeta}>
                  <span>{listing.locationLabel}</span>
                  <span>Property: {listing.propertyPublicId}</span>
                </div>
              </td>

              <td>
                <ListingStatusBadge status={listing.status} />
              </td>

              <td>
                <Badge tone={getReviewTone(listing.reviewStatus)}>
                  {LISTING_REVIEW_STATUS_LABELS[listing.reviewStatus]}
                </Badge>
              </td>

              <td>
                <ListingVisibilityBadge visibilityStatus={listing.visibilityStatus} />
              </td>

              <td>
                <Badge tone={getReservationTone(listing.reservationStatus)}>
                  {LISTING_RESERVATION_STATUS_LABELS[listing.reservationStatus]}
                </Badge>
              </td>

              <td>
                <div className={styles.valueStack}>
                  <span className={styles.valueStrong}>{listing.priceLabel ?? 'Not provided'}</span>
                  <span>{listing.yieldLabel ?? 'Yield not provided'}</span>
                </div>
              </td>

              <td>{listing.createdAtLabel}</td>

              <td>{listing.updatedAtLabel ?? 'Not available'}</td>

              <td>
                <Button href={listing.href} size="sm" variant="secondary">
                  Open
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
