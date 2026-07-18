// app/dashboard/customer-care/page.tsx

import { StaffDashboardView } from '../../../src/components/dashboard/staff-dashboard-view';

export default function CustomerCareDashboardPage() {
  return (
    <StaffDashboardView
      description="Support-safe dashboard for customer care operations."
      role="customer_care_rep"
      title="Customer care dashboard"
    />
  );
}
