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
import StorageUtil from "../utils/StorageUtil";

import * as Net from '../utils/RequestUtil';
import * as AppUrls from '../constant/appUrls';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;

export default class CarUpImageScene extends BaseComponent{

    initFinish=()=>{

    }
    // 构造
      constructor(props) {
        super(props);

          this.baseTitleData=[
              {
                  name: 'left_anterior',
                  title:'左前45度',
                  subTitle:'至多1张',
                  number:1,
                  imgArray:[],
                  explain:'1',
              },{
                  name: 'rear_right',
                  title:'右后45度',
                  subTitle:'至多1张',
                  imgArray:[],
                  explain:'1',

              },{
                  name: 'dash_board',
                  title:'仪表盘',
                  subTitle:'至多1张',
                  imgArray:[],
                  explain:'1',

              },{
                  name: 'front_trim',
                  title:'前内饰',
                  subTitle:'至多1张',
                  number:1,
                  imgArray:[],
                  explain:'1',

              },{
                  name: 'rear_trim',
                  title:'后内饰',
                  subTitle:'至多1张',
                  number:1,
                  imgArray:[],
                  explain:'1',

              },{
                  name: 'engine',
                  title:'发动机',
                  subTitle:'至多1张',
                  number:1,
                  imgArray:[],
                  explain:'1',

              },{
                  name: 'vin_no',
                  title:'车架号',
                  subTitle:'至多1张',
                  number:1,
                  imgArray:[],
                  explain:'0',
              },{
                  name: 'certificate',
                  title:'合格证',
                  subTitle:'至多5张',
                  number:5,
                  imgArray:[],
                  explain:'0',
              },
          ];

          this.usedCarTitleData=[
              {
                  name: 'registration_card',
                  title:'登记证',
                  subTitle:'至多5张',
                  number:5,
                  imgArray:[],
                  explain:'1',
              },
          ];

          this.importCarTitleData = [
              {
                  name: 'conformance_certificate',
                  title:'车辆一致性证书正反面',
                  subTitle:'至多5张',
                  number:5,
                  imgArray:[],
                  explain:'1',
              }, {
                  name: 'customs_declaration',
                  title:'关单',
                  subTitle:'至多5张',
                  number:5,
                  imgArray:[],
                  explain:'1',
              }, {
                  name: 'inspection_report',
                  title:'商检单',
                  subTitle:'至多5张',
                  number:5,
                  imgArray:[],
                  explain:'1',
              },
          ];

          this.titleData = [];
          this.results = [];
          this.carData = this.props.carData;
          this.baseTitleData[7].explain =this.carData.v_type==2?'1':'0';
          this.titleData.push(...this.baseTitleData);

          if(this.carData.v_type==1){

              this.titleData.push(...this.usedCarTitleData);

          }else if(this.carData.v_type==3){

              this.titleData.push(...this.importCarTitleData);

          }

          if(this.carData.pictures){

              this.results.push(...this.carData.pictures);

              this.titleData.map((data,index)=>{
                  this.carData.pictures.map((imgData,subIndex)=>{
                      if(data.name == imgData.name){
                          data.imgArray.push(imgData);
                      }
                  });
              });
          }

        const dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:dataSource.cloneWithRows(this.titleData),
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
                results={this.results}
                retureSaveAction={()=>{
                    this.carData['pictures']=this.results;
                    if(this.carData.show_shop_id){
                        StorageUtil.mSetItem(String(this.carData.show_shop_id),JSON.stringify(this.carData));
                    }
                }}
                showModal={(value)=>{this.props.showModal(value)}}
                showToast={(value)=>{this.props.showToast(value)}}
                items={data}
                childList={data.imgArray}
            />
        )
    }

    footBtnClick=()=>{

        let errorTitle = '';
        for(let i=0;i<this.titleData.length;i++)
        {
            let item = this.titleData[i];
            if(item.explain=='1')
            {
                let isNull = true;
                for(let j=0;j<results.length;j++)
                {
                    if(results[j].name == item.name)
                    {
                        isNull = false;
                    }
                }
                if(isNull)
                {
                    errorTitle = item.title;
                    break;
                }
            }
        }

        if(errorTitle!='')
        {
            this.props.showToast('请上传'+errorTitle+'图片');
        }else {

            console.log(this.results);
            // Net.request(AppUrls.CAR_SAVE,'post',this.carData).then((response) => {
            //
            //     console.log(response);
            //
            //     }, (error) => {
            //         this.props.closeLoading();
            //         if(error.mycode === -300 || error.mycode === -500){
            //             this.props.showToast('网络连接失败');
            //         }else{
            //             this.props.showHint(error.mjson.msg);
            //         }
            //     });

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