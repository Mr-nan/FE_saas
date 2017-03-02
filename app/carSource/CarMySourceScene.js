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
    RefreshControl,

} from 'react-native';

import BaceComponent from '../component/BaseComponent';
import NavigatorView from '../component/AllNavigationView';
import ListFooter           from './znComponent/LoadMoreFooter';
import SGListView           from 'react-native-sglistview';
import CarInfoScene         from './CarInfoScene';
import EditCarScene         from '../publish/EditCarScene'
import MyCarCell     from './znComponent/MyCarCell';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../finance/repayment/component/RepaymenyTabBar';
import * as fontAndColor from '../constant/fontAndColor';
import * as AppUrls from "../constant/appUrls";
import  {request}           from '../utils/RequestUtil';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

var screenWidth = Dimensions.get('window').width;


let carUpperFrameData = [];
let carDropFrameData = [];
let carAuditData = [];

let carUpperFramePage = 1;
let carUpperFrameStatus =1;

let carDropFramePage = 1;
let carDropFrameStatus =1;

let carAuditPage = 1;
let carAuditStatus =1;

export default class CarMySourceScene extends BaceComponent{


    carCellClick=(carData)=>{
        let navigatorParams = {

            name: "CarInfoScene",
            component: CarInfoScene,
            params: {
                carID: carData.id,
            }
        };
        this.toNextPage(navigatorParams);

    }

    footButtonClick=(typeStr,carData)=>{


        if(typeStr=='上架'){

          this.carAction(2,carData.id);

        }else if(typeStr=='下架'){

            this.carAction(3,carData.id);

        }else if(typeStr=='编辑'){

            let navigatorParams = {

                name: "EditCarScene",
                component: EditCarScene,
                params: {

                    fromNew:false,
                    carId:carData.id,
                }
            };
            this.toNextPage(navigatorParams);
        }
    }


    carAction=(type,carID)=>{

        let url = AppUrls.BASEURL +'v1/car/status';
        request(url,'post',{

            id:carID,
            op_type:type,

        }).then((response) => {

            alert(type==2?'上架成功':'下架成功');


        }, (error) => {

            alert(error.msg);
        });
    }

    render(){
        return(
            <View style={styles.rootContainer}>
            <ScrollableTabView
                style={styles.ScrollableTabView}
                initialPage={0}
                renderTabBar={() =><RepaymenyTabBar style={{backgroundColor:'white'}} tabName={["已上架", "已下架", "未审核"]}/>}>

                <MyCarSourceUpperFrameView  carCellClick={this.carCellClick} footButtonClick={this.footButtonClick}  tabLabel="ios-paper1"/>
                <MyCarSourceDropFrameView   footButtonClick={this.footButtonClick}    tabLabel="ios-paper2"/>
                <MyCarSourceAuditView       footButtonClick={this.footButtonClick}    tabLabel="ios-paper3"/>

            </ScrollableTabView>
            <NavigatorView title='我的车源' backIconClick={this.backPage}/>
        </View>)

    }

}

