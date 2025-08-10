import { z } from 'zod';

import { UserProfileModel } from '@/database/models/ext/userProfile';
import { authedProcedure, router } from '@/libs/trpc/lambda';
import { serverDatabase } from '@/libs/trpc/lambda/middleware';

import { insertUserProfileSchema } from '@/database/schemas/ext/userProfile';
import type { UserProfileItem } from '@/types/ext/userProfile'

const userProfileProcedure = authedProcedure.use(serverDatabase).use(async (opts) => {
  const { ctx } = opts;

  return opts.next({
    ctx: {
      userProfileModel: new UserProfileModel(ctx.serverDB, ctx.userId),
    },
  });
});


export const userProfileRouter = router({
  create: userProfileProcedure
      .input(
        z.object({
          avatar: z.string().optional(),
          name: z.string(),
          profile: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const data = await ctx.userProfileModel.create({
          avatar: input.avatar,
          name: input.name,
          profile: input.profile,
        });

        return data?.id;
      }),

  get: userProfileProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }): Promise<UserProfileItem | undefined> => {
      return ctx.userProfileModel.findById(input.id);
    }),

  list: userProfileProcedure
    .query(async ({ ctx }) => {
      return ctx.userProfileModel.query()
    }),

  remove: userProfileProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.userProfileModel.delete(input.id);
    }),

  removeMany: userProfileProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      await ctx.userProfileModel.deleteMany(input.ids);
    }),

  update: userProfileProcedure
    .input(
      z.object({
        id: z.string(),
        value: insertUserProfileSchema.pick({ avatar: true, name: true, profile: true }).partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.userProfileModel.update(input.id, input.value);
    }),
});
