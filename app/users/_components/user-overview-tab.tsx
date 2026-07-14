// app/users/_components/user-overview-tab.tsx

/**
 * File purpose:
 * Renders the overview section for a user detail page.
 *
 * Role in the project:
 * This component shows safe account summary placeholders before live user detail
 * API data is connected.
 *
 * Key exports:
 * - UserOverviewTab renders the overview section.
 *
 * Business relevance:
 * Staff need a quick support-safe summary of user status, role context, and
 * account state.
 *
 * Security note:
 * Overview must use safe public identifiers and must not expose ObjectIds,
 * secrets, private notes, private KYC data, or restricted audit details.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserOverviewTabProps {
  userPublicId: string;
}

export function UserOverviewTab({ userPublicId }: UserOverviewTabProps) {
  return (
    <section id="overview">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Overview</CardTitle>
            <Badge tone="info">API connection pending</Badge>
          </div>
          <CardDescription>
            Safe account overview for user {userPublicId}. Live data will include public account
            status, role summaries, and support-safe identifiers.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            This section will display safe user summary data only. Internal identifiers, private
            notes, and restricted verification details must remain hidden unless the backend
            authorises access.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
