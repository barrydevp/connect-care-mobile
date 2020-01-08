import { StyleSheet } from "react-native";
import { CP as cp } from "~/utils";

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginHorizontal: cp.wp(1),
    marginVertical: cp.hp(1),
    paddingHorizontal: cp.wp(1),
    paddingVertical: cp.hp(1),
  },
  headerContainer: {
    flex: 1,
    // height: cp.hp(30),
    marginHorizontal: cp.wp(1),
    marginVertical: cp.hp(1),
    paddingHorizontal: cp.wp(1),
    paddingVertical: cp.hp(1),
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerImage: {
    flex: 3,
  },
  logo: {
    flex: 1,
    // alignSelf: "stretch",
    // width: cp.wp(30),
    // height: cp.hp(18),
    height: 90,
    width: 180,
  },
  headerText: {
    marginHorizontal: cp.wp(1),
    marginVertical: cp.hp(1),
    // textAlign: "center",
    fontSize: 16,
    // paddingTop: cp.hp(2)
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: cp.wp(1),
    paddingVertical: cp.hp(1),
    marginHorizontal: cp.wp(4),
    marginVertical: cp.hp(1),
  },
  input: {
    // flex: 1,
    borderRadius: 50,
    marginVertical: cp.hp(1),
    width: cp.wp(70)
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: cp.wp(1),
    marginVertical: cp.hp(1),
    paddingHorizontal: cp.wp(1),
    paddingVertical: cp.hp(1),
  },
  button: {
    borderRadius: 50,
    width: cp.wp(30)
  },
});

export default styles;
