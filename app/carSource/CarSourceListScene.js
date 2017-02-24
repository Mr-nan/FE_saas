/**
 * Created by zhengnan on 17/2/9.
 */

import React,{Component} from 'react';

import {
    StyleSheet,
    ListView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    RefreshControl,
    Dimensions,

} from 'react-native';

import * as fontAndColor from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';
import HeadView     from './znComponent/CarSourceSelectHeadView';
import ListFooter       from './znComponent/LoadMoreFooter';
import SGListView   from 'react-native-sglistview';
import CarCell      from './znComponent/CarCell';
import CarInfoScene from './CarInfoScene';
import CarBrandSelectScene from './CarBrandSelectScene';
import CityListScene from './CityListScene';
import  {request} from '../utils/RequestUtil';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

const carAgeSource = [
    {
        title:'1年以内' ,
        value:'0|1',
    },
    {
        title:'3年以内',
        value:'0|3',
    },
    {
        title:'5年以内' ,
        value:'0|4',
    },
    {
        title:'8年以内' ,
        value:'0|8',
    },
    {
        title:'10年以内' ,
        value:'0|10',
    },

];

const carKMSource = [
    {
        title:'1万公里以内',
        value:'0|1',
    },
    {
        title:'3万公里以内' ,
        value:'0|3',
    },
    {
        title:'5万公里以内' ,
        value:'0|5',
    },
    {
        title:'10万公里以内' ,
        value:'0|10',
    },


];

const sequencingDataSource = [
    {
        title:'最新发布',
        value:'1',
    },
    {
        title:'里程少',
        value:'2',
    },
    {
        title:'车龄短' ,
        value:'3',
    },
];

let carData = new Array;

const APIParameter = {

    brand_id:0,
    series_id:0,
    model_id:0,
    provice_id:0,
    city_id:0,
    order_type:0,
    coty:0,
    mileage:0,
    rows:20,
    page:1,
    start:0,
    type:1,
    status:1,
};

