/*
*
* created by marongting on 2018-10-16
*
* */

import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    Dimensions, StatusBar,

} from 'react-native';

const {width,height} = Dimensions.get('window');
import PixelUtil from '../../../../utils/PixelUtil';
const Pixel = new PixelUtil;
import * as fontColor from '../../../../constant/fontAndColor';
import BaseComponent from '../../../../component/BaseComponent';
import NavigationView from '../../../../component/AllNavigationView';
import {request} from "../../../../utils/RequestUtil";
import * as Urls from "../../../../constant/appUrls";
import AlertPhoneDeteilScene from "./AlertPhoneDeteilScene";


export default class AlertPhoneNumberScene extends BaseComponent{
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 == r2});
        this.state = {
            renderPlaceholderOnly:'blank',
            source:ds.cloneWithRows([])
        }
    }

    _renderPlaceholderView() {
        return(
            <View style={{width:width,height:height,backgroundColor:fontColor.COLORA3}}>
                {this.loadView()}
                <NavigationView backIconClick={this.backPage} title='修改预留手机号' wrapStyle={{backgroundColor:'white'}}
                                titleStyle={{color:fontColor.COLORD2}}/>
            </View>
        )
    }

    initFinish(){
        this.loadData();
    }

    loadData = () => {
        let maps = {
            enter_base_id: global.companyBaseID,
           // enter_base_id:'70260',
            bank_id:'gfyh',
            status:'3'
        };
        request(Urls.GET_BANK_CARD_LIST, 'Post', maps)
            .then((response) => {
                console.log('response',response);
                this.data = response.mjson.data;
                this.setState({
                    renderPlaceholderOnly: 'success',
                    source: this.state.source.cloneWithRows(this.data)
                });
            }, (error) => {
                this.setState({
                    renderPlaceholderOnly: 'error',
                });
                this.props.showToast(error.mjson.msg);
            });
    }

    render() {
        if(this.state.renderPlaceholderOnly !== 'success'){
            return this._renderPlaceholderView();
        }

        return (
            <View style={{backgroundColor:fontColor.COLORD1,flex:1,paddingTop:Pixel.getTitlePixel(64)}}>
                <StatusBar barStyle="dark-content"/>
                <ListView dataSource={this.state.source}
                          renderRow={this.renderRow}
                          renderFooter={this.footer}/>

                <NavigationView backIconClick={this.backPage} title='修改预留手机号' wrapStyle={{backgroundColor:'white'}}
                                titleStyle={{color:fontColor.COLORD2}}/>
            </View>
        );
    }
    footer = ()=>{
        this.text = '如您在银行柜台修改了绑定卡的手机号，需要在此功能中修改绑定\n'+'银行手机号，否则将无法收到银行发送的验证码';
        return(
            <View style={{width:width,marginLeft:Pixel.getPixel(13),flexDirection: 'row',marginTop:Pixel.getPixel(25),alignItems: 'flex-start'}}>
                <Image source={require('../../../../../images/mine/guangfa_account/tishi.png')}/>
                <Text allowFontScaling={false} style={{marginLeft:Pixel.getPixel(6),color:'#cccccc',fontSize:Pixel.getPixel(11),lineHeight:Pixel.getPixel(16)}}>{this.text}</Text>
            </View>
        )
    }
    next = (row) => {
        this.toNextPage({
            name:'AlertPhoneDeteilScene',
            component:AlertPhoneDeteilScene,
            params:{
                bankCardNo:row.bank_card_no,
                 bankCardId:row.id,
                 mobile:row.mobile
            }
        })
    }

    renderRow = (rowData,sectionID,rowID) =>{
        this.cardNO = rowData.bank_card_no && rowData.bank_card_no != 0 ? rowData.bank_card_no.replace(/^(....).*(....)$/, "$1****$2"):'***** ***** *****';
        return(
            <TouchableOpacity onPress={()=>{this.next(rowData)}}  style={[styles.openCountView, rowID == '0' && {marginTop:Pixel.getPixel(15)}]}>
                <View>
                    <View style={styles.header}>
                        <Image style={styles.icon} source={require('../../../../../images/mine/guangfa_account/ka.png')}/>
                        <Text allowFontScaling={false} style={styles.text}>{this.cardNO}</Text>
                    </View>
                    <View style={[styles.header,{alignItems:'flex-end',height:Pixel.getPixel(30)}]}>
                        <Image style={styles.icon} source={require('../../../../../images/mine/guangfa_account/shouji.png')}/>
                        <Text allowFontScaling={false} style={[styles.text,{color:'#666666'}]}>{rowData.mobile}</Text>
                    </View>
                </View>
                <View style={{width:Pixel.getPixel(43),height:Pixel.getPixel(25),borderRadius: Pixel.getPixel(25),marginTop:Pixel.getPixel(48),backgroundColor:'rgba(8,195,197,0.1)',alignItems:'center',justifyContent: 'center'}}>
                    <Text style={{color:'#05C5C2',fontSize:Pixel.getFontPixel(15)}}>修改</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    openCountView:{
        width:Pixel.getPixel(345),
        height:Pixel.getPixel(91),
        backgroundColor:'white',
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(82),
        borderRadius:Pixel.getPixel(5),
        borderWidth:Pixel.getPixel(1),
        borderColor:'white',
        shadowOffset: {width:0,height:Pixel.getPixel(8)},
        shadowColor: 'rgb(157,161,179)',
        shadowRadius:Pixel.getPixel(18),
        shadowOpacity:0.1,
        paddingRight: Pixel.getPixel(18),
        paddingLeft: Pixel.getPixel(20),
        justifyContent:'space-between',
        flexDirection:'row'
        // elevation: 10,
    },
    header:{
        height:Pixel.getPixel(45),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'flex-end'

    },
    icon:{
        width:Pixel.getPixel(20),
        height:Pixel.getPixel(20),

    },
    text:{
        marginLeft:Pixel.getPixel(15),
        paddingTop:Pixel.getPixel(3),
        color:fontColor.COLORD2,
        fontSize:Pixel.getFontPixel(18),
    },
    tip:{
        height:Pixel.getPixel(17),
        marginLeft:Pixel.getPixel(24),
        marginTop: Pixel.getPixel(12),
        color:fontColor.COLORA1,
        fontSize:Pixel.getFontPixel(12),
    }
})

