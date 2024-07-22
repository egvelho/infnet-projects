import {
  FormControl,
  Input,
  Button,
  Box,
  Heading,
  useToast,
} from 'native-base';
import routes from './routes.json';
import { Logo } from '../components/Logo';
import { Card } from '../components/Card';
import * as yup from 'yup';
import { Formik } from 'formik';
import { api, AxiosError } from '../api';
import { useGlobalStore } from '../useGlobalStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const signUpSchema = yup.object({
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
  password: yup
    .string()
    .min(6, 'A senha precisa ter pelo menos 6 caracteres')
    .max(30, 'A senha só pode ter até 30 caracteres.')
    .required('A senha não pode ficar vazia.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais.')
    .required('O campo confirmar senha não pode ficar vazio.'),
});

const signUpInitialValues = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const texts = {
  formTitle: 'Criar conta',
  usernamePlaceholder: 'Digite o seu nome de usuário',
  namePlaceholder: 'Digite o seu nome completo',
  emailPlaceholder: 'Digite o seu email',
  passwordPlaceholder: 'Digite a sua senha',
  confirmPasswordPlaceholder: 'Confirmar senha',
  formSubmitLabel: 'Enviar',
};

export function SignUpScreen({ navigation }) {
  const toast = useToast();
  const setToken = useGlobalStore(state => state.setToken);
  const setUser = useGlobalStore(state => state.setUser);

  function navigateHome() {
    navigation.navigate(routes.home);
  }

  function navigateUser() {
    navigation.navigate(routes.user.navigator);
  }

  return (
    <Box alignItems="center" justifyContent="center" flex="1" p="4" gap="4">
      <Logo />
      <Card>
        <Heading textAlign="center">{texts.formTitle}</Heading>
        <Formik
          onSubmit={async (signUpForm, { setFieldError }) => {
            try {
              const response = await api.post('/account/sign-up', signUpForm);
              toast.show({
                description: `Sua conta foi criada com sucesso! Seja bem-vinde, ${signUpForm.name}!`,
              });
              setUser(response.data.user);
              setToken(response.data.token);
              await AsyncStorage.setItem('token', response.data.token);
              navigation.navigate(routes.user.navigator, {
                screen: routes.user.posts,
              });
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
          validationSchema={signUpSchema}
          initialValues={signUpInitialValues}>
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <>
              <FormControl isInvalid={errors.username && touched.username}>
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
              <FormControl isInvalid={errors.email && touched.email}>
                <Input
                  placeholder={texts.emailPlaceholder}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password && touched.password}>
                <Input
                  type="password"
                  placeholder={texts.passwordPlaceholder}
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.confirmPassword && touched.confirmPassword}>
                <Input
                  type="password"
                  placeholder={texts.confirmPasswordPlaceholder}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                />
                <FormControl.ErrorMessage>
                  {errors.confirmPassword}
                </FormControl.ErrorMessage>
              </FormControl>
              <Button onPress={handleSubmit}>{texts.formSubmitLabel}</Button>
              <Button variant="outline" onPress={navigateHome}>
                Entrar na sua conta
              </Button>
            </>
          )}
        </Formik>
      </Card>
    </Box>
  );
}
