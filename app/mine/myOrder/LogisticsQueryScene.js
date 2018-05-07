import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    BackAndroid,
    InteractionManager,
    RefreshControl,
    Dimensions,
    Platform,
    KeyboardAvoidingView
} from 'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../component/BaseComponent";
import * as fontAndColor from '../../constant/fontAndColor';
import NavigatorView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil'
import LQBannerItem from './component/LQBannerItem';
import LQAdressItem from './component/LQAdressItem';
import LQTransportItem from './component/LQTransportItem';
import LQCarItem from './component/LQCarItem';
import NewCarItem from './component/NewCarItem'

var Pixel = new PixelUtil();
import CityRegionScene from '../addressManage/CityRegionScene';
import LQSelectCarTypeItem from './component/LQSelectCarTypeItem';
import LQSelectTransItem from './component/LQSelectTransItem';
import LQBottomItem from './component/LQBottomItem';
import CarBrandSelectScene from "../../carSource/CarBrandSelectScene";

const IS_ANDROID = Platform.OS === 'android';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import CarriagePriceContenScene from "./CarriagePriceContenScene";
import CarriagePriceInfoScene from "./CarriagePriceInfoScene";
import SwipeOut from 'react-native-swipeout'

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class LogisticsQueryScene extends BaseComponent {

    // 构造
    constructor(props) {
        super(props);

        this.car_model = {
            model_id: 0,
            car_name: '',
            car_count: 1,
            car_price: 'n',
        };

        this.selected_car_model = this.car_model;
        this.car_models = [this.car_model];
        this.list_view_rows = [1, 2, 3, 4, this.car_model];

        this.selectIndex = 0;

        this.firstItem = {
            province: '',
            province_code: '',
            city: '',
            city_code: '',
            district: '',
            district_code: ''
        }
        this.lastItem = {
            province: '',
            province_code: '',
            city: '',
            city_code: '',
            district: '',
            district_code: ''
        }


        this.transType = [];
        this.transError = false;
        this.transSelect = {
            transportTypeCode: 0,   // 大板车：1，  救援车：2，
            transportType: ''   // 大板车、救援车
        }


        this.state = {
            renderPlaceholderOnly: 'blank',
            carModule: this.car_models,
            dataSource: ds.cloneWithRows(this.list_view_rows),
            cityStatus: false,
            openType: false,
            canClick: false
        };
    }

    componentDidMount() {
        try {
            BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        } catch (e) {

        } finally {
            //InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
            //});
        }
    }



    initFinish = () => {
        this.loadData();
    };

    loadData = () => {
        this.setState({renderPlaceholderOnly: 'success'});
    }

    _showModal = (show) => {
        this.props.showModal(show);
    };

    _closeProvince = () => {
        this.setState({cityStatus: false});
    };

    checkAreaClick = (cityRegion) => {
        if (this.selectIndex == 1) {
            this.firstItem.province = cityRegion.provice_name;
            this.firstItem.province_code = cityRegion.provice_code;
            this.firstItem.city = cityRegion.city_name;
            this.firstItem.city_code = cityRegion.city_code;
            this.firstItem.district = cityRegion.district_name;
            this.firstItem.district_code = cityRegion.district_code;
        } else if (this.selectIndex == 2) {
            this.lastItem.province = cityRegion.provice_name;
            this.lastItem.province_code = cityRegion.provice_code;
            this.lastItem.city = cityRegion.city_name;
            this.lastItem.city_code = cityRegion.city_code;
            this.lastItem.district = cityRegion.district_name;
            this.lastItem.district_code = cityRegion.district_code;
        }

        this.setState({
            dataSource: ds.cloneWithRows(this.list_view_rows),
        }, () => {
            this.getTrans()
        });
    };

    toNext = () => {

        if (this.isNull(this.firstItem.province + this.firstItem.city +
                this.firstItem.district)) {
            this.props.showToast('请选择始发地');
            return;
        }
        if (this.isNull(this.lastItem.province + this.lastItem.city +
                this.lastItem.district)) {
            this.props.showToast('请选择目的地');
            return;
        }
        if (this.isNull(this.typeName)) {
            this.props.showToast('请选择车辆新旧');
            return;
        }


        let is_car_name = true;
        let is_car_price = true;
        let car_sum = 0

        for (let i = 0; i<this.car_models.length;i++){
            let cm = this.car_models[i];

            if (this.isNull(cm.car_name)) {
                is_car_name = false;
                break;
            }
            if (this.isNull(cm.car_price) || cm.car_price <= 0) {
                is_car_price = false;
                break;
            }

            car_sum+=cm.car_count;

        }


        if (!is_car_name){
            this.props.showToast('请选择车型');
            return;
        }
        if (!is_car_price){
            this.props.showToast('请填写单车指导价');
            return;
        }




        if (this.isNull(this.transSelect.transportType)) {
            this.props.showToast('请选择运输类型');
            return;
        }

        let brandParams = {
            name: 'CarriagePriceInfoScene',
            component: CarriagePriceInfoScene,
            params: {
                carCount:car_sum,
                model_data:this.car_models,
                carType: this.typeId,
                endAddr: this.lastItem.province + this.lastItem.city,
                endAddrRegionId: this.lastItem.city_code,
                startAddr: this.firstItem.province + this.firstItem.city + this.firstItem.district,
                startAddrRegionId: this.firstItem.district_code,
                transportType: this.transSelect.transportTypeCode,
            }
        };

        this.toNextPage(brandParams);

    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={{flex: 1, backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigatorView title='物流服务' backIconClick={this.backPage} wrapStyle={{backgroundColor: 'transparent'}}/>
            </View>);
        } else {
            return (<View style={{flex: 1, backgroundColor: fontAndColor.COLORA3}}>
                {IS_ANDROID ? (<ListView
                    removeClippedSubviews={false}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    showsVerticalScrollIndicator={false}
                    onScroll={this.onScroll}
                    renderFooter={this.renderFooter}
                    renderSeparator={this.renderSeparator}
                />) : (
                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-Pixel.getPixel(100)}>

                        <ListView
                            removeClippedSubviews={false}
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            showsVerticalScrollIndicator={false}
                            onScroll={this.onScroll}
                            renderFooter={this.renderFooter}
                            renderSeparator={this.renderSeparator}
                        />


                    </KeyboardAvoidingView>
                )}
                <TouchableOpacity onPress={() => {
                    if (this.state.canClick) {
                        this.toNext();
                    }
                }}
                                  activeOpacity={0.9}
                                  style={{
                                      width: width,
                                      height: Pixel.getPixel(45),
                                      backgroundColor: this.state.canClick ? fontAndColor.COLORB0 : '#69DCDA',
                                      position: 'absolute',
                                      left: 0,
                                      bottom: 0,
                                      justifyContent: 'center',
                                      alignItems: 'center'
                                  }}>
                    <Text style={{
                        fontSize: Pixel.getPixel(15), color: '#fff',
                        backgroundColor: '#00000000'
                    }}>询价</Text>
                </TouchableOpacity>
                {
                    this.state.cityStatus && <CityRegionScene noneDistrict={this.state.openType}
                                                              checkAreaClick={this.checkAreaClick}
                                                              showModal={this._showModal}
                                                              closePress={this._closeProvince}/>
                }
                <LQSelectCarTypeItem selectType={(id, name) => {


                    this.typeId = id;
                    this.typeName = name;
                    this.setState({
                        dataSource: ds.cloneWithRows(this.list_view_rows)
                    })
                    this.getTrans()

                }} ref="lqselectcartypeitem"/>
                <LQSelectTransItem selectType={(code, name) => {
                    this.transSelect = {
                        transportTypeCode: code,
                        transportType: name
                    }
                    // if (this.isNull(this.car.money) || this.car.money <= 0) {
                    //     this.setState({
                    //         dataSource: ds.cloneWithRows(list_view_rows),
                    //         canClick: false
                    //     });
                    // } else {
                    this.setState({
                        dataSource: ds.cloneWithRows(this.list_view_rows),
                        canClick: true
                    });
                    //}

                }} ref="lqselecttransitem"/>
                <NavigatorView ref={(ref) => this.navigationView = ref} title='物流服务' backIconClick={this.backPage}
                               wrapStyle={{backgroundColor: 'transparent'}}/>
            </View>);
        }
    }

    onScroll = (event) => {

        if (event.nativeEvent.contentOffset.y > 0) {

            this.navigationView.setNavigationBackgroindColor(fontAndColor.COLORB0);

        } else {
            this.navigationView.setNavigationBackgroindColor('transparent');
        }
    }

    renderSeparator = (secttionID,rowID)=>{
        return<View
            key={secttionID+''+rowID}
            style={{
            width: width,
            height: Pixel.getPixel(10),
            backgroundColor: fontAndColor.COLORA3
        }}/>

    }

    _renderRow = (rowData, selectionID, rowID) => {

        if (rowData == '1') {
            return <LQBannerItem clickBanner={() => {
                let brandParams = {
                    name: 'CarriagePriceContenScene',
                    component: CarriagePriceContenScene,
                    params: {}
                };
                this.toNextPage(brandParams);
            }}/>
        } else if (rowData == '2') {
            return <LQAdressItem firstName={this.firstItem.province + this.firstItem.city + this.firstItem.district}
                                 lastName={this.lastItem.province + this.lastItem.city + this.lastItem.district}
                                 typeName={this.typeName}
                                 selectCity={(index) => {
                                     this.selectIndex = index;
                                     if (index == 1) {
                                         this.setState({
                                             cityStatus: true,
                                             openType: false
                                         });
                                     } else if (index == 2) {
                                         this.setState({
                                             cityStatus: true,
                                             openType: true
                                         });
                                     } else {
                                         this.refs.lqselectcartypeitem.changeShow()
                                     }

                                 }}/>
        } else if (rowData == '3') {
            return <LQTransportItem transName={this.transSelect.transportType} selectTransport={() => {
                if (this.transType.length <= 0 && this.transError == false) {
                    this.props.showToast('请确认车辆类型与地址');
                    return;
                }
                if (this.transError) {
                    this.getTrans(1);
                    return;
                }
                this.refs.lqselecttransitem.changeShow(this.transType);
            }}/>

        } else if (rowData == '4') {

            return <NewCarItem
                onPress={() => {

                    if (this.car_models.length>=20){
                        this.props.showToast('最多可以添加20个车型');
                        return;
                    }


                    let cm = {
                        model_id: 0,
                        car_name: '',
                        car_count: 1,
                        car_price: 'n',
                    };

                    this.car_models.splice(0,0,cm)
                    this.list_view_rows.splice(4,0,cm);
                    console.log(this.list_view_rows)

                    this.setState({
                        dataSource: ds.cloneWithRows(this.list_view_rows),
                    })
                }}
            />
        } else {

            console.log(rowData);

            let swipeBtns = null;
            if (rowID != 4 || this.list_view_rows.length > 5) {
                swipeBtns = [{
                    text: '删除',
                    backgroundColor: 'red',
                    underlayColor: 'white',
                    onPress: () => {
                        this.deleteCar(rowData)
                    }
                }];

            }

            return <SwipeOut
                right={swipeBtns}
                autoClose={true}
                backgroundColor='transparent'
                underlayColor={'red'}
            >

                <LQCarItem
                    inputMoney={(text) => {
                        rowData.car_price = text;
                        if (this.isNull(rowData.car_price) || rowData.car_price <= 0) {
                            this.setState({
                                canClick: false
                            });
                        } else if (!this.isNull(this.transSelect.transportTypeCode) && !this.state.canClick) {
                            this.setState({
                                canClick: true
                            });
                        }
                    }}
                    type={this.typeId}
                    carName={rowData.car_name}
                    money={rowData.car_price}
                    count={rowData.car_count}
                    selectType={() => {
                        this.refs.lqselectcartypeitem.changeShow();
                    }}
                    selectModel={() => {

                        selected_car_model = rowData
                        let brandParams = {
                            name: 'CarBrandSelectScene',
                            component: CarBrandSelectScene,
                            params: {
                                checkedCarClick: this._checkedCarClick,
                                status: 0,
                            }
                        };
                        this.toNextPage(brandParams);
                    }}
                    changeNumber={(number) => {
                        rowData.car_count = number;
                    }}
                />


            </SwipeOut>

        }
    }

    deleteCar = (rowData) => {


        this.list_view_rows.map((data, index) => {
            if (rowData === data) {
                this.list_view_rows.splice(index, 1);

            }
        });

        this.car_models.map((data, index) => {
            if (rowData === data) {
                this.car_models.splice(index, 1);
            }
        });

        this.selected_car_model = this.car_models[0];

        this.setState({
            dataSource: ds.cloneWithRows(this.list_view_rows)
        })
    }


    renderFooter = () => {
        return <LQBottomItem/>
    }


    // 选择车型回调
    _checkedCarClick = (content) => {

        selected_car_model.car_name = content.model_name;
        selected_car_model.model_id = content.model_id;
        selected_car_model.car_price = content.model_price;
        this.setState({
            dataSource: ds.cloneWithRows(this.list_view_rows),
        });
    }

    getTrans = (from) => {

        if (this.isNull(this.typeName)) {
            return;
        }
        if (this.isNull(this.firstItem.province + this.firstItem.city +
                this.firstItem.district)) {
            return;
        }
        if (this.isNull(this.lastItem.province + this.lastItem.city +
                this.lastItem.district)) {
            return;
        }
        this._showModal(true);
        this.transSelect = {};

        this.setState({
            dataSource: ds.cloneWithRows(this.list_view_rows),
        }, () => {
            let maps = {
                carType: this.typeId,
                company_id: global.companyBaseID,
                endAddr: this.lastItem.province + this.lastItem.city,
                endAddrRegionId: this.lastItem.city_code,
                startAddr: this.firstItem.province + this.firstItem.city + this.firstItem.district,
                startAddrRegionId: this.firstItem.district_code,
            };
            request(Urls.GETTRANSPORTTYPE, 'Post', maps)
                .then((response) => {
                        this.transType = [];
                        if (from == 1) {
                            if (this.isNull(response.mjson.data) || response.mjson.data.length <= 0) {
                                this.transError = true;
                                this.props.showToast('运输类型为空');
                                return;
                            }
                            this._showModal(false);
                            this.transError = false;
                            for (let i = 0; i < response.mjson.data.length; i++) {
                                this.transType.push({
                                    transportType: response.mjson.data[i].transportType,
                                    transportTypeCode: response.mjson.data[i].transportTypeCode
                                })
                            }
                            this.refs.lqselecttransitem.changeShow(this.transType);
                        } else {
                            this._showModal(false);
                            if (this.isNull(response.mjson.data) || response.mjson.data.length <= 0) {
                                this.transError = true;
                                return;
                            }
                            for (let i = 0; i < response.mjson.data.length; i++) {
                                this.transType.push({
                                    transportType: response.mjson.data[i].transportType,
                                    transportTypeCode: response.mjson.data[i].transportTypeCode
                                })
                            }
                            if (this.transType.length == 1) {
                                this.transSelect = {
                                    transportType: this.transType[0].transportType,
                                    transportTypeCode: this.transType[0].transportTypeCode
                                }

                                if (this.isNull(cm.money) || cm.money <= 0) {
                                    this.setState({
                                        dataSource: ds.cloneWithRows(this.list_view_rows),
                                        canClick: false
                                    });
                                } else {
                                    this.setState({
                                        dataSource: ds.cloneWithRows(this.list_view_rows),
                                        canClick: true
                                    });
                                }
                            }
                        }
                    },
                    (error) => {
                        this.transError = true;
                        if (from == 1) {
                            if (error.mycode == -300 || error.mycode == -500) {
                                this.props.showToast('系统异常');
                            } else {
                                this.props.showToast(error.mjson.msg);
                            }
                        } else {
                            this._showModal(false);
                        }
                    });
        });

    }

}