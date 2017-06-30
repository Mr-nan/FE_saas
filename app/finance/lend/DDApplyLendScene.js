import React, {Component} from "react";
import {StyleSheet, View, ListView, Image, Text} from "react-native";
import AllNavigatior from "../../component/AllNavigationView";
import AllNavigationView from "../../component/AllNavigationView";
import {CommnetListItem, CommentHandItem, commnetStyle, CommenButton, CGDCarItems} from "./component/ComponentBlob";
import WebScene from '../../main/WebScene';
import {
    width,
    fontadapeSize,
    adapeSize,
    STATECODE,
    PAGECOLOR,
    getRowData,
    getSectionData
} from "./component/MethodComponent";
import BaseComponent from "../../component/BaseComponent";
import {request} from "../../utils/RequestUtil";
import *as apis from "../../constant/appUrls";
import {LendSuccessAlert, ModalAlert} from "./component/ModelComponent";
import DDCarInfoScene from "./DDCarInfoScene";
import OBDDevice from "./OBDDevice";
let ControlState = [];
export default class DDApplyLendScene extends BaseComponent {

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
        )
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.titleNameBlob({}, [])),
            renderPlaceholderOnly: STATECODE.loading,
        }

        this.carData = {
            sell_city_id: '',
            brand_id: '',
            model_id: '',
            series_id: '',
            frame_number: '',
            car_color: '',
            mileage: '',
            init_reg: '',
            rev_user_id: '',
            register_user_id: '',
            purchas_price: '',
            bind_type: '',
            obd_number: '',
            payment_id: '',
            base_id: '',
            info_id: '',
            isCarinvoice: '',
            obd_bind_status: '',
            obd_audit_status: '',
            auto_ownership_status: '',//车辆权属审核状态
            order_ownership_status: '',//车辆权属提交状态
            is_mortgagor: '',
            is_new: '',
            file_list: [],

            obd_track_url: ''
        };
    }

    initFinish() {
        //加载完成，根据是否有订单号，来判断是不是编辑页面

        //编辑页面。审核未通过
        if (this.props.shenhe == "yes") {
            this.getLenddetail()
        } else {
            //申请页面
            this.getLendInfo();
        }
    }

    /**
     * from @yujinzhong
     *
     *
     * 获取订单融资申请前置数据,费率，借款额度
     **/
    getLendInfo = () => {

        let maps = {
            api: apis.GET_APPLY_LOAN_DATA,
            apply_type: '6',
        };

        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                ControlState = ["申请借款"]
                this.getCarListInfo(response.mjson.data);
            }, (error) => {
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
    /**
     * from @yujinzhong
     * @param lendInfo
     *
     *
     * 获取到借款费率      申请获取车辆列表
     **/
    getCarListInfo = (lendInfo) => {
        let maps = {
            api: apis.DDAUTOLIST,
            platform_order_number: this.props.orderNo//平台订单号
        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                this.props.showModal(false);
                let tempjson = response.mjson.data;
                this.carData.base_id = tempjson.list[0].base_id;
                this.carData.frame_number = tempjson.list[0].frame_number;
                this.carData.obd_bind_status = tempjson.list[0].obd_bind_status;
                this.carData.obd_audit_status = tempjson.list[0].obd_audit_status;
                this.carData.obd_number = tempjson.list[0].obd_number;
                this.carData.auto_ownership_status = tempjson.list[0].auto_ownership_status;
                this.carData.order_ownership_status = tempjson.list[0].order_ownership_status;
                this.carData.is_mortgagor = tempjson.list[0].is_mortgagor;
                this.carData.is_new = tempjson.list[0].is_new;
                this.carData.info_id = tempjson.list[0].info_id;
                this.carData.obd_track_url = tempjson.list[0].obd_track_url;

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(this.titleNameBlob(lendInfo, tempjson.list)),
                    renderPlaceholderOnly: STATECODE.loadSuccess
                })
            }, (error) => {
                this.props.showModal(false);
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

        let dataSource = {};
        let section1 = [
            {title: '借贷类型', key: jsonData.product_type},
            {title: '借款费率', key: jsonData.rate},
            {title: '保证金余额', key: jsonData.deposit_amount + "元"},
            {title: '保证金比例', key: jsonData.deposit_rate},
            {title: '借款期限', key: jsonData.loan_life},
            {title: '借款额度', key: "30000" + "~" + jsonData.paymnet_maxloanmny + "元"},
        ]
        dataSource['section1'] = section1
        if (carData.length > 0) {
            let section2 = [{title: '订单号', key: this.props.orderNo}]
            dataSource['section2'] = section2;

            let tempCarDate = [];
            carData.map((item) => {

                tempCarDate.push(
                    {
                        brand_name: item.brand_name,
                        icon: item.cover.icon,
                        frame_number: item.frame_number,
                        price: item.first_assess_loan,//放款额
                        obd_bind_status: item.obd_bind_status,//车牌号
                        info_id: item.info_id,
                        model_name: item.model_name,
                        init_reg: item.init_reg,
                        base_id: item.base_id,
                        mileage: item.mileage,
                        invoice_upload_status: item.invoice_upload_status,
                        obd_audit_status: item.obd_audit_status,
                        invoice_audit_status: item.invoice_audit_status
                    }
                )
            })
            dataSource['section3'] = tempCarDate;
            let section4;
            if (carData[0].is_mortgagor == 0 && carData[0].is_new == 1) {
                section4 = [
                    {
                        title: 'OBD设备',
                        key: this.OBDtransferToString(carData[0].obd_audit_status, carData[0].obd_bind_status)
                    },
                    {
                        title: '车辆权属',
                        key: this.OwnershiptransferToString(carData[0].auto_ownership_status, carData[0].order_ownership_status)
                    },

                ]
            } else {
                section4 = [
                    {
                        title: 'OBD设备',
                        key: this.OBDtransferToString(carData[0].obd_audit_status, carData[0].obd_bind_status)
                    },
                    {
                        title: '车辆权属',
                        key: this.OwnershiptransferToString(carData[0].auto_ownership_status, carData[0].order_ownership_status)
                    },

                ]
            }
            dataSource['section4'] = section4;
        }
        return dataSource;
    }

    /**
     * 根据后台返回，将数据进行转换
     * OBDtransferToString
     **/
    OBDtransferToString = (audit, bind) => {
        let status;
        if (this.props.sceneName == 'CheckStand') {
            if (audit == 1) {
                status = '已通过';
            } else {
                if (bind == 0) {
                    status = '未绑定';
                } else if (bind == 1) {
                    status = '已绑定';
                } else if (bind == 2) {
                    status = '解除绑定';
                }
            }
        } else {
            if (audit == 0) {
                status = '未审核';
            } else if (audit == 1) {
                status = '已通过';
            } else if (audit == 2) {
                status = '未通过';
            }
        }
        return status;
    }

    /**
     * 根据后台返回，将数据进行转换
     * OBDtransferToString
     **/
    OwnershiptransferToString = (audit, bind) => {
        let status;
        if (this.props.sceneName == 'CheckStand') {
            if (audit == 1) {
                status = '已通过';
            } else {
                if (bind == 0) {
                    status = '未上传';
                } else if (bind == 1) {
                    status = '已上传';
                }
            }
        } else {
            if (audit == 0) {
                status = '未审核';
            } else if (audit == 1) {
                status = '已通过';
            } else if (audit == 2) {
                status = '未通过';
            }
        }
        return status;

    }

    /**
     * 根据封装的数据，显示row
     * renderRow
     **/
    renderRow = (rowData, sectionID, rowId, highlightRow) => {

        if (sectionID === 'section1') {
            return (
                <CommnetListItem leftTitle={rowData.title} showValue={rowData.key}/>
            );
        }
        if (sectionID === 'section2') {
            return (
                <CommentHandItem warpstyle={{height: adapeSize(44)}} leftTitle={rowData.title}
                                 showValue={rowData.key} textStyle={{color: PAGECOLOR.COLORA1}} handel={() => {
                }}/>
            )
        }

        if (sectionID === 'section3') {
            return (<CGDCarItems url={rowData.icon} title={rowData.model_name}
                                 invoice_upload_status={2}
                                 obd_bind_status={2}
                                 date={""}
            />)
        }
        if (sectionID === 'section4') {
            if (rowData.title === 'OBD设备') {
                return (
                    <CommentHandItem warpstyle={{height: adapeSize(44)}} leftTitle={rowData.title}
                                     showValue={rowData.key} textStyle={{color: PAGECOLOR.COLORA1}} handel={() => {
                        if (this.carData.obd_audit_status != 1) {
                            this.toNextPage({
                                name: 'OBDDevice',
                                component: OBDDevice,
                                params: {
                                    carData: this.carData,
                                    fromScene: 'DDApplyLendScene',
                                    backRefresh: () => {
                                        //刷新界面
                                        this.props.showModal(true);
                                        this.props.sceneName = 'CheckStand';
                                        this.getLendInfo();
                                    }
                                }
                            });
                        } else {
                            this.toNextPage({
                                name: 'WebScene',
                                component: WebScene,
                                params: {webUrl: this.carData.obd_track_url}
                            })
                        }
                    }}/>
                )
            }
            if (rowData.title === '车辆权属') {
                return (
                    <CommentHandItem warpstyle={{height: adapeSize(44)}} leftTitle={rowData.title}
                                     showValue={rowData.key} textStyle={{color: PAGECOLOR.COLORA1}} handel={() => {
                        if (this.carData.auto_ownership_status != 1) {
                            this.toNextPage({
                                name: 'DDCarInfoScene',
                                component: DDCarInfoScene,
                                params: {
                                    carData: this.carData,
                                    platform_order_number: this.props.orderNo,//平台订单号
                                    info_id: this.carData.info_id,
                                    backRefresh: () => {
                                        //刷新界面
                                        this.props.showModal(true);
                                        this.props.sceneName = 'CheckStand';
                                        this.getLendInfo();
                                    }
                                }
                            });
                        }
                    }}/>
                )
            }
        }
    }

    /**
     * 根据封装的数据，显示section
     * renderSectionHeader
     **/
    renderSectionHeader = (sectionData, sectionID) => {
        if (sectionID == 'section1') {
            if (this.props.shenhe == "yes") {
                return (
                    <View style={styles.section2Style}>
                        {/*<Text style={styles.sectionText}>订单信息</Text>*/}
                        <Text style={{color: '#ff0000', fontSize: fontadapeSize(15)}}> {'审核未通过:'}</Text>
                        {/*<Text style={{color:'#000000',fontSize:Pixel.getFontPixel(14)}} numberOfLines={2}>{showData.tempDetailInfo.payment_audit_reason}</Text>*/}
                    </View>
                )
            }
        }
        if (sectionID === 'section2') {
            return (
                <View style={styles.section2Style}>
                    <Text style={styles.sectionText}>订单信息</Text>
                </View>
            )
        }
        return (
            <View style={styles.sectionStyle}>
            </View>
        )
    }

    /**
     * 根据封装的数据，显示分割线
     * renderSeparator
     **/
    renderSeparator = (sectionID, rowId, adjacentRowHighlighted) => {

        let separtrorHegigth = 1;
        return (
            <View key={`${sectionID}-${rowId}`} style={{
                height: separtrorHegigth,
                backgroundColor: PAGECOLOR.COLORA3
            }}>
            </View>
        )
    }

    /**
     * 底部按钮的点击事件
     * buttonClick
     **/
    buttonClick = (title) => {
        if (title == '申请借款') {
            if (this.props.sceneName == 'CheckStand') {
                if (this.carData.obd_bind_status == 0) {
                    this.props.showToast("0BD未绑定");
                } else if (this.carData.obd_bind_status == 1) {
                    if (this.carData.is_new == 1 && this.carData.is_mortgagor == 0) {
                        if (this.carData.order_ownership_status == 1) {
                            this.lendMoneyClick();
                        } else {
                            this.props.showToast("车辆权属未上传");
                        }
                    } else {
                        this.lendMoneyClick();
                    }
                } else if (this.carData.obd_bind_status == 2) {
                    this.props.showToast("0BD需重新绑定");
                }
            } else {
                if (this.carData.obd_audit_status == 0) {
                    if (this.carData.is_new == 1 && this.carData.is_mortgagor == 0) {
                        if (this.carData.auto_ownership_status == 0) {
                            this.lendMoneyClick();
                        } else if (this.carData.auto_ownership_status == 1) {
                            this.lendMoneyClick();
                        } else if (this.carData.auto_ownership_status == 2) {
                            this.props.showToast("车辆权属审核未通过");
                        }
                    } else {
                        this.lendMoneyClick();
                    }
                } else if (this.carData.obd_audit_status == 1) {
                    if (this.carData.is_new == 1 && this.carData.is_mortgagor == 0) {
                        if (this.carData.auto_ownership_status == 0) {
                            this.lendMoneyClick();
                        } else if (this.carData.auto_ownership_status == 1) {
                            this.lendMoneyClick();
                        } else if (this.carData.auto_ownership_status == 2) {
                            this.props.showToast("车辆权属审核未通过");
                        }
                    } else {
                        this.lendMoneyClick();
                    }
                } else if (this.carData.obd_audit_status == 2) {
                    this.props.showToast("0BD审核未通过");
                }
            }
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly !== STATECODE.loadSuccess) {
            return ( <View style={styles.container}>
                {this.loadView()}
                <AllNavigatior title='借款详情' backIconClick={() => {
                    this.backPage();
                }}/>

            </View>);
        }

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
                <AllNavigationView title='申请借款' backIconClick={() => {
                    this.backPage();
                }}/>
            </View>
        )
    }

    /**
     * 申请借款
     * lendMoneyClick
     */
    lendMoneyClick = () => {
        let maps = {
            api: apis.APPLY_LOAN,
            apply_type: "6",
            platform_order_number: this.props.orderNo,
            base_id: this.carData.base_id,
            car_lists: this.carData.info_id,
        }
        this.props.showModal(true);
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                this.props.showModal(false);
                // this.apSuccess.setModelVisible(true);
                this.props.callBack();
                const navigator = this.props.navigator;
                if (navigator) {
                    for (let i = 0; i < navigator.getCurrentRoutes().length; i++) {
                        if (navigator.getCurrentRoutes()[i].name == 'ProcurementOrderDetailScene') {
                            navigator.popToRoute(navigator.getCurrentRoutes()[i]);
                            break;
                        }
                    }
                }
            }, (error) => {
                this.props.showModal(false);
                if (error.mycode != -300 || error.mycode != -500) {
                    this.props.showToast(error.mjson.msg);
                } else {
                    this.props.showToast('服务器连接有问题')
                }
            });


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
        justifyContent: 'center',
        flexDirection: 'row',
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
        height: adapeSize(1),
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
        height: adapeSize(40),
        backgroundColor: PAGECOLOR.COLORB0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: adapeSize(width) - adapeSize(20),
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