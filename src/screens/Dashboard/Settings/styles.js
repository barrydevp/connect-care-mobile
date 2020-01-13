import { StyleSheet } from "react-native";
import { CP } from "~/utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: CP.wp(1),
    paddingTop: CP.hp(3),
    paddingBottom: CP.hp(1)
  },
  headerContainer: {
    flex: 2,
    // justifyContent: "center",
    alignItems: "center"
  },
  bodyContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    margin: CP.hp(2)
  },
  headerTextFullName: {
    fontSize: 22,
    fontWeight: "600"
  },
  headerText: {
    fontSize: 15
  },
  groupButton: {
    flex: 3,
    // justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  buttonInGroup: {
    // flex: 1,
    // width: "100%"
  },
  button: {
    flex: 1
  }
});

export default styles;
