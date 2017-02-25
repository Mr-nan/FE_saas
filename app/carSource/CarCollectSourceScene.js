/**
 * Created by ZN on 17/2/25.
 */

import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ListView,

} from 'react-native';

import BaceComponent from '../component/BaseComponent';
import NavigatorView from '../component/AllNavigationView';
import CarCell     from './znComponent/CarCell';
import * as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

var screenWidth = Dimensions.get('window').width;


let carData1 = [
    {
        title:'[北京]奔驰S400L(进口)AMG版',
        subTitle:'2016年7月/3万公里',
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
    },
    {
        title:'[北京]奔驰C200L(国产)',
        subTitle:'2016年7月/3万公里',
    },
    {
        title:'[北京]宝马X5',
        subTitle:'2016年7月/3万公里',
    },

];


export default class CarCollectSourceScene extends BaceComponent{

    initFinish=()=>{

    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id == r2.id });
        this.state = {

            carData:carData.cloneWithRows(carData1),

        };
    }


    render(){
        return( <View style={styles.rootContainer}>
            <ListView style={{backgroundColor:fontAndColor.COLORA3,marginTop:Pixel.getTitlePixel(64)}}
                      dataSource={this.state.carData}
                      renderRow={(rowData) =>
                          <CarCell carMainText={rowData.title} carSubText={rowData.subTitle} showBtn={true}/>}
            />
            <NavigatorView title='我的收藏' backIconClick={this.backPage}/>
        </View>)

    }

}



const styles = StyleSheet.create({

    rootContainer:{
        flex:1,
        backgroundColor:'white',

    },

})