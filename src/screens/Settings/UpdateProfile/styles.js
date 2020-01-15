import { StyleSheet } from "react-native";
import { CP } from "~/utils";

export default StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: "#FFF"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: CP.wp(3),
    paddingVertical: CP.hp(3)
  },
  button: { flexDirection: "row-reverse" }
});
