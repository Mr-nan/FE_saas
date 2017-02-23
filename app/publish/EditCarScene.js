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

import DetailModelSelect from './page/DetailModelSelect';
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


import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
const { width ,height} = Dimensions.get('window');
const background = require('../../images/publish/background.png');
const barHeight = Pixel.getPixel(94);

export default class EditScene extends BaseComponent{

    initFinish=()=>{};

    constructor(props){
        super(props);
        this.state = {
            canChange:true
        };
    }


    _onBack = (page) =>{
        if(page === 0){
            this.backPage();
        }else{
            this.tabView.goToPage(page-1);
        }
    };

    _canChange = (change:boolean)=>{
        this.setState({
            canChange:change
        });
    };

    render(){
        return(
            <Image style={styles.container}  source={background}>
            <ScrollableTabView
                ref={(tab)=>{this.tabView = tab}}
                tabBarPosition='bottom'
                locked={this.state.canChange}
                renderTabBar={()=>{return(<EditIndicator canChange={this.state.canChange}/>)}}>
                <DetailModelSelect onBack={()=>this._onBack(0)}
                                   carNumberBack = {this._canChange}
                                   barHeight={barHeight} tabLabel="ModelSelect" />
                <DetailAutoPhoto onBack={()=>this._onBack(1)} barHeight={barHeight} tabLabel="DetailAutoPhoto" />
                <AutoType onBack={()=>this._onBack(2)} barHeight={barHeight} tabLabel="AutoType" />
                <AutoDate onBack={()=>this._onBack(3)} barHeight={barHeight} tabLabel="AutoDate" />
                <AutoPlate onBack={()=>this._onBack(4)} barHeight={barHeight} tabLabel="AutoPlate" />
                <AutoMileage onBack={()=>this._onBack(5)} barHeight={barHeight} tabLabel="AutoMileage" />
                <AutoEmission onBack={()=>this._onBack(6)} barHeight={barHeight} tabLabel="AutoEmission" />
                <AutoLabel onBack={()=>this._onBack(7)} barHeight={barHeight} tabLabel="AutoLabel" />
                <AutoOperation onBack={()=>this._onBack(8)} barHeight={barHeight} tabLabel="AutoOperation" />
                <AutoColor onBack={()=>this._onBack(9)} barHeight={barHeight} tabLabel="AutoColor" />
                <AutoTransfer onBack={()=>this._onBack(10)} barHeight={barHeight} tabLabel="AutoTransfer" />
                <AutoOther onBack={()=>this._onBack(11)} barHeight={barHeight} tabLabel="AutoOther" />
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
