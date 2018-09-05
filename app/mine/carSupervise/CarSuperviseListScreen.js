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
    InteractionManager,
    RefreshControl
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
import ListFooter  from '../../carSource/znComponent/LoadMoreFooter';


const Pixel = new PixelUtil();
const IS_ANDROID = Platform.OS === 'android';

export default class CarSuperviseListScreen extends BaseComponent {

      constructor(props) {
        super(props);

        this.dataList=[];
        this.page = 1; //当前页
        this.total = 1;//总页数

        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state = {
            dataSource:ds,
            barStyle:'default',
            renderPlaceholderOnly:'blank',
            isRefreshing:false,
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
    initFinish=()=>{
        this.setState({renderPlaceholderOnly:'loading'});
        this.loadData();
    }
    allRefresh = () => {
        this.setState({renderPlaceholderOnly:'loading'});
        this.loadData();
    }
    refreshingData=()=>{
        this.page = 1;
        this.setState({isRefreshing:true});
        this.loadData();
    }
    loadData=()=>{
        request(AppUrls.FINANCE, 'Post', {
            page:this.page,
            api: AppUrls.PLEDGE_BORROW_LIST,
        })
            .then((response) => {

                    if(response.mjson.data.list.length<=0){
                        this.setState({renderPlaceholderOnly: 'null'});
                    }else {
                        if(this.page>1){
                            this.dataList.push(...response.mjson.data.list) ;

                        }else {
                            this.dataList = response.mjson.data.list ;
                        }
                        for (let typeData of this.dataList){
                            let typeArray = [];
                            if(typeData.borrow_status =='4'){
                                typeArray = [{title:'退回原因',value:typeData.return_remark}];
                            }
                            else if(typeData.borrow_status =='3'){

                                typeArray = [{title:'验证码',value:typeData.verification_code}];

                            }else if(typeData.borrow_status =='6'){
                                typeArray = [{title:'需归还时间',value:typeData.return_date},{title:'发放时间',value:typeData.borrow_confirm_date}];
                            }
                            typeData.typeArray = typeArray;
                        }

                        this.setState({
                            renderPlaceholderOnly: 'success',
                            isRefreshing:false,
                            dataSource:this.state.dataSource.cloneWithRows(this.dataList),
                        });

                    }

                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }


    toEnd = () => {

        if (this.dataList.length>0 && !this.state.isRefreshing && this.page!=this.total) {
            this.page+=1;
            this.loadData();
        }

    };



    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {

            return (<ListFooter isLoadAll={this.page==this.total?true:false} isCarFoot={false}/>)
        }

    }






    render() {
        if(this.state.renderPlaceholderOnly!='success'){
            return(
                <View style={{flex:1,backgroundColor:fontAndColor.COLORA3,}}>
                    {
                        this.loadView()
                    }
                    <NavigationView title={'监管物借出列表'}
                                    backIconClick={this.backPage}/>
                    <FootButtom footClick={this.footClick}/>
                </View>
            )
        }
        return (
            <View style={styles.root}>
                <StatusBar barStyle={this.state.barStyle}/>
                <ListView  dataSource={this.state.dataSource}
                           renderRow={this.renderRow}
                           renderFooter={this.renderListFooter}
                           onEndReached={this.toEnd}
                           refreshControl={
                               <RefreshControl
                                   refreshing={this.state.isRefreshing}
                                   onRefresh={this.refreshingData}
                                   tintColor={[fontAndColor.COLORB0]}
                                   colors={[fontAndColor.COLORB0]}
                               />
                           }
                />
                <FootButtom footClick={this.footClick}/>
                <NavigationView title={'监管物借出列表'}
                                backIconClick={this.backPage}
                                wrapStyle={{backgroundColor:'white'}}
                                titleStyle={{color:fontAndColor.COLORA0}}/>
                <AllLoading callEsc={()=>{}} ref="allloading" callBack={()=>{this.cancelAction();}}/>
            </View>
        )
    }

    renderRow =(data)=> {
          return(
              <CarSuperviseListCell data={data} repealButtonClick={(borrow_id)=>{
                  this.borrow_id = borrow_id;
                  this.refs.allloading.changeShowType(true,'是否确定撤销?\n\n撤销后系统将无法恢复！')}
              }/>
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
               loadAction:()=>{this.initFinish()}
            }
        });
    }

    cancelAction=()=>{
        this.props.showModal(true);
        request(AppUrls.FINANCE, 'Post', {
            api: AppUrls.PLEDGE_CAR_CANCEL,
            borrow_id:this.borrow_id,
        })
            .then((response) => {
                    this.props.showModal(false);
                    this.props.showToast('已成功撤销');
                    this.initFinish();

                },
                (error) => {
                    this.props.showModal(false);
                    this.props.showToast('撤销失败');

                });
    }
}

class FootButtom extends Component{
    render(){
        return(
            <TouchableOpacity
                style={{position: 'absolute',backgroundColor:fontAndColor.COLORB0, alignItems:'center',justifyContent:'center',bottom:Pixel.getBottomPixel(0),left:0,
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
                            <Text style={[styles.cellItemTitle,data.borrow_status==8&&{color:fontAndColor.COLORA1}]}>车架号：{data.auto_vin}</Text>
                            {
                                this.getTypeTitle(data.borrow_status)
                            }
                        </View>
                        <Text style={[styles.cellItemTitle,data.borrow_status==8&&{color:fontAndColor.COLORA1}]} numberOfLines={1}>车型信息：{data.model_name}</Text>
                    </View>
                </Image>
                <Image style={{width:width,paddingHorizontal:Pixel.getFontPixel(20),
                    justifyContent:'center',height:Pixel.getPixel(135)+Pixel.getPixel(40)*data.typeArray.length,
                    paddingBottom:Pixel.getPixel(16)}} resizeMode={'stretch'}
                       source={this.getTypeBackImage(data.borrow_status)}>
                    <View style={{marginTop:Pixel.getPixel(15)}}>
                        {
                            data.typeArray.map((subData,index)=>{
                                return(
                                    <View style={{paddingBottom:Pixel.getPixel(10)}} key={index}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={styles.cellItemValueTitle} numberOfLines={2}>{subData.title}</Text>
                                            <Text style={styles.cellItemValueText} numberOfLines={2}>{subData.value}</Text>
                                        </View>
                                        <View style={{alignItems:'center',
                                            width:Pixel.getPixel(20),position: 'absolute',top:Pixel.getPixel(0),bottom:0,left:Pixel.getPixel(70)}}>
                                            <Image  style={{marginTop:Pixel.getPixel(4)}} source={require('../../../images/carSuperviseImage/xiayigezhuangtai.png')}/>
                                            <View style={{width:Pixel.getPixel(1),backgroundColor:'white',marginTop:Pixel.getPixel(4),height:Pixel.getPixel(20)}}/>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.cellItemValueTitle}>申请借出日</Text>
                                <Text style={styles.cellItemValueText}>{data.borrow_date}</Text>
                                <View style={{
                                    height:Pixel.getPixel(20),
                                    borderRadius:Pixel.getPixel(10),
                                    backgroundColor:'rgba(0,0,0,0.1)',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    position: 'absolute',
                                    width:Pixel.getPixel(60),
                                    right:Pixel.getPixel(5)
                                }}>
                                    <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}}>借用{data.borrow_days}天</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',marginVertical:Pixel.getPixel(5)}}>
                                <Text style={styles.cellItemValueTitle}>借出物</Text>
                                <Text style={styles.cellItemValueText}>{data.borrow_goods_text}  {data.borrow_other_goods}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.cellItemValueTitle}>申请原因</Text>
                                <Text style={styles.cellItemValueText} numberOfLines={2}>{data.borrow_uses_text}  {data.borrow_other_uses}</Text>
                            </View>
                            <View style={{alignItems:'center',
                                width:Pixel.getPixel(20),height:Pixel.getPixel(100),position: 'absolute',top:Pixel.getPixel(0),left:Pixel.getPixel(70)}}>
                                <Image  style={{marginTop:Pixel.getPixel(4),height:Pixel.getPixel(7.5),width:Pixel.getPixel(7.5)}} source={require('../../../images/carSuperviseImage/xiayigezhuangtai.png')}/>
                                <Image  style={{marginTop:Pixel.getPixel(5),height:Pixel.getPixel(73)}} source={require('../../../images/carSuperviseImage/shuxian.png')}/>
                            </View>
                        </View>
                    </View>
                    {
                        (data.borrow_status==1||data.borrow_status==2||data.borrow_status==3) &&(
                            <TouchableOpacity style={{right:-Pixel.getPixel(0), bottom:-Pixel.getPixel(5), position: 'absolute'}}
                                          onPress={()=>{this.props.repealButtonClick(data.borrow_id)}}>
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
            case '0': // 借出状态
                return require('../../../images/carSuperviseImage/lanse.png');
                break;
            case '1': // 待审核
                return require('../../../images/carSuperviseImage/lanse.png');
                break;
            case '2': // 审核中
                return require('../../../images/carSuperviseImage/lanse.png');
                break;
            case '3': // 审核通过
                return require('../../../images/carSuperviseImage/lvse.png');
                break;
            case '4': // 审核未通过
                return require('../../../images/carSuperviseImage/hongse.png');
                break;
            case '5': // 已撤销
                return require('../../../images/carSuperviseImage/hongse.png');
                break;
            case '6': // 确认借出
                return require('../../../images/carSuperviseImage/lanse.png');
                break;
            case '7': // 已还
                return require('../../../images/carSuperviseImage/lanse.png');
            case '8': // 已作废
                return require('../../../images/carSuperviseImage/huise.png');
                break;
            default:
                return require('../../../images/carSuperviseImage/lanse.png');
        }

    }
    getTypeTitle=(type)=>{
        switch (type){
            case '1': // 待审核
                return (<Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA5,backgroundColor:'transparent'}}>待审核</Text>);
                break;
            case '2': // 审核中
                return (<Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA5,backgroundColor:'transparent'}}>审核中</Text>);
                break;
            case '3': // 审核通过
                return (<Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORB1,backgroundColor:'transparent'}}>审核通过</Text>);
                break;
            case '4': // 审核未通过
                return (<Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORB2,backgroundColor:'transparent'}}>审核未通过</Text>);
                break;
            case '5': // 已撤销
                return (<Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORB2,backgroundColor:'transparent'}}>已撤销</Text>);
                break;
            case '6': // 确认借出
                return (<Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA5,backgroundColor:'transparent'}}>已借出</Text>);
                break;
            case '7': // 已还
                return (<Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA5,backgroundColor:'transparent'}}>已还</Text>);
            case '8': // 已作废
                return (<Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA1,backgroundColor:'transparent'}}>已作废</Text>);
                break;
            default:
                return (<Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA5,backgroundColor:'transparent'}}></Text>);

        }
    }
        getType=(data)=>{

            let typeArray=[];
            return typeArray;

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
        height:Pixel.getPixel(30),
        width:width - Pixel.getPixel(170),
        marginLeft:Pixel.getPixel(20),
        // backgroundColor:'red'
    }

})