export  default  class  carSourceListScene extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id });

        this.state = {

            isRefreshing:false,
            dataSource:carSource,
            checkedSource:carAgeSource,
            isHide:true,
            isFillData:1,
            isHideSequencing:true,
            isLoadMore:true,
            currentCheckedIndex:1,
            sequencingType:{
                title:'',
                value:'',
            },
            checkedCarType:{
                title:'',
                brand_id:'',
                series_id:'',
            },
            checkedCarAgeType:{
                title:'',
                value:'',
            },
            checkedCarKMType:{
                title:'',
                value:'',
            },

        };

    }

    initFinish=()=>{

    };

    // 下拉刷新数据
    refreshingData=()=>{

        this.setState({isRefreshing:true});
        this.loadData();

    };

    componentWillMount() {

        this.refreshingData();
    }

    // 获取数据
    loadData=()=>{

        let url = 'http://dev.api-gateway.dycd.com/' + 'v1/car/index';

        console.log(APIParameter);
        APIParameter.page=0;
        request(url,'post',APIParameter)
            .then((response) => {

                carData = response.mjson.data.list;
                APIParameter.status = response.mjson.data.status;
                console.log(response);
                if(this.state.isFillData !== APIParameter.status)
                {
                    this.setState({
                        isFillData:APIParameter.status,
                    });
                }
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(carData),
                    isRefreshing:false,
                });

        }, (error) => {

                console.log(error);
                this.setState({
                    isRefreshing:false,
                });

            });

    };

    loadMoreData=()=>{

        let url = 'http://dev.api-gateway.dycd.com/' + 'v1/car/index';
        APIParameter.page +=1;
        console.log(APIParameter);
        request(url,'post',APIParameter)
            .then((response) => {

                APIParameter.status = response.mjson.data.status;
                console.log(response);
                if(this.state.isFillData !== APIParameter.status)
                {
                    this.setState({
                        isFillData:APIParameter.status,
                    });
                }
                let data = new  Array;
                data =response.mjson.data.list
                for (let i=0;i<data.length;i++)
                {
                    carData.push(data[i]);
                }
                console.log(carData.length);
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(carData),
                });

            }, (error) => {

                console.log(error);

            });
    }

    toEnd=()=>{

       if(carData.length && APIParameter.status==1)
       {
           this.loadMoreData();
       }

    };

    loactionClick=()=>{

        let navigatorParams = {
            name: "CityListScene",
            component: CityListScene,
            params: {
                checkedCarType: this.state.checkedCarType,
                checkedCarClick: this.checkedCarClick,
            }
        }
        this.props.callBack(navigatorParams);
    }

    presCarTypeScene=()=>{
        let navigatorParams = {
            name:"CarBrandSelectScene",
            component:CarBrandSelectScene,
            params:{
                checkedCarType:this.state.checkedCarType,
                checkedCarClick:this.checkedCarClick,
            }
        };
        this.props.callBack(navigatorParams);

    }


    //  筛选条件事件
    headViewOnPres = (index,isHighlighted,setImgHighlighted)=> {

        if(index===1) {

           this.presCarTypeScene();
            return;
        }

        this.refs.headView.checkSelect(this.state.currentCheckedIndex); // 取消之前选择按钮状态

        let {checkedSource} = this.state;
        if(!isHighlighted)
        {
            switch(index) {

                case 2:
                    checkedSource = carAgeSource;
                    break;
                case 3:
                    checkedSource = carKMSource;
                    break;
                default:
                    break;
            }
        }

        this.setState({

            checkedSource,
            isHide:isHighlighted,
            currentCheckedIndex: index,
        });

        setImgHighlighted(!isHighlighted); // 回调按钮状态

    };

    // 选择意向
    checkRecommendClick =(isCheck)=>{
        if(isCheck)
        {
            APIParameter.type=1;
            this.allDelectClick();
        }else
        {
            APIParameter.type=0;
        }
        this.refreshingData();

    };

    //  选择车型
    checkedCarClick=(carType)=>{

        this.setState({
            checkedCarType:{
                title:carType,
                brand_id:'',
                model_id:'',
            },
        });

        if(this.refs.headView.state.isCheckRecommend)
        {
            this.refs.headView.setCheckRecommend(false)
        }else {
            this.refreshingData();
        }

    };

    // 筛选车龄和里程
    checkCarAgeAnKMClick=(data,index)=>{

        this.refs.headView.checkSelect(this.state.currentCheckedIndex);

        let {checkedCarAgeType,checkedCarKMType} = this.state;

        if(this.state.currentCheckedIndex == 2)
        {
            checkedCarAgeType ={
                title:this.state.checkedSource[index].title,
                value:this.state.checkedSource[index].value,
            }
            APIParameter.coty=checkedCarAgeType.value;

        }
        if (this.state.currentCheckedIndex == 3)
        {
            checkedCarKMType = {
                title:this.state.checkedSource[index].title,
                value:this.state.checkedSource[index].value,
            }

            APIParameter.mileage=checkedCarKMType.value;
        }


        this.setState({

            checkedCarAgeType,
            checkedCarKMType,
            isHide:true,

        });

        if(this.refs.headView.state.isCheckRecommend)
        {
            this.refs.headView.setCheckRecommend(false)
        }else {
            this.refreshingData();
        }

    };

    // 筛选排序
    sequencingCheckedClick=(title,value)=>{

        this.hideSequencingView();
        this.setState({
            sequencingType:{

                title:title,
                value:value,

            },
        });
        APIParameter.order_type=value;
        this.refreshingData();
    };

    sequencingClick=()=>{
        this.setState({
            sequencingType:{
                title:'',
                value:'',
            },
        });
        APIParameter.order_type=0;
        this.refreshingData();
    };

    carTypeClick=()=>{
        this.setState({
            checkedCarType:'',
        });

    };

    carAgeClick=()=>{
        this.setState({
            checkedCarAgeType:{
                title:'',
                value:'',
            },
        });

        APIParameter.coty=0;
        if(this.refs.headView.state.isCheckRecommend)
        {
            this.refs.headView.setCheckRecommend(false)
        }else {
            this.refreshingData();
        }
    };

    carKMClick=()=>{
        this.setState({
            checkedCarKMType:{
                title:'',
                value:'',
            },
        });
        APIParameter.mileage=0;
        if(this.refs.headView.state.isCheckRecommend)
        {
            this.refs.headView.setCheckRecommend(false)
        }else {
            this.refreshingData();
        }
    };

    allDelectClick=()=>{

        this.setState({
            sequencingType:{
                title:'',
                value:'',
            },
            checkedCarType:{
                title:'',
                value:'',
            },
            checkedCarAgeType:{
                title:'',
                value:'',
            },
            checkedCarKMType:{
            title:'',
                value:'',
        },
        });

            APIParameter.order_type=0;
            APIParameter.mileage=0;
            APIParameter.coty=0;

        if(this.refs.headView.state.isCheckRecommend)
        {
            this.refs.headView.setCheckRecommend(false);

        }else {
            this.refreshingData();
        }

    };

    showSequencingView=()=>{

        this.setState({
            isHideSequencing:false,
        });

    };

    hideSequencingView=()=>{

        this.setState({
            isHideSequencing:true,
        });
    };



    carCellOnPres = (carID,sectionID,rowID)=>{

       let navigatorParams =   {

            name:"CarInfoScene",
            component:CarInfoScene,
            params:{
                carID:carID,
            }
        };
        this.props.callBack(navigatorParams);
    };

   renderListFooter=()=>{

       if(this.state.isRefreshing)
       {
           return null;
       }else
       {
           return (<ListFooter isLoadAll={this.state.isFillData==1?false:true}/>)
       }

   }

    render(){
        return(

            <View style={styles.contaier}>
                <View style={styles.contaier}>
                    <CarListNavigatorView searchClick={this.presCarTypeScene} loactionClick={this.loactionClick}/>
                    <View style={{height:40}}>
                        <HeadView ref="headView" onPres={this.headViewOnPres} checkRecommendClick={this.checkRecommendClick}/>
                    </View>
                    {

                        (this.state.checkedCarKMType.title || this.state.checkedCarAgeType.title || this.state.checkedCarType.title || this.state.sequencingType.title)?
                            ( <CheckedContentView
                                sequencingType={this.state.sequencingType}
                                carType={this.state.checkedCarType}
                                carAge={this.state.checkedCarAgeType}
                                carKM={this.state.checkedCarKMType}
                                sequencingClick={this.sequencingClick}
                                carTypeClick={this.carTypeClick}
                                carAgeClick={this.carAgeClick}
                                carKMClick={this.carKMClick}
                                allDelectClick={this.allDelectClick}
                            />
                        ):(null)
                    }

                    {
                        this.state.dataSource && (
                            <SGListView
                                dataSource={this.state.dataSource}
                                ref={'carListView'}
                                initialListSize={10}
                                stickyHeaderIndices={[]}
                                onEndReachedThreshold={1}
                                scrollRenderAheadDistance={1}
                                pageSize={1}
                                renderRow={(item,sectionID,rowID) =>
                                    <CarCell style={styles.carCell} carCellData={item} onPress={()=>{this.carCellOnPres(item.id,sectionID,rowID)}}/>
                                }
                                renderFooter={
                                    this.renderListFooter
                                }
                                onEndReached={this.toEnd}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.refreshingData}
                                    />
                                }
                            />)
                    }

                </View>
                <SequencingButton buttonClick={this.showSequencingView}/>
                {
                    this.state.isHideSequencing ?(null):(<SequencingView checkedType={this.state.sequencingType} checkedClick={this.sequencingCheckedClick} hideClick={this.hideSequencingView}/>)
                }
                {

                    this.state.isHide ?(null):(
                        <View style={styles.selectView}>
                            <View style={{backgroundColor:'white'}}>
                                <ScrollView>
                                    {
                                        this.state.checkedSource.map((data,index)=>{
                                            return(
                                                <TouchableOpacity  key={index} onPress={()=>{

                                                    this.checkCarAgeAnKMClick(data,index);
                                                }}>
                                                    <View style={styles.checkedCell} >

                                                        {
                                                            this.state.currentCheckedIndex == 2 ? (
                                                                <Text  style={[styles.checkedCellText,data.title==this.state.checkedCarAgeType.title && {color:fontAndColor.COLORB0}]} >{data.title}</Text>
                                                            ) : (
                                                                <Text  style={[styles.checkedCellText,data.title==this.state.checkedCarKMType.title && {color:fontAndColor.COLORB0}]} >{data.title}</Text>
                                                            )
                                                        }

                                                    </View>
                                                </TouchableOpacity>

                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styles.contaier} onPress={()=>{
                                this.refs.headView.checkSelect(this.state.currentCheckedIndex);
                                this.setState({
                                    isHide:true,
                                });
                            }}>
                            </TouchableOpacity>

                        </View>)
                }
            </View>

        )

    }
}


