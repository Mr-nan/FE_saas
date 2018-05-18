/**
 * Created by zhengnan on 2018/5/8.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    NativeModules,
    Platform,
    Linking,
    TextInput,
    Animated,
    KeyboardAvoidingView,
    ListView
} from 'react-native'

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationBar from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../../finance/repayment/component/RepaymenyTabBar';

import * as Net from '../../utils/RequestUtil';
import * as AppUrls from '../../constant/appUrls';
import LogisCarInfoScene from "./LogisCarInfoScene";

export default class NewLogisticsInfoScene extends BaseComponent {


    constructor(props) {
        super(props)

        this.state = {
            renderPlaceholderOnly: 'loading'
        }
        this.cars = {}

    }

    initFinish() {

        this.loadData()
    }

    /*   v2/order.logistics_flows/getTransDetails  接口返回的数据格式

             {
            "all_data": {
                "data": [{
                    "item_id": 42,
                    "trans_id": 83,
                    "car_name": "2013款 途观 豪华版 1.8TSI 手自一体 两驱",
                    "tms_vin": "",
                    "status": 7
                }, {
                    "item_id": 43,
                    "trans_id": 83,
                    "car_name": "2013款 途观 豪华版 1.8TSI 手自一体 两驱",
                    "tms_vin": "",
                    "status": 7
                }],
                "total": 2
            },
            "stay_data": {
                "data": [],
                "total": 0
            },
            "on_the_way": {
                "data": [],
                "total": 0
            },
            "arrive_data": {
                "data": [{
                    "item_id": 42,
                    "trans_id": 83,
                    "car_name": "2013款 途观 豪华版 1.8TSI 手自一体 两驱",
                    "tms_vin": "",
                    "status": 7
                }, {
                    "item_id": 43,
                    "trans_id": 83,
                    "car_name": "2013款 途观 豪华版 1.8TSI 手自一体 两驱",
                    "tms_vin": "",
                    "status": 7
                }],
                "total": 2
            }
        }
     */

    loadData = () => {

        let params = {
            company_id: global.companyBaseID,
            trans_id: this.props.order.trans_id,
        }

        Net.request(AppUrls.ORDER_LOGISTICS_DETIAL, 'post', params).then((response) => {
            let data = response.mjson.data;

            if (typeof data === 'undefined') {
                this.setState({
                    renderPlaceholderOnly: 'noData',
                })
                return;
            }
            this.cars = data
            this.setState({
                renderPlaceholderOnly: 'success',
                isRefreshing: false
            })
        }, (error) => {

            this.setState({
                renderPlaceholderOnly: "failure",
                isRefreshing: false,
            })
            this.props.showToast(error.mjson.msg);

        });

    }


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            // 加载中....
            return ( <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'物流详情'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />
                {this.loadView()}
            </View>);
        }

        return (
            <View style={styles.root}>
                <ScrollableTabView
                    style={styles.ScrollableTabView}
                    initialPage={this.props.page ? this.props.page : 0}
                    locked={true}
                    renderTabBar={this.renderTabBarView}>
                    <LogisticsInfoView
                        onClickCar ={this.onClickCar}
                        carData={this.cars.all_data.data}
                                       tabLabel="ios-paper1"/>
                    <LogisticsInfoView
                        onClickCar ={this.onClickCar}
                        carData={this.cars.stay_data.data}
                                       tabLabel="ios-paper2"/>
                    <LogisticsInfoView
                        onClickCar ={this.onClickCar}
                        carData={this.cars.on_the_way.data}
                                       tabLabel="ios-paper3"/>
                    <LogisticsInfoView
                        onClickCar ={this.onClickCar}
                        carData={this.cars.arrive_data.data}
                                       tabLabel="ios-paper4"/>
                </ScrollableTabView>
                <NavigationBar title="物流详情" backIconClick={this.backPage}/>
            </View>
        )
    }

    renderTabBarView = () => {
        return (
            <RepaymenyTabBar ref={(ref) => {
                this.tabBarView = ref
            }}
                             style={{backgroundColor: 'white'}}
                             tabName={['全部', '待发运', '在途', '已到达']}
                             subName={[this.cars.all_data.data.length, this.cars.stay_data.data.length, this.cars.on_the_way.data.length, this.cars.arrive_data.data.length]}/>
        )
    }


    onClickCar=(car)=>{

        this.toNextPage({
            name:'LogisCarInfoScene',
            component:LogisCarInfoScene,
            params:{
                order:this.props.order,
                car:car
            }
        })
    }
}

class LogisticsInfoView extends BaseComponent {



    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
        this.state = {
            dataSource: ds.cloneWithRows(this.props.carData)
        };
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    renderSeparator={(sectionID, rowID) => {
                        return (<View key={`${sectionID}+${rowID}`}
                                      style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>)
                    }}/>
            </View>
        )
    }

    renderRow = (data) => {


// {
//     "item_id": 43,
//     "trans_id": 83,
//     "car_name": "2013款 途观 豪华版 1.8TSI 手自一体 两驱",
//     "tms_vin": "",
//     "status": 7
// }

        return (

            <TouchableOpacity
                activeOpacity={.9}
                onPress = {()=>{
                    this.props.onClickCar(data)
                }}
            >

                <View style={{
                    flex: 1,
                    paddingHorizontal: Pixel.getPixel(15),
                    paddingVertical: Pixel.getPixel(17),
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    justifyContent: 'space-between'
                }}>
                    <View>
                        <Text
                            style={{color: fontAndColor.COLORA0, fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>{data.car_name}</Text>
                        <Text style={{
                            color: fontAndColor.COLORA1,
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            marginVertical: Pixel.getPixel(10)
                        }}>{'车架号：'+ data.tms_vin}</Text>
                        <Text
                            style={{color: fontAndColor.COLORA1, fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{data.logistics_data.nodeDesc +' | '+ data.logistics_data.nodeTime}</Text>
                    </View>
                    <Image source={require('../../../images/financeImages/celljiantou.png')}/>

                </View>

            </TouchableOpacity>

        )
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: Pixel.getTitlePixel(64),
        backgroundColor: fontAndColor.COLORA3,
    },
})