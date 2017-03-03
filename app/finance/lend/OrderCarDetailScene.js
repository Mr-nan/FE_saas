/**
 * Created by lhc on 2017/3/3.
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
} from 'react-native';
import {CommnetListItem, LendCarItemCell, CommenButton,commnetStyle,ComentImageButton} from './component/ComponentBlob'
import {width, height, fontadapeSize, adapeSize,STATECODE,PAGECOLOR,getRowData,getSectionData,changeToMillion} from './component/MethodComponent'
import  AllNavigationView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
import {request} from '../../utils/RequestUtil'
import *as apis from '../../constant/appUrls'


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
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.titleNameBlob({},[])),
            renderPlaceholderOnly: STATECODE.loading
        }
    }

    initFinish() {

        this.getCarInfo();
    }

    getCarInfo=()=>{

        let maps = {
            api: apis.GET_CAR_INFO,
            auto_id: this.props.auto_id,
            type:this.props.type

        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {

                    let tempjson = response.mjson.data
                    let carNum =Number.parseInt(tempjson.car_count)
                    controlCode.stateCode=tempjson.status
                    controlCode.extendCode=tempjson.is_extend;
                    controlCode.lendType=tempjson.type;
                    controlCode.minLend=changeToMillion(tempjson.min_loanmny);
                    let Maxmum=Number.parseFloat(tempjson.max_loanmny)+Number.parseFloat(tempjson.payment_loanmny)
                    controlCode.maxLend=changeToMillion(Maxmum)
                    if (carNum>0){

                        this.getOrderCarInfo(tempjson)
                    }
                    else {
                        this.setState({

                            dataSource:this.state.dataSource.cloneWithRowsAndSections(this.titleNameBlob(tempjson,[])),
                            renderPlaceholderOnly: STATECODE.loadSuccess
                        })
                    }

                },
                (error) => {

                    this.setState({
                        renderPlaceholderOnly:STATECODE.loadError,
                    })

                });

    }


    titleNameBlob=(jsonData,carData)=>{

        let dataSource = {};
        dataSource['section1']=[
            {title: '评估日期', key: jsonData.loan_code},
            {title:'评估师',key:jsonData.product_type},
            {title: '车型', key: jsonData.loantype_str},
            {title: '车牌号', key: jsonData.payment_loanmny_str},
            {title: '车架号', key: jsonData.payment_rate_str},
            {title: '车身颜色', key: jsonData.loanperiodstr},
            {title: '内饰颜色', key: jsonData.use_time_str},
            {title: '监管地点',     key: jsonData.status_str},
            {title: '评估金额', key: jsonData.loan_time},
            {title: '放款金额', key: jsonData.remarks},
            {title: '在库天数', key: jsonData.remarks},
        ]
        if(carData.length>0){
            dataSource['section2']=tempCarDate;
        }

        return dataSource;
    }

    renderRow = (rowData, sectionID, rowId, highlightRow) => {

        let Color = this.getStyle(controlCode.stateCode);
        if (sectionID === 'section2') {
            return <LendCarItemCell onPress={()=>{}} carName={rowData.model_name} orderNum={rowData.loan_number} orderState={rowData.state} price={rowData.price}/>
        }
        return (
            <CommnetListItem textStyle={rowData.title === '评估日期' ? {color: PAGECOLOR.COLORA4} : null} leftTitle={rowData.title} showValue={rowData.key}/>
        );
    }
    renderSectionHeader = (sectionData, sectionID) => {
        return (

            <View style={[sectionID !== 'section1' && {backgroundColor: '#f0eff5', height: 20}]}>
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

        if(this.state.renderPlaceholderOnly!==STATECODE.loadSuccess)
        {
            return(
                <View style={styles.container}>
                    {this.loadView()}
                    <AllNavigationView title='车辆详情' backIconClick={()=>{
                        this.backPage();
                    }}/>

                </View>);
        }
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}
                renderHeader={this.renderSectionHeader}
            />

        )
    }

}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: PAGECOLOR.COLORA3
    },
})
