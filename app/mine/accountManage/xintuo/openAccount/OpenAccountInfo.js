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
import SaasText from "../../zheshangAccount/component/SaasText";
import MyButton from '../../../../component/MyButton'


let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

export default class OpenAccountBaseScene extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            renderPlaceholderOnly: 'loading',
            isCombination: true,  /// 是否是三证合一
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



                    <ProcessIndicator step={2}/>
                    <View style={{marginTop:Pixel.getPixel(15)}}>
                        <InformationInputItem
                            ref={'name'}
                            title={'开户行名称'}
                            textPlaceholder={''}
                            keyboardType={'default'}
                            onChangeText={this.bank}
                            loading={this.state.loading_bank}
                            annotation={this.state.bankName}

                        />
                        <InformationInputItem
                            ref={'address'}
                            title={'开户行所在地'}
                            textPlaceholder={''}
                            keyboardType={'default'}
                            onChangeText={this.bank}
                            loading={this.state.loading_bank}
                            annotation={this.state.bankName}

                        />
                        <InformationInputItem
                            ref={'detail'}
                            title={'开户行所在地'}
                            textPlaceholder={''}
                            keyboardType={'default'}
                            onChangeText={this.bank}
                            loading={this.state.loading_bank}
                            annotation={this.state.bankName}
                            separator={false}
                        />



                    </View>

                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'下一步'}
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
        marginHorizontal:Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Pixel.getPixel(53),
        borderRadius:2
    },

    next_childStyle: {
        fontSize: 16,
        color: 'white',
        marginVertical:Pixel.getPixel(15)
    }



})
