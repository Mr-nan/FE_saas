/**
 * Created by zhengnan on 2017/7/28.
 */
import React,    {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
}   from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import *as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import CarUpImageCell from '../znComponent/CarUpImageCell';
import StorageUtil from "../../utils/StorageUtil";
import CarMySourceScene from '../CarMySourceScene';

import * as Net from '../../utils/RequestUtil';
import * as AppUrls from '../../constant/appUrls';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;
const IS_ANDROID = Platform.OS === 'android';
import SelectPhotoModal from '../../component/SelectPhotoModal';

export default class CarInitialTaskUpImagScene extends BaseComponent{

    initFinish=()=>{

    }
    // 构造
    constructor(props) {
        super(props);


        this.titleData = [
            {
                name: 'left_anterior',
                title:'左前45度',
                subTitle:'至多1张',
                number:1,
                imgArray:[],
                explain:'0',
            }, {
                name: 'customs_declaration',
                title:'行驶证',
                subTitle:'至多1张',
                number:1,
                imgArray:[],
                explain:'0',
            }, {
                name: 'inspection_report',
                title:'保单',
                subTitle:'至多1张',
                number:1,
                imgArray:[],
                explain:'0',
            },
            {
                name: 'idcardPath',
                title:'身份证',
                subTitle:'至多1张',
                number:1,
                imgArray:[],
                explain:'0',
            },
        ];


        this.results = [];
        this.carData = this.props.carData;

        const dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:dataSource.cloneWithRows(this.titleData),
        };
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    render(){
        return(
            <View style={styles.rootContainer}>
                <ListView
                    removeClippedSubviews={false}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    renderFooter={this.renderFooter}
                />
                <AllNavigationView title="上传图片" backIconClick={this.backPage}/>
                <SelectPhotoModal ref="selectphotomodal"/>
            </View>)
    }
    renderSeparator(sectionId, rowId) {
        return (
            <View style={styles.Separator} key={sectionId + rowId}/>
        )
    }

    renderFooter =()=>{
        return(
            <View style={styles.footContainer}>
                <TouchableOpacity onPress={this.footBtnClick}>
                    <View style={styles.footView}>
                        <Text allowFontScaling={false}  style={styles.footText}>提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderRow =(data)=>{
        return(
            <CarUpImageCell
                results={this.results}
                retureSaveAction={()=>{

                }}
                showModal={(value)=>{this.props.showModal(value)}}
                showToast={(value)=>{this.props.showToast(value)}}
                items={data}
                childList={data.imgArray}
            />
        )
    }


    footBtnClick=()=>{

        for(let i=0;i<this.titleData.length;i++)
        {
            let item = this.titleData[i];
            let isNull = true;
                for(let j=0;j<this.results.length;j++)
                {
                    let name = this.results[j].name;
                    let url = this.results[j].url;
                    if(name == 'left_anterior'){

                        this.carData.arcPath = url; // 车辆图片

                    }else if(name =='customs_declaration')
                    {
                        this.carData.dlPath = url; // 行驶证

                    }else if(name =='inspection_report')
                    {
                        this.carData.policyPath = url; // 保单

                    }else if(name =='idcardPath')
                    {
                        this.carData.idcardPath = url; // 身份证

                    }
                }

        }
         this.props.showModal(true);
            Net.request(AppUrls.CAR_CHESHANG_PUBLISHTASK,'post',this.carData).then((response) => {
                this.props.showModal(false);
                this.navigationBack();

            }, (error) => {
                this.props.showModal(false);

            });


    }

    navigationBack=()=>{
        const navigator = this.props.navigator;
        if (navigator) {
            for (let i = 0; i < navigator.getCurrentRoutes().length; i++) {
                if (navigator.getCurrentRoutes()[i].name == 'CarTrimScene') {
                  this.props.reloadTaskData && this.props.reloadTaskData();
                    navigator.popToRoute(navigator.getCurrentRoutes()[i]);
                    break;
                }
            }
        }
    }

    showToast=(errorMsg)=>{
        if(IS_ANDROID === true){
            this.props.showToast(errorMsg);
        }else {
            this.timer = setTimeout(
                () => { this.props.showToast(errorMsg)},
                500
            );
        }
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