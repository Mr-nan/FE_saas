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
import AutoPhoto from './page/AutoPhoto';
import AutoType from './page/AutoType';
import AutoDate from './page/AutoDate';
import AutoMileage from './page/AutoMileage';
import NewIndicator from './component/NewIndicator';
import EditCarScene from './EditCarScene';
import BaseComponent from '../component/BaseComponent';

const { width ,height} = Dimensions.get('window');
const background = require('../../images/publish/background.png');

const barHeight = 57;

export default class NewCarScene extends BaseComponent{

    initFinish=()=>{};

    constructor(props){
        super(props);
    }

    navigatorParams = {
        name: 'EditCarScene',
        component: EditCarScene,
        params: {}
    };

    _goToMore = ()=>{
        this.toNextPage(this.navigatorParams);
    };

    render(){
        return(
            <Image style={styles.container}  source={background}>
                <ScrollableTabView
                    tabBarPosition='bottom'
                    renderTabBar={()=>{return(<NewIndicator goToMore={()=>{this._goToMore()}} />)}}>
                    <ModelSelect barHeight={barHeight} tabLabel="ModelSelect" />
                    <AutoPhoto barHeight={barHeight} tabLabel="AutoPhoto" />
                    <AutoType barHeight={barHeight} tabLabel="AutoType" />
                    <AutoDate barHeight={barHeight} tabLabel="AutoDate" />
                    <AutoMileage barHeight={barHeight} tabLabel="AutoMileage"/>
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
    }
});
