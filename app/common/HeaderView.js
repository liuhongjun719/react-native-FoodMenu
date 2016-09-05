
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../common/common';

import Util from './utils';
import { toastShort } from '../common/ToastUtil';




export default class Header extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }



    render() {
        let NavigationBar = [];

        // 左边menu
        if (this.props.leftMenu != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftMenu'}
                    activeOpacity={0.75}
                    style={styles.leftMenu}
                    onPress={this.props.leftMenuAction}
                    >
                    <Icon color="white" size={20} name={this.props.leftMenu}/>
                </TouchableOpacity>
            )
        }



        // 左边图片按钮
        if (this.props.leftIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftIcon'}
                    activeOpacity={0.75}
                    style={styles.leftIcon}
                    onPress={this.props.leftIconAction}
                    >
                    <Icon color="white" size={30} name={this.props.leftIcon}/>
                </TouchableOpacity>
            )
        }

        // 自定义标题View
        if (this.props.titleView != undefined) {
            let Component = this.props.titleView;

            NavigationBar.push(
                <Text key={'titleView'} style={styles.titleView}>{this.props.titleView}</Text>
            )
        }



        // 右边 分享 按钮
        if (this.props.rightShareIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightShareIcon'}
                    activeOpacity={0.75}
                    style={styles.rightIcon}
                    onPress={this.props.rightRepeatAction}
                    >
                    <Icon color='white'  size={20} name={this.props.rightShareIcon}/>
                </TouchableOpacity>
            )
        }


        return (
            <View style={styles.navigationBarContainer}>
                {NavigationBar}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    navigationBarContainer: {
        marginTop: 0,
        flexDirection: 'row',
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(243,157,149)'
    },


    titleView: {
        fontSize: 15,
        color: 'white',
        marginTop: 10,
    },

    leftIcon: {
       left: -Common.window.width/2+50,
       marginTop: 10,
    },
    leftMenu: {
      left: -Common.window.width/2+50,
      marginTop: 15,
    },

    rightIcon: {
      left: Common.window.width/2-60,
      marginTop: 15,
    },

})
