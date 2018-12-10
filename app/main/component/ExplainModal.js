/**
 * Created by hanmeng on 2017/5/15.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    AppRegistry,
    View,
    StatusBar,
    Modal,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import PixelUtil from "../../utils/PixelUtil";

let Pixel = new PixelUtil();
let {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../constant/fontAndColor';

export default class ExplainModal extends Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow: false,
            title: '',
            content: '',
            text: '',
            contentView: null,
            data1: [],
            data2: [],
        };
    }

    changeShowType = (value, title, text, data1, data2) => {
        this.setState({
            isShow: value,
            title: title,
            text: text,
            data1: data1,
            data2: data2
        });
    };

    contentView = () => {
        return (
            <View style={{
                backgroundColor: 'white', width: width - width / 4,
                borderTopWidth: 3,
                borderBottomWidth: 3,
                borderColor: fontAndColor.COLORA3
            }}>
                {
                    this.state.data1.map((data, index) => {
                        return (<View key={index + 'data1'} style={{
                            height: Pixel.getPixel(45),
                            flexDirection: 'row', alignItems: 'center',
                            backgroundColor:fontAndColor.COLORB9,
                            paddingHorizontal: Pixel.getPixel(20)
                        }}>
                            <Text style={{fontSize: 15, color: fontAndColor.COLORA1,}}>{data.title}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={{fontSize: 15, color: fontAndColor.COLORA0,}}>{data.value}</Text>
                        </View>)
                    })
                }

                {this.state.data2.length>0&&<View style={{height:Pixel.getPixel(15)}}></View>}
                {
                    this.state.data2.map((data, index) => {
                        return (<View key={index + 'data2'} style={{
                            height: Pixel.getPixel(45), paddingHorizontal: Pixel.getPixel(20),
                            backgroundColor:fontAndColor.COLORB9,
                            flexDirection: 'row', alignItems: 'center',
                        }}
                        >
                            <Text style={{fontSize: 14, color: fontAndColor.COLORA1, flex: 1}}>{data.title}</Text>
                            <Text style={{fontSize: 14, color: fontAndColor.COLORA0}}>{data.value}</Text>
                        </View>)
                    })
                }
            </View>
        )
    }

    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => {
                }}
            >
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
                        width: width - width / 4,
                        //height: Pixel.getPixel(155),
                        backgroundColor: '#fff',
                        paddingLeft: Pixel.getPixel(20),
                        paddingRight: Pixel.getPixel(20),
                        alignItems: 'center',
                        borderRadius: 5
                    }}>
                        <Text allowFontScaling={false} style={{
                            fontSize: Pixel.getPixel(18),
                            fontWeight: 'bold',
                            color: '#000',
                            marginVertical: Pixel.getPixel(20)
                        }}>{this.state.title}</Text>
                        {this.contentView()}
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                isShow: false
                            });
                        }} activeOpacity={0.9} style={this.props.buttonStyle}>
                            <Text allowFontScaling={false} style={this.props.textStyle}>{this.state.text}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}