import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10
  },
  headerContainer: {
    flex: 1,
    padding: 10,
    margin: 10
  },
  headerImage: {
    // flex: 1,
    height: 100,
    // width: 100,
    margin: 5
  },
  headerText: {
    // flex: 1
    margin: 10,
    textAlign: "center"
  },
  bodyContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 5
  },
  input: {
    borderRadius: 50,
    margin: 4
  },
  footerContainer: {
    flex: 1,
    padding: 20,
    margin: 10
  },
  button: {
    borderRadius: 50
  }
});

export default styles;
