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
    InteractionManagerm,
    RefreshControl,
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../../utils/PixelUtil';

const Pixel = new PixelUtil();
import * as fontAndColor from '../../../../constant/fontAndColor';
import {request} from '../../../../utils/RequestUtil';
import * as Urls from '../../../../constant/appUrls';
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import BaseComponent from '../../../../component/BaseComponent';
import SaasText from "../../../accountManage/zheshangAccount/component/SaasText";
//import ListFooter from './../../../component/LoadMoreFooter';

export default class FlowAllPage extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: 'loading',
            isRefreshing: false
        };


    }

    initFinish = () => {

        this.loadData()
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    }


    allRefresh = ()=>{

        this.setState({
            renderPlaceholderOnly: 'loading',
        })

        this.loadData()
    }

    loadData = ()=>{

        let params = {

            company_id: global.companyBaseID,
            page:1,
            rows:5,
            status:this.props.status,  // 0：全部 1：待付款 2：待发运 3：已发运 4：已到达 5：已完成 6：失效

        }

        request(Urls.LOGISTICS_ORDER_LIST, 'post', params).then((response) => {
            let data = response.mjson.data.info_list;

            if (typeof data === 'undefined'){
                this.setState({
                    renderPlaceholderOnly: 'noData',

                })
                return;
            }

            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            this.setState({
                renderPlaceholderOnly: 'success',
                source: ds.cloneWithRows(data)
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
            return this._renderPlaceholderView();
        }
        return (
            <ListView
                removeClippedSubviews={false}
                style={{paddingTop: Pixel.getPixel(8), backgroundColor: fontAndColor.COLORA3, flex: 1}}
                dataSource={this.state.source}
                renderRow={this._renderRow}
                initialListSize={10}
                onEndReachedThreshold={2}
                stickyHeaderIndices={[]}//仅ios
                enableEmptySections={true}
                scrollRenderAheadDistance={10}
                pageSize={10}
                onEndReached={this.toEnd}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.refreshingData}
                        tintColor={[fontAndColor.COLORB0]}
                        colors={[fontAndColor.COLORB0]}
                    />}
            />
        );
    }

    _renderRow = (movie, sectionId, rowId) => {

        return (
            <TransportOrder
                dataSource={movie}
            />
        )


    }


    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height, backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
            </View>
        );
    }

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={this.state.haveMoreData ? false : true}/>)
        }
    }

    toEnd = () => {

        // if (!this.state.isRefreshing && this.page != this.allPage) {
        //     this.page = this.page + 1;
        //     this.getFlowData(this.enter_base_id, this.user_type);
        // }

    };

    refreshingData = () => {


    }
}

