import {
  FormControl,
  Input,
  Button,
  Box,
  Heading,
  Image,
  Link,
  Text,
  useToast,
} from 'native-base';
import { useState, useEffect } from 'react';
import routes from './routes.json';
import { Card } from '../components/Card';
import { Logo } from '../components/Logo';
import { api, AxiosError } from '../api';
import { useGlobalStore } from '../useGlobalStore';
import { LoadSession } from '../LoadSession';
import AsyncStorage from '@react-native-async-storage/async-storage';

const texts = {
  formTitle: 'Entrar na sua conta',
  usernamePlaceholder: 'Digite o seu nome de usuário',
  passwordPlaceholder: 'Digite a sua senha',
  formSubmitLabel: 'Entrar',
};

export function HomeScreen({ navigation }) {
  const toast = useToast();
  const setToken = useGlobalStore((state) => state.setToken);
  const setUser = useGlobalStore((state) => state.setUser);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function navigateSignUp() {
    navigation.navigate(routes.signUp);
  }

  function navigateUser() {
    navigation.navigate(routes.user.navigator);
  }

  async function loadToken() {
    const token = await AsyncStorage.getItem('token');
    if(token) {
      setToken(token);
      navigateUser();
    }
  }

  useEffect(() => {
    loadToken();
  }, []);

  async function onSubmit() {
    try {
      const response = await api.post('/account/sign-in', {
        username,
        password,
      });
      setUser(response.data.user);
      setToken(response.data.token);
      await AsyncStorage.setItem('token', response.data.token);
      toast.show({
        description: `Seja bem-vinde novamente, ${response.data.user.name}!`,
      });
      navigateUser();
    } catch (error) {
      if (error instanceof AxiosError && error.response.status === 422) {
        const responseData = error.response.data;
        const errorMessage = responseData.error;
        toast.show({
          render() {
            return (
              <Box
                bg="error.600"
                _text={{ color: 'white' }}
                px="2"
                py="1"
                rounded="sm"
                mb={5}>
                {errorMessage}
              </Box>
            );
          },
        });
      } else {
        throw error;
      }
    }
  }

  return (
    <Box alignItems="center" justifyContent="center" flex="1" p="4" gap="4">
      <LoadSession />
      <Logo />
      <Card>
        <Heading textAlign="center">{texts.formTitle}</Heading>
        <FormControl>
          <Input
            placeholder={texts.usernamePlaceholder}
            value={username}
            onChangeText={setUsername}
          />
        </FormControl>
        <FormControl>
          <Input
            type="password"
            placeholder={texts.passwordPlaceholder}
            value={password}
            onChangeText={setPassword}
          />
        </FormControl>
        <Button onPress={onSubmit}>{texts.formSubmitLabel}</Button>
        <Box flexDirection="row">
          Você não possui conta?{' '}
          <Link onPress={navigateSignUp}>Criar agora</Link>.
        </Box>
      </Card>
    </Box>
  );
}
