
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
