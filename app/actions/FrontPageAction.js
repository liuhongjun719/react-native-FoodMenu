

import * as types from './actionTypes';
import Util from '../common/utils';

export let frontPageAction = (isNoData,isLoadMore, isRefreshing, isLoading, page, month) => {
    let URL = 'http://app_matrix.zhilehuo.com/app_matrix/api/beiyun?appname=shibeiyunshipu&version=1.0.0&os=ios&hardware=iphone&month=';
    URL += month;
    URL += '&page=';
    URL += page;
    console.log('食谱URL=======:' + URL);
    return dispatch => {
        dispatch(feachClassList(isNoData,isLoadMore, isRefreshing, isLoading));
        return Util.get(URL,(response) => {
            var isExistData = (response.data.recipes.length == 0) ? true : false;
            dispatch(receiveClassList(response, isExistData));
        },(error) => {
            console.log('分类数据error==>' + error);
            dispatch(receiveClassList([]));
        });
    }
}

let feachClassList = (isNoData, isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_FRONTPAGE_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
        isNoData: isNoData,
    }
}

let receiveClassList = (response, isExistData) => {
    return {
        type: types.RECEIVE_FRONTPAGE_LIST,
        classList: response.data.recipes,
        isNoData: isExistData,
    }
}

export let resetState = ()=> {
    return {
        type: types.RESET_FRONTPAGE_STATE,
    }
}
