import { Hero, Layout, Main } from '@/components';
import { useUser } from '@/hooks';
import { Text } from '@chakra-ui/layout';

const Index = () => {
  const { user } = useUser();

  return (
    <Layout unwrapped>
      <Hero title="MenuMaker" />

      <Main>{user && <Text>Hello, {user.email}</Text>}</Main>
    </Layout>
  );
};

export default Index;
