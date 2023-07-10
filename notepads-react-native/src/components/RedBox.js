import { View, StyleSheet } from "react-native";

export function RedBox(props) {
  return <View style={styles.redBox} {...props} />;
}

const styles = StyleSheet.create({
  redBox: {
    backgroundColor: "red",
    width: 64,
    height: 64,
  },
});
