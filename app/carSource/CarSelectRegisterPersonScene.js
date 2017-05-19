/**
 * Created by zhengnan on 2017/5/12.
 */

import React,    {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Dimensions,
    Image,
    Platform,
    InteractionManager
}   from 'react-native';

import BaseComponent from '../component/BaseComponent';
import AllNavigationView from '../component/AllNavigationView';
import CarAddRegisterPersonScene   from './CarAddRegisterPersonScene';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';

import *as appUrls from '../constant/appUrls';
import *as RequestUtil from '../utils/RequestUtil';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;
const IS_ANDROID = Platform.OS === 'android';


let data = [
    '张一丰 1999900000',
    '张二丰 1999900000',
    '张三丰 1999900000',
    '张四丰 1999900000',
    '张五丰 1999900000',
    '张六丰 1999900000',
];

export default class CarSelectRegisterPersonScene extends BaseComponent{
    initFinish=()=>{
        this.loadData();
    }
    // 构造
      constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
           rowHasChanged:(r1,r2)=>r1!==r2,
        });
        this.state = {
            dataSource:dataSource.cloneWithRows(data),
            renderPlaceholderOnly: 'blank',

        };
      }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
    }

    render(){
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{flex:1,backgroundColor:'white'}}>
                    {this.loadView()}
                    <AllNavigationView title="选择登记人" backIconClick={this.backPage} />
                </View>);
        }
        return(
            <View style={styles.rootContainer}>
                <ListView style={{marginBottom:Pixel.getPixel(64)}}
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow}/>
                <AllNavigationView title="选择登记人" backIconClick={this.backPage} />
                <TouchableOpacity onPress={this.addPersonClick}>
                    <View style={styles.footView}>
                        <Image source={require('../../images/carSourceImages/addPerson.png')}/>
                        <Text style={{color:fontAndColor.COLORB0,fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28) }}>  添加新登记人  </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    loadData=()=>{

        this.setState({renderPlaceholderOnly: 'loading'});

        RequestUtil.request(appUrls.GET_REGISTRANT,'post',{'merge_id':this.props.shopID}).then((response) => {

            if(response.mycode == 1){

                if(response.mjson.data.length>0){
                    this.setState({
                        renderPlaceholderOnly: 'success',
                        dataSource:this.state.dataSource.cloneWithRows(response.mjson.data)
                    });
                }else {
                    this.setState({renderPlaceholderOnly: 'null'});
                }


            }else {
                this.setState({renderPlaceholderOnly: 'error'});

            }

        }, (error) => {

            this.setState({renderPlaceholderOnly: 'error'});

        });
    }

    renderRow =(data)=>{
        return(
            <TouchableOpacity
                onPress={()=>{
                    this.props.selectPersonClick(data);
                    this.backPage()}}>
                <View style={styles.cellView}>
                    <Text style={[styles.cellText,data==this.props.currentPerson && {color:fontAndColor.COLORB0}]}>{data.}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    addPersonClick=()=>{
        let navigatorParams = {
            name: "CarAddRegisterPersonScene",
            component: CarAddRegisterPersonScene,
            params: {
                shopID:this.props.shopID,
                upDataAction:this.loadData,
            }
        };
        this.toNextPage(navigatorParams);
    }



}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        backgroundColor:fontAndColor.COLORA3,
    },
    cellView:{
        backgroundColor:'white',
        height:Pixel.getPixel(44),
        borderBottomColor:fontAndColor.COLORA4,
        borderBottomWidth:StyleSheet.hairlineWidth,
        justifyContent:'center',
        alignItems:'center',
    },
    cellText:{
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28) ,
        color:fontAndColor.COLORA0,
    },
    footView:{
        width:sceneWidth - Pixel.getPixel(30),
        height:Pixel.getPixel(44),
        borderWidth:Pixel.getPixel(1),
        borderColor:fontAndColor.COLORB0,
        borderRadius:3,
        left:Pixel.getPixel(15),
        right:Pixel.getPixel(15),
        bottom:Pixel.getPixel(20),
        position:'absolute',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
});