/**
 * Created by lcus on 17/3/24.
 */
//采购贷车辆详情页面

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Image,
    Text
} from 'react-native';
import {CommnetListItem, CommentHandItem} from './component/ComponentBlob'
import {width, height, fontadapeSize, adapeSize,STATECODE,PAGECOLOR,getRowData,getSectionData,changeToMillion} from './component/MethodComponent'
import  AllNavigationView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
import {request} from '../../utils/RequestUtil'
import *as apis from '../../constant/appUrls'
import ImagePageView from 'react-native-viewpager'

const ImageSouce= {

    imageSouce:[]

}
export default class OrderCarDetailScene extends BaseComponent{

    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource(
            {
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }
        )//
        const ImageData = new ImagePageView.DataSource({pageHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.titleNameBlob({},['https://www.baidu.com/img/bd_logo1.png','https://www.baidu.com/img/bd_logo1.png'])),
            renderPlaceholderOnly: STATECODE.loading,
            imagePikerData: ImageData.cloneWithPages(['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490350847146&di=9bbc00bb5ae5df9c1b550cf76f710fac&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201508%2F23%2F20150823033054_AUiBL.thumb.700_0.jpeg','https://www.baidu.com/img/bd_logo1.png'])
        }
    }

    initFinish() {

        // this.getCarInfo();
    }

    // getCarInfo=()=>{
    //
    //     let maps = {
    //         api: apis.GET_CAR_INFO,
    //         auto_id: this.props.auto_id,
    //         type:this.props.type
    //
    //     };
    //     request(apis.FINANCE, 'Post', maps)
    //         .then((response) => {
    //
    //                 let tempjson = response.mjson.data
    //
    //                 tempjson.img_list.map((item)=>{
    //
    //                     ImageSouce.imageSouce.push(item.fileurl)
    //                 })
    //
    //
    //                 this.setState({
    //                     renderPlaceholderOnly: STATECODE.loadSuccess,
    //                     dataSource:this.state.dataSource.cloneWithRowsAndSections(this.titleNameBlob(tempjson,tempjson.img_list)),
    //                     imagePikerData:this.state.imagePikerData.cloneWithPages(ImageSouce.imageSouce),
    //                 })
    //             },
    //             (error) => {
    //                 this.setState({
    //                     renderPlaceholderOnly:STATECODE.loadError,
    //                 })
    //                 if(error.mycode!= -300||error.mycode!= -500){
    //                     this.props.showToast(error.mjson.msg);
    //
    //                 }else {
    //                     this.props.showToast('服务器连接有问题')
    //
    //                 }
    //             });
    // }


    titleNameBlob=(jsonData,carData)=>{

        let dataSource = {};
        let section1=[
            {title: '出售城市', key: '北京'},
            {title:'车型',key:'2015 款 奥迪'},
            {title: '车架号', key: 'LVF900123sdadsasd'},
            {title: '外观颜色', key:'白色'},
            {title: '行驶里程', key: '10w公里'},
            {title: '首次上牌时间', key: '2016年五月'},
            {title: '收车人', key: '王波'},
            {title: '登记人',     key:'李洋'},
            {title: '收购价（万元）', key: '30万元'},
            {title: '放款额', key: '26万元'},
            {title: '车辆位置', key: '北京大健康大看得见阿老师到家啦圣诞节啦莱克斯顿金坷垃四大皆空辣死答案是大所大所多撒大所大所大所大所大所大所大多了'},
        ]
        dataSource['section1']=section1
        if(carData.length>0){
            dataSource['section2']=carData;
        }

        return dataSource;
    }

    renderImagePage=(data,pageId)=>{

        return (
            <Image source={{uri:data}} style={styles.thumb}/>
        )

    }

    renderRow = (rowData, sectionID, rowId, highlightRow) => {


        if (sectionID === 'section2') {
            if(rowId==='0'){
                return(
                  <View style={styles.ImageBackView}>
                      <Text style={styles.thumbTitle}>{'车辆照片'}</Text>
                          <ImagePageView

                              dataSource={this.state.imagePikerData}    //数据源（必须）
                              renderPage={this.renderImagePage}     //page页面渲染方法（必须）
                              isLoop={false}                        //是否可以循环
                              autoPlay={false}                      //是否自动
                              locked={false}                        //为true时禁止滑动翻页
                          />

                  </View>
                )

            }else {

                return null;
            }
        }else if (rowData.title ==='车辆位置'){

            return (
                <CommentHandItem leftTitle={rowData.title} showValue={rowData.key} handel={()=>{}}/>
            )
        }

        return (
            <CommnetListItem textStyle={rowData.title === '放款额' ? {color: PAGECOLOR.COLORB2} : null} leftTitle={rowData.title} showValue={rowData.key}/>
        );
    }
    renderSectionHeader = (sectionData, sectionID) => {
        return (

            <View style={styles.sectionStyle}>

            </View>
        )

    }
    renderSeparator =(sectionID,rowId,adjacentRowHighlighted)=>{

        let separtrorHegigth =1;
        if (rowId==='1'||rowId==='7'||rowId=='9'){
            separtrorHegigth=10;
        }
        return (
            <View key={`${sectionID}-${rowId}`} style={{
                height:adjacentRowHighlighted?2:separtrorHegigth,
                backgroundColor:PAGECOLOR.COLORA3
            }}>
            </View>
        )
    }

    render(){

        // if(this.state.renderPlaceholderOnly!==STATECODE.loadSuccess)
        // {
        //     return(
        //         <View style={styles.container}>
        //             {this.loadView()}
        //             <AllNavigationView title='车辆详情' backIconClick={()=>{
        //                 this.backPage();
        //             }}/>
        //         </View>);
        // }
        return(
            <View style={styles.container}>
                <ListView
                    style={{marginTop:64}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    renderSectionHeader={this.renderSectionHeader}
                    showsVerticalScrollIndicator={false}
                />
                <AllNavigationView title='车辆详情' backIconClick={()=>{ this.backPage();}}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: PAGECOLOR.COLORA3
    },
    ImageBackView:{
        backgroundColor:'white'

    },
    thumbTitle:{
        marginTop:adapeSize(16),
        marginBottom:adapeSize(12),
        fontSize:fontadapeSize(15),
        marginLeft:adapeSize(14),
    },
    thumb:{
        backgroundColor:'white',
        height: adapeSize(250),
        width:width-adapeSize(24),
        marginLeft:adapeSize(14),
        marginRight:adapeSize(14)
    },
    sectionStyle:{
        backgroundColor:PAGECOLOR.COLORA3,
        height:adapeSize(10),
        alignItems:'flex-start',
        justifyContent:'center'
    }

})