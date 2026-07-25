// app/staff/new/page.tsx

/**
 * File purpose:
 * Renders the create-staff page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe placeholder for staff creation before the live staff
 * feature form and backend endpoint are connected.
 *
 * Key exports:
 * - NewStaffPage renders /staff/new.
 *
 * Business relevance:
 * Staff creation is restricted:
 * - super_admin may create admin.
 * - super_admin may create customer_care_rep.
 * - admin may create customer_care_rep.
 * - no frontend route may create super_admin.
 *
 * Security note:
 * This frontend page does not authorize staff creation. Backend permissions,
 * allowed role transitions, invite flow, audit logging, and account status
 * rules remain final.
 */

import { PageShell } from '../../../src/components/layout/page-shell/page-shell';
import { CreateStaffForm } from '../../../src/components/staff/create-staff-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

import styles from '../../../src/components/staff/staff.module.css';

export default function NewStaffPage() {
  return (
    <PageShell
      description="Create an authorised staff account through the secure backend registration flow."
      title="Create staff"
    >
      <section>
        <Card className={styles.createStaffCard}>
          <CardHeader className={styles.createStaffHeader}>
            <CardTitle>Staff creation form</CardTitle>
            <CardDescription>
              Enter the new staff member&apos;s account and role details below.
            </CardDescription>
          </CardHeader>

          <CardContent className={styles.createStaffContent}>
            <CreateStaffForm />
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
