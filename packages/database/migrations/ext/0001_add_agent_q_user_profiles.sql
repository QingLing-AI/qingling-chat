CREATE TABLE "agents_q_user_profiles" (
	"user_profile_id" uuid,
	"agent_id" text NOT NULL,
	"user_id" text NOT NULL,
	"accessed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "agents_q_user_profiles_agent_id_user_id_pk" PRIMARY KEY("agent_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "q_user_profiles" ALTER COLUMN "profile" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "agents_q_user_profiles" ADD CONSTRAINT "agents_q_user_profiles_user_profile_id_q_user_profiles_id_fk" FOREIGN KEY ("user_profile_id") REFERENCES "public"."q_user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agents_q_user_profiles" ADD CONSTRAINT "agents_q_user_profiles_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agents_q_user_profiles" ADD CONSTRAINT "agents_q_user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;