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

                    <ProcessIndicator step={1}/>
                    <View style={{marginTop: Pixel.getPixel(15)}}>
                        <InformationInputItem
                            ref={'law_name'}
                            title={'法人姓名'}
                            textPlaceholder={''}
                            keyboardType={'default'}
                            onChangeText={this.bank}
                            loading={this.state.loading_bank}
                            annotation={this.state.bankName}
                        />

                        <InformationInputItem
                            ref={'id_no'}
                            title={'身份证号码'}
                            textPlaceholder={''}
                            keyboardType={'default'}
                            onChangeText={this.bank}
                            loading={this.state.loading_bank}
                            annotation={this.state.bankName}
                            separator={false}
                        />

                    </View>

                    <View
                        style={{
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            paddingLeft: Pixel.getPixel(15),
                            paddingVertical: Pixel.getPixel(15),
                            marginTop: Pixel.getPixel(15),
                            alignItems: 'center'
                        }}
                    >
                        <SaasText style={{flex: 1}}>是否三证合一</SaasText>
                        <MyButton buttonType={MyButton.TEXTBUTTON}
                                  content={'是'}
                                  parentStyle={this.state.isCombination ? styles.parentStyle_selected : styles.parentStyle_unselected}
                                  childStyle={this.state.isCombination ? styles.childStyle_selecte : styles.childStyle_unselecte}
                                  mOnPress={() => {
                                      this.setState({
                                          isCombination: true,
                                      })
                                  }}/>
                        <MyButton buttonType={MyButton.TEXTBUTTON}
                                  content={'否'}
                                  parentStyle={!this.state.isCombination ? styles.parentStyle_selected : styles.parentStyle_unselected}
                                  childStyle={!this.state.isCombination ? styles.childStyle_selecte : styles.childStyle_unselecte}
                                  mOnPress={() => {
                                      this.setState({
                                          isCombination: false,
                                      })
                                  }}/>

                    </View>

                    <View style={{marginTop:Pixel.getPixel(15)}}>

                        {
                            this.state.isCombination?
                                <View>
                                    <InformationInputItem
                                        ref={'unification'}
                                        title={'社会统一编码'}
                                        textPlaceholder={''}
                                        keyboardType={'default'}
                                        onChangeText={this.bank}
                                        loading={this.state.loading_bank}
                                        annotation={this.state.bankName}
                                        separator={false}
                                    />
                                </View>

                                :<View>
                                    <InformationInputItem
                                        ref={'organization'}
                                        title={'组织机构代码'}
                                        textPlaceholder={''}
                                        keyboardType={'default'}
                                        onChangeText={this.bank}
                                        loading={this.state.loading_bank}
                                        annotation={this.state.bankName}

                                    />
                                    <InformationInputItem
                                        ref={'license'}
                                        title={'营业执照代码'}
                                        textPlaceholder={''}
                                        keyboardType={'default'}
                                        onChangeText={this.bank}
                                        loading={this.state.loading_bank}
                                        annotation={this.state.bankName}

                                    />
                                    <InformationInputItem
                                        ref={'tex'}
                                        title={'税务登记证号码'}
                                        textPlaceholder={''}
                                        keyboardType={'default'}
                                        onChangeText={this.bank}
                                        loading={this.state.loading_bank}
                                        annotation={this.state.bankName}
                                        separator={false}
                                    />



                                </View>



                        }




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

    parentStyle_selected: {
        borderWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORB0,
        marginRight: Pixel.getPixel(15),
        borderRadius: 2
    },
    childStyle_selecte: {
        color: FontAndColor.COLORB0,
        fontSize: 14,
        marginHorizontal: Pixel.getPixel(25),
        marginVertical: Pixel.getPixel(5)
    },

    parentStyle_unselected: {
        marginRight: Pixel.getPixel(15),
        borderWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA1,
        borderRadius: 2
    },
    childStyle_unselecte: {
        color: FontAndColor.COLORA1,
        fontSize: 14,
        marginHorizontal: Pixel.getPixel(25),
        marginVertical: Pixel.getPixel(5)
    },

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
