/**
 * đối tượng navigator
 * @param { là tên của title trên header } title
 * @param { là tên của screen trong Navigator } routeName
 * @param { là đường dẫn đến file vật lý trong thư mục screens } screen
 * @param { icon ứng với screen đó danh sách icon: https://akveo.github.io/eva-icons/ } icon
 */
export default {
  routeName: "App",
  navigationType: "switch",
  navigatorConfig: {
    initialRouteName: "AuthLoading",
    headerMode: "none"
  },
  routes: [
    {
      routeName: "AuthLoading",
      screen: "Auth/Loading"
    },
    {
      routeName: "Auth",
      title: "Auth",
      navigationType: "stack",
      navigatorConfig: {
        initialRouteName: "Auth/Login",
        headerMode: "none"
      },
      routes: [
        {
          routeName: "Auth/Login",
          screen: "Auth/Login",
          navigationOptions: ({ navigation }) => ({
            title: `Login`
          })
        }
        // {
        //   routeName: "Auth/Signup",
        //   screen: "Auth/Signup",
        //   navigationOptions: ({ navigation }) => ({
        //     title: `Signup`,
        //   })
        // },
        // {
        //   routeName: "Auth/ForgotPassword",
        //   screen: "Auth/ForgotPassword",
        //   navigationOptions: ({ navigation }) => ({
        //     title: `Forgot Password`,
        //   })
        // },
      ]
    },
    {
      routeName: "Dashboard",
      navigationType: "bottomtab",
      routes: [
        {
          routeName: "Dashboard/Home",
          screen: "Dashboard/Home",
          params: {
            icon: "home"
          },
          navigationOptions: ({ navigation }) => ({
            title: `Home`
          })
        },
        {
          routeName: "Dashboard/Settings",
          screen: "Dashboard/Settings",
          params: {
            icon: "settings"
          },
          navigationOptions: ({ navigation }) => ({
            title: `Settings`
          })
        }
      ]
    }
  ]
};
