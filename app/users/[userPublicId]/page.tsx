// app/users/[userPublicId]/page.tsx

/**
 * File purpose:
 * Renders the user detail page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a safe user detail shell with tabs for overview,
 * profiles, companies, properties, listings, deal reservations, bookings,
 * payments, documents, verification, messages, notifications, and audit trail.
 *
 * Key exports:
 * - UserDetailPage renders /users/[userPublicId].
 *
 * Business relevance:
 * User detail pages centralise safe operational context and must be reached from
 * list rows, queue rows, search results, or related-resource links.
 *
 * Security note:
 * User detail must use public IDs only. It must not expose MongoDB ObjectIds,
 * private KYC notes, internal admin notes, restricted document URLs, secrets, or
 * unauthorised audit trail data. Backend permissions remain final.
 */

import { PageShell } from '../../../src/components/layout/page-shell/page-shell';
import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

import { UserAuditTrailTab } from '../_components/user-audit-trail-tab';
import { UserBookingsTab } from '../_components/user-bookings-tab';
import { UserCompaniesTab } from '../_components/user-companies-tab';
import { UserDealReservationsTab } from '../_components/user-deal-reservations-tab';
import { UserDetailTabs } from '../_components/user-detail-tabs';
import { UserDocumentsTab } from '../_components/user-documents-tab';
import { UserListingsTab } from '../_components/user-listings-tab';
import { UserMessagesTab } from '../_components/user-messages-tab';
import { UserNotificationsTab } from '../_components/user-notifications-tab';
import { UserOverviewTab } from '../_components/user-overview-tab';
import { UserPaymentsTab } from '../_components/user-payments-tab';
import { UserProfilesTab } from '../_components/user-profiles-tab';
import { UserPropertiesTab } from '../_components/user-properties-tab';
import { UserVerificationTab } from '../_components/user-verification-tab';

export interface UserDetailPageProps {
  params: Promise<{
    userPublicId: string;
  }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { userPublicId } = await params;

  return (
    <PageShell
      description="Safe operational user detail view for authorised staff."
      title="User detail"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>User public ID</CardTitle>
              <CardDescription>
                This page uses the safe public user identifier. Internal database identifiers must
                never be displayed.
              </CardDescription>
            </div>
            <Badge tone="neutral">{userPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <UserDetailTabs userPublicId={userPublicId} />
        </CardContent>
      </Card>

      <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
        <UserOverviewTab userPublicId={userPublicId} />
        <UserProfilesTab userPublicId={userPublicId} />
        <UserCompaniesTab userPublicId={userPublicId} />
        <UserPropertiesTab userPublicId={userPublicId} />
        <UserListingsTab userPublicId={userPublicId} />
        <UserDealReservationsTab userPublicId={userPublicId} />
        <UserBookingsTab userPublicId={userPublicId} />
        <UserPaymentsTab userPublicId={userPublicId} />
        <UserDocumentsTab userPublicId={userPublicId} />
        <UserVerificationTab userPublicId={userPublicId} />
        <UserMessagesTab userPublicId={userPublicId} />
        <UserNotificationsTab userPublicId={userPublicId} />
        <UserAuditTrailTab userPublicId={userPublicId} />
      </div>
    </PageShell>
  );
}
