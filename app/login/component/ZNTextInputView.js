/**
 * Created by zhengnan on 2018/8/14.
 */


import React,{Component,PropTypes} from 'react';
import {
    TextInput,
    View,
    Dimensions
} from 'react-native';

import * as fontAndColor from "../../constant/fontAndColor";
import PixelUtil from "../../utils/PixelUtil";
import  {observable} from 'mobx';
import  {observer} from 'mobx-react'
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();


@observer
export default class ZNTextInputView extends Component{

    @observer textValue;


    // 构造
      constructor(props) {
        super(props);

        this.textValue = '';
        this.state = {};
      }

    static propTypes={
        placeholder:PropTypes.string,
        rightView:PropTypes.func,
    }

    static defaultProps={
        placeholder:'请输入'
    }

    render(){
        return(
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                height:Pixel.getPixel(35),
                width:width-Pixel.getPixel(80),
                borderBottomColor:fontAndColor.COLORA3,
                borderBottomWidth:1,
                justifyContent:'space-between'
            }}>
                <TextInput
                    style={{
                    fontSize:fontAndColor.BUTTONFONT30,
                    color:fontAndColor.COLORA0,
                    height: Pixel.getPixel(30),
                    borderColor: fontAndColor.COLORA0,
                    width: Pixel.getPixel(180),
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor: 'white'}}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={fontAndColor.COLORC4}
                    placheolderFontSize={Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}
                    placeholder={this.props.placeholder}
                           {...this.props} />
                {
                    this.props.rightView? this.props.rightView():(<View/>)
                }
            </View>
        )
    }
}

