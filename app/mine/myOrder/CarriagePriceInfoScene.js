/**
 * Created by zhengnan on 2018/3/5.
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    NativeModules,
    Platform,
    Linking,
    TextInput,
    Animated,
} from 'react-native'

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationBar from '../../component/NavigationBar';
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import * as Net from '../../utils/RequestUtil';
import * as AppUrls from '../../constant/appUrls';
import SaasText from "../accountManage/zheshangAccount/component/SaasText";
import InformationInputItem from './component/InformationInputItem'

export default class CarriagePriceInfoScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShowCallUpView: false,
        }

    }

    componentWillMount() {
        // this.loadData();

    }

    render() {
        const {
            carCount,
            carPrice,
            endAddr,
            startAddr,
            model_name
        } = this.props;

        return (
            <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'运价详情'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />

                <ScrollView onScroll={this.onScroll}>


                    <AddressInfoItemView type={1} select={1} text1={'始发地'} text2={startAddr} value1="一车上门取车"
                                         value2="自己送车到店"/>
                    <AddressInfoItemView type={2} select={1} text1={'到达地'} text2={endAddr} value1="自己到网店提车"
                                         value2="一车送车到户"/>


                    <CarInfoItem/>
                    <CarInfoItem/>

                    <InvoiceMarkItem
                        clickCallBack={(state) => {
                            console.log(state)
                        }}
                    />

                    <CarriagePriceInfoListView data={this.state.priceData}/>

                </ScrollView>
                <View style={{
                    height: Pixel.getPixel(50.5), backgroundColor: 'white', paddingHorizontal: Pixel.getPixel(15),
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    bottom: 0,
                    position: 'absolute',
                    width: width,
                    borderTopWidth: Pixel.getPixel(1),
                    borderTopColor: fontAndColor.COLORA4,
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            color: fontAndColor.COLORA1,
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                        }}>总价：</Text>
                        <Text style={{
                            color: fontAndColor.COLORB2,
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30)
                        }}>{this.state.priceData && this.state.priceData.totalPrice}元</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        this.state.priceData && this.setState({isShowCallUpView: true})
                    }}>
                        <View style={{
                            width: Pixel.getPixel(100.5),
                            height: Pixel.getPixel(32.5),
                            backgroundColor: this.state.priceData ? fontAndColor.COLORB0 : fontAndColor.COLORA3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: Pixel.getPixel(2)
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>立即支付</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isShowCallUpView &&
                    <CallUpView cancelClick={this.cancelClick} callUpClick={this.callUpClick}/>
                }

            </View>
        )
    }


    cancelClick = () => {
        this.setState({
            isShowCallUpView: false
        })
    }

    callUpClick = (PhoneNumber) => {
        if (Platform.OS === 'android') {
            NativeModules.VinScan.callPhone(PhoneNumber);
        } else {
            Linking.openURL('tel:' + PhoneNumber);
        }

        this.cancelClick();
    }

    loadData = () => {
        const paramsData = {
            carCount: this.props.carCount,
            carType: this.props.carType,
            endAddr: this.props.endAddr,
            endAddrRegionId: this.props.endAddrRegionId,
            startAddr: this.props.startAddr,
            startAddrRegionId: this.props.startAddrRegionId,
            transportType: this.props.transportType,
            company_id: global.companyBaseID,
            model_data: JSON.stringify(this.props.model_data),
            receive_type: 1,
            send_type: 1,
        };


        console.log(paramsData);
        this.props.showModal(true);
        Net.request(AppUrls.ORDER_LOGISTICS_QUERY, 'post', paramsData).then((response) => {
            this.props.showModal(false);
            let data = response.mjson.data;
            // let priceData=[{title:'运价',value:data.freight},{title:'保险费',value:data.insurance},{title:'服务费',value:data.serviceFee},{title:'提验车费',value:data.checkCarFee},{title:'送店费',value:data.toStoreFee},{title:'税费',value:data.taxation},{title:'总价',value:data.totalPrice}];
            this.setState({priceData: data});

        }, (error) => {

            this.props.showModal(false);
            this.props.showToast(error.mjson.msg);

        });
    }


}


class AddressInfoItemView extends Component {

    render() {
        const {type, select, text1, text2, value1, value2} = this.props;
        return (
            <View style={{
                paddingHorizontal: Pixel.getPixel(15),
                backgroundColor: 'white',
                marginBottom: Pixel.getPixel(10)
            }}>
                <View style={{
                    flexDirection: 'row',
                    borderBottomColor: fontAndColor.COLORA4,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    paddingVertical: Pixel.getPixel(18)
                }}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', marginBottom: Pixel.getPixel(15), alignItems: 'center'}}>
                            <Image
                                source={type == 1 ? require('../../../images/carriagePriceImage/startLocation.png') : require('../../../images/carriagePriceImage/stopLocation.png')}
                                style={{marginRight: Pixel.getPixel(5.5)}}/>
                            <SaasText style={{fontWeight: '200', marginBottom: Pixel.getPixel(1)}}>{text1}</SaasText>
                        </View>

                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORA0,
                            fontWeight: '200'
                        }}>山西省太远市和平区</Text>
                    </View>
                    <TouchableOpacity
                        onPress={()=>{
                            this.props.clickCallBack(text1)
                        }}
                        activeOpacity={1}
                    >
                        <View
                            style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
                        >
                            <SaasText style={{
                                color: fontAndColor.COLORA2,
                                marginHorizontal: Pixel.getPixel(10),
                                fontWeight: '200'
                            }}>请填写发车人联系方式及详细地址</SaasText>
                            <Image style={{width: Pixel.getPixel(10), height: Pixel.getPixel(10)}}
                                   source={require('../../../images/mainImage/celljiantou.png')}/>
                        </View>

                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    paddingVertical: Pixel.getPixel(18)
                }}>
                    <DeliverTypeItem/>
                    <DeliverTypeItem/>
                </View>
                {
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: Pixel.getPixel(18),
                        borderTopColor: fontAndColor.COLORA4,
                        borderTopWidth: StyleSheet.hairlineWidth
                    }}>
                        <SaasText>备注</SaasText>
                        <TextInput

                        />
                    </View>
                }


            </View>
        )
    }
}


class InvoiceMarkItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            on: false,
            borderColor: new Animated.Value(fontAndColor.COLORA1),
            backgroundColor: new Animated.Value(fontAndColor.COLORA1),
            justifyContent: new Animated.Value('flex-start')
        }

    }

    render() {
        return<View style={{ marginBottom: Pixel.getPixel(10)}}>
            <View style={{
                padding: Pixel.getPixel(15),
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                alignItems: 'center',
                borderBottomWidth:StyleSheet.hairlineWidth,
                borderBottomColor:fontAndColor.COLORA4
            }}>

                <SaasText style={{fontWeight: '200', fontSize: 15}}>开具发票</SaasText>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({
                            on: !this.state.on
                        })
                        this.props.clickCallBack(this.state.on)

                    }}>
                    <View style={{
                        height: Pixel.getPixel(22),
                        width: Pixel.getPixel(37),
                        borderRadius: Pixel.getPixel(20),
                        borderColor: this.state.on ? fontAndColor.COLORB0 : fontAndColor.COLORA1,
                        //borderColor:this.state.borderColor,
                        borderWidth: Pixel.getPixel(1),
                        backgroundColor: this.state.on ? fontAndColor.COLORB0 : fontAndColor.COLORA1,
                        //backgroundColor: this.state.backgroundColor,
                        flexDirection: 'row',
                        justifyContent: this.state.on ? 'flex-start' : 'flex-end',
                        //justifyContent:this.state.justifyContent,
                        alignItems: 'center'
                    }}>
                        <View
                            style={{
                                width: Pixel.getPixel(20),
                                height: Pixel.getPixel(20),
                                borderRadius: Pixel.getPixel(10),
                                backgroundColor: 'white',
                            }}/>
                    </View>
                </TouchableOpacity>

            </View>

            {
                <View

                >
                    <InformationInputItem
                        ref={'organization'}
                        title={'发票抬头'}
                        textPlaceholder={'或选择历史记录'}
                        keyboardType={'default'}
                        rightIcon={true}
                        value={'请输入或选择历史记录'}
                        onChangeText={(text)=>{

                        }}
                        annotation={''}

                    />

                    <InformationInputItem
                        ref={'organization'}
                        title={'纳税人识别号'}
                        textPlaceholder={'18位以内不包含汉子的识别号'}
                        keyboardType={'default'}
                        onChangeText={(text)=>{

                        }}
                        annotation={''}

                    />
                    <View style={{paddingVertical:Pixel.getPixel(8)}}>
                        <SaasText style={{marginLeft:Pixel.getPixel(15), fontSize:12, color:fontAndColor.COLORA1}}>发票收取地址</SaasText>
                    </View>
                    <View style={{flexDirection:'row', borderBottomColor: fontAndColor.COLORA3, borderBottomWidth: Pixel.getPixel(1),justifyContent:'space-between',
                        padding:Pixel.getPixel(15), backgroundColor:'white'}}>
                        <SaasText style={{fontWeight:'200',fontSize:15,}}>发票收取地址与目的地址相同</SaasText>
                        <Image style={{width:Pixel.getPixel(15),height:Pixel.getPixel(15)}} source={require('../../../images/carriagePriceImage/uncheck.png')}/>
                    </View>

                    <InformationInputItem
                        ref={'organization'}
                        title={'收件人'}
                        textPlaceholder={' '}
                        keyboardType={'default'}
                        onChangeText={(text)=>{

                        }}
                        annotation={''}

                    />
                    <InformationInputItem
                        ref={'organization'}
                        title={'联系电话'}
                        textPlaceholder={''}
                        keyboardType={'default'}
                        onChangeText={(text)=>{

                        }}
                        annotation={''}

                    />
                    <InformationInputItem
                        ref={'organization'}
                        title={'所在地区'}
                        textPlaceholder={''}
                        keyboardType={'default'}
                        rightIcon={true}
                        onChangeText={(text)=>{

                        }}
                        annotation={''}

                    />
                    <InformationInputItem
                        ref={'organization'}
                        title={'详细地址'}
                        textPlaceholder={''}
                        keyboardType={'default'}
                        onChangeText={(text)=>{

                        }}
                        annotation={''}

                    />
                </View>



            }

        </View>




    }
}

class DeliverTypeItem extends Component {




    render() {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: Pixel.getPixel(18), height: Pixel.getPixel(18)}}
                   source={require('../../../images/checked.png')}/>
            <SaasText style={{marginLeft: Pixel.getPixel(15), color: fontAndColor.COLORA4}}>一车上门取车</SaasText>
        </View>

    }

}


class CarriagePriceInfoListView extends Component {
    render() {
        let priceData = {
            totalPrice: 30232,
            taxation: 100,
            freight: 100,
            checkCarFee: 100,
            insurance: 100,
            toStoreFee: 100,
            serviceFee: 100,
        }
        return (
            <View style={styles.carriagePriceInfoListView}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: fontAndColor.COLORA3,
                    borderBottomWidth: Pixel.getPixel(1),
                    marginBottom: Pixel.getPixel(15),
                    paddingBottom: Pixel.getPixel(15)
                }}>
                    <View style={{}}>
                        <View style={{
                            flex: 1,
                            borderBottomColor: fontAndColor.COLORA3,
                            borderBottomWidth: Pixel.getPixel(1),
                            paddingBottom: Pixel.getPixel(12),
                            marginBottom: Pixel.getPixel(17.5),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>


                            <Text
                                style={{
                                    color: fontAndColor.COLORA0,
                                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                    fontWeight: '200'
                                }}>运费单总价：</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{
                                    color: fontAndColor.COLORB2,
                                    fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                                    fontWeight: '200'
                                }}>{priceData.totalPrice}</Text>
                                <Text
                                    style={{
                                        color: fontAndColor.COLORB2,
                                        fontWeight: '200',
                                        fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24)
                                    }}>元</Text>
                                {
                                    <Text style={{
                                        color: fontAndColor.COLORA1,
                                        fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                                        fontWeight: '200'
                                    }}>{priceData.taxation > 0 ? `(含税${priceData.taxation}元)` : '(不含税)'}</Text>
                                }
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <SaasText style={{fontWeight: '200'}}>运输方式：</SaasText>
                            <SaasText style={{fontWeight: '200'}}>大板车</SaasText>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SaasText style={{fontWeight: '200'}}>计费详情</SaasText>
                        <Image style={{
                            width: Pixel.getPixel(15),
                            height: Pixel.getPixel(15),
                            marginLeft: Pixel.getPixel(5),
                            resizeMode:'contain'
                        }}
                               source={require('../../../images/carriagePriceImage/jiantou_downward.png')}/>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: width - Pixel.getPixel(30)
                }}>
                    <View>
                        <PriceItemView title="运费" value={priceData.freight}/>
                        <PriceItemView title="提验车费" value={priceData.checkCarFee}/>

                    </View>
                    <View>
                        <PriceItemView title="保险费" value={priceData.insurance}/>
                        <PriceItemView title="送店费" value={priceData.toStoreFee}/>

                    </View>
                    <View>
                        <PriceItemView title="服务费" value={priceData.serviceFee}/>
                        <View style={{backgroundColor: 'white', marginBottom: Pixel.getPixel(23)}}>
                            <Text style={{
                                color: fontAndColor.COLORA1,
                                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)
                            }}> </Text>
                            <View style={{marginTop: Pixel.getPixel(10), flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{
                                    color: fontAndColor.COLORA0,
                                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)
                                }}> </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

class CarInfoItem extends Component {

    render() {
        return <View style={{backgroundColor: 'white', padding: Pixel.getPixel(15), marginBottom: Pixel.getPixel(6),}}>
            <SaasText style={{fontWeight: '200', marginBottom: Pixel.getPixel(12), fontSize: 16}}>
                2017款 斯卡达瑞1.8T 手动一体基本版
            </SaasText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SaasText style={{color: fontAndColor.COLORA1, fontWeight: '200'}}>单价</SaasText>
                <SaasText style={{color: fontAndColor.COLORA1, fontWeight: '200', fontSize: 12}}>(万元): </SaasText>
                <SaasText style={{fontWeight: '200', fontSize: 15}}>12.4</SaasText>
                <View style={{
                    backgroundColor: fontAndColor.COLORA4,
                    width: StyleSheet.hairlineWidth,
                    height: 17,
                    marginHorizontal: Pixel.getPixel(20)
                }}/>
                <SaasText style={{color: fontAndColor.COLORA1, fontWeight: '200'}}>台数</SaasText>
                <SaasText style={{color: fontAndColor.COLORA1, fontWeight: '200', fontSize: 12}}>(台): </SaasText>
                <SaasText style={{fontWeight: '200', fontSize: 15}}>12.4</SaasText>
            </View>


        </View>
    }
}

class PriceItemView extends Component {
    render() {
        let {title, value} = this.props;
        return (
            <View style={{backgroundColor: 'white', marginBottom: Pixel.getPixel(23)}}>
                <Text style={{
                    color: fontAndColor.COLORA1,
                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                    fontWeight: '200'
                }}>{title}</Text>
                <View style={{marginTop: Pixel.getPixel(10), flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{
                        color: fontAndColor.COLORA0,
                        fontSize: 16,
                        fontWeight: '200'
                    }}>{value}</Text>
                    <Text style={{
                        color: fontAndColor.COLORA0,
                        fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                        fontWeight: '200'
                    }}>元</Text>
                </View>
            </View>
        )
    }
}

class CallUpView extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={1} style={styles.callUpView} onPress={this.props.cancelClick}>
                <View style={styles.callUpItem}>
                    <Text style={{
                        color: fontAndColor.COLORA1,
                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                        marginTop: Pixel.getPixel(24.5)
                    }}>在线支付即将启用...</Text>
                    <Text style={{
                        color: fontAndColor.COLORA0,
                        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        marginTop: Pixel.getPixel(20)
                    }}>下单电话:010-59230023</Text>
                    <Text style={{
                        color: fontAndColor.COLORA0,
                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                        marginTop: Pixel.getPixel(11.5)
                    }}>第1车贷24小时为您服务</Text>
                    <TouchableOpacity onPress={() => this.props.callUpClick('010-59230023')} activeOpacity={1}>
                        <View style={{
                            backgroundColor: fontAndColor.COLORB0,
                            width: Pixel.getPixel(100.5),
                            height: Pixel.getPixel(32.5),
                            borderRadius: Pixel.getPixel(2),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: Pixel.getPixel(22.5),
                            marginBottom: Pixel.getPixel(15)
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>拨打</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
        paddingBottom: Pixel.getPixel(50.5)
    },
    headImage: {
        paddingTop: Pixel.getTitlePixel(64),
        width: width,
        height: Pixel.getPixel(149),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: Pixel.getPixel(8.5),
        marginBottom: Pixel.getPixel(6.5),
        // backgroundColor:'yellow'
    },
    headTitle: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        marginTop: Pixel.getPixel(10),
        backgroundColor: 'transparent'
    },
    headContentView: {
        flexDirection: 'row',
        width: width,
        height: Pixel.getPixel(30),
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor:'yellow'
    },
    headSubView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: Pixel.getPixel(40),
        width: width / 2 - Pixel.getPixel(1),
    },
    headSubTitleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        backgroundColor: 'transparent'

    },
    headSubNumberText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        fontWeight: 'bold',
        backgroundColor: 'transparent'

    },
    carriagePriceInfoItemView: {
        width: width,
        height: Pixel.getPixel(99),
        backgroundColor: 'white',
        padding: Pixel.getPixel(15),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Pixel.getPixel(8),
    },
    carriagePriceInfoLeftItem: {
        justifyContent: 'center',
        width: width * 0.55
    },
    carriagePriceInfoRightItem: {
        justifyContent: 'center',
        width: width * 0.45
    },
    carriagePriceInfoListView: {
        backgroundColor: 'white',
        paddingHorizontal: Pixel.getPixel(15),
        paddingTop: Pixel.getPixel(15.5),
    },
    callUpView: {
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)',
        left: 0,
        borderRadius: Pixel.getPixel(2)
    },
    callUpItem: {
        width: Pixel.getPixel(260.5),
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
    }

})