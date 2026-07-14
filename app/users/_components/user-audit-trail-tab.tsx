// app/users/_components/user-audit-trail-tab.tsx

/**
 * File purpose:
 * Renders the audit trail section for a user detail page.
 *
 * Role in the project:
 * This component displays a permission-sensitive audit trail placeholder for
 * authorised staff only.
 *
 * Key exports:
 * - UserAuditTrailTab renders the audit trail section.
 *
 * Business relevance:
 * Audit trails support compliance, traceability, operational investigation, and
 * high-risk action review.
 *
 * Security note:
 * Audit trail data must never be exposed to customer care or unauthorised staff.
 * It must not show passwords, tokens, full API keys, API key hashes, webhook
 * secrets, private document URLs, raw KYC files, private prompts, or ObjectIds.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserAuditTrailTabProps {
  userPublicId: string;
}

export function UserAuditTrailTab({ userPublicId }: UserAuditTrailTabProps) {
  return (
    <section id="audit-trail">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Audit trail</CardTitle>
            <Badge tone="danger">Permission required</Badge>
          </div>
          <CardDescription>
            Permission-sensitive audit activity connected to user {userPublicId}.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            Audit data will only appear for authorised staff after the audit permission layer and
            backend endpoint are connected. Customer care must not access this section.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
