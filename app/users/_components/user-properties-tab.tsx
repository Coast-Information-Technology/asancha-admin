// app/users/_components/user-properties-tab.tsx

/**
 * File purpose:
 * Renders the properties section for a user detail page.
 *
 * Role in the project:
 * This component displays safe property relationship placeholders for a user.
 *
 * Key exports:
 * - UserPropertiesTab renders the properties section.
 *
 * Business relevance:
 * Property ownership, submission, and sourcing relationships are important to
 * admin support and review workflows.
 *
 * Security note:
 * Property detail and review controls must be permission-aware and backend
 * enforced.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserPropertiesTabProps {
  userPublicId: string;
}

export function UserPropertiesTab({ userPublicId }: UserPropertiesTabProps) {
  return (
    <section id="properties">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Properties</CardTitle>
            <Badge tone="neutral">0 properties</Badge>
          </div>
          <CardDescription>Property records connected to user {userPublicId}.</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            Related properties will appear here after the user detail endpoint is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
