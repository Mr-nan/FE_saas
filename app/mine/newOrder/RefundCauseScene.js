/**
 * Created by zhengnan on 2018/7/3.
 * 退款原因界面
 */

import  React, {Component} from  'react'
import  {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    Image,
    ListView,
} from  'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import { observer } from 'mobx-react/native';
import {observable} from 'mobx';


@observer
export default class RefundCauseScene extends BaseComponent{


    @observable selectTitle ='';
    constructor(props) {

        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1== r2});

        this.selectTitle = '';
        this.state = {
            dataSource: ds.cloneWithRows(['row1', 'row2','row3','row4']),
        };
    }

    render(){
        return(
            <View style={styles.root}>
                    <View style={{height:Pixel.getPixel(35),paddingLeft:Pixel.getPixel(15),backgroundColor:fontAndColor.COLORA3,alignItems:'center',flexDirection:'row'}}>
                        <Text style={{color:fontAndColor.COLORA1, fontSize:fontAndColor.LITTLEFONT28}}>请选择订单取消原因</Text>
                        <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.LITTLEFONT28}}>(必填)</Text>
                    </View>
                   <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} renderSeperator={this.renderSeperator}/>
                <NavigatorView title={'订单取消'} backIconClick={this.backPage}/>
            </View>
        )
    }

    renderRow =(rowData)=> {
         return(
             <TouchableOpacity onPress={()=>{this.selectTitle=rowData;this.setState({dataSource:this.state.dataSource.cloneWithRows(['row1', 'row2','row3','row4'])})}}>
                 <View style={{height:Pixel.getPixel(44),backgroundColor:'white',paddingHorizontal:Pixel.getPixel(15),alignItems:'center',justifyContent:'space-between',
                     flexDirection:'row'
                 }}>
                     <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.LITTLEFONT28}}>{rowData}</Text>
                     {
                        this.selectTitle==rowData && <Image source={require('../../../images/neworder/duigou.png')}/>
                     }
                 </View>
             </TouchableOpacity>
         )
    }

    renderSeperator =(sectionID,rowID)=> {
          return(
              <View key={`${sectionID}+${rowID}`} style={{marginHorizontal:Pixel.getPixel(15),height:StyleSheet.hairlineWidth,backgroundColor:fontAndColor.COLORA4}}/>
          )
    }

}

const styles = StyleSheet.create({
    root:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        backgroundColor:fontAndColor.COLORA3,
    }
})