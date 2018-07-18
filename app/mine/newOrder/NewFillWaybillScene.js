/**
 * Created by zhengnan on 2018/7/16.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TextInput,
} from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import NavigatorView from '../../component/AllNavigationView';
import {CellView,CellSelectView} from './component/NewFillWaybillCell';

import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';

import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import AddressManage from "../myOrder/orderwuliu/AddressManage";
const {width} = Dimensions.get('window');
const Pixel = new PixelUtil();
const IS_ANDROID = Platform.OS === 'android';



export default class NewFillWaybillScene extends BaseComponent{


      constructor(props) {
        super(props);

          this.isAddBillInfo = false; //同步发票地址
          this.titleData = [
              [
                  {
                      titleStyle:{fontSize:fontAndColor.BUTTONFONT30, fontWeight:'bold'},
                      valueStyle:{color:fontAndColor.COLORA0},
                      leftImage:require('../../../images/carriagePriceImage/startLocation.png'),
                      title:'始发地',
                      isShowTag:false,
                      value:'',
                      isShowTail:false,
                  },
                  {
                      title:'联系方式',
                      isShowTag:false,
                      value:'请填写发车人联系方式',
                      isShowTail:true,
                  },
                  {
                      valueStyle:{color:fontAndColor.COLORA0},
                      title:'发车方式',
                      isShowTag:false,
                      value:'平台上门取车',
                      isShowTail:false,
                  },
                  {
                      title:'发车时间',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                  },
              ],
              [
                  {
                      titleStyle:{fontSize:fontAndColor.BUTTONFONT30, fontWeight:'bold'},
                      valueStyle:{color:fontAndColor.COLORA0},
                      leftImage:require('../../../images/carriagePriceImage/stopLocation.png'),
                      title:'目的地',
                      isShowTag:false,
                      value:'',
                      isShowTail:false,
                  },
                  {
                      title:'联系方式',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                  },
                  {
                      title:'运输类型',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                  },
                  {
                      title:'发车方式',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                  },
              ],
              [
                  {
                      title:'开具发票',
                      isShowTag:false,
                      isShowTail:false,
                      subTitle:'(当前仅支持增殖普通发票)'
                  },
                  {
                      title:'发票抬头',
                      isShowTag:false,
                      tailView:()=>{
                          return(
                              <TextInput
                                  style={styles.textInput}
                                  placeholder='请输入'
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text)=>{}}
                                  onEndEditing={()=>{this.saveCarData();}}
                                  placeholderTextColor={fontAndColor.COLORA1}
                                  placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                              />
                          )
                      }
                  },
                  {
                      title:'纳税人识别号',
                      isShowTag:false,
                      value:'请选择',
                      tailView:()=>{
                          return(
                              <TextInput
                                  style={styles.textInput}
                                  placeholder='请输入18位以内不包含汉字的识别号'
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text)=>{}}
                                  onEndEditing={()=>{this.saveCarData();}}
                                  placeholderTextColor={fontAndColor.COLORA1}
                                  placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                              />
                          )
                      }
                  },

              ],[
                  {
                      title:'发票收取地址与目的地址相同',
                      isShowTag:false,
                      value:'请选择',
                      tailView:()=>{
                          return(
                             <ZNSwitch value={this.isAddBillInfo} onValueChange={(value)=>{this.addBillInfoAction(value)}}/>
                          )
                      }
                  },
                  {
                      title:'收件人',
                      isShowTag:false,
                      value:'请选择',
                      tailView:()=>{
                          return(
                              <TextInput
                                  ref={(ref)=>{this.billNameInput = ref}}
                                  style={styles.textInput}
                                  placeholder='请输入'
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text)=>{}}
                                  onEndEditing={()=>{this.saveCarData();}}
                                  placeholderTextColor={fontAndColor.COLORA1}
                                  placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                              />
                          )
                      }
                  },
                  {
                      title:'联系电话',
                      isShowTag:false,
                      value:'请选择',
                      tailView:()=>{
                          return(
                              <TextInput
                                  ref={(ref)=>{this.billPhoneInput = ref}}
                                  style={styles.textInput}
                                  placeholder='请输入'
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text)=>{}}
                                  onEndEditing={()=>{this.saveCarData();}}
                                  placeholderTextColor={fontAndColor.COLORA1}
                                  placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                              />
                          )
                      }
                  },
                  {
                      title:'所在地区',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                  },
                  {
                      title:'详细地址',
                      isShowTag:false,
                      value:'请选择',
                      tailView:()=>{
                          return(
                              <TextInput
                                  ref={(ref)=>{this.billAddressInput = ref}}
                                  style={styles.textInput}
                                  placeholder='请输入'
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text)=>{}}
                                  onEndEditing={()=>{this.saveCarData();}}
                                  placeholderTextColor={fontAndColor.COLORA1}
                                  placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                                  multiline={true}
                              />
                          )
                      }
                  },

              ],
          ];

          this.state={
              titleData:this.titleData,
          }

      }

     render(){
         return(
             <View style={styles.root}>
                 <HeadView/>
                 {
                     IS_ANDROID?(this.loadScrollView()):(
                             <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={Pixel.getPixel(10)}>
                                 {
                                     this.loadScrollView()
                                 }
                             </KeyboardAvoidingView>
                         )
                 }
                 <FootView/>
                 <NavigatorView title="填写运单（到店）" backIconClick={this.backPage}/>
             </View>
         )
     }

    loadScrollView=()=>{
        return(
            <ScrollView  ref={(ref)=>{this.scrollView = ref}} keyboardDismissMode={IS_ANDROID?'none':'on-drag'}>
                <View style={{justifyContent:'center',paddingHorizontal:Pixel.getPixel(15),height:Pixel.getPixel(30),backgroundColor:fontAndColor.COLORB6,marginTop:Pixel.getPixel(10)}}>
                    <Text style={{color:fontAndColor.COLORB7, fontSize:fontAndColor.CONTENTFONT24}}>您选择的救援车/代驾运输，录入详细地址后，运价更精准。</Text>
                </View>
                {
                    this.state.titleData.map((data,index)=>{
                        return(
                            <View style={{marginBottom:10,backgroundColor:'white'}} key={index}>
                                {
                                    index==3 &&(
                                        <View style={{backgroundColor:fontAndColor.COLORA3,paddingBottom:Pixel.getPixel(10)}}>
                                        <Text style={{marginLeft:Pixel.getPixel(15),color:fontAndColor.COLORA1,
                                            fontSize:fontAndColor.CONTENTFONT24
                                        }}>发票收取地址</Text>
                                        </View>
                                    )
                                }
                                {
                                    data.map((rowData,subIndex)=>{
                                        return( rowData.selectDict?(
                                                <TouchableOpacity
                                                    key={subIndex}
                                                    onPress={()=>{this.cellClick(rowData.title)}}
                                                    activeOpacity={1}>
                                                    <CellSelectView
                                                        currentTitle={rowData.selectDict.current}
                                                        cellData={rowData}
                                                        cellSelectAction={this.cellSelectAction}
                                                        ref="cellSelectView"
                                                    />
                                                </TouchableOpacity>):(
                                                <TouchableOpacity
                                                    key={subIndex}
                                                    onPress={
                                                        ()=>{this.cellClick(rowData.title,index)}
                                                    }
                                                    activeOpacity={1}>
                                                    <CellView cellData={rowData}/>
                                                </TouchableOpacity>))
                                    })
                                }
                            </View>
                        )
                    })
                }
                <CarriagePriceView data={
                    { total_amount: "4479.00",
                        insure_amount: "0.00",
                        tax_amount: "0.00",
                    service_amount: "300.00",
                    tostore_amount: "478.00",
                    verify_amount: "560.00",
                    trans_amount: "3141.00"}
                }/>
            </ScrollView>
        )
    }

    cellClick=(title,index)=>{

       if(title=='联系方式'&& index==0){

           this.addressType = 'start';
           this.toNextPage({
                   name: 'AddressManage',
                   component: AddressManage,
                   params: {
                       addressId: this.startID,
                       callBack: this.updateAddress
                   }
               }
           );
       }else if(title=='联系方式'&& index==1) {

           this.addressType = 'stop';
           this.toNextPage({
                   name: 'AddressManage',
                   component: AddressManage,
                   params: {
                       addressId: this.stopId,
                       callBack: this.updateAddress
                   }
               }
           );
       }
    }

    /**
     *   地址回传
     **/
    updateAddress = (newAddress) => {
        console.log('newAddress', newAddress);
        if(newAddress.id){

            if(this.addressType=='start'){
                this.startAddressData = newAddress;
                this.startID = newAddress.id;
                this.titleData[0][0].value = `${newAddress.province} ${newAddress.city} ${newAddress.district}`;
                this.titleData[0][1].value = `${newAddress.contact_name}  ${newAddress.contact_phone}`;

            }else {
                this.stopAddressData = newAddress;
                this.stopId = newAddress.id;
                this.titleData[1][0].value = `${newAddress.province} ${newAddress.city} ${newAddress.district}`;
                this.titleData[1][1].value = `${newAddress.contact_name}  ${newAddress.contact_phone}`;

                if(this.isAddBillInfo){
                    this.billNameInput.setNativeProps({text: this.stopAddressData.contact_name});
                    this.billPhoneInput.setNativeProps({text: this.stopAddressData.contact_phone});
                    this.billAddressInput.setNativeProps({text: this.stopAddressData.address});
                    this.titleData[3][3].value = `${this.stopAddressData.province} ${this.stopAddressData.city} ${this.stopAddressData.district}`;
                }
            }

            this.updateTitleData();
        }

    }

    addBillInfoAction=(value)=>{

        this.isAddBillInfo = value;

        if(value){
            if(this.stopAddressData){
                this.billNameInput.setNativeProps({text: this.stopAddressData.contact_name});
                this.billPhoneInput.setNativeProps({text: this.stopAddressData.contact_phone});
                this.billAddressInput.setNativeProps({text: this.stopAddressData.address});
                this.titleData[3][3].value = `${this.stopAddressData.province} ${this.stopAddressData.city} ${this.stopAddressData.district}`;
                this.updateTitleData();

            }else {
                this.props.showToast('请选择收车地址');
            }
        }else {
            this.billNameInput.setNativeProps({text:''});
            this.billPhoneInput.setNativeProps({text:''});
            this.billAddressInput.setNativeProps({text:''});
            this.titleData[3][3].value = '请选择';
            this.updateTitleData();
        }

    }


    saveCarData=()=>{

    }


    updateTitleData=()=>{
        this.setState({
            titleData:this.titleData
        });
    }


}

