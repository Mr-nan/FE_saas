/**
 * Created by hanmeng on 2018/1/8.
 */
import React, {PureComponent} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
} from  'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import SelectPickUp from "../orderwuliu/SelectPickUp";
const Pixel = new PixelUtil();

export default class ExtractCarPeople extends PureComponent {

    /**
     *  初始化
     * @param props
     **/
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     *  页面 Receive
     * @param nextProps new Props
     **/
    componentWillReceiveProps(nextProps) {

    }

    /**
     *  render
     **/
    render() {
        return (
            <TouchableOpacity style={{backgroundColor: '#ffffff'}}
                              onPress={() => {
                                  this.toNextPage({
                                      name: 'SelectPickUp',
                                      component: SelectPickUp,
                                      params: {}

                                  });
                              }}>
                <View style={{
                    height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                    paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                }}>
                    <Text >提车人</Text>
                    <View style={{flex: 1}}/>
                    <Text >选择</Text>
                    <Image source={require('../../../../images/mainImage/celljiantou.png')}/>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    }
});