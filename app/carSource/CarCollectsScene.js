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
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';
import NavigationView from '../component/AllNavigationView';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../finance/repayment/component/RepaymenyTabBar';
import NewCarCollectSourceScene from './NewCarCollectSourceScene'
import OldCarCollectSourceScene from './OldCarCollectSourceScene'
import CarInfoScene from './CarInfoScene'
import CarNewInfoScene from './CarNewInfoScene'
let index = 0;
export  default class CarCollectsScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
        };
    }

    initFinish = () => {
        this.setState({
            renderPlaceholderOnly: 'success',
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ScrollableTabView
                    style={{marginTop: Pixel.getTitlePixel(64), flex: 1}}
                    initialPage={0}
                    locked={true}
                    onChangeTab={(obj) => {
                            index = obj.i;
                        }
                    }
                    renderTabBar={() => <RepaymenyTabBar tabName={['新车','二手车']}/>}
                >
                    {/*新车*/}
                    <NewCarCollectSourceScene ref="new" tabLabel="ios-paper0"
                                              showToast={(str)=>{this.props.showToast(str)}}
                                              toNextPage={(id)=>{this.toNextPage({name:'CarNewInfoScene',component:CarNewInfoScene,params:{carID:id}})}}/>

                    {/*二手车*/}
                    <OldCarCollectSourceScene ref="old" tabLabel="ios-paper1"
                                              showToast={(str)=>{this.props.showToast(str)}}
                                              toNextPage={(id)=>{this.toNextPage({name:'CarInfoScene',component:CarInfoScene,params:{carID:id}})}}/>

                </ScrollableTabView>
                <NavigationView
                    title="我的收藏"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _navigatorRightView = () => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    this.refs.selectdate.changeVisible(true);
            }}>
                <Image style={{width:Pixel.getPixel(20),height:Pixel.getPixel(20)}}
                       source={require('../../images/mainImage/selecttime.png')}/>
            </TouchableOpacity>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="我的收藏"
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