import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    WebView,
} from 'react-native';
import Common from '../common/common';
import HeaderView from '../common/HeaderView';

export default class InformationPage extends Component {

    render() {
      const {rowDate} = this.props;
// console.log('uuuuuuuuuuuuuu:' + rowDate.faved);
        return (
            <View>
            <HeaderView
              titleView= {'备孕食谱'}
              leftIcon={'angle-left'}
              leftIconAction={() => this.props.navigator.pop()}
              rightShareIcon = {'share-alt'}/>
              <WebView
               style = {styles.web}
               source = {{uri: rowDate.page_url}}
               >
              </WebView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    web: {
        width: Common.window.width,
        height: Common.window.height-64,

    },
})
