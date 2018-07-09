/**
 * Created by zhengnan on 2018/7/9.
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    NativeModules,
    TouchableOpacity,
    ListView,
    Dimensions,
    StatusBar

}from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';

import * as AppUrls from "../../constant/appUrls";
import {request} from '../../utils/RequestUtil';

const Pixel = new PixelUtil();
const IS_ANDROID = Platform.OS === 'android';

export default class CarSuperviseCarSelectScreen extends BaseComponent{


      constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1==r2});
        this.state = {
            dataSource:ds.cloneWithRows(['','','','']),
        };
      }
    render(){
        return(
            <View style={styles.root}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderFooter={this.renderFooter}
                    renderSeparator={(sectionID,rowID)=>{return(<View key={`${sectionID}+${rowID}`} style={{backgroundColor:fontAndColor.COLORA4,height:StyleSheet.hairlineWidth}}/>)}}
                    enableEmptySections={true} />
                <NavigationView title="选择车辆" backIconClick={this.backPage}/>
            </View>
        )
    }

    renderRow =(rowData)=> {
        return(
            <View style={styles.carCell}>
                <View>
                    <Text style={styles.cellText}>车架号: JGFHGFEKFERTHJ</Text>
                    <Text style={[styles.cellText,{marginTop:Pixel.getPixel(10)}]}>车型信息: 2017款别克精英版 1.8TSI 手自一体</Text>
                </View>
                <Image source={require('../../../images/carSuperviseImage/xuanzhong.png')}/>
            </View>
        )
    }
    renderFooter =()=> {
        return(
            <View style={styles.footContainer}>
                <TouchableOpacity onPress={this.footBtnClick}>
                    <View style={styles.footView}>
                        <Text allowFontScaling={false}  style={styles.footText}>确定</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   root:{
       flex:1,
       backgroundColor:fontAndColor.COLORA3,
       paddingTop:Pixel.getTitlePixel(64),
   },
    carCell:{
        height:Pixel.getPixel(75),
        paddingHorizontal:Pixel.getPixel(15),
        flexDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'space-between'
    },
    cellText:{
        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.LITTLEFONT26,
    },
    footContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:Pixel.getPixel(30),

    },
    footView:{
        backgroundColor:fontAndColor.COLORB0,
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'center',
        width:width-Pixel.getPixel(30),
        borderRadius:Pixel.getPixel(3),
        marginBottom:Pixel.getPixel(20),
    },
    footText:{
        textAlign:'center',
        color:'white',
        fontSize:fontAndColor.BUTTONFONT30
    },
});