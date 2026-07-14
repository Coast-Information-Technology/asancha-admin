// app/users/_components/user-profiles-tab.tsx

/**
 * File purpose:
 * Renders the profiles section for a user detail page.
 *
 * Role in the project:
 * This component displays safe profile relationship placeholders for investor,
 * property owner, property agent, property sourcer, service provider, and API
 * partner contexts.
 *
 * Key exports:
 * - UserProfilesTab renders the profiles section.
 *
 * Business relevance:
 * User profiles define what business role a public user performs on Asancha.
 *
 * Security note:
 * Profile detail visibility and mutation controls must be backend-permission
 * controlled.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserProfilesTabProps {
  userPublicId: string;
}

export function UserProfilesTab({ userPublicId }: UserProfilesTabProps) {
  return (
    <section id="profiles">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Profiles</CardTitle>
            <Badge tone="neutral">0 profiles</Badge>
          </div>
          <CardDescription>
            Business-role profiles connected to user {userPublicId}.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            Profile records will appear here after the users feature API is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
