import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './routes/HomeScreen';
import { SignUpScreen } from './routes/SignUpScreen';
import { UserScreen } from './routes/UserScreen/UserScreen';
import { NativeBaseProvider } from 'native-base';
import routes from './routes/routes.json';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={routes.home} screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name={routes.home}
            component={HomeScreen}
          />
          <Stack.Screen
            name={routes.signUp}
            component={SignUpScreen}
          />
          <Stack.Screen
            name={routes.user.navigator}
            component={UserScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
