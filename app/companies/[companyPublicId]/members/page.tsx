// app/companies/[companyPublicId]/members/page.tsx

import { Badge } from '../../../../src/components/ui/badge/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../src/components/ui/card/card';
import { ManagementDetailPage } from '../../../../src/components/layout/page-shell/management-detail-page';
import { getDemoCompany } from '../../../../src/lib/demo/management-demo-data';
import { COMPANY_MEMBER_ROLE_LABELS, COMPANY_MEMBER_STATUS_LABELS } from '../../../../src/features/companies/constants/companies.constants';

export interface CompanyMembersPageProps {
  params: Promise<{ companyPublicId: string }>;
}

export default async function CompanyMembersPage({ params }: CompanyMembersPageProps) {
  const { companyPublicId } = await params;
  const company = getDemoCompany(companyPublicId);

  return (
    <ManagementDetailPage
      description="Company member relationships, roles, invitations, and safe user links."
      links={[{ label: 'Company overview', href: `/companies/${company.companyPublicId}` }, { label: 'Documents', href: `/companies/${company.companyPublicId}/documents` }, { label: 'Verification', href: `/companies/${company.companyPublicId}/verification` }]}
      publicId={company.companyPublicId}
      recordLabel="Company members"
      recordName={company.companyName}
      status={`${company.members.length} demo members`}
      statusTone="info"
      summary="Members are rendered with safe public IDs, role labels, invitation state, and links back to the company workflow."
      title="Company members"
    >
      <Card>
        <CardHeader><CardTitle>Member list</CardTitle></CardHeader>
        <CardContent>
          <div className="asancha-table-scroll">
            <table className="asancha-table">
              <thead><tr><th>Member</th><th>Role</th><th>Status</th><th>Joined</th><th>Action</th></tr></thead>
              <tbody>
                {company.members.map((member) => (
                  <tr key={member.memberPublicId}>
                    <td><strong>{member.displayName}</strong><br /><span>{member.emailLabel} - {member.userPublicId}</span></td>
                    <td><Badge tone="neutral">{COMPANY_MEMBER_ROLE_LABELS[member.role]}</Badge></td>
                    <td><Badge tone={member.status === 'active' ? 'success' : member.status === 'suspended' ? 'danger' : 'warning'}>{COMPANY_MEMBER_STATUS_LABELS[member.status]}</Badge></td>
                    <td>{member.joinedAtLabel ?? 'Not available'}</td>
                    <td><a href={`/users/${member.userPublicId}`}>Open user</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </ManagementDetailPage>
  );
}
