// app/companies/[companyPublicId]/page.tsx

import { Badge } from '../../../src/components/ui/badge/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card/card';
import { ManagementDetailPage } from '../../../src/components/layout/page-shell/management-detail-page';
import { getDemoCompany } from '../../../src/lib/demo/management-demo-data';

export interface CompanyDetailPageProps {
  params: Promise<{ companyPublicId: string }>;
}

function getStatusTone(status: string) {
  if (status === 'approved') return 'success';
  if (status === 'rejected' || status === 'suspended') return 'danger';
  if (status === 'pending' || status === 'under_review') return 'warning';
  return 'neutral';
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { companyPublicId } = await params;
  const company = getDemoCompany(companyPublicId);

  return (
    <ManagementDetailPage
      description="Company overview with members, properties, listings, documents, and verification workflows."
      links={[
        { label: 'Members', href: `/companies/${company.companyPublicId}/members` },
        { label: 'Properties', href: `/properties?companyPublicId=${company.companyPublicId}` },
        { label: 'Listings', href: `/listings?companyPublicId=${company.companyPublicId}` },
        { label: 'Documents', href: `/companies/${company.companyPublicId}/documents` },
        { label: 'Verification', href: `/companies/${company.companyPublicId}/verification` },
      ]}
      publicId={company.companyPublicId}
      recordLabel={company.companyTypeLabel}
      recordName={company.companyName}
      status={company.status.replace(/_/g, ' ')}
      statusTone={getStatusTone(company.status)}
      summary={company.summary}
      title="Company detail"
    >
      <section aria-label="Company related records" className="asancha-card-grid">
        <RelatedCard
          label="Members"
          value={company.relatedSummary.membersCount}
          href={`/companies/${company.companyPublicId}/members`}
        />
        <RelatedCard
          label="Properties"
          value={company.relatedSummary.propertiesCount}
          href={`/properties?companyPublicId=${company.companyPublicId}`}
        />
        <RelatedCard
          label="Listings"
          value={company.relatedSummary.listingsCount}
          href={`/listings?companyPublicId=${company.companyPublicId}`}
        />
        <RelatedCard
          label="Documents"
          value={company.relatedSummary.documentsCount}
          href={`/companies/${company.companyPublicId}/documents`}
        />
        <RelatedCard
          label="Verification reviews"
          value={company.relatedSummary.verificationReviewsCount}
          href={`/companies/${company.companyPublicId}/verification`}
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Document readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="asancha-cluster">
            <Badge tone="neutral">{company.documentSummary.total} total</Badge>
            <Badge tone="warning">{company.documentSummary.pending} pending</Badge>
            <Badge tone="success">{company.documentSummary.approved} approved</Badge>
            <Badge tone="danger">
              {company.documentSummary.replacementRequired} replacement required
            </Badge>
          </div>
        </CardContent>
      </Card>
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
