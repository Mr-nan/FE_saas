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
    PixelRatio,
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from './SCBZJTabBar';
import NavigationView from '../../component/AllNavigationView';
import SCBJZChildScene from '../shuchebaozhengjin/SCBJZChildScene';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
var onePT = 1 / PixelRatio.get(); //一个像素
export  default class SCBZJScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: 'blank',
            details:'open',
            money:0,
            scmoney:0,
            totalmoney:0,
            status:-1,
        };
    }

    initFinish = () => {
        this.getData(1);
    }

    getData = (flag) => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    enter_base_ids: datas.company_base_id,
                };
                request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
                    .then((response) => {
                        let total = 0;
                        let left= 0;
                        let right = 0;
                        let status = -1;
                        if (response.mjson.data != null) {
                            response.mjson.data[315].map((item) => {
                                if(item.account_type_id == 11){//赎车保证金
                                    left = parseFloat(left) + parseFloat(item.balance)
                                    status = item.status;
                                } else if(item.account_type_id == 2){ //保证金
                                    right = parseFloat(right) + parseFloat(item.balance)
                                    status = item.status;
                                }
                            })
                            total = parseFloat(left) + parseFloat(right);
                        }
                        this.setState({
                            scmoney:left,
                            money:right,
                            totalmoney:total,
                            status:status,
                            renderPlaceholderOnly: 'success'
                        });
                        if(flag == 2){
                            this.refs.po.upDataView();
                        }
                    }, (error) => {
                        this.setState({renderPlaceholderOnly: 'success'});
                    });
            } else {
                this.setState({
                    renderPlaceholderOnly: 'error',
                });
            }
        })
    }

    /**
     * from @zhaojian
     *
     * 加载页面
     **/
    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{width:width,height:height,backgroundColor: fontAndColor.COLORA3,flexDirection:'column'}}>
                <View style={{marginTop: Pixel.getTitlePixel(64)}}>
                {
                    (this.state.status == 0 ||  this.state.status == 1 ||  this.state.status == 2 )&&
                    <View style={{width:width ,height:Pixel.getPixel(40), backgroundColor:'#FFF8EA',justifyContent:'center',paddingLeft:Pixel.getPixel(15)}} >
                        <Text style={{color:'#846545',fontSize:Pixel.getFontPixel(15)}}>
                            {this.getStatusStr(this.state.status)}
                        </Text>
                    </View>
                }
                <View style={{width:width,height:onePT,backgroundColor:'#D8D8D8'}}/>
                <View style={{flexDirection:'row',height:Pixel.getPixel(45),paddingLeft:Pixel.getPixel(15),paddingRight:Pixel.getPixel(15),backgroundColor:'#ffffff',alignItems:'center'}}>
                    <Text style={{fontSize:Pixel.getFontPixel(14),color:'#333333'}}>保证金总额: </Text>
                    <Text style={{fontSize:Pixel.getFontPixel(12),color:'#FA5741',flex:1}}>{this.state.totalmoney}元</Text>
                    <TouchableOpacity  onPress={()=>{
                        if(this.state.details =='open'){
                            this.setState({details: 'close'});
                        }else {
                            this.setState({details: 'open'});
                        }
                    }}>
                        <View style={{backgroundColor:'#e6f9f9',width:Pixel.getPixel(90),borderRadius:Pixel.getPixel(9),height:Pixel.getPixel(19),flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                            <Text style={{fontSize:Pixel.getFontPixel(12),color:'#010101'}}>
                            { this.state.details =='open'  ?'收起详情 ':'展开详情 '}
                            </Text>
                            {
                                this.state.details =='open' ?
                                    <Image style={{width:Pixel.getPixel(9),height:Pixel.getPixel(5)}} source={require('../../../images/jt_shang.png')}/>:
                                    <Image style={{width:Pixel.getPixel(9),height:Pixel.getPixel(5)}} source={require('../../../images/jt_xia.png')}/>
                            }

                        </View>
                    </TouchableOpacity>
                </View>
                </View>
                <View style={{width:width,height:onePT,backgroundColor:'#D8D8D8'}}/>
                {
                    this.state.details =='open' && <Text style={{color:'#999999',fontSize:Pixel.getFontPixel(12),backgroundColor:'#ffffff'
                        ,paddingTop:Pixel.getPixel(11),paddingBottom:Pixel.getPixel(11),paddingLeft:Pixel.getPixel(15),paddingRight:Pixel.getPixel(15)}}>
                        保证金总额=赎车保证金+保证金可用金额
                    </Text>
                }
                {
                    this.state.details =='open' && <View style={{backgroundColor:'#ffffff',width:width,alignItems:'center',justifyContent:'center'}}>
                        <Image resizeMode={'cover'} source={require('../../../images/xu_line.png')} style={{width:width-Pixel.getPixel(30),height:onePT}} />
                    </View>
                }
                {
                    this.state.details =='open' && <View style={{flexDirection:'row',height:Pixel.getPixel(54),backgroundColor:'#ffffff',marginBottom:Pixel.getPixel(10),alignItems:'center'}}>
                        <Text style={{color:'#000000',fontSize:Pixel.getFontPixel(12),flex:1,textAlign:'center'}}>{'赎车保证金 \n'}{this.state.scmoney}{'元'}</Text>
                        <View style={{width:onePT,height:Pixel.getPixel(25),backgroundColor:'#D8D8D8'}}/>
                        <Text style={{color:'#000000',fontSize:Pixel.getFontPixel(12),flex:1,textAlign:'center'}}>{'保证金可用金额 \n'}{this.state.money}{'元'}</Text>
                    </View>
                }
                <ScrollableTabView
                    style={{flex:1}}
                    initialPage={0}
                    locked={true}
                    scrollWithoutAnimation={true}
                    renderTabBar={() => <RepaymenyTabBar tabName={["未支付", "已支付"]}/>}>
                    <SCBJZChildScene ref = 'po' tabLabel="ios-paper1" opt_user_id={'0'} navigator={this.props.navigator} page={'未支付'}
                                     status={this.state.status}  callBack={()=>this.getData(2)}/>
                    <SCBJZChildScene tabLabel="ios-paper2" opt_user_id={'2'} navigator={this.props.navigator} page={'已支付'}/>
                </ScrollableTabView>
                <NavigationView title="保证金" backIconClick={this.backPage}/>
            </View>
        );
    }

    /**
     * from @zhaojian
     *
     * 加载完成
     **/
    componentDidUpdate() {
        if (this.state.renderPlaceholderOnly == 'success') {

        }
    }

    getStatusStr = (stateCode) => {
            let tempTitle = []
            if (stateCode == '0') {
                tempTitle = ['支付保证金前，请先开通恒丰账户。']
            } else if (stateCode == '1') {
                tempTitle = ['支付保证金前，请先完成绑卡。']
            } else if (stateCode == '2') {
                tempTitle = ['您的恒丰卡未激活 ，请激活后再进行支付。']
            }else {
                tempTitle = ['']
            }
            return tempTitle;
    }

    /**
     * from @zhaojian
     *
     * 页面加载完成前的loading
     **/
    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView title="保证金" backIconClick={this.backPage}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    image: {
        width: 43,
        height: 43,
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'red',
    }
})