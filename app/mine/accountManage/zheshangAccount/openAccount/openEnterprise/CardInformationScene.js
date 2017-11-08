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
import StorageUtil from "../../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../../constant/storageKeyNames";
import TextInputItem from '../../component/TextInputItem'

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

export default class CardInformationScene extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
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
                        centerText={'企业开户'}
                        rightText={""}
                    />
                </View>
            </TouchableWithoutFeedback>);
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"企业开户"}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />
                <View style = {{width:width, marginTop:15, }}>

                    <TextInputItem
                        ref={'bank_no'}
                        title={'银行卡'}
                        textPlaceholder={'请输入企业银行卡号'}
                        keyboardType={'number-pad'}
                    />
                    <TextInputItem
                        ref={'bank_name'}
                        title={'开户行'}
                        textPlaceholder={'请输入开户行支行信息'}
                    />
                    <TextInputItem
                        ref={'mobile_no'}
                        title = {'手机号'}
                        textPlaceholder={'请输入经办人手机号'}
                        maxLength={11}
                        keyboardType={'number-pad'}
                        rightButton={true}
                    />
                    <TextInputItem
                        ref={'sms_code'}
                        title={'验证码'}
                        textPlaceholder={'请输入短信验证码'}
                        keyboardType={'number-pad'}
                    />
                </View>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'下一步'}
                          parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle}
                          mOnPress={this.next}/>
            </View>
        );
    }
    // 开户
    next = () => {

        if(!this.verify(true)) {return};


        this.props.showModal(true)

        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code === 1) {
                let result = JSON.parse(data.result)

                let params = {
                    enter_base_id: result.company_base_id,
                    from_bank_id: 123456789,
                    mobile_no: mobile_no,
                    sub_acct_no: this.props.account.sub_acc_no,
                    type: 0,
                    acct_name:this.props.account.sub_acc_name,
                    acct_no:bank_no,
                    acct_type:2,
                    big_bank_no:'12345',
                    cert_no:this.props.account.cert_no,
                    cert_type:1,
                    sms_code:'123456',
                    sms_no:'52344234',
                    sub_acct_name:this.props.account.sub_acc_name,
                    user_type:2,
                    cust_name:this.props.account.sub_acc_name,
                    bank_name:'招商银行'
                }

                request(AppUrls.ZS_GENERATE_E_ACCOUNT, 'POST', params).then((response)=>{

                    this.props.showModal(false)


                    this.toNextPage({
                        component:ResultIndicativeScene,
                        name:'ResultIndicativeScene',
                        params:{
                            type:0,
                            status:1,
                            account:params
                        }
                    })
                    console.log(response);

                }, (error)=>{

                    if(error.mycode==='100001'){  // 存疑

                        this.toNextPage({
                            component:ResultIndicativeScene,
                            name:'ResultIndicativeScene',
                            params:{
                                type:0,
                                status:0,
                                account:params
                            }
                        })

                    }else {
                        this.props.showModal(false)
                        this.props.showToast(error.msg)
                    }
                })



            }
        })


    }

    //获取短信验证码
    smscode = () => {

        if(!this.verify(false)) { return}

        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code === 1) {

                let result = JSON.parse(data.result)
                let params = {
                    enter_base_id: result.company_base_id,
                    from_bank_id: 123456789,
                    mobile_no: mobile_no,
                    sub_acct_no: this.props.account.sub_acc_no,
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

        bank_no = this.refs.bank_no.getInputTextValue();
        bank_name = this.refs.bank_name.getInputTextValue();
        mobile_no = this.refs.mobile_no.getInputTextValue();
        sms_code = this.refs.sms_code.getInputTextValue();

        if (bank_no === '' || bank_no === null) {
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

