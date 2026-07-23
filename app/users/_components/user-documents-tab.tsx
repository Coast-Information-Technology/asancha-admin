// app/users/_components/user-documents-tab.tsx

/**
 * File purpose:
 * Renders the documents section for a user detail page.
 *
 * Role in the project:
 * This component displays safe document relationship placeholders for a user.
 *
 * Key exports:
 * - UserDocumentsTab renders the documents section.
 *
 * Business relevance:
 * Documents support onboarding, verification, property, company, API access,
 * and review workflows.
 *
 * Security note:
 * This section must not expose private document URLs, raw KYC files, private KYC
 * notes, internal admin notes, ObjectIds, or restricted document data.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

export interface UserDocumentsTabProps {
  userPublicId: string;
}

export function UserDocumentsTab({ userPublicId }: UserDocumentsTabProps) {
  return (
    <section id="documents">
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Documents</CardTitle>
            <Badge tone="neutral">0 documents</Badge>
          </div>
          <CardDescription>Document records connected to user {userPublicId}.</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="asancha-page-description">
            Document records will appear here when safe document metadata is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
