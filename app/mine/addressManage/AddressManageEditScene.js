import  React from  'react'
import  {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
    NativeModules
} from  'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
let Pixel = new PixelUtil();
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
const arrow_img = require('../../../images/mine/celljiantou.png');
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import CityRegionScene from './CityRegionScene';


export default class AddressManageEditScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.item = this.props.item;
        this.state ={
            cityStatus:false
        };

        this.pro_city = '';
        if(!this._isEmpty(this.item.province)){
            this.pro_city = this.item.province + this.item.city + this.item.district;
        }
    }

    _onTextChange = (type,text)=>{
        if(type === '1'){
            this.item.contact_name = text;
        }else if(type === '2'){
            this.item.contact_phone = text;
        }
    };

    _onSave = ()=>{
        if(this._isEmpty(this.item.contact_name)){
            this.props.showToast('请填写提车人');
            return;
        }
        if(this._isEmpty(this.item.contact_phone)){
            this.props.showToast('请填写手机号');
            return;
        }
        if(this._isEmpty(this.item.province)){
            this.props.showToast('请选择区域');
            return;
        }
        if(this._isEmpty(this.item.address)){
            this.props.showToast('请选择详细地址');
            return;
        }
        this.props.showModal(true);
        let maps = {
            company_id:global.companyBaseID,
            contact_name:this.item.contact_name,
            contact_phone:this.item.contact_phone,
            province:this.item.province,
            province_code:this.item.province_code,
            city:this.item.city,
            city_code:this.item.city_code,
            district:this.item.district,
            district_code:this.item.district_code,
            address:this.item.address,
            latitude:this.item.latitude,
            longitude:this.item.longitude,
        };
        let url = Urls.ADD_ADDRESS;
        if(this.props.isEdit){
            url = Urls.PUT_ADDRESS;
            maps.id = this.item.id;
        }
        request(url, 'Post', maps)
            .then(
                (response) => {
                    this.props.showModal(false);
                    if(response.code == 1){
                        this.props.refreshData();
                    }
                },
                (error) => {
                    this.props.showToast(error.msg);
                });
    };

    _toAddress = ()=>{
        if(this._isEmpty(this.item.province)){
            this.props.showToast('请先选择区域');
            return;
        }
        let cRegion ={
            provinceName:this.item.province,
            cityName:this.item.city,
            districtName:this.item.district,
            addressName:this._isEmpty(this.item.address)?'':this.item.address,
            longitude:this._isEmpty(this.item.longitude)?'':this.item.longitude,
            longitude:this._isEmpty(this.item.latitude)?'':this.item.latitude,
        };
        NativeModules.QrScan.bdAddress(cRegion).then(
            (suc)=>{},
            (error)=>{}
            );
    };

    _toProvince = ()=>{
        this.setState({cityStatus:true});
    };

    _closeProvince = ()=>{
        this.setState({cityStatus:false});
    };

    _showModal = (show)=>{
        this.props.showModal(show);
    };

    checkAreaClick = (cityRegion)=>{
        this.item.province = cityRegion.province_name;
        this.item.province_code = cityRegion.province_id;
        this.item.city = cityRegion.city_name;
        this.item.city_code = cityRegion.city_id;
        this.item.district = cityRegion.district_name;
        this.item.district_code = cityRegion.district_id;
        this.aRegion.setNativeProps({
            text:cityRegion.province_name + ' ' + cityRegion.city_name + ' ' + cityRegion.district_name
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.hintStyle}>
                    <Text style={styles.hintText}>{'以下为物流服务的发车地址，请确保地址无误'}</Text>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemLeftText}>{'联系人'}</Text>
                    <TextInput
                        style={styles.itemRightText}
                        underlineColorAndroid='transparent'
                        placeholder={'请输入'}
                        defaultValue={this.item.contact_name}
                        onChangeText={(text)=>{this._onTextChange('1',text)}}
                    />
                </View>
                <View style={styles.itemSeparator}/>
                <View style={styles.itemView}>
                    <Text style={styles.itemLeftText}>{'手机号'}</Text>
                    <TextInput
                        style={styles.itemRightText}
                        underlineColorAndroid='transparent'
                        placeholder={'请输入'}
                        defaultValue={this.item.contact_phone}
                        onChangeText={(text)=>{this._onTextChange('2',text)}}
                    />
                </View>
                <View style={styles.itemSeparator}/>
                <View style={styles.itemView}>
                    <Text style={styles.itemLeftText}>{'区域'}</Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.itemRightSelect}
                        onPress={this._toProvince}
                    >
                        <TextInput
                            ref={(ref)=>{this.aRegion = ref;}}
                            style={styles.itemRightText}
                            underlineColorAndroid='transparent'
                            placeholder={'请选择'}
                            defaultValue={this.pro_city}
                            editable = {false}
                        />
                        <Image style={styles.arrowStyle} source={arrow_img}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemSeparator}/>
                <View style={styles.itemView}>
                    <Text style={styles.itemLeftText}>{'详细地址'}</Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.itemRightSelect}
                        onPress={this._toAddress}
                    >
                        <TextInput
                            style={styles.itemRightText}
                            underlineColorAndroid='transparent'
                            placeholder={'请选择'}
                            defaultValue={this.item.address}
                            editable = {false}
                        />
                        <Image style={styles.arrowStyle} source={arrow_img}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnStyle}
                                  activeOpacity={0.6}
                                  onPress={this._onSave}>
                    <Text style={styles.btnText}>保存</Text>
                </TouchableOpacity>

                <NavigatorView title={'新增地址'} backIconClick={this.backPage}/>
                {
                    this.state.cityStatus && <CityRegionScene checkAreaClick={this.checkAreaClick} showModal={this._showModal} closePress={this._closeProvince}/>
                }

            </View>
        );
    }

    _isEmpty = (str)=>{
        if(typeof(str) != 'undefined' && str !== ''){
            return false;
        }else {
            return true;
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: Pixel.getPixel(0),
        backgroundColor: fontAndColor.COLORA3,


    },
    hintStyle:{
        backgroundColor:fontAndColor.COLORB8,
        height:Pixel.getPixel(44),
        marginTop:Pixel.getTitlePixel(64),
        justifyContent:'center',
        paddingLeft:Pixel.getPixel(15)
    },
    hintText:{
        color:fontAndColor.COLORB7,
        fontSize:Pixel.getFontPixel(15)
    },
    itemView:{
        height:Pixel.getPixel(46),
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:Pixel.getPixel(15),
    },
    itemLeftText:{
        fontSize:Pixel.getFontPixel(15),
        color:fontAndColor.COLORA1,
        flex:1
    },
    itemRightSelect:{
        flex:2,
        flexDirection:'row',
        alignItems:'center'
    },
    itemRightText:{
        color:'black',
        fontSize:Pixel.getFontPixel(15),
        flex:1,
        textAlign:'right'
    },
    itemSeparator:{
        borderColor:fontAndColor.COLORA3,
        borderTopWidth:1
    },
    btnStyle:{
        borderRadius:Pixel.getPixel(5),
        height:Pixel.getPixel(46),
        backgroundColor:fontAndColor.COLORB0,
        marginTop:Pixel.getPixel(30),
        marginHorizontal:Pixel.getPixel(15),
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        fontSize:Pixel.getFontPixel(15),
        color:'#ffffff'
    },
    arrowStyle:{
        height:Pixel.getPixel(16),
        width:Pixel.getPixel(10),
        marginLeft:Pixel.getPixel(5)
    }
});