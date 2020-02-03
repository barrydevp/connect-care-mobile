# [Connect Care Mobile](http://gitlab.nbm.vn/barrydevp/connect-care-mobile)

## Thư viện và Framework sử dung(Cần có hiểu những khái niệm basic trong các thư viện này):

* **[React-Native](https://facebook.github.io/react-native/)** [Learn](https://facebook.github.io/react-native/docs/tutorial)
* **[Expo](https://expo.io/)** [Learn](https://expo.io/learn)
* **[React-Navigation](https://reactnavigation.org/)** [Learn](https://reactnavigation.org/docs/en/getting-started.html)
* **[UI-Kitten](https://akveo.github.io/react-native-ui-kitten/)** [Learn](https://akveo.github.io/react-native-ui-kitten/docs/)
* **[Redux-Useful](https://www.npmjs.com/package/redux-useful)** (Thư viện bao gồm redux, redux-saga) [Learn(tự xây dựng dựa trên dvajs vì vậy mà không thể nhiều tính năng giống với dva nhưng đủ để dùng gần giống với những gì Project web đang sử dụng, doc của dva)](https://dvajs.com/guide/)

## Installation
* install Expo nếu chưa cài: https://expo.io/learn

* clone Project
`git clone http://gitlab.nbm.vn/barrydevp/connect-care-mobile.git`

* Đối với npm
`npm install`

* Đối với Yarn
`yarn`

## Instruction

* Start dev
`expo start`

* Start build
https://docs.expo.io/versions/v36.0.0/distribution/building-standalone-apps/#3-start-the-build

* Debugging
https://docs.expo.io/versions/latest/workflow/debugging/

## Structure

* Folder
(chỉ liệt kê các file và thư mục chính)

|____App.js     Component Root App chứa các Component bao ngoài AppContainer để thiết lập config UI, Store, Intl, Redux-Provider,...
|____app.json       Config app
|____src        Thư mục hoạt động chính
| |____locales      Thư mục chứa các file liên quan đến message đa ngôn ngữ
| | |____messages
| | |____errors
| |____AppContainer.js        Compononent chứa toàn bộ các Navigation (hiện tại đang chỉ chứa navigation, có thể phát triển thêm)
| |____AppStyles.js           Style của AppContainer      
| |____utils       Thư mục chứa các file hỗ trợ, tiện ích, có một vài file là core của Navigation tự xây dựng vì vậy khả năng hoàn chỉnh chỉ là 95%
| |____wrapcomponents       Các wrap component (giống với các wrap trên Project của web)
| |____screens      Nơi chứa các component màn hình, cấu trúc như dưới
| | |____index.js  file index.js(rất quan trọng) là nơi khai báo toàn bộ các Screen để có thể sử dụng trong config của Navigation
| |____components       Nơi chứa các component có thể sử dụng chung được( ví dụ như 1 list view mà chỉ thay đổi label, data,... )
| |____navigations      Nơi chứa config navigation với screen(quan trọng)
| | |____navigator.config.js
| | |____navigationActions.js
| | |____AppNavigation.js
| |____api        Giống với service trên Project web(nơi khai báo các service gọi lên API lấy dữ liệu)
| |____data       Giả lập dữ liệu
| |____assets       Thư mục chứa các asset như icon, image, ...
| |____store        Thư mục store của redux-useful
| | |____index.js
| | |____models         Giống với models trên Project web(chỉ khác ở chỗ, tách reducers và sagas ra một folder riêng(sagas tương ứng với effects))
| | | |____index.js
| | | |____rootModel.js     config của root store
| | | |____auth             
| | | | |____sagas.js
| | | | |____index.js
| | | | |____reducers.js
| | | |____login
| | | | |____sagas.js
| | | | |____index.js
| | | | |____reducers.js

* Screen
https://drive.google.com/file/d/1KB8JQmL338mLIChY2a_ZlVCBHCqHYbbD/view?usp=sharing

## Example

Trước khi đi vào phát triển cần có hiểu biết basic về các kiến thức ở trên mục --Thư viện và Framework sử dung

Về cơ bản project được thiết kế theo giống với flow của Project web hiện tại, chỉ khác một vài cách trong sử dụng store và config navigation giữa các screen

* Để tạo một màn hình:
Cần hiểu được các loại navigation (stack, drawer, bottomtab)
Bước đầu tiên cần xác định Screen sẽ thuộc loại nào trong 3 loại navigation ở trên. -> xác định navigation Container và các navigation Children, trong đó navigation Container là 1 trong 3 loại navigation ở trên và các children của nó chính là các màn hình(screens)
Trong file navigator.config.js, một screen sẽ có config dạng
** Đối với navigation Container
```js
//navigator.config.js
...
    {
      routeName: "Auth",
      navigationType: "stack",
      navigatorConfig: {
        initialRouteName: "Auth/Login",
        headerMode: "screen"
      },
      routeConfigs:[
        ...
      ]
    }
...
```
Đoạn code trên cuối cùng sẽ quy về thành const Auth = createStackNavigator(RouteConfigs, StackNavigatorConfig); giống trên document của react-navigation
Trong đó: 
  - "routeName" là tên của container đó
  - "navigationType" là loại navigation trong 3 loại ở trên (nếu không phải là navigation Container thì bỏ qua thuộc tính này)
  - "navigatorConfig" ứng với StackNavigatorConfig trong hàm createStackNavigator ở trên
  - "routeConfigs" ứng với RouteConfigs trong hàm createStackNavigator ở trên(là một mảng các screen children), đây cũng chính là nơi chứa các navigation Children

** Đối với navigation Children
```js
//navigator.config.js
...
    routeConfigs:[
      {
        routeName: "Auth/Login",
        screen: "Auth/Login",
        navigationOptions: ({ navigation }) => ({
          title: `Login`,
          headerShown: false
        })
      },
    ]
...
```
Trong đó: 
  - "routeName" là tên của screen đó
  - "screen" là đường dẫn của component screen trong folder screens. ví dụ trên thì screen: "Auth/Login" tương ứng với địa chỉ file vật lý là "src/screens/Auth/Login"
  - "navigationOptions" ứng với config cho navigation đó(đọc các config này trên https://reactnavigation.org/docs/en/stack-navigator.html)

Việc config đối với navigation cho 1 màn hình đã xong, công việc còn lại là chỉnh lại các navigationConfig, navigationOptions(nếu muốn) và xây dựng component Screen đối với màn hình đó(trong xây dựng screen navigation thì có rất nhiều khái niệm đc đề cập tất cả và rõ ràng tại document của [reactnavigation](https://reactnavigation.org/docs/en/getting-started.html))

* Công việc tiếp theo là config một model cho store
thư mục model giống hệt so với model trong Project Web, còn folder api chính là folder service chỉ khác ở chỗ.
Trong model thì đã chia ra thành các thư mục riêng chứa 3 file chính là: 
index.js
reducers.js
sagas.js
Trong đó index.js sẽ chứa config dạng: 
```js
//index.js
...
export default {
  namespace: "auth",
  state: {},
  sagas,
  reducers,
  persistConfig
};
```
Giống với Project web duy chỉ có: sagas ứng với effects, persistConfig là một options mới(có thể bỏ qua nêu không dùng), để sử dụng cần có hiểu biết về [redux-persist](https://github.com/rt2zz/redux-persist)
Đối với sagas(effects) thì đối với Project web gọi ra các api như là call, put, ... thông qua arguments của function effects đó, nhưng ở trong Project này thì không cần phải như vậy mà thực chất các api đó là api của redux-saga vì vậy mà dùng đến api nào thì import nó vào ví dụ: 
```js
//saga.js
...
import { put, call, takeEvery, delay, select, take } from "redux-saga/effects";
...
``

### Author
barrydevp

### License

[MIT licensed](./LICENSE).
