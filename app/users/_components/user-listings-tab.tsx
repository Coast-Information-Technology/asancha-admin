// app/users/_components/user-listings-tab.tsx

/**
 * File purpose:
 * Renders the listings section for a user detail page.
 *
 * Role in the project:
 * This component displays safe listing relationship placeholders for a user.
 *
 * Key exports:
 * - UserListingsTab renders the listings section.
 *
 * Business relevance:
 * User-linked listings support review, visibility, reservation, and activity
 * workflows.
 *
 * Security note:
 * Listing lifecycle actions and audit views must remain permission-aware and
 * backend enforced.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserListingsTabProps {
  userPublicId: string;
}

export function UserListingsTab({ userPublicId }: UserListingsTabProps) {
  return (
    <section id="listings">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Listings</CardTitle>
            <Badge tone="neutral">0 listings</Badge>
          </div>
          <CardDescription>Listings connected to user {userPublicId}.</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            Listing records will appear here after live user-listing data is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
