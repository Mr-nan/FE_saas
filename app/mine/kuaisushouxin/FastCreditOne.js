/**
 * Created by yujinzhong on 2018/1/2.
 */
import React from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    NativeModules,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    TouchableWithoutFeedback,
}from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import * as AppUrls from "../../constant/appUrls";

import {request} from '../../utils/RequestUtil';
import SelectDJRScene from "../../finance/lend/SelectDJRScene";
import BusinessAddress from "./BusinessAddress";
import StorageUtil from "../../utils/StorageUtil";
import * as storageKeyNames from '../../constant/storageKeyNames';
import FastCreditTwo from "./FastCreditTwo";


const Pixel = new PixelUtil();
const selectImg = require('../../../images/financeImages/celljiantou.png');
const IS_ANDROID = Platform.OS === 'android';


export default class FastCreditOne extends BaseComponent {
    constructor(props) {
        super(props);
        this.enterpriseData = {
            qiyemingcheng: '',//企业名称
            xinyongdaima: '',//统一社会信用代码
            business_home: '',//经营地址

            selectOWNorRENT: '',//自由 租赁
            daikuanyue: '',//房屋贷款余额
            fangwujiazhi: '',//房屋价值
            yuezujin: '',//月租金
            ID:''//企业id


        };

        this.state = {
            selectNO: 'own',//'rent'
            business_home: '请选择',//经营地址
            fangwujiazhi: '请选择',//房屋价值
            keyboardOffset: -Pixel.getPixel(64),
            renderPlaceholderOnly: 'blank',
            qiyemingcheng: '',
            xinyongdaima: '',
        };
    }

    initFinish = () => {
        this.setState({renderPlaceholderOnly: 'loading'});
        this._getQiYeCode();
    };
    _getQiYeCode = () => {

	    request(AppUrls.GETENTERPRISEBYEUID, 'Post', {enterprise_user_id: global.companyBaseID})//通过商户ID获取商户详细信息
		    .then((response11) => {
				    let BUSINESS_LICENSE = response11.mjson.data.business_license;
				    this.enterpriseData.xinyongdaima = BUSINESS_LICENSE;
				    this.enterpriseData.qiyemingcheng =  response11.mjson.data.enterprise_name;

				    this.setState(
					    {
						    renderPlaceholderOnly: 'success',
						    xinyongdaima: BUSINESS_LICENSE,
						    qiyemingcheng:response11.mjson.data.enterprise_name,

					    })
			    },
			    (error) => {
				    this.setState({renderPlaceholderOnly: 'error'});

			    });

    }


    //提示信息
    _showHint = (hint) => {
        this.props.showToast(hint);
    };
    _qiyemingchengChange = (text) => {
        this.enterpriseData.qiyemingcheng = text;
    };
    _xinyongdaimaChange = (text) => {
        this.enterpriseData.xinyongdaima = text;
    };
    _daikuanyueChange = (text) => {
        this.enterpriseData.daikuanyue = text;
    };
    _yuezujinChange = (text) => {
        this.enterpriseData.yuezujin = text;
    }
    _fangwujiazhiChange = (text) => {
        this.enterpriseData.fangwujiazhi = text;
    };
    /*
     * 商户所在地点击
     * */
    _onCityPress = () => {
        let navigatorParams = {
            name: "BusinessAddress",
            component: BusinessAddress,
            params: {

                callBackRefresh: (Data) => {
                    this.enterpriseData.business_home = Data.business_home +''+ Data.xiangxidizhi;
                    this.setState({
                        business_home: this.enterpriseData.business_home,
                    });

                }

            }
        }
        this.toNextPage(navigatorParams);
    };

