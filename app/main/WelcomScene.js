/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import ScrollableTabView from 'react-native-scrollable-tab-view';
import BaseComponent from '../component/BaseComponent';

export  default class WelcomScene extends BaseComponent {

    constructor(props, context) {
        super(props, context);
    }


    initFinish = () => {
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <ScrollableTabView
                    style={{ flex: 1}}
                    initialPage={0}
                    prerenderingSiblingsNumber={Infinity}
                    renderTabBar={() => <View />}
                >

                    <Image style={{resizeMode:'stretch',width:width,flex:1}}
                           source={require('../../images/welcomFirst.png')}
                           tabLabel="ios-paper1"/>

                    <Image style={{resizeMode:'stretch',width:width,flex:1}}
                           source={require('../../images/welcomSecond.png')}
                           tabLabel="ios-paper2"/>

                    <Image style={{resizeMode:'stretch',width:width,flex:1}}
                           source={require('../../images/welcomThird.png')}
                           tabLabel="ios-paper3"/>
                    <Image style={{resizeMode:'stretch',width:width,flex:1}}
                           source={require('../../images/welcomFourth.png')}
                           tabLabel="ios-paper4"/>

                </ScrollableTabView>
            </View>
        );

    }
}


const styles = StyleSheet.create({

    image: {

        width: 43,
        height: 43,
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'red',
    },

})