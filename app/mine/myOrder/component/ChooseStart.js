/**
 * Created by hanmeng on 2018/1/8.
 */
import React, {PureComponent} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from  'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import BaseComponent from "../../../component/BaseComponent";
import TagSelectView from "./TagSelectView";
import AddressManage from "../orderwuliu/AddressManage";
const Pixel = new PixelUtil();

export default class ChooseStart extends BaseComponent {

    /**
     *  初始化
     * @param props
     **/
    constructor(props) {
        super(props);
        this.tagSelect = [{
            name: '是',
            check: true,
            id: 1
        }, {
            name: '否',
            check: false,
            id: 0
        }];
        this.state = {
            address: this.props.orderDetail.address.full_address
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
        this.props.updateIsPort(this.tagSelect[index].id);
        this.tagRef.refreshData(this.tagSelect);
    };

    /**
     *   地址回传
     **/
    updateAddress = (newAddress) => {
        this.setState({
            address: newAddress
        })
    };

    /**
     *  render
     **/
    render() {
        let address = this.state.address ? this.state.address : '请选择';
        return (
            <View style={{height: Pixel.getPixel(89), backgroundColor: '#ffffff'}}>
                <TouchableOpacity
                    onPress={() => {
                        this.toNextPage({
                            name: 'AddressManage',
                            component: AddressManage,
                            params: {
                                callBack: this.updateAddress
                            }
                        });
                    }}>
                    <View style={{
                        height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                        paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                    }}>
                        <Text >发车地</Text>
                        <View style={{flex: 1}}/>
                        <Text >{address}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.separatedLine}/>
                <View style={{
                    height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                    paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                }}>
                    <Text >是否港口提车</Text>
                    <View style={{flex: 1}}/>
                    <TagSelectView
                        buttonWidth={Pixel.getPixel(80)}
                        ref={(ref) => {
                            this.tagRef = ref;
                        }} onTagClick={this.onTagClick} cellData={this.tagSelect}/>
                </View>
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