import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { isQinglingCustomized } from '@/const/branding';

export default ({ children }: PropsWithChildren) => {

  if (!isQinglingCustomized) return notFound();

  return children;
};
