/**
 * Created by zhengnan on 2017/7/28.
 */
/**
 * Created by zhengnan on 2017/7/26.
 */

import React,{Component} from 'react';
import {

    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    ListView,
    Dimensions,

} from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from  '../../component/AllNavigationView';
import CarTrimHeaderView from './View/CarTrimHeaderView';
import CarTrimTaskCell from './View/CarTrimTaskCell';
import *as fontAndColor from  '../../constant/fontAndColor';
import PixelUtil from  '../../utils/PixelUtil';
import CarInitialTaskScene from "./CarInitialTaskScene";
import CarTrimInformationScene from "./CarTrimInformationScene";
import CarManagerTaskScene from "./CarManagerTaskScene";
import CarOperationScene from "./CarOperationScene";
import EvaluateCarInfo from "../../mine/setting/EvaluateCarInfo";
import WriteArrangeCostDetailTWO from "../../mine/setting/WriteArrangeCostDetailTWO";
import * as AppUrls from "../../constant/appUrls";
import  {request}           from '../../utils/RequestUtil';
let Pixel = new  PixelUtil();

const sceneWidth = Dimensions.get('window').width;


export default class CarTrimScene extends BaseComponent {

    render(){
        return(
            <View style={styles.rootContainer}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderHeader={()=>{return(<TrimTaskHeadView ref="headView" headerViewItemClick={this.headerViewItemClick} selectAction={this.selectAction}/>)}}
                    renderRow={this.renderRow}
                />
                <AllNavigationView title='名车行' backIconClick={this.backPage} renderRihtFootView={this.renderRightView}/>
            </View>
        )
    }

    // 构造
    constructor(props) {
        super(props);
        this.roleTitle = '手续员';
        this.roleValue = 'sxy';
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1==r2});
        this.state = {
            isShowHeadView:true,
            dataSource:ds,
            taskType:0,
        };
    }

    renderRow=(rowData)=>{
        return(
            <CarTrimTaskCell cellData={rowData} btnTitle={this.state.taskType == 1? '跟进':'查看'} cellBtnClick={()=>{
                if(this.state.taskType==1){
                    this.cellBtnClick(1);
                }else {
                    this.cellBtnClick(2);
                }
            }}/>
        )
    }

    /**
     * 导航右侧按钮
     */
    renderRightView=()=>{

        return(
            <TouchableOpacity onPress={()=>{

                this.toNextPage(
                    {
                        name: 'CarInitialTaskScene',
                        component: CarInitialTaskScene,
                        params: {}
                    }
                );
            }}>
                <View style={{marginLeft:Pixel.getPixel(20),width:Pixel.getPixel(50),height:Pixel.getPixel(40),justifyContent:'center',
                    alignItems:'center'}}>
                    <Text allowFontScaling={false}  style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>创建</Text>
                </View>
            </TouchableOpacity>
        )
    }

    initFinish=()=>{
        this.loadData(this.roleValue,1);
    }

    loadData=(roleValue,type)=>{

        this.props.showModal(true);
        request(AppUrls.CAR_CHESHANG_TASKS, 'post', {roleName:roleValue,type:type,token:'a78eee2a-5836-475c-bee0-15e00b02511a'}).then((response) => {
            this.props.showModal(false);
            console.log(response.mjson.data);
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(response.mjson.data)
            });

        }, (error) => {
            this.props.showModal(false);
            this.props.showToast(error.msg);
        });
    }

    /**
     * from @zn
     * 角色切换事件
     * @param title
     */
    headerViewItemClick=(title,value)=>{
       this.roleTitle = title;
       this.roleValue = value;
    }

    /**
     * 任务状态切换  1未办理，2已办理
     * @param type
     */
    selectAction=(type)=>{
       this.loadData(this.roleValue,type);
    }




    cellBtnClick=(type)=>{

        if(type==1){
            if(this.roleTitle == '整备员')
            {
                this.toNextPage(
                    {
                        name: 'CarTrimInformationScene',
                        component: CarTrimInformationScene,
                        params: {}
                    }
                );
            }else if(this.roleTitle == '评估师'){

                this.toNextPage(
                    {
                        name: 'EvaluateCarInfo',
                        component: EvaluateCarInfo,
                        params: {}
                    }
                );

            }else if(this.roleTitle == '经理')
            {
                this.toNextPage(
                    {
                        name: 'CarManagerTaskScene',
                        component: CarManagerTaskScene,
                        params: {}
                    }
                );
            }else if(this.roleTitle == '运营专员')
            {
                this.toNextPage(
                    {
                        name: 'CarOperationScene',
                        component: CarOperationScene,
                        params: {}
                    }
                );
            }
        }else {
            if(this.roleTitle == '整备员')
            {
                this.toNextPage(
                    {
                        name: 'CarTrimInformationScene',
                        component: CarTrimInformationScene,
                        params: {}
                    }
                );
            }else if(this.roleTitle == '评估师'){

                this.toNextPage(
                    {
                        name: 'WriteArrangeCostDetailTWO',
                        component: WriteArrangeCostDetailTWO,
                        params: {}
                    }
                );

            }else if(this.roleTitle == '经理')
            {
                this.toNextPage(
                    {
                        name: 'CarManagerTaskScene',
                        component: CarManagerTaskScene,
                        params: {}
                    }
                );
            }else if(this.roleTitle == '运营专员')
            {
                this.toNextPage(
                    {
                        name: 'CarOperationScene',
                        component: CarOperationScene,
                        params: {}
                    }
                );
            }
        }

    }

}

class TrimTaskHeadView extends Component{
    render(){
        return(
            <View style={{marginBottom:Pixel.getPixel(10)}}>
                <CarTrimHeaderView click={(title,value)=>{this.props.headerViewItemClick(title,value);this.setSelectType(1)}}/>
                <TrimTaskSelectView ref="TrimTaskSelectView" selectAction={this.props.selectAction}/>
            </View>
        )
    }

    setSelectType =(type)=>{
        if(this.refs.TrimTaskSelectView)
        {
            this.refs.TrimTaskSelectView.setSelectType(type);
        }
    }
}


class TrimTaskSelectView extends Component {

    render(){
        return(
            <View style={styles.selectView}>
                <TouchableOpacity onPress={()=>{
                    this.setSelectType(1);
                }}>
                    <View style={[styles.selectContenView,this.state.currentSeletType==1&&{borderBottomColor:fontAndColor.COLORB0}]}>
                        <Text style={styles.selectText}>未办任务(0)</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.setSelectType(2);
                }}>
                    <View style={[styles.selectContenView,this.state.currentSeletType==2&&{borderBottomColor:fontAndColor.COLORB0}]}>
                        <Text style={styles.selectText}>已办任务(0)</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentSeletType:1,
        };
      }

      setSelectType=(type)=>{
        this.setState({
            currentSeletType:type,
        });
          this.props.selectAction(type);

      }

}



const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    footBtn:{
        left:0,
        bottom:0,
        right:0,
        backgroundColor:fontAndColor.COLORB0,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        height:Pixel.getPixel(44),
    },
    footBtnText:{
        textAlign:'center',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        color:'white',
    },
    selectView:{
        height:Pixel.getPixel(44),
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        width:sceneWidth,
    },
    selectContenView:{
        width:sceneWidth *0.5,
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        borderBottomColor:'white',
        borderBottomWidth:Pixel.getPixel(2),
    },
    selectText:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        textAlign:'center',
    }
});
