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
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import Switch from './component/Switch';
import AccountDeductProtocolScene from "./AccountDeductProtocolScene";
export  default class AccountSettingScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: 'blank',
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
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1,paddingTop:Pixel.getTitlePixel(64)}}>
                {/*<View style={{marginTop:Pixel.getTitlePixel(15),backgroundColor:'#fff'*/}
                {/*,paddingRight: Pixel.getPixel(15),*/}
                 {/*paddingLeft:Pixel.getPixel(15),height:Pixel.getPixel(44),flexDirection: 'row'}}>*/}
                    {/*<View style={{flex:1,justifyContent:'center'}}>*/}
                        {/*<Text allowFontScaling={false}  style={{color:'#000',fontSize: Pixel.getFontPixel(14)}}>开通电子账户</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{flex:1,justifyContent:'center',alignItems: 'flex-end'}}>*/}
                            {/*<Switch/>*/}
                    {/*</View>*/}
                {/*</View>*/}
                <TouchableOpacity style={styles.cellView} onPress={this.pushDeductProtocol}>
                    <View style={{justifyContent:'center'}}>
                        <Text allowFontScaling={false}  style={{color:'#000',fontSize: Pixel.getFontPixel(14)}}>电子账户还款设置</Text>
                        {
                            this.props.protocolType == 1 && (
                                <Text allowFontScaling={false}  style={{color:fontAndColor.COLORA1,fontSize:Pixel.getFontPixel(12), marginTop:Pixel.getPixel(5)
                                }}>查看《账户划扣授权委托书》</Text>
                            )
                        }
                    </View>
                    <View style={{justifyContent:'center',alignItems: 'center', flexDirection:'row'}}>
                        <Text allowFontScaling={false}  style={[{color:'red',fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)},this.props.protocolType == 1 && {color:fontAndColor.COLORA1}]}>{this.props.protocolType == 1 ? '已开启':'未开启'}</Text>
                        <Image style={{marginLeft:Pixel.getPixel(5)}} source={require('../../../images/mainImage/celljiantou.png')}/>
                    </View>
                </TouchableOpacity>
                <NavigationView
                    title="账户设置"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="账户设置"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    pushDeductProtocol=()=>{
        this.toNextPage({
            name: 'AccountDeductProtocolScene',
            component: AccountDeductProtocolScene,
            params: {
                protocolType:this.props.protocolType,
            }
        });
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
    topViewStyle: {
        flex: 1,
        height: Pixel.getPixel(44),
        justifyContent: 'center'
    },
    cellView:{
        marginTop:Pixel.getTitlePixel(15),
        backgroundColor:'#fff',
        paddingRight: Pixel.getPixel(15),
        paddingLeft:Pixel.getPixel(15),
        flexDirection: 'row',
        paddingVertical:Pixel.getPixel(10),
        alignItems:'center',
        justifyContent:'space-between',
    }
})