import { pgEnum } from "drizzle-orm/pg-core";

export const Arrangement = pgEnum('arrangement', ['onsite', 'hybrid', 'remote']);

export const SalaryPeriod = pgEnum('salary_period', ['hourly', 'daily', 'weekly', 'monthly', 'annually']);

export const Seniority = pgEnum('seniority', [
    'intern',
    'entry',
    'junior',
    'intermediate',
    'senior',
    'staff',
    'principal',
    'distinguished',
    'fellow'
]);