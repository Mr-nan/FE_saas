/**
 * Created by dingyonggang on 2017/10/27.
 */
import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback
} from "react-native";
import BaseComponent from "../../../../../component/BaseComponent";
import NavigationBar from "../../../../../component/NavigationBar";
import * as FontAndColor from "../../../../../constant/fontAndColor";
import PixelUtil from "../../../../../utils/PixelUtil";
import MyButton from "../../../../../component/MyButton";
import {request} from "../../../../../utils/RequestUtil";
import * as AppUrls from "../../../../../constant/appUrls";
import md5 from "react-native-md5";
import StorageUtil from "../../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../../constant/storageKeyNames";
import TextInputItem from '../../component/TextInputItem'
import ResultIndicativeScene from '../../ResultIndicativeScene'
import ChooseBankNameScene from '../../component/ChooseBankNameScene'

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

let bank_card_no = ''
let bank_no = ''
let bank_name = ''
let mobile_no = ''
let sms_code = ''

let type = -1;
//  1：企业
//  2：个人


export default class CardPhoneSmsScene extends BaseComponent {
    constructor(props) {
        super(props);

        type = props.account.type;

        this.state = {
            renderPlaceholderOnly: true,
            loading_bank:false,
            bankName:''  // 总行名
        }
    }


    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return ( <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={type===1?'企业开户':'个人开户'}
                        rightText={""}
                    />
                </View>
            </TouchableWithoutFeedback>);
        }
        return (

            <TouchableWithoutFeedback
                onPress={() => {
                    this.dismissKeyboard()
                }}
            >

                <View style={styles.container}>
                    <NavigationBar
                        leftImageShow={true}
                        leftTextShow={false}
                        centerText={type===1?'企业开户':'个人开户'}
                        rightText={""}
                        leftImageCallBack={this.backPage}
                    />
                    <View style={{width: width, marginTop: 15,}} >

                        <TextInputItem
                            ref={'bank_card_no'}
                            title={'银行卡'}
                            textPlaceholder={type === 1?'请输入企业银行卡号':'请输入您的银行卡号'}
                            keyboardType={'number-pad'}
                            value={'6223093310090136493'}
                            onChangeText={this.bank}
                            loading={this.state.loading_bank}
                            annotation={this.state.bankName}
                        />
                        <TouchableOpacity
                            onPress = {()=>{

                                if(this.state.bankName === ''){  //如果没有解锁出总行名，不允许选择支行名
                                    this.props.showToast('请填写银行卡')
                                    return;
                                }
                                this.toNextPage({
                                    component:ChooseBankNameScene,
                                    name:'ChooseBankNameScene',
                                    params:{
                                        callBack:this.bankComeBack,
                                        bank_card_no:this.refs.bank_card_no.getInputTextValue()},
                                })
                            }}
                        >
                            <TextInputItem
                                ref={'bank_name'}
                                title={'开户行'}
                                textPlaceholder={'请输入开户行支行信息'}
                                rightIcon={true}
                                editable={false}
                            />
                        </TouchableOpacity>

                        <TextInputItem
                            ref={'mobile_no'}
                            title={'手机号'}
                            textPlaceholder={type===1?'请输入经办人手机号':'请输入手机号'}
                            rightButton={true}
                            callBackSms={this.smscode}
                            maxLength={11}
                            keyboardType={'number-pad'}
                            value={'15701239874'}
                        />
                        <TextInputItem
                            ref={'sms_code'}
                            title={'验证码'}
                            separator={false}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <MyButton buttonType={MyButton.TEXTBUTTON}
                              content={'下一步'}
                              parentStyle={styles.buttonStyle}
                              childStyle={styles.buttonTextStyle}
                              mOnPress={this.next}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }


    bankComeBack = (bank)=>{
        bank_no = bank.bankno;
       this.refs.bank_name.setInputTextValue(bank.bankname)
    }

    // 通过银行卡号调后台接口，解索发卡行
    bank = (text)=>{

        if (text.length<10 && this.state.bankName!==''){
            this.setState({
                bankName:''
            })
            return;
        }

        if(text.length>=10 &&this.state.bankName===''){

            let params = {
                bankCardNo:text,
                page:1,
                rows:20,
            }


            this.setState({
                loading_bank:true,
            })
            request(AppUrls.ZS_PARSE_BANK, 'POST', params).then((response)=>{

                if(response.mjson.data.info_list !== null&&response.mjson.data.info_list.length>0){
                    this.setState({
                        bankName:response.mjson.data.info_list[0].subbankname,
                    })
                }

                console.log(response);

                this.setState({
                    loading_bank:false,
                })
            }, (error)=>{
                this.setState({
                    loading_bank:false,
                })
            })
        }


    }


    // 开户
    next = () => {

        if(!this.verify(true)) {return};


        this.props.showModal(true)

        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code === 1) {
                let result = JSON.parse(data.result)

                let device_code = '';

                if (Platform.OS === 'android') {
                    device_code = 'dycd_platform_android';
                } else {
                    device_code = 'dycd_platform_ios';
                }
                let params = {
                    device_code:device_code,
                    enter_base_id: result.company_base_id,
                    from_bank_id: 123456789,
                    mobile_no: mobile_no,
                    sub_acct_no: this.props.account.card_no,
                    sub_acct_name:this.props.account.cust_name,
                    type: 0,
                    acct_name:this.props.account.cust_name,
                    acct_no:bank_card_no,
                    acct_type:type,
                    bank_no:bank_no,
                    cert_no:this.props.account.cert_no,
                    cert_type:1,
                    sms_code:'123456',
                    sms_no:'52344234',
                    user_type:type,
                    bank_name:bank_name
                }

                request(AppUrls.ZS_OPEN_ACCOUNT, 'POST', params).then((response)=>{

                    this.props.showModal(false)

                    this.toNextPage({
                        component:ResultIndicativeScene,
                        name:'ResultIndicativeScene',
                        params:{
                            type:type === 1?1:0,
                            status:1,
                            account:params,
                            append:this.state.bankName,
                        }
                    })
                    console.log(response);

                }, (error)=>{

                    this.props.showModal(false)

                    if(error.mycode===8010007){  // 存疑

                        this.toNextPage({
                            component:ResultIndicativeScene,
                            name:'ResultIndicativeScene',
                            params:{
                                type:type === 1?1:0,
                                status:0,
                                account:params
                            }
                        })
                    }else {
                        this.props.showToast(error.msg)
                    }
                })



            }
        })


    }

    //获取短信验证码
    smscode = () => {

        if(!this.verify(false)) { return};

        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code === 1) {

                let result = JSON.parse(data.result)
                let params = {
                    enter_base_id: result.company_base_id,
                    from_bank_id: bank_no,
                    mobile_no: mobile_no,
                    sub_acct_no: this.props.account.card_no,
                    type: 0
                }

                request(AppUrls.ZS_SEND_SMS_CODE, 'POST', params).then((response) => {
                        this.refs.mobile_no.StartCountDown();
                        console.log(response);

                }, (error) => {
                    this.props.showModal(false)
                    this.props.showToast(error.msg)
                })

            } else {
                this.props.showToast('获取信息失败')
            }
        })

    }

    verify = (with_sms_code) => {

        bank_card_no = this.refs.bank_card_no.getInputTextValue();
        bank_name = this.refs.bank_name.getInputTextValue();
        mobile_no = this.refs.mobile_no.getInputTextValue();
        sms_code = this.refs.sms_code.getInputTextValue();

        if (bank_card_no === '' || bank_card_no === null) {
            this.props.showToast('请输入银行卡号');
            return false
        }
        if (bank_name === '' || bank_name === null) {
            this.props.showToast('请输入开户行名称');
            return false
        }
        if (mobile_no === '' || mobile_no === null) {
            this.props.showToast('请输入手机号码');
            return false
        }
        if (mobile_no.length !== 11) {
            this.props.showToast('手机号格式有误');
            return false
        }

        if (with_sms_code) {
            if (sms_code === '' || sms_code === null) {
                this.props.showToast('请输入验证码');
                return false
            }
        }

        return true
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
    },
    buttonStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginVertical: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
    },
    buttonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
    itemStyel: {
        backgroundColor: "#ffffff",
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
});

