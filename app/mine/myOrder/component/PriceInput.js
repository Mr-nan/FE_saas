/**
 * Created by hanmeng on 2017/12/7.
 */
import React, {PureComponent} from 'react';
import {
    Text,
    View,
    Dimensions,
    TextInput,
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export default class PriceInput extends PureComponent {

    /**
     *   constructor
     **/
    constructor(props) {
        super(props);
        this.state = {
            amount: this.props.amount
        }
    }

    /**
     *   清空输入数据
     **/
    clearInputText = () => {
        this.setState({
            value: ''
        });
    };

    /**
     *   render
     **/
    render() {
        return (
            <View style={{height: Pixel.getPixel(44), flexDirection: 'row',alignItems: 'center'}}>
                <Text allowFontScaling={false}
                      style={{fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30), marginLeft: Pixel.getPixel(15)}}>
                    {this.props.title}</Text>
                <TextInput
                    ref='amountInput'
                    defaultValue={this.state.amount + ''}
                    underlineColorAndroid='transparent'
                    onChangeText={this.setNumber}
                    keyboardType='numeric'
                    //clearButtonMode="always"
                    onBlur={this.props.inputOnBlur}
                    style={{
                        flex: 1,
                        textAlign: 'right',
                        //marginLeft: Pixel.getPixel(15),
                        marginRight: Pixel.getPixel(15),
                        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        color: fontAndColor.COLORA2
                    }} placeholder='请输入金额'/>
            </View>
        );
    }

    /**
     *   更新文字内容
     **/
    setNumber = (number) => {
        this.setState({amount: number});
    };

}