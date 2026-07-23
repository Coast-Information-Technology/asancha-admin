// app/users/_components/user-notifications-tab.tsx

/**
 * File purpose:
 * Renders the notifications section for a user detail page.
 *
 * Role in the project:
 * This component displays safe notification placeholders connected to a user.
 *
 * Key exports:
 * - UserNotificationsTab renders the notifications section.
 *
 * Business relevance:
 * Notifications help staff understand safe user-facing operational events.
 *
 * Security note:
 * Notification payloads must use safe public IDs and must not expose secrets,
 * private KYC/risk details, internal notes, or internal identifiers.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserNotificationsTabProps {
  userPublicId: string;
}

export function UserNotificationsTab({ userPublicId }: UserNotificationsTabProps) {
  return (
    <section id="notifications">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Notifications</CardTitle>
            <Badge tone="neutral">0 notifications</Badge>
          </div>
          <CardDescription>Notification records connected to user {userPublicId}.</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            User notification records will appear here after the notification endpoint is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
