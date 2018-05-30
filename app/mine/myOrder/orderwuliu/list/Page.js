/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManagerm,
    RefreshControl,
    Modal,
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../../utils/PixelUtil';

const Pixel = new PixelUtil();
import * as fontAndColor from '../../../../constant/fontAndColor';
import {request} from '../../../../utils/RequestUtil';
import * as Urls from '../../../../constant/appUrls';
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import BaseComponent from '../../../../component/BaseComponent';
import SaasText from "../../../accountManage/zheshangAccount/component/SaasText";
import PlatformChoose from "../pay/PlatformChoose";
import LogisCarInfoScene from "../../LogisCarInfoScene";
import NewCarriagePriceInfoScene from "../../NewCarriagePriceInfoScene";
import ListFooter from './../../../../component/LoadMoreFooter';

export default class FlowAllPage extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: 'loading',
            isRefreshing: false,
            payShow:false,
            cancelShow:false
        };

        this.orders = [];
        this.currentPage = 1;
        this.totalOrders = 0;


    }

    initFinish = () => {

        this.loadData(this.currentPage)
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    }



    allRefresh = ()=>{

        this.setState({
            renderPlaceholderOnly: 'loading',
        })

        this.orders = [];
        this.currentPage = 1;
        this.loadData(this.currentPage)
    }

    loadData = (page)=>{

        let params = {

            company_id: global.companyBaseID,
            page:page,
            rows:5,
            status:this.props.status,  // 0：全部 1：待付款 2：待发运 3：已发运 4：已到达 5：已完成 6：失效

        }

        request(Urls.LOGISTICS_ORDER_LIST, 'post', params).then((response) => {

            this.props.showModal(false)

            let data = response.mjson.data.info_list;
            this.totalOrders = response.mjson.data.total;

            if (typeof data === 'undefined'){
                this.setState({
                    renderPlaceholderOnly: 'noData',
                })
                return;
            }

            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

            data.map((order)=>{
                this.orders.push(order);
            })

            if(this.props.status === 3 && this.orders[0] !== '1'){
                this.orders.splice(0,0,'1')
            }

            let currentNum = this.props.status === 3?this.orders.length-1:this.orders.length;

            if(currentNum >= this.totalOrders){
                this.state.haveMoreData = false;
            }else {
                this.state.haveMoreData = true;
            }


            this.setState({
                renderPlaceholderOnly: 'success',
                source: ds.cloneWithRows(this.orders),
                isRefreshing:false
            })

        }, (error) => {
            this.props.showModal(false)
            this.setState({
                renderPlaceholderOnly: "failure",
                isRefreshing:false,
            })
            this.props.showToast(error.mjson.msg);

        });

    }



    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (<View style = {{flex:1}}>

                <ListView
                    removeClippedSubviews={false}
                    style={{paddingTop: Pixel.getPixel(this.props.status ===3?1:8), backgroundColor: fontAndColor.COLORA3, flex: 1}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    render
                    initialListSize={10}
                    onEndReachedThreshold={2}
                    stickyHeaderIndices={[]}//仅ios
                    enableEmptySections={true}
                    renderFooter={this.renderListFooter}
                    scrollRenderAheadDistance={10}
                    pageSize={10}
                    onEndReached={this.toEnd}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshingData}
                            tintColor={[fontAndColor.COLORB0]}
                            colors={[fontAndColor.COLORB0]}
                        />}
                />
                <Modal
                    ref='pay'
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.payShow}

                >
                    <View
                        style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,.3)'
                        }}>
                        <View style={{
                            width: width - width / 4,
                            height: Pixel.getPixel(125),
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal:Pixel.getPixel(20),
                            borderRadius:Pixel.getPixel(4)
                        }}>
                            <Text allowFontScaling={false} style={{
                                textAlign: 'center', fontSize: Pixel.getPixel(14),
                                marginTop: Pixel.getPixel(11), color: fontAndColor.COLORA1
                            }}>
                                {'请确认运单信息，支付后若要取消订单，请联系物流，且取消运单可能会产生其他费用'}
                            </Text>
                            <View
                                style = {{flexDirection:'row',marginTop: Pixel.getPixel(16),}}
                            >

                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        payShow:false
                                    })
                                    this.wozaikankan()
                                }} activeOpacity={0.9} style={{
                                    width:  Pixel.getPixel(70),
                                    height: Pixel.getPixel(35),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: fontAndColor.COLORA1
                                }}>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                        color: fontAndColor.COLORA1
                                    }}>我在看看</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        payShow:false
                                    })
                                    this.buzaitixing()
                                }} activeOpacity={0.9} style={{
                                    width:  Pixel.getPixel(70),
                                    height: Pixel.getPixel(35),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: fontAndColor.COLORA1,
                                    marginLeft:Pixel.getPixel(10)
                                }}>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                        color: fontAndColor.COLORA1
                                    }}>不在提醒</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        payShow: false
                                    });
                                    this.jixuzhifu(this.willPageOrder)
                                }} activeOpacity={0.9} style={{
                                    width: Pixel.getPixel(70),
                                    height: Pixel.getPixel(35),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: fontAndColor.COLORB0,
                                    backgroundColor:fontAndColor.COLORB0,
                                    marginLeft:Pixel.getPixel(10)
                                }}>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                        color: 'white'
                                    }}>继续支付</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    ref='cancel'
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.cancelShow}

                >
                    <View
                        style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,.3)'
                        }}>
                        <View style={{
                            width: width - width / 4,
                            height: Pixel.getPixel(125),
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal:Pixel.getPixel(20),
                            borderRadius:Pixel.getPixel(4)
                        }}>
                            <Text allowFontScaling={false} style={{
                                textAlign: 'center', fontSize: Pixel.getPixel(14),
                                marginTop: Pixel.getPixel(11), color: fontAndColor.COLORA1
                            }}>
                                {'运单取消后无法找回，\n确认取消该运单？'}
                            </Text>
                            <View
                                style = {{flexDirection:'row',marginTop: Pixel.getPixel(16),}}
                            >

                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        cancelShow:false
                                    })
                                    this.cancelOrderRequset()
                                }} activeOpacity={0.9} style={{
                                    width:  Pixel.getPixel(90),
                                    height: Pixel.getPixel(35),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: fontAndColor.COLORA1
                                }}>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                        color: fontAndColor.COLORA1
                                    }}>确认取消</Text>
                                </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    cancelShow: false
                                });

                            }} activeOpacity={0.9} style={{
                                width: Pixel.getPixel(90),
                                height: Pixel.getPixel(35),
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 3,
                                borderWidth: 1,
                                borderColor: fontAndColor.COLORB0,
                                backgroundColor:fontAndColor.COLORB0,
                                marginLeft:Pixel.getPixel(20)
                            }}>
                                <Text allowFontScaling={false} style={{
                                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                    color: 'white'
                                }}>暂不取消</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {

        if(movie === '1'){
            return<View
                style={{backgroundColor:'#fff8eb', alignItems:'flex-start', paddingLeft:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(6)}}
            >
                <SaasText style={{color:'#846545', fontSize:13, fontWeight:'200'}}>在途状态下，因车辆已验收，所以不能取消运单。</SaasText>
            </View>
        }
        return (
            <TransportOrder
                data={movie}
                pay={this.payOrder}
                cancel={this.cancel}
                toOrderDetialClick={this.toOrderDetial}
                onCarClick={this.toCarDetial}
            />
        )
    }


    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height, backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
            </View>
        );
    }

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={this.state.haveMoreData ? false : true}/>)
        }
    }

    toEnd = () => {


        let currentNum = this.props.status === 3?this.orders.length-1:this.orders.length;

        if (!this.state.isRefreshing && this.totalOrders > currentNum) {
            this.currentPage++;
            this.loadData(this.currentPage)
        }

    };

    refreshingData = () => {

        this.setState({
            isRefreshing:true
        },()=>{

            this.orders = [];
            this.currentPage = 1
            this.loadData(this.currentPage);
        })

    }

    cancel= (order)=>{
        this.setState({
            cancelShow:true
        })
        this.cancelOrder = order
    }

    cancelOrderRequset =() =>{
        let params = {
            company_id: global.companyBaseID,
            trans_id:this.cancelOrder.trans_id,
        }

        this.props.showModal(true)
        request(Urls.LOGISTICS_ORDER_CANCEL, 'post', params).then((response) => {
            this.orders = [];
            this.currentPage = 1
            this.loadData(this.currentPage);

        }, (error) => {
            this.props.showModal(false)
            this.props.showToast(error.mjson.msg);

        });
    }


    wozaikankan = ()=>{
        this.setState({
            payShow:false,
        })
    }

    buzaitixing=()=>{
        StorageUtil.mSetItem(StorageKeyNames.LOGISTIC_ORDER_ALERT_SHOW, 'false');
    }
    jixuzhifu=(order)=>{

        this.props.toNextPage({
            name:'PlatformChoose',
            component:PlatformChoose,
            params:{
                order:order,
                callBack:this.callBack,
            }
        })
    }

    payOrder = (order)=>{
        this.willPageOrder = order;

        StorageUtil.mGetItem(StorageKeyNames.LOGISTIC_ORDER_ALERT_SHOW, (data)=>{
            if(data.code ==1){
                if (data.result === null){
                    this.setState({
                        payShow:true,
                    })
                }else {
                    this.jixuzhifu(order)
                }
            }
        })
    }

    toCarDetial = (order,car)=>{

        this.props.toNextPage({
            name:'LogisCarInfoScene',
            component:LogisCarInfoScene,
            params:{
                car:car,
                order:order
            }

        })

    }

    toOrderDetial = (order)=>{

        this.props.toNextPage({
            name:'NewCarriagePriceInfoScene',
            component:NewCarriagePriceInfoScene,
            params:{
                order:order
            }
        })
    }

    callBack =()=>{
        this.loadData(this.currentPage)
    }

}

