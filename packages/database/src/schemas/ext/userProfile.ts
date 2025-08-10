/* eslint-disable sort-keys-fix/sort-keys-fix  */
import { pgTable, text, index, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { timestamps } from '@/database/schemas/_helpers';
import { users } from '@/database/schemas/user';

export const qUserProfiles = pgTable('q_user_profiles', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    avatar: text('avatar').$defaultFn(() => '🎭'),
    profile: text('profile').notNull(),
    userId: text('user_id').notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    clientId: text('client_id'),
    ...timestamps,
  },
  (t) => [
    index('user_profile_client_id_user_id_unique').on(
      t.clientId,
      t.userId,
    ),
  ],
);

export const insertUserProfileSchema = createInsertSchema(qUserProfiles);

export type NewUserProfile = typeof qUserProfiles.$inferInsert;
export type UserProfileItem = typeof qUserProfiles.$inferSelect;
export const updateUserProfileSchema = createSelectSchema(qUserProfiles);
