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
    InteractionManager
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
import NewCarScene      from '../publish/NewCarScene';
import * as fontAndColor from '../constant/fontAndColor';
import * as AppUrls from "../constant/appUrls";
import  {request}           from '../utils/RequestUtil';
import CarPublishFirstScene from './CarPublishFirstScene';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

var screenWidth = Dimensions.get('window').width;


let carUpperFrameData = [];
let carDropFrameData = [];
let carAuditData = [];

let carUpperFramePage = 1;
let carUpperFrameStatus = 1;

let carDropFramePage = 1;
let carDropFrameStatus = 1;

let carAuditPage = 1;
let carAuditStatus = 1;

export default class CarMySourceScene extends BaceComponent {


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

    footButtonClick = (typeStr,groupStr,carData) => {

        if (typeStr == '上架') {

            this.carAction(2,groupStr,carData.id);

        } else if (typeStr == '下架') {

            this.carAction(3,groupStr,carData.id);

        } else if (typeStr == '编辑') {

            // let navigatorParams = {
            //
            //     name: "EditCarScene",
            //     component: EditCarScene,
            //     params: {
            //
            //         fromNew: false,
            //         carId: carData.id,
            //     }
            // };
            // this.toNextPage(navigatorParams);
            let navigatorParams = {

                name: "CarPublishFirstScene",
                component: CarPublishFirstScene,
                params: {

                    carID: carData.id,
                }
            };
            this.toNextPage(navigatorParams);
        }
    }


    carAction = (type,groupStr,carID) => {

        this.props.showModal(true);
        let url = AppUrls.CAR_STATUS;
        request(url, 'post', {

            id: carID,
            op_type: type,

        }).then((response) => {

            this.props.showModal(false);
            if (type == 3) {

                this.refs.upperFrameView.refreshingData();
                if((typeof(this.refs.dropFrameView)!= "undefined")){
                    this.refs.dropFrameView.refreshingData();
                }
                this.props.showToast('已成功下架');

            } else if (type == 2) {

                if(groupStr==3){

                    this.refs.auditView.refreshingData();

                }else if(groupStr == 2){

                    this.refs.dropFrameView.refreshingData();
                    this.refs.upperFrameView.refreshingData();
                }
                this.props.showToast('已成功上架');

            }

        }, (error) => {

            this.props.showModal(false);
            alert(error.msg);
        });
    }

    pushNewCarScene = () => {

        let navigatorParams = {

            name: "NewCarScene",
            component: NewCarScene,
            params: {

                fromNew: false,
            }
        };
        this.toNextPage(navigatorParams);
    }

    renderRightFootView = () => {

        return (
            <TouchableOpacity onPress={this.pushNewCarScene}>
                <View style={{paddingVertical:3, paddingHorizontal:5,backgroundColor:'transparent',borderWidth:StyleSheet.hairlineWidth,borderColor:'white',borderRadius:3}}>
                <Text style={{
                    color: 'white',
                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                    textAlign: 'center',
                    backgroundColor: 'transparent',}}>发布车源</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.rootContainer}>
                <ScrollableTabView
                    style={styles.ScrollableTabView}
                    initialPage={0}
                    locked={true}
                    renderTabBar={() =><RepaymenyTabBar style={{backgroundColor:'white'}} tabName={["已上架", "已下架", "未审核"]}/>}>
                    <MyCarSourceUpperFrameView ref="upperFrameView" carCellClick={this.carCellClick} footButtonClick={this.footButtonClick} tabLabel="ios-paper1"/>
                    <MyCarSourceDropFrameView  ref="dropFrameView" carCellClick={this.carCellClick} footButtonClick={this.footButtonClick} tabLabel="ios-paper2"/>
                    <MyCarSourceAuditView  ref="auditView"  carCellClick={this.carCellClick} footButtonClick={this.footButtonClick} tabLabel="ios-paper3"/>

                </ScrollableTabView>
                <NavigatorView title='我的车源' backIconClick={this.backToTop}
                               renderRihtFootView={this.renderRightFootView}/>
            </View>)

    }

}

