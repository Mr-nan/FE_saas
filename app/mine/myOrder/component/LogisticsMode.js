/**
 * Created by hanmeng on 2018/1/8.
 */
import React, {PureComponent} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
} from  'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import TagSelectView from "./TagSelectView";
import FillWaybill from "../orderwuliu/FillWaybill";
import BaseComponent from "../../../component/BaseComponent";
const Pixel = new PixelUtil();

export default class LogisticsMode extends BaseComponent {

    /**
     *  初始化
     * @param props
     **/
    constructor(props) {
        super(props);
        this.tagSelect = [{
            name: '物流',
            check: true,
            id: 1
        }, {
            name: '自提',
            check: false,
            id: 0
        }];
        this.state = {
            fillWaybill: true,
            alreadyChoose: false,
            waybillState: ''
        }
    }

    /**
     *  页面 Receive
     * @param nextProps new Props
     **/
    componentWillReceiveProps(nextProps) {

    }

    onTagClick = (dt, index) => {
        //单选
        this.tagSelect.map((data) => {
            data.check = false;
        });
        this.tagSelect[index].check = !this.tagSelect[index].check;
        this.props.updateLogisticsType(this.tagSelect[index].id);
        this.tagRef.refreshData(this.tagSelect);
        if (index === 0) {
            this.setState({
                fillWaybill: true
            });
        } else {
            this.setState({
                fillWaybill: false
            });
        }
    };

    /**
     *  0自提1全款到店2融资到店3融资到库4库到店
     **/
    logisticsTypeRouting = (orderState) => {
        if (orderState === 2) {
            return 1;
        }
    };

    /**
     *  render
     **/
    render() {
        return (
            <View style={{backgroundColor: '#ffffff'}}>
                {!this.state.alreadyChoose && (<View style={{
                    height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                    paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                }}>
                    <Text >交车方式</Text>
                    <View style={{flex: 1}}/>
                    <TagSelectView
                        buttonWidth={Pixel.getPixel(80)}
                        textSize={Pixel.getPixel(15)}
                        paddingHorizontal={Pixel.getPixel(8)}
                        ref={(ref) => {
                            this.tagRef = ref;
                        }} onTagClick={this.onTagClick} cellData={this.tagSelect}/>
                </View>)}
                {this.state.fillWaybill && (<View style={styles.separatedLine}/>)}
                {this.state.fillWaybill && (
                    <TouchableOpacity
                        onPress={() => {
                            this.toNextPage({
                                name: 'FillWaybill',
                                component: FillWaybill,
                                params: {
                                    orderId: this.props.orderDetail.id,
                                    logisticsType: this.logisticsTypeRouting(this.props.orderState),
                                    transId: this.props.orderDetail.orders_item_data[0].trans_id,
                                    vType: this.props.orderDetail.orders_item_data[0].car_data.v_type
                                }

                            });
                        }}>
                        <View style={{
                            height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                            paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                        }}>
                            <Text >填写运单</Text>
                            <View style={{flex: 1}}/>
                            <Text style={{color: fontAndColor.COLORB0}}>{this.state.waybillState}</Text>
                            <Image source={require('../../../../images/mainImage/celljiantou.png')}/>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    }
});