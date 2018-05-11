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
import LicenseImageScene from './component/LicenseImageScene'
import SaasText from "../../zheshangAccount/component/SaasText";
import MyButton from '../../../../component/MyButton'
import * as ImageUpload from "../../../../utils/ImageUpload";
import ImageSourceSample from '../../../../publish/component/ImageSourceSample'
import ImagePicker from "react-native-image-picker";
import ResultIndicativeScene from '../ResultIndicativeScene';
import TrustAccountContractScene from "../../trustAccount/TrustAccountContractScene";
import SelectButton from "../../component/SelectButton";

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

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


export default class OpenAccountBaseScene extends BaseComponent {

    constructor(props) {
        super(props)
        this.agree_contract = true;
        this.agree_default = true;
        this.state = {

            legal_picurl: null,
            legal_opposite_picurl: null,
            community_credit_picurl: null,
            organization_code_picurl: null,
            cert_url: null,
            tax_register_picurl: null,

        }

    }

    componentWillUnmount() {
        delete this.props.model.legal_picurl;
        delete this.props.model.legal_opposite_picurl;
        delete this.props.model.community_credit_picurl;
        delete this.props.model.organization_code_picurl;
        delete this.props.model.cert_url;
        delete this.props.model.tax_register_picurl;
    }


    initFinish() {
        this.setState({
            renderPlaceholderOnly: 'loading'
        })

        this.props.showModal(true);
        let maps = {
            source_type: '3',
            fund_channel: '信托'
        };
        request(AppUrls.AGREEMENT_LISTS, 'Post', maps)
            .then((response) => {
                this.props.showModal(false);
                this.contractList = response.mjson.data.list;

                this.setState({
                    renderPlaceholderOnly: 'success'
                })

            }, (error) => {
                this.setState({
                    renderPlaceholderOnly: 'error'
                })
                this.props.showModal(false);
                this.props.showToast(error.mjson.msg);
            });
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


        let contractList = [];
        for (let i = 0; i < this.contractList.length; i++) {

            if (this.contractList[i].name.indexOf('民事信托合同') !== -1 || this.contractList[i].name.indexOf('信账宝会员注册及服务协议')!==-1|| this.contractList[i].name.indexOf('中信信托-账户管理类服务')!==-1) {

                contractList.push(<Text
                    key={i + 'contractList'}
                    allowFontScaling={false}
                    onPress={() => {
                        this.openContractScene('合同', this.contractList[i].url)
                        console.log(this.contractList[i].url)
                    }}
                    style={{
                        fontSize: Pixel.getFontPixel(FontAndColor.CONTENTFONT24),
                        color: FontAndColor.COLORB4,
                        lineHeight: Pixel.getPixel(20)
                    }}>
                    《{this.contractList[i].name}》
                </Text>);

            }

            //contractList.reverse()


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
                        <SaasText style={{
                            color: FontAndColor.COLORA1,
                            marginVertical: Pixel.getPixel(5),
                            marginLeft: Pixel.getPixel(15),
                            fontSize: 12
                        }}>个人证件</SaasText>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                paddingVertical: Pixel.getPixel(15)
                            }}
                        >
                            <LicenseImageScene
                                ref={'id_front'}
                                title={'身份证-正面'}
                                image={this.state.legal_picurl}
                                onPress={() => {
                                    this._rePhoto('legal_picurl')
                                }}
                                onDelete={() => {
                                    this.props.model.legal_picurl = null;
                                    this.setState({
                                        legal_picurl: null
                                    })
                                }}
                            />
                            <LicenseImageScene
                                ref={'id_back'}
                                title={'身份证-背面'}
                                image={this.state.legal_opposite_picurl}
                                onPress={() => {
                                    this._rePhoto('legal_opposite_picurl')
                                }}
                                onDelete={() => {
                                    this.props.model.legal_opposite_picurl = null;
                                    this.setState({
                                        legal_opposite_picurl: null
                                    })
                                }}
                            />

                        </View>


                    </View>


