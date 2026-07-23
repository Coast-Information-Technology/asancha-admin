// app/users/[userPublicId]/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card/card';
import { ManagementDetailPage } from '../../../src/components/layout/page-shell/management-detail-page';
import { getDemoUser } from '../../../src/lib/demo/management-demo-data';

export interface UserDetailPageProps {
  params: Promise<{ userPublicId: string }>;
}

function getStatusTone(status: string) {
  if (status === 'active') return 'success';
  if (status === 'suspended' || status === 'restricted' || status === 'locked') return 'danger';
  return 'warning';
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { userPublicId } = await params;
  const user = getDemoUser(userPublicId);

  return (
    <ManagementDetailPage
      description="Safe user detail with role, account, verification, and related resource workflows."
      links={[
        { label: 'Profiles', href: `/profiles?userPublicId=${user.userPublicId}` },
        { label: 'Companies', href: `/companies?userPublicId=${user.userPublicId}` },
        { label: 'Properties', href: `/properties?userPublicId=${user.userPublicId}` },
        { label: 'Listings', href: `/listings?userPublicId=${user.userPublicId}` },
        { label: 'Documents', href: `/documents?userPublicId=${user.userPublicId}` },
        { label: 'Verification', href: '/verification-reviews' },
      ]}
      publicId={user.userPublicId}
      recordLabel={user.role.replace(/_/g, ' ')}
      recordName={user.displayName}
      status={user.status.replace(/_/g, ' ')}
      statusTone={getStatusTone(user.status)}
      summary={`${user.displayName} is a demo public user record. Staff can move from this identity context into the user's profiles, companies, properties, listings, documents, bookings, payments, messages, and verification workflows.`}
      title="User detail"
    >
      <section aria-label="User related records" className="asancha-card-grid">
        <RelatedCard
          label="Profiles"
          value={user.relatedCounts.profiles}
          href={`/profiles?userPublicId=${user.userPublicId}`}
        />
        <RelatedCard
          label="Companies"
          value={user.relatedCounts.companies}
          href={`/companies?userPublicId=${user.userPublicId}`}
        />
        <RelatedCard
          label="Properties"
          value={user.relatedCounts.properties}
          href={`/properties?userPublicId=${user.userPublicId}`}
        />
        <RelatedCard
          label="Listings"
          value={user.relatedCounts.listings}
          href={`/listings?userPublicId=${user.userPublicId}`}
        />
        <RelatedCard
          label="Documents"
          value={user.relatedCounts.documents}
          href={`/documents?userPublicId=${user.userPublicId}`}
        />
        <RelatedCard
          label="Verification reviews"
          value={user.relatedCounts.verificationReviews}
          href="/verification-reviews"
        />
        <RelatedCard
          label="Deal reservations"
          value={user.relatedCounts.dealReservations}
          href="/deal-reservations"
        />
        <RelatedCard label="Bookings" value={user.relatedCounts.bookings} href="/bookings" />
        <RelatedCard label="Payments" value={user.relatedCounts.payments} href="/payments" />
        <RelatedCard label="Messages" value={user.relatedCounts.messages} href="/messages" />
      </section>
    </ManagementDetailPage>
  );
}

function RelatedCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="asancha-cluster-between">
          <strong>{value}</strong>
          <a href={href}>Open</a>
        </div>
      </CardContent>
    </Card>
  );
}
