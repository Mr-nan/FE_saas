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
    InteractionManager,
    KeyboardAvoidingView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import LoginInputText from "../../login/component/LoginInputText";
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import SelectNumberType from './component/SelectNumberType';
import SelectTypeScene from './SelectTypeScene';
export  default class OpenEnterpriseAccountScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
        };
    }

    initFinish = () => {
        this.setState({
            renderPlaceholderOnly: 'success',
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={5}>
                        <View style={styles.inputTextsStyle}>
                            <LoginInputText
                                ref="cust_name"
                                textPlaceholder={'请输入公司名称'}
                                viewStytle={styles.itemStyel}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                import={false}
                                clearValue={true}
                                rightIcon={false}/>
                            <SelectNumberType ref="cert_type" callBack={()=>{
                            this.toNextPage({name:'SelectTypeScene',component:SelectTypeScene,params:{regShowData:['营业执照号'
                            ,'社会信用代码'],callBack:(name,value)=>{
                                this.refs.cert_type.setValue(name,value);
                            }}});
                       }}/>
                            <LoginInputText
                                ref="cert_no"
                                textPlaceholder={'请输入企业证件号'}
                                viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                import={false}
                                clearValue={true}
                                rightIcon={false}/>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.inputTextLine}/>
                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={5}>
                        <View style={styles.inputStyle}>
                            <LoginInputText
                                ref="legal_real_name"
                                textPlaceholder={'请输入法人姓名'}
                                viewStytle={styles.itemStyel}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                import={false}
                                clearValue={true}
                                rightIcon={false}/>
                            <LoginInputText
                                ref="legal_cert_no"
                                textPlaceholder={'请输入法人身份证号'}
                                viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                import={false}
                                clearValue={true}
                                rightIcon={false}/>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.inputTextLine}/>

                    <View style={styles.inputStyle}>
                        <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={5}>
                            <LoginInputText
                                ref="org_agent_name"
                                textPlaceholder={'请输入经办人姓名'}
                                viewStytle={styles.itemStyel}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                import={false}
                                clearValue={true}
                                rightIcon={false}/>
                            <LoginInputText
                                ref="org_agent_cert_no"
                                textPlaceholder={'请输入经办人身份证号'}
                                viewStytle={styles.itemStyel}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                import={false}
                                clearValue={true}
                                rightIcon={false}/>
                            <LoginInputText
                                ref="org_agent_mobile"
                                textPlaceholder={'请输入经办人手机号'}
                                viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                import={false}
                                clearValue={true}
                                rightIcon={false}/>
                        </KeyboardAvoidingView>
                    </View>


                    <Text style={{color: fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                marginTop:Pixel.getPixel(20),marginLeft:Pixel.getPixel(15)}}>
                        请确认您的企业信息填写准确
                    </Text>

                    <TouchableOpacity onPress={()=>{
                        this.checkEmpty();
                }} activeOpacity={0.8} style={{backgroundColor:fontAndColor.COLORB0,marginTop:Pixel.getPixel(15),
                width:width-Pixel.getPixel(30),marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(15),
                height:Pixel.getPixel(44),justifyContent:'center',alignItems: 'center'}}>
                        <Text style={{color:'#fff',fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)}}>确认开通</Text>
                    </TouchableOpacity>
                    <NavigationView
                        title="开通企业账户"
                        backIconClick={this.backPage}
                    />
                </ScrollView>
            </View>
        );
    }

    checkEmpty = () => {
        let cert_no = this.refs.cert_no.getInputTextValue();
        let cert_type = this.refs.cert_type.getNumber();
        let cust_name = this.refs.cust_name.getInputTextValue();
        let legal_cert_no = this.refs.legal_cert_no.getInputTextValue();
        let legal_real_name = this.refs.legal_cert_type.getInputTextValue();
        let org_agent_name = this.refs.org_agent_name.getInputTextValue();
        let org_agent_cert_no = this.refs.org_agent_cert_no.getInputTextValue();
        let org_agent_mobile = this.refs.org_agent_mobile.getInputTextValue();
        if(cert_no==''){
            this.props.showToast('请输入企业证件号');
            return;
        }else if(cert_type==''){
            this.props.showToast('请选择企业证件类型');
            return;
        }else if(cust_name==''){
            this.props.showToast('请输入企业名称');
            return;
        }else if(legal_cert_no==''){
            this.props.showToast('请输入法人证件号');
            return;
        }else if(legal_real_name==''){
            this.props.showToast('请输入法人姓名');
            return;
        }else if(org_agent_name==''){
            this.props.showToast('请输入经办人姓名');
            return;
        }else if(org_agent_cert_no==''){
            this.props.showToast('请输入经办人证件号');
            return;
        }else if(org_agent_mobile==''){
            this.props.showToast('请输入经办人手机号');
            return;
        }else{

        }
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="开通企业账户"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    buttonStyle: {
        marginTop: Pixel.getPixel(10),
        marginBottom: Pixel.getPixel(10),
        marginLeft: Pixel.getPixel(10),
    },
    itemStyel: {},
    inputTextsStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        marginTop: Pixel.getTitlePixel(79)
    },
    inputTextStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
    },
    inputTextLine: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),
        width: width,
    },
    imageButtonsStyle: {
        width: width,
        height: Pixel.getPixel(88),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),

    },
    imageButtonStyle: {
        width: Pixel.getPixel(80),
        height: Pixel.getPixel(60),
        resizeMode: 'contain'
    },
    imageClearButtonStyle: {
        width: Pixel.getPixel(17),
        height: Pixel.getPixel(17),
    },
    imagebuttonok: {
        width: width,
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(130),
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        paddingTop: Pixel.getPixel(25)
    },
    inputStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    }
});