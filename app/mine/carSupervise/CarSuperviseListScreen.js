/**
 * Created by zhengnan on 2018/7/4.
 */

import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    NativeModules,
    TouchableOpacity,
    ListView,
    Dimensions,
    StatusBar,
    InteractionManager

}from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import * as AppUrls from "../../constant/appUrls";
import {request} from '../../utils/RequestUtil';
import CarSuperviseApplyScreen from "./CarSuperviseApplyScreen";
import  AllLoading from '../../component/AllLoading';


const Pixel = new PixelUtil();
const IS_ANDROID = Platform.OS === 'android';

export default class CarSuperviseListScreen extends BaseComponent {

    // 构造
      constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state = {
            dataSource:ds.cloneWithRows([{borrow_status:0},{borrow_status:1},{borrow_status:2},{borrow_status:3},{borrow_status:4},{borrow_status:5},{borrow_status:6},{borrow_status:7},{borrow_status:8}]),
            barStyle:'default'
        };
      }

    componentWillMount() {

        InteractionManager.runAfterInteractions(() => {
            this.setState({
                barStyle:'default'
            })
        });

    }

    componentWillUnmount(){
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                barStyle:'light-content'
            })
        });
    }

    render() {
        return (
            <View style={styles.root}>
                <StatusBar barStyle={this.state.barStyle}/>
                <ListView  dataSource={this.state.dataSource}
                           renderRow={this.renderRow}/>
                <FootButtom footClick={this.footClick}/>
                <NavigationView title={'监管物借出列表'}
                                backIconClick={this.backPage}
                                wrapStyle={{backgroundColor:'white'}}
                                titleStyle={{color:fontAndColor.COLORA0}}/>
                <AllLoading callEsc={()=>{}} ref="allloading" callBack={()=>{
                }}/>
            </View>
        )
    }

    renderRow =(data)=> {
          return(
              <CarSuperviseListCell data={data} repealButtonClick={()=>{this.refs.allloading.changeShowType(true,'是否确定撤销\n\n撤销后系统将无法恢复！')}}/>
          )
    }

    renderSeparator =(sectionID, rowID)=> {
      return(
          <View key={`${sectionID}+${rowID}`} style={{height:Pixel.getPixel(10)}}/>
      )
    }

    footClick=()=>{
        this.toNextPage({
            name: 'CarSuperviseApplyScreen',
            component: CarSuperviseApplyScreen,
            params: {

            }
        });
    }
}

class FootButtom extends Component{
    render(){
        return(
            <TouchableOpacity
                style={{position: 'absolute',backgroundColor:fontAndColor.COLORB0, alignItems:'center',justifyContent:'center',bottom:0,left:0,
                right:0,height:Pixel.getPixel(44)
            }} activeOpacity={1} onPress={this.props.footClick}>
                <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>申请借出监管物</Text>
            </TouchableOpacity>
        )
    }
}

class CarSuperviseListCell extends  Component{

