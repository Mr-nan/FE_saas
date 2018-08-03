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
import  OpenAccountUploadScene from './OpenAccountUploadScene'
import ChooseBankNameScene from '../component/ChooseBankNameScene'


let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

export default class OpenAccountBaseScene extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            renderPlaceholderOnly: 'loading',
            bank:'',
            location:''
        }
    }


    initFinish() {
        this.setState({
            renderPlaceholderOnly: 'success'
        })
    }

    componentWillUnmount(){
       delete this.props.model.bank_city
       delete this.props.model.bank_provice
       delete this.props.model.rcv_bank_no
       delete this.props.model.rcv_bank_name
       delete this.props.model.bank_net_work
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                <NavigationBar
                    leftImageShow={false}
                    leftTextShow={true}
                    leftText={""}
                    centerText={'开通1车粮票'}
                    rightText={""}
                    leftImageCallBack={this.backPage}

                />
            </View>
        }

        return (
            <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>

                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'开通1车粮票'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />

                <ScrollView>

                    <ProcessIndicator step={2}/>
                    <View style={{marginTop:Pixel.getPixel(15)}}>
                        <InformationInputItem
                            ref={'name'}
                            title={'开户行名称'}
                            textPlaceholder={''}
                            keyboardType={'default'}
                            rightIcon={true}
                            value={this.state.bank}
                            rightCallBack={()=>{
                                this.toNextPage({
                                    component: ChooseBankNameScene,
                                    name: 'ChooseBankNameScene',
                                    params: {
                                        callBack: this.bankComeBack,
                                        bank_card_no: ''
                                    },
                                })

                            }}
                        />
                        <InformationInputItem
                            ref={'address'}
                            title={'开户行所在地'}
                            textPlaceholder={''}
                            keyboardType={'default'}
                            onChangeText={this.bank}
                            rightIcon={true}
                            value={this.state.location}
                            rightCallBack={()=>{

                            }}
                        />

                    </View>

                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'下一步'}
                        parentStyle={styles.next_parentStyle}
                        childStyle={styles.next_childStyle}
                        mOnPress={() => {

                            if (this.verify()){

                                this.toNextPage({
                                    name:OpenAccountUploadScene,
                                    component:OpenAccountUploadScene,
                                    params: {model:this.props.model, showModal:this.props.showModal, callBack:this.props.callBack}
                                })
                            }

                        }}/>
                </ScrollView>

            </View>
        )
    }


    verify = ()=>{

        if (this.state.bank == ''){
            this.props.showToast('请选择开户行名称');
            return false;
        }
        return true
    }

    bankComeBack = (data)=>{

        this.props.model.bank_city = data.city_id;
        this.props.model.bank_provice = data.provice_id;
        this.props.model.rcv_bank_no = data.bankno;
        this.props.model.rcv_bank_name = data.bankname;
        this.props.model.bank_net_work = data.subbankname;

        this.setState({
            bank:data.bankname,
            location:data.provice_name+data.city_name
        })

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
