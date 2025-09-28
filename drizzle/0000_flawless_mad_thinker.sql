CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" varchar NOT NULL,
	"company" varchar NOT NULL,
	"submitted_on" timestamp with time zone,
	"pre_interview_on" timestamp with time zone,
	"interview_on" timestamp with time zone,
	"offered_on" timestamp with time zone,
	"accepted_on" timestamp with time zone,
	"rejected_on" timestamp with time zone,
	"withdrawn_on" timestamp with time zone,
	"seniority" "application_seniority",
	"arrangement" "application_location_type",
	"salary" numeric,
	"salary_min" numeric,
	"salary_max" numeric,
	"salary_currency" varchar(3),
	"salary_period" "salary_period",
	"city" varchar,
	"state" varchar,
	"country" varchar,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar,
	"password_hash" varchar,
	"github_id" integer,
	"github_username" varchar,
	"google_id" varchar,
	"google_username" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_github_id_unique" UNIQUE("github_id"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;