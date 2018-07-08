/**
 * Created by zhengnan on 2018/7/3.
 * 退款原因界面
 */

import  React, {Component} from  'react'
import  {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    Image,
    ListView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from  'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import { observer } from 'mobx-react/native';
import {observable} from 'mobx';
const IS_ANDROID = Platform.OS === 'android';
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

@observer
export default class RefundCauseScene extends BaseComponent{


    @observable selectTitle='';
    constructor(props) {

        super(props);
        this.selectTitle = '';
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row1', 'row2','row3','row4', 'row2','row3','row4', 'row2','row3','row4']),
            keyboardoffetValue:0,
        };
    }

    render(){
        return(
            <View style={styles.root}>
                {
                    IS_ANDROID?(this.renderListView()):(
                        <KeyboardAvoidingView
                            behavior={'position'}
                            keyboardVerticalOffset={this.state.keyboardoffetValue}>
                            {
                                this.renderListView()
                            }
                        </KeyboardAvoidingView>
                    )
                }
                <NavigatorView title={'订单取消'} backIconClick={this.backPage}/>
            </View>
        )
    }

    renderListView=()=>{
        return(
            <ListView
                      dataSource={this.state.dataSource}
                      renderHeader={this.renderHeader}
                      renderRow={this.renderRow}
                      renderSeperator={this.renderSeperator}
                      renderFooter={this.renderFooter}/>
        )
    }
    renderHeader =()=> {
        if(true){
            return(
                <View style={{alignItems:'center',justifyContent:'center',
                    height:Pixel.getPixel(100),backgroundColor:fontAndColor.COLORA3}}>
                    <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.LITTLEFONT28}}>确认取消</Text>
                    <TextInput style={{
                        height: Pixel.getPixel(40),
                        borderColor: fontAndColor.COLORA1,
                        width: Pixel.getPixel(130),
                        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        borderRadius:Pixel.getPixel(4),
                        borderColor:fontAndColor.COLORA4,
                        borderWidth:Pixel.getPixel(1),
                        marginHorizontal:Pixel.getPixel(15),
                        textAlign:'center'}}
                               keyboardType={'number-pad'}
                               placeholder='请输入取消的台数'
                               underlineColorAndroid='transparent'
                               maxLength={2}
                               onFocus={()=>{this.setState({keyboardoffetValue: -Pixel.getTitlePixel(200)})}}
                               onEndEditing={()=>{this.setState({keyboardoffetValue:0})}}
                    />
                    <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.LITTLEFONT28}}>台</Text>
                    </View>
                </View>
            )
        }
        return(
            <View style={{height:Pixel.getPixel(35),paddingLeft:Pixel.getPixel(15),backgroundColor:fontAndColor.COLORA3,alignItems:'center',flexDirection:'row'}}>
                <Text style={{color:fontAndColor.COLORA1, fontSize:fontAndColor.LITTLEFONT28}}>请选择订单取消原因</Text>
                <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.LITTLEFONT28}}>(必填)</Text>
            </View>
        )
    }

    renderRow =(rowData)=> {
         return(
             <TouchableOpacity onPress={()=>{this.selectTitle=rowData;this.setState({dataSource:this.state.dataSource.cloneWithRows(['row1', 'row2','row3','row4'])})}}>
                 <View style={{height:Pixel.getPixel(44),backgroundColor:'white',paddingHorizontal:Pixel.getPixel(15),alignItems:'center',justifyContent:'space-between',
                     flexDirection:'row'
                 }}>
                     <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.LITTLEFONT28}}>{rowData}</Text>
                     {
                        this.selectTitle==rowData && <Image source={require('../../../images/neworder/duigou.png')}/>
                     }
                 </View>
             </TouchableOpacity>
         )
    }

    renderSeperator =(sectionID,rowID)=> {
          return(
              <View key={`${sectionID}+${rowID}`} style={{marginHorizontal:Pixel.getPixel(15),height:StyleSheet.hairlineWidth,backgroundColor:fontAndColor.COLORA4}}/>
          )
    }

    renderFooter =()=> {
        return(
            <View style={{alignItems:'center',marginTop:Pixel.getPixel(10),width:ScreenWidth,paddingBottom:Pixel.getPixel(50)}}>
                <ZNTextInputView/>
                <TouchableOpacity>
                    <View style={{height:Pixel.getPixel(49),
                        borderRadius:Pixel.getPixel(4),
                        width:ScreenWidth-Pixel.getPixel(30),
                        marginTop:Pixel.getPixel(20),backgroundColor:fontAndColor.COLORB0,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'white', fontSize:fontAndColor.BUTTONFONT30}}>提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

@observer
class ZNTextInputView extends Component{

    @observable  znTextInputValue;
    @observable  znTextInputPlaceholder
      constructor(props) {
        super(props);
        this.znTextInputValue = '';
        this.znTextInputPlaceholder = '请填写取消原因';
        this.state = {};
      }

    render(){
        return(
            <View style={{backgroundColor:'white',paddingHorizontal:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(20)}}>
                <TextInput
                           ref={(ref)=>{this.znTextInput = ref}}
                           style={{height: Pixel.getPixel(180),
                               borderColor: fontAndColor.COLORA1,
                               width: ScreenWidth-Pixel.getPixel(30),
                               fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                               paddingTop: 0,
                               paddingBottom: 0,
                               paddingLeft: 0,
                               paddingRight: 0,
                               backgroundColor:fontAndColor.COLORB12
                           }}
                           underlineColorAndroid='transparent'
                           onFocus={()=>{this.znTextInputPlaceholder=''}}
                           onChangeText={(text)=>{

                              if(text.length>20) {
                                  this.znTextInputValue= text.substring(0, text.length-1);
                              }else {
                                  this.znTextInputValue = text;
                              }
                               this.znTextInput.setNativeProps({
                                   text: this.znTextInputValue,
                               });
                           }}
                           onEndEditing={()=>{
                               if(this.znTextInputValue==''){
                                   this.znTextInputPlaceholder = '请填写取消原因';
                               }
                           }}>
                </TextInput>
                <View style={{left:Pixel.getPixel(30),top:Pixel.getPixel(30),position: 'absolute'}}>
                    <Text style={{color:fontAndColor.COLORA1,
                        fontSize:fontAndColor.CONTENTFONT24,
                        backgroundColor:'transparent'}}>{this.znTextInputPlaceholder}</Text>
                </View>
                <View style={{right:Pixel.getPixel(30),bottom:Pixel.getPixel(30),position: 'absolute'}}>
                    <Text style={{color:fontAndColor.COLORA1,
                        fontSize:fontAndColor.CONTENTFONT24,
                        backgroundColor:'transparent'}}>
                        {this.znTextInputValue.length}/20
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        backgroundColor:fontAndColor.COLORA3,
    }
})