/**
 * Created by zhengnan on 2017/5/9.
 */


import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity

} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import * as fontAndColor from '../constant/fontAndColor';


import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

const provinceData = (require('./carData/carFilterData.json')).provinceSource;

 export default class ProvinceListScene extends BaseComponent{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态

          let dataSource = new  ListView.DataSource(
              {

              }
          );
        this.state = {
            dataSource:dataSource,
        };
      }

    render(){
        return(
            <View style={styles.rootContainer}>
            <ListView/>
        </View>)
    }

}


const styles = StyleSheet.create({

    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
    }


});