/**
 * Created by lhc on 2017/2/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
} from 'react-native';

import {CommnetListItem, LendCarItemCell, CommenButton, width,height, adapeSize, fontdapeSize} from './ComponentBlob'

//ok
export  default  class SingDetaileSence extends Component {

    titleNameBlob = {

        section1: [
            {title: '申请日期', key: 'date'},
            {title: '借款金额', key: 'money'},
            {title: '借款期限', key: 'dateLimit'},
            {title: '综合费率', key: 'rate'},
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
                <ListView
                    style={{
                        marginTop: 44,
                        backgroundColor: '#f0eff5',
                        marginBottom: adapeSize(50),
                    }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={this.renderSeparator}
                />

                <CommenButton
                    buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={this.orderStateHandel}
                    title='取消借款'/>

            </View>

        );
    }

}

const styles = StyleSheet.create({

    buttonStyle: {

        top:height-adapeSize(44),
        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width:width
    },
    textStyle: {

        fontSize: fontdapeSize(15),
        color: '#FFFFFF'
    }


});


