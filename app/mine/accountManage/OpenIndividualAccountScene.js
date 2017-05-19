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
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
import * as Urls from '../../constant/appUrls';
export  default class OpenIndividualAccountScene extends BaseComponent {

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
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={5}>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="name"
                            textPlaceholder={'请输入真实姓名'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="number"
                            textPlaceholder={'请输入身份证号码'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}/>
                    </View>
                </KeyboardAvoidingView>

                <Text style={{color: fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                marginTop:Pixel.getPixel(20),marginLeft:Pixel.getPixel(15)}}>
                    请确认您的姓名与身份证信息填写准确
                </Text>

                <TouchableOpacity onPress={()=>{
                    this.checkEmpty();
                }} activeOpacity={0.8} style={{backgroundColor:fontAndColor.COLORB0,marginTop:Pixel.getPixel(15),
                width:width-Pixel.getPixel(30),marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(15),
                height:Pixel.getPixel(44),justifyContent:'center',alignItems: 'center'}}>
                    <Text style={{color:'#fff',fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)}}>确认开通</Text>
                </TouchableOpacity>
                <NavigationView
                    title="开通个人账户"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    checkEmpty = () => {
        let name = this.refs.name.getInputTextValue();
        let number = this.refs.number.getInputTextValue();
        if (name == '') {
            this.props.showToast('请输入真实姓名');
        } else if (number == '') {
            this.props.showToast('请输入身份证号码');
        }
        StorageUtil.mGetItem(StorageKeyNames.PHONE, (data) => {
            if (data.code == 1 && data.result != null) {
                this.getBase_Id(name, number, data.result);

            } else {
                this.props.showToast('用户信息查询失败');
            }
        })
    }

    getBase_Id = (name, number, phone) => {
        StorageUtil.mGetItem(StorageKeyNames.ENTERPRISE_LIST, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas=JSON.parse(data.result);
                this.openIndividual(name,number,phone,datas[0].enterprise_uid);
            } else {
                this.props.showToast('用户信息查询失败');
            }
        })
    }

    openIndividual = (name, number, phone,base_id) => {
        this.props.showModal(true);
        let maps = {
            cert_no: number,
            cert_type: '1',
            cust_name: name,
            mobile_no: phone,
            enter_base_id:base_id
        };
        request(Urls.USER_OPEN_ACCOUNT_PERSONAL, 'Post', maps)
            .then((response) => {
                    this.props.showModal(false);
                    this.props.showToast('开户成功');
                    this.props.callBack();
                    let navigator = this.props.navigator;
                    if (navigator){
                        for(let i = 0;i<navigator.getCurrentRoutes().length;i++){
                            if(navigator.getCurrentRoutes()[i].name=='MainPage'){
                                navigator.popToRoute(navigator.getCurrentRoutes()[i]);
                                break;
                            }
                        }
                    }
                },
                (error) => {
                    this.props.showModal(false);
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast('开户失败');
                    } else {
                        this.props.showToast(error.mjson.msg);
                    }
                });
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="开通个人账户"
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
    }
});