    /*
     * 导航栏左侧按钮点击
     * */
    _onBack = () => {
        this.backPage();
    };
    /*
     * 完成点击
     * */
    _onCompletePress = () => {
        if (this.isEmpty(this.enterpriseData.business_home) === true) {
            this._showHint('请选择经营地址');
            return;
        }
        if (this.state.selectNO == 'own') {
            if (this.isEmpty(this.state.fangwujiazhi) === true) {
                this._showHint('请选择房屋价值');
                return;
            }
            if (this.isEmpty(this.enterpriseData.daikuanyue) === true) {
                this._showHint('请填写房屋贷款余额');
                return;
            }
        }
        if (this.state.selectNO == 'rent') {
            if (this.isEmpty(this.enterpriseData.yuezujin) === true) {
                this._showHint('请填写月租金');
                return;
            }
        }

        this.enterpriseData.selectOWNorRENT = this.state.selectNO;
        this.enterpriseData.business_home = this.state.business_home;
        this.enterpriseData.fangwujiazhi = this.state.fangwujiazhi;



        this.toNextPage({
            name: 'FastCreditTwo',
            component: FastCreditTwo,
            params: {
                callBackRefresh:this.props.callBackRefresh,
                fastOneData:this.enterpriseData,

            },
        });

    }
    render() {

        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    {this.loadView()}
                    <AllNavigationView title="小额授信申请" backIconClick={() => {
                        this.backPage();
                    }}/>
                </View>);
        }
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
                {/*导航栏view*/}
                <AllNavigationView
                    backIconClick={this._onBack}
                    title='小额授信申请'
                />

            </View>
        )
    }

    /*
     * 主界面
     * */
    loadScrollView = () => {
        return (
            <ScrollView keyboardDismissMode={IS_ANDROID ? 'none' : 'on-drag'}>

                <View style={{width: width, height: Pixel.getPixel(15), backgroundColor: fontAndColor.COLORA3}}/>
                {/*企业名称view*/}
                <View style={styles.itemBackground}>
                    <Text allowFontScaling={false} style={styles.leftFont}>企业名称</Text>
                    <TextInput
                        ref={(input) => {
                            this.qiyemingchengInput = input
                        }}
                        style={[styles.inputHintFont, styles.fillSpace]}
                        underlineColorAndroid='transparent'
                        onChangeText={this._qiyemingchengChange}
                        defaultValue={this.enterpriseData.qiyemingcheng}
                        placeholderTextColor={fontAndColor.COLORA1}
                        editable={false}
                        onFocus={() => {
                            this.setState({
                                keyboardOffset: -Pixel.getPixel(300)
                            });
                        }}
                        onBlur={() => {
                            this.setState({
                                keyboardOffset: Pixel.getPixel(64)
                            });
                        }}
                    />
                </View>
                <View style={styles.splitItem}/>

                {/*统一社会信用代码view*/}
                <View style={styles.itemBackground}>
                    <Text allowFontScaling={false} style={styles.leftFont}>统一社会信用代码</Text>
                    <TextInput
                        ref={(input) => {
                            this.xinyongdaimaInput = input
                        }}
                        style={[styles.inputHintFont, styles.fillSpace]}
                        underlineColorAndroid='transparent'
                        onChangeText={this._xinyongdaimaChange}
                        defaultValue={this.enterpriseData.xinyongdaima}
                        maxLength={18}
                        placeholderTextColor={fontAndColor.COLORA1}
                        editable={false}
                        onFocus={() => {
                            this.setState({
                                keyboardOffset: -Pixel.getPixel(300)
                            });
                        }}
                        onBlur={() => {
                            this.setState({
                                keyboardOffset: Pixel.getPixel(64)
                            });
                        }}
                    />
                </View>
                <View style={{width: width, height: Pixel.getPixel(10), backgroundColor: fontAndColor.COLORA3}}/>
                {/*经营地址view*/}
                <View style={styles.itemBackground}>
                    <Text allowFontScaling={false} style={styles.leftFont}>经营地址</Text>

                    <TouchableOpacity onPress={this._onCityPress} style={[styles.rightContainer,{flex:1}]}>

                            <Text
                                numberOfLines={1}
                                allowFontScaling={false}
                                  ref='business_home'
                                  style={styles.selectHintFont}>{this.state.business_home}</Text>


                            <Image style={styles.selectImage} source={selectImg}/>

                    </TouchableOpacity>
                </View>
                <View style={{width: width, height: Pixel.getPixel(10), backgroundColor: fontAndColor.COLORA3}}/>


                {/*经营场地view*/}
                <View style={[styles.itemBackground, {height: Pixel.getPixel(60)}]}>
                    <Text allowFontScaling={false} style={styles.leftFont}>经营场地</Text>
                    <View style={styles.fillSpace}/>
                    <TouchableOpacity
                        style={[styles.selectBtn, {borderColor: this.state.selectNO == 'own' ? fontAndColor.COLORB0 : fontAndColor.COLORA2}]}
                        activeOpacity={0.6}
                        onPress={() => {
                            this._changdiTypePress('own')
                        }}>
                        <Text allowFontScaling={false}
                              style={[styles.selectBtnFont, {color: this.state.selectNO == 'own' ? fontAndColor.COLORB0 : fontAndColor.COLORA2}]}>自有</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.selectBtn, {marginRight: Pixel.getPixel(0)}, {borderColor: this.state.selectNO == 'rent' ? fontAndColor.COLORB0 : fontAndColor.COLORA2}]}
                        activeOpacity={0.6}
                        onPress={() => {
                            this._changdiTypePress('rent')
                        }}>
                        <Text allowFontScaling={false}
                              style={[styles.selectBtnFont, {color: this.state.selectNO == 'rent' ? fontAndColor.COLORB0 : fontAndColor.COLORA2}]}>租赁</Text>
                    </TouchableOpacity>
                </View>


                <View
                    style={{
                        width: width,
                        height: this.state.selectNO == 'own' ? Pixel.getPixel(10) : Pixel.getPixel(0),
                        backgroundColor: fontAndColor.COLORA3
                    }}/>

                {/*房屋价值view*/}
                {
                    this.state.selectNO == 'own' ?
                        <View>
                            <View
                                style={[styles.itemBackground, {height: this.state.selectNO == 'own' ? Pixel.getPixel(44) : Pixel.getPixel(44)}]}>
                                <Text allowFontScaling={false} style={styles.leftFont}>房屋价值</Text>
                                <View style={styles.fillSpace}/>
                                <TouchableOpacity onPress={this._onJiaZhiPress}>
                                    <View style={styles.rightContainer}>
                                        <Text allowFontScaling={false}
                                              ref='business_home'
                                              style={styles.selectHintFont}>{this.state.fangwujiazhi}
                                        </Text>
                                        <Image style={styles.selectImage} source={selectImg}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: width,
                                height: Pixel.getPixel(10),
                                backgroundColor: fontAndColor.COLORA3
                            }}/>
                            <View style={styles.itemBackground}>
                                <Text allowFontScaling={false} style={styles.leftFont}>房屋贷款余额</Text>
                                <TextInput
                                    ref={(input) => {
                                        this.daikuanyueInput = input
                                    }}
                                    style={[styles.inputHintFont, styles.fillSpace]}
                                    underlineColorAndroid='transparent'
                                    onChangeText={this._daikuanyueChange}
                                    placeholder='请输入'
                                    defaultValue={this.enterpriseData.daikuanyue}
                                    placeholderTextColor={fontAndColor.COLORA1}
                                    onFocus={() => {
                                        this.setState({
                                            keyboardOffset: -Pixel.getPixel(300)
                                        });
                                    }}
                                    onBlur={() => {
                                        this.setState({
                                            keyboardOffset: Pixel.getPixel(64)
                                        });
                                    }}
                                />
                                <Text allowFontScaling={false} style={styles.leftFont}>万元</Text>

                            </View>
                        </View>
                        :
                        <View>
                            <View style={{
                                width: width,
                                height: Pixel.getPixel(10),
                                backgroundColor: fontAndColor.COLORA3
                            }}/>
                            {/*月租金view*/}
                            <View style={styles.itemBackground}>
                                <Text allowFontScaling={false} style={styles.leftFont}>月租金</Text>
                                <TextInput
                                    ref={(input) => {
                                        this.daikuanyueInput = input
                                    }}
                                    style={[styles.inputHintFont, styles.fillSpace]}
                                    underlineColorAndroid='transparent'
                                    onChangeText={this._yuezujinChange}
                                    placeholder='请输入'
                                    defaultValue={this.enterpriseData.yuezujin}
                                    placeholderTextColor={fontAndColor.COLORA1}
                                    onFocus={() => {
                                        this.setState({
                                            keyboardOffset: -Pixel.getPixel(300)
                                        });
                                    }}
                                    onBlur={() => {
                                        this.setState({
                                            keyboardOffset: Pixel.getPixel(64)
                                        });
                                    }}
                                />
                                <Text allowFontScaling={false} style={styles.leftFont}>万元</Text>
                            </View>
                        </View>
                }


                <View style={{width: width, height: Pixel.getPixel(100), backgroundColor: fontAndColor.COLORA3}}/>

                {/*下一步view*/}
                <View style={styles.fillSpace}>
                    <TouchableOpacity style={styles.btnOk} activeOpacity={0.6} onPress={this._onCompletePress}>
                        <Text allowFontScaling={false} style={styles.btnFont}>下一步</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
    /*
     * 判断非空函数
     * */
    isEmpty = (str) => {
        if (typeof(str) != 'undefined' && str !== '' && str !== null) {
            return false;
        } else {
            return true;
        }
    };
    _onJiaZhiPress = () => {
        this.toNextPage(
            {
                name: 'SelectDJRScene',
                component: SelectDJRScene,
                params: {
                    regShowData:
                        ['50万以下', '50万 ~ 100万', '100万 ~ 150万', '150万 ~ 200万',
                        '200万 ~ 300万', '300万 ~ 400万', '400万 ~ 500万', '500万以上'],
                    title: '选择房屋价值',
                    callBack: (name, index) => {
                        this.setState({
                            fangwujiazhi: name
                        })

                    }
                }
            })
    }
    _changdiTypePress = (type) => {
        this.setState({
            selectNO: type
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Pixel.getPixel(64),
    },
    alignTop: {
        marginTop: Pixel.getPixel(59)
    },
    alignItem: {
        marginTop: Pixel.getPixel(10)
    },
    itemBackground: {
        flexDirection: 'row',
        height: Pixel.getPixel(44),
        backgroundColor: 'white',
        paddingHorizontal: Pixel.getPixel(15),
        alignItems: 'center'
    },
    splitItem: {
        height: Pixel.getPixel(1),
        backgroundColor: fontAndColor.COLORA4,
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(15),
    },
    leftFont: {
        fontSize: Pixel.getFontPixel(14),
        color: 'black'
    },
    fillSpace: {
        flex: 1,
    },
    selectHintFont: {
        fontSize: Pixel.getFontPixel(14),
        color: fontAndColor.COLORA2,
        textAlign: 'right',
        width:width - Pixel.getPixel(120)
    },
    inputHintFont: {
        fontSize: Pixel.getFontPixel(14),
        color: 'black',
        textAlign: 'right'
    },
    selectImage: {
        height: Pixel.getPixel(16),
        width: Pixel.getPixel(9),
        marginLeft: Pixel.getPixel(13)
    },
    scanImage: {
        height: Pixel.getPixel(18),
        width: Pixel.getPixel(18),
        marginLeft: Pixel.getPixel(8)
    },
    rightContainer: {
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-end'
    },
    rightHintFont: {
        fontSize: Pixel.getFontPixel(14),
        color: 'black',
        marginLeft: Pixel.getPixel(8)
    },
    btnOk: {
        height: Pixel.getPixel(44),
        marginHorizontal: Pixel.getPixel(15),
        backgroundColor: fontAndColor.COLORB0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Pixel.getPixel(15),
        borderRadius: Pixel.getFontPixel(2),
    },
    btnFont: {
        fontSize: Pixel.getFontPixel(15),
        color: 'white'
    },
    selectBtn: {
        height: Pixel.getPixel(32),
        width: Pixel.getPixel(88),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getFontPixel(2),
        marginRight: Pixel.getPixel(15),
        borderColor: fontAndColor.COLORB0,
        borderWidth: 1,

    },
    selectBtnFont: {
        fontSize: Pixel.getFontPixel(15),
        color: fontAndColor.COLORB0,
    }

});