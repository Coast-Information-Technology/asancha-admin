// src/components/companies/companies-table.tsx

/**
 * File purpose:
 * Renders a reusable companies table for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe company list rows with company name, company
 * type, status, verification status, member/document counts, timestamps, and a
 * navigation action to the company detail page.
 *
 * Key exports:
 * - CompaniesTable renders company list items.
 *
 * Business relevance:
 * Company tables power company management, company review, member review,
 * document review, and verification workflows.
 *
 * Security note:
 * Company rows must use public IDs only and must not expose ObjectIds, private
 * KYC notes, internal admin notes, restricted document URLs, secrets, raw
 * provider payloads, or unauthorised audit details.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';

import { COMPANY_VERIFICATION_STATUS_LABELS } from '../../features/companies/constants/companies.constants';
import type {
  CompanyListItem,
  CompanyVerificationStatus,
} from '../../features/companies/types/companies.types';

import { CompanyStatusBadge } from './company-status-badge';

import styles from './companies.module.css';

export interface CompaniesTableProps {
  companies: readonly CompanyListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

function getVerificationTone(status: CompanyVerificationStatus) {
  if (status === 'approved') {
    return 'success';
  }

  if (status === 'rejected' || status === 'flagged') {
    return 'danger';
  }

  if (status === 'pending' || status === 'in_review') {
    return 'warning';
  }

  return 'neutral';
}

export function CompaniesTable({
  companies,
  emptyTitle = 'No companies found',
  emptyDescription = 'No company records match this view yet. Try adjusting filters when live search is connected.',
}: CompaniesTableProps) {
  if (companies.length === 0) {
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
            <th scope="col">Company</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Verification</th>
            <th scope="col">Members</th>
            <th scope="col">Documents</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr key={company.companyPublicId}>
              <td>
                <p className={styles.companyTitle}>{company.companyName}</p>
                <div className={styles.companyMeta}>
                  <span>{company.companyPublicId}</span>
                  {company.primaryContactLabel ? (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>{company.primaryContactLabel}</span>
                    </>
                  ) : null}
                </div>
              </td>

              <td>{company.companyTypeLabel}</td>

              <td>
                <CompanyStatusBadge status={company.status} />
              </td>

              <td>
                <Badge tone={getVerificationTone(company.verificationStatus)}>
                  {COMPANY_VERIFICATION_STATUS_LABELS[company.verificationStatus]}
                </Badge>
              </td>

              <td>{company.membersCount.toLocaleString()}</td>

              <td>{company.documentsCount.toLocaleString()}</td>

              <td>{company.createdAtLabel}</td>

              <td>{company.updatedAtLabel ?? 'Not available'}</td>

              <td>
                <Button href={company.href} size="sm" variant="secondary">
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
