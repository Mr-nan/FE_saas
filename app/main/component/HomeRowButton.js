import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native';

let {height, width} = Dimensions.get('window');
import  PixelUtil from '../../utils/PixelUtil'
import  * as fontAndColor from '../../constant/fontAndColor'
var Pixel = new PixelUtil();
export default class HomeRowButton extends PureComponent {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: ds.cloneWithRows([1, 2, 3, 4, 5, 6, 7])
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={{width:width,backgroundColor:fontAndColor.COLORA3}}>
                <View style={{width:width,backgroundColor:'#fff',
                marginBottom:Pixel.getPixel(10),alignItems: 'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(15),
                        fontWeight: 'bold',marginTop:Pixel.getPixel(16)}}>推荐车源</Text>

                    <ListView
                        style={{marginTop:Pixel.getPixel(15),marginBottom:Pixel.getPixel(15)}}
                        removeClippedSubviews={false}
                        dataSource={this.state.source}
                        horizontal={true}
                        renderRow={this._renderRow}
                        renderSeparator={this._renderSeparator}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        let left = 0;
        if (rowId == 0) {
            left = Pixel.getPixel(12);
        }
        return (
            <TouchableOpacity onPress={()=>{

            }} activeOpacity={0.8} style={{width:width-width/8-width/8,height:Pixel.getPixel(134),
            backgroundColor:'#f5f5f5',marginLeft:left,
            paddingTop:Pixel.getPixel(15),paddingBottom: Pixel.getPixel(15),
            paddingLeft:Pixel.getPixel(12),paddingRight: Pixel.getPixel(12)}}>
                <Text numberOfLines={1} allowFontScaling={false} style={{fontSize: Pixel.getFontPixel(14)}}>[北京]奥迪
                A7(进口) 2014款 35 FSI 技术奥迪奥迪</Text>
                <View style={{marginTop:Pixel.getPixel(7),flexDirection:'row',alignItems:'center'}}>
                    <View style={{flex:1}}>
                        <Text numberOfLines={1} allowFontScaling={false} style={{
                            fontSize: Pixel.getFontPixel(12),color:'#9b9b9b'}}>
                            2016年06月/23万公里
                        </Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Text numberOfLines={1} allowFontScaling={false} style={{
                            fontSize: Pixel.getFontPixel(14),color:'#fa5741',fontWeight: 'bold'}}>
                            21.0万
                        </Text>
                    </View>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),
                flexDirection:'row',alignItems:'center'}}>
                    <Image source={require('../../../images/welcomFirst@2x.png')}
                           style={{flex:1,height:Pixel.getPixel(57),resizeMode: 'stretch',
                           marginRight:Pixel.getPixel(8)}}/>
                    <Image source={require('../../../images/welcomFirst@2x.png')}
                           style={{flex:1,height:Pixel.getPixel(57),resizeMode: 'stretch',
                           marginLeft:Pixel.getPixel(4),marginRight:Pixel.getPixel(4)}}/>
                    <Image source={require('../../../images/welcomFirst@2x.png')}
                           style={{flex:1,height:Pixel.getPixel(57),resizeMode: 'stretch',
                           marginLeft:Pixel.getPixel(8)}}/>
                </View>
            </TouchableOpacity>

        )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={{width:Pixel.getPixel(12),height:Pixel.getPixel(134),
            backgroundColor:'#fff'}} key={sectionId + rowId}>
            </View>
        )
    }
}