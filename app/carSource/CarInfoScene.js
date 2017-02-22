import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Linking,
    InteractionManager,

} from 'react-native';

import *as fontAndColor from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';
import NavigationView from '../component/AllNavigationView';
import PhotoView from 'react-native-photo-view';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";

const carParameterData = [
    '迎宾灯',
    '全时四驱',
    '定速巡航',
    '自动驾驶',
    '全景天窗',
    '车道保持',

];

const carParameterViewColor = [

    'rgba(5, 197, 194,0.15)',
    'rgba(58, 200, 126,0.15)',
    'rgba(47, 155, 250,0.15)',

];

const carParameterTextColor = [

    fontAndColor.COLORB0,
    fontAndColor.COLORB1,
    fontAndColor.COLORB4,

];

const carIconsData = [
    {
        title: '出厂日期',
        image: require('../../images/carSourceImages/factory.png'),
        imageHigh: require('../../images/carSourceImages/factory_h.png'),
    },
    {
        title: '初登日期',
        image: require('../../images/carSourceImages/rollout.png'),
        imageHigh: require('../../images/carSourceImages/rollout_h.png'),
    },
    {
        title: '表显里程',
        image: require('../../images/carSourceImages/mileage.png'),
        imageHigh: require('../../images/carSourceImages/mileage_h.png'),
    },
    {
        title: '过户次数',
        image: require('../../images/carSourceImages/transfer.png'),
        imageHigh: require('../../images/carSourceImages/transfer_h.png'),
    },
    {
        title: '运营性质',
        image: require('../../images/carSourceImages/operation.png'),
        imageHigh: require('../../images/carSourceImages/operation_h.png'),
    },
    {
        title: '车身/内饰颜色',
        image: require('../../images/carSourceImages/carColor.png'),
        imageHigh: require('../../images/carSourceImages/carColor_h.png'),
    },

];


const carIconsContentData = [
    {
        title: '2013-05-10',
    },
    {
        title: '2013-11-10',
    },
    {
        title: '10.8万公里',
    },
    {
        title: '2次',
    },
    {
        title: '',
    },
    {
        title: '',
    },

];

export default class CarInfoScene extends BaseComponent {



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isHidePhotoView:true,
            renderPlaceholderOnly: true,
            carData:{},
        };
      }

    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });

    }

    componentWillMount() {

        this.loadData();
    }

    loadData=()=> {

        console.log('ID:'+this.props.carID);
        let url = AppUrls.BASEURL + '/v1/car/detail?token=0ac50af9a02b752ca0f48790dc8ea6d1&device_code=dycd_dms_manage_ios';
        request(url, 'post', {

            id: this.props.carID,

        }).then((response) => {

            console.log(response);

            let carData = response.mjson.data;
            carData.carIconsContentData=[

                this.dateReversal(carData.manufacture),
                this.dateReversal(carData.init_reg),
                carData.mileage+'万公里',
                carData.transfer_times+'次',
                carData.nature_str,
                carData.car_color+'/'+carData.trim_color,
            ];


            this.setState({

                carData:carData,

            });



        }, (error) => {

            console.log(error);

        });
    }

    dateReversal=(time)=>{

        const date = new Date();
        date.setTime(time);
        return(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate());

    };

    _backIconClick = () => {

        this.backPage();
    };

    _callClick = () => {

        alert(this.dateReversal(this.state.carData.manufacture));
        // Linking.openURL('tel:4006561290,100002#');
    };

    _navigatorRightView = () => {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                    <Image source={require('../../images/carSourceImages/store.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 10}}>
                    <Image source={require('../../images/carSourceImages/share_nil.png')}></Image>
                </TouchableOpacity>
            </View>
        );
    };


    showPhotoViewAction=()=>{

        this.setState({

            isHidePhotoView:!this.state.isHidePhotoView,
        });

    }


    render() {

        if (this.state.renderPlaceholderOnly) {
            return (
                <View style={{flex: 1, backgroundColor: 'white'}}>
                <NavigationView
                    title="车源详情"
                    backIconClick={this._backIconClick}
                />
            </View>);
        }

        const carData = this.state.carData;

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <ScrollView style={{marginBottom: 44}} onMomentumScrollEnd={(e) => {
                    console.log(e.nativeEvent.contentOffset.y)
                }}>
                    <TouchableOpacity onPress={()=>{alert(1)}}>
                    <Image style={styles.carImage} source={{uri:'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024'}}/>
                    </TouchableOpacity>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentView}>
                            <Text style={styles.titleText}>{carData.brand_name+carData.model_name+carData.series_name}</Text>
                            <View style={styles.titleFootView}>
                                <View style={styles.browseView}>
                                    {/*<Image style={{marginRight: 5}}*/}
                                           {/*source={require('../../images/carSourceImages/browse.png')}/>*/}
                                    {/*<Text style={styles.browseText}>1024次浏览</Text>*/}
                                </View>
                                <Text style={styles.priceText}>{carData.dealer_price +'万'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentView}>
                            {
                                carData.labels && ( <View style={styles.carParameterView}>
                                    {
                                        carData.labels.map((data, index) => {
                                            return (<View
                                                style={[styles.carParameterItem, {backgroundColor: carParameterViewColor[index % 3]}]}
                                                key={index}>
                                                <Text
                                                    style={[styles.carParameterText, {color: carParameterTextColor[index % 3]}]}>{data.value}</Text>
                                            </View>)

                                        })
                                    }
                                </View>)

                            }

                            {
                                carData.describe!==''&&( <View style={styles.carDepictView}>
                                    <Text style={styles.carDepictText}>{carData.describe}</Text>
                                </View>)

                            }

                            <View style={styles.carAddressView}>
                                <View style={styles.carAddressSubView}>
                                    <Text style={styles.carAddressTitleText}>商户所在地: </Text>
                                    <Text style={styles.carAddressSubTitleText}>{carData.city_name}</Text>
                                </View>
                                <View style={styles.carAddressSubView}>
                                    <Text style={styles.carAddressTitleText}>挂牌地: </Text>
                                    <Text style={styles.carAddressSubTitleText}>{carData.plate_number}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.carIconsContainer}>
                        <View style={styles.carIconsView}>
                            {
                                carIconsData.map((data, index) => {

                                    return (
                                        <CarIconView imageData={data.image} imageHighData={data.imageHigh}
                                                     content={carData.carIconsContentData&&carData.carIconsContentData[index]} title={data.title}
                                                     key={index}/>
                                    )

                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.callView} onPress={this._callClick}>
                    <Image source={require('../../images/carSourceImages/phone.png')}/>
                    <Text style={styles.callText}>电话咨询</Text>
                </TouchableOpacity>
                <NavigationView
                    wrapStyle={{backgroundColor:'rgba(0,0,0,0)'}}
                    title="车源详情"
                    backIconClick={this._backIconClick}
                    renderRihtFootView={this._navigatorRightView}
                />
            </View>
        )
    }

}

