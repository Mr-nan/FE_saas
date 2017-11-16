/**
 * Created by dingyonggang on 2017/10/27.
 */
import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback,
    RefreshControl,
    ListView,
    Keyboard,
} from "react-native";
import BaseComponent from "../../../../component/BaseComponent";
import NavigationBar from "../../../../component/NavigationBar";
import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";
import MyButton from "../../../../component/MyButton";
import {request} from "../../../../utils/RequestUtil";
import * as AppUrls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import TextInputItem from './TextInputItem'
import CardPhoneSmsScene from '../openAccount/openIndividual/CardPhoneSmsScene'
import ProvinceListScene from '../../../../carSource/ProvinceListScene'
import * as fontAndColor from '../../../../constant/fontAndColor';
import SText from './SaasText'

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');


let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
let selectedBank = {}
let selectedCity = {}
let page = 0;
let totalPage = 1
let banks = []




export default class ChooseBankNameScene extends BaseComponent{

    constructor(props) {
        super(props);



        this.state = {
            renderPlaceholderOnly: true,
            value:'',
            source : ds.cloneWithRows([]),
            isRefreshing:false
        }
    }

    componentWillUnmount(){
         selectedBank = {}
         selectedCity = {}
         page = 0;
         totalPage = 1
         banks = []
    }


    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }


    render(){
        if (this.state.renderPlaceholderOnly) {
            return ( <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={'开户行'}
                        rightText={""}
                    />
                </View>
            </TouchableWithoutFeedback>);
        }

        return(
            <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'开户行'}
                    rightText={"确定"}
                    rightTextCallBack={()=>{
                        if(this.state.value.length<=0){
                            this.props.showToast('请选择开户行名称');
                            return;
                        }
                        this.props.callBack(selectedBank);
                        this.backPage();
                    }}
                    leftImageCallBack={this.backPage}
                />

                <TouchableOpacity
                    activeOpacity = {.9}
                    onPress = {()=>{
                        this.toNextPage({
                            component:ProvinceListScene,
                            name:'ProvinceListScene',
                            params:{
                                isZs:true,
                                checkedCityClick:this.checkedCityClick,
                                unlimitedAction:this.cityUnlimitedAction,
                                isSelectProvince:true,
                            }
                        })
                    }}
                >

                    <View style = {{flexDirection:'row', alignItems:'center', marginVertical:15, paddingHorizontal:15, backgroundColor:'white'}}>
                        <TextInput
                            ref = 'bank_name'
                            style = {{flex:1, height:45}}
                            editable = {false}
                            placeholder = {'请选择城市'}
                            underlineColorAndroid={"#00000000"}
                            value = {this.state.value}

                        />
                        <Image source = {require('../../../../../images/mainImage/celljiantou.png')}/>
                    </View>
                </TouchableOpacity>

                <ListView
                    enableEmptySections = {true}
                    style ={{marginTop:10,flex:1}}
                    renderRow = {this.renderRow}
                    renderSeparator = {this.renderSeparator}
                    removeClippedSubviews = {false}
                    dataSource = {this.state.source}
                    onEndReachedThreshold = {1}
                    onEndReached={this.loadMore}
                    renderFooter = {this.renderFooter}
                    refreshControl ={
                        <RefreshControl
                            refreshing = {this.state.isRefreshing}
                            tintColor = {fontAndColor.COLORB5}
                            colors = {[fontAndColor.COLORB5]}
                            onRefresh = {this.refreshing}

                        />
                    }

                />


            </View>

        )

    }


    refreshing = ()=>{
        banks = []
        this.setState({
            isRefreshing:true,
        })
        page = 1;
        this.loadBanks(selectedCity.city_id, page)
    }


    renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    renderFooter = ()=>{
        if(banks.length <= 0) {return};
        console.log( 'page == '+page)
        console.log( 'totalPage == '+totalPage)

        return<View style = {{height:40, justifyContent:'center', alignItems:'center'}}>
                <SText>{page>=totalPage?'已全部加载': '加载更多...'}</SText>
            </View>


    }
    
    renderRow = (data, sectionId, rowId) => {
        return<TouchableOpacity
            onPress = {()=>{
                selectedBank = data;
                this.setState({
                    value:data.bankname,
                })
            }}

        >
            <View style = {{backgroundColor:'white', height:40, paddingHorizontal:15, justifyContent:'center'}}>
                <SText style = {{}}>{data.bankname}</SText>
            </View>
        </TouchableOpacity>

    }
    checkedCityClick=(city)=>{
        selectedCity = city;
        this.refreshing()

    }

    loadBanks = (city, page)=>{
        let params = {
            bankCardNo:this.props.bank_card_no,
            cityCode:city,
            page:page,
            rows:20,
        }

        request(AppUrls.ZS_PARSE_BANK, 'post', params).then((response)=>{

            banks.push(...response.mjson.data.info_list)
            totalPage = response.mjson.data.page;
            console.log(response)
            this.setState({
                isRefreshing:false,
                source:ds.cloneWithRows(banks)
            })

        }, (error)=>{

        })

        console.log(city)
    }


    loadMore = ()=>{
        page++;
        if(page >totalPage){return};
        this.loadBanks(selectedCity.city_name , page)
    }
}


const styles = StyleSheet.create({

    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(1),

    }

})