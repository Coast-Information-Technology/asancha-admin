// app/properties/[propertyPublicId]/activities/page.tsx

import { Badge } from '../../../../src/components/ui/badge/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../src/components/ui/card/card';
import { ManagementDetailPage } from '../../../../src/components/layout/page-shell/management-detail-page';
import { getDemoProperty } from '../../../../src/lib/demo/management-demo-data';

export interface PropertyActivitiesPageProps {
  params: Promise<{ propertyPublicId: string }>;
}

const activities = [
  ['Property submitted', 'Amelia Thompson', '18 Jul 2026, 09:04', 'Submission received for operational review.'],
  ['Document uploaded', 'Amelia Thompson', '18 Jul 2026, 09:04', 'Title register metadata added to the property record.'],
  ['Review assigned', 'Demo Operations Lead', '18 Jul 2026, 09:16', 'Property review assigned to the operations queue.'],
  ['Listing draft created', 'Carter & Stone Estates', '18 Jul 2026, 09:22', 'A private listing draft was created from the approved property data.'],
] as const;

export default async function PropertyActivitiesPage({ params }: PropertyActivitiesPageProps) {
  const { propertyPublicId } = await params;
  const property = getDemoProperty(propertyPublicId);

  return (
    <ManagementDetailPage
      description="Business activity timeline for this property, separate from restricted audit logs."
      links={[{ label: 'Property overview', href: `/properties/${property.propertyPublicId}` }, { label: 'Documents', href: `/properties/${property.propertyPublicId}/documents` }, { label: 'Listings', href: `/properties/${property.propertyPublicId}/listings` }]}
      publicId={property.propertyPublicId}
      recordLabel="Property activities"
      recordName={property.title}
      status={`${activities.length} demo events`}
      statusTone="info"
      summary="These operational events mirror the activity timeline the property endpoint should return. Compliance audit records remain a separate workflow."
      title="Property activities"
    >
      <Card>
        <CardHeader><CardTitle>Activity timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="asancha-stack-md">
            {activities.map(([label, actor, timestamp, summary]) => (
              <div className="asancha-cluster-between" key={`${label}-${timestamp}`}>
                <div><strong>{label}</strong><p className="asancha-page-description">{summary} - {actor}</p></div>
                <Badge tone="neutral">{timestamp}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ManagementDetailPage>
  );
}
