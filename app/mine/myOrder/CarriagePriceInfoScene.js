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
    KeyboardAvoidingView
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
import InformationEnter from "./orderwuliu/InformationEnter";
import ProvinceListScene from "../../carSource/ProvinceListScene";
import AddressManageListScene from "../addressManage/AddressManageListScene";
import List from './orderwuliu/list/List'
import CityRegionScene from "../addressManage/CityRegionScene";
import PlatformChoose from "./orderwuliu/pay/PlatformChoose";


export default class CarriagePriceInfoScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: "loading",
            isShowCallUpView: false,
            senderInfo: null,
            receiverInfo: null,
            isChecked: true,
        }


        // this.params = {
        //     carCount: this.props.carCount,                  //车辆总数量		【必填】
        //     carType: this.props.carType,                            //1 新车2：二手车		【必填】
        //     company_id: global.companyBaseID,                   //公司ID		【必填】
        //     endAddr: this.props.endAddr,	                    //目的地名称		【必填】
        //     endAddrRegionId: this.props.endAddrRegionId,        //	目的地编码		【必填】
        //     endGpsLatitude: 0,	                                //车型目的地纬度
        //     endGpsLongitude: 0,	                                    //目的地经度
        //     model_data: JSON.stringify(this.props.model_data),   //	车辆数量		【必填】
        //     needInvoice: 0,	                                    //是否开发票0：否1：是默认为0
        //     receive_type: this.props.transportType===1?1:2,	    //收车方式 1：自己送车到网点 2：平台上门取车		【必填】
        //     send_type: 1,   	                                //送车方式 1：平台送车到户 2：自己到网点提车		【必填】
        //     startAddr: this.props.startAddr, 	                //始发地名称
        //     startAddrRegionId:this.props.startAddrRegionId,	        //始发地编码
        //     startGpsLatitude: 0,	                            //初始地纬度
        //     startGpsLongitude: 0, 	                            //初始地经度
        //     transportType: this.props.transportType,	        //运输类型1
        // }

        //
        // 420700197004070216
        // 骆伟


        this.params = {
            carCount: 2,                  //车辆总数量		【必填】
            carType: 1,                            //1 新车2：二手车		【必填】
            company_id: global.companyBaseID,                   //公司ID		【必填】
            endAddr:"辽宁沈阳新民市",	               //目的地名称		【必填】
            endAddrRegionId: "210100",        //	目的地编码		【必填】
            endGpsLatitude: 0,	                                //车型目的地纬度
            endGpsLongitude: 0,	                                    //目的地经度
            model_data: JSON.stringify([{ model_id: 23658,
                car_name: '2015款 宝马X6 xDrive35i 豪华型',
                car_count: 1,
                car_price: '99.80',}]),   //	车辆数量		【必填】
            needInvoice: 0,	                                    //是否开发票0：否1：是默认为0
            invoice_data:{},
            receive_type: 1,	    //收车方式 1：自己送车到网点 2：平台上门取车		【必填】
            send_type: 1,   	                                //送车方式 1：平台送车到户 2：自己到网点提车		【必填】
            startAddr: "北京北京朝阳区", 	                //始发地名称
            startAddrRegionId:"110105",	        //始发地编码
            startGpsLatitude: 0,	                            //初始地纬度
            startGpsLongitude: 0, 	                            //初始地经度
            transportType: 1,	        //运输类型1：大板2：救援3：代驾【必填】
            clientele_msg:'',
        }

    }

    initFinish = () => {
         this.loadData()
    }

    render() {

        if (this.state.renderPlaceholderOnly !== 'success') {
            // 加载中....
            return ( <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'运价详情'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />
                {this.loadView()}
            </View>);
        }


        let {
            model_data,
            carCount,
            carPrice,
            endAddr,
            startAddr,
            model_name
        } = this.params;

        model_data = [{ model_id: 23658,
            car_name: '2015款 宝马X6 xDrive35i 豪华型',
            car_count: 1,
            car_price: '99.80'}]

        let cars = []
        model_data.map((model, index) => {

            cars.push(
                <CarInfoItem
                    key={index}
                    model_data={model}/>
            )
        })

        return (
            <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'运价详情'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />

                <KeyboardAvoidingView
                    behavior={'position'} keyboardVerticalOffset={-Pixel.getPixel(100)}
                >
                    <ScrollView
                        style={{
                            paddingVertical: Pixel.getPixel(10),
                            marginBottom: Pixel.getPixel(95),
                            paddingBottom: Pixel.getPixel(30)
                        }}>

                        <AddressInfoItemView
                            deliverModeClick={(mode) => {
                                this.params.receive_type = mode
                                console.log(this.params.receive_type)

                            }}
                            contactInformationClickCallBack={() => {
                                this.toNextPage({
                                    name: 'AddressManageListScene',
                                    component:AddressManageListScene ,
                                    params: {
                                        item:this.props.firstItem,
                                        callBack: this.senderInfo,

                                    }
                                })
                            }}
                            switchable={true}
                            type={1}
                            value={this.params.receive_type}
                            departure={startAddr}
                            contactInfo={this.state.senderInfo}
                        />

                        <AddressInfoItemView
                            deliverModeClick={(mode) => {
                                this.props.showToast('该功能正在开发中...')

                                // this.params.send_type = mode;
                                // console.log(this.params.send_type)
                            }}
                            contactInformationClickCallBack={() => {
                                this.toNextPage({
                                    name: 'AddressManageListScene',
                                    component: AddressManageListScene,
                                    params: {
                                        item:this.props.lastItem,
                                        callBack: this.receiverInfo,

                                    }
                                })
                            }}
                            switchable={false}
                            value={this.params.send_type}
                            type={2}
                            departure={endAddr}
                            contactInfo={this.state.receiverInfo}
                        />
                        {cars}
                        <InvoiceMarkItem
                            ref={"InvoiceMarkItem"}
                            params={this.params}
                            showToast={this.props.showToast}
                            receiverInfo={this.state.receiverInfo}
                            toNextPage={this.selectProvince}

                            clickCallBack={(state) => {
                               this.params.needInvoice =state;
                            }}
                        />

                        <CarriagePriceInfoListView data={this.state.priceData} params={this.params}/>
                    </ScrollView>
                </KeyboardAvoidingView>

                <View
                    style={{
                        backgroundColor: 'white',
                        paddingHorizontal: Pixel.getPixel(15),
                        bottom: 0,
                        position: 'absolute',
                        width: width,
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderTopColor: fontAndColor.COLORA4,
                    }}
                >


                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: Pixel.getPixel(8),
                            borderBottomColor: fontAndColor.COLORA4,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked,
                                })
                            }}
                        >

                            <Image style={{width: Pixel.getPixel(15), height: Pixel.getPixel(15)}}
                                   source={this.state.isChecked ? require('../../../images/checked.png') : require('../../../images/carriagePriceImage/uncheck.png')}/>
                        </TouchableOpacity>
                        <SaasText style={{
                            fontSize: 12,
                            fontWeight: '200',
                            color: fontAndColor.COLORA1,
                            marginLeft: Pixel.getPixel(5)
                        }}>我已阅读并同意</SaasText>
                        <SaasText
                            onPress={()=>{

                            }}
                            style={{fontSize: 12, fontWeight: '200', color: fontAndColor.COLORA2}}>《物流服务协议》</SaasText>
                    </View>


                    <View style={{
                        height: Pixel.getPixel(50.5),
                        backgroundColor: 'white',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>


                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1,}}>
                            <Text style={{
                                color: fontAndColor.COLORA1,
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>总价：</Text>
                            <Text style={{
                                color: fontAndColor.COLORB2,
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30)
                            }}>{this.state.priceData && this.state.priceData.totalPrice}元</Text>
                        </View>

                        <TouchableOpacity activeOpacity={.8} onPress={() => {
                                if (this.verify()){
                                    this.preserveOrder(1)
                                }
                        }}>
                            <View style={{
                                width: Pixel.getPixel(100.5),
                                height: Pixel.getPixel(32.5),
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: Pixel.getPixel(2),
                                borderColor: fontAndColor.COLORA1,
                                borderWidth: Pixel.getPixel(1),
                                marginRight: Pixel.getPixel(12)
                            }}>
                                <Text style={{
                                    color: fontAndColor.COLORA1,
                                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                                }}>预存订单</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.8} onPress={() => {
                            if (this.verify()){
                                this.preserveOrder(2)
                            }
                           // this.state.priceData && this.setState({isShowCallUpView: true})
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
                </View>
                {
                    this.state.isShowCallUpView &&
                    <CallUpView cancelClick={this.cancelClick} callUpClick={this.callUpClick}/>
                }
                {
                    this.state.cityStatus && <CityRegionScene noneDistrict={false}
                                                           checkAreaClick={this.checkAreaClick}
                                                           showModal={this._showModal}
                                                           closePress={this._closeProvince}/>
                }

            </View>

        )
    }

    _showModal = (bool)=>{
        this.props.showModal(bool)
    }
    _closeProvince = ()=>{
        this.setState({
            cityStatus:false,
        })
    }
    checkAreaClick= (item)=>{
        this.refs.InvoiceMarkItem.provinceCallBack(item)
    }


    senderInfo = (info) => {
        // info
        // address:"姚家园北二路附近"
        // area:""
        // area_code:""
        // boss_id:10231
        // boss_name:"丁永刚"
        // city:"北京"
        // city_code:"110100"
        // company_id:10232
        // company_name:"丁永刚二手车"
        // contact_name:"骆伟"
        // contact_phone:"18722332312"
        // created_time:"2018-05-10 13:54:12"
        // district:"朝阳区"
        // district_code:"110105"
        // full_address:"北京北京朝阳区姚家园北二路附近"
        // id:64
        // id_car:"420700197004070216"
        // is_default:0
        // is_del:0
        // is_port:0
        // latitude:"39.956524"
        // longitude:"116.522408"
        // province:"北京"
        // province_code:"110000"
        // updated_time:"2018-05-10 13:54:23"

            this.params.startGpsLatitude = info.latitude;
            this.params.startGpsLongitude = info.longitude;
            this.params.start_id = info.id;

        console.log(info)
        this.setState({
            senderInfo: info
        }, ()=>{
                this.loadData()
        })
    }
    receiverInfo = (info) => {

        if(this.isNull(info.id_card)){
            this.props.showToast('您选的地址没有证件信息，请编辑添加或重新添加地址')
            return
        }

        this.params.endGpsLatitude = info.latitude;
        this.params.endGpsLongitude = info.longitude;
        this.params.end_id = info.id;
        this.params.id_card = info.id_card;
        this.params.endAddrRegionId= info.district_code;

        console.log(info)
        this.setState({
            receiverInfo: info
        }, ()=>{
            this.loadData()
        })
    }

    selectProvince = ()=>{

        this.setState({
            cityStatus:true,
        })

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

        this.props.showModal(true)

        this.params.invoice_data = JSON.stringify(this.params.invoice_data)

        Net.request(AppUrls.ORDER_LOGISTICS_QUERY, 'post', this.params).then((response) => {

            this.params.invoice_data = JSON.parse(this.params.invoice_data)



            this.props.showModal(false)
            let data = response.mjson.data;
            // let priceData=[{title:'运价',value:data.freight},{title:'保险费',value:data.insurance},{title:'服务费',value:data.serviceFee},{title:'提验车费',value:data.checkCarFee},{title:'送店费',value:data.toStoreFee},{title:'税费',value:data.taxation},{title:'总价',value:data.totalPrice}];
            this.setState({
                renderPlaceholderOnly: 'success',
                priceData: data
            });

        }, (error) => {
            this.params.invoice_data = JSON.parse(this.params.invoice_data)
            this.props.showModal(false)
            this.setState({
                //renderPlaceholderOnly: 'success',
                renderPlaceholderOnly: 'failure',
            });

            this.props.showToast(error.mjson.msg);

        });
    }

    preserveOrder = (type)=>{



        this.toNextPage({
            name:'List',
            component:List,
            params:{

            }
        })

        return



        //  type  1: 预存订单 2: 立即支付
        this.props.showModal(true);

        this.params.invoice_data = JSON.stringify(this.params.invoice_data)

        Net.request(AppUrls.LOGISTICS_ORDER_CREATE, 'post', this.params).then((response) => {
            this.params.invoice_data = JSON.parse(this.params.invoice_data)
            this.props.showModal(false);
            let data = response.mjson.data;
            // let priceData=[{title:'运价',value:data.freight},{title:'保险费',value:data.insurance},{title:'服务费',value:data.serviceFee},{title:'提验车费',value:data.checkCarFee},{title:'送店费',value:data.toStoreFee},{title:'税费',value:data.taxation},{title:'总价',value:data.totalPrice}];

            if (type === 1){
                this.toNextPage({
                    name:'List',
                    component:List,
                    params:{

                    }
                })

            }else if(type === 2){

                this.toNextPage({
                    name:'PlatformChoose',
                    component:PlatformChoose,
                    params:{
                        trans_id:'12345678'
                    }
                })
            }



        }, (error) => {
            this.params.invoice_data = JSON.parse(this.params.invoice_data)
            this.props.showModal(false);

            this.props.showToast(error.mjson.msg);

        });


    }


    verify = ()=>{

        if(this.params.needInvoice ===1){

            if (this.isEmpty(this.params.invoice_data.invoice_title)){
                this.props.showToast('请填写发票抬头');
                return false;
            }
            if (this.isEmpty(this.params.invoice_data.invoice_code)){
                this.props.showToast('请填写纳税人识别号');
                return false;
            }
            if (this.isEmpty(this.params.invoice_data.province)||this.isEmpty(this.params.invoice_data.city)||this.isEmpty(this.params.invoice_data.district)){
                this.props.showToast('请选择区域');
                return false;
            }
            if (this.isEmpty(this.params.invoice_data.address)){
                this.props.showToast('请填写详细地址')
                return false;
            }
        }

            if(this.params.receive_type===2){
                if(this.params.startGpsLatitude === 0){
                    this.props.showToast('请选择始发地详细地址');
                    return false;
                }
            }
            if(this.params.endGpsLatitude === 0){
                this.props.showToast('请选择到达地详细地址');
                return false;
            }

            if (!this.state.isChecked){

                this.props.showToast('请选阅读并同意物流服务协议');
                return false;

            }





            return true
    }


    isEmpty=(value )=>{

        if (typeof value === "undefined" || value === null || value === ''){
            return true;
        }else {
            return false;
        }
    }



}