    render(){
        let {data} = this.props;
        return(
            <View style={{width:width,marginTop:Pixel.getPixel(10)}}>
                <Image style={{ width:width,paddingHorizontal:Pixel.getFontPixel(20)}} source={require('../../../images/carSuperviseImage/baise.png')}>
                    <View style={{marginTop:Pixel.getPixel(25)}}>
                        <View style={{flexDirection:'row',marginBottom:Pixel.getPixel(10), alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={styles.cellItemTitle}>车架号：{'JGFHGFEKFERTHJ'}</Text>
                            <Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA5,backgroundColor:'transparent'}}>审核不通过</Text>
                        </View>
                        <Text style={styles.cellItemTitle}>车型信息：{'2017款别克1.8TSI 手自一体'}</Text>
                    </View>
                </Image>
                <Image style={{width:width,paddingHorizontal:Pixel.getFontPixel(20),justifyContent:'center',height:Pixel.getPixel(100)+Pixel.getPixel(40*2)}} resizeMode={'stretch'}
                       source={this.getTypeBackImage(data.borrow_status)}>
                    <View>
                        <View style={{paddingBottom:Pixel.getPixel(10)}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.cellItemValueTitle}>验证码</Text>
                                <Text style={styles.cellItemValueText}>999000</Text>
                            </View>
                            <View style={{alignItems:'center',
                                width:Pixel.getPixel(20),position: 'absolute',top:Pixel.getPixel(0),bottom:0,left:Pixel.getPixel(70)}}>
                                <Image  style={{marginTop:Pixel.getPixel(4)}} source={require('../../../images/carSuperviseImage/xiayigezhuangtai.png')}/>
                                <View style={{width:Pixel.getPixel(1),backgroundColor:'white',marginTop:Pixel.getPixel(4),height:Pixel.getPixel(20)}}/>
                            </View>
                        </View>
                        <View style={{paddingBottom:Pixel.getPixel(10)}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.cellItemValueTitle}>验证码</Text>
                                <Text style={styles.cellItemValueText}>999000</Text>
                            </View>
                            <View style={{alignItems:'center',
                                width:Pixel.getPixel(20),position: 'absolute',top:Pixel.getPixel(0),bottom:0,left:Pixel.getPixel(70)}}>
                                <Image  style={{marginTop:Pixel.getPixel(4)}} source={require('../../../images/carSuperviseImage/xiayigezhuangtai.png')}/>
                                <View style={{width:Pixel.getPixel(1),backgroundColor:'white',marginTop:Pixel.getPixel(4),height:Pixel.getPixel(20)}}/>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.cellItemValueTitle}>申请解除日</Text>
                                <Text style={styles.cellItemValueText}>2018-6-28</Text>
                                <View style={{
                                    height:Pixel.getPixel(20),
                                    borderRadius:Pixel.getPixel(10),
                                    backgroundColor:'rgba(0,0,0,0.3)',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    position: 'absolute',
                                    width:Pixel.getPixel(60),
                                    right:Pixel.getPixel(5)
                                }}>
                                    <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}}>借用{1}天</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.cellItemValueTitle}>借出物</Text>
                                <Text style={styles.cellItemValueText}>车辆|合格证|行驶证</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.cellItemValueTitle}>申请原因</Text>
                                <Text style={styles.cellItemValueText} numberOfLines={2}>拿去嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛拿去嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛拿去嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛拿去嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛拿去嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛拿去嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛嘛</Text>
                            </View>
                            <View style={{alignItems:'center',
                                width:Pixel.getPixel(20),height:Pixel.getPixel(75),position: 'absolute',top:Pixel.getPixel(0),left:Pixel.getPixel(70)}}>
                                <Image  style={{marginTop:Pixel.getPixel(4)}} source={require('../../../images/carSuperviseImage/xiayigezhuangtai.png')}/>
                                <Image  style={{marginTop:Pixel.getPixel(5)}} source={require('../../../images/carSuperviseImage/shuxian.png')}/>
                            </View>
                        </View>
                    </View>
                    {
                        (data.borrow_status==1||data.borrow_status==2||data.borrow_status==3) &&(<TouchableOpacity style={{right:-Pixel.getPixel(0), bottom:-Pixel.getPixel(5), position: 'absolute'}}
                                          onPress={this.props.repealButtonClick}>
                            <Image style={{
                                width:Pixel.getPixel(54),
                                height:Pixel.getPixel(54),alignItems:'center',justifyContent:'center'}}
                                   source={require('../../../images/carSuperviseImage/yuananniu.png')}>
                                <Text style={{color:fontAndColor.COLORB4, fontSize:fontAndColor.LITTLEFONT26,backgroundColor:'transparent',marginBottom:Pixel.getPixel(6)
                                }}>撤销</Text>
                            </Image>
                        </TouchableOpacity>)
                    }
                </Image>
            </View>
        )
    }

    getTypeBackImage=(type)=>{
        switch (type){
            case 0: // 借出状态
                return require('../../../images/carSuperviseImage/lanse.png');
                break;
            case 1: // 待审核
                return require('../../../images/carSuperviseImage/lanse.png');
                break;
            case 2: // 审核中
                return require('../../../images/carSuperviseImage/lanse.png');
                break;
            case 3: // 审核通过
                return require('../../../images/carSuperviseImage/lvse.png');
                break;
            case 4: // 审核未通过
                return require('../../../images/carSuperviseImage/hongse.png');
                break;
            case 5: // 已撤销
                return require('../../../images/carSuperviseImage/hongse.png');
                break;
            case 6: // 确认借出
                return require('../../../images/carSuperviseImage/lanse.png');
                break;
            case 7: // 已还
                return require('../../../images/carSuperviseImage/lanse.png');
            case 8: // 已作废
                return require('../../../images/carSuperviseImage/huise.png');
                break;
            default:
        }

    }
    getTypeTitle=(type)=>{
        switch (type){
            case 1: // 待审核
                return '待审核';
                break;
            case 2: // 审核中
                return '审核中';
                break;
            case 3: // 审核通过
                return '审核通过';
                break;
            case 4: // 审核未通过
                return '审核未通过';
                break;
            case 5: // 已撤销
                return '已撤销';
                break;
            case 6: // 确认借出
                return '已借出';
                break;
            case 7: // 已还
                return '已归还';
            case 8: // 已作废
                return '已作废';
                break;
            default:
        }

    }
}

const styles = StyleSheet.create({
   root:{

       flex:1,
       backgroundColor:fontAndColor.COLORA3,
       paddingTop:Pixel.getTitlePixel(64),
       paddingBottom:Pixel.getPixel(44)

   },
    cellItemTitle:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT26),
        backgroundColor:'transparent'
    },
    cellItemValueTitle:{
        color:'white',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT26),
        backgroundColor:'transparent',
        width:Pixel.getPixel(75),
        height:Pixel.getPixel(25),
    } ,
    cellItemValueText:{
        color:'white',
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        backgroundColor:'transparent',
        height:Pixel.getPixel(25),
        width:width - Pixel.getPixel(170),
        marginLeft:Pixel.getPixel(20),
    }

})