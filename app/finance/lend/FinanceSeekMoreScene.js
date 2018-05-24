/**
 * Created by zhengnan on 2018/5/4.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    TextInput,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import  AllNavigationView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
import PixelUtil from '../../utils/PixelUtil';
import * as fontAndColor from '../../constant/fontAndColor';
import  StringTransformUtil from  "../../utils/StringTransformUtil";

let stringTransform = new StringTransformUtil();
const Pixel = new PixelUtil();
const {width, height } = Dimensions.get('window');

export default class FinanceSeekMoreScene extends BaseComponent{

    // 构造
      constructor(props) {
        super(props);

        console.log(this.props.seekParameter);

        this.state = {
            minPrice:this.props.seekParameter.min_loanmny,
            maxPrice:this.props.seekParameter.max_loanmny,
            minDate:this.props.seekParameter.min_loan_time,
            maxDate:this.props.seekParameter.max_loan_time,
            number:this.props.seekParameter.payment_number_auto_vin,
        };
      }

      render(){
          return(
              <View style={styles.rootContainer}>
                  <ScrollView>
                      <SeekHeadView onChangeText={(text)=>{
                          this.state.number = text;
                      }} number={this.state.number}/>
                      <View style={styles.seekItem}>
                          <Text style={{marginLeft:Pixel.getPixel(15),marginBottom:Pixel.getPixel(20),color:fontAndColor.COLORA1,
                              fontSize:Pixel.getPixel(fontAndColor.BUTTONFONT30)
                          }}>借款金额（万元）</Text>
                          <View style={{flexDirection:'row',alignItems:'center',width:width-Pixel.getPixel(20),justifyContent:'center',backgroundColor:'white',marginHorizontal:Pixel.getPixel(10)}}>
                              <TextInput style={styles.seekPriceInput}
                                         placeholder='请输入最低额度'
                                         keyboardType={'numeric'}
                                         maxLength={8}
                                         underlineColorAndroid='transparent'
                                         ref={(ref)=>{this.minPriceInput = ref}}
                                         defaultValue={this.state.minPrice?stringTransform.carMoneyChange(this.state.minPrice):''}
                                         onChangeText={(text)=>{
                                             if(text.length>5&&text.indexOf('.')==-1){
                                                 text = text.substring(0,5);
                                             }
                                             let moneyStr = this.chkPrice(text);
                                             this.minPriceInput.setNativeProps({
                                                 text: moneyStr,
                                             });
                                             this.state.minPrice = moneyStr;
                                         }}/>
                              <View style={{backgroundColor:fontAndColor.COLORA4,height:Pixel.getPixel(1),width:(Pixel.getPixel(30)),marginHorizontal:Pixel.getPixel(10)}}/>
                              <TextInput style={styles.seekPriceInput}
                                         placeholder='请输入最高额度'
                                         keyboardType={'numeric'}
                                         maxLength={8}
                                         underlineColorAndroid='transparent'
                                         ref={(ref)=>{this.maxPriceInput = ref}}
                                         defaultValue={this.state.maxPrice?stringTransform.carMoneyChange(this.state.maxPrice):''}
                                         onChangeText={(text)=>{
                                             if(text.length>5&&text.indexOf('.')==-1){
                                                 text = text.substring(0,5);
                                             }
                                             let moneyStr = this.chkPrice(text);
                                             this.maxPriceInput.setNativeProps({
                                                 text: moneyStr,
                                             });
                                             this.state.maxPrice = moneyStr;
                                         }}/>
                          </View>
                      </View>
                      <View style={styles.seekItem}>
                          <Text style={{marginLeft:Pixel.getPixel(15),marginBottom:Pixel.getPixel(20),color:fontAndColor.COLORA1,
                              fontSize:Pixel.getPixel(fontAndColor.BUTTONFONT30)
                          }}>放款日期</Text>
                          <View style={{flexDirection:'row',alignItems:'center',width:width-Pixel.getPixel(20),justifyContent:'center',backgroundColor:'white',marginHorizontal:Pixel.getPixel(10)}}>
                              <TouchableOpacity activeOpacity={1} onPress={()=>{this.setDateClick(1)}}>
                                  <View style={styles.seekDateItem}>
                                      <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{this.state.minDate?this.state.minDate:'请选择'}</Text>
                                  </View>
                              </TouchableOpacity>
                              <View style={{backgroundColor:fontAndColor.COLORA4,height:Pixel.getPixel(1),width:(Pixel.getPixel(30)),marginHorizontal:Pixel.getPixel(10)}}/>
                              <TouchableOpacity activeOpacity={1} onPress={()=>{this.setDateClick(2)}}>
                                  <View style={styles.seekDateItem}>
                                      <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{this.state.maxDate?this.state.maxDate:'请选择'}</Text>
                                  </View>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </ScrollView>
                  <View style={styles.footView}>
                      <TouchableOpacity style={{width:width/2, flex:1,backgroundColor:fontAndColor.COLORA2, alignItems:'center',justifyContent:'center'}} activeOpacity={1}
                                        onPress={()=>{
                                            this.setState({
                                                minPrice:'',
                                                maxPrice:'',
                                                minDate:'',
                                                maxDate:'',
                                                number:''
                                            })
                                        }}>
                          <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>重置</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{width:width/2, flex:1,backgroundColor:fontAndColor.COLORB0, alignItems:'center',justifyContent:'center'}} activeOpacity={1}
                                        onPress={this.confirmClick}>
                          <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>确认</Text>
                      </TouchableOpacity>
                  </View>
                  <DateTimePicker
                      titleIOS="请选择日期"
                      confirmTextIOS='确定'
                      cancelTextIOS='取消'
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                  />
                 <AllNavigationView title="筛选" backIconClick={this.backPage}/>
              </View>
          )
      }

      confirmClick=()=>{

          if(this.state.minPrice && this.state.maxPrice){
              if(parseFloat(this.state.maxPrice)<parseFloat(this.state.minPrice)){
                  this.props.showToast('最高额度小于低额度');
                  return;
              }
          }

          if(this.state.maxDate && this.state.minDate){
              let minDate = new  Date(this.state.minDate);
              let maxDate = new  Date(this.state.maxDate);
              if(minDate.getTime() > maxDate.getTime())
              {
                  this.props.showToast('日期选择格式不正确');
                  return;
              }
          }

          this.props.confirmClick(this.state);
          this.backPage();

      }

      setDateClick=(type)=>{

          this.dateType = type;
          this.setState({ isDateTimePickerVisible:true });

      }

    _handleDatePicked = (date)=>{
        let d = this.dateFormat(date,'yyyy-MM-dd');
        if(this.dateType === 1){
           this.setState({
               minDate:d,
           });


        }else{
            this.setState({
                maxDate:d,
            });
        }

        this._hideDateTimePicker();
    };

    _hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    dateFormat = (date,fmt) => {
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
     * from @zhaojian
     *
     * 正则校验，保证小数点后只能有两位
     **/
    chkPrice = (obj) => {
        obj = obj.replace(/[^\d.]/g, "");
        //必须保证第一位为数字而不是.
        obj = obj.replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        obj = obj.replace(/\.{2,}/g, ".");
        //保证.只出现一次，而不能出现两次以上
        obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        if ((/\.\d{3}/).test(obj)) {
            obj = obj.substring(0, obj.length - 1);
        }

        return obj;
    }

}