class HeadView extends Component{
    render(){
        return(
            <View style={styles.headView}>
                <Text style={{color:'white', fontSize:fontAndColor.BUTTONFONT30}}>2017款 斯卡达昊锐 1.8T 手自一体 基本款</Text>
                <View style={{height:Pixel.getPixel(25), flexDirection:'row', alignItems:'center',justifyContent:'space-between',marginTop:Pixel.getPixel(10)}}>
                    <View style={{alignItems:'center', flexDirection:'row'}}>
                        <Text style={{color:'white', fontSize:fontAndColor.LITTLEFONT28}}>单价:</Text>
                        <Text style={{color:'white', fontSize:fontAndColor.LITTLEFONT28, fontWeight:'bold'}}>{20}万</Text>
                    </View>
                    <View style={{height:Pixel.getPixel(25),width:StyleSheet.hairlineWidth,backgroundColor:'white',marginHorizontal:Pixel.getPixel(49)}}/>
                    <View style={{alignItems:'center', flexDirection:'row'}}>
                        <Text style={{color:'white', fontSize:fontAndColor.LITTLEFONT28}}>数量:</Text>
                        <Text style={{color:'white', fontSize:fontAndColor.LITTLEFONT28, fontWeight:'bold'}}>{2}台</Text>
                    </View>
                </View>
            </View>
        )
    }
}

