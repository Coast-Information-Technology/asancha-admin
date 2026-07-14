// app/users/_components/user-payments-tab.tsx

/**
 * File purpose:
 * Renders the payments section for a user detail page.
 *
 * Role in the project:
 * This component displays safe payment relationship placeholders for a user.
 *
 * Key exports:
 * - UserPaymentsTab renders the payments section.
 *
 * Business relevance:
 * Payments are connected to reservations, billing, references, proof review, and
 * operational support.
 *
 * Security note:
 * Payment provider data, proof details, trace details, and approval controls
 * must be redacted and backend-permission controlled.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserPaymentsTabProps {
  userPublicId: string;
}

export function UserPaymentsTab({ userPublicId }: UserPaymentsTabProps) {
  return (
    <section id="payments">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Payments</CardTitle>
            <Badge tone="neutral">0 payments</Badge>
          </div>
          <CardDescription>
            Payment records connected to user {userPublicId}.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            Payment records will appear here after payment/user data is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
