/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager,
    RefreshControl
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
let movies = [];
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import OldPlanScene from './OldPlanListScene';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import StorageUtil from '../../utils/StorageUtil';
import * as StorageKeyNames from "../../constant/storageKeyNames";
export  default class AdjustListScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: [],
            isRefreshing: false
        };
    }

    componentWillUnmount(){
        movies = [];
    }


    initFinish = () => {
        this.getData();
    }

    allRefresh = () => {
        this.setState({renderPlaceholderOnly: 'loading'});
        this.getData();
    }

    getData = () => {
        StorageUtil.mGetItem(StorageKeyNames.USER_INFO,(datas)=>{
              if(datas.code==1){
                  let data = JSON.parse(datas.result);
                  let maps = {
                      api: Urls.REPAYMENT_GET_ADJUST_USE,
                      planid:this.props.items.planid,
                      user_id:data.base_user_id,
                  };
                  request(Urls.FINANCE, 'Post', maps)
                      .then((response) => {
                              movies = response.mjson.data;
                              let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                              this.setState({
                                  source: ds.cloneWithRows(movies),
                                  renderPlaceholderOnly: 'success',
                                  isRefreshing: false
                              });
                          },
                          (error) => {
                              if (error.mycode == '-2100045'||error.mycode == '-1') {
                                  this.setState({renderPlaceholderOnly: 'null', isRefreshing: false});
                              } else {
                                  this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                              }
                          });
              }
        });
    }

    refreshingData = () => {
        this.setState({isRefreshing: true});
        this.getData();
    };


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <NavigationView
                    title="选择优惠券"
                    backIconClick={this.backPage}
                />
                <ListView
                    style={{marginTop: Pixel.getTitlePixel(79)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
           <View/>
        )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="选择优惠券"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    navigatorParams = {
        name: 'OldPlanScene',
        component: OldPlanScene,
        params: {}
    }

    _navigatorRightView = () => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                this.toNextPage(this.navigatorParams)
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                }}>历史还款</Text>
            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(15),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})