class FootView extends Component{
    render(){
        return(
            <View style={styles.footView}>
                <View style={{flexDirection:'row',paddingLeft:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(10),
                    alignItems:'center',borderBottomColor:fontAndColor.COLORA4,borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:'white'
                }}>
                    <Image source={require('../../../images/carSourceImages/shopNoSelect.png')}/>
                    <Text style={{color:fontAndColor.COLORA1, fontSize:fontAndColor.LITTLEFONT28,marginHorizontal:Pixel.getPixel(5)}}>我已阅读并同意</Text>
                    <Text style={{color:fontAndColor.COLORA2, fontSize:fontAndColor.LITTLEFONT28}}>《物流服务协议》</Text>
                </View>
                <View style={{flexDirection:'row', flex:1}}>
                    <View style={{flexDirection:'row',alignItems:'center',paddingLeft:Pixel.getPixel(15),width:width*0.6,backgroundColor:'white'}}>
                        <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.LITTLEFONT28}}>总价:</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{color:fontAndColor.COLORB2, fontSize:fontAndColor.BUTTONFONT30}}>{5000}</Text>
                            <Text style={{color:fontAndColor.COLORB2, fontSize:fontAndColor.CONTENTFONT24}}>元</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',paddingLeft:Pixel.getPixel(15),width:width*0.4,backgroundColor:fontAndColor.COLORB0,justifyContent:'center'}}>
                        <Text style={{color:'white', fontSize:fontAndColor.LITTLEFONT28}}>提交运单</Text>
                    </View>
                </View>
            </View>
        )
    }
}

