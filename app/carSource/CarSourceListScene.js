/**
 * Created by zhengnan on 17/2/9.
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    BackAndroid,
    NativeModules,

} from 'react-native';


import * as fontAndColor    from '../constant/fontAndColor';
import BaseComponent        from '../component/BaseComponent';
import CarInfoScene         from './CarInfoScene';
import PixelUtil            from '../utils/PixelUtil';
import ZNSwitchoverButton from './znComponent/ZNSwitchoverButton';
import CarUserListScene from './CarUserListScene';



let Pixel = new PixelUtil();
let carFilterData = require('./carData/carFilterData.json');

let carData = [];




export  default  class carSourceListScene extends BaseComponent {

    handleBack = () => {
        NativeModules.VinScan.goBack();
        return true;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态


    }


    // 选择城市列表
    loactionClick = () => {

        let navigatorParams = {
            name: "CityListScene",
            component: CityListScene,
            params: {
                checkedCarType: this.state.checkedCarType,
                checkedCarClick: this.checkedCarClick,
            }
        }
        this.props.callBack(navigatorParams);
    }

    carCellOnPres = (carID, modelID,sectionID, rowID) => {


        let navigatorParams = {

            name: "CarInfoScene",
            component: CarInfoScene,
            params: {
                carID: carID,
            }
        };
        this.props.callBack(navigatorParams);
    };


    renderPlaceholderView = () => {
        return (
            <View style={{flex:1,backgroundColor:fontAndColor.COLORA3,alignItems: 'center'}}>
                {this.loadView()}
            </View>
        );
    }

    render() {

        return (
            <View style={styles.contaier}>
                <CarListNavigatorView  loactionClick={this.loactionClick} />
                <CarUserListScene showModal={this.props.showModal} callBack={this.props.callBack}/>
            </View>

        )

    }
}


class CarListNavigatorView extends Component {

    render() {
        return (

            <View style={styles.navigatorView}>
                <View style={styles.navitgatorContentView}>
                    {/*<TouchableOpacity style={styles.navigatorLoactionView} onPress={this.props.loactionClick}>*/}
                    {/*<Image style={{marginLeft:15}} source={require('../../images/carSourceImages/location.png')}/>*/}
                    {/*<Text allowFontScaling={false}  style={styles.navigatorText}>全国</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity onPress={this.props.searchClick}>*/}
                        {/*<View style={styles.navigatorSousuoView}>*/}
                            {/*<Image style={{marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(10)}}*/}
                                   {/*source={require('../../images/carSourceImages/sousuoicon.png')}/>*/}
                            {/*<Text allowFontScaling={false}  style={styles.navigatorSousuoText}>请输入车型关键词</Text>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity onPress={this.props.ScreeningClick}>*/}
                        {/*<View style={{marginLeft:Pixel.getPixel(20),width:Pixel.getPixel(50),height:Pixel.getPixel(40),justifyContent:'center',*/}
                            {/*alignItems:'center'}}>*/}
                            {/*<Text allowFontScaling={false}  style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>筛选</Text>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    <ZNSwitchoverButton/>
                </View>
            </View>

        )
    }
}

var ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({

    contaier: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },

    navigatorView: {
        top: 0,
        height: Pixel.getTitlePixel(64),
        backgroundColor: fontAndColor.COLORB0,
        flexDirection: 'row',
    },
    navitgatorContentView: {

        flex: 1,
        flexDirection: 'row',
        marginTop: Pixel.getTitlePixel(20),
        height: Pixel.getPixel(44),
        alignItems: 'center',
        justifyContent: 'center',

    },
});