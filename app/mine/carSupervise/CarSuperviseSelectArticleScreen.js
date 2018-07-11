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


export  default class CarSuperviseSelectArticleScreen extends BaseComponent{

    constructor(props) {
        super(props);
        this.data= [
            {title:'车辆',value:'1',select:false},
            {title:'钥匙',value:'2',select:false},
            {title:'登记证',value:'3',select:false},
            {title:'行驶证',value:'4',select:false},
            {title:'关单',value:'5',select:false},
            {title:'商检单',value:'6',select:false},
            {title:'一致性证书',value:'7',select:false},
            {title:'合格证',value:'8',select:false}
        ];

        if(this.props.selectArticle){
            for(let selectData of this.props.selectArticle.data){
                for(let tmpData of this.data){
                    if(selectData.title == tmpData.title){
                        tmpData.select = true;
                    }
                }
            }
        }

    }

    render(){
        return(
            <View style={styles.root}>
                <ScrollView>
                    <View style={{justifyContent:'center',height:Pixel.getPixel(30),paddingLeft:Pixel.getPixel(15)}}>
                        <Text style={{color:fontAndColor.COLORA1, fontSize:fontAndColor.CONTENTFONT24}}>一辆车的权证可多选</Text>
                    </View>
                    <SelectArticleView data={this.data}
                                       dataReturn={(data)=>{this.data = data}}/>
                    <View style={{marginTop:Pixel.getPixel(10)}}>
                        <ZNTextInput placeholderText="其他权证，请在此补充权证名称"
                                     onChangeText={(text)=>{this.remark=text}}
                                     defaultValue={this.props.selectArticle && this.props.selectArticle.remark}
                        />
                    </View>
                    <View style={styles.footContainer}>
                        <TouchableOpacity onPress={this.footBtnClick}>
                            <View style={styles.footView}>
                                <Text allowFontScaling={false}  style={styles.footText}>确定</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <NavigationView title="选择借出物" backIconClick={this.backPage}/>
            </View>
        )
    }

    footBtnClick=()=>{
        let selectArray =this.data.filter(e=>e.select==true);
        this.props.confirmClick && this.props.confirmClick({
            data:selectArray,
            remark:this.remark,
        });
        this.backPage();
    }
}

class SelectArticleView extends Component{

      constructor(props) {
        super(props);


        this.state = {
            data:this.props.data
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
                                        backgroundColor:rowData.select?fontAndColor.COLORB0:fontAndColor.COLORA3,}}>
                                    <Text onPress={()=>{this.selectAction(index)}} style={{fontSize:fontAndColor.LITTLEFONT28,color:rowData.select?'white':fontAndColor.COLORA0}}>{rowData.title}</Text>
                                </View>
                        )
                    })
                }
            </View>
        )
    }

    selectAction=(index)=>{
                let data = this.state.data;
                data[index].select = !data[index].select;
                this.setState({
                data:data
            })

        this.props.dataReturn(data);
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