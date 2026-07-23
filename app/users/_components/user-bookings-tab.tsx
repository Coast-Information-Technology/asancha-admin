// app/users/_components/user-bookings-tab.tsx

/**
 * File purpose:
 * Renders the bookings section for a user detail page.
 *
 * Role in the project:
 * This component displays safe booking relationship placeholders for a user.
 *
 * Key exports:
 * - UserBookingsTab renders the bookings section.
 *
 * Business relevance:
 * Bookings connect users to operational scheduling and support workflows.
 *
 * Security note:
 * Booking participant details and reschedule/cancel controls must be
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

export interface UserBookingsTabProps {
  userPublicId: string;
}

export function UserBookingsTab({ userPublicId }: UserBookingsTabProps) {
  return (
    <section id="bookings">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Bookings</CardTitle>
            <Badge tone="neutral">0 bookings</Badge>
          </div>
          <CardDescription>Booking records connected to user {userPublicId}.</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            Booking records will appear here when the booking/user endpoint is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
