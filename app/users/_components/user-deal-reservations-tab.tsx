// app/users/_components/user-deal-reservations-tab.tsx

/**
 * File purpose:
 * Renders the deal reservations section for a user detail page.
 *
 * Role in the project:
 * This component displays safe reservation relationship placeholders for a user.
 *
 * Key exports:
 * - UserDealReservationsTab renders the deal reservations section.
 *
 * Business relevance:
 * Deal reservations connect users to listings, payments, messages, and activity
 * timelines.
 *
 * Security note:
 * Reservation cancellation, approval, payment state, and internal notes must be
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

export interface UserDealReservationsTabProps {
  userPublicId: string;
}

export function UserDealReservationsTab({ userPublicId }: UserDealReservationsTabProps) {
  return (
    <section id="deal-reservations">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Deal reservations</CardTitle>
            <Badge tone="neutral">0 reservations</Badge>
          </div>
          <CardDescription>
            Deal reservation records connected to user {userPublicId}.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            Reservation records will appear here after the users feature API is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
