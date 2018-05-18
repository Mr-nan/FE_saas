import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Dimensions, TextInput, Image,ListView,RefreshControl,Modal
} from 'react-native';
import BaseComponent from '../../../../component/BaseComponent';
import NavigatorView from '../../../../component/AllNavigationView';

const {width, height} = Dimensions.get('window');
import * as FontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import MyButton from "../../../../component/MyButton";
import CheckWaybill from '../CheckWaybill';
import SelectDestination from '../SelectDestination';
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";

const cellJianTou = require('../../../../../images/mainImage/celljiantou@2x.png');
import {request} from '../../../../utils/RequestUtil';
import * as Urls from '../../../../constant/appUrls';
import SaasText from "../../../accountManage/zheshangAccount/component/SaasText";
import {TransportOrder} from './Page'
import PlatformChoose from "../pay/PlatformChoose";
import LogisCarInfoScene from "../../LogisCarInfoScene";
import NewCarriagePriceInfoScene from "../../NewCarriagePriceInfoScene";

const Pixel = new PixelUtil();


export default class List extends BaseComponent {

    constructor(props) {
        super(props)
        let ds  = new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2})

        this.state = {
            renderPlaceholderOnly: "success",
            isRefreshing:false,
            source:ds.cloneWithRows([]),
            isShow:false
        }

    }

    toEnd = ()=>{

    }
    refreshingData=()=>{

    }

    render() {

        return (<View style={styles.root}>

                <NavigationtBar
                    onChangeText={(text)=>{

                    }}
                    rightClick={()=>{
                        this.backPage();
                    }}
                    leftClick={()=>{
                        this.backPage();
                    }}
                    onSearch={(key)=>{
                        this.search(key)
                    }}
                />

                <ListView
                    removeClippedSubviews={false}
                    style={{paddingTop: Pixel.getPixel(8), backgroundColor: FontAndColor.COLORA3}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    onEndReachedThreshold={2}
                    enableEmptySections={true}
                    scrollRenderAheadDistance={10}
                    onEndReached={this.toEnd}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshingData}
                            tintColor={[FontAndColor.COLORB0]}
                            colors={[FontAndColor.COLORB0]}
                        />}
                />

                <Modal
                    ref='loadingModal'
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isShow}

                >
                    <View
                        style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,.3)'
                        }}>
                        <View style={{
                            width: width - width / 4,
                            height: Pixel.getPixel(125),
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal:Pixel.getPixel(20),
                            borderRadius:Pixel.getPixel(4)
                        }}>
                            <Text allowFontScaling={false} style={{
                                textAlign: 'center', fontSize: Pixel.getPixel(14),
                                marginTop: Pixel.getPixel(11), color: FontAndColor.COLORA1
                            }}>
                                {'运单取消后无法找回，\n确认取消该运单？'}
                            </Text>
                            <View
                                style = {{flexDirection:'row',marginTop: Pixel.getPixel(16),}}
                            >

                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        isShow:false
                                    })
                                    this.cancelOrderRequset()
                                }} activeOpacity={0.9} style={{
                                    width:  Pixel.getPixel(90),
                                    height: Pixel.getPixel(35),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: FontAndColor.COLORA1
                                }}>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: Pixel.getPixel(FontAndColor.LITTLEFONT28),
                                        color: FontAndColor.COLORA1
                                    }}>确认取消</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        isShow: false
                                    });

                                }} activeOpacity={0.9} style={{
                                    width: Pixel.getPixel(90),
                                    height: Pixel.getPixel(35),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: FontAndColor.COLORB0,
                                    backgroundColor:FontAndColor.COLORB0,
                                    marginLeft:Pixel.getPixel(20)
                                }}>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: Pixel.getPixel(FontAndColor.LITTLEFONT28),
                                        color: 'white'
                                    }}>暂不取消</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


            </View>
        )
    }

    _renderRow = (movie)=>{
            return(
                <TransportOrder
                    data={movie}
                    pay={this.payOrder}
                    cancel={this.cancelOrder}
                    toCarDetialClick={this.toCarDetial}
                    toOrderDetialClick={this.toOrderDetial}
                />
            )
    }

    search = (key)=>{
        let params = {
            company_id: global.companyBaseID,
            page:1,
            rows:5,
            import:key,
        }

        this.props.showModal(true)
        request(Urls.LOGISTICS_ORDER_SEARCH, 'post', params).then((response) => {
            this.props.showModal(false)
            let data = response.mjson.data.info_list;

            if(this.isNull(data)){
                this.props.showToast('暂无数据');
                return;
            }

            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            this.setState({
                renderPlaceholderOnly: 'success',
                source: ds.cloneWithRows(data)
            })

        }, (error) => {
            this.props.showModal(false)
            this.props.showToast(error.mjson.msg);

        });
    }

    cancelOrder= (order)=>{
        this.setState({
            isShow:true
        })
        this.cancelOrder = order
    }

    cancelOrderRequset =() =>{
        let params = {
            company_id: global.companyBaseID,
            trans_id:this.cancelOrder.trans_id,
        }

        this.props.showModal(true)
        request(Urls.LOGISTICS_ORDER_CANCEL, 'post', params).then((response) => {
            this.props.showModal(false)

            this.props.showToast('运单取消成功');

        }, (error) => {
            this.props.showModal(false)
            this.props.showToast(error.mjson.msg);

        });
    }


    payOrder = (order)=>{

        this.toNextPage({
            name:'PlatformChoose',
            component:PlatformChoose,
            params:{
                order:order,
            }
        })

    }

    toCarDetial = (order,car)=>{

        this.toNextPage({
            name:'LogisCarInfoScene',
            component:LogisCarInfoScene,
            params:{
                car:car,
                order:order
            }

        })

    }

    toOrderDetial = (order)=>{

        this.toNextPage({
            name:'NewCarriagePriceInfoScene',
            component:NewCarriagePriceInfoScene,
            params:{
                order:order
            }
        })
    }



}


