/**
 * Created by zhengnan on 2017/4/19.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ListView,

} from 'react-native';

var ScreenWidth = Dimensions.get('window').width;

import *as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();


// 切换头部按钮
export class CarDeploySwitchoverButton extends Component{

// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {

        currentSwitchoverType:0,
    };
  }

    render(){
        return(
            <View style={styles.carDeploySwitchoverButton}>
                <TouchableOpacity style={[styles.carDeploySwitchoverItemView,this.state.currentSwitchoverType==0&&{borderBottomWidth:1,borderBottomColor:fontAndColor.COLORB0}]}
                                  onPress={()=>{this.switchoverAction(0)}} activeOpacity={1}>
                    <Text style={[styles.carDeploySwitchoverItemText,this.state.currentSwitchoverType==0 && {color:fontAndColor.COLORB0}]}>基本信息</Text>
                </TouchableOpacity>
                <View style={{backgroundColor:fontAndColor.COLORA4,width:StyleSheet.hairlineWidth,height:20}}/>
                <TouchableOpacity  style={[styles.carDeploySwitchoverItemView ,this.state.currentSwitchoverType==1&&{borderBottomWidth:1,borderBottomColor:fontAndColor.COLORB0}]}
                                   onPress={()=>{this.switchoverAction(1)}} activeOpacity={1}>
                    <Text  style={[styles.carDeploySwitchoverItemText,this.state.currentSwitchoverType==1 && {color:fontAndColor.COLORB0}]}>车辆配置</Text>
                </TouchableOpacity>
            </View>
        )
    }

    switchoverAction=(type)=>{

        if(this.state.currentSwitchoverType!=type){
            this.setState({
                currentSwitchoverType:type,
            });

            this.props.switchoverAction(type);
        }
    }
}

// 车辆配置view
export class CarConfigurationView extends Component{

    // 构造
      constructor(props) {
        super(props);

        const dataSource = new  ListView.DataSource({
            getSectionData:(dataBlob,sectionID)=>{ return dataBlob[sectionID]},
            getRowData:(dataBlob,sectionID,rowID)=>{return dataBlob[sectionID+':'+rowID]},
            rowHasChanged:(r1,r2) => r1!==r2,
            sectionHeaderHasChanged:(s1,s2) => s1!==s2,
        });

          var dataBlob = {}, sectionIDs = [], rowIDs = [], rows = [];
          var array = this.props.carConfigurationData;

          for (var i = 0; i < array.length; i++) {
              sectionIDs.push(i);
              dataBlob[i] = array[i].title;
              rows = array[i].carInfo;
              rowIDs[i] = [];
              for (var j = 0; j < rows.length; j++) {
                  rowIDs[i].push(j);
                  //把每一行中的内容放入dataBlob对象中
                  dataBlob[i + ':' + j] = rows[j];
              }
          }

        // 初始状态
        this.state = {
            dataSource:dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
        };
      }

    render(){
        return(
        <View style={{flex:1}}>
            <ListView
                      dataSource={this.state.dataSource} renderRow={(rowData, sectionID, rowID)=>{
                return(<View  style={styles.carConfigurationViewItem}>
                    <Text style={styles.carConfigurationViewItemtTitleText}>{rowData.title}</Text>
                    <Text style={styles.carConfigurationViewItemtValueText}>{rowData.value}</Text>
                </View>) }} renderSectionHeader={(sectionData, sectionId)=>{return(<View style={styles.carConfigurationViewItemHead}>
                <Text style={styles.carConfigurationViewItemHeadText}>{sectionData}</Text>
            </View>)}}/>
        </View>
        )
    }

}

const styles= StyleSheet.create({

    carDeploySwitchoverButton:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        height:Pixel.getPixel(44),
        flex:1,
        borderBottomColor:fontAndColor.COLORA4,
        borderBottomWidth:StyleSheet.hairlineWidth,

    },
    carDeploySwitchoverItemView:{

        width:ScreenWidth/2-(StyleSheet.hairlineWidth/2),
        height:Pixel.getPixel(44),
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'


    },
    carDeploySwitchoverItemText:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        textAlign:'center',
    },
    carConfigurationViewHead:{
        height:Pixel.getPixel(44),
        backgroundColor:'white',
        paddingLeft:15,
        justifyContent:'center',
    },
    carConfigurationViewHeadText:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    carConfigurationViewItemHead:{
        backgroundColor:fontAndColor.COLORA3,
        paddingLeft:Pixel.getPixel(15),
        justifyContent:'center',
        height:Pixel.getPixel(30),
    },
    carConfigurationViewItemHeadText:{
       color:fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },
    carConfigurationViewItem:{
        backgroundColor:'white',
        height:Pixel.getPixel(40),
        borderBottomColor:fontAndColor.COLORA4,
        borderBottomWidth:StyleSheet.hairlineWidth,
        paddingRight:Pixel.getPixel(15),
        paddingLeft:Pixel.getPixel(15),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },

    carConfigurationViewItemtTitleText:{
       color:fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    carConfigurationViewItemtValueText:{
       color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },



});