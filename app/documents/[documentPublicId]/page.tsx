// app/documents/[documentPublicId]/page.tsx

import { Badge } from '../../../src/components/ui/badge/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card/card';
import { ManagementDetailPage } from '../../../src/components/layout/page-shell/management-detail-page';
import { getDemoDocument } from '../../../src/lib/demo/management-demo-data';

export interface DocumentDetailPageProps {
  params: Promise<{ documentPublicId: string }>;
}

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { documentPublicId } = await params;
  const document = getDemoDocument(documentPublicId);

  return (
    <ManagementDetailPage
      description="Document metadata, ownership, review, replacement, and history workflow."
      links={[
        { label: 'Review', href: `/documents/${document.documentPublicId}/review` },
        { label: 'History', href: `/documents/${document.documentPublicId}/history` },
        { label: 'All documents', href: '/documents' },
        {
          label: 'Owner record',
          href: `/users/${document.ownerSummary.relatedUserLabel ?? 'usr_demo_001'}`,
        },
      ]}
      publicId={document.documentPublicId}
      recordLabel={document.documentTypeLabel}
      recordName={document.documentLabel}
      status={document.status.replace(/_/g, ' ')}
      statusTone={
        document.status === 'approved'
          ? 'success'
          : document.status === 'rejected'
            ? 'danger'
            : 'warning'
      }
      summary={document.summary}
      title="Document detail"
    >
      <section aria-label="Document metadata" className="asancha-card-grid">
        <MetaCard label="Owner" value={document.ownerSummary.ownerLabel} />
        <MetaCard label="Owner public ID" value={document.ownerSummary.ownerPublicId} />
        <MetaCard label="Review risk" value={document.reviewRisk.replace(/_/g, ' ')} />
        <MetaCard
          label="Replacement"
          value={document.replacementRequired ? 'Required' : 'Not required'}
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Review history</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="asancha-stack-md">
            {document.history.map((item) => (
              <div className="asancha-cluster-between" key={item.historyPublicId}>
                <div>
                  <strong>{item.eventLabel}</strong>
                  <p className="asancha-page-description">{item.safeSummary}</p>
                </div>
                <Badge tone={item.status === 'approved' ? 'success' : 'warning'}>
                  {item.createdAtLabel}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ManagementDetailPage>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <strong>{value}</strong>
      </CardContent>
    </Card>
  );
}
