/**
 * Created by lhc on 2017/2/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
} from 'react-native';

import {CommnetListItem, LendCarItemCell, CommenButton} from './component/ComponentBlob'
import {width, height, fontadapeSize, adapeSize} from './component/MethodComponent'
import  AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import BaseComponent from '../../component/BaseComponent';

//ok
export  default  class SingDetaileSence extends BaseComponent {

    titleNameBlob = {

        section1: [
            {title: '申请日期', key: 'date'},
            {title: '借款金额', key: 'money'},
            {title: '借款期限', key: 'dateLimit'},
            {title: '综合费率', key: 'rate'},
            {title: '还款方式', key: 'paybackType'},
            {title: '还款方式', key: 'paybackType'},
            {title: '还款方式', key: 'paybackType'},
            {title: '还款方式', key: 'paybackType'}
        ],
        section2: [{title: '状态', key: 'orderState'}],
        section3: [
            {title: '放款日期', key: 'payDate'},
            {title: '评估总额', key: 'allMoney'},
            {title: '债权人', key: 'people'}
        ],
        section4: {key: 'carSource'}
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource(
            {
                getRowData: this.getRowData,
                getSectionHeaderData: this.getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }
        );

        //
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.titleNameBlob,),
            infoSouce: {
                date: '',
                monney: '',
                dateLimit: '',
                rate: '',
                paybackType: '',
                orderState: '',
                payDate: '',
                allMoney: '',
                people: '',
                carSource: [{name: "奥迪A7进口豪华型", state: '未还清', order: '201230123012301203', price: '12万'}]
            },
        }
    }


    getSectionData = (dataBlob, sectionID) => {

        return dataBlob[sectionID];
    }
    getRowData = (datatBlob, sectionId, rowId) => {

        return datatBlob[sectionId][rowId];
    }

//获取不同页面的颜色
    getStyle = (state) => {

        switch (state) {
            case 'yellow':
                return 'yellow'
                break;
            case 'blue':
                return 'green'
                break;
            default:
                return 'black'
        }
    }

    orderStateHandel = () => {

        alert(111);
    }

    renderRow = (rowData, sectionID, rowId, highlightRow) => {

        let Color = this.getStyle('blue');


        if (sectionID === 'section4') {


            let Item = this.state.infoSouce[rowData][0];


            return <LendCarItemCell
                carName={Item.name}
                orderState={Item.state}
                orderNum={Item.order}
                price={Item.price}/>
        }

        return (

            <CommnetListItem textStyle={rowData.key === 'orderState' ? {color: Color} : null} leftTitle={rowData.title}
                             showValue={rowData.key}/>
        );

    }
    renderSectionHeader = (sectionData, sectionID) => {
        return (

            <View style={[sectionID !== 'section1' && {backgroundColor: '#f0eff5', height: 20}]}>
            </View>
        )

    }

    renderSeparator = (sectionID, rowId, adjacentRowHighlighted) => {

        return (
            <View key={`${sectionID}-${rowId}`} style={{
                height: adjacentRowHighlighted ? 2 : 1,
                backgroundColor: adjacentRowHighlighted ? '#f0eff5' : '#CCCCCC'
            }}>
            </View>
        )
    }


    render() {

        return (

            <View style={{flex: 1}}>
                <AllNavigationView
                    title="借款详情"
                    backIconClick={this.backPage}
                />
                <ListView
                    style={{
                        marginTop: Pixel.getPixel(64),
                        backgroundColor: '#f0eff5',
                        paddingTop: adapeSize(15),
                        marginBottom: adapeSize(50),
                    }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={this.renderSeparator}
                />

                <View>
                    <CommenButton
                        buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={this.orderStateHandel}
                        title='取消借款'/>
                </View>

            </View>

        );
    }

}

const styles = StyleSheet.create({

    buttonStyle: {

        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: adapeSize(1),
        width: width,
    },
    textStyle: {

        fontSize: fontadapeSize(15),
        color: '#FFFFFF'
    }


});


