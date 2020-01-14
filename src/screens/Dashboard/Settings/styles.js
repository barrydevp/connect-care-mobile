import { StyleSheet } from "react-native";
import { CP } from "~/utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: CP.screenHeight < CP.screenWidth ? "row" : "column",
    alignItems: "stretch",
    paddingHorizontal: CP.wp(1),
    paddingTop: CP.hp(3),
    paddingBottom: CP.hp(1)
  },
  headerContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  avatar: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    margin: CP.hp(2)
  },
  headerTextFullName: {
    fontSize: 22,
    fontWeight: "600",
    marginHorizontal: CP.wp(1),
    marginVertical: CP.hp(2.5)
  },
  headerDesContainer: {
    flex: 7,
    // marginHorizontal: CP.wp(1),
    marginVertical: CP.hp(1)
    // alignItems: "center",
    // justifyContent: "flex-start"
  },
  text: {
    fontSize: 14,
    // marginHorizontal: CP.wp(1),
    marginVertical: CP.hp(1)
  },
  headerText: {
    fontSize: 14,
    fontWeight: "700"
  },
  button: {
    flex: 1
  },
  bodyContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "stretch",
    marginVertical: CP.hp(4)
  },
  groupButton: {
    flex: 3,
    justifyContent: "flex-start",
    // alignItems: "flex-start"
    alignItems: "stretch"
  },
  buttonInGroup: {
    // flex: 1,
    // width: "100%"
  },
  footerBodyContainer: {
    flex: 1
  }
});

export default styles;
