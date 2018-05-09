import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Dimensions, TextInput, Image,ListView,RefreshControl
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

const Pixel = new PixelUtil();


export default class List extends BaseComponent {

    constructor(props) {
        super(props)
        let ds  = new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2})

        this.state = {
            renderPlaceholderOnly: "success",
            isRefreshing:false,
            source:ds.cloneWithRows(['1', '2'])
        }

    }

    initFinish() {

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

            </View>
        )
    }

    _renderRow = ()=>{
            return(
                <TransportOrder/>
            )
    }

}


// 运单搜索专用导航栏

class NavigationtBar extends Component {
    constructor() {
        super()
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
                        this.props.onChangeText(text)
                    }}
                    onBlur={()=>{
                        console.log('onBlur')
                    }}
                    onSubmitEditing={()=>{
                        console.log('onSubmitEditing')
                    }}
                    returnKeyType={'search'}
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