class CarriagePriceView extends Component{

    render(){

        //
        // "total_amount": "4479.00",
        //     "insure_amount": "0.00",
        //     "tax_amount": "0.00",
        //     "service_amount": "300.00",
        //     "tostore_amount": "478.00",
        //     "verify_amount": "560.00",
        //     "trans_amount": "3141.00"
        //


        let {total_amount,
            tax_amount,
            trans_amount,
            verify_amount,
            insure_amount,
            tostore_amount,
            service_amount
        } = this.props.data;

        return(
            <View style={[styles.contentView,{paddingTop:Pixel.getPixel(0)}]}>
                <View style={{
                    borderBottomColor: fontAndColor.COLORA4,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height:Pixel.getPixel(44),
                    width:width-Pixel.getPixel(30)
                }}>


                    <Text
                        style={{
                            color: fontAndColor.COLORA0,
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                        }}>运费单总价：</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            color: fontAndColor.COLORB2,
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        }}>{total_amount}</Text>
                        <Text
                            style={{
                                color: fontAndColor.COLORB2,
                                fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24)
                            }}>元</Text>
                        {
                            <Text style={{
                                color: fontAndColor.COLORA1,
                                fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                            }}>{tax_amount > 0 ? `(含税${tax_amount}元)` : '(不含税)'}</Text>
                        }
                    </View>
                </View>
                <View style={{
                    borderBottomColor: fontAndColor.COLORA4,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height:Pixel.getPixel(44),
                    width:width-Pixel.getPixel(30)
                }}>
                    <Text
                        style={{
                            color: fontAndColor.COLORA0,
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        }}>运输方式：</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                            style={{
                                color: fontAndColor.COLORA0,
                                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)
                            }}>大板车</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: width - Pixel.getPixel(30),
                    marginTop: Pixel.getPixel(15)
                }}>
                    <View>
                        <PriceItemView title="运费" value={trans_amount}/>
                        <PriceItemView title="提验车费" value={verify_amount}/>

                    </View>
                    <View>
                        <PriceItemView title="保险费" value={insure_amount}/>
                        <PriceItemView title="送店费" value={tostore_amount}/>

                    </View>
                    <View>
                        <PriceItemView title="服务费" value={service_amount}/>
                        <View style={{backgroundColor: 'white', marginBottom: Pixel.getPixel(23)}}>
                            <Text style={{
                                color: fontAndColor.COLORA1,
                                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)
                            }}> </Text>
                            <View style={{
                                marginTop: Pixel.getPixel(10),
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: fontAndColor.COLORA0,
                                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)
                                }}> </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

class PriceItemView extends Component {
    render() {
        let {title, value} = this.props;
        return (
            <View style={{backgroundColor: 'white', marginBottom: Pixel.getPixel(23)}}>
                <Text style={{
                    color: fontAndColor.COLORA1,
                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                }}>{title}</Text>
                <View style={{marginTop: Pixel.getPixel(10), flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{
                        color: fontAndColor.COLORA0,
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                    }}>{value}</Text>
                    <Text style={{
                        color: fontAndColor.COLORA0,
                        fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                    }}>元</Text>
                </View>
            </View>
        )
    }
}

class ZNSwitch extends Component{


      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            value:this.props.value,
        };
      }
    render(){
        return(
            <TouchableOpacity onPress={()=>{this.props.onValueChange && this.props.onValueChange(!this.state.value); this.setState({value:!this.state.value})}}>
                <Image source={ this.state.value?require('../../../images/carSourceImages/shopSelect.png'):require('../../../images/carSourceImages/shopNoSelect.png')}/>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
        paddingBottom:Pixel.getPixel(171)
    },
    headView:{
        height:Pixel.getPixel(87),
        backgroundColor:fontAndColor.COLORB0,
        alignItems:'center',
        justifyContent:'center'
    },
    footView:{
        height:Pixel.getPixel(84),
        width:width,
        left:0,
        bottom:0,
        position: 'absolute',
    },
    contentView:{
        padding:Pixel.getPixel(15),
        backgroundColor:'white',
        marginBottom:Pixel.getPixel(10)
    },
    textInput:{
        height: Pixel.getPixel(35),
        borderColor: fontAndColor.COLORA0,
        width:width -  Pixel.getPixel(130),
        textAlign:'right',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:0,
        paddingRight:0,
        backgroundColor:'white'
    },
})