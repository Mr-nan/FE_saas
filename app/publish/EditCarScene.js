/**
 * Created by Administrator on 2017/2/16.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import DetailModelSelect from './page/DetailModelSelect';
import DetailAutoPhoto from './page/DetailAutoPhoto';
import DetailAutoType from './page/DetailAutoType';
import DetailAutoDate from './page/DetailAutoDate';
import DetailAutoMileage from './page/DetailAutoMileage';
import AutoPlate from './page/AutoPlate';
import AutoEmission from './page/AutoEmission';
import AutoLabel from './page/AutoLabel';
import AutoOperation from './page/AutoOperation';
import AutoColor from './page/AutoColor';
import AutoTransfer from './page/AutoTransfer';
import AutoOther from './page/AutoOther';
import EditIndicator from './component/EditIndicator';
import BaseComponent from '../component/BaseComponent';
import CarSourceScene from '../main/CarSourceScene';

import * as Net from '../utils/RequestUtil';
import SQLiteUtil from '../utils/SQLiteUtil';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
const SQLite = new SQLiteUtil();
const {width} = Dimensions.get('window');
const background = require('../../images/publish/background.png');
const barHeight = Pixel.getPixel(94);

export default class EditScene extends BaseComponent {

    initFinish = () => {
        if (this.fromNew) {
            //从新车页跳过来(根据车架号查询数据)
            console.log('fromNew===' + fromNew + '++++carVin===' + this.carVin);
            SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
                [this.carVin],
                (data) => {
                    if (data.code === 1) {
                        this.setState({
                            carData: data.result.rows.item(0)
                        });
                    } else {
                        console.log(data.error);
                    }
                });
        } else {
            //请求网络数据(根据车源id查询数据)
            let url = 'http://dev.api-gateway.dycd.com/'
                + 'v1/car/detail?token=0ac50af9a02b752ca0f48790dc8ea6d1&device_code=dycd_dms_manage_android';
            let params = {
                id: this.carId,
            };
            Net.request(url, 'post', params).then(
                (response) => {
                    if (response.mycode === 1) {
                        let rd = response.mjson.data;
                        let vinNum = rd.vin;
                        SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
                            [vinNum],
                            (data) => {
                                if (data.code === 1) {
                                    if (data.result.rows.length === 0) {
                                        let rdb = data.result.rows.item(0);
                                        let modelInfo = {};
                                        modelInfo['brand_id'] = rdb[0].brand_id;
                                        modelInfo['model_id'] = rdb[0].model_id;
                                        modelInfo['series_id'] = rdb[0].series_id;
                                        modelInfo['model_year'] = '';
                                        modelInfo['model_name'] = '';
                                        SQLite.changeData('INSERT INTO publishCar (vin,model,pictures,v_type,manufacture,init_reg,' +
                                            'mileage,plate_number,emission_standards,label,nature_use,car_color,trim_color,' +
                                            'transfer_number,dealer_price,describe) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                                            [rdb.vin, JSON.stringify(modelInfo), rdb.v_type, rdb.manufacture, rdb.init_reg, rdb.mileage,
                                                rdb.plate_number, rdb.emission_standards, rdb.label, rdb.nature_use, rdb.car_color, rdb.trim_color,
                                                rdb.transfer_times, rdb.dealer_price, rdb.describe]);
                                        SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
                                            [vinNum],
                                            (data) => {
                                                if (data.code === 1) {
                                                    this.setState({
                                                        carData: data.result.rows.item(0)
                                                    });
                                                } else {
                                                    console.log(data.error);
                                                }
                                            });
                                    } else {
                                        this.setState({
                                            carData: data.result.rows.item(0)
                                        });
                                    }
                                } else {
                                    console.log(data.error);
                                }
                            });
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    };

    constructor(props) {
        super(props);
        this.fromNew = this.props.fromNew;
        this.carVin = this.carVin;
        this.carId = this.props.carId;
        this.state = {
            carData: {}
        };
    }


    _onBack = (page) => {
        if (page === 0) {
            this.backPage();
        } else {
            this.tabView.goToPage(page - 1);
        }
    };

    _canChange = (change: boolean) => {
        this.setState({
            canChange: change
        });
    };

    //发布
    _publish = () => {
        SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
            [this.state.carData.vin],
            (data) => {
                if (data.code === 1) {
                    let rd = data.result.rows.item(0);
                    let modelInfo = JSON.parse(rd.model);
                    let params = {
                        show_shop_id: 57,
                        vin: rd.vin,
                        brand_id: modelInfo.brand_id,
                        model_id: modelInfo.model_id,
                        series_id: modelInfo.series_id,
                        pictures: rd.pictures,
                        v_type: rd.v_type,
                        manufacture: rd.manufacture,
                        init_reg: rd.init_reg,
                        mileage: rd.mileage,
                        car_color: rd.car_color,
                        trim_color: rd.trim_color,
                        dealer_price: rd.dealer_price,
                        describe: rd.describe,
                        emission_standards: rd.emission_standards,
                        label: rd.label,
                        nature_use: rd.nature_use,
                        plate_number: rd.plate_number,
                        transfer_times: rd.transfer_times
                    };
                    if (!this.fromNew) {
                        params[id] = this.carId;
                    }
                    let url = 'http://dev.api-gateway.dycd.com/' +
                        'v1/car/save?token=0ac50af9a02b752ca0f48790dc8ea6d1&device_code=dycd_dms_manage_android';
                    Net.request(url, 'post', params)
                        .then((response) => {
                                if (response.mycode === 1) {
                                    SQLite.changeData(
                                        'DELETE From publishCar WHERE vin = ?',
                                        [this.props.carData.vin]);
                                    this.successModal.openModal();
                                }
                            },
                            (error) => {
                                console.log(error);
                            });
                    console.log();
                } else {
                    console.log(data.error);
                }
            });
    };

    //上传成功后
    sourceParams = {
        name: 'CarSourceScene',
        component: CarSourceScene,
        params: {}
    };

    _goToSource = () => {
        this.toNextPage(this.sourceParams);
    };

    render() {
        return (
            <Image style={styles.container} source={background}>
                <SuccessModal okClick={this.props._goToSource} ref={(modal) => {this.successModal = modal}}/>
                <ScrollableTabView
                    ref={(tab)=>{this.tabView = tab}}
                    tabBarPosition='bottom'
                    renderTabBar={()=>{return(<EditIndicator />)}}>
                    <DetailModelSelect
                        carData={this.state.carData}
                        publishData={this._publish}
                        onBack={()=>this._onBack(0)}
                        barHeight={barHeight} tabLabel="ModelSelect"/>
                    <DetailAutoPhoto carData={this.state.carData}
                                     publishData={this._publish}
                                     onBack={()=>this._onBack(1)}
                                     barHeight={barHeight} tabLabel="DetailAutoPhoto"/>
                    <DetailAutoType carData={this.state.carData}
                                    publishData={this._publish}
                                    onBack={()=>this._onBack(2)}
                                    barHeight={barHeight} tabLabel="DetailAutoType"/>
                    <DetailAutoDate carData={this.state.carData}
                                    publishData={this._publish}
                                    onBack={()=>this._onBack(3)}
                                    barHeight={barHeight} tabLabel="DetailAutoDate"/>
                    <AutoPlate carData={this.state.carData}
                               publishData={this._publish}
                               onBack={()=>this._onBack(4)}
                               barHeight={barHeight} tabLabel="AutoPlate"/>
                    <DetailAutoMileage carData={this.state.carData}
                                       publishData={this._publish}
                                       onBack={()=>this._onBack(5)}
                                       barHeight={barHeight} tabLabel="DetailAutoMileage"/>
                    <AutoEmission carData={this.state.carData}
                                  publishData={this._publish}
                        onBack={()=>this._onBack(6)}
                        barHeight={barHeight} tabLabel="AutoEmission"/>
                    <AutoLabel carData={this.state.carData}
                               publishData={this._publish}
                               onBack={()=>this._onBack(7)}
                               barHeight={barHeight} tabLabel="AutoLabel"/>
                    <AutoOperation carData={this.state.carData}
                                   publishData={this._publish}
                                   onBack={()=>this._onBack(8)}
                                   barHeight={barHeight} tabLabel="AutoOperation"/>
                    <AutoColor carData={this.state.carData}
                               publishData={this._publish}
                               onBack={()=>this._onBack(9)}
                               barHeight={barHeight} tabLabel="AutoColor"/>
                    <AutoTransfer carData={this.state.carData}
                                  publishData={this._publish}
                                  onBack={()=>this._onBack(10)}
                                  barHeight={barHeight} tabLabel="AutoTransfer"/>
                    <AutoOther carData={this.state.carData}
                               publishData={this._publish}
                               onBack={()=>this._onBack(11)}
                               barHeight={barHeight} tabLabel="AutoOther"/>
                </ScrollableTabView>
            </Image>
        );
    };
}
const styles = StyleSheet.create({
    container: {
        width: width,
        flex: 1,
        backgroundColor: 'transparent'
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