export class TransportOrder extends Component{

    constructor(props){
        super(props)

        // data  对象
        // car_list:0:{item_id: 28, trans_id: 53, tms_car_id: 1036, car_name: "2013款 途观 豪华版 1.8TSI 手自一体 两驱", tms_vin: "AAAAA", …}
        //         1:{item_id: 29, trans_id: 53, tms_car_id: 1037, car_name: "2013款 途观 豪华版 1.8TSI 手自一体 两驱", tms_vin: "", …}
        // car_number:2
        // end_address:"辽宁沈阳"
        // start_address:"北京北京"
        // tms_trans_id:573
        // total_amount:"7247.00"
        // trans_code:"YD20180323100002"
        // trans_id:53
        // trans_type:1

        this.state = {
            fold:false
        }
    }

    render(){

        let cars = []


        this.props.data.car_list.map((carInfo,index)=>{
            cars.push(<CarInfo
                onClick={this.props.onCarClick}
                key={index}
                orderData={this.props.data}
                carData={carInfo}/>)
        })

        return<View style={{padding: Pixel.getPixel(15), backgroundColor: 'white', marginBottom: Pixel.getPixel(8)}}>
            <TouchableOpacity
                activeOpacity={1}
                onPress = {()=>{
                    this.props.toOrderDetialClick(this.props.data)
                }}
            >
                <View style={{flexDirection: 'row', alignItems: 'center', }}>
                    <SaasText style={{flex: 1, color: fontAndColor.COLORA1, fontSize: 14}}>运单号{this.props.data.trans_code}</SaasText>
                    <SaasText style={{ color: fontAndColor.COLORA1, fontSize:12, marginRight:Pixel.getPixel(2)}}></SaasText>
                    <Image source={require('../../../../../images/mine/celljiantou.png')}/>
                </View>
            </TouchableOpacity>


            <View style={{
                flexDirection: 'row',
                backgroundColor: '#f8f8f8',
                marginVertical: Pixel.getPixel(15),
                padding: Pixel.getPixel(25),
                justifyContent: "space-between",
                borderRadius: Pixel.getPixel(2)
            }}>

                <View style={{alignItems: 'center',}}>
                    <Image style={{
                        width: Pixel.getPixel(12),
                        height: Pixel.getPixel(12),
                        marginBottom: Pixel.getPixel(7),
                        resizeMode: 'contain'
                    }} source={require('../../../../../images/carriagePriceImage/startLocation.png')}/>
                    <SaasText style={{fontSize: 16 , width:Pixel.getPixel(65),textAlign:'center'}}>{this.props.data.start_address}</SaasText>
                </View>
                <View style={{alignItems: 'center', marginTop: Pixel.getPixel(7)}}>
                    <SaasText style={{fontSize: 13, color: fontAndColor.COLORA1}}>{this.props.data.trans_type ===1?'大板车运输':this.props.data.trans_type===2?'救援车':"代价"}</SaasText>
                    <Image style={{
                        width: Pixel.getPixel(170),
                        height: Pixel.getPixel(6),
                        resizeMode: 'contain'
                    }} source={require('../../../../../images/carriagePriceImage/direction_line.png')}/>
                </View>

                <View style={{alignItems: 'center',}}>
                    <Image style={{
                        width: Pixel.getPixel(9),
                        height: Pixel.getPixel(9),
                        marginBottom: Pixel.getPixel(7),
                        resizeMode: 'contain'
                    }} source={require('../../../../../images/carriagePriceImage/stopLocation.png')}/>
                    <SaasText style={{fontSize: 16, width:Pixel.getPixel(65), textAlign:'center'}}>{this.props.data.end_address}</SaasText>
                </View>


            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Pixel.getPixel(5)}}>
                <SaasText style={{color: fontAndColor.COLORA1, fontSize: 13, flex: 1}}>车辆共计：</SaasText>
                <SaasText style={{fontSize: 14, fontWeight: '400'}}>{this.props.data.car_number+' 台'}</SaasText>

            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: fontAndColor.COLORA4,
                borderBottomWidth: StyleSheet.hairlineWidth,
                paddingBottom: Pixel.getPixel(10)
            }}>
                <SaasText style={{color: fontAndColor.COLORA1, fontSize: 13, flex: 1}}>运费合计：</SaasText>
                <SaasText style={{fontSize: 14, color: fontAndColor.COLORB2, fontWeight: '400'}}>{this.props.data.total_amount}元</SaasText>

            </View>


            <View style={{
                backgroundColor: 'white',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent:'flex-end'
            }}>
                {
                    (this.props.data.status === 1&&this.props.data.is_verify==0)?<TouchableOpacity activeOpacity={1} onPress={() => {
                        this.props.cancel(this.props.data)
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
                            marginTop:Pixel.getPixel(5),
                        }}>
                            <Text style={{
                                color: fontAndColor.COLORA1,
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>取消</Text>
                        </View>
                    </TouchableOpacity>:null

                }

                {
                    this.props.data.status === 1?
                        <TouchableOpacity activeOpacity={1} onPress={() => {

                            if(this.props.data.is_verify ==1){
                                return;
                            }

                            this.props.pay(this.props.data)
                        }}>
                            <View style={{
                                marginTop:Pixel.getPixel(5),
                                width: Pixel.getPixel(100.5),
                                height: Pixel.getPixel(32.5),
                                backgroundColor:  fontAndColor.COLORB0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: Pixel.getPixel(2),
                                marginLeft:Pixel.getPixel(12)
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                                }}>{this.props.data.is_verify == 1?'审核中':'支付'}</Text>
                            </View>
                        </TouchableOpacity>:null

                }

            </View>
            {
                this.props.data.status===3 ||this.props.data.status === 4?

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: Pixel.getPixel(15),
                            alignItems: 'center'
                        }}>
                            <SaasText style={{fontSize: 15, flex: 1, fontWeight: '400'}}>在途车辆</SaasText>
                            <TouchableOpacity
                                onPress = {()=>{
                                    this.setState({
                                        fold:!this.state.fold
                                    })
                                }}
                                style = {{paddingLeft:Pixel.getPixel(30), paddingVertical:Pixel.getPixel(8)}}
                            >
                                <Image style={{}}
                                       source={this.state.fold?require('../../../../../images/carriagePriceImage/jiantou_upward.png'):require('../../../../../images/carriagePriceImage/jiantou_downward.png')}/>
                            </TouchableOpacity>


                        </View>
                        {
                            this.state.fold?<View>{cars}</View>:null
                        }
                    </View>
                    :null
            }

        </View>

    }


}


