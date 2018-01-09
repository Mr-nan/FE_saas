import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Dimensions, TextInput, Image,
} from 'react-native';
import BaseComponent from '../../../component/BaseComponent';
import NavigatorView from '../../../component/AllNavigationView';

const {width} = Dimensions.get('window');
import * as FontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import MyButton from "../../../component/MyButton";
import CheckWaybill from './CheckWaybill';
import SelectDestination from './SelectDestination';
import StorageUtil from "../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../constant/storageKeyNames";

const cellJianTou = require('../../../../images/mainImage/celljiantou@2x.png');

const Pixel = new PixelUtil();
let feeDatas = [{title: '发票类型', value: '增值税普通发票'}, {title: '发票抬头', value: ''}, {title: '纳税人识别号', value: ''}]
let accoutInfo = [{title: '联系电话', value: '13000000001'}, {title: '收车地址', value: '湖北省武汉市武昌区街坊ADSL看风景拉就是的法律'}]
export default class InvoiceInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.num = '';//识别号
        this.riseText = '';//抬头
        this.telText = '';
        this.addressText = '';
        this.state = {
            renderPlaceholderOnly: false,
        }
    }

    initFinish() {
        StorageUtil.mGetItem(StorageKeyNames.INVOICE_TITLE, (data) => {
            if (data.code == 1 && data.result != null) {
                this.riseText = data.result;
                this.riseInput.setNativeProps({
                    text: this.riseText
                });
            }
        })
        StorageUtil.mGetItem(StorageKeyNames.TAXPAYER_IDENTIFICATION_NUMBER, (data) => {
            if (data.code == 1 && data.result != null) {
                this.num = data.result;
                this.numInput.setNativeProps({
                    text: this.num
                });
            }
        })
        this.setState({
            renderPlaceholderOnly: 'success'
        });
    }

    _renderItem = () => {
        return (
            <View style={{flex: 1}}>

                <Text style={{
                    marginLeft: Pixel.getPixel(15),
                    marginVertical: Pixel.getPixel(10),
                    fontSize: Pixel.getPixel(12),
                    color: FontAndColor.COLORA1

                }}>发票信息</Text>
                <View style={{
                    backgroundColor: 'white',
                    paddingHorizontal: Pixel.getPixel(15)
                }}>
                    {
                        feeDatas.map((data, index) => {
                            return (
                                <View key={index + 'fee'} style={styles.content_title_text_wrap}>
                                    <Text style={styles.content_title_text}>{data.title}</Text>
                                    {index !== 0 ?
                                        <TextInput
                                            style={{
                                                height: Pixel.getPixel(55),
                                                flex: 1,
                                                flexWrap: 'wrap',
                                                textAlign: 'right',
                                                fontSize: Pixel.getPixel(14),
                                            }}
                                            ref={(ref) => {

                                                index == 1?this.riseInput=ref:this.numInput=ref
                                                }
                                            }
                                            underlineColorAndroid={"#00000000"}
                                            placeholder={'请输入' + data.title}
                                            onChangeText={(text) => {
                                                if (index == 1) {
                                                    this.riseText = text;
                                                } else {
                                                    this.num = text
                                                }
                                            }}
                                        /> :
                                        <Text style={styles.content_base_Right}>{data.value}</Text>}
                                </View>
                            )
                        })
                    }
                </View>

                <Text style={{
                    marginLeft: Pixel.getPixel(15),
                    marginVertical: Pixel.getPixel(10),
                    fontSize: Pixel.getPixel(12),
                    color: FontAndColor.COLORA1
                }}>邮件信息</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    this.toNextPage({
                            name: 'SelectDestination',
                            component: SelectDestination,
                            params: {}
                        }
                    );
                }}>
                    <View style={styles.content_base_wrap}>
                        <View style={styles.content_base_text_wrap}>
                            <Text style={{
                                flex: 1,
                                fontSize: Pixel.getFontPixel(14),
                                color: FontAndColor.COLORA1
                            }}>收件人</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[styles.content_base_Right, {color: FontAndColor.COLORA1}]}>{'刘威车行'}</Text>
                                <Image source={cellJianTou} style={styles.image}></Image>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{
                    backgroundColor: 'white',
                    paddingHorizontal: Pixel.getPixel(15)
                }}>
                    {
                        accoutInfo.map((data, index) => {
                            return (

                                <View key={index + 'accoutInfo'} style={styles.content_title_text_wrap}>
                                    <Text style={styles.content_title_text}>{data.title}</Text>
                                    <View style={{
                                        flexWrap: 'wrap',
                                        height: Pixel.getPixel(51),
                                        width: width * 3 / 4,
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={[styles.content_base_Right, {marginRight: Pixel.getPixel(15)}]}>{data.value}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }

                </View>

                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'确定'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={() => {
                              this.confirmBt();
                          }}/>
            </View>
        );

    }
    confirmBt = () => {
        if (this.isEmpty(this.riseText)) {
            this.props.showToast('请填写发票抬头');
            return;
        }
        if (this.isEmpty(this.num)) {
            this.props.showToast('请填写纳税人识别号');
            return;
        }
        StorageUtil.mSetItem(StorageKeyNames.INVOICE_TITLE, this.riseText);
        StorageUtil.mSetItem(StorageKeyNames.TAXPAYER_IDENTIFICATION_NUMBER, this.num);
        this.toNextPage({
                name: 'CheckWaybill',
                component: CheckWaybill,
                params: {
                    isShowPay: true
                }
            }
        );
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title='发票信息' backIconClick={this.backPage} renderRihtFootView={this.renderRightView}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <View style={{flex: 1, marginTop: Pixel.getTitlePixel(65),}}>
                    {
                        this._renderItem()
                    }
                </View>
                <NavigatorView title='发票信息' backIconClick={this.backPage} renderRihtFootView={this.renderRightView}/>
            </View>)
        }

    }

    renderRightView = () => {
        return (
            <TouchableOpacity onPress={
                () => {
                }
            }>
                <View style={{
                    marginLeft: Pixel.getPixel(20),
                    width: Pixel.getPixel(80),
                    height: Pixel.getPixel(40),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text allowFontScaling={false}
                          style={{color: 'white', fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT30)}}>不开发票</Text>
                </View>
            </TouchableOpacity>
        )


    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: FontAndColor.all_background,
        flex: 1,
    },
    content_tag_wrap: {
        height: Pixel.getPixel(49),
        marginLeft: Pixel.getPixel(15),
        borderBottomWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content_title_wrap: {
        height: Pixel.getPixel(51),
        backgroundColor: FontAndColor.all_background,
    },
    content_title_text_wrap: {
        height: Pixel.getPixel(55),
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA4,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    content_title_text: {
        fontSize: Pixel.getFontPixel(14),
        color: FontAndColor.COLORA1,
        marginRight: Pixel.getPixel(20),
    },
    content_base_wrap: {
        height: Pixel.getPixel(46),
        minHeight: Pixel.getPixel(46),
        backgroundColor: 'white'
    },
    content_base_text_wrap: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA4,
        marginHorizontal: Pixel.getPixel(15)
    },
    content_base_left: {
        flex: 1,
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(14),
        color: FontAndColor.COLORA1
    },
    content_base_Right: {
        fontSize: Pixel.getFontPixel(14),
        color: 'black',
        textAlign: 'right',
        flexWrap: 'wrap',
    },
    image: {
        marginLeft: Pixel.getPixel(10),
    },
    topText: {
        color: 'white',
        fontSize: Pixel.getPixel(14)
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15)
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
});
