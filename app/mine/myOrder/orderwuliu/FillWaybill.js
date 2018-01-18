/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Dimensions, ScrollView, Image,
} from 'react-native';
import TagSelectView from '../component/TagSelectView';
import BaseComponent from '../../../component/BaseComponent';
import NavigatorView from '../../../component/AllNavigationView';
import InvoiceInfo from './InvoiceInfo';
import AccountModal from './AccountModal';
import AddressManage from './AddressManage';
const agree_icon = require('../../../../images/agree_icon.png');
const disagree = require('../../../../images/disagree.png');
const collect_icon = require('../../../../images/collect_icon.png');
const depart_icon = require('../../../../images/depart_icon.png');
const imaginary_icon = require('../../../../images/imaginary_icon.png');
const {width} = Dimensions.get('window');
import * as FontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import MyButton from "../../../component/MyButton";
const cellJianTou = require('../../../../images/mainImage/celljiantou@2x.png');
const white_jiantou = require('../../../../images/white_jiantou.png');
import {request} from '../../../utils/RequestUtil';
import * as Urls from '../../../constant/appUrls';

const Pixel = new PixelUtil();
let tagViews = [{
    name: '大板',
    check: true,
    id: 0
}, {
    name: '救援',
    check: false,
    id: 1
}, {
    name: '代驾',
    check: false,
    id: 2
}];
let feeDatas = [{title: '物流费', value: '1000元'}, {title: '提验车费', value: '100元'}]
let accoutInfo = [{title: '联系人', value: ''}, {title: '联系方式', value: ''}, {title: '收车地址', value: ''}]
export default class FillWaybill extends BaseComponent {
    constructor(props) {
        super(props);
        this.collectAddress = '';
        this.startAdress = '';
        this.distance='';
        this.companyName='';
        this.endId='';
        this.startId='';
        this.toStore = false
        this.vType=this.props.vType;//1:二手车 2:新车
        this.toStore = this.props.toStore;//运单信息到店
        if (this.toStore) {
            this.title = '运单信息（到店）';
            this.toStore = this.props.toStore;//运单信息到店
            feeDatas = [{title: '物流费', value: '1000元'}, {title: '仓储费', value: '100元'}]
        } else {
            this.title = '填写运单'
        }
        this.state = {
            isAgree: true,
            renderPlaceholderOnly: 'blank',
            endId:this.endId,
            collectAddress:''
        }
    }

    initFinish() {
        this.getData();
    }

    getData = () => {
        let maps = {
            company_id: global.companyBaseID,
            logistics_type: this.props.logisticsType,//物流类型
            order_id: this.props.orderId
        };
        request(Urls.WAYBILL, 'Post', maps)
            .then((response) => {
                    if (response.mjson.data != null) {
                        accoutInfo=[];
                        let data=response.mjson.data;
                        let end_address=data.end_address;
                        this.startAdress=data.start_address.city+data.start_address.district;
                        this.collectAddress=end_address.city+end_address.district;
                        this.endId=end_address.id;
                        this.startId=data.start_address.id;
                        this.companyName=end_address.company_name;
                        this.distance=data.distance;
                        accoutInfo.push({title: '联系人', value: end_address.contact_name});
                        accoutInfo.push({title: '联系方式', value: end_address.contact_phone});
                        accoutInfo.push({title: '收车地址', value: end_address.full_address});


                    }
                    this.setState({
                        renderPlaceholderOnly: 'success',
                        endId:this.endId,
                        collectAddress:this.collectAddress

                    });
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error',});
                });
    }
    //获取运单费
    getTransFee = () => {
        let maps = {
            company_id: global.companyBaseID,
            end_id: this.state.endId,
            order_id: this.props.orderId,
            start_id: this.startId,
            logistics_type: this.props.logisticsType,//物流类型
            trans_type:1
        };
        request(Urls.CHECKTRANSTYPE, 'Post', maps)
            .then((response) => {
                    if (response.mjson.data != null) {
                        let data=response.mjson.data;

                    }
                    this.setState({renderPlaceholderOnly: 'success'});
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error',});
                });
    }

    /**
     *   地址回传
     **/
    updateAddress = (newAddress) => {
        console.log('newAddress',newAddress);
        this.setState({
            collectAddress: newAddress.city + newAddress.district,
            endId: newAddress.id,
        })
    };

    allRefresh = () => {
        this.setState({
            renderPlaceholderOnly: 'loading',
        });
        this.getData();
    }

