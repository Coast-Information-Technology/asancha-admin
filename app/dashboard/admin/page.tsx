// app/dashboard/admin/page.tsx

import { StaffDashboardView } from '../../../src/components/dashboard/staff-dashboard-view';

export default function AdminDashboardPage() {
  return (
    <StaffDashboardView
      description="Operational dashboard for authorised Asancha admin staff."
      role="admin"
      title="Admin dashboard"
    />
  );
}
