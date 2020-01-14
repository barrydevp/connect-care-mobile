import React from "react";
import TabBarComponent from "~/components/TabBarComponent";
import DrawerComponent from "~/components/DrawerComponent";
import AuthTopBarComponent from "~/components/AuthTopBarComponent";

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
      routeConfigs: {
        screen: "Auth/Loading"
      }
    },
    {
      routeName: "Auth",
      navigationType: "stack",
      navigatorConfig: {
        initialRouteName: "Auth/Login",
        headerMode: "screen"
      },
      routes: [
        {
          routeName: "Auth/Login",
          routeConfigs: {
            screen: "Auth/Login",
            navigationOptions: ({ navigation }) => ({
              title: `Login`,
              headerShown: false
              // header: (props) => {
              //   return <AuthTopBarComponent {...props} />;
              // }
            })
          }
        },
        {
          routeName: "Auth/ChoosePlace",
          routeConfigs: {
            screen: "Auth/ChoosePlace",
            navigationOptions: ({ navigation }) => ({
              title: `ChoosePlace`,
              header: props => {
                return <AuthTopBarComponent {...props} />;
              }
            })
          }
        }
        // {
        //   routeName: "Auth/Signup",
        //   routeConfigs: {
        //     screen: "Auth/Signup",
        //     navigationOptions: ({ navigation }) => ({
        //       title: `Signup`
        //     })
        //   }
        // },
        // {
        //   routeName: "Auth/ForgotPassword",
        //   routeConfigs: {
        //     screen: "Auth/ForgotPassword",
        //     navigationOptions: ({ navigation }) => ({
        //       title: `Forgot Password`
        //     })
        //   }
        // }
      ]
    },
    {
      routeName: "Dashboard",
      navigationType: "bottomtab",
      navigatorConfig: {
        initialRouteName: "Dashboard/Home",
        tabBarComponent: TabBarComponent
      },
      routes: [
        {
          routeName: "Dashboard/Home",
          routeConfigs: {
            screen: "Dashboard/Home",
            params: {
              title: "Home",
              icon: "home"
            },
            navigationOptions: ({ navigation }) => ({
              title: `Home`
            })
          }
        },
        {
          routeName: "Dashboard/Settings",
          routeName: "Dashboard",
          navigationType: "stack",
          navigatorConfig: {
            initialRouteName: "Dashboard/Settings/Main",
            headerMode: "screen",
            navigationOptions: {
              title: `Settings`
            }
          },
          routes: [
            {
              routeName: "Dashboard/Settings/Main",
              routeConfigs: {
                screen: "Dashboard/Settings",
                params: {
                  title: "Settings",
                  icon: "settings"
                },
                navigationOptions: ({ navigation }) => ({
                  title: `Settings`
                })
              }
            }
          ]
        }
      ]
    }
  ]
};
