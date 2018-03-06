/**
 * Created by hanmeng on 2017/5/8.
 * 采购订单
 */
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
    Dimensions
} from  'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../component/BaseComponent";
import * as fontAndColor from '../../constant/fontAndColor';
import NavigatorView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil'
import LQBannerItem from './component/LQBannerItem';
import LQAdressItem from './component/LQAdressItem';
var Pixel = new PixelUtil();
import CityRegionScene from '../addressManage/CityRegionScene';
export default class LogisticsQueryScene extends BaseComponent {

    // 构造
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.selectIndex=0;
        this.firstItem={
            province:'',
            province_code:'',
            city:'',
            city_code:'',
            district:'',
            district_code:''
        }
        this.lastItem={
            province:'',
            province_code:'',
            city:'',
            city_code:'',
            district:'',
            district_code:''
        }
        this.state = {
            renderPlaceholderOnly: 'blank',
            dataSource: ds.cloneWithRows([1, 2, 3, 4, 5]),
            cityStatus:false
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

    _showModal = (show)=>{
        this.props.showModal(show);
    };

    _closeProvince = ()=>{
        this.setState({cityStatus:false});
    };

    checkAreaClick = (cityRegion)=>{
        if(this.selectIndex==1){
            this.firstItem.province = cityRegion.provice_name;
            this.firstItem.province_code = cityRegion.provice_code;
            this.firstItem.city = cityRegion.city_name;
            this.firstItem.city_code = cityRegion.city_code;
            this.firstItem.district = cityRegion.district_name;
            this.firstItem.district_code = cityRegion.district_code;
        }else{
            this.lastItem.province = cityRegion.provice_name;
            this.lastItem.province_code = cityRegion.provice_code;
            this.lastItem.city = cityRegion.city_name;
            this.lastItem.city_code = cityRegion.city_code;
            this.lastItem.district = cityRegion.district_name;
            this.lastItem.district_code = cityRegion.district_code;
        }
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows([1, 2, 3, 4, 5]),
        });
    };

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={{flex:1,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigatorView title='物流服务' backIconClick={this.backPage} wrapStyle={{backgroundColor:'transparent'}}/>
            </View>);
        } else {
            return (<View style={{flex:1,backgroundColor: fontAndColor.COLORA3}}>
                <ListView
                    removeClippedSubviews={false}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    showsVerticalScrollIndicator={false}
                />
                {
                    this.state.cityStatus && <CityRegionScene checkAreaClick={this.checkAreaClick}
                                                              showModal={this._showModal}
                                                              closePress={this._closeProvince}/>
                }
                <NavigatorView title='物流服务' backIconClick={this.backPage} wrapStyle={{backgroundColor:'transparent'}}/>
            </View>);
        }
    }

    _renderRow = (rowData, selectionID, rowID) => {
        if (rowData == '1') {
            return <LQBannerItem />
        } else if (rowData == '2') {
            return <LQAdressItem firstName={this.firstItem.province+this.firstItem.city+
            this.firstItem.district}
                                 lastName={this.lastItem.province+this.lastItem.city+
            this.lastItem.district} selectCity={(index)=>{
                this.selectIndex=index;
                this.setState({
                    cityStatus:true
                });
            }}/>
        } else if (rowData == '3') {
            return <LQAdressItem/>
        } else if (rowData == '4') {
            return <View style={{width:width,height:Pixel.getPixel(153),backgroundColor: '#ff0'}}></View>
        } else if (rowData == '5') {
            return <View style={{width:width,height:Pixel.getPixel(150),backgroundColor: '#0f0'}}></View>
        }
    }


}