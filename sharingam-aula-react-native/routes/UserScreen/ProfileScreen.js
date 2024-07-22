import {
  FormControl,
  Input,
  Button,
  Box,
  Heading,
  Avatar,
  Text,
  Center,
  useToast,
} from 'native-base';
import { useState } from 'react';
import routes from '../routes.json';
import { Logo } from '../../components/Logo';
import { Card } from '../../components/Card';
import * as yup from 'yup';
import { Formik } from 'formik';
import { api, AxiosError } from '../../api';
import { useGlobalStore } from '../../useGlobalStore';
import * as ImagePicker from 'expo-image-picker';

const editProfileSchema = yup.object({
  name: yup
    .string()
    .min(2, 'O nome precisa ter pelo menos 2 caracteres')
    .max(40, 'O nome só pode ter até 40 caracteres.')
    .required('O nome não pode ficar vazio.'),
  username: yup
    .string()
    .lowercase('O nome de usuário só pode ter letras minúsculas.')
    .min(3, 'O nome de usuário precisa ter pelo menos 3 caracteres.')
    .max(16, 'O nome de usuário só pode ter até 16 caracteres.')
    .required('O nome de usuário não pode ficar vazio.'),
  email: yup
    .string()
    .email('O email digitado é inválido.')
    .required('O email não pode ficar vazio.'),
});

const texts = {
  formTitle: 'Editar perfil',
  usernamePlaceholder: 'Digite o seu nome de usuário',
  namePlaceholder: 'Digite o seu nome completo',
  emailPlaceholder: 'Digite o seu email',
  formSubmitLabel: 'Enviar',
};

export function ProfileScreen({ navigation }) {
  const toast = useToast();
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const [updatedAvatar, setUpdatedAvatar] = useState(null);
  const avatar = updatedAvatar ?? user.avatar;

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      base64: true,
    });

    if (!result.canceled) {
      const avatar = result.assets[0].base64;
      const response = await api.post('/account/upload-avatar', { avatar });
      const nextUser = response.data;
      toast.show({ description: 'Avatar atualizado com sucesso!' });
      setUpdatedAvatar(response.data.avatar);
      setUser(nextUser);
    }
  }

  return (
    <Box alignItems="center" justifyContent="center" flex="1" p="4" gap="4">
      <Card p={0}>
        <Box
          bg="primary.500"
          height={32}
          alignItems="flex-end"
          justifyContent="center">
          <Button size="sm" onPress={pickImage} colorScheme="secondary" mr="4">
            Alterar avatar
          </Button>
        </Box>
        <Center>
          <Avatar source={{ uri: avatar }} size={32} mt={-16} />
        </Center>
        <Box p="4" gap="2">
          <Heading textAlign="center">{texts.formTitle}</Heading>
          <Formik
            initialValues={user}
            enableReinitialize
            onSubmit={async (editProfileForm, { setFieldError }) => {
              try {
                const response = await api.patch(
                  '/account/profile',
                  editProfileForm
                );
                toast.show({
                  description: `Seu perfil foi atualizado com sucesso!`,
                });
                setUser(response.data.user);
                navigation.navigate(routes.user.posts);
              } catch (error) {
                if (error instanceof AxiosError) {
                  const field = error.response.data.path;
                  const errorMessage = error.response.data.message;
                  setFieldError(field, errorMessage);
                } else {
                  throw error;
                }
              }
            }}
            validationSchema={editProfileSchema}>
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <>
                <FormControl
                  isInvalid={errors.username && touched.username}
                  isDisabled>
                  <Input
                    placeholder={texts.usernamePlaceholder}
                    value={values.username}
                    onChangeText={handleChange('username')}
                  />
                  <FormControl.ErrorMessage>
                    {errors.username}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name && touched.name}>
                  <Input
                    placeholder={texts.namePlaceholder}
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                  <FormControl.ErrorMessage>
                    {errors.name}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errors.email && touched.email}
                  isDisabled>
                  <Input
                    placeholder={texts.emailPlaceholder}
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  <FormControl.ErrorMessage>
                    {errors.email}
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button onPress={handleSubmit}>{texts.formSubmitLabel}</Button>
              </>
            )}
          </Formik>
        </Box>
      </Card>
    </Box>
  );
}
