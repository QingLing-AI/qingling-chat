import { and, eq, desc, inArray } from 'drizzle-orm';

import { type LobeChatDatabase } from '@/database/type';
import { qUserProfiles as userProfiles } from '@/database/schemas/ext/userProfile';


export interface QueryUserProfileParams {
  current?: number;
  pageSize?: number;
  sessionId?: string | null;
  topicId?: string | null;
}

export class UserProfileModel {
  private db: LobeChatDatabase;
  private userId: string;

  constructor(db: LobeChatDatabase, userId: string) {
    this.db = db;
    this.userId = userId;
  }

  // 创建 user profile
  create = async (params: Omit<typeof userProfiles.$inferInsert, 'userId'>) => {
    const [result] = await this.db
      .insert(userProfiles)
      .values({ ...params, userId: this.userId })
      .returning();

    return result;
  };

  // 获取所有 userProfiles
  query = async () => {
  // query = async ({ current = 0, pageSize = 1000 }: QueryUserProfileParams = {},) => {
    // const offset = current * pageSize;
    return this.db.query.qUserProfiles.findMany({
        // limit: pageSize,
        // offset,
        orderBy: [desc(userProfiles.updatedAt)],
        where: eq(userProfiles.userId, this.userId),
    })
  };

  // 根据 ID 获取 user profile
  findById = async (id: string) => {
    return this.db.query.qUserProfiles.findFirst({
      where: and(eq(userProfiles.id, id), eq(userProfiles.userId, this.userId)),
    });
  };

  // 更新 user profile
  update = async (id: string, value: Partial<typeof userProfiles.$inferInsert>) => {
    return this.db
      .update(userProfiles)
      .set({ ...value, updatedAt: new Date() })
      .where(and(eq(userProfiles.id, id), eq(userProfiles.userId, this.userId)))
      .returning();
  };

  // 删除 user profile
  delete = async (id: string) => {
    return this.db
      .delete(userProfiles)
      .where(and(eq(userProfiles.id, id), eq(userProfiles.userId, this.userId)));
  };
  deleteMany = async (ids: string[]) => {
    return this.db.delete(userProfiles).where(
      and(
        inArray(userProfiles.id, ids),
        eq(userProfiles.userId, this.userId),
      ),
    );
  };

  // 删除所有 userProfiles
  // deleteAll = async () => {
  //   return this.db.delete(userProfiles).where(eq(userProfiles.userId, this.userId));
  // };
}
