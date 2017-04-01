import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';

import *as fontAndColor from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';
import NavigationView from '../component/AllNavigationView';
import CityListScene from './CityListScene';
import CarBrandSelectScene from './CarBrandSelectScene'
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";

let carFilterData = require('./carData/carFilterData.json');
var ScreenWidth = Dimensions.get('window').width;

export default class CarInfoScene extends BaseComponent {


    render() {
        const screeningObject = this.props.screeningObject;
        return (
            <View style={styles.rootContainer}>
                <ScrollView>
                    <SelectView     ref="cityView"     title="地区"       content={screeningObject.checkedCity.title!=''?screeningObject.checkedCity.title:'请选择'} selectCilck={this.pushCitySceneAction}/>
                    <SelectView     ref="carView"      title="品牌车系"    content={(screeningObject.checkedCarType.title!='')?screeningObject.checkedCarType.title:'请选择'} selectCilck={this.pushCarBrandSceneAction}/>
                    <CheckedView    title="车龄" dataArray={carFilterData.carAgeSource}    checkedClick={this.carAgeClick} currentChecked={screeningObject.checkedCarAgeType.title}/>
                    <CheckedView    title="里程" dataArray={carFilterData.carKMSource}     checkedClick={this.carKMClick} currentChecked={screeningObject.checkedCarKMType.title}/>
                    <CheckedView    title="类型" dataArray={carFilterData.carTypeSource}      checkedClick={this.carTypeClick}    currentChecked={screeningObject.checkedCarGenre.title}/>
                </ScrollView>
                <NavigationView title="筛选" backIconClick={this.backPage} renderRihtFootView={this.renderRightFootView}/>
            </View>
        )
    }

    renderRightFootView = () => {

        return (
            <TouchableOpacity onPress={this.completeClick}>
                <View style={{paddingVertical:3, paddingHorizontal:5,backgroundColor:'transparent',borderWidth:StyleSheet.hairlineWidth,borderColor:'white',borderRadius:3}}>
                    <Text style={{
                        color: 'white',
                        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                        textAlign: 'center',
                        backgroundColor: 'transparent',}}>完成</Text>
                </View>
            </TouchableOpacity>
        )
    }

    completeClick=()=>{

        this.props.screeningCompleteClick(this.props.screeningObject);
        this.backPage();
    }

    pushCitySceneAction=()=>{
        let navigatorParams = {
            name: "CityListScene",
            component: CityListScene,
            params: {
                checkedCityClick:this.checkedCityClick,
            }
        }
        this.toNextPage(navigatorParams);
    };

    pushCarBrandSceneAction=()=>{
        let navigatorParams = {
            name: "CarBrandSelectScene",
            component: CarBrandSelectScene,
            params: {
                checkedCarClick:this.checkedCarClick,
                status: 1,
                isHeadInteraction: true,
            }
        }
        this.toNextPage(navigatorParams);
    };

    checkedCityClick=(cityType)=>{
        this.refs.cityView.setContent(cityType.city_name);
        this.props.screeningObject.checkedCity.title = cityType.city_name;
        this.props.screeningObject.checkedCity.value = cityType.city_id;
    }

    checkedCarClick=(carObject)=>{
        let title = carObject.series_id == 0 ? carObject.brand_name : carObject.series_name;
        this.refs.carView.setContent(title);
        this.props.screeningObject.checkedCarType.title = title;
        this.props.screeningObject.checkedCarType.brand_id = carObject.brand_id;
        this.props.screeningObject.checkedCarType.series_id = carObject.series_id;

    }

    carAgeClick=(checkedObject)=>{
        this.props.screeningObject.checkedCarAgeType.title = checkedObject.title;
        this.props.screeningObject.checkedCarAgeType.value = checkedObject.value;
    }

    carKMClick=(checkedObject)=>{
        this.props.screeningObject.checkedCarKMType.title = checkedObject.title;
        this.props.screeningObject.checkedCarKMType.value = checkedObject.value;
    }