class SeekHeadView extends Component{

    render(){
        return(
            <View style={styles.seekView}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../../images/carSourceImages/sousuoicon.png')}/>
                    <TextInput
                        ref={(ref)=>{this.input = ref}}
                        allowFontScaling={false}
                        underlineColorAndroid='transparent'
                        keyboardType={'numbers-and-punctuation'}
                        style={styles.navigatorSousuoText}
                        defaultValue={this.props.number?this.props.number:''}
                        placeholder={'请输入车架号后六位 / 借款编号'}
                        placeholderTextColor={fontAndColor.COLORA1}
                        onChangeText={(text)=>{this.props.onChangeText(text)}}/>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
        paddingBottom:Pixel.getPixel(44),
        alignItems:'center',
        justifyContent:'center'
    },
    footView:{
        left: 0,
        right: 0,
        position: 'absolute',
        bottom:0,
        height:Pixel.getPixel(44),
        flexDirection:'row'
    },
    seekView:{
        width:width-Pixel.getPixel(40),
        height:Pixel.getPixel(33),
        borderRadius:Pixel.getPixel(22),
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:Pixel.getPixel(20),
        marginVertical:Pixel.getPixel(10),
    },
    navigatorSousuoText: {

        color: fontAndColor.COLORA0,
        height: Pixel.getPixel(30),
        width:  width - Pixel.getPixel(165),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: 'white',
        marginLeft:Pixel.getPixel(5)
    },
    seekItem:{
        backgroundColor:'white',
        width:width,
        marginBottom:Pixel.getPixel(10),
        paddingVertical:Pixel.getPixel(30)

    },
    seekPriceInput:{
        color: fontAndColor.COLORA0,
        height: Pixel.getPixel(44),
        width:  Pixel.getPixel(130),
        textAlign: 'center',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: 'white',
        borderWidth:Pixel.getPixel(1),
        borderColor:fontAndColor.COLORA4,
        borderRadius:Pixel.getPixel(3),
    },
    seekDateItem:{
        height: Pixel.getPixel(44),
        width:  Pixel.getPixel(130),
        backgroundColor: 'white',
        borderWidth:Pixel.getPixel(1),
        borderColor:fontAndColor.COLORB0,
        borderRadius:Pixel.getPixel(3),
        alignItems:'center',
        justifyContent:'center',
    }


});