class AddressInfoItemView extends Component {


    constructor(props) {
        super(props)

        this.state = {
            // departureDeliverMode:1,
            // destinationDeliverMode:1

            deliverMode:this.props.value
        }

    }


    componentWillReceiveProps(props) {
        if (props.contactInfo !== null) {
            this.setState({
                contactInfo: props.full_address
            })

        }
    }


    render() {
        const {type, departure} = this.props;
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
                                source={type === 1 ? require('../../../images/carriagePriceImage/startLocation.png') : require('../../../images/carriagePriceImage/stopLocation.png')}
                                style={{marginRight: Pixel.getPixel(5.5)}}/>
                            <SaasText style={{
                                fontWeight: '200',
                                marginBottom: Pixel.getPixel(1)
                            }}>{this.props.type === 1 ? '始发地' : '到达地'}</SaasText>
                        </View>

                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORA0,
                            fontWeight: '200'
                        }}>{departure}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.contactInformationClickCallBack()
                        }}
                        style={{flex: 1}}
                        activeOpacity={1}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flex: 1
                            }}
                        >
                            <SaasText style={{
                                color: fontAndColor.COLORA2,
                                marginHorizontal: Pixel.getPixel(10),
                                fontWeight: '200',
                                textAlign: 'right',
                                flex: 1
                            }}>{this.props.contactInfo ? this.props.contactInfo.full_address : '请选择详细地址'}</SaasText>
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
                    <DeliverTypeItem
                        value={this.props.type === 1 ? '一车上门取车' : "一车送车到户"}
                        status={this.props.type === 1 ? this.state.deliverMode === 1 ? false : true : this.state.deliverMode === 1 ? true : false}
                        clickCallBack={(status) => {

                            if(this.props.switchable){
                                this.setState({
                                    deliverMode: this.props.type === 1 ? 2 : 1
                                }, () => {
                                    this.props.deliverModeClick(this.state.deliverMode)
                                    return true;
                                })
                            }else {
                                this.props.deliverModeClick()
                                return false;
                            }
                        }}
                    />
                    <DeliverTypeItem
                        value={this.props.type === 1 ? '自己送车到网点' : "自己到网点提车"}
                        status={this.props.type === 1 ? this.state.deliverMode === 1 ? true : false : this.state.deliverMode === 1 ? false : true}
                        clickCallBack={(status) => {
                            if(this.props.switchable){
                                this.setState({
                                    deliverMode: this.props.type === 1 ? 1 : 2
                                }, () => {
                                    this.props.deliverModeClick(this.state.deliverMode)
                                    return true;
                                })
                            }else {
                                this.props.deliverModeClick()
                                return false;
                            }

                        }}

                    />
                </View>
                {
                    this.props.type === 2 ? <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: Pixel.getPixel(18),
                        borderTopColor: fontAndColor.COLORA4,
                        borderTopWidth: StyleSheet.hairlineWidth
                    }}>
                        <SaasText style={{fontWeight: '200', marginRight: Pixel.getPixel(10)}}>备注</SaasText>
                        <TextInput
                            style={{flex: 1,}}
                            multiline={true}
                        />
                    </View> : null
                }


            </View>
        )
    }
}


class InvoiceMarkItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            same: false,   //发票收取地址与目的地址相同
            needInvoice: 0,
            title: null,
            phone: null,
            tax_num: null,
            name: null,
            region: null,
            address: null,
            region_in_string: null

        }

        // this.props.receiverInfo 对象
        //
        // address:"辽宁省沈阳市新民市304国道西50米"
        // area:""
        // area_code:""
        // boss_id:10231
        // boss_name:"丁永刚"
        // city:"沈阳"
        // city_code:"210100"
        // company_id:10232
        // company_name:"丁永刚二手车"
        // contact_name:"骆伟"
        // contact_phone:"18937284622"
        // created_time:"2018-05-10 14:04:56"
        // district:"新民市"
        // district_code:"210181"
        // full_address:"辽宁沈阳新民市辽宁省沈阳市新民市304国道西50米"
        // id:65
        // id_card:"420700197004070216"
        // is_default:0
        // is_del:0
        // is_port:0
        // latitude:"42.016773"
        // longitude:"122.866409"
        // province:"辽宁"
        // province_code:"210000"
        // updated_time:"2018-05-10 14:04:56"




    }

    provinceCallBack = (item)=>{
        this.props.params.invoice_data.province = item.provice_name;
        this.props.params.invoice_data.city=item.city_name;
        this.props.params.invoice_data.district=item.district_name;
        this.setState({
            region_in_string:item.provice_name+item.city_name+item.district_name
        })
    }

    render() {
        return <View style={{marginBottom: Pixel.getPixel(10), marginTop: Pixel.getPixel(4)}}>
            <View style={{
                padding: Pixel.getPixel(15),
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                alignItems: 'center',
            }}>

                <SaasText style={{fontWeight: '200', fontSize: 15}}>开具发票</SaasText>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({
                            needInvoice: this.state.needInvoice === 0 ? 1 : 0
                        }, ()=>{
                            this.props.clickCallBack(this.state.needInvoice)
                        })

                    }}>
                    <View style={{
                        height: Pixel.getPixel(22),
                        width: Pixel.getPixel(37),
                        borderRadius: Pixel.getPixel(20),
                        borderColor: this.state.needInvoice === 1 ? fontAndColor.COLORB0 : fontAndColor.COLORA1,
                        //borderColor:this.state.borderColor,
                        borderWidth: Pixel.getPixel(1),
                        backgroundColor: this.state.needInvoice === 1 ? fontAndColor.COLORB0 : fontAndColor.COLORA1,
                        //backgroundColor: this.state.backgroundColor,
                        flexDirection: 'row',
                        justifyContent: this.state.needInvoice === 1 ? 'flex-start' : 'flex-end',
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
                this.state.needInvoice === 1 ? <View style={{
                    height: StyleSheet.hairlineWidth,
                    width: width - Pixel.getPixel(30),
                    backgroundColor: fontAndColor.COLORA4,
                    marginLeft: Pixel.getPixel(15)
                }}/> : null

            }
            {this.state.needInvoice === 1 ? <View>
                <InformationInputItem
                    ref={'title'}
                    title={'发票抬头'}
                    textPlaceholder={'请填写发票抬头'}
                    keyboardType={'default'}
                    value={this.state.title}
                    onChangeText={(text) => {
                        this.state.title = this.props.params.invoice_data.invoice_title = text;
                    }}

                />

                <InformationInputItem
                    ref={'tax_id'}
                    title={'纳税人识别号'}
                    textPlaceholder={'18位以内不包含汉子的识别号'}
                    keyboardType={'default'}
                    separator={false}
                    onChangeText={(text) => {
                        this.props.params.invoice_data.invoice_code = text;
                        this.state.tax_num = text
                    }}
                />
                <View style={{paddingVertical: Pixel.getPixel(8)}}>
                    <SaasText style={{
                        marginLeft: Pixel.getPixel(15),
                        fontSize: 12,
                        color: fontAndColor.COLORA1
                    }}>发票收取地址</SaasText>
                </View>
                <View style={{backgroundColor: 'white',}}>
                    <View style={{
                        flexDirection: 'row',
                        borderBottomColor: fontAndColor.COLORA3,
                        borderBottomWidth: Pixel.getPixel(1),
                        justifyContent: 'space-between',
                        marginHorizontal: Pixel.getPixel(15),
                        paddingVertical: Pixel.getPixel(15),
                        backgroundColor: 'white'
                    }}>
                        <SaasText style={{fontWeight: '200', fontSize: 15,}}>发票收取地址与目的地址相同</SaasText>
                        <TouchableOpacity
                            onPress={() => {
                                if ( this.props.receiverInfo !== null) {
                                    if (this.state.same === false) {
                                        this.setState({
                                            name: this.props.receiverInfo.contact_name,
                                            phone: this.props.receiverInfo.contact_phone,
                                            address: this.props.receiverInfo.address,
                                            same: true,
                                            region: this.props.receiverInfo.region,
                                            region_in_string: this.props.receiverInfo.province + " " + this.props.receiverInfo.city
                                        }, () => {
                                            this.refs.name.setInputTextValue(this.state.name)
                                            this.refs.phone.setInputTextValue(this.state.phone)
                                            this.refs.address.setInputTextValue(this.state.address)

                                            this.props.params.invoice_data.contact_name = this.state.name;
                                            this.props.params.invoice_data.contact_phone = this.state.phone;
                                            this.props.params.invoice_data.address = this.state.address;
                                            this.props.params.invoice_data.province = this.props.receiverInfo.province;
                                            this.props.params.invoice_data.city=this.props.receiverInfo.city;
                                            this.props.params.invoice_data.district=this.props.receiverInfo.district;

                                        })
                                    } else {
                                        this.setState({
                                            same: false,
                                        })
                                    }
                                } else {
                                    this.props.showToast('请完善收车详细信息')
                                }


                            }}
                        >

                            <Image style={{width: Pixel.getPixel(15), height: Pixel.getPixel(15)}}
                                   source={this.state.same ? require('../../../images/checked.png') : require('../../../images/carriagePriceImage/uncheck.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>


                <InformationInputItem
                    ref={'name'}
                    title={'收件人'}
                    textPlaceholder={' '}
                    keyboardType={'default'}
                    onChangeText={(text) => {
                        this.state.name = text
                        this.props.params.invoice_data.contact_name = text;
                    }}

                />
                <InformationInputItem
                    ref={'phone'}
                    title={'联系电话'}
                    textPlaceholder={''}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        this.state.phone = text
                        this.props.params.invoice_data.contact_phone = text;
                    }}
                />
                <InformationInputItem
                    ref={'region'}
                    title={'所在地区'}
                    textPlaceholder={''}
                    keyboardType={'default'}
                    rightIcon={true}
                    value={this.state.region_in_string}
                    rightCallBack={() => {

                        this.props.toNextPage({

                            component: ProvinceListScene,
                            name: 'ProvinceListScene',
                            params: {
                                checkedCityClick: this.checkedCityClick,
                            }
                        })
                    }}

                />
                <InformationInputItem
                    ref={'address'}
                    title={'详细地址'}
                    textPlaceholder={''}
                    separator={false}
                    keyboardType={'default'}
                    onChangeText={(text) => {
                        this.state.address = text
                        this.props.params.invoice_data.address = text;
                    }}
                />

            </View> : null
            }

        </View>
    }


    checkedCityClick = (region) => {

        let temp = {}
        for (let k in region) {
            temp[k] = region[k]
        }

        this.state.region = temp;
        this.setState({
            region_in_string: region.provice_name + " " + region.city_name
        })
    }

}

class DeliverTypeItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isChecked: this.props.status
        }
    }

    componentWillReceiveProps(props) {

        this.setState({
            isChecked: props.status
        })
    }

    render() {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
                onPress={() => {
                    if (this.state.isChecked === true) {
                        return
                    }

                    if (this.props.clickCallBack(this.state.isChecked)){
                        this.setState({
                            isChecked: !this.state.isChecked
                        })
                    }
                }}
            >
                <Image style={{width: Pixel.getPixel(18), height: Pixel.getPixel(18)}}
                       source={this.state.isChecked ? require('../../../images/checked.png') : require('../../../images/carriagePriceImage/uncheck.png')}/>
            </TouchableOpacity>
            <SaasText style={{
                marginLeft: Pixel.getPixel(15),
                color: this.state.isChecked ? 'black' : fontAndColor.COLORA4
            }}>{this.props.value}</SaasText>
        </View>

    }

}


class CarriagePriceInfoListView extends Component {

    constructor(props) {
        super(props)

        /*
        //this.props
        checkCarFee:"200.00"
        distance:"686"
        freight:"1011.00"
        insurance:"0.00"
        msg:""
        serviceFee:"50.00"
        taxation:"0.00"
        toStoreFee:"0.00"
        totalPrice:"1261.00"
        */

        this.state = {
            fold: true
        }

    }