class CheckedContentView extends  Component {

    render() {
        const {sequencingType,carType,carAge,carKM,sequencingClick,carTypeClick,carAgeClick,carKMClick,allDelectClick} = this.props;
        return (

            <View style={styles.checkedContentView}>
                {
                    sequencingType.title?(
                        <TouchableOpacity onPress={sequencingClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{sequencingType.title}</Text>
                                <Image style={styles.checkedDeleteImg} source={require('../../images/deleteIcon2x.png')}/>
                            </View>
                        </TouchableOpacity>):(null)

                }
                {
                    carType.title?(
                        <TouchableOpacity onPress={carTypeClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{carType.title}</Text>
                                <Image style={styles.checkedDeleteImg} source={require('../../images/deleteIcon2x.png')}/>
                            </View>
                        </TouchableOpacity>):(null)

                }
                {
                    carAge.title?(
                        <TouchableOpacity onPress={carAgeClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{carAge.title}</Text>
                                <Image style={styles.checkedDeleteImg} source={require('../../images/deleteIcon2x.png')}/>
                            </View>
                        </TouchableOpacity>):(null)
                }
                {
                    carKM.title?(
                        <TouchableOpacity onPress={carKMClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{carKM.title}</Text>
                                <Image style={styles.checkedDeleteImg} source={require('../../images/deleteIcon2x.png')}/>
                            </View>
                        </TouchableOpacity>):(null)
                }


                <TouchableOpacity onPress={allDelectClick}>
                    <View style={styles.checkedDelectView}>
                        <Text style={styles.checkedDelectText}>清空</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

}

class SequencingButton extends  Component{

    render(){

        const {buttonClick} = this.props;
        return(
            <TouchableOpacity style={styles.sequencingButton} onPress={buttonClick}>
                    <Image  source={require('../../images/carSourceImages/sort@2x.png')}/>
                    <Text style={styles.sequencingText}>排序</Text>
            </TouchableOpacity>
        )
    }

}

class SequencingView extends Component{

    render(){
        const {checkedType,checkedClick,hideClick}=this.props;

        return(
            <View style={styles.SeqencingView}>
                <TouchableOpacity style={styles.contaier} onPress={hideClick}>
                </TouchableOpacity>
                <View style={{backgroundColor:'white'}}>
                    <ScrollView>
                        {
                            sequencingDataSource.map((data,index)=>{

                                return(
                                    <TouchableOpacity  key={index} onPress={()=>{

                                       checkedClick(data.title,data.value);
                                        hideClick();

                                    }}>
                                        <View style={styles.checkedCell}>
                                            {
                                                <Text style={[styles.checkedCellText,data.title == checkedType && {color:fontAndColor.COLORB0}]} >{data.title}</Text>
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>

            </View>
        )
    }
}


class CarListNavigatorView extends Component{

    render() {
        return (

            <View style={styles.navigatorView}>
                <View style={styles.navitgatorContentView}>
                    {/*<TouchableOpacity style={styles.navigatorLoactionView} onPress={this.props.loactionClick}>*/}
                        {/*<Image style={{marginLeft:15}} source={require('../../images/carSourceImages/location.png')}/>*/}
                        {/*<Text style={styles.navigatorText}>全国</Text>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity onPress={this.props.searchClick}>
                        <View style={styles.navigatorSousuoView}>
                            <Image style={{marginLeft:15,marginRight:10}} source={require('../../images/carSourceImages/sousuoicon.png')}/>
                            <Text style={styles.navigatorSousuoText}>按车型信息搜索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

var ScreenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({


    contaier:{
        flex:1,
    },
    checkedContentView:{

        backgroundColor:fontAndColor.COLORA3,
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'space-between',
        flexWrap: 'wrap',
    },

    checkedContentItem:{

        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:20,
        paddingHorizontal:5,
        marginLeft:15,
        marginTop:5,
        marginBottom:5,
        borderRadius:4,
    },
    checkedItemText:{
        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.CONTENTFONT,

    },
    checkedDeleteImg:{

        width:10,
        height:10,
        marginLeft:5,
    },
    checkedDelectView:{

        height:20,
        width:50,
        borderRadius:4,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:fontAndColor.COLORA2,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        marginLeft:15,
        marginTop:10,


    },
    checkedDelectText:{
        color:fontAndColor.COLORA2,
        fontSize:fontAndColor.CONTENTFONT,

    },
    selectView:{
        top:104,
        backgroundColor:'rgba(0, 0, 0,0.3)',
        left:0,
        right:0,
        position:'absolute',
        bottom:0,
    },
    carCell:{
        height :110,
    },
    checkedCell:{

        backgroundColor:'white',
        height:44,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:fontAndColor.COLORA4,

    },
    checkedCellText:{

        fontSize:fontAndColor.BUTTONFONT,
        textAlign:'center',
        color:fontAndColor.COLORA0,

    },

    sequencingButton:{

        flexDirection:'row',
        position:'absolute',
        width:70,
        height:30,
        right:20,
        borderRadius:15,
        backgroundColor:'rgba(0, 0, 0,0.7)',
        justifyContent:'center',
        alignItems:'center',
        bottom:25,
    },
    sequencingText:{

        color:'white',
        fontSize:fontAndColor.LITTLEFONT,
        marginLeft:5,

    },

    SeqencingView:{

        position:'absolute',
        backgroundColor:'rgba(0, 0, 0,0.3)',
        justifyContent:'flex-end',
        top:0,
        right:0,
        bottom:0,
        left:0,

    },

    navigatorView:{

        top:Pixel.getTitlePixel(0),
        height:Pixel.getPixel(64),
        backgroundColor:fontAndColor.COLORB0,
        flexDirection:'row',

    },
    navitgatorContentView:{

        flex:1,
        flexDirection:'row',
        marginTop:20,
        height:44,
        alignItems:'center',
        justifyContent:'center',

    },

    navigatorLoactionView:{

        flexDirection:'row',
        width:85,
        alignItems:'center',


    },
    navigatorSousuoView:{
        height:25,
        borderRadius:5,
        backgroundColor:'white',
        alignItems:'center',
        width:ScreenWidth-40,
        flexDirection:'row',
        justifyContent:'center',



    },
    navigatorText:{
      marginLeft:6,
        color:'white',
        fontSize:fontAndColor.LITTLEFONT,

    },
    navigatorSousuoText:{

        color:fontAndColor.COLORA1,
        fontSize:fontAndColor.LITTLEFONT,

    },

});