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
} from 'react-native'

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationBar from '../../../component/NavigationBar';
import * as fontAndColor from '../../../constant/fontAndColor';
import BaseComponent from '../../../component/BaseComponent';
import * as Net from '../../../utils/RequestUtil';
import * as AppUrls from '../../../constant/appUrls';
import SaasText from "../../accountManage/zheshangAccount/component/SaasText";
import InformationInputItem from './../component/InformationInputItem'
import MyButton from '../../../component/MyButton'

export default class InformationEnter extends BaseComponent {

    constructor(props) {
        super(props);


    }




    render() {
        return (
            <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'信息录入'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />

                <ScrollView
                    style={{paddingTop:Pixel.getPixel(10)}}
                    onScroll={this.onScroll}>
                    <InformationInputItem
                        ref={'organization'}
                        title={'姓名'}
                        textPlaceholder={'真实姓名'}
                        keyboardType={'default'}
                        onChangeText={(text) => {

                        }}
                        annotation={''}

                    />
                    <InformationInputItem
                        ref={'organization'}
                        title={'联系方式'}
                        textPlaceholder={'手机号或固话'}
                        keyboardType={'default'}

                        onChangeText={(text) => {

                        }}
                        annotation={''}

                    />
                    <InformationInputItem
                        ref={'organization'}
                        title={'所在地区'}
                        textPlaceholder={''}
                        keyboardType={'default'}
                        rightIcon={true}
                        rightCallBack={()=>{
                        }}
                        annotation={''}

                    />
                    <InformationInputItem
                        ref={'organization'}
                        title={'详细地址'}
                        textPlaceholder={''}
                        keyboardType={'default'}
                        onChangeText={(text) => {

                        }}
                        annotation={''}

                    />
                    {
                        this.props.from==='收车人'?
                            <InformationInputItem
                                ref={'organization'}
                                title={'身份证号码'}
                                textPlaceholder={'身份证号码'}
                                keyboardType={'default'}
                                onChangeText={(text) => {

                                }}
                                annotation={''}
                                separator={false}

                            />:null

                    }


                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        mOnPress={() => {
                            this.backPage()
                        }}
                        parentStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: Pixel.getPixel(30),
                            backgroundColor: fontAndColor.COLORB0,
                            marginHorizontal: Pixel.getPixel(15),
                            borderRadius: Pixel.getPixel(2)
                        }}
                        childStyle={{fontSize: 15, color: 'white', marginVertical: Pixel.getPixel(15)}}
                        content={'立即保存'}

                    />


                </ScrollView>

            </View>

        )
    }
}


const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
    },

})