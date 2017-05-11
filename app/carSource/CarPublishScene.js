/**
 * Created by zhengnan on 2017/5/11.
 */
import React,    {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    Dimensions,
}   from 'react-native';

import BaseComponent from '../component/BaseComponent';
import AllNavigationView from '../component/AllNavigationView';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;
const titleData = [
    [
        {
            title:'车辆类型',
            isShowTag:false,
            value:'扫描',
            isShowTail:true,
            selectArray:['二手车','新车','平行进口车'],

        },
        {
            title:'车架号',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
        {
            title:'排量',
            isShowTag:true,
            value:'请输入',
            isShowTail:false,
        },
        {
            title:'排放标准',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
        {
            title:'车身颜色',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
    ],
    [   {
            title:'出厂日期',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,


    },
        {
            title:'出厂日期',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,

        },

    ],
    [   {
            title:'标准配置',
            isShowTag:false,
            value:'查看',
            isShowTail:false,


    },
        {
            title:'配置改装说明',
            isShowTag:false,
            value:'请填写',
            isShowTail:false,

        },
    ]

];

export default class CarPublishScene extends BaseComponent{

    initFinish=()=>{

    }
    // 构造
      constructor(props) {
        super(props);
        // 初始状态

          const dataSource = new  ListView.DataSource({
              getSectionData:(dataBloble,sectionID)=>{return dataBloble[sectionID]},
              getRowData:(dataBloble,sectionID,rowID)=>{return dataBloble[sectionID+':'+rowID]},
              sectionHeaderHasChanged:(s1,s2)=>s1!==s2,
              rowHasChanged:(r1,r2)=>r1!==r2,
          });

          let dataBloble={},sectionIDs=[],rowIDs=[];
          for(let i=0;i<titleData.length;i++){
              sectionIDs.push(i);
              let tmp=[];
              dataBloble[i]=i;
              tmp = titleData[i];
              rowIDs[i]=[];
              for (let j=0;j<tmp.length;j++){
                  rowIDs[i].push(j);
                  dataBloble[i+':'+j]=tmp[j];
              }
          }

        this.state = {
            dataSource:dataSource.cloneWithRowsAndSections(dataBloble,sectionIDs,rowIDs),
        };
      }

    render(){
        return(
            <View style={styles.rootContainer}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderSectionHeader={()=>{
                        return(<View style={{height:20}}></View>)
                    }}
                    renderRow={this.renderRow}
                    renderFooter={this.renderFooter}/>
                <AllNavigationView title="车辆基本信息" backIconClick={this.backPage}/>
            </View>)
    }

    renderRow =(rowData,SectionID,rowID)=>{
        return( rowData.selectArray?(<CellSelectView cellData={rowData}/>):(<CellView cellData={rowData}/>))
    }
    renderFooter =()=>{
        return(
            <View style={styles.footContainer}>
                <TouchableOpacity >
                    <View style={styles.footView}>
                        <Text style={styles.footText}>下一步</Text>
                    </View>
                </TouchableOpacity>
            </View>)
    }
}

class CellView extends Component {

    render(){
        const {cellData} =this.props;
        return(
            <View style={styles.cellType1}>
                <View style={{flexDirection:'row'}}>
                    {
                        cellData.isShowTag && <Text style={{color:fontAndColor.COLORB2, fontSize:fontAndColor.LITTLEFONT28}}>*</Text>
                    }
                    <Text style={styles.cellTitle}>{cellData.title}</Text>
                </View>
                {
                    cellData.tailView? cellData.tailView():(
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.cellValue}>{cellData.value}</Text>
                            {
                                cellData.isShowTail &&
                                <Image style={{marginLeft:Pixel.getPixel(5)}}
                                       source={require('../../images/mainImage/celljiantou.png')}/>
                            }
                        </View>)
                }
            </View>)
    }
}

class CellSelectView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentChecked:'二手车',
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
                        cellData.selectArray.map((data,index)=>{
                            return (
                                <TouchableOpacity style={{height:Pixel.getPixel(20), marginTop:Pixel.getPixel(10),marginBottom:Pixel.getPixel(5),
                                }} onPress={()=>
                                {
                                    if(this.state.currentChecked!=data){
                                        this.setState({
                                            currentChecked:data,
                                        });
                                    }

                                }} activeOpacity={1} key={index}>
                                    <View style={[styles.checkedItemView,(this.state.currentChecked==data?{borderColor:fontAndColor.COLORB0}:{borderColor:fontAndColor.COLORA2})]}>
                                        <Text style={[styles.checkedItemText,(this.state.currentChecked==data?{color:fontAndColor.COLORB0}:{color:fontAndColor.COLORA2})] }> {data} </Text>
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
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    footContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:Pixel.getPixel(20)
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
    cellType1:{
        height:Pixel.getPixel(44),
        flexDirection:'row',
        paddingHorizontal:Pixel.getPixel(15),
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:fontAndColor.COLORA4,
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