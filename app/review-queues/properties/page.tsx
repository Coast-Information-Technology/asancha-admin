// app/review-queues/properties/page.tsx

import { PropertiesTable } from '../../../src/components/properties/properties-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_PROPERTIES } from '../../../src/lib/demo/management-demo-data';

export default function PropertyReviewQueuePage() {
  const properties = DEMO_PROPERTIES.filter((property) => property.status !== 'approved');

  return (
    <ManagementListPage
      description="Property submission, document readiness, and lifecycle review queue."
      filters={[
        { label: 'All properties', href: '/properties' },
        { label: 'Submitted', href: '/properties?status=submitted' },
        { label: 'Correction required', href: '/properties?status=correction_requested' },
      ]}
      metrics={[
        {
          label: 'Queue records',
          value: String(properties.length),
          detail: 'Demo properties requiring review',
          tone: 'warning',
        },
        {
          label: 'Documents pending',
          value: '2',
          detail: 'Property documents need assessment',
          tone: 'info',
        },
        {
          label: 'Correction required',
          value: '1',
          detail: 'Source action is needed',
          tone: 'danger',
        },
        {
          label: 'Approved outside queue',
          value: '2',
          detail: 'Ready property records',
          tone: 'success',
        },
      ]}
      title="Property review queue"
      totalLabel={`${properties.length} queued properties`}
    >
      <PropertiesTable properties={properties} />
    </ManagementListPage>
  );
}
