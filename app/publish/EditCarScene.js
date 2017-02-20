/**
 * Created by Administrator on 2017/2/16.
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import ModelSelect from './page/ModelSelect';
import DetailAutoPhoto from './page/DetailAutoPhoto';
import AutoType from './page/AutoType';
import AutoDate from './page/AutoDate';
import AutoMileage from './page/AutoMileage';
import AutoPlate from './page/AutoPlate';
import AutoEmission from './page/AutoEmission';
import AutoLabel from './page/AutoLabel';
import AutoOperation from './page/AutoOperation';
import AutoColor from './page/AutoColor';
import AutoTransfer from './page/AutoTransfer';
import AutoOther from './page/AutoOther';
import EditIndicator from './component/EditIndicator';
import BaseComponent from '../component/BaseComponent';

const { width ,height} = Dimensions.get('window');
const background = require('../../images/publish/background.png');

const barHeight = 57;

export default class EditScene extends BaseComponent{

    initFinish=()=>{};

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Image style={styles.container}  source={background}>
            <ScrollableTabView
                tabBarPosition='bottom'
                renderTabBar={()=>{return(<EditIndicator/>)}}>
                <ModelSelect barHeight={barHeight} tabLabel="ModelSelect" />
                <DetailAutoPhoto barHeight={barHeight} tabLabel="DetailAutoPhoto" />
                <AutoType barHeight={barHeight} tabLabel="AutoType" />
                <AutoDate barHeight={barHeight} tabLabel="AutoDate" />
                <AutoPlate barHeight={barHeight} tabLabel="AutoPlate" />
                <AutoMileage barHeight={barHeight} tabLabel="AutoMileage" />
                <AutoEmission barHeight={barHeight} tabLabel="AutoEmission" />
                <AutoLabel barHeight={barHeight} tabLabel="AutoLabel" />
                <AutoOperation barHeight={barHeight} tabLabel="AutoOperation" />
                <AutoColor barHeight={barHeight} tabLabel="AutoColor" />
                <AutoTransfer barHeight={barHeight} tabLabel="AutoTransfer" />
                <AutoOther barHeight={barHeight} tabLabel="AutoOther" />
            </ScrollableTabView>
            </Image>
        );
    };
}
const styles = StyleSheet.create({
    container:{
        width:width,
        flex:1,
        backgroundColor:'transparent'
    },
    page:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});
