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
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import {request} from '../../../utils/RequestUtil';
import * as Urls from '../../../constant/appUrls';
import BaseComponent from '../../../component/BaseComponent';
export  default class FlowRechargePage extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: ds.cloneWithRows(['1','2','3','4','5']),
            time:''
        };
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
    }

    initFinish = () => {
        this.setState({
            renderPlaceholderOnly: 'success',
        });
    }

    changeTime=(time)=>{
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            time:time,
            source: ds.cloneWithRows(['1','2','3','4','5']),
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ListView
                    style={{marginTop:Pixel.getPixel(1)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
            return (
                <View style={{
                    flex:1, height: Pixel.getPixel(73),
                    backgroundColor: '#fff', flexDirection: 'row',paddingLeft: Pixel.getPixel(15),
                    paddingRight:Pixel.getPixel(15)
                }}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{color: '#000',fontSize: Pixel.getFontPixel(14)}}>充值</Text>
                        <Text style={{color: fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(12)}}>
                            {this.state.time} 13:00</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'flex-end'}}>
                        <Text style={{color: '#000',fontSize: Pixel.getFontPixel(20)}}>13万</Text>
                    </View>
                </View>
            )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={{width:width,height:Pixel.getPixel(1),backgroundColor:fontAndColor.COLORA3}} key={sectionId + rowId}>
            </View>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}

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