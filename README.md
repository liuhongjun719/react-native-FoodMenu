# FoodMenu
React native 实现含有侧滑功能的app，用Listview展示界面，可基于此，开发其他类似侧滑app；含有下拉刷新、上拉加载功能。

### Content
- [Screenshot](#screenshot)
- [Step](#step)
- [Usage snippets](#usage-snippets)

### Screenshot
![image](https://github.com/liuhongjun719/FoodMenu/blob/master/screenshots/1.png)
![image](https://github.com/liuhongjun719/FoodMenu/blob/master/screenshots/3.png)
![image](https://github.com/liuhongjun719/FoodMenu/blob/master/screenshots/2.png)


### Step
>* step1:  重启终端（以防之前打开过其他项目，会出现错误红屏界面）
>* step2:  npm install
>* step3:  nmp start


### Usage snippets
```javascript
import React from 'react';
import {
    Navigator,
    View,
    StyleSheet,
    Text,
    DeviceEventEmitter,
    InteractionManager,
} from 'react-native';

import FrontPageContainer from '../containers/FrontPageContainer';
import SideMenu from 'react-native-side-menu';

import LeftMenuContainer from '../containers/LeftMenuContainer';
import Common from '../common/common';


class App extends React.Component {
    render() {

        return (
            <View style={{ flex: 1 }}>
                <Navigator
                    initialRoute={{ name: 'FrontPageContainer', component: FrontPageContainer }}

                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    } }
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    } }
                    />
            </View>
        )
    }
}


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      openMenuOffset: 0,
    };
}

  componentDidMount() {
    DeviceEventEmitter.addListener('CloseOrOpen', (value) => {
      this.setState({
        isOpen: value,
        openMenuOffset: Common.window.width-100,
      })
    });
    DeviceEventEmitter.addListener('ClickRow', (data) => {
      this.setState({
        isOpen: data.value,
      })
      // TODO: 点击menu中的cell时，在主界面刷新
      InteractionManager.runAfterInteractions(() => {
          DeviceEventEmitter.emit('PushToNextPage', data.month_type);
      });
    });

  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('CloseOrOpen');
  }


  _closeOrOpenRight() {

  }


  render() {
    const menu =      <Navigator
                        initialRoute={{ name: 'LeftMenuContainer', component: LeftMenuContainer }}

                        configureScene={(route) => {
                            if (route.sceneConfig) {
                                return route.sceneConfig;
                            }
                            return Navigator.SceneConfigs.FloatFromRight;
                        } }
                        renderScene={(route, navigator) => {
                            let Component = route.component;
                            return (
                                <Component navigator = {navigator} route = {route} {...route.passProps} />
                            )
                        } }
                        />
    return (
      <SideMenu menu={menu}
       isOpen = {this.state.isOpen}
       openMenuOffset = {Common.window.width-100}
       edgeHitWidth = {300}
       >
        <App/>
      </SideMenu>
    );
  }
}

export default Application;
```


## Relevant Projects of React Native

* [`月子食谱App`](https://github.com/liuhongjun719/react-native-FoodMenu) 界面侧滑
* [`贷贷助手App`](https://github.com/liuhongjun719/react-native-DaidaiHelperNew) 比较完整的项目
* [`车迷之家康App`](https://github.com/liuhongjun719/FansHome) 比较完整的app
