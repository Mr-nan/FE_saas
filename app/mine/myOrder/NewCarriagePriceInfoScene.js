/**
 * Created by zhengnan on 2018/5/7.
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
import NavigatorView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import * as Net from '../../utils/RequestUtil';
import * as AppUrls from '../../constant/appUrls';
import NewLogisticsInfoScene from "./NewLogisticsInfoScene";


export default class NewCarriagePriceInfoScene extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            renderPlaceholderOnly: 'loading'
        }
        this.order = {}
    }

    initFinish() {

        this.loadData()
    }


    /*    v2/order.logistics_flows/getTransDetails  接口返回的数据格式
        {
            "trans_data": {
                "trans_id": 83,
                "start_id": 53,
                "end_id": 54,
                "trans_code": "YD20180513100350",
                "start_address": "北京北京",
                "end_address": "辽宁沈阳",
                "trans_type": 1,
                "car_number": 2,
                "total_amount": "4479.00",
                "insure_amount": "0.00",
                "tax_amount": "0.00",
                "service_amount": "300.00",
                "tostore_amount": "478.00",
                "verify_amount": "560.00",
                "trans_amount": "3141.00"
            },
            "item_data": [{
                "car_name": "2013款 途观 豪华版 1.8TSI 手自一体 两驱",
                "car_price": "130000.00",
                "car_number": 2
            }],
            "start_address": {
                "contact_name": "王雪岗",
                "contact_phone": "13261577303",
                "full_address": "北京北京朝阳区北京朝阳区东风乡南十里居路甲1号",
                "id_card": ""
            },
            "end_address": {
                "contact_name": "骆伟",
                "contact_phone": "13261577303",
                "full_address": "辽宁沈阳大东区大东区东站街70号(联合路东站街路口)",
                "id_card": "420700197004070216"
            }
        }
   */

    loadData = () => {

        let params = {
            company_id: global.companyBaseID,
            trans_id: this.props.order.trans_id,
        }

        Net.request(AppUrls.ORDER_LOGISTICS_ORDER_DETAIL, 'post', params).then((response) => {
            let data = response.mjson.data;


            if (typeof data === 'undefined') {
                this.setState({
                    renderPlaceholderOnly: 'noData',
                })
                return;
            }
            this.order = data;
            this.setState({
                renderPlaceholderOnly: 'success',
            })
        }, (error) => {

            this.setState({
                renderPlaceholderOnly: "failure",

            })
            this.props.showToast(error.mjson.msg);

        });

    }


    render() {

        if (this.state.renderPlaceholderOnly !== 'success') {
            // 加载中....
            return ( <View style={styles.root}>
                <NavigatorView title='运单详情' backIconClick={this.backPage}/>
                {this.loadView()}
            </View>);
        }


        return (
            <View style={styles.root}>
                <ScrollView style={{marginTop: Pixel.getPixel(64)}}>
                    <LocationView title={'运单号' + this.order.trans_data.trans_code}
                                  startName={this.order.trans_data.start_address}
                                  stopName={this.order.trans_data.end_address}
                                  typeName={this.order.trans_data.trans_type === 1 ? '大板车运输' : this.order.trans_type === 2 ? '救援车' : "代驾"}/>
                    <MessageView imageData={require('../../../images/carriagePriceImage/sendCarIcon.png')}
                                 title={'发车信息'}
                                 name={this.order.start_address.contact_name + ' | ' + this.order.start_address.contact_phone}
                                 loactionStr={this.order.start_address.full_address}/>
                    <MessageView imageData={require('../../../images/carriagePriceImage/putCarIcon.png')}
                                 title={'收车信息'}
                                 name={this.order.end_address.contact_name + ' | ' + this.order.end_address.contact_phone}
                                 loactionStr={this.order.end_address.full_address}/>
                    <CarriagePriceView data={this.order.trans_data}/>
                    <CarView carData={this.order.item_data} quantity={this.order.trans_data.car_number}/>
                </ScrollView>
                <TouchableOpacity style={styles.footButton} activeOpacity={1} onPress={this.footBtnClick}>
                    <Text
                        style={{color: 'white', fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>查看物流详情</Text>
                </TouchableOpacity>
                <NavigatorView title="运单详情" backIconClick={this.backPage}/>
            </View>
        )
    }

    footBtnClick = () => {
        this.toNextPage({
            name: 'NewLogisticsInfoScene',
            component: NewLogisticsInfoScene,
            params: {
                order: this.props.order
            }
        });

    }
}

class LocationView extends Component {

    render() {

        const {title, startName, stopName, typeName} = this.props;

        return (
            <View style={styles.contentView}>
                <Text style={{
                    color: fontAndColor.COLORA1,
                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                }}>{title}</Text>
                <View style={{
                    backgroundColor: fontAndColor.COLORB10,
                    paddingVertical: Pixel.getFontPixel(20),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: Pixel.getPixel(10),
                    flexDirection: 'row'
                }}>
                    <View style={{alignItems: 'center', justifyContent: 'center', width: Pixel.getPixel(100),}}>
                        <Image source={require('../../../images/carriagePriceImage/startLocation.png')}/>
                        <Text style={{
                            color: fontAndColor.COLORA0,
                            fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
                            marginTop: Pixel.getPixel(5)
                        }} numberOfLines={1}>{startName}</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            color: fontAndColor.COLORA1,
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                        }}>{typeName}</Text>
                        <Image source={require('../../../images/carriagePriceImage/typeName.png')}/>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', width: Pixel.getPixel(100),}}>
                        <Image source={require('../../../images/carriagePriceImage/stopLocation.png')}/>
                        <Text style={{
                            color: fontAndColor.COLORA0,
                            fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
                            marginTop: Pixel.getPixel(5)
                        }} numberOfLines={1}>{stopName}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

class MessageView extends Component {

    render() {
        const {imageData, title, name, loactionStr} = this.props;

        return (
            <View style={styles.contentView}>
                <View style={{flexDirection: 'row', alignItems: 'center', width: width - Pixel.getPixel(30)}}>
                    <Image source={imageData}/>
                    <View style={{marginLeft: Pixel.getPixel(15), flex: 1}}>
                        <View style={{
                            justifyContent: 'center',
                            flex: 1,
                            borderBottomColor: fontAndColor.COLORA4,
                            borderBottomWidth: Pixel.getPixel(1),
                            paddingBottom: Pixel.getPixel(10)
                        }}>
                            <Text style={{
                                color: fontAndColor.COLORA0,
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30)
                            }}>{title}</Text>
                        </View>
                        <Text style={{
                            color: fontAndColor.COLORA1,
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            marginTop: Pixel.getPixel(10)
                        }}>{name}</Text>
                        <Text style={{
                            color: fontAndColor.COLORA1,
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            marginTop: Pixel.getPixel(10)
                        }}>{loactionStr}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

class CarriagePriceView extends Component {

    render() {

        //
        // "total_amount": "4479.00",
        //     "insure_amount": "0.00",
        //     "tax_amount": "0.00",
        //     "service_amount": "300.00",
        //     "tostore_amount": "478.00",
        //     "verify_amount": "560.00",
        //     "trans_amount": "3141.00"
        //


        let {
            total_amount,
            tax_amount,
            trans_amount,
            verify_amount,
            insure_amount,
            tostore_amount,
            service_amount,
            empty_amount,
            wait_amount,
        } = this.props.data;

        return (
            <View style={[styles.contentView, {paddingTop: Pixel.getPixel(0)}]}>
                <View style={{
                    borderBottomColor: fontAndColor.COLORA4,
                    borderBottomWidth: Pixel.getPixel(1),
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: Pixel.getPixel(44),
                    width: width - Pixel.getPixel(30),
                }}>


                    <Text
                        style={{
                            color: fontAndColor.COLORA0,
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                        }}>运费单总价：</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            color: fontAndColor.COLORB2,
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        }}>{total_amount}</Text>
                        <Text
                            style={{
                                color: fontAndColor.COLORB2,
                                fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24)
                            }}>元</Text>
                        {
                            <Text style={{
                                color: fontAndColor.COLORA1,
                                fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                            }}>{tax_amount > 0 ? `(含税${tax_amount}元)` : '(不含税)'}</Text>
                        }
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: width,
                    marginTop: Pixel.getPixel(15),
                    flexWrap: 'wrap',

                }}>
                    <PriceItemView title="运费" value={trans_amount}/>
                    <PriceItemView title="保险费" value={insure_amount}/>
                    <PriceItemView title="服务费" value={service_amount}/>
                    <PriceItemView title="提验车费" value={verify_amount}/>
                    <PriceItemView title="送店费" value={tostore_amount}/>
                    <PriceItemView title="放空费" value={empty_amount}/>
                    <PriceItemView title="等待费" value={wait_amount}/>

                </View>
            </View>
        )
    }
}

