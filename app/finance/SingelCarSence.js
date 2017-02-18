/**
 * Created by lhc on 2017/2/15.
 */
//单车借款列表

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Platform

} from 'react-native';


const {width, height} = Dimensions.get('window');
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
import BaseComponent from '../component/BaseComponent';

const adapeSize = (size) => {

    return Pixel.getPixel(size);
}

const fontdapeSize = (size) => {

    return Pixel.getFontPixel(size);
}

class LendItem extends Component {

    render() {
        return (
            <View style={styles.itemView}>
                <Text style={styles.itemLeftText}>{this.props.leftTitle}</Text>
                <Text style={styles.itemRightText}>{this.props.rightTitle}</Text>
            </View>
        )
    }
}

export class CommenButton extends Component {

    static propTypes = {


        onPress: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,

    }

    render() {

        const {buttonStyle, textStyle, onPress, title}=this.props;

        return (

            <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.8}>

                <Text style={textStyle}>{title}</Text>

            </TouchableOpacity>
        )
    }

}


class LendInputItem extends BaseComponent {

    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.itemView}>

                <Text style={styles.itemLeftText}>借款类型</Text>
                <TextInput underlineColorAndroid={"#00000000"} style={styles.itemInput} placeholder='请输入借款金额'
                           keyboardType={'decimal-pad'}/>
                <Text style={styles.itemPlacehodel}>万</Text>
            </View>

        )
    }
}
class LendDatePike extends Component {

    render() {

        const {onPress}=this.props;

        return (
            <TouchableOpacity
                onPress={onPress}
                style={[styles.itemView, {borderBottomColor: '#d8d8d8', borderBottomWidth: adapeSize(0.5)}] }>
                <Text style={styles.itemLeftText}>用款时间</Text>
                <TextInput underlineColorAndroid={"#00000000"} editable={false}
                           style={[styles.itemInput, {marginRight: adapeSize(17)}]}
                           placeholder={'选择用款时间'}/>
                <Image style={styles.itemPikerDate} source={require('../../images/financeImages/dateIcon.png')}/>
            </TouchableOpacity>
        )
    }
}

class LendUseful extends Component {

    render() {
        return (
            <View style={styles.itemUserful}>
                <Text style={styles.itemLeftText}>用款用途</Text>
                <TextInput underlineColorAndroid={"#00000000"} style={styles.itemUserfulInput} placeholder={'请简要描述借款用途'}
                           multiline={true}/>
            </View>
        )
    }
}
class LendRate extends Component {

    render() {
        return (
            <View style={styles.itemRate}>
                <Image style={styles.itemRateThumb} source={require('../../images/financeImages/lendRate.png')}/>
                <Text style={styles.itemRateText}> 借款费率</Text>
                <Text style={styles.itRateNum}>12.0%</Text>
            </View>
        )
    }

}

export default class SingelCarSence extends BaseComponent {
    initFinish = () => {
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <ScrollView style={{marginTop: 44, backgroundColor: '#f0eff5'}}>


                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={5}>
                        <View style={{
                            paddingTop: adapeSize(15),
                            paddingBottom: adapeSize(10),
                            backgroundColor: '#f0eff5'
                        }}>
                            < LendItem leftTitle='借款主体' rightTitle='单车借款'/>
                            < LendItem leftTitle='借款主体' rightTitle='单车借款'/>
                            < LendItem leftTitle='借款主体' rightTitle='单车借款'/>
                        </View>
                        <View style={{paddingBottom: adapeSize(10), backgroundColor: '#f0eff5'}}>
                            <LendInputItem/>
                        </View>
                        <LendDatePike onPress={() => {

                            alert('申请借款')
                        }}/>
                        <LendUseful/>
                        <LendRate/>

                    </KeyboardAvoidingView>

                </ScrollView>

                <CommenButton
                    buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={() => {

                    alert(1111111);

                }} title='申请借款'/>

            </View>
        )
    }
}


const styles = StyleSheet.create({

    itemView: {

        flexDirection: 'row',
        height: adapeSize(44),
        alignItems: 'center',
        borderBottomColor: '#f0eff5',
        borderBottomWidth: adapeSize(0.5),
        backgroundColor: 'white'

    },
    itemLeftText: {

        marginLeft: adapeSize(15),
        flex: 0.5,
        textAlign: 'left',
        fontSize: fontdapeSize(14),

    },
    itemRightText: {

        marginRight: adapeSize(15),
        flex: 1,
        textAlign: 'right',
        fontSize: fontdapeSize(14),

    },

    itemInput: {

        flex: 1,
        textAlign: 'right',
        fontSize: fontdapeSize(14),
        marginRight: adapeSize(22),
    },
    itemPlacehodel: {

        fontSize: fontdapeSize(14),
        marginRight: adapeSize(15),


    },
    itemPikerDate: {

        marginRight: adapeSize(8),
        width: adapeSize(45 / 2),
        height: adapeSize(45 / 2),
    },
    itemUserful: {

        flexDirection: 'row',
        height: adapeSize(350 / 2),
        alignItems: 'flex-start',
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: adapeSize(0.5),
        backgroundColor: 'white',
        paddingTop: adapeSize(15),
    },
    itemUserfulInput: {

        marginRight: adapeSize(15),
        flex: 0.4,
        textAlign: 'left',
        fontSize: fontdapeSize(14),

    },

    itemRate: {

        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: adapeSize(11)

    },
    itemRateThumb: {

        width: adapeSize(35 / 2),
        height: adapeSize(35 / 2),
        marginLeft: adapeSize(15)

    },

    itemRateText: {

        color: 'red',
        textAlign: 'center',
        marginLeft: adapeSize(7),
        fontSize: fontdapeSize(12),
    },
    itRateNum: {

        color: 'black',
        fontSize: fontdapeSize(12),
    },
    buttonStyle: {


        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        marginLeft: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: adapeSize(16),
        width: width - adapeSize(30),
    },
    textStyle: {

        fontSize: fontdapeSize(15),
        color: '#FFFFFF'

    }
})

