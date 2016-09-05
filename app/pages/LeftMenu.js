import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    WebView,
    ListView,
    TouchableOpacity,
    Switch,
    InteractionManager,
    DeviceEventEmitter,
} from 'react-native';
import Common from '../common/common';
import LeftMenuHeaderView from '../common/LeftMenuHeaderView';
import Icon from 'react-native-vector-icons/FontAwesome';


// TODO: 用于传递接口中的数据month_type： 1 或 2
var data = {
  value: false,
  month_type: 1,
}

export default class HomeDetil extends Component {
  constructor(props) {
      super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
          dataSource: ds.cloneWithRows(['准妈妈必吃', '准爸爸必吃']),
          savedRowID: 0,
      };
  }



  _renderRow(
    rowData: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    console.log('666666666666666666666666666666');
    return(
      <TouchableOpacity
      activeOpacity={0.75}
      onPress={this._onPressFeedItem.bind(this, rowID)}>
        <View style = {this.state.savedRowID == rowID ? styles.container_selected : styles.container}>
            <Text style = {styles.title_text}>{rowData}</Text>
            <Icon color="gray" size={20} name='angle-right'/>
        </View>
      </TouchableOpacity>
    );

  }


  _onPressFeedItem(rowID) {
    console.log('rowID------:' + rowID);
    let month_type = '1';
    if (rowID == 1) {
      month_type = '2';
    }
    console.log('savedRowID=====before====:' + this.state.savedRowID);
    this.setState({
      savedRowID: rowID,
    });
    console.log('savedRowID=====after====:' + this.state.savedRowID);
    data.month_type = month_type;
      InteractionManager.runAfterInteractions(() => {
          DeviceEventEmitter.emit('ClickRow', data);
      });
  }



    render() {
      console.log('555555555555555555555555');
        return (
            <View style = {{width: Common.window.width-50, backgroundColor: 'rgb(243,245,246)'}}>
              <LeftMenuHeaderView
               />
                <ListView
                  style = {styles.list}
                  dataSource = {this.state.dataSource}
                  renderRow = {this._renderRow.bind(this)}
                  />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    list: {
        width: Common.window.width-50,
        height: Common.window.height-100-45,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: 'rgb(243,157,149)'
    },
    container: {
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'rgb(243,245,246)',
        borderBottomColor: 'rgb(216, 222, 225)',
        borderBottomWidth: 0.5,
        backgroundColor: 'rgb(243,157,149)'
    },
    container_selected: {
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'rgb(243,245,246)',
        borderBottomColor: 'rgb(216, 222, 225)',
        borderBottomWidth: 0.5,
        backgroundColor: 'rgb(244,189,185)'
    },
    menu_bottom_view: {
      height: 45,
      width: Common.window.width-50,
      backgroundColor: 'rgb(243,245,246)',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 5,
    },
    title_text: {
      marginLeft: 30,
      color: 'white',
    },
    menu_bottom_item: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text_item: {
      textAlign: 'center',
      marginTop: 5,
      fontSize: 14,
      fontWeight: '100',
    }
})
