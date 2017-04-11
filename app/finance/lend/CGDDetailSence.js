import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Image,
    Text
} from 'react-native';

import {CommnetListItem, CommentHandItem, commnetStyle, CGDCarItem, CommenButton} from './component/ComponentBlob'
import {
    width,
    height,
    fontadapeSize,
    adapeSize,
    STATECODE,
    PAGECOLOR,
    getRowData,
    getSectionData,
    changeToMillion
} from './component/MethodComponent'
import  AllNavigationView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
import {request} from '../../utils/RequestUtil'
import *as apis from '../../constant/appUrls'
import ImagePageView from 'react-native-viewpager'
import AmountConfirm from './AmountConfirm';

let ControlState = [];
const postId = '201703200008'
let loan_code;

export default class OrderCarDetailScene extends BaseComponent {

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
            dataSource: ds.cloneWithRowsAndSections(this.titleNameBlob({}, ['https://www.baidu.com/img/bd_logo1.png', 'https://www.baidu.com/img/bd_logo1.png'])),
            renderPlaceholderOnly: STATECODE.loading,
            imagePikerData: ImageData.cloneWithPages(['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490350847146&di=9bbc00bb5ae5df9c1b550cf76f710fac&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201508%2F23%2F20150823033054_AUiBL.thumb.700_0.jpeg', 'https://www.baidu.com/img/bd_logo1.png'])
        }
        OrderHanderState = [];
    }

    initFinish() {
        this.getLoanCodeStateList();
    }

    getLendInfo = () => {

        let maps = {
            api: apis.GET_APPLY_INFO,
            loan_code: postId
        };

        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    let tempjson = response.mjson.data;
                    ControlState = this.confimOrderState(Number.parseInt(tempjson.payment_status), Number.parseInt(tempjson.payment_schedule))
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.titleNameBlob(tempjson, [])),
                        // renderPlaceholderOnly: STATECODE.loadSuccess
                    })
                },
                (error) => {

                    this.setState({
                        renderPlaceholderOnly: STATECODE.loadError
                    })
                    if (error.mycode != -300 || error.mycode != -500) {
                        this.props.showToast(error.mjson.msg);

                    } else {

                        this.props.showToast('服务器连接有问题')
                    }
                });


    }
    getCarListInfo = () => {
        let maps = {
            api: apis.AUTOLIST,
            payment_number: postId
        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    let tempjson = response.mjson.data;

                },
                (error) => {

                    this.setState({
                        renderPlaceholderOnly: STATECODE.loadError
                    })
                    if (error.mycode != -300 || error.mycode != -500) {
                        this.props.showToast(error.mjson.msg);

                    } else {

                        this.props.showToast('服务器连接有问题')
                    }
                });

    }
    getLoanCodeStateList = () => {
        let maps = {
            api: apis.AUTOLIST,
            loan_code: postId
        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    let tempjson = response.mjson.data;

                },
                (error) => {

                    this.setState({
                        renderPlaceholderOnly: STATECODE.loadError
                    })
                    if (error.mycode != -300 || error.mycode != -500) {
                        this.props.showToast(error.mjson.msg);

                    } else {

                        this.props.showToast('服务器连接有问题')
                    }
                });

    }


    titleNameBlob = (jsonData, carData) => {
        loan_code = jsonData.loan_code;
        let dataSource = {};
        let section1 = [
            {title: '借款单号', key: jsonData.loan_code},
            {title: '状态', key: jsonData.payment_status_str},
            {title: '产品类型', key: jsonData.product_type},
            {title: '借款类型', key: '---'},
            {title: '借款金额', key: jsonData.payment_loanmny_str},
            {title: '借款费率', key: jsonData.payment_rate_str},
            {title: '借款期限', key: jsonData.loanperiodstr},
            {title: '用款时间', key: jsonData.use_time_str},
        ]
        dataSource['section1'] = section1
        if (carData.length > 0) {
            dataSource['section2'] = carData;
        }
        return dataSource;
    }

    confimOrderState = (state, isComplete) => {
        let NameBlobs = [];

        if (state > 0 && state <= 32 || state == 50) {
            NameBlobs = Array.of('取消借款')
        } else if (state == 33) {
            NameBlobs = Array.of('取消借款', '确认金额')
        } else if (state === 35) {
            NameBlobs = Array.of('签署合同')
        } else if (state == 40 || state == 42 || isComplete == 4) {
            NameBlobs = Array.of('查看合同')
        } else if (state == 41) {
            NameBlobs = Array.of('取消借款', '确认金额', '查看合同')
        }

        return NameBlobs;
    }


    renderRow = (rowData, sectionID, rowId, highlightRow) => {

        if (sectionID === 'section1') {

            if (rowData.title === '状态') {

                return (
                    <CommentHandItem warpstyle={{height: adapeSize(44)}} leftTitle={rowData.title}
                                     showValue={rowData.key} handel={() => {
                    }}/>
                )
            }
            return (
                <CommnetListItem leftTitle={rowData.title} showValue={rowData.key}/>
            );

        }
        if (sectionID === 'section2') {

            return (<CGDCarItem/>)
        }

    }
    renderSectionHeader = (sectionData, sectionID) => {

        if (sectionID === 'section2') {

            return (
                <View style={styles.section2Style}>
                    <Text style={styles.sectionText}>车辆信息</Text>
                </View>
            )
        }
        return (
            <View style={styles.sectionStyle}>
            </View>
        )
    }
    renderSeparator = (sectionID, rowId, adjacentRowHighlighted) => {

        let separtrorHegigth = 1;
        if (rowId === '1') {
            separtrorHegigth = 10;
        }
        return (
            <View key={`${sectionID}-${rowId}`} style={{
                height: adjacentRowHighlighted ? 2 : separtrorHegigth,
                backgroundColor: PAGECOLOR.COLORA3
            }}>
            </View>
        )
    }
    buttonClick = (title) => {
        if (title == '确认金额') {
            this.toNextPage({
                name: 'AmountConfirm',
                component: AmountConfirm,
                params: {
                    loan_code: loan_code,
                },
            })
        } else {
            alert(title)
        }
    }


    render() {
        let tempBlobs = [];
        if (ControlState.length > 0) {
            let lengegth = ControlState.length - 1
            ControlState.map((item, index) => {

                tempBlobs.push(<CommenButton key={item}
                                             textStyle={index == lengegth ? {color: 'white'} : {color: PAGECOLOR.COLORB0}}
                                             buttonStyle={index == lengegth ? styles.buttonStyleFill : styles.buttonStyleNotFill}
                                             onPress={() => {

                                                 this.buttonClick(item);
                                             }} title={item}/>)
            })

        }
        return (

            <View style={styles.container}>
                <ListView
                    style={commnetStyle.ListWarp}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    renderSectionHeader={this.renderSectionHeader}
                />
                <View style={[commnetStyle.bottomWarp, styles.buttonsFlex]}>{tempBlobs}</View>
                <AllNavigationView title='借款详情' backIconClick={() => {
                    this.backPage();
                }}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: PAGECOLOR.COLORA3
    },
    ImageBackView: {
        backgroundColor: 'white'

    },
    buttonsFlex: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row'

    },

    thumbTitle: {
        marginTop: adapeSize(16),
        marginBottom: adapeSize(12),
        fontSize: fontadapeSize(15),
        marginLeft: adapeSize(14),
    },
    thumb: {
        backgroundColor: 'white',
        height: adapeSize(250),
        width: width - adapeSize(24),
        marginLeft: adapeSize(14),
        marginRight: adapeSize(14)
    },
    sectionStyle: {
        backgroundColor: PAGECOLOR.COLORA3,
        height: adapeSize(10),
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    section2Style: {

        backgroundColor: PAGECOLOR.COLORA3,
        height: adapeSize(30),
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    sectionText: {

        marginLeft: adapeSize(14),
        color: PAGECOLOR.COLORA2
    },
    buttonStyleFill: {

        height: adapeSize(32),
        backgroundColor: PAGECOLOR.COLORB0,
        marginRight: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 5,
        width: adapeSize(80)
    },
    buttonStyleNotFill: {

        height: adapeSize(32),
        backgroundColor: 'white',
        marginRight: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 5,
        width: adapeSize(80),
        borderColor: PAGECOLOR.COLORB0,
        borderWidth: 1


    },

})