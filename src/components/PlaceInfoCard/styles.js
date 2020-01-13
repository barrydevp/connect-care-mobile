import { StyleSheet } from "react-native";
import { CP } from "~/utils";

export default StyleSheet.create({
  listItem: {
    borderLeftWidth: CP.wp(0.1),
    borderRightWidth: CP.wp(0.1),
    borderTopWidth: CP.hp(0.1),
    borderBottomWidth: CP.hp(0.1),
    borderColor: "#cbcbcb",
    // shadowColor: "#000000",
    // shadowRadius: 10,
    // shadowOpacity: 0.2,
    marginHorizontal: CP.wp(1),
    marginVertical: CP.hp(2),
    // shadowOffset: {
    //   top: 5,
    //   left: 5
    // }
  },
  // cardHeaderTitleStyle: {
  //   fontSize: 10,
  //   fontWeight: "100"
  // },
  cardContentText: {
    fontSize: 14
  },
  cardContentTitleText: {
    fontSize: 14,
    fontWeight: "600"
  }
});
