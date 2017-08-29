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
            source: ds.cloneWithRows(this.props.list)
        }
    }

    componentWillMount() {

    }

    render() {
        if (this.props.list == null || this.props.list.length <= 0) {
            return <View></View>
        }
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
        let imageList = [];
        for (let i = 0; i < movie.imgs.length; i++) {
            if (movie.imgs[i].url) {
                imageList.push(<Image key={'imgs'+i} source={{uri:movie.imgs[i].url}}
                                      style={{flex:1,height:Pixel.getPixel(57),resizeMode: 'stretch',
                           marginRight:Pixel.getPixel(8)}}/>);
            }
        }
        let left = 0;
        if (rowId == 0) {
            left = Pixel.getPixel(12);
        }
        let DIDIAN;
        if (movie.city_name.length) {
            DIDIAN = '[' + movie.city_name + ']'
        } else {
            DIDIAN = '';
        }
        return (
            <TouchableOpacity onPress={()=>{
                this.props.onPress(movie.id);
            }} activeOpacity={0.8} style={{width:width-width/8-width/8,height:Pixel.getPixel(134),
            backgroundColor:'#f5f5f5',marginLeft:left,
            paddingTop:Pixel.getPixel(15),paddingBottom: Pixel.getPixel(15),
            paddingLeft:Pixel.getPixel(12),paddingRight: Pixel.getPixel(12)}}>
                <Text numberOfLines={1} allowFontScaling={false} style={{fontSize: Pixel.getFontPixel(14)}}>
                    {DIDIAN + movie.model_name}</Text>
                <View style={{marginTop:Pixel.getPixel(7),flexDirection:'row',alignItems:'center'}}>
                    <View style={{flex:2}}>
                        <Text numberOfLines={1} allowFontScaling={false} style={{
                            fontSize: Pixel.getFontPixel(12),color:'#9b9b9b'}}>
                            {this.dateReversal(movie.create_time + '000') + '/' + movie.mileage + '万公里'}
                        </Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Text numberOfLines={1} allowFontScaling={false} style={{
                            fontSize: Pixel.getFontPixel(14),color:'#fa5741',fontWeight: 'bold'}}>
                            {movie.dealer_price ? movie.dealer_price : ''}
                        </Text>
                    </View>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),
                flexDirection:'row',alignItems:'center'}}>
                    {imageList}
                </View>
            </TouchableOpacity>

        )
    }
    dateReversal = (time) => {
        const date = new Date();
        date.setTime(time);
        return (date.getFullYear() + "年" + (date.getMonth() + 1) + "月");

    };

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={{width:Pixel.getPixel(12),height:Pixel.getPixel(134),
            backgroundColor:'#fff'}} key={sectionId + rowId}>
            </View>
        )
    }
}