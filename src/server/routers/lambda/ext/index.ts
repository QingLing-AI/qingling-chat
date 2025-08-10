/**
 * This file contains the root router of Lobe Chat tRPC-backend
 */
import { publicProcedure, router } from '@/libs/trpc/lambda';
import { userProfileRouter } from './userProfile';

export const extRouter = router({
  healthcheck: publicProcedure.query(() => "i'm live!"),
  userProfile: userProfileRouter,
});

export type ExtRouter = typeof extRouter;
