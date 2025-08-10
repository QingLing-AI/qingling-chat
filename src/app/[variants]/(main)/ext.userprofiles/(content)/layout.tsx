import ServerLayout from '@/components/server/ServerLayout';
import Desktop from './_layout/Desktop';
import Mobile from './_layout/Mobile';
import { LayoutProps } from './_layout/type';

const Layout = ServerLayout<LayoutProps>({ Desktop, Mobile });

Layout.displayName = 'UserProfileLayout';

export default (props: LayoutProps) => {
  return <Layout {...props} />;
};