class PriceItemView extends Component {
    render() {
        let {title, value} = this.props;
        return (
            <View style={{
                backgroundColor: 'white',
                marginBottom: Pixel.getPixel(23),
                width: (width-Pixel.getPixel(30))/ 3,
                height:45,
                alignItems:'center',

            }}>
                <Text style={{
                    color: fontAndColor.COLORA1,
                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                }}>{title}</Text>
                <View style={{marginTop: Pixel.getPixel(10), flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{
                        color: fontAndColor.COLORA0,
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                    }}>{value}</Text>
                    <Text style={{
                        color: fontAndColor.COLORA0,
                        fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                    }}>元</Text>
                </View>
            </View>
        )
    }
}

class CarView extends Component {

    // 构造
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(this.props.carData),
        };
    }

    render() {
        const {carData, quantity} = this.props;
        return (
            <View style={[styles.contentView, {paddingTop: Pixel.getPixel(0)}]}>
                <View style={{
                    borderBottomColor: fontAndColor.COLORA4,
                    borderBottomWidth: Pixel.getPixel(1),
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: Pixel.getPixel(44),
                    width: width - Pixel.getPixel(30)
                }}>


                    <Text
                        style={{
                            color: fontAndColor.COLORA0,
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                        }}>运输车辆数：</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            color: fontAndColor.COLORA0,
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        }}>{quantity}</Text>
                        <Text
                            style={{
                                color: fontAndColor.COLORA0,
                                fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24)
                            }}>台</Text>
                    </View>
                </View>
                <ListView dataSource={this.state.dataSource}
                          enableEmptySections={true}
                          renderRow={(data) => {
                              return (<CarItem data={data}/>)
                          }}
                          renderSeparator={(sectionID, rowID) => {
                              return (<View key={`${sectionID}+${rowID}`} style={{
                                  height: Pixel.getPixel(1),
                                  backgroundColor: fontAndColor.COLORA3
                              }}/>)
                          }}/>
            </View>
        )
    }
}

