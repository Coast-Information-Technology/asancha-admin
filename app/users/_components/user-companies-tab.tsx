// app/users/_components/user-companies-tab.tsx

/**
 * File purpose:
 * Renders the companies section for a user detail page.
 *
 * Role in the project:
 * This component displays safe company membership and ownership placeholders.
 *
 * Key exports:
 * - UserCompaniesTab renders the companies section.
 *
 * Business relevance:
 * Users may belong to companies that affect property, agency, sourcer, service
 * provider, and API partner workflows.
 *
 * Security note:
 * Company verification details and high-risk mutation controls must be
 * permission-aware and backend enforced.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserCompaniesTabProps {
  userPublicId: string;
}

export function UserCompaniesTab({ userPublicId }: UserCompaniesTabProps) {
  return (
    <section id="companies">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Companies</CardTitle>
            <Badge tone="neutral">0 companies</Badge>
          </div>
          <CardDescription>
            Company records and memberships connected to user {userPublicId}.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            Company relationships will appear here when live company/user detail data is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
