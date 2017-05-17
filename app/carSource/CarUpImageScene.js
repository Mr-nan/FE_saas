/**
 * Created by zhengnan on 2017/5/12.
 */
import React,    {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Dimensions,
}   from 'react-native';

import BaseComponent from '../component/BaseComponent';
import AllNavigationView from '../component/AllNavigationView';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
import CarUpImageCell from './znComponent/CarUpImageCell';
import ImageSource from '../publish/component/NewImageSource';


const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;
let results = [];
let titleData=[
    {
        name: 'left_anterior',
        title:'左前45度',
        subTitle:'至多1张',
        number:1,
        imgArray:[],
    },{
        name: 'rear_right',
        title:'右后45度',
        subTitle:'至多1张',
        imgArray:[],
    },{
        name: 'dash_board',
        title:'仪表盘',
        subTitle:'至多1张',
        imgArray:[],
    },{
        name: 'front_trim',
        title:'前内饰',
        subTitle:'至多1张',
        number:1,
        imgArray:[],
    },{
        name: 'rear_trim',
        title:'后内饰',
        subTitle:'至多1张',
        number:1,
        imgArray:[],
    },{
        name: 'engine',
        title:'发动机',
        subTitle:'至多1张',
        number:1,
        imgArray:[],
    },
];


export default class CarUpImageScene extends BaseComponent{

    initFinish=()=>{

    }

    // 构造
      constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:dataSource.cloneWithRows(titleData),
        };
      }

    render(){
        return(
            <View style={styles.rootContainer}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    renderFooter={this.renderFooter}/>
                <AllNavigationView title="上传图片" backIconClick={this.backPage}/>
            </View>)
    }
    renderSeparator(sectionId, rowId) {
        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    renderFooter =()=>{
        return(
            <View style={styles.footContainer}>
                <TouchableOpacity onPress={this.footBtnClick}>
                    <View style={styles.footView}>
                        <Text style={styles.footText}>申请上架</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderRow =(data)=>{
        return(
            <CarUpImageCell
                results={results}
                showModal={(value)=>{this.props.showModal(value)}}
                showToast={(value)=>{this.props.showToast(value)}}
                items={data}
                childList={data.imgArray}
            />
        )
    }
}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),

    }, footContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:Pixel.getPixel(20),
        marginBottom:Pixel.getPixel(20),

    },
    footView:{
        backgroundColor:fontAndColor.COLORB0,
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'center',
        width:sceneWidth-Pixel.getPixel(30),
        borderRadius:Pixel.getPixel(3),
    },
    footText:{
        textAlign:'center',
        color:'white',
        fontSize:fontAndColor.BUTTONFONT30
    },
});