/**
 * Created by dingyonggang on 2017/10/27.
 */
import React, {Component, PropTypes} from "react";
import {

    StyleSheet,
    Text,
    View,
    TextInput,
    PixelRatio
} from "react-native";
import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";


let Pixel = new PixelUtil();
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let onePT = 1 / PixelRatio.get(); //一个像素
let Size = 37;


export default class CubeTextInput extends Component {


    constructor(props){
        super(props)
        this.state= {
            values: this.pushVules('')
        }
    }

    pushVules = (text)=>{

        let valueArray = []
        for (let i = 0; i < this.props.count; i++){
            if(i < text.length){
                valueArray.push(Array.from(text)[i]);
            }else {
                valueArray.push('')
            }
        }
        return valueArray
    }

    onChangeText = (text) => {
        this.setState({
            values:this.pushVules(text)
        })
        this.props.onChangeText(text)
    }


    render() {

        let cubes = [];

        for (let i = 0; i < this.props.count; i++) {
            cubes.push(
                <View
                    key={i + ''}
                    style={{
                        borderRightColor: FontAndColor.COLORA4,
                        borderRightWidth: i === this.props.count -1? 0 : StyleSheet.hairlineWidth,
                        width: Size,
                        height: Size,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <Text style={{fontSize: 25}}
                    >{this.state.values[i]}</Text>
                </View>
            )
        }

        return (
            <View
                style={[{flexDirection: 'row', borderWidth: 1, borderColor: FontAndColor.COLORA4,}, this.props.style]}
            >
                {cubes}
                <TextInput
                    keyboardType={'number-pad'}
                    autoFocus={true}
                    maxLength={this.props.count}
                    onChangeText={(text) => {
                        this.onChangeText(text);
                    }}
                />
            </View>
        )
    }
}
