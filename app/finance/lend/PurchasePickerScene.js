/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import PurchasePickerItem from '../component/PurchasePickerItem';
import {request} from '../../utils/RequestUtil';
import * as MyUrl from '../../constant/appUrls';
let childItems = [];
let results = [];
import OBDDevice from '../../login/OBDDevice';
export  default class PurchasePickerScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: {}
        };
    }

    componentWillUnmount() {
        childItems = [];
        results = []
    }

    initFinish = () => {
        let that = this;
        let maps = {
            source_type: '1',
            archives_status: this.props.carData.bind_type,
            obd_status: this.props.carData.isCarinvoice,
            api: MyUrl.PURCHAAUTO_GETPURCHAAUTOPICCATE
        };
        request(MyUrl.FINANCE, 'Post', maps)
            .then((response) => {
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    that.setState({
                        source: ds.cloneWithRows(response.mjson.data.cate_list)
                    });
                    for (let i = 0; i < response.mjson.data.cate_list.length; i++) {
                        childItems.push({
                            code: response.mjson.data.cate_list[i].code,
                            id: response.mjson.data.cate_list[i].id,
                            list: []
                        });
                    }
                    this.setState({renderPlaceholderOnly: 'success'});
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }


    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ListView
                    style={{marginTop: Pixel.getTitlePixel(79)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                />
                <NavigationView
                    title="车辆照片"
                    backIconClick={this.backPage}
                    renderRihtFootView={this._navigatorRightView}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <PurchasePickerItem results={results} showModal={(value)=>{this.props.showModal(value)}}
                                showToast={(value)=>{this.props.showToast(value)}} items={movie}
                                childList={childItems[rowId]}/>
        )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="车辆照片"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    navigatorParams = {}

    _navigatorRightView = () => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                  this.uploadData();
                    {/*const navigator = this.props.navigator;*/}
                    {/*if (navigator) {*/}
                        {/*navigator.popToRoute(navigator.getCurrentRoutes()[3]);*/}
                    {/*}*/}
                    {/*console.log(navigator.getCurrentRoutes());*/}
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                }}>下一步</Text>
            </TouchableOpacity>
        );
    }

    uploadData = () => {
        let maps = {
            brand_id: this.props.carData.brand_id,
            car_color: this.props.carData.car_color,
            file_list: JSON.stringify(results),
            frame_number: this.props.carData.frame_number,
            init_reg: this.props.carData.init_reg,
            mileage: this.props.carData.mileage,
            model_id: this.props.carData.model_id,
            purchas_price: this.props.carData.purchas_price,
            register_user_id: this.props.carData.register_user_id,
            rev_user_id: this.props.carData.rev_user_id,
            sell_city_id: this.props.carData.sell_city_id,
            series_id: this.props.carData.series_id,
            api: MyUrl.PURCHAAUTO_ADDAUTO
        };
        this.props.showModal(true);
        request(MyUrl.FINANCE, 'Post', maps)
            .then((response) => {
                    this.props.showModal(false);
                    if(this.props.carData.isCarinvoice=='0'){
                        this.props.showToast("添加成功");
                        const navigator = this.props.navigator;
                        if (navigator){
                            navigator.popToRoute(navigator.getCurrentRoutes()[3]);
                        }
                    }else{
                        this.props.showToast("添加成功，请绑定OBD");
                        this.toNextPage({
                            name: 'OBDDevice', componet: OBDDevice, params: {
                                frame_number: this.props.carData.frame_number,
                                info_id: response.mjson.data.info_id
                            }
                        });
                    }

                },
                (error) => {
                    this.props.showModal(false);
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast("网络连接失败")
                    } else {
                        this.props.showToast(error.mjson.msg)
                    }
                });
    }

}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})