    render() {
        let priceData = {
            totalPrice: this.props.data.totalPrice,
            taxation: this.props.data.taxation,
            freight: this.props.data.freight,
            checkCarFee: this.props.data.checkCarFee,
            insurance: this.props.data.insurance,
            toStoreFee: this.props.data.toStoreFee,
            serviceFee: this.props.data.serviceFee,
        }


        return (
            <View style={styles.carriagePriceInfoListView}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: fontAndColor.COLORA3,
                    borderBottomWidth: Pixel.getPixel(1),
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
                            <SaasText style={{fontWeight: '200'}}>{this.props.params.transportType ==1 ?'大板车':this.props.params.transportType ==2?"救援":"代价"}</SaasText>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{alignSelf: 'center'}}
                        onPress={() => {
                            this.setState({
                                fold: !this.state.fold,
                            })
                        }}
                    >
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <SaasText style={{fontWeight: '200'}}>计费详情</SaasText>
                            <Image style={{
                                width: Pixel.getPixel(15),
                                height: Pixel.getPixel(15),
                                marginLeft: Pixel.getPixel(5),
                                resizeMode: 'contain'
                            }}
                                   source={this.state.fold ? require('../../../images/carriagePriceImage/jiantou_downward.png') : require('../../../images/carriagePriceImage/jiantou_upward.png')}/>
                        </View>

                    </TouchableOpacity>

                </View>
                {
                    this.state.fold ?
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: width - Pixel.getPixel(30),
                            marginTop: Pixel.getPixel(15)
                        }}>
                            <View>
                                <PriceItemView title="运费" value={priceData.freight}/>
                                {
                                    this.props.params.transportType==1?<PriceItemView title="提验车费" value={priceData.checkCarFee}/>:null
                                }
                            </View>
                            <View>
                                <PriceItemView title="保险费" value={parseFloat(priceData.insurance) == 0?'平台赠送':priceData.insurance}/>
                                {
                                    this.props.params.transportType==1?<PriceItemView title="送店费" value={priceData.toStoreFee}/>:null
                                }
                            </View>
                            <View>
                                <PriceItemView title="服务费" value={parseFloat(priceData.serviceFee) == 0? '减免': priceData.serviceFee}/>
                                <View style={{backgroundColor: 'white', marginBottom: Pixel.getPixel(23)}}>
                                    <Text style={{
                                        color: fontAndColor.COLORA1,
                                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)
                                    }}> </Text>
                                    <View style={{
                                        marginTop: Pixel.getPixel(10),
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            color: fontAndColor.COLORA0,
                                            fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)
                                        }}> </Text>
                                    </View>
                                </View>
                            </View>
                        </View> : null

                }
            </View>
        )
    }
}