class MyCarSourceUpperFrameView extends BaceComponent{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id == r2.id });
        this.state = {

            carData:carData,
            isRefreshing:true,
            renderPlaceholderOnly: 'blank',

        };
    }

    initFinish=()=>{

        this.setState({renderPlaceholderOnly: 'loading'});
        this.loadData();
    };

    refreshingData=()=>{

        this.setState({
            isRefreshing:true,
        });
        this.loadData();

    }
    loadData=()=>{

        let url = AppUrls.BASEURL +'v1/user/car'
        carUpperFramePage = 1;
        request(url,'post',{
            car_status:'1',
            page:carUpperFramePage,
            row:10,

        }).then((response) => {

            console.log(response.mjson.data);
            carUpperFrameData.push(...response.mjson.data.list);
            carUpperFrameStatus = response.mjson.data.status;
            if(carUpperFrameData.length)
            {
                this.setState({
                    carData:this.state.carData.cloneWithRows(carUpperFrameData),
                    isRefreshing:false,
                    renderPlaceholderOnly: 'success',

                });

            }else{
                this.setState({
                    isRefreshing:false,
                    renderPlaceholderOnly: 'null',


                });
            }

        }, (error) => {

            console.log(error);
            this.setState({
                isRefreshing:false,
                renderPlaceholderOnly: 'error',

            });

        });

    }

    loadMoreData=()=>{

        let url = AppUrls.BASEURL +'v1/user/car'
        carUpperFramePage += 1;
        request(url,'post',{
            car_status:'1',
            page:carUpperFramePage,
            row:10,

        }).then((response) => {

            console.log(response.mjson.data);
            carUpperFrameStatus = response.mjson.data.status;
            let carData = cresponse.mjson.data.list;
            if(carData.length)
            {
                for(let i=0;i<carData.length;i++)
                {
                    carUpperFrameData.push(carData[i]);
                }

                this.setState({
                    carData:this.state.carData.cloneWithRows(carUpperFrameData),
                });

            }

        }, (error) => {

            console.log(error);

        });
    }



    toEnd =() => {

        if (carUpperFrameData.length && !this.state.isRefreshing && carUpperFrameStatus!=2) {
            this.loadMoreData();
        }

    };

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={carUpperFrameStatus==1? false : true} />)
        }
    }

    render(){
        if (this.state.renderPlaceholderOnly!=='success') {
            return (
                <View style={styles.loadView}>
                    {this.loadView()}
                </View>);
        }
        return(

            <View style={styles.viewContainer}>
                {
                    this.state.carData &&
                    <SGListView style={styles.listView}
                                dataSource={this.state.carData}
                                ref={'carListView'}
                                initialListSize={10}
                                onEndReachedThreshold={1}
                                stickyHeaderIndices={[]}//仅ios
                                enableEmptySections = {true}
                                scrollRenderAheadDistance={10}
                                pageSize={10}
                                renderFooter={this.renderListFooter}
                                onEndReached={this.toEnd}
                                renderRow={(rowData) =><MyCarCell carCellData={rowData}  cellClick={this.props.carCellClick} footButtonClick={this.props.footButtonClick} type={0}/>}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.refreshingData}
                                        tintColor={[fontAndColor.COLORB0]}
                                        colors={[fontAndColor.COLORB0]}
                                    />}
                    />
                }
            </View>
        )
    }

}

class MyCarSourceDropFrameView extends BaceComponent{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id == r2.id });
        this.state = {

            carData:carData,
            isRefreshing:true,
            renderPlaceholderOnly: 'blank',


        };
    }

    initFinish=()=>{
        this.setState({renderPlaceholderOnly: 'loading'});
        this.loadData();
    };

    refreshingData=()=>{

        this.setState({
            isRefreshing:true,
        });
        this.loadData();

    }
    loadData=()=>{

        let url = AppUrls.BASEURL +'v1/user/car'
        carDropFramePage = 1;
        request(url,'post',{
            car_status:'2',
            page:carDropFramePage,
            row:10,

        }).then((response) => {

            console.log(response.mjson.data);
            carDropFrameData.push(...response.mjson.data.list);
            carDropFrameStatus = response.mjson.data.status;
            if(carDropFrameData.length)
            {
                this.setState({
                    carData:this.state.carData.cloneWithRows(carDropFrameData),
                    isRefreshing:false,
                    renderPlaceholderOnly: 'success'

                });

            }else{

                this.setState({
                    isRefreshing:false,
                    renderPlaceholderOnly: 'null'

                });
            }

        }, (error) => {

            console.log(error);
            this.setState({
                isRefreshing:false,
                renderPlaceholderOnly: 'error'
            });

        });

    }

    loadMoreData=()=>{

        let url = AppUrls.BASEURL +'v1/user/car'
        carDropFramePage += 1;
        request(url,'post',{
            car_status:'2',
            page:carDropFramePage,
            row:10,

        }).then((response) => {

            console.log(response.mjson.data);
            carDropFrameStatus = response.mjson.data.status;
            let carData = cresponse.mjson.data.list;
            if(carData.length)
            {
                for(let i=0;i<carData.length;i++)
                {
                    carDropFrameData.push(carData[i]);
                }

                this.setState({
                    carData:this.state.carData.cloneWithRows(carDropFrameData),
                });

            }

        }, (error) => {

            console.log(error);

        });
    }


    toEnd =() => {

        if (carDropFrameData.length && !this.state.isRefreshing && carDropFrameStatus!=2) {
            this.loadMoreData();
        }

    };

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={carDropFrameStatus==1? false : true} />)
        }
    }

    render(){
        if (this.state.renderPlaceholderOnly!=='success') {
            return (
                <View style={styles.loadView}>
                    {this.loadView()}
                </View>);
        }
        return(

            <View style={styles.viewContainer}>
                {
                    this.state.carData &&
                    <SGListView style={styles.listView}
                                dataSource={this.state.carData}
                                ref={'carListView'}
                                initialListSize={10}
                                onEndReachedThreshold={1}
                                stickyHeaderIndices={[]}//仅ios
                                enableEmptySections = {true}
                                scrollRenderAheadDistance={10}
                                pageSize={10}
                                renderFooter={this.renderListFooter}
                                onEndReached={this.toEnd}
                                renderRow={(rowData) =><MyCarCell carCellData={rowData} cellClick={this.props.carCellClick} footButtonClick={this.props.footButtonClick} type={2}/>}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.refreshingData}
                                        tintColor={[fontAndColor.COLORB0]}
                                        colors={[fontAndColor.COLORB0]}
                                    />}
                    />
                }
            </View>
        )
    }

}

