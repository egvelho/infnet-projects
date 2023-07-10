import "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { LoadingOverlay } from "./src/components/LoadingOverlay";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ViewNotepadScreen } from "./src/screens/ViewNotepadScreen";
import { CreateNotepadScreen } from "./src/screens/CreateNotepadScreen";
import { EditNotepadScreen } from "./src/screens/EditNotepadScreen";
import { ListNotepadScreen } from "./src/screens/ListNotepadScreen";
import screens from "./src/screens.json";

const texts = {
  homeLabel: "Lar",
  viewNotepadLabel: "Ver notepad",
  createNotepadLabel: "Criar notepad",
  editNotepadLabel: "Editar notepad",
  listNotepadsLabel: "Listar notepads",
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <LoadingOverlay />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={screens.home}
          backBehavior="history"
        >
          <Drawer.Screen
            name={screens.home}
            component={HomeScreen}
            options={{
              headerTitle: texts.homeLabel,
              drawerLabel: texts.homeLabel,
              drawerIcon({ size, color }) {
                return <Ionicons name="home" size={size} color={color} />;
              },
            }}
          />
          <Drawer.Screen
            name={screens.viewNotepad}
            component={ViewNotepadScreen}
            options={{
              headerTitle: texts.viewNotepadLabel,
              drawerLabel: texts.viewNotepadLabel,
              drawerItemStyle: {
                height: 0,
              },
              drawerIcon({ size, color }) {
                return (
                  <Foundation name="page-search" size={size} color={color} />
                );
              },
            }}
          />
          <Drawer.Screen
            name={screens.createNotepad}
            component={CreateNotepadScreen}
            options={{
              headerTitle: texts.createNotepadLabel,
              drawerLabel: texts.createNotepadLabel,
              drawerIcon({ size, color }) {
                return (
                  <MaterialCommunityIcons
                    name="typewriter"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name={screens.createNotepadWithCoords}
            component={CreateNotepadScreen}
            options={{
              headerTitle: texts.createNotepadLabel,
              drawerLabel: texts.createNotepadLabel,
              drawerItemStyle: {
                height: 0,
              },
              drawerIcon({ size, color }) {
                return (
                  <MaterialCommunityIcons
                    name="typewriter"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name={screens.editNotepad}
            component={EditNotepadScreen}
            options={{
              headerTitle: texts.editNotepadLabel,
              drawerLabel: texts.editNotepadLabel,
              drawerItemStyle: {
                height: 0,
              },
              drawerIcon({ size, color }) {
                return (
                  <Foundation name="page-edit" size={size} color={color} />
                );
              },
            }}
          />
          <Drawer.Screen
            name={screens.listNotepads}
            component={ListNotepadScreen}
            options={{
              headerTitle: texts.listNotepadsLabel,
              drawerLabel: texts.listNotepadsLabel,
              drawerIcon({ size, color }) {
                return (
                  <FontAwesome name="list-alt" size={size} color={color} />
                );
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