                    <View style={{marginTop: Pixel.getPixel(15)}}>
                        <SaasText style={{
                            color: FontAndColor.COLORA1,
                            marginVertical: Pixel.getPixel(5),
                            marginLeft: Pixel.getPixel(15),
                            fontSize: 12
                        }}>企业证件</SaasText>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                paddingVertical: Pixel.getPixel(15)
                            }}
                        >
                            {
                               this.props.model.is_three_certificates_joined == 2 ?

                                    <LicenseImageScene
                                        image={this.state.community_credit_picurl}
                                        ref={'union_num'}
                                        title={'社会统一代码'}
                                        onPress={() => {
                                            this._rePhoto('community_credit_picurl')
                                        }}
                                        onDelete={() => {
                                            this.props.model.community_credit_picurl = null;
                                            this.setState({
                                                community_credit_picurl: null
                                            })
                                        }}

                                    />

                                    : <View style={{flexDirection: 'row'}}>
                                        <LicenseImageScene
                                            ref={'orgenization_num'}
                                            title={'组织机构'}
                                            image={this.state.organization_code_picurl}
                                            onPress={() => {
                                                this._rePhoto('organization_code_picurl')
                                            }}
                                            onDelete={() => {
                                                this.props.model.organization_code_picurl = null;
                                                this.setState({
                                                    organization_code_picurl: null
                                                })
                                            }}
                                        />
                                        <LicenseImageScene
                                            ref={'license_num'}
                                            title={'营业执照'}
                                            image={this.state.cert_url}
                                            onPress={() => {
                                                this._rePhoto('cert_url')
                                            }}
                                            onDelete={() => {
                                                this.props.model.cert_url = null;
                                                this.setState({
                                                    cert_url: null
                                                })
                                            }}
                                        />
                                        <LicenseImageScene
                                            ref={'tax_num'}
                                            title={'税务登记证'}
                                            image={this.state.tax_register_picurl}
                                            onPress={() => {
                                                this._rePhoto('tax_register_picurl')
                                            }}
                                            onDelete={() => {
                                                this.props.model.tax_register_picurl = null;
                                                this.setState({
                                                    tax_register_picurl: null
                                                })
                                            }}
                                        />
                                    </View>
                            }

                        </View>


                    </View>
                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'提交'}
                        parentStyle={styles.next_parentStyle}
                        childStyle={styles.next_childStyle}
                        mOnPress={() => {
                            if (this.verify()) {
                                this.openAccount()
                            }
                        }}/>

                    <View style={{paddingLeft:Pixel.getPixel(15)}}>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: Pixel.getPixel(15),
                        marginRight:Pixel.getPixel(15),
                    }}>
                        <SelectButton onPress={(flag) => {
                            this.agree_default = flag;
                        }}/>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontSize: Pixel.getFontPixel(FontAndColor.CONTENTFONT24),
                                color: FontAndColor.COLORA1,
                                marginLeft: Pixel.getPixel(5),
                                marginTop: Pixel.getPixel(5),
                                textAlign: 'left',
                            }}>
                            默认使用恒丰开户信息开通粮票
                        </Text>

                    </View>


                    <View
                        style={{flexDirection: 'row', alignItems: 'center'}}
                    >
                        <SelectButton onPress={(flag) => {
                            this.agree_contract = flag;
                        }}/>

                        <Text
                            allowFontScaling={false}
                            style={{
                                fontSize: Pixel.getFontPixel(FontAndColor.CONTENTFONT24),
                                color: FontAndColor.COLORA1,
                                lineHeight: Pixel.getPixel(20),
                                marginLeft: Pixel.getPixel(5)
                            }}
                        >

                            我已经阅读并同意以下协议,点击查看
                        </Text>

                    </View>


                    <View style={{
                        marginHorizontal: Pixel.getPixel(20),
                        marginVertical: Pixel.getPixel(6),
                    }}>
                        {contractList}
                    </View>

                    </View>
                </ScrollView>
                <ImageSourceSample

                    galleryClick={this._photoClick}
                    cameraClick={this._cameraClick}
                    ref={(modal) => {
                        this.imageSource = modal
                    }}/>


            </View>
        )
    }

    openContractScene = (name, url) => {
        this.toNextPage({
            name: 'TrustAccountContractScene',
            component: TrustAccountContractScene,
            params: {
                title: name,
                webUrl: url
            }
        })
    };

    ///开户
    openAccount = () => {

        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code === 1 && data.result !== null) {
                let datas = JSON.parse(data.result);

                this.props.model.enter_base_id = datas.company_base_id;

                this.props.showModal(true)

                request(AppUrls.OPEN_ENTER_TRUST_ACCOUNT, 'Post', this.props.model)
                    .then((response) => {

                        this.props.showModal(false)

                        this.toNextPage({
                            component: ResultIndicativeScene,
                            name: 'ResultIndicativeScene',
                            params: {
                                type: 1,
                                status: 1,
                                params: this.props.model,
                                append: this.state.bankName,
                                callBack: this.props.callBack
                            }
                        })

                    }, (error) => {

                        this.props.showModal(false);
                        if (error.mycode === 8050324) {  // 不在服务时间内
                            this.setState({
                                out_of_service_msg: error.mjson.msg,
                                alert: true
                            })
                            return
                        }
                        if (error.mycode === 8010007) {  // 存疑

                            this.toNextPage({
                                component: ResultIndicativeScene,
                                name: 'ResultIndicativeScene',
                                params: {
                                    type: 1,
                                    status: 0,
                                    params: this.props.model,
                                    error: error.mjson,
                                    callBack: this.props.callBack
                                }
                            })
                        } else if (error.mycode === -500 || error.mycode === -300) {
                            this.props.showToast(error.mycode)
                        } else { // 开户失败
                            this.toNextPage({
                                component: ResultIndicativeScene,
                                name: 'ResultIndicativeScene',
                                params: {
                                    type: 1,
                                    status: 2,
                                    params: this.props.model,
                                    error: error.mjson,
                                    callBack: this.props.callBack
                                }
                            })
                        }
                    });
            } else {

            }
        })
    }

    verify = () => {

        // legal_picurl: null,
        //     legal_opposite_picurl: null,
        //     community_credit_picurl: null,
        //     organization_code_picurl: null,
        //     cert_url: null,
        //     tax_register_picurl: null,

        if ( typeof this.props.model.legal_picurl === 'undefined'||this.props.model.legal_picurl === null) {
            this.props.showToast('请上传身份证正面')
            return false
        } else if (typeof this.props.model.legal_opposite_picurl === 'undefined'||this.props.model.legal_opposite_picurl === null) {
            this.props.showToast('请上传身份证背面')
            return false
        }

        if (this.props.model.is_three_certificates_joined === 1) {
            if (typeof this.props.model.organization_code_picurl === 'undefined'||this.props.organization_code_picurl === null) {
                this.props.showToast('请上传组织机构照片')
                return false
            } else if (typeof this.props.model.cert_url === 'undefined'||this.props.model.cert_url === null) {
                this.props.showToast('请上传营业执照')
                return false
            } else if (typeof this.props.model.tax_register_picurl === 'undefined'||this.props.model.tax_register_picurl === null) {
                this.props.showToast('请上传税务登记证')
                return false
            }
        } else {
            if (typeof this.props.model.community_credit_picurl === 'undefined'||this.props.model.community_credit_picurl === null) {
                this.props.showToast('请上传社会统一代码证件')
                return false
            }
        }

        if(!this.agree_default){
            this.props.showToast('请先勾选相关协议')
            return false;
        }
        if(!this.agree_contract){
            this.props.showToast('请先勾选相关协议')
            return false;
        }



        return true

    }

    _rePhoto = (ID) => {

        this.id = ID;

        this.imageSource.openModal('', '', null);


    };
    /*
        * 相机点击
        * */
    _cameraClick = () => {
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
    _photoClick = () => {
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
            base64_file: 'data:image/jpeg;base64,' + encodeURI(response.data).replace(/\+/g, '%2B')
        };
        this.props.showModal(true);

        ImageUpload.request(AppUrls.AUTH_UPLOAD_FILE, 'Post', params)
            .then((response) => {

                this.props.showModal(false);

                if (response.mycode == 1) {
                    let source = {uri: response.mjson.data.icon};

                    this.props.model[id] = response.mjson.data.url;

                    switch (id) {

                        case 'legal_picurl':
                            this.setState({
                                legal_picurl: source
                            })
                            break;
                        case 'legal_opposite_picurl':
                            this.setState({
                                legal_opposite_picurl: source
                            })
                            break;
                        case 'community_credit_picurl':
                            this.setState({
                                community_credit_picurl: source
                            })
                            break;
                        case 'organization_code_picurl':
                            this.setState({
                                organization_code_picurl: source
                            })
                            break;
                        case 'cert_url':
                            this.setState({
                                cert_url: source
                            })
                            break;
                        case 'tax_register_picurl':
                            this.setState({
                                tax_register_picurl: source
                            })
                            break;
                        default:
                    }

                } else {
                    this.props.showToast(response.mjson.msg + "!");
                }
            }, (error) => {
                this.props.showModal(false);

                this.props.showToast("图片上传失败");
            });
    }

}


const styles = StyleSheet.create({

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
