/**
 * Created by zhengnan on 2017/8/3.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    TouchableOpacity,
    Text,
    Image,
    NativeModules,
    Dimensions,
    RefreshControl,
} from 'react-native';

import BaceComponent from '../component/BaseComponent';
import NavigatorView from '../component/AllNavigationView';
import ListFooter           from './znComponent/LoadMoreFooter';
import CarShareCell     from './znComponent/CarShareCell';
import * as fontAndColor from '../constant/fontAndColor';
import * as AppUrls from "../constant/appUrls";
import  {request}           from '../utils/RequestUtil';
import PixelUtil from '../utils/PixelUtil';
import * as weChat from "react-native-wechat";
import CarInfoScene from "./CarInfoScene";
const Pixel = new PixelUtil();
var ScreenWidth = Dimensions.get('window').width;
var shareClass = NativeModules.ZNShareClass;

let carUpperFrameData = [];
let carUpperFramePage = 1;
let carUpperFrameStatus = 1;

export default class CarSharedListScene extends BaceComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        this.shareNumberSum = 0;
        this.isAllSelect = false;
        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id == r2.id});
        this.state = {
            carData:carData,
            isRefreshing: true,
            renderPlaceholderOnly: 'blank',
            carUpperFrameStatus: carUpperFrameStatus,
        };
    }


    initFinish = () => {
        this.setState({renderPlaceholderOnly: 'loading'});
        this.loadData();
    };

    refreshingData = () => {

        this.setState({
            isRefreshing: true,
        });
        this.loadData();

    }
    loadData = () => {

        let url = AppUrls.CAR_USER_CAR;
        carUpperFramePage = 1;
        request(url, 'post', {
            car_status: '1',
            page: carUpperFramePage,
            row: 10,

        }).then((response) => {

            carUpperFrameData=[];
            carUpperFrameStatus = response.mjson.data.status;
            let carData = response.mjson.data.list;
            if (carData.length) {
                for (let i = 0; i < carData.length; i++) {
                    let carItem = carData[i].select = false
                    carUpperFrameData.push(carData[i]);
                }
            }
            if (carUpperFrameData.length) {
                this.setState({
                    carData: this.state.carData.cloneWithRows(carUpperFrameData),
                    isRefreshing: false,
                    renderPlaceholderOnly: 'success',
                    carUpperFrameStatus:carUpperFrameStatus,
                    isCarLong:this.isCarLong,
                });

            } else {
                this.setState({
                    isRefreshing: false,
                    renderPlaceholderOnly: 'null',
                    carUpperFrameStatus: carUpperFrameStatus,
                    isCarLong:this.isCarLong,

                });
            }

        }, (error) => {

            this.setState({
                isRefreshing: false,
                renderPlaceholderOnly: 'error',
                isCarLong:this.isCarLong,
            });

        });

    }

    loadMoreData = () => {

        let url = AppUrls.CAR_USER_CAR;
        carUpperFramePage += 1;
        request(url, 'post', {
            car_status: '1',
            page: carUpperFramePage,
            row: 10,

        }).then((response) => {
            carUpperFrameStatus = response.mjson.data.status;
            let carData = response.mjson.data.list;
            if (carData.length) {
                for (let i = 0; i < carData.length; i++) {

                   let carItem = carData[i].select=false
                    carUpperFrameData.push(carData[i]);
                }

                this.setState({
                    carData:this.state.carData.cloneWithRows(carUpperFrameData),
                    carUpperFrameStatus:carUpperFrameStatus,
                    isCarLong:this.isCarLong,
                });
            } else {

                this.setState({
                    carUpperFrameStatus: carUpperFrameStatus,
                });
            }

        }, (error) => {


        });
    }


    toEnd = () => {

        if (carUpperFrameData.length && !this.state.isRefreshing && carUpperFrameStatus != 2) {
            this.loadMoreData();
        }

    };

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={this.state.carUpperFrameStatus==1? false : true}/>)
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{flex:1,backgroundColor:'white'}}>
                    {this.loadView()}
                    <NavigatorView title="批量分享" backIconClick={this.backPage}/>
                </View>);
        }
        return (

            <View style={styles.rootContainer}>
                {
                    this.state.carData &&
                    <ListView
                        removeClippedSubviews={false}
                        style={styles.listView}
                        dataSource={this.state.carData}
                        ref={'carListView'}
                        initialListSize={10}
                        onEndReachedThreshold={1}
                        stickyHeaderIndices={[]}//仅ios
                        enableEmptySections={true}
                        scrollRenderAheadDistance={10}
                        pageSize={10}
                        renderFooter={this.renderListFooter}
                        onEndReached={this.toEnd}
                        renderRow={this.renderRow}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.refreshingData}
                                tintColor={[fontAndColor.COLORB0]}
                                colors={[fontAndColor.COLORB0]}/>}
                    />
                }
                <NavigatorView title="批量分享" backIconClick={this.backPage} />
                <FootView ref="footView" allSelectClicl={this.allSelectBtnClick} carNumber={this.shareNumberSum} isSelect={this.isAllSelect} shareBtnClick={this.shareBtnClick}/>
            </View>
        )
    }

    renderRow =(rowData,sectionID, rowID, highlightRow)=>{

        return(
            <CarShareCell carCellData={rowData} cellClick={this.carCellClick}  type={1} cellSelectBtnclick={this.cellSelectBtnclick} index={rowID}/>
        )
    }

    carCellClick = (carData) => {
        let navigatorParams = {
            name: "CarInfoScene",
            component: CarInfoScene,
            params: {
                carID: carData.id,
            }
        };
        this.toNextPage(navigatorParams);

    }

    allSelectBtnClick=(type)=>{
        for(let carItem of carUpperFrameData)
        {
            carItem.select = type;
        }
        this.shareNumberSum = type? carUpperFrameData.length:0;

        this.setState(
            {
                carData:this.state.carData.cloneWithRows(carUpperFrameData)
            },
        );

        this.isAllSelect = type;
        this.refs.footView.setAllSelectBtn(this.isAllSelect,this.shareNumberSum);

    }
    cellSelectBtnclick=(type,rowID)=>{
        carUpperFrameData[parseInt(rowID)].select = type;
        if(type){
            this.shareNumberSum+=1;
        }else {
            this.shareNumberSum-=1;
        }
        this.isAllSelect = this.shareNumberSum == carUpperFrameData.length ? true:false;
        console.log('isAllSelect',this.isAllSelect,carUpperFrameData.length);
        this.refs.footView.setAllSelectBtn(this.isAllSelect,this.shareNumberSum);

        this.setState(
            {
                carData:this.state.carData.cloneWithRows(carUpperFrameData)
            },
        );

    }

    sumShareNumber =()=>{
       let carShareArray = [];
        for(let carItem of carUpperFrameData)
        {
            if(carItem.select){

                carShareArray.push(carItem);
            }
        }
        return carShareArray;

    }

    shareBtnClick=(type)=>{

       let carShareArray = this.sumShareNumber();

       if(carShareArray.length<=0){

           this.props.showToast('请选择分享的车辆');
           return;
       }

        if(type==1){

           let carShareItemArray = [];
           for(let carData of carShareArray){
               let imagArray = [];
               for (let i =0;i<carData.imgs.length;i++)
               {
                   imagArray.push({image:carData.imgs[i].url});
               }
               carShareItemArray.push(imagArray);
           }
           shareClass.shareAction(carShareItemArray).then((data) => {

               this.props.showToast(data);

           }, (error) => {

               this.props.showToast('分享已取消');
           });
       }
       else if(type==2)
       {
           let carInfoItemArray = [];
           for(let carData of carShareArray){

               let fenxiangUrl = '';
               if (AppUrls.BASEURL == 'http://api-gateway.test.dycd.com/') {
                   fenxiangUrl = AppUrls.FENXIANGTEST;
               } else {
                   fenxiangUrl = AppUrls.FENXIANGOPEN;
               }
               carInfoItemArray.push([{url:fenxiangUrl + '?id=' + carData.id},{image:carData.img},{title:carData.model_name}]);
           }

           console.log(carInfoItemArray);
           shareClass.shareAction(carInfoItemArray).then((data) => {

               this.props.showToast(data);

           }, (error) => {

               this.props.showToast('分享已取消');
           });

       }
       else if(type==3)
       {
           if(carShareArray.length>9)
           {
               this.props.showToast('多车分享最多不能超过9辆');
               return;
           }
           let carShareItemArray = [];
           for(let carData of carShareArray){
               carShareItemArray.push({image:carData.img});
           }
           shareClass.shareAction([carShareItemArray]).then((data) => {

               this.props.showToast(data);

           }, (error) => {

               this.props.showToast('分享已取消');
           });
       }

    }
}


class FootView extends Component{

    render(){
        return(
            <View style={styles.footView}>
                <View style={styles.footViewHead}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{this.props.allSelectClicl(!this.props.isSelect)}}>
                            <Image source={this.state.imgSource}/>
                        </TouchableOpacity>
                        <Text style={{fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),color:fontAndColor.COLORA0,marginLeft:Pixel.getPixel(5)}}>全选</Text>
                    </View>
                    <Text style={{fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),color:fontAndColor.COLORA0,}}>合计车辆:{this.state.carNumber}台</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <View style={{alignItems:'center',justifyContent:'space-between',width:ScreenWidth - Pixel.getPixel(30),height:Pixel.getPixel(44),
                        flexDirection:'row'
                    }}>
                        <ShareBtn title={'九宫格分享'} shareBtnClick={()=>{this.props.shareBtnClick(1)}}/>
                        <ShareBtn title={'链接分享'} shareBtnClick={()=>{this.props.shareBtnClick(2)}}/>
                        <ShareBtn title={'多车分享'} shareBtnClick={()=>{this.props.shareBtnClick(3)}}/>
                    </View>
                </View>
            </View>)
    }
    // 构造
      constructor(props) {
        super(props);

          this.state = {
              carNumber:this.props.carNumber,
              imgSource: this.props.isSelect?require('../../images/carSourceImages/carSelectImgHigh.png') : require('../../images/carSourceImages/carSelectImg.png'),
          };
      }

    setAllSelectBtn=(type,carNumbser)=>{

        this.props.isSelect = type;
        this.props.carNumber = carNumbser;
        this.setState({
            carNumber:carNumbser,
            imgSource:type?require('../../images/carSourceImages/carSelectImgHigh.png') : require('../../images/carSourceImages/carSelectImg.png'),
        });
    }
}


class ShareBtn extends Component {

    render(){
        return(
            <TouchableOpacity onPress={()=>{this.props.shareBtnClick()}}>
                <View style={{borderWidth:Pixel.getPixel(1),borderColor:fontAndColor.COLORB0,justifyContent:'center',
                    alignItems:'center', width:Pixel.getPixel(100),height:Pixel.getPixel(32),backgroundColor:'white',
                    borderRadius:Pixel.getPixel(2)
                }}>
                    <Text style={{color:fontAndColor.COLORB0, fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28)}}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }


}


const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
        paddingTop: Pixel.getTitlePixel(64),
    },
    listView: {
        backgroundColor: fontAndColor.COLORA3,
        marginBottom:Pixel.getPixel(88),
    },
    footView:{
        left:0,
        right:0,
        bottom:0,
        backgroundColor:'white',
        height:Pixel.getPixel(88),
    },
    footViewHead:{
        paddingHorizontal:Pixel.getPixel(15),
        height:Pixel.getPixel(44),
        borderBottomColor:fontAndColor.COLORA3,
        borderBottomWidth:Pixel.getPixel(1),
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },

})