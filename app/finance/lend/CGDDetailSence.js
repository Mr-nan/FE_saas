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

const handTitltBlob= {

    cancle:'取消借款',
    confim:'确认金额',
    obeservery:'车辆监控'

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
            {title: '借款单号', key: '北京'},
            {title:'状态',key:'2015 款 奥迪'},
            {title: '产品类型', key: 'LVF900123sdadsasd'},
            {title: '借款类型', key:'白色'},
            {title: '借款金额', key: '10w公里'},
            {title: '借款费率', key: '2016年五月'},
            {title: '借款期限', key: '王波'},
            {title: '用款时间',     key:'李洋'},
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
        if (rowId==='1'){
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
                />
                <AllNavigationView title='借款详情' backIconClick={()=>{ this.backPage();}}/>
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