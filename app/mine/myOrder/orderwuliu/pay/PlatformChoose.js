
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
import PixelUtil from '../../../../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationBar from '../../../../component/NavigationBar';
import * as fontAndColor from '../../../../constant/fontAndColor';
import BaseComponent from '../../../../component/BaseComponent';
import * as Net from '../../../../utils/RequestUtil';
import * as AppUrls from '../../../../constant/appUrls';
import SaasText from "../../../accountManage/zheshangAccount/component/SaasText";
import MyButton from '../../../../component/MyButton'
import AccountWebScene from "../../../accountManage/AccountWebScene";
import * as webBackUrl from "../../../../constant/webBackUrl";

export  default  class  PlatformChoose extends BaseComponent{


    constructor(props){
        super(props)

        this.state = {
            pay_way:1,  //1：平台支付， 2：转账支付
        }

    }


    render(){
        return(
            <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'请您支付'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />

                <ScrollView>


                <View style={{
                    backgroundColor:'white',
                    justifyContent:'center',
                    alignItems:'center',
                    paddingVertical:Pixel.getPixel(30)
                }}>
                    <SaasText style={{fontSize:15, fontWeight:'200', marginBottom:Pixel.getPixel(4)}}>支付金额</SaasText>
                    <SaasText style={{fontSize:25,}}>{this.props.order.total_amount + '元'}</SaasText>

                </View>

                <View style={{paddingVertical: Pixel.getPixel(8)}}>
                    <SaasText style={{
                        marginLeft: Pixel.getPixel(15),
                        fontSize: 12,
                        color: fontAndColor.COLORA1
                    }}>支付方式</SaasText>
                </View>

                <View
                    style={{
                        backgroundColor:'white',

                        paddingHorizontal:Pixel.getPixel(15),
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({
                                pay_way:1
                            })
                        }}
                    >
                        <View
                            style={{
                                backgroundColor:'white',
                                flexDirection:'row',
                                alignItems:'center',
                                borderBottomWidth:StyleSheet.hairlineWidth,
                                borderBottomColor:fontAndColor.COLORA4,
                                paddingVertical:Pixel.getPixel(15)
                            }}
                        >

                            <Image source={require('../../../../../images/carriagePriceImage/platform_pay.png')}/>
                            <SaasText style={{fontSize:14, fontWeight:'200', flex:1, marginLeft:Pixel.getPixel(5)}}>平台账户支付</SaasText>
                            {this.state.pay_way === 1?
                                <Image style={{width: Pixel.getPixel(15), height: Pixel.getPixel(15)}}
                                       source={require('../../../../../images/checked.png')}/>
                                :null}


                        </View>
                    </TouchableOpacity>
                    {/*<TouchableOpacity*/}
                        {/*onPress={()=>{*/}
                            {/*this.setState({*/}
                                {/*pay_way:2*/}
                            {/*})*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<View*/}
                            {/*style={{*/}
                                {/*backgroundColor:'white',*/}
                                {/*flexDirection:'row',*/}
                                {/*alignItems:'center',*/}
                                {/*paddingVertical:Pixel.getPixel(15)*/}
                            {/*}}*/}
                        {/*>*/}

                            {/*<Image source={require('../../../../../images/carriagePriceImage/transfer_pay.png')}/>*/}
                            {/*<SaasText style={{fontSize:14, fontWeight:'200', flex:1, marginLeft:Pixel.getPixel(5)}}>转账支付</SaasText>*/}
                            {/*{this.state.pay_way === 2?*/}
                                {/*<Image style={{width: Pixel.getPixel(15), height: Pixel.getPixel(15)}}*/}
                                       {/*source={require('../../../../../images/checked.png')}/>*/}
                                {/*:null}*/}


                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}

                </View>


                <MyButton
                    buttonType={MyButton.TEXTBUTTON}
                    content={'去支付'}
                    parentStyle={styles.next_parentStyle}
                    childStyle={styles.next_childStyle}
                    mOnPress={() => {
                        this.pay()
                    }}/>
                </ScrollView>

            </View>)
    }

    pay = ()=>{
        let params = {
            company_id: global.companyBaseID,
            trans_id:this.props.order.trans_id,
            reback_url:webBackUrl.PAY
        }

        this.props.showModal(true)
        Net.request(AppUrls.LOGISTICS_ORDER_PAY, 'post', params).then((response) => {
            this.props.showModal(false)
            if(response.mjson.code === 1){

                this.trans_serial_no = response.mjson.data.trans_serial_no

                this.toNextPage({
                    name: 'AccountWebScene',
                    component: AccountWebScene,
                    params: {
                        title: '支付',
                        webUrl: response.mjson.data.url,
                        callBack: () => {
                            this.checkFullPay()
                        },// 这个callBack就是点击webview容器页面的返回按钮后"收银台"执行的动作
                        backUrl: webBackUrl.PAY
                    }
                });

            }


        }, (error) => {
            this.props.showModal(false)
            this.props.showToast(error.mjson.msg);

        });
    }

    checkFullPay = ()=>{

        let params = {
            company_id: global.companyBaseID,
            trans_id:this.props.order.trans_id,
            trans_serial_no:this.trans_serial_no
        }

        this.props.showModal(true)
        Net.request(AppUrls.LOGISTICS_ORDER_PAY_CALLBACK, 'post', params).then((response) => {
            this.props.showModal(false)
            if(response.mjson.code === 1){
                this.backPage()
            }
        }, (error) => {
            this.props.showModal(false)
            this.props.showToast(error.mjson.msg);

        });


    }

}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
    },
    next_parentStyle: {
        backgroundColor: fontAndColor.COLORB0,
        marginHorizontal: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Pixel.getPixel(53),
        borderRadius: 2
    },

    next_childStyle: {
        fontSize: 16,
        color: 'white',
        marginVertical: Pixel.getPixel(15)
    }

})