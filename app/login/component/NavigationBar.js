import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, View, Text} from "react-native";
import MyButton from "../../component/MyButton";
import * as FontAndColor from "../../constant/fontAndColor";

export default class NavigationBar extends Component {

    static defaultProps = {
        leftTextShow: false,
        leftImageShow: true,
        centerTextShow: true,
        rightTextShow: true,

        leftText: "",
        leftImage: require('../../../images/login/navigotion_back.png'),
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
                              parentStyle={styles.buttonStyle}
                              childStyle={[styles.titleTextStyle, this.props.leftTextStyle]}
                              mOnPress={this.props.leftTextCallBack}/>
                    : null
                }

                {this.props.leftImageShow ?
                    <MyButton buttonType={MyButton.IMAGEBUTTON}
                              content={this.props.leftImage}
                              parentStyle={[styles.buttonStyle, {
                                  paddingLeft: 15,
                                  paddingRight: 15,
                              }]}
                              childStyle={[styles.leftImageStyle, this.props.leftImageStyle]}
                              mOnPress={this.props.leftImageCallBack}/>
                    : null
                }


                <Text style={[styles.centerTextStyle, this.props.centerTextStyle]}>
                    {this.props.centerText}
                </Text>

                <MyButton buttonType={MyButton.TEXTBUTTON} content={this.props.rightText}
                          parentStyle={styles.buttonStyle}
                          childStyle={[styles.titleTextStyle, this.props.rightTextStyle]}
                          mOnPress={this.props.rightTextCallBack}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {},
    titleStyle: {
        height: 64,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#05C5C2',
    },
    titleTextStyle: {
        textAlign: 'center',
        fontSize: 15,
        paddingLeft: 15,
        paddingRight: 15,
        color: FontAndColor.COLORA3,
    },
    centerTextStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 17,
        paddingLeft: 15,
        paddingRight: 15,
        color: FontAndColor.COLORA3,
    },
    leftImageStyle: {
        width: 20,
        height: 20,
    }
});