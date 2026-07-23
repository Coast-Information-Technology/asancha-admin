// app/users/_components/user-messages-tab.tsx

/**
 * File purpose:
 * Renders the messages section for a user detail page.
 *
 * Role in the project:
 * This component displays safe message-thread placeholders connected to a user.
 *
 * Key exports:
 * - UserMessagesTab renders the messages section.
 *
 * Business relevance:
 * Messages support user help, deal, reservation, payment, verification,
 * document, booking, property submission, and API partner workflows.
 *
 * Security note:
 * Internal admin notes must not be mixed with user-facing messages. Backend
 * permissions and redaction remain final.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserMessagesTabProps {
  userPublicId: string;
}

export function UserMessagesTab({ userPublicId }: UserMessagesTabProps) {
  return (
    <section id="messages">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Messages</CardTitle>
            <Badge tone="neutral">0 conversations</Badge>
          </div>
          <CardDescription>Message conversations connected to user {userPublicId}.</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            User conversations will appear here after the messages endpoint is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
