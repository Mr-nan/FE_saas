import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    InteractionManager,
    TouchableWithoutFeedback
} from "react-native";
import BaseComponent from "../../component/BaseComponent";
import PixelUtil from "../../utils/PixelUtil";
import * as FontAndColor from "../../constant/fontAndColor";
import NavigationBar from "../../component/NavigationBar";

var Pixel = new PixelUtil();
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
var onePT = 1 / PixelRatio.get(); //一个像素
export default class Setting extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
        }
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
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={"设置"}
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
                    centerText={"关于服务平台"}
                    rightText={""}
                    leftImageCallBack={this.backPage}/>
                <Image source={require("./../../../images/login/add.png")} style={styles.logoStyle}/>
                <Text style={{
                    marginTop: 15,
                    fontSize: FontAndColor.LITTLEFONT,
                    color: FontAndColor.COLORA0
                }}>当前版本1.0</Text>
                <Image source={require("./../../../images/login/add.png")} style={styles.QRCodeStyle}/>
                <Text
                    style={{color: FontAndColor.COLORA0, fontSize: Pixel.getPixel(17), fontWeight: 'bold'}}>扫描二维码</Text>
                <Text style={{
                    fontSize: FontAndColor.LITTLEFONT,
                    color: FontAndColor.COLORA0,
                    marginTop: Pixel.getPixel(10),
                }}>您的朋友也可以下载服务平台客户端</Text>
                <View style={{flex: 1}}/>
                <Text style={{
                    fontSize: FontAndColor.CONTENTFONT,
                    color: FontAndColor.COLORA1,
                    marginTop: Pixel.getPixel(10),
                    marginBottom: Pixel.getFontPixel(20),
                }}>Copyright第一车贷版权所有</Text>

            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
    },
    logoStyle: {
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(100),
        marginTop: Pixel.getPixel(65),
    },
    QRCodeStyle: {
        width: Pixel.getPixel(128),
        height: Pixel.getPixel(128),
        marginTop: Pixel.getPixel(90),
        marginBottom: Pixel.getPixel(20),
    }
});