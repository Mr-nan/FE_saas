/**
 * Created by lhc on 2017/2/17.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,

} from 'react-native';
//ok
import  {
    LendDatePike,
    LendInputItem,
    LendItem,
    LendUseful,
    CommenButton,
    width,
    adapeSize,
    fontdapeSize,
    FEColor,

} from './ComponentBlob'
const ColorFont =new FEColor();

const  imageSouce =require('../../images/financeImages/dateIcon.png')

export default class SingelCarSence extends Component {

    state = {
        maxLend:'',
        lendType:'',
        dateLimit:'',
        rate:'',
    };

//日历按钮事件
    onPress =(changeText)=> {

        changeText('44444')
    }
//申请借款
    onClickLend=()=>{

        this.setState({

            maxLend:'111',
            lendType:'222',
            dateLimit:'333',
            rate:'444',
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroller}>
                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={5}>
                        <View style={{paddingTop: adapeSize(15), paddingBottom: adapeSize(10), backgroundColor: '#f0eff5'}}>
                            < LendItem leftTitle='借款类型' rightTitle={this.state.lendType}/>
                            < LendItem leftTitle='可借额度' rightTitle={this.state.maxLend}/>
                            < LendItem leftTitle='借款费率' rightTitle={this.state.rate}/>
                            < LendItem leftTitle='借款类型' rightTitle={this.state.dateLimit}/>
                        </View>
                        <View style={{paddingBottom: adapeSize(10), backgroundColor: '#f0eff5'}}>
                            <LendInputItem title='金额' placeholder={'请输入借款金额'} unit={'万'}/>
                            <LendDatePike  lefTitle={'用款时间'} placeholder={'请选择用款时间'} imageSouce={imageSouce} onPress={this.onPress}/>
                            <LendUseful/>
                        </View>

                    </KeyboardAvoidingView>

                </ScrollView>

                <CommenButton
                    buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={this.onClickLend} title='申请借款'/>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container:{

        flex:1
    },
    scroller:{

        marginTop: 44,
        backgroundColor:ColorFont.COLORA3
    },

    buttonStyle: {
        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        marginLeft: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: adapeSize(16),
        width:width-adapeSize(30),
    },
    textStyle: {

        fontSize: fontdapeSize(15),
        color: '#FFFFFF'

    }
})