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
let MovleData = require('./InventoryAdjustInfo.json');
let movies = MovleData.retdata;
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
export default class InventoryRepaymentInfoScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: ds.cloneWithRows(movies.list),
            renderPlaceholderOnly: 'blank'
        };
    }

    initFinish = () => {
        this.setState({renderPlaceholderOnly: 'success'});
    }


    render() {
        let movie = movies;
        let repaymentStatus = '';
        if (movie.status == '0') {
            repaymentStatus = '未还';
        } else if (movie.status == '1') {
            repaymentStatus = '待确认';
        } else {
            repaymentStatus = '已还';
        }
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <NavigationView
                    title="调整详情"
                    backIconClick={this.backPage}
                />
                <View style={{width:width,height:Pixel.getPixel(75),
                backgroundColor: '#ffffff',flexDirection:'row',
                paddingRight:Pixel.getPixel(15),paddingLeft:Pixel.getPixel(15),marginTop:Pixel.getTitlePixel(74)}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text
                            style={{fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30), color:fontAndColor.COLORA0}}>
                            还款日：{movie.dead_line_str}</Text>
                        <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                    color:fontAndColor.COLORA1,marginTop:Pixel.getPixel(9)}}>{repaymentStatus}</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                    color:fontAndColor.COLORB2,fontWeight: 'bold'}}>{movie.repaymentmny}</Text>
                        <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                    color:fontAndColor.COLORA1,marginTop:Pixel.getPixel(9)}}>调整：{movie.adjustmoney}</Text>
                    </View>
                </View>
                <View style={{width:width-Pixel.getPixel(30),height:1,backgroundColor: fontAndColor.COLORA3}}></View>
                <View style={{width:width,height:Pixel.getPixel(44),
                backgroundColor: '#ffffff',flexDirection:'row',
                paddingRight:Pixel.getPixel(15),paddingLeft:Pixel.getPixel(15)}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text
                            style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28), color:fontAndColor.COLORA1}}>
                            调整前</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                    color:fontAndColor.COLORA0,fontWeight: 'bold'}}>{movie.agomny}</Text>
                    </View>
                </View>
                <View style={{width:width,height:1,backgroundColor: fontAndColor.COLORA3}}></View>
                <ListView
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor:fontAndColor.COLORA3,alignItems: 'center'}}>
                <NavigationView
                    title="还款详情"
                    backIconClick={this.backPage}
                />
                {this.loadView()}
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <View style={{width:width,height:Pixel.getPixel(44),
                backgroundColor: '#ffffff',flexDirection:'row',
                paddingRight:Pixel.getPixel(15),paddingLeft:Pixel.getPixel(15)}}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                    color:fontAndColor.COLORA1}}>{movie.adjusttime}</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                    color:fontAndColor.COLORA0,fontWeight: 'bold'}}>{movie.adjustmoney}</Text>
                    <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.MARKFONT22),
                    color:fontAndColor.COLORA1}}>{movie.adjusttype}</Text>
                </View>
            </View>
        )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        height: Pixel.getPixel(1),
        backgroundColor: fontAndColor.COLORA3

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'},
    parentStyle: {
        height: Pixel.getPixel(44),
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: fontAndColor.COLORB0,
    },
    childStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        color: '#ffffff',
    }
})