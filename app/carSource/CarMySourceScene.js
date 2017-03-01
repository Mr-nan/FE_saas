/**
 * Created by ZN on 17/2/25.
 */

import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ListView,
    ScrollView,

} from 'react-native';

import BaceComponent from '../component/BaseComponent';
import NavigatorView from '../component/AllNavigationView';
import MyCarCell     from './znComponent/MyCarCell';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../finance/repayment/component/RepaymenyTabBar';
import * as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

var screenWidth = Dimensions.get('window').width;


let carData1 = [
    {
        title:'[北京]奔驰S400L(进口)AMG版',
        subTitle:'2016年7月/3万公里',
        imagType:0,

    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:0,

    },
    {
        title:'[北京]奔驰C200L(国产)',
        subTitle:'2016年7月/3万公里',
        imagType:0,

    },
    {
        title:'[北京]宝马X5',
        subTitle:'2016年7月/3万公里',
        imagType:0,

    },

];

let carData2 = [
    {
        title:'[北京]奔驰S400L(进口)AMG版',
        subTitle:'2016年7月/3万公里',
        imagType:2,
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:2,
    },
    {
        title:'[北京]奔驰C200L(国产)',
        subTitle:'2016年7月/3万公里',
        imagType:2,
    },
    {
        title:'[北京]宝马X5',
        subTitle:'2016年7月/3万公里',
        imagType:2,
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:2,
    },

];


let carData3 = [
    {
        title:'[北京]奔驰S400L(进口)AMG版',
        subTitle:'2016年7月/3万公里',
        imagType:1,
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:1,
    },
    {
        title:'[北京]奔驰C200L(国产)',
        subTitle:'2016年7月/3万公里',
        imagType:1,
    },
    {
        title:'[北京]宝马X5',
        subTitle:'2016年7月/3万公里',
        imagType:1,
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:1,
    },

];

export default class CarMySourceScene extends BaceComponent{

    initFinish=()=>{

    };



    checkedClick=(index)=>{

        if(index==1){

            this.setState({carData:this.state.carData.cloneWithRows(carData1)})

        }else {
            this.setState({carData:this.state.carData.cloneWithRows(carData2)})
        }
    }

    carCell=(index)=>{

        alert(index);
    }


    render(){
        return(
            <View style={styles.rootContainer}>
            <ScrollableTabView
                style={{marginTop: Pixel.getTitlePixel(64), flex: 1}}
                initialPage={0}
                renderTabBar={() =><RepaymenyTabBar tabName={["已上架", "已下架", "未审核"]}/>}>

                <MyCarSourceListView carData={carData1} tabLabel="ios-paper1"/>
                <MyCarSourceListView carData={carData2} tabLabel="ios-paper2"/>
                <MyCarSourceListView carData={carData3} tabLabel="ios-paper3"/>

            </ScrollableTabView>
            <NavigatorView title='我的车源' backIconClick={this.backPage}/>
        </View>)

    }

}

class MyCarSourceListView extends Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id == r2.id });
        this.state = {

            carData:carData.cloneWithRows(this.props.carData),

        };
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:fontAndColor.COLORA3}}>
                <ListView style={{backgroundColor:fontAndColor.COLORA3,marginTop:5}}
                    dataSource={this.state.carData}
                    renderRow={(rowData) => <MyCarCell carMainText={rowData.title} carSubText={rowData.subTitle} type={rowData.imagType}/>}/>
            </View>
        )
    }

}



const styles = StyleSheet.create({

    rootContainer:{

        flex:1,
        backgroundColor:'white',

    },

})