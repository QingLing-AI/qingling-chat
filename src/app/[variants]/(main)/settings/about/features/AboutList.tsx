'use client';

import { Grid } from '@lobehub/ui';
import { FC, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ItemLinkProps } from './ItemLink';

interface AboutListProps {
  ItemRender: FC<ItemLinkProps>;
  grid?: boolean;
  items: ItemLinkProps[];
}

const AboutList = memo<AboutListProps>(({ grid, items, ItemRender }) => {
  const content = items.map((item) => <ItemRender key={item.value} {...item} />);

  if (!grid) return <Flexbox gap={8}>{content}</Flexbox>;

  return (
    <Grid gap={8} maxItemWidth={160} rows={5} width={'100%'}>
      {content}
    </Grid>
  );
});

export default AboutList;
