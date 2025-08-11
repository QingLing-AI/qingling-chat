/* eslint-disable sort-keys-fix/sort-keys-fix  */
import {
  pgTable,
  primaryKey,
  text,
  uuid,
} from 'drizzle-orm/pg-core';

import { timestamps } from '../_helpers';
import { users } from '../user';
import { agents } from '../agent';
import { qUserProfiles } from './';

export const qAgentsUserProfiles = pgTable(
  'agents_q_user_profiles',
  {
    userProfileId: uuid('user_profile_id')
      .references(() => qUserProfiles.id, { onDelete: 'cascade' }),
    agentId: text('agent_id')
      .notNull()
      .references(() => agents.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),

    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.agentId, t.userId] })],
);
