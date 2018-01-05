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

const cellJianTou = require('../../../../images/mainImage/celljiantou@2x.png');

const Pixel = new PixelUtil();
let feeDatas = [{title: '发票类型', value: '1000元'}, {title: '发票抬头', value: '100元'}]
let accoutInfo = [{title: '联系电话', value: '13000000001'}, {title: '收车地址', value: '湖北省武汉市武昌区'}]
export default class InvoiceInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.num = '';
        this.state = {
            renderPlaceholderOnly: false
        }
    }

    initFinish() {
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
                                    <Text style={styles.content_base_Right}>{data.value}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <View style={styles.content_title_text_wrap}>
                    <Text style={[styles.content_title_text, {marginLeft: Pixel.getPixel(15)}]}>纳税人识别号</Text>
                    <TextInput style={[styles.content_base_Right, {
                        width: Pixel.getPixel(100),
                        marginRight: Pixel.getPixel(15)
                    }]}
                               ref={(ref) => {
                               }}
                               editable={true}
                               placeholder={'请输入识别码'}
                               onChangeText={(text) => {
                                   this.num = text
                               }}
                               underlineColorAndroid='transparent'/>
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
                                    <Text style={styles.content_base_Right}>{data.value}</Text>
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
                              this.toNextPage({
                                      name: 'CheckWaybill',
                                      component: CheckWaybill,
                                      params: {}
                                  }
                              );
                          }}/>
            </View>
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
        height: Pixel.getPixel(42),
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA4,
        backgroundColor: 'white'
    },
    content_title_text: {
        flex: 1,
        fontSize: Pixel.getFontPixel(14),
        color: FontAndColor.COLORA1,
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
        textAlign: 'right'
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
