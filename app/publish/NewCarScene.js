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

import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
const { width ,height} = Dimensions.get('window');
const background = require('../../images/publish/background.png');

const barHeight = Pixel.getPixel(57);

export default class NewCarScene extends BaseComponent{

    initFinish=()=>{};

    constructor(props){
        super(props);
        this.state = {
            canChange:true,
            carData:{}
        };
    }

    navigatorParams = {
        name: 'EditCarScene',
        component: EditCarScene,
        params: {}
    };

    _goToMore = ()=>{
        this.toNextPage(this.navigatorParams);
    };

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

    _carData = (data:Object)=>{
        this.setState({
            carData:data
        })
    };

    render(){
        return(
            <Image style={styles.container}  source={background}>
                <ScrollableTabView
                    ref={(tab)=>{this.tabView = tab}}
                    tabBarPosition='bottom'
                    locked={this.state.canChange}
                    renderTabBar={()=>{return(<NewIndicator canChange={this.state.canChange} goToMore={()=>{this._goToMore()}} />)}}>
                    <ModelSelect carNumberBack = {this._canChange}
                        onBack={()=>this._onBack(0)} refreshCar={this._carData}
                        barHeight={barHeight} tabLabel="ModelSelect" />
                    <AutoPhoto carData={this.state.carData} onBack={()=>this._onBack(1)} barHeight={barHeight} tabLabel="AutoPhoto" />
                    <AutoType
                        refreshCar={this._carData}
                        carData={this.state.carData}
                        onBack={()=>this._onBack(2)}
                        barHeight={barHeight} tabLabel="AutoType" />
                    <AutoDate carData={this.state.carData} onBack={()=>this._onBack(3)} barHeight={barHeight} tabLabel="AutoDate" />
                    <AutoMileage carData={this.state.carData} onBack={()=>this._onBack(4)} barHeight={barHeight} tabLabel="AutoMileage"/>
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
