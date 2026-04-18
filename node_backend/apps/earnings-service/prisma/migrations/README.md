# Earnings Service Migrations

## First Migration

Run `pnpm prisma:migrate -- --name init` from the `earnings-service` directory.

After Prisma creates the initial migration file, **add the following raw SQL** inside the generated `.sql` file (after the `CREATE TABLE shifts` statement) to enforce financial integrity:

```sql
ALTER TABLE earnings.shifts
  ADD CONSTRAINT chk_hours_positive CHECK (hours_worked > 0),
  ADD CONSTRAINT chk_gross_non_negative CHECK (gross_pay >= 0),
  ADD CONSTRAINT chk_deductions_non_negative CHECK (deductions >= 0),
  ADD CONSTRAINT chk_net_non_negative CHECK (net_pay >= 0);
```

Then run `pnpm prisma migrate deploy` (or let Prisma finish the dev migration).

After migrating, seed the platforms and city zones:

```bash
pnpm prisma:seed
```
