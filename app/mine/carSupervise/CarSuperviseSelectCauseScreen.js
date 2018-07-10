/**
 * Created by zhengnan on 2018/7/9.
 */
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
    ScrollView,
    Dimensions,

}from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import ZNTextInput from './component/ZNTextInput';

const Pixel = new PixelUtil();
const IS_ANDROID = Platform.OS === 'android';


export  default class CarSuperviseSelectCauseScreen extends BaseComponent{

    render(){
        return(
            <View style={styles.root}>
                <ScrollView>
                    <SelectArticleView/>
                    <View style={{marginTop:Pixel.getPixel(10)}}>
                        <ZNTextInput placeholderText="其他原因，请在此写下借用原因"/>
                    </View>
                    <View style={styles.footContainer}>
                        <TouchableOpacity onPress={this.footBtnClick}>
                            <View style={styles.footView}>
                                <Text allowFontScaling={false}  style={styles.footText}>确定</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <NavigationView title="选择借用原因" backIconClick={this.backPage}/>
            </View>
        )
    }
}

class SelectArticleView extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:[
                {title:'车展',value:'1'},
                {title:'维修',value:'2'},
                {title:'洗车',value:'3'},
                {title:'过户',value:'4'},
                {title:'保险',value:'5'},
                {title:'试驾',value:'6'}
                ],
            select:{}

        };
    }

    render(){
        return(
            <View style={{flexDirection:'row',backgroundColor:'white',flexWrap:'wrap',width:width,paddingBottom:Pixel.getPixel(25),paddingTop:Pixel.getPixel(5),paddingRight:Pixel.getPixel(5)}}>
                {
                    this.state.data.map((rowData,index)=>{
                        return(
                            <View
                                key={index}
                                style={{height:Pixel.getPixel(30),
                                    alignItems:'center',
                                    justifyContent:'center',
                                    borderRadius:Pixel.getPixel(15),paddingHorizontal:Pixel.getPixel(15),
                                    marginTop:Pixel.getPixel(20),
                                    marginLeft:Pixel.getPixel(15),
                                    marginRight:Pixel.getPixel(10),
                                    backgroundColor:rowData.title==this.state.select.title?fontAndColor.COLORB0:fontAndColor.COLORA3,}}>
                                <Text onPress={()=>{this.selectAction(index)}} style={{fontSize:fontAndColor.LITTLEFONT28,color:rowData.title==this.state.select.title?'white':fontAndColor.COLORA0}}>{rowData.title}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    selectAction=(index)=>{

        this.setState({
            select:this.state.data[index],
        })
    }


}

const styles = StyleSheet.create({
    root:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        backgroundColor:fontAndColor.COLORA3,
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
})