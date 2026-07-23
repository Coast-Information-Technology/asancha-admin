import { RoutePreviewPage } from '../../src/components/layout/page-shell/route-preview-page';
import { Button } from '../../src/components/ui/button/button';

export default function BookingsPage() {
  return (
    <RoutePreviewPage
      actions={
        <Button href="/bookings/support" variant="secondary">
          Booking support
        </Button>
      }
      description="Manage booking operations."
      title="Bookings"
    />
  );
}
