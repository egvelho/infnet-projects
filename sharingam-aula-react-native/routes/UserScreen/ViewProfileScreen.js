import { useEffect, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import {
  Box,
  Text,
  Heading,
  Center,
  Avatar,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from 'native-base';
import { api } from '../../api';

const initialProfile = {
  id: 0,
  name: '',
  username: '',
  email: '',
  avatar: '',
  isFollow: false,
};

const { width: windowWidth } = Dimensions.get('window');

export function ViewProfileScreen({ route, navigation }) {
  const [profile, setProfile] = useState(initialProfile);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  function PostItem({ item: post }) {
    return (
      <Pressable onPress={() => setCurrentPost(post)}>
        <Image
          source={{ uri: post.picture }}
          width={windowWidth / 3 - 4 / 3}
          height={windowWidth / 3 - 4 / 3}
        />
      </Pressable>
    );
  }

  async function loadProfile() {
    const response = await api.get(`/users/${route.params.username}`);
    const nextProfile = response.data;
    setProfile(nextProfile);
  }

  async function loadPosts() {
    const response = await api.get(`/posts/${route.params.id}`);
    const nextPosts = response.data;
    setPosts(nextPosts);
  }

  useEffect(() => {
    loadProfile();
    loadPosts();
  }, [route.params]);

  return (
    <ScrollView>
      <Modal
        isOpen={currentPost !== null}
        onClose={() => setCurrentPost(null)}
        alignItems="center"
        justifyContent="center">
        <Image
          source={{ uri: currentPost?.picture }}
          width={windowWidth * 0.75}
          height={windowWidth * 0.75}
        />
      </Modal>
      <Box bg="primary.500" height={32}></Box>
      <Center mb={4}>
        <Avatar source={{ uri: profile.avatar }} size={32} mt={-16} />
        <Heading mt={4}>{profile.name}</Heading>
        <Text>@{profile.username}</Text>
        <Text>{profile.email}</Text>
      </Center>
      <FlatList
        data={posts}
        renderItem={PostItem}
        keyExtractor={(post) => post.id}
        numColumns={3}
        contentContainerStyle={{ gap: 2 }}
        columnWrapperStyle={{ gap: 2 }}
      />
    </ScrollView>
  );
}
