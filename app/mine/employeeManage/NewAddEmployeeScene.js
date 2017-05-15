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
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
let childItems = [];
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
import AddEmployeeInput from './component/AddEmployeeInput';
let comps = [];
export  default class BankCardScene extends BaseComponent {

    constructor(props) {
        super(props);
        childItems = [];
        comps = [];
        // 初始状态
        childItems.push({name:'姓名',value:''});
        childItems.push({name:'性别',value:''});
        childItems.push({name:'所属公司',value:[]});
        childItems.push({name:'角色',value:''});
        childItems.push({name:'账号',value:''});
        childItems.push({name:'密码',value:''});
        childItems.push({name:'确认密码',value:''});
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: ds.cloneWithRows(childItems)
        };
    }

    initFinish = () => {
        this.getData();
    }

    getData=()=>{
        StorageUtil.mGetItem(StorageKeyNames.ENTERPRISE_LIST, (data) => {
            if (data.code == 1 && data.result != null) {
                comps = JSON.parse(data.result);
                this.setState({
                    renderPlaceholderOnly: 'success',
                });
            }
        })
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ListView
                    style={{marginTop: Pixel.getTitlePixel(79)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                />
                <NavigationView
                    title="添加员工"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
            return (
                <AddEmployeeInput/>
            )


    }



    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="添加员工"
                    backIconClick={this.backPage}
                />
            </View>
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
        height: Pixel.getPixel(10),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})