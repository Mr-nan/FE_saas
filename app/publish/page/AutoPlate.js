/**
 * Created by Administrator on 2017/2/10.
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();

const { width,height } = Dimensions.get('window');
import PlateModal from '../component/PlateModal';
const background = require('../../../images/publish/background.png');
const preBg = require('../../../images/publish/car-plate-pre.png');
const proBg = require('../../../images/publish/car-plate.png');

export default class AutoPlate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city:'京',
            renderPlaceholderOnly: true
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    componentWillUnmount() {

    }

    _openModal = ()=>{
        this.plateModal.openModal();
    };

    _onClose =(city)=>{
        this.setState({
            city:city
        });
    };

    _renderPlaceholderView = ()=>{
        return(<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background} />);
    };

    _onBack = ()=>{

    };

    _renderRihtFootView = ()=>{
        return(
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{}}>
                <Text style={styles.rightTitleText}>完成</Text>
            </TouchableOpacity>
        );
    };

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={styles.container}>
                <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                    <PlateModal onClose={this._onClose} ref={(modal) => {this.plateModal = modal}}/>
                    <AllNavigationView
                        backIconClick={this._onBack}
                        title='填写车牌号'
                        wrapStyle={styles.wrapStyle}
                        renderRihtFootView={this._renderRihtFootView} />
                    <View style={styles.plateContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{this._openModal()}}
                            style={styles.preContainer}>
                            <Image style={styles.preContainer} source={preBg}>
                                <Text style={styles.fontPre}>{this.state.city}</Text>
                            </Image>
                        </TouchableOpacity>

                        <Image style={styles.proContainer} source={proBg}>
                            <TextInput style={styles.fontBold} underlineColorAndroid='transparent' defaultValue={'N'}/>
                            <TextInput style={styles.fontBold} underlineColorAndroid='transparent' defaultValue={'S'}/>
                            <TextInput style={styles.fontBold} underlineColorAndroid='transparent' defaultValue={'2'}/>
                            <TextInput style={styles.fontBold} underlineColorAndroid='transparent' defaultValue={'5'}/>
                            <TextInput style={styles.fontBold} underlineColorAndroid='transparent' defaultValue={'6'}/>
                            <TextInput style={styles.fontBold} underlineColorAndroid='transparent' defaultValue={'9'}/>
                        </Image>
                    </View>
                </Image>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        width:width,
        backgroundColor: 'transparent'
    },
    imgContainer: {
        width:width,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    plateContainer: {
        flexDirection: 'row',
        marginTop: 207,
    },
    preContainer: {
        height: 44,
        width: 44,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    proContainer: {
        height: 44,
        width: 259,
        marginLeft: 13,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    fontPre: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign:'center'
    },
    fontBold: {
        height: 44,
        width: 40,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign:'center'
    },
    wrapStyle:{
        backgroundColor:'transparent'
    },
    rightTitleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'right',
        backgroundColor: 'transparent'
    }
});
