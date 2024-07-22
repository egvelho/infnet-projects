import { Box, HamburgerIcon } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from './ProfileScreen';
import { UsersScreen } from './UsersScreen';
import { PostsScreen } from './PostsScreen';
import { ViewProfileScreen } from './ViewProfileScreen';
import routes from '../routes.json';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();

export function UserScreen() {
  return (
    <BottomTab.Navigator
      backBehavior="history"
      initialRouteName={routes.user.posts}
      screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name={routes.user.profile}
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon({ focused, color, size }) {
            return (
              <MaterialIcons name="account-box" size={size} color={color} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={routes.user.posts}
        component={PostsScreen}
        options={{
          title: 'Home',
          tabBarIcon({ focused, color, size }) {
            return <Entypo name="home" size={size} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name={routes.user.users}
        component={UsersScreen}
        options={{
          title: 'Usuários',
          tabBarIcon({ focused, color, size }) {
            return (
              <FontAwesome5 name="user-friends" size={size} color={color} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={routes.user.viewProfile}
        component={ViewProfileScreen}
        options={{
          title: 'Ver perfil',
          tabBarIcon({ focused, color, size }) {
            return (
              <FontAwesome5 name="user-friends" size={size} color={color} />
            );
          },
          tabBarItemStyle: {
            display: 'none',
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

function DummyScreen() {
  return <Box>monarquei kkkk</Box>;
}

function SecondDummyScreen() {
  return <Box>sei lá</Box>;
}
