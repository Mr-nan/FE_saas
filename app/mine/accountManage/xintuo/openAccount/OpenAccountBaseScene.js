/**
 * Created by dingyonggang on 2018/04/27/11.
 */

import React, {Component} from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback
} from "react-native";
import BaseComponent from "../../../../component/BaseComponent";
import NavigationBar from "../../../../component/NavigationBar";
import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";

import {request} from "../../../../utils/RequestUtil";
import * as AppUrls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";

import ProcessIndicator from './component/ProcessIndicator'
import InformationInputItem from './component/InformationInputItem'
import SaasText from "../../zheshangAccount/component/SaasText";
import MyButton from '../../../../component/MyButton'
import OpenAccountInfo from './OpenAccountInfo'
import OpenAccountUploadScene from './OpenAccountUploadScene';


let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');


export default class OpenAccountBaseScene extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            renderPlaceholderOnly: 'loading',
            isCombination: true,  /// 是否是三证合一
        }


        // 开户参数
        this.model = {
            // bank_city: null,    //	市县编码【选填】
            // bank_net_work: null,    //	开户行名称【选填】
            // bank_provice: null,    //	省份编码【选填】
            // cert_address: null,    //	营业执照所在地【选填】
            // cert_no_1: null,    //	营业执照号【选填】
            // cert_scope: null,    //	营业范围【选填】
            // cert_url: null,    //	营业执照图片【选填】
            // cert_valid: null,    //	营业执照有效期【选填】
            // community_credit_code: null,    //	社会信用证【选填】
            // community_credit_picurl: null,    //社会信用证图片【选填】
            // device_code: null,    //	设备代码【必填】
            // enter_base_id: null,    //	商户id【必填】
            // legal_cert_no: null,    //	法人身份证号码		【必填】
            is_three_certificates_joined: 2,    //	是否三证合一		【必填】1，否；2，是
            legal_cert_type: 1,    //	法人证件类型		【必填】1，身份证；2，港澳通行证；3，护照；4，台胞证
            // legal_cert_valid: null,    //	法人证件有效期【选填】
            // legal_opposite_picurl: null,    //	法人身份证反面图片地址【必填】
            // legal_picurl: null,    //	法人证件照片		【必填】
            // legal_real_name: null,    //	法人姓名		【必填】
            // office_address: null,    //	办公地址【选填】
            // organization_code: null,    //	组织机构代码【选填】
            // organization_code_picurl: null,    //	组织机构代码证图片地址【选填】
            // person_email: null,    //	联系人邮箱【选填】
            // person_mobile: null,    //	联系人手机【选填】
            // person_name: null,    //	联系人姓名【选填】
            // rate: null,    //	分润比例【选填】
            // rcv_bank_name: null,    //	开户银行网点【选填】
            // rcv_bank_no: null,    //	开户行编码【选填】
            // settle_period: null,    //	结算周期【选填】
            // tax_register_certificate: null,    //	税务登记证【选填】
            // tax_register_picurl: null,    //	税务登记证图片地址【选填】
        }
    }


    initFinish() {
        this.setState({
            renderPlaceholderOnly: 'success'
        })
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                <NavigationBar
                    leftImageShow={false}
                    leftTextShow={true}
                    leftText={""}
                    centerText={'开通车贷粮票'}
                    rightText={""}
                    leftImageCallBack={this.backPage}

                />
            </View>
        }

        return (
            <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>

                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'开通车贷粮票'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />
                <ScrollView>

                    <View style={{marginTop: Pixel.getPixel(15)}}>
                        <InformationInputItem
                            ref={'law_name'}
                            title={'法人姓名'}
                            textPlaceholder={''}
                            keyboardType={'default'}
                            onChangeText={(text)=>{
                                this.model.legal_real_name = text
                            }}
                            loading={this.state.loading_bank}
                            annotation={this.state.bankName}
                        />

                        <InformationInputItem
                            ref={'id_no'}
                            title={'身份证号码'}
                            textPlaceholder={''}
                            keyboardType={'default'}
                            onChangeText={(text)=>{
                                this.model.legal_cert_no = text
                            }}
                            loading={this.state.loading_bank}
                            annotation={this.state.bankName}
                            separator={false}
                        />

                    </View>

                    <View
                        style={{
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            paddingLeft: Pixel.getPixel(15),
                            paddingVertical: Pixel.getPixel(15),
                            marginTop: Pixel.getPixel(15),
                            alignItems: 'center'
                        }}
                    >
                        <SaasText style={{flex: 1}}>三证合一</SaasText>
                        <MyButton buttonType={MyButton.TEXTBUTTON}
                                  content={'是'}
                                  parentStyle={this.state.isCombination ? styles.parentStyle_selected : styles.parentStyle_unselected}
                                  childStyle={this.state.isCombination ? styles.childStyle_selecte : styles.childStyle_unselecte}
                                  mOnPress={() => {
                                      this.model.is_three_certificates_joined = 2;
                                      this.setState({
                                          isCombination: true,
                                      })
                                  }}/>
                        <MyButton buttonType={MyButton.TEXTBUTTON}
                                  content={'否'}
                                  parentStyle={!this.state.isCombination ? styles.parentStyle_selected : styles.parentStyle_unselected}
                                  childStyle={!this.state.isCombination ? styles.childStyle_selecte : styles.childStyle_unselecte}
                                  mOnPress={() => {
                                      this.model.is_three_certificates_joined = 1;
                                      this.setState({
                                          isCombination: false,
                                      })
                                  }}/>

                    </View>

                    <View style={{marginTop: Pixel.getPixel(15)}}>

                        {
                            this.state.isCombination ?
                                <View>
                                    <InformationInputItem
                                        ref={'unification'}
                                        title={'社会统一编码'}
                                        textPlaceholder={''}
                                        keyboardType={'default'}
                                        onChangeText={(text)=>{
                                            this.model.community_credit_code = text
                                        }}
                                        loading={this.state.loading_bank}
                                        annotation={this.state.bankName}
                                        separator={false}
                                    />
                                </View>

                                : <View>
                                    <InformationInputItem
                                        ref={'organization'}
                                        title={'组织机构代码'}
                                        textPlaceholder={''}
                                        keyboardType={'default'}
                                        onChangeText={(text)=>{
                                            this.model.organization_code = text
                                        }}

                                        annotation={this.state.bankName}

                                    />
                                    <InformationInputItem
                                        ref={'license'}
                                        title={'营业执照代码'}
                                        textPlaceholder={''}
                                        keyboardType={'default'}
                                        onChangeText={(text)=>{
                                            this.model.cert_no_1 = text
                                        }}
                                        loading={this.state.loading_bank}
                                        annotation={this.state.bankName}

                                    />
                                    <InformationInputItem
                                        ref={'tex'}
                                        title={'税务登记证号码'}
                                        textPlaceholder={''}
                                        keyboardType={'default'}
                                        onChangeText={(text)=>{
                                            this.model.tax_register_certificate = text
                                        }}
                                        loading={this.state.loading_bank}
                                        annotation={this.state.bankName}
                                        separator={false}
                                    />


                                </View>


                        }


                    </View>

                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'下一步'}
                        parentStyle={styles.next_parentStyle}
                        childStyle={styles.next_childStyle}
                        mOnPress={() => {
                            if (this.verify()) {
                                this.toNextPage({
                                    name: OpenAccountUploadScene,
                                    component: OpenAccountUploadScene,
                                    params: {model: this.model,showModal:this.props.showModal,callBack:this.props.callBack}
                                })
                            }

                        }}/>

                </ScrollView>

            </View>

        )
    }


    verify = () => {

        let t = typeof this.model.legal_real_name;

        if ( this.model.legal_real_name === null||  this.model.legal_real_name.length <= 0) {
            this.props.showToast('请输入法人姓名');
            return false;
        } else if (  this.model.legal_cert_no == null||this.model.legal_cert_no.length <= 0) {
            this.props.showToast('请输入身份证号')
            return false;
        } else if (this.model.legal_cert_no.length != 18) {
            this.props.showToast('身份证号有误')
            return false;
        }

        if (this.model.is_three_certificates_joined == 1) {  // 三证

            if ( this.model.organization_code == null ||this.model.organization_code.length <= 0) {
                this.props.showToast('请输入组织机构代码');
                return false;
            }
            if ( this.model.cert_no_1 == null|| this.model.cert_no_1.length <= 0) {
                this.props.showToast('请输入营业执照号');
                return false;
            }
            if ( this.model.tax_register_certificate == null|| this.model.tax_register_certificate.length <= 0) {
                this.props.showToast('请输入税务登记证号码');
                return false;
            }

        } else {  // 一证
            if ( this.model.community_credit_code == null|| this.model.community_credit_code.length <= 0) {
                this.props.showToast('请输入社会统一编码');
                return false;
            }
        }
        return true;
    }

}


const styles = StyleSheet.create({

    parentStyle_selected: {
        borderWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORB0,
        marginRight: Pixel.getPixel(15),
        borderRadius: 2
    },
    childStyle_selecte: {
        color: FontAndColor.COLORB0,
        fontSize: 14,
        marginHorizontal: Pixel.getPixel(25),
        marginVertical: Pixel.getPixel(5)
    },

    parentStyle_unselected: {
        marginRight: Pixel.getPixel(15),
        borderWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA1,
        borderRadius: 2
    },
    childStyle_unselecte: {
        color: FontAndColor.COLORA1,
        fontSize: 14,
        marginHorizontal: Pixel.getPixel(25),
        marginVertical: Pixel.getPixel(5)
    },

    next_parentStyle: {
        backgroundColor: FontAndColor.COLORB0,
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
