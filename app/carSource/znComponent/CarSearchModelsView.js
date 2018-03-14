/**
 * Created by zhengnan on 2018/1/19.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native'

import *as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';

const Pixel = new PixelUtil();
const sceneWidth = Dimensions.get('window').width;
const IS_ANDROID = Platform.OS === 'android';


export default class CarSearchModelsView extends Component{

    // 构造
      constructor(props) {
        super(props);
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.state = {
            data: ds.cloneWithRows(this.props.modelsData)
        };
      }
    render(){
        return(
            <TouchableOpacity activeOpacity={1} style={styles.rooContainer} onPress={this.props.closeClick}>
                <ListView
                    dataSource={this.state.data}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    keyboardDismissMode={IS_ANDROID?'none':'on-drag'}
                />
            </TouchableOpacity>
        )
    }

    renderRow =(data,index)=> {
        return(
            <TouchableOpacity style={styles.cell} activeOpacity={1} onPress={()=>{this.props.cellClick(data)}}>
                <Text style={styles.cellText}>{data.model_name}</Text>
            </TouchableOpacity>
        )
    }
    renderSeparator =(sectionID,rowID)=> {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height:Pixel.getPixel(0.5),
                    backgroundColor: fontAndColor.COLORA4,
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    rooContainer:{
        top:Pixel.getPixel(47),
        left:0,
        right:0,
        bottom:0,
        position:'absolute',
        backgroundColor: 'rgba(0, 0, 0,0.3)',
    },
    cell:{
        width:sceneWidth,
        height:Pixel.getPixel(44),
        justifyContent:'center',
        paddingHorizontal:Pixel.getPixel(15),
        backgroundColor:'white'
    },
    cellText:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    }


})