class MyCarSourceAuditView extends BaceComponent{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id == r2.id });
        this.state = {

            carData:carData,
            isRefreshing:true,
            renderPlaceholderOnly: 'blank',

        };
    }

    initFinish=()=>{

        this.setState({renderPlaceholderOnly: 'loading'});
        this.loadData();
    };

    refreshingData=()=>{

        this.setState({
            isRefreshing:true,
        });
        this.loadData();

    }
    loadData=()=>{

        let url = AppUrls.BASEURL +'v1/car/preList'
        carAuditPage = 1;
        request(url,'post',{
            page:carAuditPage,
            row:10,

        }).then((response) => {

            console.log(response.mjson.data);
            carAuditData.push(...response.mjson.data.list);
            carAuditStatus = response.mjson.data.status;
            if(carAuditData.length)
            {
                this.setState({
                    carData:this.state.carData.cloneWithRows(carAuditData),
                    isRefreshing:false,
                    renderPlaceholderOnly: 'success'

                });

            }else{

                this.setState({
                    isRefreshing:false,
                    renderPlaceholderOnly: 'null'

                });
            }

        }, (error) => {

            console.log(error);
            this.setState({
                isRefreshing:false,
                renderPlaceholderOnly: 'error'
            });

        });

    }

    loadMoreData=()=>{

        let url = AppUrls.BASEURL +'v1/car/preList'
        carAuditPage += 1;
        request(url,'post',{
            page:carAuditPage,
            row:10,

        }).then((response) => {

            console.log(response.mjson.data);
            carAuditStatus = response.mjson.data.status;
            let carData = cresponse.mjson.data.list;
            if(carData.length)
            {
                for(let i=0;i<carData.length;i++)
                {
                    carAuditData.push(carData[i]);
                }

                this.setState({
                    carData:this.state.carData.cloneWithRows(carAuditData),
                });

            }

        }, (error) => {

            console.log(error);

        });
    }




    toEnd =() => {

        if (carAuditData.length && !this.state.isRefreshing && carAuditStatus!=2) {
            this.loadMoreData();
        }

    };

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={carAuditStatus==1? false : true} />)
        }
    }

    render(){
        if (this.state.renderPlaceholderOnly!=='success') {
            return (
                <View style={styles.loadView}>
                    {this.loadView()}
                </View>);
        }
        return(

            <View style={styles.viewContainer}>
                {
                    this.state.carData &&
                    <SGListView style={styles.listView}
                                dataSource={this.state.carData}
                                ref={'carListView'}
                                initialListSize={10}
                                onEndReachedThreshold={1}
                                stickyHeaderIndices={[]}//仅ios
                                enableEmptySections = {true}
                                scrollRenderAheadDistance={10}
                                pageSize={10}
                                renderFooter={this.renderListFooter}
                                onEndReached={this.toEnd}
                                renderRow={(rowData) =><MyCarCell carCellData={rowData} cellClick={this.props.carCellClick} footButtonClick={this.props.footButtonClick} type={1}/>}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.refreshingData}
                                        tintColor={[fontAndColor.COLORB0]}
                                        colors={[fontAndColor.COLORB0]}
                                    />}
                    />
                }
            </View>
        )
    }

}


const styles = StyleSheet.create({

    rootContainer:{

        flex:1,
        backgroundColor:fontAndColor.COLORA4,

    },
    ScrollableTabView:{

        marginTop: Pixel.getTitlePixel(64),
    },
    loadView:{
        flex: 1,
        backgroundColor: 'white',
        marginTop:5,
    },
    viewContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA4
    },
    listView:{

        backgroundColor:fontAndColor.COLORA4,
        marginTop:5
    }

})