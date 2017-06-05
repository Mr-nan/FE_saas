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
let childItems = [];
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import OpenIndividualAccountScene from './OpenIndividualAccountScene';
export  default class BindCardScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        childItems = [];
        childItems.push({title: '绑定银行卡',
            value: require('../../../images/mainImage/bindcard.png'),click:()=>{
            this.props.showToast('绑卡');
            }});
        childItems.push({title: '修改账户信息',
            value: require('../../../images/mainImage/changeaccount.png'),click:()=>{
                this.toNextPage({name:'OpenIndividualAccountScene',component:OpenIndividualAccountScene,params:{}})
            }});
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: ds.cloneWithRows(childItems)
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
                    style={{marginTop: Pixel.getTitlePixel(79)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                />
                <NavigationView
                    title="绑定银行卡"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <TouchableOpacity onPress={()=>{
                movie.click();
            }} activeOpacity={0.8} style={{width:width,height:Pixel.getPixel(44),backgroundColor:'#fff',flexDirection: 'row'}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:Pixel.getPixel(24),height:Pixel.getPixel(24)}}
                           source={movie.value}/>
                </View>
                <View style={{flex:4,justifyContent:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color: '#000'}}>{movie.title}</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                    <Image style={{width:Pixel.getPixel(14),height:Pixel.getPixel(14),marginRight:Pixel.getPixel(15)}}
                           source={require('../../../images/mainImage/celljiantou.png')}/>
                </View>
            </TouchableOpacity>
        )

    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="绑定银行卡"
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
        height: Pixel.getPixel(1),


    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})