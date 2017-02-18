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
    TouchableOpacity
} from 'react-native';

const { width,height } = Dimensions.get('window');
import PlateModal from '../component/PlateModal';
const background = require('../../../images/publish/background.png');
const preBg = require('../../../images/publish/car-plate-pre.png');
const proBg = require('../../../images/publish/car-plate.png');

export default class AutoPlate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city:'京'
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

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

    render() {
        return (
            <View style={styles.container}>
                <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                    <PlateModal onClose={this._onClose} ref={(modal) => {this.plateModal = modal}}/>
                    <View style={styles.plateContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{this._openModal()}}
                            style={styles.preContainer}>
                            <Image style={styles.preContainer} source={preBg}>
                                <Text style={styles.fontBold}>{this.state.city}</Text>
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
    fontBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign:'center'
    }
});
