import React from "react";
// import { createAppContainer, SafeAreaView } from 'react-navigation';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { Layout, Text } from "@ui-kitten/components";

class Home extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: "Home",
  //   headerLeft: () => (
  //     <MenuImage
  //       onPress={() => {
  //         navigation.openDrawer();
  //       }}
  //     />
  //   )
  // });

  //   constructor(props) {
  //     super(props);
  //   }

  //   onPressRecipe = item => {
  //     this.props.navigation.navigate("Recipe", { item });
  //   };

  //   renderRecipes = ({ item }) => (
  //     <TouchableHighlight
  //       underlayColor="rgba(73,182,77,1,0.9)"
  //       onPress={() => this.onPressRecipe(item)}
  //     >
  //       <View style={styles.container}>
  //         <Image style={styles.photo} source={{ uri: item.photo_url }} />
  //         <Text style={styles.title}>{item.title}</Text>
  //         <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
  //       </View>
  //     </TouchableHighlight>
  //   );
  
  render() {
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">HOME</Text>
      </Layout>
    );
  }
}


export default Home;

// module.exports = Home;