    carTypeClick=(checkedObject)=>{
        this.props.screeningObject.checkedCarGenre.title = checkedObject.title;
        this.props.screeningObject.checkedCarGenre.value = checkedObject.value;
    }

}


class SelectView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            content:this.props.content
        };
      }
    render(){
        return(
            <View style={styles.selectView}>
                <View>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
                <TouchableOpacity style={styles.selectRightView} onPress={this.props.selectCilck}>
                    <Text style={styles.contentText}>{this.state.content}</Text>
                    <Image source={require('../../images/financeImages/celljiantou.png')}/>
                </TouchableOpacity>

            </View>
        )
    }

    setContent=(content)=>{
        this.setState({
            content:content,
        });
    }
}

class CheckedView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentChecked:this.props.currentChecked,
        };
      }
    render(){
        return(
            <View style={styles.checkedView}>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <View style={styles.checkedContentView}>
                    {
                        this.props.dataArray.map((data, index) => {
                            return (
                                <TouchableOpacity style={{height:Pixel.getPixel(20), marginTop:Pixel.getPixel(10),marginBottom:Pixel.getPixel(5),
                                }} onPress={()=>
                                {
                                    if(this.state.currentChecked!=data.title){
                                        this.setState({
                                            currentChecked:data.title,
                                        });
                                        this.props.checkedClick({title:data.title,value:data.value});
                                    }

                                }} activeOpacity={1} key={index}>
                                    <View style={[styles.checkedItemView,(this.state.currentChecked==data.title?{borderColor:fontAndColor.COLORB0}:{borderColor:fontAndColor.COLORA2})]}>
                                        <Text style={[styles.checkedItemText,(this.state.currentChecked==data.title?{color:fontAndColor.COLORB0}:{color:fontAndColor.COLORA2})] }>{data.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

class CheckedItemView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isHighlight:this.props.currentChecked==this.props.data.title?true:false,
        };
      }


    closeHighlight=()=>{
        this.setState({
            isHighlight:false,
        });
    };

    render(){
        return(
            <TouchableOpacity style={{height:20, marginTop:10,marginBottom:5,
            }} onPress={()=>
            {
                if(this.state.isHighlight){
                    this.props.checkedClick({title:'',value:'0'});
                }else{
                    this.props.checkedClick({title:this.props.data.title,value:this.props.data.value});
                }
                this.setState({
                    isHighlight:!this.state.isHighlight,
                });

            }}>
                <View style={[styles.checkedItemView,(this.state.isHighlight?{borderColor:fontAndColor.COLORB0}:{borderColor:fontAndColor.COLORA2})]}>
                    <Text style={[styles.checkedItemText,(this.state.isHighlight?{color:fontAndColor.COLORB0}:{color:fontAndColor.COLORA2})] }>{this.props.data.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    rootContainer:{
        flex: 1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(69),
    },
    selectView:{
        height:Pixel.getPixel(44),
        paddingLeft:Pixel.getPixel(15),
        paddingRight:Pixel.getPixel(15),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        marginTop:Pixel.getPixel(10),
    },
    selectRightView:{
        flexDirection:'row',
    },
    checkedView:{
        paddingVertical:Pixel.getPixel(15),
        marginTop:10,
        backgroundColor:'white',
        paddingLeft:Pixel.getPixel(15),

    },
    checkedContentView:{
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    checkedItemView:{

        borderColor:fontAndColor.COLORA2,
        borderWidth:StyleSheet.hairlineWidth,
        marginRight:Pixel.getPixel(15),
        backgroundColor:'white',
        height:Pixel.getPixel(20),
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:Pixel.getPixel(5),
        borderRadius:3,


    },
    checkedItemText:{
        color:fontAndColor.COLORA2,
        fontSize:fontAndColor.CONTENTFONT24,
    },
    titleText:{
        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.LITTLEFONT28,
        fontWeight:'bold'

    },
    contentText:{
        color:fontAndColor.COLORA2,
        fontSize:fontAndColor.LITTLEFONT28,
        marginRight:Pixel.getPixel(5),
    },


});