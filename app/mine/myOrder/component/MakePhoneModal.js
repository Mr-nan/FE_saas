/**
 * Created by hanmeng on 2017/5/15.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    StatusBar,
    Modal,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import PixelUtil from "../../../utils/PixelUtil";
let Pixel = new PixelUtil();
let {width, height} = Dimensions.get('window');
import  * as fontAndColor from '../../../constant/fontAndColor';
export default class MakePhoneModal extends Component {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow: false,
        };
    }

    changeShowType = (value) => {
        this.setState({
            isShow: value
        });
    }


    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => {
                }}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            isShow: false
                        });
                    }}
                    activeOpacity={1}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)'
                    }}>
                    <View style={{
                        width: Pixel.getPixel(240),
                        height: Pixel.getPixel(160),
                        backgroundColor: '#fff',
                        paddingLeft: Pixel.getPixel(20),
                        paddingRight: Pixel.getPixel(20),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <View style={styles.buttonCancel}>
                            <Text style={{color: fontAndColor.COLORA2}}>取消</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {

                            }}>
                            <View style={styles.buttonConfirm}>
                                <Text style={{color: '#ffffff'}}>确认</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    buttonConfirm: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Pixel.getPixel(15),
        backgroundColor: fontAndColor.COLORB0,
        height: Pixel.getPixel(44),
        width: Pixel.getPixel(200),
        borderRadius: Pixel.getPixel(2),
        borderWidth: Pixel.getPixel(1),
        borderColor: fontAndColor.COLORB0
    },
    buttonCancel: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Pixel.getPixel(15),
        height: Pixel.getPixel(44),
        width: Pixel.getPixel(200),
        borderRadius: Pixel.getPixel(2),
        borderWidth: Pixel.getPixel(1),
        borderColor: fontAndColor.COLORA2
    }
});