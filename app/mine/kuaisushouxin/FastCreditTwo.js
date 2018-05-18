/**
 * Created by yujinzhong on 2018/1/2.
 */
import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    InteractionManager,
    KeyboardAvoidingView,
    TouchableOpacity,
    NativeModules,
    NativeAppEventEmitter,
} from "react-native";
import BaseComponent from "../../component/BaseComponent";
import * as FontAndColor from "../../constant/fontAndColor";
import LoginInputTextYU  from "../../login/component/LoginInputTextYU"
import MyButton from "../../component/MyButton";
import CarUpImageCellYU from '../../../app/carSource/znComponent/CarUpImageCellYU';
import ImagePicker from "react-native-image-picker";
import ImageSource from "../../publish/component/ImageSource";
import {request} from "../../utils/RequestUtil";
import * as ImageUpload from "../../utils/ImageUpload";


import AllNavigationView from "../../component/AllNavigationView";
import PixelUtil from "../../utils/PixelUtil";

import * as AppUrls from "../../constant/appUrls";
import * as storageKeyNames from "../../constant/storageKeyNames";
import StorageUtil from "../../utils/StorageUtil";
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();

let uid: '';

const dismissKeyboard = require('dismissKeyboard');

var Platform = require('Platform');
const IS_ANDROID = Platform.OS === 'android';

let idcardfront;
let idcardback;
let businessid;


