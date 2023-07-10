import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import Toast from "react-native-root-toast";
import { api } from "../api";
import { NotepadItem } from "../components/NotepadItem";
import { Card } from "../components/Card";
import screens from "../screens.json";

const initialNotepadList = {
  count: 0,
  notepads: [],
};

export function ListNotepadScreen({ navigation, route }) {
  const [{ count, notepads }, setNotepadList] = useState(initialNotepadList);

  async function loadNotepads() {
    const response = await api.get("/notepads");
    setNotepadList(response.data);
  }

  function onPressNotepadItem({ id }) {
    navigation.navigate(screens.viewNotepad, {
      id,
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotepads();
    });

    return unsubscribe;
  }, []);

  return (
    <Card>
      <FlatList
        data={notepads}
        renderItem={({ item }) => (
          <NotepadItem {...item} onPress={() => onPressNotepadItem(item)} />
        )}
      />
    </Card>
  );
}
