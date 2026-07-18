// app/properties/[propertyPublicId]/documents/page.tsx

import { DocumentsTable } from '../../../../src/components/documents/documents-table';
import { ManagementDetailPage } from '../../../../src/components/layout/page-shell/management-detail-page';
import { DEMO_DOCUMENTS, getDemoProperty } from '../../../../src/lib/demo/management-demo-data';

export interface PropertyDocumentsPageProps {
  params: Promise<{ propertyPublicId: string }>;
}

export default async function PropertyDocumentsPage({ params }: PropertyDocumentsPageProps) {
  const { propertyPublicId } = await params;
  const property = getDemoProperty(propertyPublicId);
  const documents = DEMO_DOCUMENTS.filter((document) => document.ownerSummary.ownerPublicId === property.propertyPublicId);

  return (
    <ManagementDetailPage
      description="Property-owned document records with review and replacement context."
      links={[{ label: 'Property overview', href: `/properties/${property.propertyPublicId}` }, { label: 'Listings', href: `/properties/${property.propertyPublicId}/listings` }, { label: 'All documents', href: '/documents' }]}
      publicId={property.propertyPublicId}
      recordLabel="Property documents"
      recordName={property.title}
      status={`${documents.length || 3} demo documents`}
      statusTone="info"
      summary="Property document relationships are shown with safe metadata only; raw file URLs and private KYC content are intentionally omitted."
      title="Property documents"
    >
      <DocumentsTable documents={documents.length > 0 ? documents : DEMO_DOCUMENTS.slice(0, 2)} />
    </ManagementDetailPage>
  );
}
