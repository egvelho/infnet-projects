import { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  Image,
  Avatar,
  Column,
  Divider,
  Spinner,
  Center,
  Pressable,
} from 'native-base';
import { FlatList } from 'react-native';
import { api } from '../../api';
import routes from '../routes.json';

function EmptyFollowsMessage() {
  return <Text>Você não tem amigos.</Text>;
}

function ListLoader() {
  return (
    <Center pb={4}>
      <Spinner size="xl" />
    </Center>
  );
}

const pageSize = 10;

export function UsersScreen({ route, navigation }) {
  const [users, setUsers] = useState([]);
  const [loadMoreUsers, setLoadMoreUsers] = useState(true);
  const [pagination, setPagination] = useState({ skip: 0, take: pageSize });
  const [isLoading, setIsLoading] = useState(false);

  function UserItem({ item }) {
    function onPress() {
      navigation.navigate(routes.user.viewProfile, item);
    }

    return (
      <Pressable onPress={onPress}>
        <Box flexDirection="row" alignItems="center" gap={2} py={2}>
          <Avatar aspectRatio={1 / 1} w={16} source={{ uri: item.avatar }} />
          <Column>
            <Heading size="md">{item.name}</Heading>
            <Text>
              @{item.username} #{item.id}
            </Text>
          </Column>
        </Box>
      </Pressable>
    );
  }

  async function loadUsers() {
    if (!loadMoreUsers || isLoading) {
      return;
    }

    setIsLoading(true);

    const params = new URLSearchParams(pagination);
    const response = await api.get(
      `/users?${params}`
    );
    const nextUsers = response.data;

    if (nextUsers.length < pageSize) {
      setLoadMoreUsers(false);
    }

    setPagination({ skip: pagination.skip + pageSize, take: pageSize });
    setUsers([...users, ...nextUsers]);

    setIsLoading(false);
  }

  return (
    <Box safeArea px={2}>
      <FlatList
        data={users}
        renderItem={UserItem}
        keyExtractor={(user) => user.id}
        onEndReached={loadUsers}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={!isLoading && EmptyFollowsMessage}
        ListFooterComponent={isLoading && ListLoader}
      />
    </Box>
  );
}
