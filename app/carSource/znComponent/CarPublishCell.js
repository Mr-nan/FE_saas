/**
 * Created by zhengnan on 2017/5/12.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import *as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;

export class CellView extends Component {

    render(){
        const {cellData} =this.props;
        return(
            <View style={styles.cellType1}>
                <View style={{flexDirection:'row'}}>
                    {
                        cellData.isShowTag && <Text style={{color:fontAndColor.COLORB2, fontSize:fontAndColor.LITTLEFONT28}}>*</Text>
                    }
                    <View >
                    <Text style={styles.cellTitle}>{cellData.title}</Text>
                        {
                            cellData.subTitle&&<Text style={styles.cellSubTitle}>{cellData.subTitle}</Text>
                        }
                    </View>
                </View>
                {
                    cellData.tailView? cellData.tailView():(
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={styles.cellValue}>{cellData.value}</Text>
                                {
                                    cellData.isShowTail &&
                                    <Image style={{marginLeft:Pixel.getPixel(5)}}
                                           source={require('../../../images/mainImage/celljiantou.png')}/>
                                }
                            </View>)
                }
            </View>)
    }
}

export class CellSelectView extends Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        // console.log('props:'+this.props.currentTitle);

        this.currentTitle = this.props.currentTitle;
        this.state = {
            currentChecked:this.currentTitle,

        };
    }

    setCurrentChecked=(text)=>{
        this.state = {
            currentChecked:text,
        };
    }

    render(){
        const {cellData} =this.props;

        return(
            <View style={styles.cellType2}>
                <View style={{flexDirection:'row'}}>
                    {
                        cellData.isShowTag && <Text style={{color:fontAndColor.COLORB2, fontSize:fontAndColor.LITTLEFONT28}}>*</Text>
                    }
                    <Text style={styles.cellTitle}>{cellData.title}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    {
                        cellData.selectDict.data.map((data,index)=>{
                            return (
                                <TouchableOpacity style={{height:Pixel.getPixel(20), marginTop:Pixel.getPixel(10),marginBottom:Pixel.getPixel(5),
                                }} onPress={()=>
                                {
                                    if(this.state.currentChecked!=data.title){

                                        this.setCurrentChecked(data.title);
                                        this.props.cellSelectAction({title:data.title,value:data.value})
                                    }
                                }} activeOpacity={1} key={index}>
                                    <View style={[styles.checkedItemView,(this.state.currentChecked==data.title?{borderColor:fontAndColor.COLORB0}:{borderColor:fontAndColor.COLORA2})]}>
                                        <Text style={[styles.checkedItemText,(this.state.currentChecked==data.title?{color:fontAndColor.COLORB0}:{color:fontAndColor.COLORA2})] }> {data.title} </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cellType1:{
        flexDirection:'row',
        paddingHorizontal:Pixel.getPixel(15),
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:fontAndColor.COLORA4,
        paddingVertical:Pixel.getPixel(15),
        width:sceneWidth,

    },
    cellType2:{
        flexWrap:'wrap',
        paddingHorizontal:Pixel.getPixel(15),
        backgroundColor:'white',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:fontAndColor.COLORA4,
        paddingVertical:Pixel.getPixel(20),
        justifyContent:'center',

    },
    cellTitle:{
        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.LITTLEFONT28,
    },
    cellSubTitle:{
        fontSize:Pixel.getFontPixel(fontAndColor.MARKFONT22),
        color:fontAndColor.COLORA1,
        marginTop:Pixel.getPixel(5),
        width:Pixel.getPixel(250)
    },
    cellValue:{
        color:fontAndColor.COLORA2,
        fontSize:fontAndColor.LITTLEFONT28,
    },
    checkedItemView:{

        borderColor:fontAndColor.COLORA2,
        borderWidth:StyleSheet.hairlineWidth,
        marginRight:Pixel.getPixel(15),
        backgroundColor:'white',
        height:Pixel.getPixel(20),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3,
        width:Pixel.getPixel(100),
        height:Pixel.getPixel(32),
    },
    checkedItemText:{
        color:fontAndColor.COLORA2,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
});