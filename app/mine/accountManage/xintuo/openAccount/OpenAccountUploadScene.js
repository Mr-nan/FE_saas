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


let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

let image = require('../../../../../images/banner1.png')

export default class OpenAccountBaseScene extends BaseComponent {

    constructor(props) {
        super(props)

        props.data={
            isCombination:true
        }

        this.state = {
            renderPlaceholderOnly: 'loading',
            isCombination:false
        }
    }


    initFinish() {
        this.setState({
            renderPlaceholderOnly: 'success'
        })
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                <NavigationBar
                    leftImageShow={false}
                    leftTextShow={true}
                    leftText={""}
                    centerText={'开通企业账户'}
                    rightText={""}

                />
            </View>
        }

        return (
            <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>

                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'开通企业账户'}
                    rightText={""}
                />

                <ScrollView>

                    <ProcessIndicator step={3}/>
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
                                title={'身份证-正面'}
                                image = {image}
                            />
                            <LicenseImageScene
                                title={'身份证-正面'}
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
                                this.state.isCombination?

                                    <LicenseImageScene
                                        title={'社会统一代码'}

                                    />

                                    :<View style={{flexDirection:'row'}} >
                                        <LicenseImageScene
                                            title={'组织机构代码'}
                                        />
                                     <LicenseImageScene
                                            title={'营业执照号码'}
                                        />
                                     <LicenseImageScene
                                            title={'税务登记证号码'}
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

                        }}/>

                </ScrollView>


            </View>


        )

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
