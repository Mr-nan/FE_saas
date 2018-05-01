/**
 * Created by dingyonggang on 2018/04/27/11.
 */

import React, {Component, PropTypes} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    PixelRatio
} from "react-native";
import * as FontAndColor from "../../../../constant/fontAndColor";
import SendMmsCountDown from "../../../../login/component/SendMmsCountDown";
import PixelUtil from "../../../../utils/PixelUtil";
import MyButton from "../../../../component/MyButton";
import SaasText from "../../../accountManage/zheshangAccount/component/SaasText";

let Pixel = new PixelUtil();
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let onePT = 1 / PixelRatio.get(); //一个像素

export default class LicenseImageScene extends Component {

    constructor(props) {
        super(props)
    }


    render() {

        console.log(this.props)

        return (

            <View

                style={{marginLeft: Pixel.getPixel(15), alignItems:'center'}}
            >
                <View
                    style={{
                        width: Pixel.getPixel(87),
                        height: Pixel.getPixel(67),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >

                    <TouchableOpacity
                        onPress={()=>{
                            this.props.onPress()
                        }}
                    >

                        <Image style={{width: Pixel.getPixel(78), height: Pixel.getPixel(58)}}
                               source={this.props.image ? this.props.image : require('../../../../../images/add_photo.png')}/>

                    </TouchableOpacity>

                    {
                        this.props.image ?
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                }}
                                onPress={()=>{
                                    this.props.onDelete()
                                }}
                            >
                                <Image style={{
                                    height: Pixel.getPixel(15),
                                    width: Pixel.getPixel(15),
                                }}

                                       source={require('../../../../../images/delete.png')}
                                />

                            </TouchableOpacity>
                            : null
                    }

                </View>

            </View>

        )
    }


}