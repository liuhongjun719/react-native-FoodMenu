

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    View,
    RefreshControl,
    ScrollView,
    Navigator,
    DeviceEventEmitter,
    InteractionManager,
} from 'react-native';


import * as FrontPageAction from '../actions/FrontPageAction.js';
import Common from '../common/common';
import InformationPage from './InformationPage';
import HeaderView from '../common/HeaderView';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
require('moment/locale/zh-cn');
import LoadMoreFooter from '../common/LoadMoreFooter';
import Loading from '../common/Loading';




let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
let isNoData = false;
let page = 1;
let month = 1;

class FrontPage extends Component {
    constructor(props) {
        super(props);
        this._renderRow = this.renderRow.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
          const {dispatch} = this.props
          dispatch(FrontPageAction.frontPageAction(isNoData,isLoadMore, isRefreshing, isLoading, page, month));
        })


        DeviceEventEmitter.addListener('PushToNextPage', (value) => {
          // console.log('oooooooooo---------' + value);
          if (value != month) {// TODO: 如果是同一个界面，则不需要从新刷新界面
            InteractionManager.runAfterInteractions(() => {
                const {dispatch} = this.props;
                isLoadMore = false;
                isRefreshing = true;
                page = 1;
                month = value;
                dispatch(FrontPageAction.frontPageAction(isNoData,isLoadMore, isRefreshing, isLoading, page, month));
            })
          }

        });
    }



    // TODO: 点击导航左侧Menu按钮时，打开或者关闭左侧列表
    _closeOrOpneLeftMenu() {
    InteractionManager.runAfterInteractions(() => {
      DeviceEventEmitter.emit('CloseOrOpen', true);
    });

    }


    render() {
        const {FrontPage} = this.props;
        let classList = FrontPage.ClassDate;
        return (
            <View style = {{backgroundColor: 'white'}}>
                <HeaderView
                    titleView= '备孕食谱'
                    leftMenu = 'navicon'
                    leftMenuAction = {this._closeOrOpneLeftMenu.bind(this)}/>
                {FrontPage.isLoading ?<Loading/>:
                    <ListView
                      dataSource={this.state.dataSource.cloneWithRows(classList) }
                      renderRow={this._renderRow}
                      enableEmptySections={true}
                      initialListSize= {25}
                      onScroll={this._onScroll}
                      onEndReached={this._onEndReach.bind(this) }
                      onEndReachedThreshold={25}
                      renderFooter={this._renderFooter.bind(this) }
                      style={{ height: Common.window.height - 64, backgroundColor: 'white' }}
                      refreshControl={
                        <RefreshControl
                          refreshing={FrontPage.isRefreshing}
                          onRefresh={this._onRefresh.bind(this) }
                          title="正在加载中……"
                          color="#ccc"
                          style = {{marginLeft: 50}}
                          />
                      }
                      />
                }
            </View>
        );

    }

    renderRow(rowDate) {
      return (
        <TouchableOpacity
            activeOpacity={0.75}
            onPress={this._onPressFeedItem.bind(this, rowDate) }
            >
              <View style = {styles.back_view}>
                <Image source = {{uri: rowDate.imgurl}} style = {styles.image_left}></Image>
                <View style = {styles.right_view}>
                  <Text style = {styles.title_text}>{rowDate.title}</Text>
                  <Text numberOfLines = {2} style = {styles.description_text}>{rowDate.description}</Text>
                </View>
              </View>

        </TouchableOpacity>
      );
    }


    _onPressFeedItem(rowDate) {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'InformationPage',
                component: InformationPage,
                passProps: {
                    rowDate: rowDate,
                }
            })
        });
    }

    _renderFooter() {
      const {FrontPage} = this.props;
      return <LoadMoreFooter title = {(FrontPage.isNoData) ? '没有更多数据了' : '正在加载更多……'}
                type = {(FrontPage.isNoData) ? 'NoData' : 'HasData'}/>
    }

    _onScroll() {
      if (!isLoadMore) isLoadMore = true;
    }

    // 下拉刷新
    _onRefresh() {
      // if (isLoadMore) {
        const {dispatch} = this.props;
        isLoadMore = false;
        isRefreshing = true;
        page = 1;
        dispatch(FrontPageAction.frontPageAction(isNoData,isLoadMore, isRefreshing, isLoading, page, month));

      // }
    }

    // 上拉加载
    _onEndReach() {

      InteractionManager.runAfterInteractions(() => {
        const {dispatch} = this.props;
        isLoadMore = true;
        isLoading = false;
        page++;
        dispatch(FrontPageAction.frontPageAction(isNoData,isLoadMore, isRefreshing, isLoading, page, month));

      })

    }

}

const styles = StyleSheet.create({
// TODO: cell
  back_view: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomColor:'rgb(193,192,197)',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },

  image_left: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  right_view: {
    flexDirection: 'column',
    flex: 1,//注意
  },
  title_text: {
    fontSize: 20,
  },
  description_text: {
    fontSize: 13,
    color: 'rgb(128,128, 128)',
    marginTop: 20,
  },
  view_line: {
    height: 1,
    borderBottomColor:'rgb(193,192,197)',
  },


});

module.exports = FrontPage;
