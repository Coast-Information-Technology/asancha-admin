import { RoutePreviewPage } from '../../src/components/layout/page-shell/route-preview-page';
import { Button } from '../../src/components/ui/button/button';

export default function MessagesPage() {
  return (
    <RoutePreviewPage
      actions={
        <Button href="/messages/assigned" variant="secondary">
          Assigned messages
        </Button>
      }
      description="Manage staff messages and conversations."
      title="Messages"
    />
  );
}
