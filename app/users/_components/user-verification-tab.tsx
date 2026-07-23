// app/users/_components/user-verification-tab.tsx

/**
 * File purpose:
 * Renders the verification section for a user detail page.
 *
 * Role in the project:
 * This component displays safe verification-review placeholders for a user.
 *
 * Key exports:
 * - UserVerificationTab renders the verification section.
 *
 * Business relevance:
 * Verification status helps staff support onboarding, approval, risk review, and
 * correction workflows.
 *
 * Security note:
 * Risk details, KYC information, internal notes, restricted documents, and audit
 * data must only be shown to authorised staff.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserVerificationTabProps {
  userPublicId: string;
}

export function UserVerificationTab({ userPublicId }: UserVerificationTabProps) {
  return (
    <section id="verification">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Verification</CardTitle>
            <Badge tone="neutral">No live status</Badge>
          </div>
          <CardDescription>
            Verification reviews and support-safe status connected to user {userPublicId}.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            Verification status will appear here after the verification review endpoint is
            connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
