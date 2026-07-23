import { EmptyState } from '../src/components/ui/empty-state/empty-state';
import { Button } from '../src/components/ui/button/button';

export default function NotFound() {
  return (
    <main className="asancha-page-shell">
      <EmptyState
        action={<Button href="/dashboard">Return to dashboard</Button>}
        description="This admin route or record is not available, or you may not have permission to view it."
        title="Page not found"
      />
    </main>
  );
}
