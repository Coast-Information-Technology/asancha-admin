// app/dashboard/super-admin/page.tsx

import { StaffDashboardView } from '../../../src/components/dashboard/staff-dashboard-view';

export default function SuperAdminDashboardPage() {
  return (
    <StaffDashboardView
      description="Full internal operations overview for authorised super admin staff."
      role="super_admin"
      title="Super admin dashboard"
    />
  );
}