//===============================相机参数设置================================
const options = {
    //弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: false,
    noData: false,
    quality: 1.0,
    maxWidth: 480,
    maxHeight: 800,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
};
export default class FastCreditTwo extends BaseComponent {
    /*
     * 为了延迟调用
     * */
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
	    idcardfront = '';
	    idcardback = '';
	    businessid = '';
    }

    constructor(props) {
        super(props);
        this.results = [];
	    idcardfront = '';
	    idcardback = '';
	    businessid = '';
        this.data = '';
        this.state = {
            selectNO: 'no',//yes 代表同步  no 不同步
            businessLicense: null,
            enterpriseFront: null,
            enterpriseBack: null,
            renderPlaceholderOnly: 'blank',
            keyboardOffset: -Pixel.getPixel(0),
            boss_tel: '',//实际控制人电话
            boss_name: '',//实际控制人姓名
            boss_idcard: '',//实际控制人身份证
            isFinish:false,
        }

        this.id;
        this.timer = null;
        this.legalInfo = {//法人信息
            legal_tel: '',
            legal_name: '',
            legal_idcard: '',
        }

       this.isFinish = false;
    }

    initFinish() {
        this.setState({renderPlaceholderOnly: 'loading'});

        this._ShiJiKongZhiRenInfo();

    }

    _ShiJiKongZhiRenInfo = () => {
        StorageUtil.mGetItem(storageKeyNames.USER_INFO, (childdata) => {
            if (childdata.code == 1) {

                let childdatas = JSON.parse(childdata.result);
	            this.boss_id = childdatas.boss_id;
	            this.base_user_id = childdatas.base_user_id;

	            if (this.isNull( childdatas.boss_idcard))//没有获取到身份证号码
	            {
		            if (Platform.OS === 'android') {
			            device_code = 'dycd_platform_android';
		            } else {
			            device_code = 'dycd_platform_ios';
		            }
		            let maps = {
			            device_code: device_code,
		            };
		            request(AppUrls.USER_GETINFO, 'Post', maps)
			            .then((response) => {
				            this.idcard_number = response.mjson.data.idcard_number;
				            // this.refs.controllerID.setInputTextValue(this.idcard_number);

				            this.setState(
					            {
						            renderPlaceholderOnly: 'success',
						            boss_idcard: this.idcard_number,
						            boss_name: childdatas.boss_name,
						            boss_tel: childdatas.boss_tel,

					            })

			            }, (error) => {
				            this.props.showToast(error.mjson.msg + "");
			            });

	            }
	            else {

		            this.setState(
			            {
				            renderPlaceholderOnly: 'success',
				            boss_idcard: childdatas.boss_idcard,
				            boss_name: childdatas.boss_name,
				            boss_tel: childdatas.boss_tel,

			            })

                }


            }
            else {

                this.setState({renderPlaceholderOnly: 'error'});
            }
        });
        // StorageUtil.mGetItem(storageKeyNames.USER_INFO, (childdata) => {
        //     if (childdata.code == 1) {
        //         let childdatas = JSON.parse(childdata.result);
        //         this.boss_id = childdatas.boss_id;
        //         this.base_user_id = childdatas.base_user_id;
        //
        //     } else {
        //         this.setState({renderPlaceholderOnly: 'error'});
        //     }
        // });

    }

    render() {

        if (this.state.renderPlaceholderOnly !== 'success') {
            return (<View style={{backgroundColor: 'white', flex: 1}}>
                {this.loadView()}
                <AllNavigationView
                    backIconClick={this.backPage}
                    title={'小额授信申请'}
                />
            </View>)
        }

        else {

            return (
                <View style={styles.container}>
                    {
                        IS_ANDROID ? (this.loadScrollView()) : (
                            <KeyboardAvoidingView behavior={'position'}
                                                  keyboardVerticalOffset={this.state.keyboardOffset}>
                                {
                                    this.loadScrollView()
                                }
                            </KeyboardAvoidingView>
                        )
                    }
                    <ImageSource

                        galleryClick={this._photoClick}
                        cameraClick={this._cameraClick}
                        ref={(modal) => {
                            this.imageSource = modal
                        }}/>
                    <AllNavigationView
                        backIconClick={this.backPage}
                        title={'小额授信申请'}
                    />
                </View>
            );
        }
    }

    /*
     * 主界面
     * */
    loadScrollView = () => {
        return (
            <ScrollView keyboardShouldPersistTaps={'handled'} style={{height: height - Pixel.getPixel(64)}}>

                {/*实际控制人Header*/}
                <View style={styles.inputHeader}>
                    <Text style={styles.inputHeaderText}>
                        实际控制人信息
                    </Text>
                </View>
                {/*实际控制人View*/}
                <View style={styles.inputTextsStyle}>
                    {/*实际控制人姓名*/}
                    <LoginInputTextYU
                        ref="controllerName"
                        leftText={'实际控制人姓名'}
                        textPlaceholder={'请输入'}
                        viewStytle={styles.itemStyel}
                        inputTextStyle={styles.inputTextStyle}
                        leftIcon={false}
                        import={false}
                        defaultValue={this.state.boss_name}
                        editable={false}
                        rightIcon={false}/>
                    <LoginInputTextYU
                        ref="controllerID"
                        leftText={'实际控制人身份证'}
                        textPlaceholder={'请输入'}
                        viewStytle={styles.itemStyel}
                        inputTextStyle={styles.inputTextStyle}
                        leftIcon={false}
                        import={false}
                        defaultValue={this.state.boss_idcard}
                        editable={false}
                        maxLength={18}//身份证限制18位或者15位
                        rightIcon={false}/>
                    <LoginInputTextYU
                        ref="controllerPhone"
                        leftText={'实际控制人联系方式'}
                        textPlaceholder={'请输入'}
                        viewStytle={[styles.itemStyel, {borderBottomWidth: 0,}]}
                        inputTextStyle={styles.inputTextStyle}
                        secureTextEntry={false}
                        leftIcon={false}
                        import={false}
                        defaultValue={this.state.boss_tel}
                        editable={false}
                        maxLength={11}
                        rightIcon={false}/>

                </View>
                {/*法人Header*/}
                <View style={styles.inputHeader}>
                    <Text style={styles.inputHeaderText}>
                        法人信息
                    </Text>
                </View>
                {/*法人信息同实际控制人view*/}
                <View style={[styles.itemBackground, {height: Pixel.getPixel(60)}]}>
                    <Text allowFontScaling={false} style={styles.leftFont}>法人信息同实际控制人</Text>
                    <View style={styles.fillSpace}/>
                    <TouchableOpacity
                        style={[styles.selectBtn, {borderColor: this.state.selectNO == 'yes' ? FontAndColor.COLORB0 : FontAndColor.COLORA2}]}
                        activeOpacity={0.6}
                        onPress={() => {
                            this._changdiTypePress('yes')
                        }}>
                        <Text allowFontScaling={false}
                              style={[styles.selectBtnFont, {color: this.state.selectNO == 'yes' ? FontAndColor.COLORB0 : FontAndColor.COLORA2}]}>同步</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.selectBtn, {marginRight: Pixel.getPixel(0)}, {borderColor: this.state.selectNO == 'no' ? FontAndColor.COLORB0 : FontAndColor.COLORA2}]}
                        activeOpacity={0.6}
                        onPress={() => {
                            this._changdiTypePress('no')
                        }}>
                        <Text allowFontScaling={false}
                              style={[styles.selectBtnFont, {color: this.state.selectNO == 'no' ? FontAndColor.COLORB0 : FontAndColor.COLORA2}]}>不同步</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputTextLine}/>

                <View style={styles.inputTextsStyle}>
                    {/*法人姓名*/}
                    <LoginInputTextYU
                        ref="legalPersonName"
                        leftText={'法人姓名'}
                        textPlaceholder={'请输入'}
                        viewStytle={styles.itemStyel}
                        textChangeClick={(text)=>{this.legalPersonName = text;this.verifyBtn();}}
                        inputTextStyle={styles.inputTextStyle}
                        leftIcon={false}
                        clearValue={true}
                        import={false}
                        defaultValue={this.legalInfo.legal_name}
                        rightIcon={false}/>
                    <LoginInputTextYU
                        ref="legalPersonID"
                        leftText={'法人身份证'}
                        textPlaceholder={'请输入'}
                        viewStytle={styles.itemStyel}
                        textChangeClick={(text)=>{this.legalPersonID = text;this.verifyBtn();}}
                        inputTextStyle={styles.inputTextStyle}
                        leftIcon={false}
                        clearValue={true}
                        import={false}
                        defaultValue={this.legalInfo.legal_idcard}
                        maxLength={18}//身份证限制18位或者15位
                        rightIcon={false}/>
                    <LoginInputTextYU
                        ref="legalPersonPhone"
                        leftText={'法人联系方式'}
                        textPlaceholder={'请输入'}
                        textChangeClick={(text)=>{this.legalPersonPhone = text;this.verifyBtn();}}
                        viewStytle={[styles.itemStyel, {borderBottomWidth: 0,}]}
                        inputTextStyle={styles.inputTextStyle}
                        secureTextEntry={false}
                        clearValue={true}
                        leftIcon={false}
                        import={false}
                        defaultValue={this.legalInfo.legal_tel}
                        maxLength={11}
                        rightIcon={false}/>
                </View>
                {/*上传附件Header*/}
                <View style={styles.inputHeader}>
                    <Text style={styles.inputHeaderText}>
                        上传附件
                    </Text>
                </View>
                {/*法人身份证view*/}
                <TouchableWithoutFeedback onPress={() => dismissKeyboard() }>
                    <View style={{
                        width: width, height: Pixel.getPixel(88), flexDirection: 'row', alignItems: 'center',
                        backgroundColor: '#ffffff', paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15),
                    }}>

                        <Text allowFontScaling={false} style={{
                            flex: 1,
                            color: 'black',
                            fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                        }}>
                            上传法人身份证
                        </Text>
                        <View>
                            <MyButton buttonType={MyButton.IMAGEBUTTON}
                                      content={this.state.enterpriseFront === null ?
                                          require('../../../images/login/idcard.png') : this.state.enterpriseFront
                                      }
                                      parentStyle={{
                                          marginTop: Pixel.getPixel(10),
                                          marginBottom: Pixel.getPixel(10),
                                          marginLeft: Pixel.getPixel(10),
                                      }}
                                      childStyle={{
                                          width: Pixel.getPixel(80),
                                          height: Pixel.getPixel(60),
                                          resizeMode: 'contain'
                                      }}
                                      mOnPress={() => {
                                          this.selectPhotoTapped('enterpriseFront')
                                      }}/>
                            {this.state.enterpriseFront ?
                                <MyButton buttonType={MyButton.IMAGEBUTTON}
                                          content={require('../../../images/login/clear.png')}
                                          parentStyle={{
                                              position: 'absolute',
                                              marginTop: Pixel.getPixel(2),
                                              marginLeft: Pixel.getPixel(2),
                                          }}
                                          childStyle={{width: Pixel.getPixel(17), height: Pixel.getPixel(17),}}
                                          mOnPress={() => {
                                              idcardfront = '';
                                              this.setState({
                                                  enterpriseFront: null
                                              });
                                              this.verifyBtn();
                                          }}/>
                                : null}

                        </View>
                        <View>
                            <MyButton buttonType={MyButton.IMAGEBUTTON}
                                      content={this.state.enterpriseBack === null ?
                                          require('../../../images/login/idcard_back.png') : this.state.enterpriseBack
                                      }
                                      parentStyle={{
                                          marginTop: Pixel.getPixel(10),
                                          marginBottom: Pixel.getPixel(10),
                                          marginLeft: Pixel.getPixel(10),
                                      }}
                                      childStyle={{
                                          width: Pixel.getPixel(80),
                                          height: Pixel.getPixel(60),
                                          resizeMode: 'contain'
                                      }}
                                      mOnPress={() => {
                                          this.selectPhotoTapped('enterpriseBack')
                                      }}/>
                            {this.state.enterpriseBack ?
                                <MyButton buttonType={MyButton.IMAGEBUTTON}
                                          content={require('../../../images/login/clear.png')}
                                          parentStyle={{
                                              position: 'absolute',
                                              marginTop: Pixel.getPixel(2),
                                              marginLeft: Pixel.getPixel(2),
                                          }}
                                          childStyle={{width: Pixel.getPixel(17), height: Pixel.getPixel(17),}}
                                          mOnPress={() => {
                                              idcardback = '';
                                              this.setState({
                                                  enterpriseBack: null
                                              });
                                              this.verifyBtn();
                                          }}/>
                                : null}

                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.inputTextLine}/>

                {/*营业执照view*/}
                <TouchableWithoutFeedback onPress={() => dismissKeyboard() }>
                    <View style={{
                        width: width, height: Pixel.getPixel(88), flexDirection: 'row', alignItems: 'center',
                        backgroundColor: '#ffffff', paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15),
                    }}>

                        <Text allowFontScaling={false} style={{
                            flex: 1,
                            color: 'black',
                            fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                        }}>
                            上传营业执照
                        </Text>
                        <View>
                            <MyButton buttonType={MyButton.IMAGEBUTTON}
                                      content={this.state.businessLicense === null ?
                                          require('../../../images/login/add.png') : this.state.businessLicense
                                      }
                                      parentStyle={{
                                          marginTop: Pixel.getPixel(10),
                                          marginBottom: Pixel.getPixel(10),
                                          marginLeft: Pixel.getPixel(10),
                                      }}
                                      childStyle={{
                                          width: Pixel.getPixel(80),
                                          height: Pixel.getPixel(60),
                                          resizeMode: 'contain'
                                      }}
                                      mOnPress={() => {
                                          this.selectPhotoTapped('businessLicense')
                                      }}/>
                            {this.state.businessLicense ?
                                <MyButton buttonType={MyButton.IMAGEBUTTON}
                                          content={require('../../../images/login/clear.png')}
                                          parentStyle={{
                                              position: 'absolute',
                                              marginTop: Pixel.getPixel(2),
                                              marginLeft: Pixel.getPixel(2),
                                          }}
                                          childStyle={{width: Pixel.getPixel(17), height: Pixel.getPixel(17),}}
                                          mOnPress={() => {
                                              businessid = '';
                                              this.setState({
                                                  businessLicense: null
                                              });
                                              this.verifyBtn();
                                          }}/>
                                : null}

                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.inputTextLine}/>

                {/*===============================多张照片===========================*/}
                <CarUpImageCellYU
                    results={this.results}
                    retureSaveAction={() => {//---------------回调函数，获取到上传照片成功后，对应的照片的fileid,  this.results 是个数组，保存了全部的照片
                            console.log('1111111111111111', this.results)
                            this.verifyBtn();
                    }}
                    showModal={(value) => {
                        this.props.showModal(value)
                    }}
                    showToast={(value) => {
                        this.props.showToast(value)
                    }}
                    items={{
                        "name": "ownership_sale",
                        "isShowTag": true,
                        "title": "上传场地合同",
                        "subTitle": "可上传多页",
                        "number": 12, //---------------限定上传照片的最大数量
                        "explain": 0,//-----------------0表示前面的红*不显示    1 可显示
                    }}
                    childList={[]}
                />
                {/*===============================提交按钮===========================*/}
                <View style={styles.imagebuttonok}>

                    <TouchableOpacity onPress={() => {
                        this.register();
                    }} activeOpacity={0.8} style={{
                        marginTop: Pixel.getPixel(7),
                        width: width - Pixel.getPixel(30),
                        height: Pixel.getPixel(44),
                        backgroundColor: this.state.isFinish? FontAndColor.COLORB0 :FontAndColor.COLORB5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text allowFontScaling={false} style={{
                            color: '#fff',
                            fontSize: Pixel.getPixel(FontAndColor.LITTLEFONT28)
                        }}>提交</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
    _changdiTypePress = (type) => {


        if (type == 'yes') {
            this.legalPersonName = this.state.boss_name;
            this.legalPersonID = this.state.boss_idcard;
            this.legalPersonPhone = this.state.boss_tel;
            this.refs.legalPersonName.setInputTextValue(this.state.boss_name);
            this.refs.legalPersonID.setInputTextValue(this.state.boss_idcard);
            this.refs.legalPersonPhone.setInputTextValue(this.state.boss_tel);

        } else {
            this.legalPersonName = '';
            this.legalPersonID = '';
            this.legalPersonPhone = '';

            this.refs.legalPersonName.setInputTextValue('');
            this.refs.legalPersonID.setInputTextValue('');
            this.refs.legalPersonPhone.setInputTextValue('');
        }
        this.verifyBtn();
        this.setState({
            selectNO: type
        })
    }
    isEmpty = (str) => {
        if (typeof(str) != 'undefined' && str !== '' && str !== null) {
            return false;
        } else {
            return true;
        }
    };
    //提示信息
    _showHint = (hint) => {
        this.props.showToast(hint);
    };
    /*
     * 弹出蒙版
     * */
    selectPhotoTapped = (id) => {
        this.id = id;
        this._rePhoto(id);
    }
    _rePhoto = (ID) => {
        this.imageSource.openModal(ID);
    };

    /*
     * 相机点击
     * */
    _cameraClick = (ID) => {
        this.timer = setTimeout(
            () => {
                ImagePicker.launchCamera(options, (response) => {
                    if (response.didCancel) {
                    } else if (response.error) {
                    } else if (response.customButton) {
                    } else {
                        this.uploadImage(response, this.id);
                    }
                });
            },
            200
        );


    }

    /*
     * 相册点击
     * */
    _photoClick = (ID) => {
        this.timer = setTimeout(
            () => {
                ImagePicker.launchImageLibrary(options, (response) => {
                    if (response.didCancel) {
                    } else if (response.error) {
                    } else if (response.customButton) {
                    } else {
                        this.uploadImage(response, this.id);
                    }
                });
            },
            200
        );

    }
    /*
     * 图片上传
     * */
    uploadImage = (response, id) => {

        let params = {
            file: 'data:image/jpeg;base64,' + encodeURI(response.data).replace(/\+/g, '%2B')
        };
        this.props.showModal(true);

        ImageUpload.request(AppUrls.INDEX_UPLOAD, 'Post', params)
            .then((response) => {
                this.props.showModal(false);

                if (response.mycode == 1) {
                    this.props.showToast('上传成功')
                    let source = {uri: response.mjson.data.url};
                    if (id === 'enterpriseFront') {
                        idcardfront = response.mjson.data.file_id;
                        if (idcardfront != "") {
                            this.setState({
                                enterpriseFront: source
                            });
                        } else {
                            this.props.showToast("id 为空 图片上传失败");
                        }
                    } else if (id === 'enterpriseBack') {
                        idcardback = response.mjson.data.file_id;
                        if (idcardback != "") {
                            this.setState({
                                enterpriseBack: source
                            });
                        } else {
                            this.props.showToast("id 为空 图片上传失败");
                        }
                    } else if (id === 'businessLicense') {
                        businessid = response.mjson.data.file_id;
                        if (businessid != "") {
                            this.setState({
                                businessLicense: source
                            });
                        } else {
                            this.props.showToast("id 为空 图片上传失败");
                        }
                    }
                    this.verifyBtn();
                } else {
                    this.props.showToast(response.mjson.msg + "!");
                }
            }, (error) => {
                console.log(error);
                this.props.showToast("图片上传失败");
            });
    }

    verifyBtn =()=>{

        this.isFinish = true;

        if (this.isEmpty(this.legalPersonName) === true) {
            this.isFinish = false;

        }
        if (this.isEmpty(this.legalPersonID) === true) {
            this.isFinish = false;

        }

        if (this.isEmpty(this.legalPersonPhone) === true) {
            this.isFinish = false;

        }

        if (this.isEmpty(idcardfront) === true) {
            this.isFinish = false;

        }
        if (this.isEmpty(idcardback) === true) {
            this.isFinish = false;

        }
        if (this.isEmpty(businessid) === true) {
            this.isFinish = false;

        }

        if (this.results.length <= 0) {
            this.isFinish = false;

        }

        console.log('isFinish======',this.isFinish);

        this.setState({
            isFinish:this.isFinish
        });
    }

    register = () => {

        if(!this.isFinish) return;

        let legalPersonName = this.refs.legalPersonName.getInputTextValue();
        let legalPersonID = this.refs.legalPersonID.getInputTextValue();
        let legalPersonPhone = this.refs.legalPersonPhone.getInputTextValue();

        if (this.isEmpty(legalPersonName) === true) {
            this._showHint('请填写法人姓名');
            return;
        }
        if (this.isEmpty(legalPersonID) === true) {
            this._showHint('请填写法人身份证');
            return;
        }
        if (legalPersonID.length != 18 && legalPersonID.length != 15) {
            this._showHint('请填写有效的法人身份证');
            return;
        }
        if (this.isEmpty(legalPersonPhone) === true) {
            this._showHint('请填写法人联系方式');
            return;
        }
        if (legalPersonPhone.length != 11) {
            this._showHint('请填写有效的法人联系方式');
            return;
        }
        if (this.isEmpty(idcardfront) === true) {
            this._showHint('请上传法人身份证正面');
            return;
        }
        if (this.isEmpty(idcardback) === true) {
            this._showHint('请上传法人身份证反面');
            return;
        }

        if (this.isEmpty(businessid) === true) {
            this._showHint('请上传营业执照');
            return;
        }

        if (this.results.length <= 0) {
            this._showHint('请上传场地合同照片');
            return;
        }

        let device_code = '';
        if (Platform.OS === 'android') {
            device_code = 'dycd_platform_android';
        } else {
            device_code = 'dycd_platform_ios';
        }
        let data1 = {};
        if (this.props.fastOneData.selectOWNorRENT == 'rent') {//租赁
            data1 = {
                operating_site_type: '2',
                houmny: this.props.fastOneData.yuezujin,
            }

        } else {//自有
            data1 = {
                operating_site_type: '1',
                house_price: this.props.fastOneData.fangwujiazhi,
                house_loan_balance: this.props.fastOneData.daikuanyue
            }

        }
        let changdihetong = [];
        this.results.map((data) => {
                let item;
                item = data.file_id;
                changdihetong.push(item)
            }
        )

        let maps = {
            device_code: device_code,
            borrower_base_id: this.boss_id,
            business_address: this.props.fastOneData.business_home,
            business_licence: businessid,
            company_base_id: global.companyBaseID,
            company_name: this.props.fastOneData.qiyemingcheng,
            company_regno:this.props.fastOneData.xinyongdaima,
            // company_regno: 'Qq18518165888qq',
            controller_base_id: this.boss_id,
            control_cardid: this.state.boss_idcard,
            control_name: this.state.boss_name,
            control_phone: this.state.boss_tel,
            deputy: legalPersonName,
            deputy_cardid: legalPersonID,
            deputy_phone: legalPersonPhone,
            deputy_cardid_positive_identification: idcardfront,
            deputy_cardid_reverse_side_identity: idcardback,
            site_contract: changdihetong,
        };
        Object.assign(maps, data1);
        this.setState({
            loading: true,
        });
        request(AppUrls.FASTCREDIT, 'Post', maps)
            .then((response) => {
                    this.setState({
                        loading: false,
                    });

                    if (response.mjson.data.submit_result == "T") {//申请新车订单授信  提交

                        this.props.showToast("小额授信申请提交成功");
                        if (this.props.callBackRefresh) {
                            this.props.callBackRefresh();
                        }
                        this.timer = setTimeout(
                            () => {
                                this.backToTop();//  回到申请页面  BlankFinanceScene
                            },
                            200
                        );
                    } else {//提交申请新车订单授信失败的原因
                        this.props.showToast(response.mjson.msg + "");
                    }


                },
                (error) => {//验证验证码接口报错
                    this.setState({
                        loading: false,
                    });
                    this.props.showToast(error.mjson.msg + "");

                });

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3,
        paddingTop: Pixel.getPixel(64),

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
    },
    inputTextStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
    },
    inputTextLine: {
        backgroundColor: FontAndColor.COLORA3,
        height: Pixel.getPixel(10),
        width: width,
    },
    inputHeader: {
        backgroundColor: FontAndColor.COLORA3,
        height: Pixel.getPixel(30),
        width: width,
        justifyContent: 'center'
    },
    inputHeaderText: {
        color: FontAndColor.COLORA1,
        fontSize: Pixel.getPixel(12),
        marginLeft: Pixel.getPixel(15)
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
        backgroundColor: FontAndColor.COLORA3,
        height: Pixel.getPixel(130),
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        paddingTop: Pixel.getPixel(25)
    },
    itemBackground: {
        flexDirection: 'row',
        height: Pixel.getPixel(44),
        backgroundColor: 'white',
        paddingHorizontal: Pixel.getPixel(15),
        alignItems: 'center'
    },
    leftFont: {
        fontSize: Pixel.getFontPixel(14),
        color: 'black'
    },
    fillSpace: {
        flex: 1
    },
    selectBtn: {
        height: Pixel.getPixel(30),
        width: Pixel.getPixel(68),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getFontPixel(2),
        marginRight: Pixel.getPixel(15),
        borderColor: FontAndColor.COLORB0,
        borderWidth: StyleSheet.hairlineWidth,

    },
    selectBtnFont: {
        fontSize: Pixel.getFontPixel(15),
        color: FontAndColor.COLORB0,
    }
});