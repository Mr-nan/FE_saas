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
import ViewPager from 'react-native-viewpager';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";

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
                <ViewPager style={ this.props.protocolType!=1 && {marginBottom:Pixel.getPixel(64)}}
                    dataSource={this.state.dataSource}    //数据源（必须）
                    renderPage={this._renderPage}         //page页面渲染方法（必须）
                    isLoop={false}                        //是否可以循环
                    autoPlay={false}                      //是否自动
                    initialPage={0}       //指定初始页面的index
                    locked={false}                        //为true时禁止滑动翻页
                    renderPageIndicator={()=><View/>}
                />
                {
                    this.props.protocolType!=1 && (
                    <TouchableOpacity style={styles.footBtn} activeOpacity={1} onPress={this.openProtocol}>
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
          let ds = new ViewPager.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.state = {
            renderPlaceholderOnly:'success',
            dataSource:ds,
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
        request(Urls.FINANCE, 'Post', maps).then((response) => {
            this.contract_id = response.mjson.data.contract_id;
            let imageItems = [];
                imageItems.push(...response.mjson.data.contract_image_path);
                    this.setState({
                        renderPlaceholderOnly:'success',
                        dataSource:this.state.dataSource.cloneWithPages(imageItems),
                    });
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    _renderPage = (data) => {

        let nowdate = Date.parse(new Date());

        return (
            <Image onLoadEnd={()=>{
                this.props.showModal(false);
            }} onLoadStart={()=>{
                this.props.showModal(true);
            }} style={{flex:1}}
                   source={{uri: data+'?'+nowdate}}
            />
        );

    }

    openProtocol=()=>{
        let maps = {
            api: Urls.FIRST_REPAYMENT_CONTRACT_SIGN,
            contract_id:this.contract_id,
        };
        this.props.showModal(true);
        request(Urls.FINANCE, 'Post', maps).then((response) => {
                this.props.showModal(false);
                StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
                    if (data.code == 1 && data.result != null) {
                        let data = JSON.parse(data.result);
                        data.is_open_electron_repayment_contract = 1;
                        StorageUtil.mSetItem(StorageKeyNames.LOAN_SUBJECT,JSON.stringify(data));
                    }
                    this.backToTop();
                    }
                );
            },
            (error) => {
                this.props.showModal(false);
                this.props.showToast(error.mjson.msg);

            });
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