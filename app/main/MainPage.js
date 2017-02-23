/**
 * Created by yujinzhong on 2017/2/7.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    PixelRatio,
    TouchableOpacity
} from 'react-native';

const {width, height} = Dimensions.get('window');
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();
import TabNavigator from 'react-native-tab-navigator';

import HomeSence  from './HomeScene'
import CarSourceSence from '../carSource/CarSourceListScene'
import MineSence from './MineScene'
import FinanceSence from './FinanceScene'
import PublishModal from './PublishModal'


import * as fontAndClolr from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';

export class tableItemInfo {
    constructor(ref, key, title, selectedImg, defaultImg, topView) {

        this.ref = ref;
        this.key = key;
        this.title = title;
        this.selectedImg = selectedImg;
        this.defaultImg = defaultImg;
        this.topView = topView;

    }

}
;


export default class MainPage extends BaseComponent {

    /**
     * 根据传过来的属性,判断身份
     */
    static defaultProps = {
        identity: 'boss'
    };

    initFinish = ()=> {

    }

    /**
     * 初始化,指定tab及页面被选中
     */
    constructor(props) {
        super(props);
        const employerTabArray = [
            new tableItemInfo('firstpage', 'page11', '首页', require('../../images/mainImage/homeSelect.png'), require('../../images/mainImage/homeUnSelect.png'),
                <HomeSence />),
            new tableItemInfo('carpage', 'page12', '车源', require('../../images/mainImage/carSelect.png'), require('../../images/mainImage/carUnSelect.png'),
                <CarSourceSence/>),
            new tableItemInfo('sendpage', 'page13', '发布', require('../../images/mainImage/publishSelect.png'), require('../../images/mainImage/publishUnSelect.png'),
                <PublishModal callBack={(params)=> {
                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('mypage', 'page14', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
                <MineSence/>)
        ];

        const bossTabArray = [
            new tableItemInfo('firstpage', 'page1', '首页', require('../../images/mainImage/homeSelect.png'), require('../../images/mainImage/homeUnSelect.png'),
                <HomeSence/>),
            new tableItemInfo('carpage', 'page2', '车源', require('../../images/mainImage/carSelect.png'), require('../../images/mainImage/carUnSelect.png'),

                <CarSourceSence callBack={(params)=> {

                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('sendpage', 'page3', '发布', require('../../images/mainImage/sendButton.png'), require('../../images/mainImage/sendButton.png'),
                <PublishModal callBack={(params)=> {
                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('financePage', 'page4', '金融', require('../../images/mainImage/moneySelect.png'), require('../../images/mainImage/moneyUnSelect.png'),
                <FinanceSence callBack={(params) => {
                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('mypage', 'page5', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
                <MineSence callBack={(params)=> {
                    this.toNextPage(params);
                }}/>)
        ];

        const financeTabArray = [
            new tableItemInfo('financePage', 'page24', '金融', require('../../images/mainImage/moneySelect.png'), require('../../images/mainImage/moneyUnSelect.png'),
                <FinanceSence/>),
            new tableItemInfo('mypage', 'page25', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
                <MineSence/>)
        ];

        if (this.props.identity == "boss") {
            // this.setState({selectedTab:'home'});
            tabArray = bossTabArray;

        } else if (this.props.identity == "employer") {
            // this.refs.firstpage.changeStates(this.refs.firstpage.props.title);
            tabArray = employerTabArray
        } else if (this.props.identity == "finance") {
            // this.refs.financePage.changeStates(this.refs.financePage.props.title);
            tabArray = financeTabArray
        }

        this.state = {

            // selectedTab: tabArray[0].ref,
            selectedTab: tabArray[tabArray.length - 1].ref,
        }
    }

    render() {
        let items = [];

        tabArray.map((data) => {
            let tabItem;
            tabItem = <TabNavigator.Item
                selected={this.state.selectedTab === data.ref}
                key={data.key}
                title={data.title}
                renderSelectedIcon={() => <Image style={data.key === 'page3' ? styles.bigimg : styles.img}
                                                 source={data.selectedImg}/>}
                renderIcon={() => <Image style={data.key === 'page3' ? styles.bigimg : styles.img}
                                         source={data.defaultImg}/>}
                onPress={() => {
                    if(data.ref==='sendpage'){
                        this.publishModal.openModal();
                    }else{
                        this.setState({selectedTab: data.ref})}}
                    }
                selectedTitleStyle={styles.selectedTitleStyle}


            >
                {data.topView}
            </TabNavigator.Item>

            items.push(tabItem);
        })
        return (
            <View style={styles.flex}>
                <PublishModal callBack={(params)=> {
                    this.toNextPage(params);}} ref={(modal) => {this.publishModal = modal}}/>
                <TabNavigator

                    sceneStyle={{backgroundColor: '#00000000'}}
                    tabBarShadowStyle={{backgroundColor: '#00000000'}}
                    tabBarStyle={{overflow: 'visible', height: Pixel.getPixel(75), backgroundColor: '#00000000'}}


                >
                    {items}
                </TabNavigator>
                <View
                    style={[styles.imageStyle, this.props.identity == "finance" ? {width: Pixel.getPixel(1)} : {width: 0}]}></View>

            </View>
        );
    }
}


const
    styles = StyleSheet.create({

        flex: {
            flex: 1,
        },
        img: {

            width: Pixel.getPixel(26),
            height: Pixel.getPixel(26),

        },
        center: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        bigimg: {
            width: Pixel.getPixel(56),
            height: Pixel.getPixel(56),
        },
        selectedTitleStyle: {
            color: fontAndClolr.COLORB0
        },
        imageStyle: {
            position: 'absolute',
            bottom: Pixel.getPixel(10),
            left: width / 2.0 - 0.5,
            width: 1,
            height: Pixel.getPixel(30),
            backgroundColor: "lightgray",
        },
        outImageStyle: {
            position: 'absolute',

            bottom: Pixel.getPixel(16),
            left: width / 2 - Pixel.getPixel(56) / 2
        }
    });