class CarInfo extends Component {

    constructor(props) {
        super(props)

        // this.props.carData 对象
        // car_name:"2013款 途观 豪华版 1.8TSI 手自一体 两驱"
        // item_id:28
        // logistics_data:["nodeDesc": "到达：辽宁省沈阳市","nodeTime": "2018-05-13 11:26:00","nodeMsg": "备注信息"]
        // tms_car_id1036
        // tms_vin:"AAAAA"
        // trans_id:53

    }

    componentWillReceiveProps(props) {


    }

    render() {
        return <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopWidth:StyleSheet.hairlineWidth,
            borderTopColor:fontAndColor.COLORA4,
            marginTop:Pixel.getPixel(15),
            paddingTop:Pixel.getPixel(15)
        }}>
            <View>
                <SaasText style={{fontSize: 14, color: 'black', marginBottom: Pixel.getPixel(8)}}>{this.props.carData.car_name}</SaasText>
                <SaasText style={{fontSize: 13, color: fontAndColor.COLORA1, marginBottom: Pixel.getPixel(7)}}>车架号: {this.props.carData.tms_vin!==''?this.props.carData.tms_vin:'暂无'}</SaasText>
                <SaasText style={{fontSize: 13, color: fontAndColor.COLORA1}}>{this.props.carData.logistics_data.nodeDesc +' | '+ this.timestampToTime(this.props.carData.logistics_data.nodeTime)}</SaasText>

            </View>
            <TouchableOpacity
                activeOpacity = {1}
                onPress={()=>{
                    this.props.onClick(this.props.orderData ,this.props.carData)
                }}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <SaasText style={{fontSize: 14, fontWeight: '400', color: fontAndColor.COLORB2, marginRight:Pixel.getPixel(5)}}>运输中</SaasText>
                    <Image style={{width: Pixel.getPixel(15), height: Pixel.getPixel(15)}}
                           source={require('../../../../../images/mine/celljiantou.png')}/>
                </View>
            </TouchableOpacity>

        </View>
    }


     timestampToTime(timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
}


const styles = StyleSheet.create({
    leftText: {
        color: '#000',
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        minWidth: Pixel.getPixel(100),
        maxWidth: Pixel.getPixel(150),
    },
    text: {
        color: '#ffffff',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        textAlign: 'center',
    },
    rightText: {
        color: '#000',
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        flex: 1,
        textAlign: 'right',
    },
})