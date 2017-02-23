/**
 * from @liusai
 *
 **/
import React, {Component, PureComponent} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
}from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
import SQLiteUtil from '../../utils/SQLiteUtil';
const Pixel = new PixelUtil();
const SQLite = new SQLiteUtil();

const {width, height} = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const scan = require('../../../images/publish/scan.png');
const arrow = require('../../../images/publish/date-select.png');

export default class ModelSelect extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
        SQLite.createTable();
    }

    componentWillUnmount() {

    }

    _scanPress = () => {

    };

    _modelPress = () => {

    };

    _renderPlaceholderView = () => {
        return (<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background}/>);
    };

    _onBack = () => {
        this.props.onBack();
    };

    _renderRihtFootView = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{}}>
                <Text style={styles.rightTitleText}>完成</Text>
            </TouchableOpacity>
        );
    };

    _onVinChange = (text) => {
        if (text.length === 17) {
            //验证
            this.props.carNumberBack(false);
            SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
                [ text ],
                (data) => {
                    if (data.code === 1) {
                        if(data.result.rows.length === 0){
                            SQLite.changeData('INSERT INTO publishCar (vin) VALUES (?)',[ text ])
                        }else{
                            this.props.refreshCar(data.result.rows.item(0));
                        }
                    } else {
                        console.log(data.error);
                    }
                })
        }
    };

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={styles.container}>
                <Image source={background} style={[styles.container,{height:height-this.props.barHeight}]}>
                    <AllNavigationView
                        backIconClick={this._onBack}
                        title='选择车辆款型'
                        wrapStyle={styles.wrapStyle}
                        renderRihtFootView={this._renderRihtFootView}/>
                    <View style={[styles.circleContainer,styles.vinCircle]}>
                        <Text style={[styles.fontMain,styles.leftText]}>车架号</Text>
                        <TextInput
                            style={[styles.fontMain,styles.fillSpace]}
                            underlineColorAndroid='transparent'
                            maxLength={17}
                            onChangeText={this._onVinChange}
                        />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{this._scanPress()}}>
                            <View style={styles.center}>
                                <Text style={[styles.fontMain,styles.rightText]}>扫描</Text>
                                <Image style={styles.imgContainer} source={scan}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.fontHint}>建议您扫描登记证或行驶证上的车架号</Text>
                    <TouchableOpacity
                        style={[styles.circleContainer,styles.modelCircle]}
                        activeOpacity={0.6}
                        onPress={()=>{this._modelPress()}}>
                        <View style={styles.rowCenter}>
                            <Text style={[styles.fontMain,styles.leftText]}>请选择车型</Text>
                            <Text style={[styles.fontMain,styles.fillSpace]}/>
                            <Image style={styles.imgContainer} source={arrow}/>
                        </View>
                    </TouchableOpacity>
                </Image>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: 'transparent'
    },
    vinCircle: {
        marginTop: Pixel.getPixel(209)
    },
    modelCircle: {
        marginTop: Pixel.getPixel(45)
    },
    circleContainer: {
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        marginHorizontal: Pixel.getPixel(35),
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: Pixel.getPixel(22),
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    leftText: {
        marginLeft: Pixel.getPixel(20),
    },
    rightText: {
        marginRight: Pixel.getPixel(7)
    },
    fontMain: {
        color: '#FFFFFF',
        fontSize: Pixel.getFontPixel(14)
    },
    fontHint: {
        marginTop: Pixel.getPixel(10),
        marginLeft: Pixel.getPixel(55),
        color: '#FFFFFF',
        fontSize: Pixel.getFontPixel(12),
        opacity: 0.6,
    },
    imgContainer: {
        width: Pixel.getPixel(18),
        height: Pixel.getPixel(18),
        marginRight: Pixel.getPixel(20)
    },
    fillSpace: {
        flex: 1,
    },
    center: {
        flexDirection: 'row'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    wrapStyle: {
        backgroundColor: 'transparent'
    },
    rightTitleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'right',
        backgroundColor: 'transparent'
    }
});

