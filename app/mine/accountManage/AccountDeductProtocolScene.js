/**
 * Created by zhengnan on 2017/8/14.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    WebView,
    TouchableOpacity,
    Dimensions,

} from 'react-native';

import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';

const {width, height} = Dimensions.get('window');


export default class AccountDeductProtocolScene extends BaseComponent {
    render(){
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{width: width, flex:1}}>
                    {this.loadView()}
                    <NavigationView
                        title="账户划扣授权委托书"
                        backIconClick={this.backPage}
                    />
                </View>
            )
        }
        return(
            <View style={styles.rootView}>
                <WebView style={this.props.protocolType !=1 && {marginBottom:Pixel.getPixel(44)}} source={{uri:'https:www.hao123.com'}}/>
                {
                    this.props.protocolType!=1 && (
                    <TouchableOpacity style={styles.footBtn} activeOpacity={1}>
                        <Text style={{color:'white',fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),textAlign:'center'}}>签署合同并开通电子账户还款</Text>
                    </TouchableOpacity>
                    )
                }
                <NavigationView title="账户划扣授权委托书" backIconClick={this.backPage}/>
            </View>
        )
    }
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly:'success'
        };
      }

    initFinish=()=>{

      this.loadData();
    }

    allRefresh=()=>{
        this.loadData();
    }

    loadData=()=>{

        this.setState({
            renderPlaceholderOnly:'loading'
        });
        let maps = {
            api: Urls.FIRST_REPAYMENT_CONTRACT,
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
            console.log(response.mjson);
                    this.setState({
                        renderPlaceholderOnly:'success'
                    });
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    openProtocol=()=>{

    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    footBtn:{
        backgroundColor:fontAndColor.COLORB0,
        left:0,
        right:0,
        bottom:0,
        height:Pixel.getPixel(44),
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
    }
})