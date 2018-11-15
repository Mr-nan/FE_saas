/**
 * Created by dyg on 2018/11/05.
 */
import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    TouchableWithoutFeedback,
    NativeModules,
    ListView,
    RefreshControl,
} from "react-native";
import BaseComponent from "../../component/BaseComponent";
import PixelUtil from "../../utils/PixelUtil";
import * as fontAndColor from "../../constant/fontAndColor";
import NavigationBar from "../../component/NavigationBar";
import {request} from "../../utils/RequestUtil";
import * as Urls from '../../constant/appUrls';
import SaasText from "../accountManage/zheshangAccount/component/SaasText";
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";

let Pixel = new PixelUtil();
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
let Platform = require('Platform');

export default class OpenAccountList extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            renderPlaceholderOnly:'loading',
            dataSource:new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2}),
            isRefreshing:false
        }
    }

    initFinish = () => {

       this.getData()
    }

    refreshingData = ()=>{
        this.getData()
    }


    getData = ()=>{

        if(this.state.renderPlaceholderOnly == 'success'){
            this.setState({
                isRefreshing:true
            })
        }

        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT,(data)=>{

            if(data.code == 1){
                let result = JSON.parse(data.result)
                request(Urls.CHANNEL_OPEN_STATUS, 'post', {merge_id:result.merge_id}).then((response) => {
                    this.setState({
                        isRefreshing:false,
                        renderPlaceholderOnly:'success',
                        dataSource:this.state.dataSource.cloneWithRows([response.mjson.data.aicaiyoudao])
                    })
                }, (error) => {
                    this.setState({
                        renderPlaceholderOnly:'success',
                        isRefreshing:false
                    })
                    this.props.showToast(error.mjson.msg);
                });
            }
        })

    }

    render() {

        if(this.state.renderPlaceholderOnly != 'success'){
            return(
                <View style={styles.container}>
                    <NavigationBar
                        leftImageShow={true}
                        leftTextShow={false}
                        centerText={"开户"}
                        rightText={""}
                        leftImageCallBack={this.backPage}/>
                    {this.loadView()}
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"开户"}
                    rightText={""}
                    leftImageCallBack={this.backPage}/>
                <ListView
                    style={{paddingTop:Pixel.getPixel(10)}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderROW}
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.refreshingData}
                        tintColor={[fontAndColor.COLORB0]}
                        colors={[fontAndColor.COLORB0]}
                        />
                    }
                />
            </View>
        );
    }

    renderROW = (data)=>{

        return(
            <TouchableOpacity
                style={{marginBottom:Pixel.getPixel(5),}}
                onPress={()=>{

                }}
            >
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    backgroundColor:'white',
                    paddingHorizontal:Pixel.getPixel(15),
                    paddingVertical:Pixel.getPixel(20)
                }} >
                    <SaasText style={{flex:1}}>{data.channel_table_name+'-'+data.bankname}</SaasText>
                    <SaasText style={{color:'red'}}>{data.account_status_str}</SaasText>
                    <Image style={{marginLeft:Pixel.getPixel(5)}} source={require('../../../images/mine/celljiantou.png')}/>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
    }
});