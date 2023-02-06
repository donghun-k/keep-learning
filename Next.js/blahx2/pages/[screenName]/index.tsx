import { NextPage } from 'next';
import { Avatar, Box, Text, Flex } from '@chakra-ui/react';
import ServiceLayout from '@/components/service_layout';

const userInfo = {
  uid: 'test',
  email: 'donghun.kdh@gmail.com',
  displayName: 'donghun, kim',
  photoURL: 'https://avatars.githubusercontent.com/u/60064471?v=4',
};

const UserHomePage: NextPage = function () {
  return (
    <ServiceLayout title="user home" minH="100vh" backgroundColor="gray.50">
      <Box maxW="md" mx="auto" pt="6">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Flex p="6">
            <Avatar size="lg" src={userInfo.photoURL} mr="2" />
            <Flex direction="column" justify="center">
              <Text fontSize="md">{userInfo.displayName}</Text>
              <Text fontSize="xs">{userInfo.email}</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default UserHomePage;