export class TransportOrder extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return<View style={{padding: Pixel.getPixel(15), backgroundColor: 'white', marginBottom: Pixel.getPixel(8)}}>
            <View style={{flexDirection: 'row', alignItems: 'center', }}>
                <SaasText style={{flex: 1, color: fontAndColor.COLORA1, fontSize: 14}}>运单号234567890</SaasText>
                <SaasText style={{ color: fontAndColor.COLORA1, fontSize:12, marginRight:Pixel.getPixel(2)}}>运单号234567890</SaasText>
                <Image source={require('../../../../../images/mine/celljiantou.png')}/>
            </View>

            <View style={{
                flexDirection: 'row',
                backgroundColor: '#f8f8f8',
                marginVertical: Pixel.getPixel(15),
                padding: Pixel.getPixel(25),
                justifyContent: "space-between",
                borderRadius: Pixel.getPixel(2)
            }}>

                <View style={{alignItems: 'center',}}>
                    <Image style={{
                        width: Pixel.getPixel(12),
                        height: Pixel.getPixel(12),
                        marginBottom: Pixel.getPixel(7),
                        resizeMode: 'contain'
                    }} source={require('../../../../../images/carriagePriceImage/startLocation.png')}/>
                    <SaasText style={{fontSize: 16}}>太原市</SaasText>
                </View>
                <View style={{alignItems: 'center', marginTop: Pixel.getPixel(7)}}>
                    <SaasText style={{fontSize: 13, color: fontAndColor.COLORA1}}>大板车运输</SaasText>
                    <Image style={{
                        width: Pixel.getPixel(200),
                        height: Pixel.getPixel(6),
                        resizeMode: 'contain'
                    }} source={require('../../../../../images/carriagePriceImage/direction_line.png')}/>
                </View>

                <View style={{alignItems: 'center',}}>
                    <Image style={{
                        width: Pixel.getPixel(9),
                        height: Pixel.getPixel(9),
                        marginBottom: Pixel.getPixel(7),
                        resizeMode: 'contain'
                    }} source={require('../../../../../images/carriagePriceImage/stopLocation.png')}/>
                    <SaasText style={{fontSize: 16}}>保定市</SaasText>
                </View>


            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Pixel.getPixel(5)}}>
                <SaasText style={{color: fontAndColor.COLORA1, fontSize: 13, flex: 1}}>车辆共计：</SaasText>
                <SaasText style={{fontSize: 14, fontWeight: '400'}}>13台</SaasText>

            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: fontAndColor.COLORA4,
                borderBottomWidth: StyleSheet.hairlineWidth,
                paddingBottom: Pixel.getPixel(10)
            }}>
                <SaasText style={{color: fontAndColor.COLORA1, fontSize: 13, flex: 1}}>运费合计：</SaasText>
                <SaasText style={{fontSize: 14, color: fontAndColor.COLORB2, fontWeight: '400'}}>13.00元</SaasText>

            </View>





            <View style={{
                marginTop:Pixel.getPixel(5),
                height: Pixel.getPixel(50.5),
                backgroundColor: 'white',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent:'flex-end'
            }}>

                <TouchableOpacity activeOpacity={1} onPress={() => {

                }}>
                    <View style={{
                        width: Pixel.getPixel(100.5),
                        height: Pixel.getPixel(32.5),
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: Pixel.getPixel(2),
                        borderColor: fontAndColor.COLORA1,
                        borderWidth: Pixel.getPixel(1),

                    }}>
                        <Text style={{
                            color: fontAndColor.COLORA1,
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                        }}>取消</Text>
                    </View>
                </TouchableOpacity>
                {
                    1?
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            this.state.priceData && this.setState({isShowCallUpView: true})
                        }}>
                            <View style={{
                                width: Pixel.getPixel(100.5),
                                height: Pixel.getPixel(32.5),
                                backgroundColor:  fontAndColor.COLORB0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: Pixel.getPixel(2),
                                marginLeft:Pixel.getPixel(12)
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                                }}>支付</Text>
                            </View>
                        </TouchableOpacity>:null

                }

            </View>



            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: Pixel.getPixel(15),
                alignItems: 'center'
            }}>
                <SaasText style={{fontSize: 15, flex: 1, fontWeight: '400'}}>在途车辆</SaasText>

                <Image style={{}}
                       source={require('../../../../../images/carriagePriceImage/jiantou_downward.png')}/>
            </View>

            <CarInfo/>
            <CarInfo/>
        </View>

    }


}


class CarInfo extends Component {

    constructor(props) {
        super(props)

    }

    componentWillReceiveProps(props) {


    }

    render() {
        return <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopWidth:StyleSheet.hairlineWidth,
            borderTopColor:fontAndColor.COLORA4,
            marginTop:Pixel.getPixel(15),
            paddingTop:Pixel.getPixel(15)
        }}>
            <View>
                <SaasText style={{fontSize: 14, color: 'black', marginBottom: Pixel.getPixel(8)}}>书房里就是水电费</SaasText>
                <SaasText style={{fontSize: 13, color: fontAndColor.COLORA1, marginBottom: Pixel.getPixel(7)}}>1234567876543</SaasText>
                <SaasText style={{fontSize: 13, color: fontAndColor.COLORA1}}>2345678765432</SaasText>

            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SaasText style={{fontSize: 14, fontWeight: '400', color: fontAndColor.COLORB2, marginRight:Pixel.getPixel(5)}}>运输中</SaasText>
                <Image style={{width: Pixel.getPixel(15), height: Pixel.getPixel(15)}}
                       source={require('../../../../../images/mine/celljiantou.png')}/>
            </View>
        </View>
    }
}


const styles = StyleSheet.create({
    leftText: {
        color: '#000',
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        minWidth: Pixel.getPixel(100),
        maxWidth: Pixel.getPixel(150),
    },
    text: {
        color: '#ffffff',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        textAlign: 'center',
    },
    rightText: {
        color: '#000',
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        flex: 1,
        textAlign: 'right',
    },
})