import { RoutePreviewPage } from '../../src/components/layout/page-shell/route-preview-page';
import { Button } from '../../src/components/ui/button/button';

export default function OnboardingPage() {
  return (
    <RoutePreviewPage
      actions={
        <div className="asancha-cluster">
          <Button href="/onboarding" size="sm" variant="secondary">
            All onboarding
          </Button>
          <Button href="/onboarding?status=in_progress" size="sm" variant="secondary">
            In progress
          </Button>
          <Button href="/onboarding?status=submitted" size="sm" variant="secondary">
            Submitted
          </Button>
        </div>
      }
      description="Review onboarding progress, submitted records, and verification readiness."
      title="Onboarding"
    />
  );
}
