import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View, Dimensions, Image,StyleSheet
} from 'react-native';
import BaseComponent from '../../../component/BaseComponent';
import NavigatorView from '../../../component/AllNavigationView';

const {width} = Dimensions.get('window');
import * as FontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import {request} from '../../../utils/RequestUtil';
import * as Urls from '../../../constant/appUrls';
const signed_icon = require('../../../../images/signed_icon.png');
const no_sign_icon = require('../../../../images/no_sign_icon.png');

const Pixel = new PixelUtil();

export default class TransitInformation extends BaseComponent {
    constructor(props) {
        super(props);
        this.addressInfo = [{date: '2017-12-12', time: '18:00',status: 1, statusText: '已签收',address:'山西太原市阿斯蒂芬'},
            {date: '2017-12-12', time: '18:00',status: 2, statusText: '正在配送中',address:'山西太原市阿斯蒂芬'}, {date: '2017-12-12', time: '18:00',statusText: '已出库',status: 3, address:'山西太原市阿斯蒂芬'}]
        this.state = {
            renderPlaceholderOnly: false,
            payStatus: true
        }
    }

    initFinish() {
        this.setState({
            renderPlaceholderOnly: 'success'
        });
    }

    _renderItem = () => {
        return (
            <View style={{flex: 1,paddingBottom:Pixel.getPixel(10)}}>
                {
                    this.addressInfo.map((data,index)=>{
                        return(
                            <View key={index+'addressInfo'} style={{marginLeft: Pixel.getPixel(15), flexDirection: 'row'}}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{color: FontAndColor.COLORA1,fontSize:Pixel.getPixel(16)}}>{data.date}</Text>
                                    <Text style={{fontSize:Pixel.getPixel(16),marginTop: Pixel.getPixel(8),color: FontAndColor.COLORA1}}>{data.time}</Text>
                                </View>
                                <View style={{alignItems: 'center', marginHorizontal: Pixel.getPixel(8)}}>
                                    <Image source={data.status==1?signed_icon:no_sign_icon}></Image>
                                    <View style={[{
                                        width: Pixel.getPixel(2),
                                        height: Pixel.getPixel(70),
                                        marginVertical:Pixel.getPixel(3),
                                        backgroundColor: FontAndColor.COLORA4
                                    },this.addressInfo.length==index+1?{height:0}:{}]}></View>
                                </View>

                                <View>
                                    <Text style={{color: FontAndColor.COLORA1,fontSize:Pixel.getPixel(16)}}>{data.statusText}</Text>
                                    <Text style={{fontSize:Pixel.getPixel(16),color: FontAndColor.COLORA1,marginTop:Pixel.getPixel(10)}}>{data.address}</Text>
                                </View>
                            </View>
                        );
                    })
                }

            </View>
        );

    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title='在途信息' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>

                <View style={{flex: 1, marginTop: Pixel.getTitlePixel(65),paddingTop:Pixel.getPixel(20)}}>
                    {
                        this._renderItem()
                    }
                </View>
                </ScrollView>
                <NavigatorView title='在途信息' backIconClick={this.backPage}/>
            </View>)
        }

    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: FontAndColor.COLORA3,
        flex: 1,
    },


});
