import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    NativeModules,
    Platform,
    Linking,
    TextInput,
    Animated,
    KeyboardAvoidingView
} from 'react-native'

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationBar from '../../../../component/NavigationBar';
import * as fontAndColor from '../../../../constant/fontAndColor';
import BaseComponent from '../../../../component/BaseComponent';
import * as Net from '../../../../utils/RequestUtil';
import * as AppUrls from '../../../../constant/appUrls';
import SaasText from "../../../accountManage/zheshangAccount/component/SaasText";
import MyButton from '../../../../component/MyButton'
import List from "../list/List";


export default class Result extends BaseComponent {


    constructor(props) {
        super(props)



    }

    getImage = ()=>{
        let img = null;
        if (this.props.from === 'offLine'){
             img = require('../../../../../images/carriagePriceImage/支付中.png');
        }else {
            if (this.props.state == 0) { //支付中。。
                 img = require('../../../../../images/carriagePriceImage/支付中.png');
            } else if (this.props.state == 1) { //支付成功
                 img = require('../../../../../images/carriagePriceImage/支付成功.png');
            } else if (this.props.state == 2) {  //支付失败
                 img = require('../../../../../images/carriagePriceImage/支付失败.png');
            }
        }

        return img;
    }

    getState = ()=>{
        let t = null;
        if (this.props.from === 'offLine'){
            t = '支付中';
        }else {
            if (this.props.state == 0) { //支付中。。
                t = '支付中'
            } else if (this.props.state == 1) { //支付成功
                t = '支付成功';
            } else if (this.props.state == 2) {  //支付失败
                t = '支付失败';
            }
        }
        return t;
    }

    getAnnotatio = ()=>{
        let t = null;
        if (this.props.from === 'offLine'){
            t = '系统会在确认运费到账之后，改变您的运单状态， 请随时关注运单变化';
        }else {
            if (this.props.state == 0) { //支付中。。
                t = '运费到账后将自动改变运单状态，请随时关注运单变化'
            } else if (this.props.state == 1) { //支付成功
                t = '';
            } else if (this.props.state == 2) {  //支付失败
                t = '支付失败';
            }
        }
        return t;
    }

    render() {
        return (
            <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'支付结果'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />

                <ScrollView>


                    <View style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: Pixel.getPixel(30)
                    }}>
                        <Image style={{alignItems:'center', justifyContent:'center'}}  source={this.getImage()}>
                            {this.props.from === 'offLine'?
                                <Image style = {{marginTop:Pixel.getPixel(25)}} source={require('../../../../../images/carriagePriceImage/支付中车.png')}/>
                                :null
                            }
                        </Image>
                        <SaasText style={{fontSize: 15,}}>{this.getState()}</SaasText>
                        {
                            <SaasText
                                style={{
                                    fontSize: 13,
                                    fontWeight: '200',
                                    marginTop: Pixel.getPixel(10),
                                    marginHorizontal: Pixel.getPixel(30),
                                    textAlign: 'center'
                                }}>{this.getAnnotatio()}</SaasText>
                        }


                    </View>


                    {
                        this.props.from === 'onLine' ?
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    paddingHorizontal: Pixel.getPixel(15),
                                    marginTop: Pixel.getPixel(10)
                                }}
                            >

                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        borderBottomColor: fontAndColor.COLORA4,
                                        paddingVertical: Pixel.getPixel(15)
                                    }}
                                >

                                    <SaasText
                                        style={{
                                            fontSize: 15,
                                            fontWeight: '200',
                                            color: fontAndColor.COLORA1
                                        }}>支付金额</SaasText>
                                    <SaasText style={{fontSize: 15, fontWeight: '200',}}>5000</SaasText>

                                </View>
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingVertical: Pixel.getPixel(15)
                                    }}
                                >

                                    <SaasText
                                        style={{
                                            fontSize: 15,
                                            fontWeight: '200',
                                            color: fontAndColor.COLORA1
                                        }}>运单号</SaasText>
                                    <SaasText style={{fontSize: 15, fontWeight: '200',}}>8888888888888888</SaasText>

                                </View>


                            </View>

                            : null
                    }


                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'确定'}
                        parentStyle={styles.next_parentStyle}
                        childStyle={styles.next_childStyle}
                        mOnPress={() => {

                            if(this.props.from === 'offLine'){

                                const navi = this.props.navigator;
                                let route = navi.getCurrentRoutes();

                                for(let i = 0; i<route.length; i++){
                                    if (route[i].name === "List"){
                                        this.backToRoute('List')
                                       return;
                                    }
                                }

                                this.toNextPage({
                                    name:'List',
                                    component:List,
                                    params:{}
                                })
                            }else {


                            }
                        }}/>


                </ScrollView>

                {
                    this.props.from === 'onLine' ?
                        <View
                            style={{
                                backgroundColor: 'white',
                                paddingHorizontal: Pixel.getPixel(15),
                                bottom: 0,
                                position: 'absolute',
                                width: width,
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                            }}
                        >


                            <View style={{
                                height: Pixel.getPixel(50.5),
                                backgroundColor: 'white',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>

                                <TouchableOpacity activeOpacity={1} onPress={() => {

                                }}>
                                    <View style={{
                                        width: Pixel.getPixel(100.5),
                                        height: Pixel.getPixel(32.5),
                                        backgroundColor: 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: Pixel.getPixel(2),
                                        borderColor: fontAndColor.COLORA1,
                                        borderWidth: Pixel.getPixel(1),
                                        marginRight: Pixel.getPixel(12)
                                    }}>
                                        <Text style={{
                                            color: fontAndColor.COLORA1,
                                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                                        }}>暂不支付</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => {

                                }}>
                                    <View style={{
                                        width: Pixel.getPixel(100.5),
                                        height: Pixel.getPixel(32.5),
                                        backgroundColor: fontAndColor.COLORB0,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: Pixel.getPixel(2)
                                    }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                                        }}>继续支付</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        : null


                }


            </View>)
    }
}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
    },
    next_parentStyle: {
        backgroundColor: fontAndColor.COLORB0,
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