class CarIconView extends Component {

    render() {

        const {imageData, imageHighData, title, content} = this.props;

        return (
            <View style={styles.carIconItem}>
                <Image source={content ? imageHighData : imageData}/>
                <Text
                    style={[styles.carIconItemContentText, (content&&content!==' / '&&content!=='次'&&content!=='万公里' )&& {color: fontAndColor.COLORA0}]}>{content ? content : '暂无'}</Text>
                <Text style={styles.carIconItemTitleText}>{title}</Text>
            </View>
        )
    }


}


const styles = StyleSheet.create({

    navigation: {

        height: Pixel.getPixel(64),
        // height:64,
        backgroundColor: fontAndColor.COLORB0,
        left: 0,
        right: 0,
        position: 'absolute',

    },

    carImage: {

        backgroundColor: fontAndColor.COLORB0,
        height: 250,

    },
    contentContainer: {

        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAndColor.COLORA4,

    },
    contentView: {

        marginLeft: 15,
        marginTop: 10,
        marginRight: 15,
        marginBottom: 15,
        backgroundColor: 'white'

    },
    titleText: {
        color: fontAndColor.COLORA0,
        fontSize: fontAndColor.TITLEFONT,
        backgroundColor: 'transparent',

    },
    subTitleView: {

        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 3,
        borderColor: fontAndColor.COLORB0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 52,
        marginLeft: 5,
        marginTop: 15,
        height: 30,


    },
    subText: {

        color: fontAndColor.COLORB0,
        fontSize: fontAndColor.CONTENTFONT,
        textAlign: 'center',

    },
    titleFootView: {

        flexDirection: 'row',
        // backgroundColor:'red',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,


    },
    browseView: {

        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'yellow',

    },
    browseText: {
        color: fontAndColor.COLORA2,
        fontSize: fontAndColor.CONTENTFONT,
    },
    priceText: {
        color: fontAndColor.COLORB2,
        fontSize: fontAndColor.TITLEFONT,
        fontWeight: 'bold',

    },
    carParameterView: {

        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        flexWrap: 'wrap',
        marginBottom: 12,

    },
    carParameterItem: {

        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        paddingHorizontal: 5,
        height: 18,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carParameterText: {
        fontSize: fontAndColor.MARKFONT,
    },
    carDepictView: {

        marginBottom: 15,
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: 'rgba(158,158,158,0.15)',
        borderRadius: 3,
    },
    carDepictText: {

        color: fontAndColor.COLORA2,
        fontSize: fontAndColor.MARKFONT,
    },
    carAddressView: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    carAddressSubView: {

        flexDirection: 'row',
    },
    carAddressTitleText: {

        color: fontAndColor.COLORA1,
        fontSize: fontAndColor.LITTLEFONT,

    },
    carAddressSubTitleText: {

        color: fontAndColor.COLORA0,
        fontSize: fontAndColor.LITTLEFONT,
    },
    carIconsContainer: {

        marginBottom: 15,
        marginHorizontal: 15,
        backgroundColor: 'white',


    },
    carIconsView: {

        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',

    },
    carIconItem: {

        alignItems: 'center',
        marginTop: 25,
        backgroundColor: 'white',
        width: 90,
        height: 90,
        marginRight: 10,
        marginLeft: 10,
    },
    carIconItemTitleText: {

        color: fontAndColor.COLORA1,
        fontSize: fontAndColor.CONTENTFONT,

    },
    carIconItemContentText: {

        color: fontAndColor.COLORA1,
        fontSize: fontAndColor.LITTLEFONT,
        marginTop: 5,
        marginBottom: 5,

    },
    callView: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: fontAndColor.COLORB0,
        height: 44,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    callText: {
        color: 'white',
        fontSize: fontAndColor.CONTENTFONT,
    },

})