import { Hero, Layout, Main } from '@/components';
import { Text } from '@chakra-ui/react';
import { useUser } from '@/hooks';

const Index = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <Layout>
      <Hero title="MenuMaker" />

      <Main />
    </Layout>
  );
};

export default Index;