// 运单搜索专用导航栏

class NavigationtBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value:''
        }

    }

    render() {
        return <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: Pixel.getPixel(15),
            paddingTop: Pixel.getPixel(20),
            height: Pixel.getPixel(64),
            backgroundColor: FontAndColor.COLORB0
        }}>

            <TouchableOpacity
                onPress={()=>{
                    this.props.rightClick()
                }}
            >
                <Image style={{height: Pixel.getPixel(20), width: Pixel.getPixel(20)}}
                       source={require('../../../../../images/login/navigotion_back.png')}/>
            </TouchableOpacity>

            <View style={{
                flexDirection: 'row',
                height: Pixel.getPixel(28),
                borderRadius: Pixel.getPixel(14),
                backgroundColor: 'white',
                alignItems:'center',
                paddingHorizontal:Pixel.getPixel(8),
                flex:1,
                marginHorizontal:Pixel.getPixel(15)
            }}>
                <Image style={{width: Pixel.getPixel(16), height: Pixel.getPixel(16)}}
                       source={require('../../../../../images/carSourceImages/sousuoicon.png')}/>
                <TextInput

                    style={{flex: 1, marginHorizontal: Pixel.getPixel(15)}}
                    onChangeText={(text)=>{
                        this.setState({
                            value:text
                        })
                        this.props.onChangeText(text)
                    }}
                    onBlur={()=>{

                    }}
                    value = {this.state.value}
                    onSubmitEditing={()=>{
                        this.props.onSearch(this.state.value)
                    }}
                    returnKeyType={'search'}
                    placeholder={'运单号后6位/车型名称/车架号后8位'}
                />
            </View>
            <TouchableOpacity
                onPress={()=>{
                    this.props.leftClick()
                }}
            >
            <SaasText style={{color: 'white'}}>取消</SaasText>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3,
    },


})