class CarInfoItem extends Component {

    render() {
        return <View style={{backgroundColor: 'white', padding: Pixel.getPixel(15), marginBottom: Pixel.getPixel(6),}}>
            <SaasText style={{fontWeight: '200', marginBottom: Pixel.getPixel(12), fontSize: 16}}>
                {this.props.model_data.car_name}
            </SaasText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SaasText style={{color: fontAndColor.COLORA1, fontWeight: '200'}}>单价</SaasText>
                <SaasText style={{
                    color: fontAndColor.COLORA1,
                    fontWeight: '200',
                    fontSize: 12,
                    marginRight: Pixel.getPixel(5)
                }}>(万元): </SaasText>
                <SaasText style={{fontWeight: '200', fontSize: 15}}>{this.props.model_data.car_price}</SaasText>
                <View style={{
                    backgroundColor: fontAndColor.COLORA4,
                    width: StyleSheet.hairlineWidth,
                    height: 17,
                    marginHorizontal: Pixel.getPixel(20)
                }}/>
                <SaasText style={{color: fontAndColor.COLORA1, fontWeight: '200'}}>台数</SaasText>
                <SaasText style={{
                    color: fontAndColor.COLORA1,
                    fontWeight: '200',
                    fontSize: 12,
                    marginRight: Pixel.getPixel(5)
                }}>(台): </SaasText>
                <SaasText style={{fontWeight: '200', fontSize: 15}}>{this.props.model_data.car_count}</SaasText>
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