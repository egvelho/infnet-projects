import { useEffect, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import {
  Box,
  Avatar,
  Text,
  Heading,
  Center,
  Button,
  useToast,
  Image,
  Modal,
  Pressable,
} from 'native-base';
import { useGlobalStore, initialState } from '../../useGlobalStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import routes from '../routes.json';
import { api } from '../../api';
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('window').width;

export function PostsScreen({ navigation, route }) {
  const toast = useToast();
  const user = useGlobalStore((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState(null);
  const isShowModal = modalPost !== null;

  async function loadPosts() {
    const response = await api.get(`/posts/${user.id}`);
    const nextPosts = response.data;
    setPosts(nextPosts);
  }

  async function doLogout() {
    toast.show({ description: `Até mais, ${user.name}!` });
    navigation.navigate(routes.home);
    AsyncStorage.removeItem('token');
    useGlobalStore.setState(initialState);
  }

  async function onSubmitPost() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.05,
      base64: true,
    });

    if (!result.canceled) {
      const picture = result.assets[0].base64;
      const response = await api.post('/posts', { picture });
      const createdPost = response.data;
      await loadPosts();
      setModalPost(createdPost);
      toast.show({ description: 'Publicação criada com sucesso!' });
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPosts();
    });

    return unsubscribe;
  }, [route.params]);

  const postGridGap = 2;
  const postGridItemSize = windowWidth / 3 - (postGridGap * 2) / 3;

  function PostItem({ item: post }) {
    return (
      <Pressable onPress={() => setModalPost(post)}>
        <Image
          source={{ uri: post.picture }}
          width={postGridItemSize}
          height={postGridItemSize}
        />
      </Pressable>
    );
  }

  return (
    <Box>
      <Modal
        isOpen={isShowModal}
        onClose={() => setModalPost(null)}
        alignItems="center"
        justifyContent="center">
        <Image
          source={{ uri: modalPost?.picture }}
          width={windowWidth * 0.8}
          height={windowWidth * 0.8}
        />
      </Modal>
      <Box
        bg="primary.500"
        height={32}
        alignItems="flex-end"
        justifyContent="center">
        <Button size="sm" onPress={doLogout} colorScheme="secondary" mr="4">
          Sair
        </Button>
      </Box>
      <Center>
        <Avatar source={{ uri: user.avatar }} size={32} mt={-16} />
        <Heading mt={4}>{user.name}</Heading>
        <Text>@{user.username}</Text>
        <Text>{user.email}</Text>
      </Center>
      <Box m={4}>
        <Button onPress={onSubmitPost} bgColor="secondary.500">
          Criar publicação
        </Button>
      </Box>
      <Box>
        <FlatList
          data={posts}
          renderItem={PostItem}
          keyExtractor={(post) => post.id}
          numColumns={3}
          contentContainerStyle={{ gap: postGridGap }}
          columnWrapperStyle={{ gap: postGridGap }}
        />
      </Box>
    </Box>
  );
}
