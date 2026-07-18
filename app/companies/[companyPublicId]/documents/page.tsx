// app/companies/[companyPublicId]/documents/page.tsx

import { DocumentsTable } from '../../../../src/components/documents/documents-table';
import { ManagementDetailPage } from '../../../../src/components/layout/page-shell/management-detail-page';
import { DEMO_DOCUMENTS, getDemoCompany } from '../../../../src/lib/demo/management-demo-data';

export interface CompanyDocumentsPageProps {
  params: Promise<{ companyPublicId: string }>;
}

export default async function CompanyDocumentsPage({ params }: CompanyDocumentsPageProps) {
  const { companyPublicId } = await params;
  const company = getDemoCompany(companyPublicId);
  const documents = DEMO_DOCUMENTS.filter((document) => document.ownerSummary.ownerPublicId === company.companyPublicId);

  return (
    <ManagementDetailPage
      description="Company-owned document records with review, risk, and replacement context."
      links={[{ label: 'Company overview', href: `/companies/${company.companyPublicId}` }, { label: 'Members', href: `/companies/${company.companyPublicId}/members` }, { label: 'Verification', href: `/companies/${company.companyPublicId}/verification` }, { label: 'All documents', href: '/documents' }]}
      publicId={company.companyPublicId}
      recordLabel="Company documents"
      recordName={company.companyName}
      status={`${documents.length} demo documents`}
      statusTone="info"
      summary="Company documents are linked by owner public ID and use the same document table contract as the global Documents module."
      title="Company documents"
    >
      <DocumentsTable documents={documents.length > 0 ? documents : DEMO_DOCUMENTS.slice(0, 2)} />
    </ManagementDetailPage>
  );
}
