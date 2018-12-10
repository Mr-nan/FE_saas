import React, {Component, PureComponent} from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    InteractionManager,
    TouchableWithoutFeedback,
    TouchableOpacity
} from "react-native";
import SetPwdGesture from "../gesture/SetPwdGesture";
import BaseComponent from "../component/BaseComponent";
import PixelUtil from "../utils/PixelUtil";
import * as FontAndColor from "../constant/fontAndColor";
import AllNavigationView from '../component/AllNavigationView';
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import MainPage from "../main/MainPage";
import AllSelectCompanyScene from "../main/AllSelectCompanyScene";
var Pixel = new PixelUtil();
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export default class SetLoginPwdGesture extends BaseComponent {
    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            message: '绘制解锁图案',
            status: 'normal',
            renderPlaceholderOnly: true,
        }
        this.savePwd = '';
        this.Passwords = '';
        this.setCount = 4;
    }

    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            // this.Verifycode();
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
                    <AllNavigationView
                        title={"设置手势密码"}/>
                </View>
            </TouchableWithoutFeedback>);
        }
        return (

        <View style={{flex:1,backgroundColor:FontAndColor.COLORA3,paddingTop:Pixel.getTitlePixel(64)}}>
            <AllNavigationView
                title={"设置手势密码"}
                backIconClick={this.props.from == 'login'?null:this.backPage}/>
            <View style={styles.topStyle}>
                <View style={styles.padResultsStyle}>
                    <View style={{flexDirection: 'row'}}>
                        {this.savePwd.indexOf("1") > -1 ? <View style={styles.cycleChoseStyle}/> :
                            <View style={styles.cycleStyle}/>}
                        {this.savePwd.indexOf("2") > -1 ? <View style={styles.cycleChoseStyle}/> :
                            <View style={styles.cycleStyle}/>}
                        {this.savePwd.indexOf("3") > -1 ? <View style={styles.cycleChoseStyle}/> :
                            <View style={styles.cycleStyle}/>}
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {this.savePwd.indexOf("4") > -1 ? <View style={styles.cycleChoseStyle}/> :
                            <View style={styles.cycleStyle}/>}
                        {this.savePwd.indexOf("5") > -1 ? <View style={styles.cycleChoseStyle}/> :
                            <View style={styles.cycleStyle}/>}
                        {this.savePwd.indexOf("6") > -1 ? <View style={styles.cycleChoseStyle}/> :
                            <View style={styles.cycleStyle}/>}
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {this.savePwd.indexOf("7") > -1 ? <View style={styles.cycleChoseStyle}/> :
                            <View style={styles.cycleStyle}/>}
                        {this.savePwd.indexOf("8") > -1 ? <View style={styles.cycleChoseStyle}/> :
                            <View style={styles.cycleStyle}/>}
                        {this.savePwd.indexOf("9") > -1 ? <View style={styles.cycleChoseStyle}/> :
                            <View style={styles.cycleStyle}/>}
                    </View>
                </View>
                <Text allowFontScaling={false}  style={this.state.status !== "wrong" ? styles.topMessageStyle : styles.topMessageWStyle}>
                    {this.state.message}
                </Text>
                <Text allowFontScaling={false}  style={{
                    color: FontAndColor.COLORA1,
                    fontSize: Pixel.getFontPixel(14),
                    height: Pixel.getPixel(20),
                }}>   {this.savePwd == '' ? " 请至少连接4个圆，完成手势密码" : ""}</Text>
            </View>
            <SetPwdGesture
                status={this.state.status}
                message={this.state.message}
                interval={500}
                onStart={() => this.onStart()}
                onUpdatePwd={(password) => {
                    if (this.Passwords == "" && this.savePwd != password) {
                        this.savePwd = password;
                        this.setState({
                            status: 'normal',
                        });
                    }
                }}
                onEnd={(password) => this.onEnd(password)}/>
            <View style={{width:Width, alignItems:'center',marginTop:Pixel.getPixel(50)}}>
                <TouchableOpacity onPress={() => {
                    this.savePwd = '';
                    this.Passwords = '';
                    this.setCount = 4;
                    this.setState({
                        status: 'normal',
                        message: '重新绘制解锁图案',
                    });
                }}>
                    <Text allowFontScaling={false}  style={styles.bottomSytle }>重置手势密码</Text>
                </TouchableOpacity>
            </View>
        </View>

        );
    }

    onEnd(pwd) {
        if (this.Passwords == '') {
            // The first password
            if (pwd.length > 3) {
                this.Passwords = pwd;
                this.setState({
                    status: 'normal',
                    message: '再次绘制解锁图案',
                });
            } else {
                this.setState({
                    status: 'wrong',
                    message: '请至少选择4个点',
                });
            }
        } else {
            // The second password
            if (pwd == this.Passwords) {
                this.setState({
                    status: 'right',
                    message: '密码设置成功',
                });

                StorageUtil.mGetItem(StorageKeyNames.PHONE, (data) => {
                    if (data.code == 1) {
                        if (data.result != null) {
                            StorageUtil.mSetItem(data.result + "", this.Passwords);
                            this.Passwords = '';
                        }
                    }
                })
                if (this.props.from == 'login') {
                    StorageUtil.mSetItem(StorageKeyNames.ISLOGIN, 'true');
                    StorageUtil.mSetItem(StorageKeyNames.NEED_GESTURE, 'false');
                    StorageUtil.mGetItem(StorageKeyNames.USER_LEVEL, (data) => {
                        if (data.code == 1) {
                            this.loginPage({name: 'AllSelectCompanyScene', component: AllSelectCompanyScene});
                        }
                    })
                } else {
                    this.props.showToast("设置成功");
                    this.backPage();
                }
            } else {
                if (this.setCount > 0) {
                    this.setState({
                        status: 'wrong',
                        message: '验证失败,还有' + this.setCount + '次机会'
                    });
                    this.setCount--;
                } else {
                    this.savePwd = '';
                    this.Passwords = '';
                    this.setCount = 4;
                    this.setState({
                        status: 'wrong',
                        message: '重新绘制解锁图案',
                    });
                }
            }
        }
    }

    loginSuccess = {
        name: 'MainPage',
        component: MainPage,
        params: {}
    }

    loginPage = (mProps) => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.immediatelyResetRouteStack([{
                ...mProps
            }])
        }
    }

    onStart() {
        if (this.Passwords == '') {
            this.setState({
                status: 'normal',
                message: '绘制解锁图案',
            });
        } else {
            this.setState({
                status: 'normal',
                message: '再次绘制解锁图案',
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
    },
    topStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Width,
        height:Pixel.getPixel(200),

    },
    cycleStyle: {
        width: Pixel.getPixel(15),
        height: Pixel.getPixel(15),
        borderWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA1,
        borderRadius: Pixel.getPixel(15),
        margin: Pixel.getPixel(5),
    },
    cycleChoseStyle: {
        width: Pixel.getPixel(15),
        height: Pixel.getPixel(15),
        margin: Pixel.getPixel(5),
        borderWidth: Pixel.getPixel(1),
        borderRadius: Pixel.getPixel(15),
        borderColor: FontAndColor.COLORB0,
        backgroundColor: FontAndColor.COLORB0,
    },
    topMessageStyle: {
        fontSize: Pixel.getFontPixel(17),
        color: FontAndColor.COLORA0,
    },
    topMessageWStyle: {
        fontSize: Pixel.getFontPixel(17),
        color: FontAndColor.COLORB2,
    },
    padResultsStyle: {
        flexDirection: 'column',
        marginVertical:Pixel.getPixel(20)

    },
    bottomSytle: {
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        color: FontAndColor.COLORA2,
    },
});