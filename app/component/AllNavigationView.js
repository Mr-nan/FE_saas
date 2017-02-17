/**
 * Created by zhengnan on 17/2/14.
 */

import React, {Component, PureComponent} from 'react';

import {

    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,

} from 'react-native';

import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

export default class CarInfoNavigationView extends PureComponent {

    render() {

        const {title, backIconClick, renderRihtFootView} = this.props;

        return (
            <View style={styles.navigation}>
                <View style={styles.content}>
                    <TouchableOpacity style={{width: Pixel.getPixel(80), height: Pixel.getPixel(44),justifyContent:'center'}}
                                      onPress={backIconClick}>
                        <Image style={styles.backIcon} source={require('../../images/mainImage/navigatorBack.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{title}</Text>
                    <View style={styles.imageFoot}>
                        {
                            renderRihtFootView && renderRihtFootView()
                        }


                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({


    content: {
        marginTop: Pixel.getTitlePixel(20),
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    backIcon: {

        marginLeft: 12,
        height: 20,
        width: 20,
    },

    titleText: {
        color: 'white',
        fontSize: fontAndColor.BUTTONFONT,
        textAlign: 'center',
        backgroundColor: 'transparent',

    },
    imageFoot: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red',
        width: 80,


    },
    navigation: {
        height: Pixel.getTitlePixel(64),
        // height:64,
        backgroundColor: fontAndColor.COLORB0,
        left: 0,
        right: 0,
        position: 'absolute',
        flex: 1
    }

})