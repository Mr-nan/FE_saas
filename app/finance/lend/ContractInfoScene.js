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
    InteractionManager,
    Modal
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
let RJson = require('./contrac.json');
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
let imageItems = [];
import ViewPager from 'react-native-viewpager';
import SelectLoanNumber from './component/SelectLoanNumber';

export  default class ContractInfoScene extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {renderPlaceholderOnly: 'blank', dataSource: []};
    }


    initFinish = () => {
        this.getData();
    }

    getData = () => {
        for (let i = 0; i < RJson.retdata[0].contract.length; i++) {
            imageItems.push(...RJson.retdata[0].contract[i].pic);
        }
        console.log(imageItems);
        let ds = new ViewPager.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithPages(imageItems),
            renderPlaceholderOnly: 'success',
        });
    }


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{flex:1}}>
                <NavigationView
                    title="合同"
                    backIconClick={this.backPage}
                />
                <View style={{marginTop:Pixel.getTitlePixel(64),flex:1}}>
                    <ViewPager
                        dataSource={this.state.dataSource}    //数据源（必须）
                        renderPage={this._renderPage}         //page页面渲染方法（必须）
                        isLoop={false}                        //是否可以循环
                        autoPlay={false}                      //是否自动
                        initialPage={0}       //指定初始页面的index
                        locked={false}                        //为true时禁止滑动翻页
                        renderPageIndicator={this._renderPageIndicator}
                    />
                </View>
                <View style={{width:width,height:Pixel.getPixel(44),flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=>{
                        this.refs.selectloannumber.openModal('aa');
                    }} activeOpacity={0.8} style={{flex:1,backgroundColor:fontAndColor.COLORA2,justifyContent:'center'
                    ,alignItems:'center',flexDirection:'row'}}>
                        <Image style={{width:Pixel.getPixel(14),height:Pixel.getPixel(15)}}
                               source={require('../../../images/financeImages/contractInfo.png')}/>
                        <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        color:'#fff'}}> 选择单号</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={{flex:1,backgroundColor:fontAndColor.COLORB0,justifyContent:'center'
                    ,alignItems:'center'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        color:'#fff'}}>签署合同</Text>
                    </TouchableOpacity>
                </View>
                <SelectLoanNumber ref="selectloannumber" viewData={RJson.retdata} vinPress={(text,rowID)=>{
                    alert(text+'==============='+rowID);
                }}/>
            </View>
        );

    }

    _renderPage = (data) => {

        return (
            <Image style={{flex:1}}
                   source={{uri: data}}
            />
        );

    }

    _renderPageIndicator = () => {

        return (
            <View
            />
        );

    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height}}>
                {this.loadView()}
                <NavigationView
                    title="合同"
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
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'red',
    }
})