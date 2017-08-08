/**
 * Created by zhengnan on 2017/7/28.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
    Dimensions,
    Image,
    KeyboardAvoidingView,
} from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from  '../../component/AllNavigationView';
import {CellView, CellSelectView} from '../znComponent/CarPublishCell';
import CarTrimCostView from './View/CarTrimCostView';
import *as fontAndColor from  '../../constant/fontAndColor';
import PixelUtil from  '../../utils/PixelUtil';
import CarBrandSelectScene from "../CarBrandSelectScene";
import CarlicenseTagScene from "../carPublish/CarlicenseTagScene";
import CarInitialTaskUpImagScene from "./CarInitialTaskUpImagScene";
import CarAddTrimCostScene from "./CarAddTrimCostScene";
let Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;



export default class CarOperationScene extends BaseComponent{

    render(){
        return(
            <View style={styles.rootContaier}>
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-Pixel.getPixel(200)}>
                    <ScrollView keyboardDismissMode={'on-drag'}>
                        {
                            this.state.titleData.map((data, index) => {
                                return (
                                    <View style={{marginTop:10,backgroundColor:'white',marginBottom:10}} key={index}>
                                        <View style={{paddingLeft:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(10),
                                            flexDirection:'row',borderBottomColor:fontAndColor.COLORA3,borderBottomWidth:Pixel.getPixel(1),alignItems:'center'
                                        }}>
                                            <View style={{width:Pixel.getPixel(3),height:Pixel.getPixel(14),backgroundColor:fontAndColor.COLORB0,marginRight:Pixel.getPixel(5)}}/>
                                            <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),fontWeight: 'bold'}}>{index==0?'手续信息':(index==1?'整备信息':'价格信息')}</Text>
                                        </View>
                                        {
                                            data.map((rowData, subIndex) => {
                                                return (
                                                    <TouchableOpacity key={subIndex}
                                                                      activeOpacity={1}
                                                                      onPress={()=>this.cellCilck(rowData.title)}>
                                                        <CellView cellData={rowData}/>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                        {
                                            index==1&&(
                                                <CarTrimCostView ref={(ref)=>{this.CarTrimCostView = ref}} costObject={this.costObject} addClick={this.addClick}  moverClick={this.moverCostAction} alterClilk={this.alterClilk}/>
                                            )
                                        }
                                    </View>
                                )
                            })
                        }
                        <View style={styles.footContainer}>
                            <TouchableOpacity onPress={this.footBtnClick}>
                                <View style={styles.footView}>
                                    <Text allowFontScaling={false}  style={styles.footText}>提交后发车</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <AllNavigationView title="核实信息" backIconClick={this.backPage}/>
            </View>
        )
    }

    cellSelectAction=(selectDict)=>{
        alert(selectDict.title,selectDict.value);
    }

    footBtnClick=()=>{
        this.toNextPage({
            name:'CarInitialTaskUpImagScene',
            component: CarInitialTaskUpImagScene,
            params: {

            }
        })
    }

    /**
     * 添加整备费明细
     */
    addClick=()=>{
        this.toNextPage({
            name:'CarAddTrimCostScene',
            component: CarAddTrimCostScene,
            params: {
                setCostAction:this.setCostAction,
            }
        })
    }

    /**
     * 获取添加整备费用明细
     * @param costObject
     */
    setCostAction =(costObject)=>{
        this.costObject.sumNumber+=costObject.price;
        this.costObject.array.push(costObject);
        this.CarTrimCostView.setCostObject(this.costObject);
    }

    /**
     * 移除整备费用明细
     * @param costObject
     */
    moverCostAction =(costObject,index)=>{
        this.costObject.sumNumber-=costObject.price;
        this.costObject.array.splice(index,1);
        this.CarTrimCostView.setCostObject(this.costObject);
    }

    /**
     * from zn
     * 修改整备费用明细
     * @param costObject
     * @param index
     */
    alterClilk=(costObject,index)=>{
        this.toNextPage({
            name:'CarAddTrimCostScene',
            component: CarAddTrimCostScene,
            params: {
                setCostAction:this.setCostAction,
                costObject:costObject,
                alterIndex:index,
                alterCostAction:this.alterCostAction,
            }
        })
    }

    /**
     * from zn
     * 修改整备费用明细
     * @param costObject
     * @param index
     */
    alterCostAction=(costObject,index)=>{
        this.costObject.array[index] = costObject;
        let sumNumber = 0;
        for (let item of this.costObject.array){
            sumNumber+=item.price;
        }
        this.costObject.sumNumber=sumNumber;

    }


    // 构造
    constructor(props) {
        super(props);

        this.titleData1=[
            [
                {
                    title:'车架号',
                    isShowTag:false,
                    value:'',
                    isShowTail:false,
                },
                {
                    title:'车型',
                    isShowTag:false,
                    value:'',
                    isShowTail:false,
                },
                {
                    title:'信息员姓名',
                    isShowTag:false,
                    value:'',
                    isShowTail:false,
                },
                {
                    title:'信息员电话',
                    isShowTag:false,
                    value:'',
                    isShowTail:false,
                },
                {
                    title:'信息来源',
                    isShowTag:false,
                    value:'',
                    isShowTail:false,
                },
                {
                    title:'原车牌号',
                    isShowTag:false,
                    value:'请选择',
                    isShowTail:true,
                },
                {
                    title:'钥匙数',
                    isShowTag:false,
                    isShowTail:true,
                    tailView: () => {
                        return (
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={11}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text)=>{

                                           }}/>

                            </View>)
                    }
                },
                {
                    title:'卖车人姓名',
                    isShowTag:false,
                    isShowTail:true,
                    tailView: () => {
                        return (
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={11}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text)=>{

                                           }}/>

                            </View>)
                    }
                },
                {
                    title:'卖车人电话',
                    isShowTag:false,
                    isShowTail:true,
                    tailView: () => {
                        return (
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={11}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text)=>{

                                           }}/>

                            </View>)
                    }
                },
                {
                    title:'备注',
                    isShowTag:false,
                    value:'',
                    isShowTail:false,
                },
            ],
            [
                {
                    title:'过户后车牌号',
                    isShowTag:false,
                    value:'请选择',
                    isShowTail:true,
                },
            ],
            [
                {
                    title:'卖车标价',
                    isShowTag:false,
                    value:'',
                    isShowTail:false,
                },
                {
                    title:'卖车低价',
                    isShowTag:false,
                    value:'',
                    isShowTail:false,
                },
                {
                    title:'备注',
                    isShowTag:false,
                    value:'',
                    isShowTail:false,
                },
            ]

        ];
        this.costObject={
            sumNumber:3000,
            array:[
                {
                    typeTitle:'机械维修',
                    content:'当为true时，如果文本被按下，则没有任何视觉效果。默认情况下，文本被按下时会有一个灰色的、椭圆形的高光。',
                    price:1000,
                }, {
                    typeTitle:'机械维修',
                    content:'当为true时，如果文本被按下，则没有任何视觉效果。默认情况下，文本被按下时会有一个灰色的、椭圆形的高光。',
                    price:1000,
                }, {
                    typeTitle:'机械维修',
                    content:'当为true时，如果文本被按下，则没有任何视觉效果。默认情况下，文本被按下时会有一个灰色的、椭圆形的高光。',
                    price:1000,
                }
            ]
        };
        this.state = {
            titleData:this.titleData1,
        };
    }


    /**
     *  form @ZN
     * @param title
     * 点击对应标题
     */
    cellCilck=(title)=>{
        if(title=='车型'){

            this.pushCarBrand();

        }else if(title == '原车牌号'){

            this.carTagType ='原车牌号';
            this.pushCarIicenseTagScene();

        }else if(title == '过户后车牌号')
        {
            this.carTagType ='过户后车牌号';
            this.pushCarIicenseTagScene();
        }
    }

    /**
     * from @ZN
     * 车辆系选择
     */
    pushCarBrand=()=>{
        let brandParams = {
            name: 'CarBrandSelectScene',
            component: CarBrandSelectScene,
            params: {
                checkedCarClick: this._checkedCarClick,
                status: 0,
            }
        };
        this.toNextPage(brandParams);
    }

    /**
     *
     * from @ZN
     * 车系选择结果
     * @param carObject
     * @private
     */
    _checkedCarClick=(carObject)=>{

        this.titleData1[0][1].value = carObject.model_name;
        this.upTitleData();
    }

    /*
     * from @zn
     *
     * 跳转车牌号页面
     **/
    pushCarIicenseTagScene = () => {
        let navigatorParams = {
            name: "CarlicenseTagScene",
            component: CarlicenseTagScene,
            params: {
                checkedCarlicenseTagClick: this._checkedCarlicenseTagClick,
                currentChecked: this.carTagType=='原车牌号'? this.titleData1[0][5].value : this.titleData1[1][0].value,

            }
        };
        this.toNextPage(navigatorParams);
    }

    /**
     * from @zn
     *
     * 保存车牌号信息
     **/
    _checkedCarlicenseTagClick = (title) => {

        if(this.carTagType=='原车牌号'){

            this.titleData1[0][5].value = title;

        }else {
            this.titleData1[1][0].value = title;

        }
        this.upTitleData();
    }


    upTitleData=()=>{

        // this.setState({
        //     titleData:this.titleData1,
        // });
    };
    /**
     * 开始加载
     * @private
     */
    _showLoading = () => {
        this.props.showModal(true);
    };

    /**
     * 关闭加载
     * @private
     */
    _closeLoading = () => {
        this.props.showModal(false);
    };

}

const styles = StyleSheet.create({
    rootContaier:{
        backgroundColor:fontAndColor.COLORA3,
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
    },
    scanImage: {
        height: Pixel.getPixel(18),
        width: Pixel.getPixel(18),
        marginLeft: Pixel.getPixel(8)
    },
    textInput: {
        height: Pixel.getPixel(30),
        borderColor: fontAndColor.COLORA0,
        width: Pixel.getPixel(160),
        textAlign: 'right',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,

    },
    textInputTitle: {
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginLeft: Pixel.getPixel(5),
        textAlign: 'right',
    },
    footContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Pixel.getPixel(20),
    },
    footView: {
        backgroundColor: fontAndColor.COLORB0,
        height: Pixel.getPixel(44),
        justifyContent: 'center',
        alignItems: 'center',
        width: sceneWidth - Pixel.getPixel(30),
        borderRadius: Pixel.getPixel(3),
        marginBottom: Pixel.getPixel(20),

    },
    footText: {
        textAlign: 'center',
        color: 'white',
        fontSize: fontAndColor.BUTTONFONT30
    },
});