class CarItem extends Component {

    // "item_data": [{
    //     "car_name": "2013款 途观 豪华版 1.8TSI 手自一体 两驱",
    //     "car_price": "130000.00",
    //     "car_number": 2
    // }],


    render() {

        let {
            car_name,
            car_price,
            car_number,
        } = this.props.data;


        return (
            <View style={{
                backgroundColor: 'white', flex: 1, paddingVertical: Pixel.getPixel(12),
                flexDirection: 'row'
            }}>
                {/*<Image style={{width:Pixel.getPixel(120),height:Pixel.getPixel(80),backgroundColor:fontAndColor.COLORA3}}/>*/}
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'space-between'}}>
                    <Text style={{color: fontAndColor.COLORA0, fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}
                          multiline={true}>{car_name}</Text>
                    <View style={{marginTop: Pixel.getPixel(15)}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{
                                color: fontAndColor.COLORA1,
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>数量：</Text>
                            <Text style={{
                                color: fontAndColor.COLORA0,
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>{car_number}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Pixel.getPixel(5)}}>
                            <Text style={{
                                color: fontAndColor.COLORA1,
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>标价：</Text>
                            <Text style={{
                                color: fontAndColor.COLORA0,
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>{car_price}</Text>
                        </View>

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingBottom: Pixel.getPixel(44),
        backgroundColor: fontAndColor.COLORA3,
    },
    footButton: {
        left: 0,
        right: 0,
        bottom: 0,
        height: Pixel.getPixel(44),
        backgroundColor: fontAndColor.COLORB0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    contentView: {
        padding: Pixel.getPixel(15),
        backgroundColor: 'white',
        marginBottom: Pixel.getPixel(10),
        alignItems:'center',
    }
})