class MyCarSourceUpperFrameView extends BaceComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id != r2.id});
        this.state = {

            carData:carData,
            isRefreshing: true,
            renderPlaceholderOnly: 'blank',
            carUpperFrameStatus: carUpperFrameStatus,

        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
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

            carUpperFrameData=response.mjson.data.list;
            carUpperFrameStatus = response.mjson.data.status;
            if (carUpperFrameData.length) {
                this.setState({
                    carData: this.state.carData.cloneWithRows(carUpperFrameData),
                    isRefreshing: false,
                    renderPlaceholderOnly: 'success',
                    carUpperFrameStatus:carUpperFrameStatus,
                });

            } else {
                this.setState({
                    isRefreshing: false,
                    renderPlaceholderOnly: 'null',
                    carUpperFrameStatus: carUpperFrameStatus,

                });
            }

        }, (error) => {

            this.setState({
                isRefreshing: false,
                renderPlaceholderOnly: 'error',

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
                    carUpperFrameData.push(carData[i]);
                }

                this.setState({
                    carData:this.state.carData.cloneWithRows(carUpperFrameData),
                    carUpperFrameStatus:carUpperFrameStatus,
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
                <View style={styles.loadView}>
                    {this.loadView()}
                </View>);
        }
        return (

            <View style={styles.viewContainer}>
                {
                    this.state.carData &&
                    <ListView style={styles.listView}
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

class MyCarSourceDropFrameView extends BaceComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id != r2.id});
        this.state = {

            carData: carData,
            isRefreshing: true,
            carDropFrameStatus: carDropFrameStatus,
            renderPlaceholderOnly: 'blank',


        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
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
        carDropFramePage = 1;
        request(url, 'post', {
            car_status: '2',
            page: carDropFramePage,
            row: 10,

        }).then((response) => {

            carDropFrameData = response.mjson.data.list;
            carDropFrameStatus = response.mjson.data.status;
            if (carDropFrameData.length) {
                this.setState({
                    carData: this.state.carData.cloneWithRows(carDropFrameData),
                    isRefreshing: false,
                    renderPlaceholderOnly: 'success',
                    carDropFrameStatus: carDropFrameStatus,

                });

            } else {

                this.setState({
                    isRefreshing: false,
                    renderPlaceholderOnly: 'null',
                    carDropFrameStatus: carDropFrameStatus,

                });
            }

        }, (error) => {

            this.setState({
                isRefreshing: false,
                renderPlaceholderOnly: 'error',
            });

        });

    }

    loadMoreData = () => {

        let url = AppUrls.CAR_USER_CAR;
        carDropFramePage += 1;
        request(url, 'post', {
            car_status: '2',
            page: carDropFramePage,
            row: 10,

        }).then((response) => {

            carDropFrameStatus = response.mjson.data.status;
            let carData = response.mjson.data.list;
            if (carData.length) {
                for (let i = 0; i < carData.length; i++) {
                    carDropFrameData.push(carData[i]);
                }

                this.setState({
                    carData: this.state.carData.cloneWithRows(carDropFrameData),
                    carDropFrameStatus: carDropFrameStatus,
                });

            } else {

                this.setState({
                    carDropFrameStatus: carDropFrameStatus,
                });
            }

        }, (error) => {


        });
    }


    toEnd = () => {

        if (carDropFrameData.length && !this.state.isRefreshing && this.state.carDropFrameStatus != 2) {
            this.loadMoreData();
        }

    };

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={this.state.carDropFrameStatus==1? false : true}/>)
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={styles.loadView}>
                    {this.loadView()}
                </View>);
        }
        return (

            <View style={styles.viewContainer}>
                {
                    this.state.carData &&
                    <ListView style={styles.listView}
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

class MyCarSourceAuditView extends BaceComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id != r2.id});
        this.state = {

            carData: carData,
            isRefreshing: true,
            carAuditStatus: carAuditStatus,
            renderPlaceholderOnly: 'blank',

        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
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

        let url = AppUrls.CAR_PERLIST;
        carAuditPage = 1;
        request(url, 'post', {
            page: carAuditPage,
            row: 10,

        }).then((response) => {

            carAuditData = response.mjson.data.list;
            carAuditStatus = response.mjson.data.status;
            if (carAuditData.length) {
                this.setState({
                    carData: this.state.carData.cloneWithRows(carAuditData),
                    isRefreshing: false,
                    renderPlaceholderOnly: 'success',
                    carAuditStatus: carAuditStatus,

                });

            } else {

                this.setState({
                    isRefreshing: false,
                    renderPlaceholderOnly: 'null',
                    carAuditStatus: carAuditStatus,
                });
            }

        }, (error) => {

            this.setState({
                isRefreshing: false,
                renderPlaceholderOnly: 'error'
            });

        });

    }

    loadMoreData = () => {

        let url = AppUrls.CAR_PERLIST;
        carAuditPage += 1;
        request(url, 'post', {
            page: carAuditPage,
            row: 10,

        }).then((response) => {

            carAuditStatus = response.mjson.data.status;
            let carData = response.mjson.data.list;
            if (carData.length) {
                for (let i = 0; i < carData.length; i++) {
                    carAuditData.push(carData[i]);
                }

                this.setState({
                    carData: this.state.carData.cloneWithRows(carAuditData),
                    carAuditStatus: carAuditStatus,
                });

            } else {
                this.state({
                    carAuditStatus: carAuditStatus,
                })
            }

        }, (error) => {


        });
    }


    toEnd = () => {

        if (carAuditData.length && !this.state.isRefreshing && this.state.carAuditStatus != 2) {

            this.loadMoreData();
        }

    };

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={this.state.carAuditStatus==1? false : true}/>)
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={styles.loadView}>
                    {this.loadView()}
                </View>);
        }
        return (

            <View style={styles.viewContainer}>
                {
                    this.state.carData &&
                    <SGListView style={styles.listView}
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
                                renderRow={(rowData) =><MyCarCell carCellData={rowData} cellClick={this.props.carCellClick} footButtonClick={this.props.footButtonClick} type={3}/>}
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

    rootContainer: {

        flex: 1,
        backgroundColor: fontAndColor.COLORA3,

    },
    ScrollableTabView: {

        marginTop: Pixel.getTitlePixel(64),
    },
    loadView: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Pixel.getPixel(5),
    },
    viewContainer: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    listView: {

        backgroundColor: fontAndColor.COLORA3,
        marginTop: Pixel.getPixel(5),
    }

})