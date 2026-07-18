// src/components/properties/properties-table.tsx

/**
 * File purpose:
 * Renders a reusable properties table for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe property list rows with title, location, source,
 * review status, document status, listing status, related company label,
 * timestamps, and a navigation action to the property detail page.
 *
 * Key exports:
 * - PropertiesTable renders property list items.
 *
 * Business relevance:
 * Property tables power property review, document readiness, listing readiness,
 * operational support, and review queue workflows.
 *
 * Security note:
 * Property rows must use public IDs only and must not expose ObjectIds, private
 * KYC notes, internal admin notes, restricted document URLs, secrets, raw
 * provider payloads, or unauthorised audit details.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';

import {
  PROPERTY_LISTING_STATUS_LABELS,
  PROPERTY_SOURCE_TYPE_LABELS,
} from '../../features/properties/constants/properties.constants';
import type {
  PropertyListItem,
  PropertyListingStatus,
} from '../../features/properties/types/properties.types';

import { PropertyDocumentStatusBadge } from './property-document-status-badge';
import { PropertyStatusBadge } from './property-status-badge';

import styles from './properties.module.css';

export interface PropertiesTableProps {
  properties: readonly PropertyListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

function getListingStatusTone(status: PropertyListingStatus) {
  if (status === 'published') {
    return 'success';
  }

  if (status === 'rejected' || status === 'archived') {
    return 'danger';
  }

  if (status === 'submitted' || status === 'under_review') {
    return 'warning';
  }

  if (status === 'reserved') {
    return 'info';
  }

  return 'neutral';
}

export function PropertiesTable({
  properties,
  emptyTitle = 'No properties found',
  emptyDescription = 'No property records match this view yet. Try adjusting filters when live search is connected.',
}: PropertiesTableProps) {
  if (properties.length === 0) {
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
            <th scope="col">Property</th>
            <th scope="col">Location</th>
            <th scope="col">Source</th>
            <th scope="col">Property status</th>
            <th scope="col">Documents</th>
            <th scope="col">Listing</th>
            <th scope="col">Company</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((property) => (
            <tr key={property.propertyPublicId}>
              <td>
                <p className={styles.propertyTitle}>{property.title}</p>
                <div className={styles.propertyMeta}>
                  <span>{property.propertyPublicId}</span>
                </div>
              </td>

              <td>
                <span className={styles.location}>{property.locationLabel}</span>
              </td>

              <td>
                <p className={styles.sourceText}>{property.sourceLabel}</p>
                <p className={styles.sourceText}>
                  {PROPERTY_SOURCE_TYPE_LABELS[property.sourceType]}
                </p>
              </td>

              <td>
                <PropertyStatusBadge status={property.status} />
              </td>

              <td>
                <PropertyDocumentStatusBadge status={property.documentStatus} />
              </td>

              <td>
                <Badge tone={getListingStatusTone(property.listingStatus)}>
                  {PROPERTY_LISTING_STATUS_LABELS[property.listingStatus]}
                </Badge>
              </td>

              <td>{property.companyLabel ?? 'Not linked'}</td>

              <td>{property.createdAtLabel}</td>

              <td>{property.updatedAtLabel ?? 'Not available'}</td>

              <td>
                <Button href={property.href} size="sm" variant="secondary">
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
