import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

let {height, width} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil'
import * as fontAndColor from '../../constant/fontAndColor'

var Pixel = new PixelUtil();
import HomeJobButton from './HomeJobButton';
import GetPermissionUtil from '../../utils/GetPermissionUtil';

const GetPermission = new GetPermissionUtil();
import Switch from '../../mine/accountManage/component/Switch';

export default class HomeJobItem extends PureComponent {

    constructor(props) {
        super(props);
        this.isOpen=true;
        this.allData={
            credit_mny:this.props.allData.credit_mny,
            credit_maxloanmny:this.props.allData.credit_maxloanmny,
            loan_balance_mny:this.props.allData.loan_balance_mny,
        }
        this.state = {
            type: this.props.type,
            allData: this.allData
        };
    }

    componentWillMount() {

    }

    changeType = (type) => {
        this.setState({type: type});
    }

    isEyeOpen=()=>{
        this.isOpen=!this.isOpen;
        if(this.isOpen){
            this.setState({
                allData: this.allData
            });
        }else{
            this.setState({
                allData: {
                    credit_mny:'*******',
                    credit_maxloanmny:'*****',
                    loan_balance_mny:'*****',
                }
            });
        }
    }

    render() {
        if (this.state.type == 1) {
            return (
                <View style={{alignItems: 'center', flex: 1}}>
                    <View style={{height: Pixel.getPixel(34), flexDirection: 'row'}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.isEyeOpen()
                        }}>
                            <View style={{paddingTop: Pixel.getPixel(12), flex: 1, paddingLeft: Pixel.getPixel(20)}}>
                                <Image style={{width: Pixel.getPixel(18), height: Pixel.getPixel(12)}}
                                       source={require('../../../images/financeImages/kejian.png')}></Image>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            paddingTop: Pixel.getPixel(12), flex: 1, paddingRight: Pixel.getPixel(20),
                            alignItems: 'flex-end'
                        }}>
                            <TouchableOpacity activeOpacity={0.8} style={{
                                width: Pixel.getPixel(54), height: Pixel.getPixel(17),
                                backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 10, justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: Pixel.getFontPixel(12), color: '#fff',
                                    backgroundColor: '#00000000'
                                }}>保证金</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height: Pixel.getPixel(72), alignItems: 'center'}}>
                        <Text
                            style={{
                                fontSize: Pixel.getPixel(12), color: '#fff',
                                backgroundColor: '#00000000'
                            }}>新车订单额度(万)</Text>
                        <TouchableOpacity activeOpacity={0.8} style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                    fontSize: Pixel.getPixel(32), color: '#fff', fontWeight: 'bold'
                                    , backgroundColor: '#00000000', marginTop: Pixel.getPixel(4)
                                }}> {this.state.allData.credit_mny}</Text>
                            <Text
                                style={{
                                    fontSize: Pixel.getPixel(18), color: 'rgba(255,255,255,0.4)'
                                    , backgroundColor: '#00000000'
                                }}>{' >'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: Pixel.getPixel(290), height: 1, backgroundColor: 'rgba(255,255,255,0.3)'}}>

                    </View>
                    <View style={{height: Pixel.getPixel(60), width: Pixel.getPixel(315), flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center', paddingTop: Pixel.getPixel(9)}}>
                            <Text style={{
                                fontSize: Pixel.getPixel(11), color: '#fff',
                                backgroundColor: '#00000000'
                            }}>专项贷款余额(万)</Text>
                            <Text style={{
                                fontSize: Pixel.getPixel(17), color: '#fff',
                                backgroundColor: '#00000000', fontWeight: 'bold'
                            }}>{this.state.allData.loan_balance_mny}</Text>
                        </View>
                        <View style={{
                            width: Pixel.getPixel(1), height: Pixel.getPixel(32),
                            backgroundColor: 'rgba(255,255,255,0.3)', marginTop: Pixel.getPixel(9)
                        }}>

                        </View>
                        <View style={{flex: 1, alignItems: 'center', paddingTop: Pixel.getPixel(9)}}>
                            <Text style={{
                                fontSize: Pixel.getPixel(11), color: '#fff',
                                backgroundColor: '#00000000'
                            }}>专项可用额度(万)</Text>
                            <Text style={{
                                fontSize: Pixel.getPixel(17), color: '#fff',
                                backgroundColor: '#00000000', fontWeight: 'bold'
                            }}>{this.state.allData.credit_maxloanmny}</Text>
                        </View>
                    </View>
                </View>

            );
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.props.onPress();
                }} activeOpacity={0.8} style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{
                        fontSize: Pixel.getFontPixel(11), color: '#fff',
                        backgroundColor: '#00000000', marginTop: Pixel.getPixel(10)
                    }}>新车订单额度 2000万</Text>
                </TouchableOpacity>

            );
        }
    }
}