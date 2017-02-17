/**
 * Created by zhengnan on 17/2/16.
 */


import React,{Component} from 'react';
import {

    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,

} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import *as fontAnColor from '../constant/fontAndColor';
import NavigationView from './znComponent/CarInfoNavigationView';
import PixelUtil from '../utils/PixelUtil';
var Pixel = new PixelUtil();

const carData = require('./carData');
export default class CarBrandSelectScene extends BaseComponent{

    initFinish=()=>{

    };

    _backIconClick=()=>{

        this.backPage();
    };


    // 构造
      constructor(props) {
          super(props);

          let getSectionData = (dataBlob, sectionID) => {
              return dataBlob[sectionID];
          };

          let getRowData = (dataBlob, sectionID, rowID) => {
              return dataBlob[sectionID + ":" + rowID];
          };


          var dataSource = new ListView.DataSource({
              getSectionData: getSectionData,
              getRowData: getRowData,
              rowHasChanged: (r1, r2) => r1 !== r2,
              sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
          })


          var dataBlob = {}, sectionIDs = [], rowIDs = [], cars = [];

          for (var i = 0; i < carData.length; i++) {
              //把组号放入sectionIDs数组中
              sectionIDs.push(i);
              //把组中内容放入dataBlob对象中
              dataBlob[i] = carData[i].title;
              //把组中的每行数据的数组放入cars
              cars = carData[i].cars;
              //先确定rowIDs的第一维
              rowIDs[i] = [];
              //遍历cars数组,确定rowIDs的第二维
              for (var j = 0; j < cars.length; j++) {
                  rowIDs[i].push(j);
                  //把每一行中的内容放入dataBlob对象中
                  dataBlob[i + ':' + j] = cars[j];
              }
              this.state = {
                  dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
              };
          }
      }

    // 每一行中的数据
    renderRow(rowData){
        return (
            <TouchableOpacity>
                <View style={styles.rowCell}>
                    <Image style={styles.rowCellImag}></Image>
                    <Text style={styles.rowCellText}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    // 每一组对应的数据
    renderSectionHeader(sectionData,sectionId){
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionText}>{sectionData}</Text>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.rootContainer}>
                <ListView style={{flex:1,marginTop:64}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    contentContainerStyle={styles.listStyle}
                />
                <View style={styles.navigation}>
                    <NavigationView
                        title="选择品牌"
                        backIconClick={this._backIconClick}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    rootContainer:{
        flex:1,
    },
    navigation:{

        height:Pixel.getPixel(64),
        // height:64,
        backgroundColor:fontAnColor.COLORB0,
        left:0,
        right:0,
        position:'absolute',

    },

    sectionHeader:{
        backgroundColor:fontAnColor.COLORA3,
        height:40,
        justifyContent:'center'
    },
    sectionText:{
        marginLeft:31,
        color:fontAnColor.COLORA1,
        fontSize:fontAnColor.LITTLEFONT,
    },
    rowCell:{

        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:fontAnColor.COLORA3,
        height:44,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',

    },
    rowCellImag:{
        width:40,
        height:40,
        marginLeft:15,
        backgroundColor:fontAnColor.COLORB0
    },
    rowCellText:{
        marginLeft:5,
        color:fontAnColor.COLORA0,
        fontSize:fontAnColor.LITTLEFONT,
    },

});