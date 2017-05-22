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
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
const childItems = [];
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import AccountInfoScene from './AccountInfoScene';
export  default class BankCardScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: ds.cloneWithRows(['1'])
        };
    }

    initFinish = () => {
        this.setState({
            renderPlaceholderOnly: 'success',
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ListView
                    style={{marginTop: Pixel.getTitlePixel(79),marginRight:Pixel.getPixel(15),marginLeft:Pixel.getPixel(15)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                />
                <NavigationView
                    title="银行卡"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
            return (
                <View
                    style={{ height: Pixel.getPixel(100),backgroundColor: '#fff', flexDirection: 'row'
                    ,width:width-Pixel.getPixel(30),borderWidth: 1,borderColor: fontAndColor.COLORA4,
                    borderRadius:Pixel.getPixel(6),paddingRight:Pixel.getPixel(15),paddingLeft:Pixel.getPixel(15)
                }}>
                    <View style={{flex:2,justifyContent:'center'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(17),color:'#000'}}>银行卡号</Text>
                        <Text style={{fontSize: Pixel.getFontPixel(15),color:fontAndColor.COLORA1,marginTop:Pixel.getPixel(5)}}>
                            6227 **** **** *** 6275
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        this.props.showToast('解绑')
                    }} activeOpacity={0.8} style={{flex:1,justifyContent:'center',alignItems: 'flex-end'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(15),color:fontAndColor.COLORA2}}>解除绑定</Text>
                    </TouchableOpacity>
                </View>
            )


    }



    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="银行卡"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }


}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})