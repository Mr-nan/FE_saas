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

import TabNavigator from 'react-native-tab-navigator';

import HomeSence  from '../main/HomeSence'
import CarSourceSence from '../main/CarSourceSence'
import MineSence from '../main/MineSence'
import FinanceSence from '../main/FinanceSence'
import PublishSence from '../main/PublishSence'
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();
import * as fontAndClolr from '../constant/fontAndColor';

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
const employerTabArray = [
    new tableItemInfo('firstpage', 'page11', '首页', require('../../images/mainImage/homeSelect.png'), require('../../images/mainImage/homeUnSelect.png'),
        <HomeSence/>),
    new tableItemInfo('carpage', 'page12', '车源', require('../../images/mainImage/carSelect.png'), require('../../images/mainImage/carUnSelect.png'),
        <CarSourceSence/>),
    new tableItemInfo('sendpage', 'page13', '发布', require('../../images/mainImage/publishSelect.png'), require('../../images/mainImage/publishUnSelect.png'),
        <PublishSence/>),
    new tableItemInfo('mypage', 'page14', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
        <MineSence/>)
];

const bossTabArray = [
    new tableItemInfo('firstpage', 'page1', '首页', require('../../images/mainImage/homeSelect.png'), require('../../images/mainImage/homeUnSelect.png'),
        <HomeSence/>),
    new tableItemInfo('carpage', 'page2', '车源', require('../../images/mainImage/carSelect.png'), require('../../images/mainImage/carUnSelect.png'),
        <CarSourceSence/>),
    new tableItemInfo('sendpage', 'page3', '发布', require('../../images/mainImage/sendButton.png'), require('../../images/mainImage/sendButton.png'),
        <PublishSence/>),
    new tableItemInfo('financePage', 'page4', '金融', require('../../images/mainImage/moneySelect.png'), require('../../images/mainImage/moneyUnSelect.png'),
        <FinanceSence/>),
    new tableItemInfo('mypage', 'page5', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
        <MineSence/>)
];

const financeTabArray = [
    new tableItemInfo('financePage', 'page24', '金融', require('../../images/mainImage/moneySelect.png'), require('../../images/mainImage/moneyUnSelect.png'),
        <FinanceSence/>),
    new tableItemInfo('mypage', 'page25', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
        <MineSence/>)
];


export default class MainPage extends Component {

    /**
     * 根据传过来的属性,判断身份
     */
    static defaultProps = {
        identity: 'boss'
    };

    /**
     * 初始化,指定tab及页面被选中
     */
    constructor(props) {
        super(props);

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

            selectedTab: tabArray[0].ref,
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
                onPress={() => this.setState({selectedTab: data.ref})}
                selectedTitleStyle={styles.selectedTitleStyle}

            >
                {data.topView}
            </TabNavigator.Item>

            items.push(tabItem);
        })
        return (
            <View style={styles.flex}>
                <TabNavigator
                    tabBarShadowStyle={{backgroundColor: fontAndClolr.COLORA4}}
                    sceneStyle={{borderColor: 'red'}}
                    tabBarStyle={{overflow: 'visible',height:Pixel.getPixel(50)}}
                    tabStyle={{borderColor: 'red'}}
                >

                    {items}

                </TabNavigator>
                <View style={[styles.imageStyle, this.props.identity == "finance" ? {width: 1} : {width: 0}]}></View>
                <TouchableOpacity activeOpacity={1} style={[styles.bigimg, styles.outImageStyle]}
                                  onPress={() => this.setState({selectedTab: 'sendpage'})}>
                    <Image style={styles.bigimg}
                           source={require('../../images/mainImage/sendButton.png')}/>
                </TouchableOpacity>
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
            width:Pixel.getPixel(56),
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