    _renderItem = () => {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    height: Pixel.getPixel(120),
                    backgroundColor: FontAndColor.COLORB0,
                    paddingTop: Pixel.getPixel(30),
                    marginBottom: Pixel.getPixel(10)
                }}>
                    <View style={{marginLeft: Pixel.getPixel(15)}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: Pixel.getPixel(7)}}>
                            <Image source={collect_icon} style={{marginRight: Pixel.getPixel(3),}}></Image>
                            <Text style={{color: 'white', fontSize: Pixel.getPixel(15)}}>发车地</Text>
                        </View>
                        <Text style={{color: 'white', fontSize: Pixel.getPixel(15)}}> {this.startAdress}</Text>
                    </View>
                    <View style={{alignItems: 'center', marginBottom: Pixel.getPixel(5)}}>
                        <Text style={{color: 'white', fontSize: Pixel.getPixel(15)}}>{this.distance+"公里"}</Text>
                        <Image source={imaginary_icon} style={{
                            width: Pixel.getPixel(120),
                            marginTop: Pixel.getPixel(5)
                        }}></Image>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        this.toNextPage({
                                name: 'AddressManage',
                                component: AddressManage,
                                params: {
                                    addressId:this.state.endId,
                                    callBack:this.updateAddress
                                }
                            }
                        );
                    }}>
                        <View style={{marginRight: Pixel.getPixel(15)}}>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: Pixel.getPixel(7),
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}>
                                <Image source={depart_icon} style={{marginRight: Pixel.getPixel(3)}}></Image>

                                <Text style={{color: 'white', fontSize: Pixel.getPixel(15)}}>收车地</Text>
                                <Image source={white_jiantou} style={{marginLeft: Pixel.getPixel(5)}}></Image>
                            </View>
                            <Text style={{color: 'white', fontSize: Pixel.getPixel(15)}}> {this.state.collectAddress}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{backgroundColor: 'white', marginBottom: Pixel.getPixel(10)}}>
                    <View style={styles.content_tag_wrap}>
                        <Text style={{color: 'black'}}> 运输类型</Text>
                        <View style={{
                            height: Pixel.getPixel(49),
                            justifyContent: 'center',
                            marginRight: Pixel.getPixel(5),
                        }}>
                            <TagSelectView ref={(ref) => {
                                this.tagRef = ref;
                            }} onTagClick={this.onTagClick} cellData={tagViews}/>
                        </View>
                    </View>

                    {
                        feeDatas.map((data, index) => {
                            return (
                                <View key={index + 'fee'} style={styles.content_title_text_wrap}>
                                    <Text style={styles.content_title_text}>{data.title}</Text>
                                    <Text style={styles.content_base_Right}>{data.value}</Text>
                                </View>
                            )
                        })
                    }

                </View>

                <View style={{
                    backgroundColor: 'white',
                    marginBottom: Pixel.getPixel(10),
                    paddingVertical: Pixel.getPixel(10)
                }}>
                    {
                        accoutInfo.map((data, index) => {
                            return (
                                <View key={index + 'accoutInfo'} style={styles.content_title_text_wrap}>
                                    <Text style={styles.content_title_text}>{data.title}</Text>
                                    <View style={{
                                        flexWrap: 'wrap',
                                        height: Pixel.getPixel(51),
                                        width: width * 3 / 4,
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={[styles.content_base_Right]}>{data.value}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }

                </View>

                {this.toStore && <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    // this.toNextPage({
                    //         name: 'WaybillToStore',
                    //         component: WaybillToStore,
                    //         params: {}
                    //     }
                    // );
                }}>
                    <View style={[styles.content_base_wrap, {marginBottom: Pixel.getPixel(10)}]}>
                        <View style={styles.content_base_text_wrap}>
                            <Text style={[styles.content_base_left, {color: 'black'}]}>运单信息（到库）</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[styles.content_base_Right, {color: FontAndColor.COLORA1}]}>{'查看'}</Text>
                                <Image source={cellJianTou} style={styles.image}></Image>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>}


                {this.vType==2&&<TouchableOpacity activeOpacity={0.8} onPress={() => {
                    this.toNextPage({
                            name: 'InvoiceInfo',
                            component: InvoiceInfo,
                            params: {
                                orderId:this.props.order_id,
                                endId:this.state.endId
                            }
                        }
                    );
                }}>
                    <View style={styles.content_base_wrap}>
                        <View style={styles.content_base_text_wrap}>
                            <Text style={[styles.content_base_left, {color: 'black'}]}>发票</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[styles.content_base_Right, {color: FontAndColor.COLORA1}]}>{this.company_name}</Text>
                                <Image source={cellJianTou} style={styles.image}></Image>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>}

                {/*<View style={{alignItems: 'center', flexDirection: 'row',marginTop: Pixel.getPixel(10),}}>*/}
                    {/*<TouchableOpacity activeOpacity={0.8} onPress={() => {*/}
                        {/*this.setState({*/}
                            {/*isAgree: !this.state.isAgree*/}
                        {/*});*/}
                    {/*}}>*/}
                        {/*<View style={{*/}
                            {/*flexDirection: 'row',*/}
                            {/*alignItems: 'center',*/}
                            {/*marginLeft: Pixel.getPixel(15)*/}
                        {/*}}>*/}
                            {/*<Image source={this.state.isAgree ? agree_icon : disagree}*/}
                                   {/*style={{marginRight: Pixel.getPixel(3)}}></Image>*/}
                            {/*<Text style={{color: FontAndColor.COLORA1, fontSize: Pixel.getPixel(14)}}>我已同意签署物流协议</Text>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity activeOpacity={0.8} onPress={() => {*/}
                        {/*alert('1111')*/}
                    {/*}}>*/}
                        {/*<Text style={{color: FontAndColor.COLORA1, fontSize: Pixel.getPixel(14),}}>《物流协议》</Text>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}

                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'确定'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={() => {
                              this.confirmBt();
                          }}/>
            </View>
        );

    }

    confirmBt = () => {
        if (!this.state.isAgree) {
            this.props.showToast('请勾选物流协议');
            return;
        }
        if (this.isEmpty(this.collectAdress)) {
            this.props.showToast('请选择收车地');
            return;
        }
        this.toNextPage({
                name: 'CheckWaybill',
                component: CheckWaybill,
                params: {
                    isShowPay: true
                }
            }
        );
    }

    backPg = () => {
        this.refs.accountModal.changeShowType(true,
            '您确认选择放弃？', '确认', '取消', () => {
                this.backPage();
            });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title={this.title} backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <View style={{flex: 1, marginTop: Pixel.getTitlePixel(64),}}>
                    {
                        this._renderItem()
                    }
                </View>
                {this.toStore && <View
                    style={styles.footerStyle}>
                    <Text
                        style={{
                            color: '#666666',
                            fontSize: 13,
                            marginHorizontal: Pixel.getPixel(10)
                        }}>仓库费:</Text>
                    <Text style={{color: FontAndColor.COLORB2, fontSize: 18, flex: 1}}>{50 + '元'}</Text>
                    <TouchableOpacity activeOpacity={0.8} style={{
                        width: Pixel.getPixel(80),
                        height: Pixel.getPixel(38),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: FontAndColor.COLORB0,
                        borderRadius: 4,
                        marginRight: Pixel.getPixel(10)
                    }} onPress={() => {
                        this.confirmBt();
                    }}
                    >
                        <Text style={{color: 'white', fontSize: 18}}>支付</Text>
                    </TouchableOpacity>
                </View>}
                <AccountModal ref="accountModal"/>
                <NavigatorView title={this.title} backIconClick={this.backPg}/>
            </View>)
        }

    }

    onTagClick = (dt, index) => {
        //单选
        tagViews.map((data) => {
            data.check = false;
        });

        tagViews[index].check = !tagViews[index].check;

        this.tagRef.refreshData(tagViews);
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: FontAndColor.all_background,
        flex: 1,
    },
    content_tag_wrap: {
        height: Pixel.getPixel(49),
        marginHorizontal: Pixel.getPixel(15),
        borderBottomWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content_title_wrap: {
        height: Pixel.getPixel(51),
        backgroundColor: FontAndColor.all_background,
    },
    content_title_text_wrap: {
        height: Pixel.getPixel(37),
        alignItems: 'center',
        flexDirection: 'row'
    },
    content_title_text: {
        flex: 1,
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(14),
        color: FontAndColor.COLORA1,
    },
    content_base_wrap: {
        height: Pixel.getPixel(46),
        minHeight: Pixel.getPixel(46),
        backgroundColor: 'white'
    },
    content_base_text_wrap: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    content_base_left: {
        flex: 1,
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(14),
        color: FontAndColor.COLORA1
    },
    content_base_Right: {
        marginRight: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(14),
        color: 'black',
        textAlign: 'right'
    },
    image: {
        marginRight: Pixel.getPixel(15),
    },
    topText: {
        color: 'white',
        fontSize: Pixel.getPixel(14)
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15)
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
    footerStyle: {
        height: Pixel.getPixel(50),
        width: width,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        position: 'absolute',
        bottom: Pixel.getPixel(0),

    },
});
