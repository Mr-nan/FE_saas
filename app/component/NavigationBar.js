import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, View, Text} from "react-native";
import MyButton from "./MyButton";
import * as FontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
var Pixel = new PixelUtil();

export default class NavigationBar extends Component {

    static defaultProps = {
        leftTextShow: false,
        leftImageShow: true,
        centerTextShow: true,
        rightTextShow: true,

        leftText: "",
        leftImage: require('../../images/login/navigotion_back.png'),
        centerText: "注册",
        rightText: "提交",
    };

    static propTypes = {
        leftTextShow: PropTypes.bool,
        leftImageShow: PropTypes.bool,
        // centerTextShow: PropTypes.bool,
        // rightTextShow: PropTypes.bool,

        leftText: PropTypes.string,
        leftImage: PropTypes.number,
        centerText: PropTypes.string,
        rightText: PropTypes.string,

        leftTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        leftImageStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        centerTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        rightTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        titleVeiwSytle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

        leftTextCallBack: PropTypes.func,
        leftImageCallBack: PropTypes.func,
        // centerTextCallBack: PropTypes.func,
        rightTextCallBack: PropTypes.func,
    }

    render() {
        return (
            <View style={[styles.titleStyle, this.props.titleVeiwSytle]}>

                {this.props.leftTextShow ?
                    <MyButton buttonType={MyButton.TEXTBUTTON}
                              content={this.props.leftText}
                              childStyle={[styles.leftTextStyle, this.props.leftTextStyle]}
                              mOnPress={this.props.leftTextCallBack}/>
                    : null
                }

                {this.props.leftImageShow ?
                    <MyButton buttonType={MyButton.IMAGEBUTTON}
                              content={this.props.leftImage}
                              parentStyle={styles.buttonStyle}
                              childStyle={[styles.leftImageStyle, this.props.leftImageStyle]}
                              mOnPress={this.props.leftImageCallBack}/>
                    : null
                }


                <Text style={[styles.centerTextStyle, this.props.centerTextStyle]}>
                    {this.props.centerText}
                </Text>

                <MyButton buttonType={MyButton.TEXTBUTTON} content={this.props.rightText}
                          childStyle={[styles.rightTextStyle, this.props.rightTextStyle]}
                          mOnPress={this.props.rightTextCallBack}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: Pixel.getPixel(80),
        paddingTop: Pixel.getPixel(5),
        paddingBottom: Pixel.getPixel(5),
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
    titleStyle: {
        height: Pixel.getPixel(64),
        paddingTop: Pixel.getPixel(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#05C5C2',
    },
    leftTextStyle: {
        textAlign: 'left',
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT),
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        paddingTop: Pixel.getPixel(5),
        paddingBottom: Pixel.getPixel(5),
        color: FontAndColor.COLORA3,
        width: Pixel.getPixel(80),
    },
    rightTextStyle: {
        textAlign: 'right',
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT),
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        paddingTop: Pixel.getPixel(5),
        paddingBottom: Pixel.getPixel(5),
        color: FontAndColor.COLORA3,
        width: Pixel.getPixel(80),
    },
    centerTextStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: Pixel.getFontPixel(FontAndColor.NAVIGATORFONT),
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        color: FontAndColor.COLORA3,
    },
    leftImageStyle: {
        width: Pixel.getPixel(20),
        height: Pixel.getPixel(20),
    },
});