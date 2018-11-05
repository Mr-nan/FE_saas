/**
 * Created by zhengnan on 2018/11/5.
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
    ListView,
    TextInput,
    StatusBar,
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAnColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import {request} from '../../utils/RequestUtil';
import * as Url from '../../constant/appUrls';


export default class SeekBankScene extends BaseComponent{

    // 构造
      constructor(props) {
        super(props);
          const seekSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
          this.state = {
              seekSource:seekSource,
          };
      }

    loadSeekData=(text)=>{
        request(Url.GET_BANK_LIST,'post',{bankName:text}).then((response) => {

                this.setState({
                    seekSource: this.state.seekSource.cloneWithRows(response.mjson.data.info_list),
                });

            },
            (error) => {

            });
    }

    render(){
        return(
            <View style={styles.root}>
                <SeekView
                    changeText={(text)=>{
                        if(text.length>0){
                            this.loadSeekData(text);
                        }else {
                            this.setState({
                                seekSource: this.state.seekSource.cloneWithRows([]),
                            });
                        }
                    }}
                    cancel={()=>{
                        this.backPage();
                    }}/>
                <View style={{width:width,paddingLeft:Pixel.getPixel(15),backgroundColor:fontAnColor.COLORA3,paddingVertical:Pixel.getPixel(10)}}>
                    <Text style={{fontSize:Pixel.getFontPixel(fontAnColor.CONTENTFONT24),color:fontAnColor.COLORA1}}>
                        搜索结果
                    </Text>
                </View>
                <ListView
                    removeClippedSubviews={true}
                    dataSource={this.state.seekSource}
                    renderRow={this.renderSeekRow}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    renderSeekRow=(rowData)=>{
        return (
            <TouchableOpacity style={{width:width,backgroundColor:'white',paddingHorizontal:Pixel.getPixel(15)}}
                              onPress={() => {this.props.getBankData && this.props.getBankData(rowData); this.backToRoute()}}>
                <View style={styles.rowCell}>
                    <Text allowFontScaling={false}  style={styles.rowCellText}>{rowData.bankName}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    backToRoute =()=>{

        const navi = this.props.navigator;
        let route = navi.getCurrentRoutes();
        let index = route.length-3>=0?route.length-3:0;
        navi.popToRoute(route[index]);

    }

}

class SeekView extends Component{

    render(){
        return(
            <View style={styles.seekView}>
                <StatusBar barStyle={'dark-content'}/>
                <View style={styles.seekContent}>
                    <View style={{backgroundColor:fontAnColor.COLORA3, flexDirection:'row', alignItems:'center',marginLeft:Pixel.getPixel(15),borderRadius:Pixel.getPixel(4),height:Pixel.getPixel(30)}}>
                        <Image style={{width:Pixel.getPixel(20),height:Pixel.getPixel(20),marginHorizontal:Pixel.getPixel(10)}} source={require('../../../images/findIcon.png')}/>
                        <TextInput style={styles.textInput}
                                   placeholder = {'搜索银行名称'}
                                   ref={(ref)=>{this.input=ref}}
                                   underlineColorAndroid='transparent'
                                   placeholderTextColor={fontAnColor.COLORA1}
                                   onChangeText={(text)=>{this.props.changeText(text)}}/>
                        <TouchableOpacity style={{
                            top: 0,
                            right: 0,
                            position: 'absolute',
                            alignItems:'center',
                            justifyContent:'center',
                            height:Pixel.getPixel(30),
                            width:Pixel.getPixel(30)
                        }} onPress={()=>{
                            this.input && this.input.setNativeProps({
                                text: ''
                            });
                            this.props.changeText('');
                        }}>
                            <Image source={require('../../../images/login/clear.png')}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{width:Pixel.getPixel(70),height:Pixel.getPixel(30), alignItems:'center',justifyContent:'center'}}
                                      onPress={()=>{this.props.cancel()}}>
                        <Text style={{color:fontAnColor.COLORB5,fontSize:Pixel.getFontPixel(fontAnColor.LITTLEFONT28)}}>取消</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:fontAnColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64)
    },
    seekView:{
        height: Pixel.getTitlePixel(64),
        backgroundColor: 'white',
        left: 0,
        right: 0,
        position: 'absolute',
        flex: 1
    },
    seekContent:{
        marginTop: Pixel.getTitlePixel(20),
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput:{
        height:Pixel.getPixel(28),
        width:width- Pixel.getPixel(130),
        backgroundColor:fontAnColor.COLORA3,
        fontSize:Pixel.getFontPixel(fontAnColor.LITTLEFONT),
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:0,
        paddingRight:0,

    },
    rowCell: {

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAnColor.COLORA3,
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    rowCellText: {
        marginLeft: Pixel.getPixel(5),
        color: fontAnColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAnColor.LITTLEFONT),
    },
})