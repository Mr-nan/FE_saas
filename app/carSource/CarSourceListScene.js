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
import SGListView   from 'react-native-sglistview';
import CarCell      from './znComponent/CarCell';
import CarInfoScene from './CarInfoScene';
import CarBrandSelectScene from './CarBrandSelectScene';
import  {request} from '../utils/RequestUtil';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

const carAgeSource = [
    {
        title:'1年以内' ,
        checked:false,
    },
    {
        title:'3年以内' ,
        checked:false,
    },
    {
        title:'5年以内' ,
        checked:false,
    },
    {
        title:'8年以内' ,
        checked:false,
    },
    {
        title:'10年以内' ,
        checked:false,
    },

];

const carKMSource = [
    {
        title:'不限',
        checked:false,
    },
    {
        title:'1万公里以内',
        checked:false,
    },
    {
        title:'3万公里以内' ,
        checked:false,
    },
    {
        title:'5万公里以内' ,
        checked:false,
    },
    {
        title:'10万公里以内' ,
        checked:false,
    },
    {
        title:'10万公里以上',
        checked:false,
    },

];

const sequencingDataSource = [

    {
        title:'最新发布',

    },
    {
        title:'里程少',
        checked:false,
    },
    {
        title:'车龄短' ,
        checked:false,
    },
];

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
            isHideSequencing:true,
            currentCheckedIndex:1,
            sequencingType:'',
            checkedCarType:'',
            checkedCarAgeType:'',
            checkedCarKMType:'',

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

        let url = 'http://dev.api-gateway.dycd.com/' + 'v1/car/index?token=0ac50af9a02b752ca0f48790dc8ea6d1&device_code=dycd_dms_manage_ios';
        let params={
            brand_id:0,
            city_id:0,
            model_id:0,
            provice_id:0,
            series_id:0,
            rows:20,
            page:1,

        }


        request(url,'post',params)
            .then((response) => {

                console.log(response);
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(response.mjson.data.list),
                    isRefreshing:false,
                });

        }, (error) => {

                console.log(error);
                this.setState({
                    isRefreshing:false,
                });

            });

    };


        presCarTypeScene=()=>{
        let navigatorParams =   {

            name:"CarBrandSelectScene",
            component:CarBrandSelectScene,
            params:{
                checkedCarType:this.state.checkedCarType,
                checkedCarClick:this.checkedCarClick,
            }
        };
        this.props.callBack(navigatorParams);

    }
    //  筛选条件选择
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

    checkRecommendClick =(isCheck)=>{

        alert(isCheck);

        if(isCheck)
        {
            this.allDelectClick();
        }
    };

    checkedCarClick=(carType)=>{

        this.setState({
            checkedCarType:carType,
        });

        if(this.refs.headView.state.isCheckRecommend)
        {
            this.refs.headView.setCheckRecommend(false)
        }

    };

    sequencingClick=()=>{
        this.setState({
            sequencingType:'',
        });

    };
    carTypeClick=()=>{
        this.setState({
            checkedCarType:'',
        });

    };
    carAgeClick=()=>{
        this.setState({
            checkedCarAgeType:'',
        });
    };
    carKMClick=()=>{
        this.setState({
            checkedCarKMType:'',
        });
    };
    allDelectClick=()=>{
        this.setState({
            sequencingType:'',
            checkedCarType:'',
            checkedCarAgeType:'',
            checkedCarKMType:'',
        });

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

    sequencingCheckedClick=(title)=>{

        this.hideSequencingView();
        this.setState({
            sequencingType:title,
        });

        if(this.refs.headView.state.isCheckRecommend)
        {
            this.refs.headView.setCheckRecommend(false)
        }
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



    render(){
        return(

            <View style={styles.contaier}>
                <View style={styles.contaier}>
                    <CarListNavigatorView searchClick={this.presCarTypeScene}/>
                    <View style={{height:40}}>
                        <HeadView ref="headView" onPres={this.headViewOnPres} checkRecommendClick={this.checkRecommendClick}/>
                    </View>
                    {

                        (this.state.checkedCarKMType || this.state.checkedCarAgeType || this.state.checkedCarType || this.state.sequencingType)?
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

                                                    this.refs.headView.checkSelect(this.state.currentCheckedIndex);

                                                    let {checkedCarAgeType,checkedCarKMType} = this.state;

                                                    if(this.state.currentCheckedIndex == 2)
                                                    {
                                                        checkedCarAgeType = this.state.checkedSource[index].title;

                                                    }
                                                    if (this.state.currentCheckedIndex == 3)
                                                    {
                                                        checkedCarKMType = this.state.checkedSource[index].title
                                                    }

                                                    this.setState({

                                                        checkedCarAgeType,
                                                        checkedCarKMType,
                                                        isHide:true,

                                                    });

                                                    if(this.refs.headView.state.isCheckRecommend)
                                                    {
                                                        this.refs.headView.setCheckRecommend(false)
                                                    }

                                                }}>
                                                    <View style={styles.checkedCell} >

                                                        {
                                                            this.state.currentCheckedIndex == 2 ? (
                                                                <Text  style={[styles.checkedCellText,data.title==this.state.checkedCarAgeType && {color:fontAndColor.COLORB0}]} >{data.title}</Text>
                                                            ) : (
                                                                <Text  style={[styles.checkedCellText,data.title==this.state.checkedCarKMType && {color:fontAndColor.COLORB0}]} >{data.title}</Text>
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
                    sequencingType?(
                        <TouchableOpacity onPress={sequencingClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{sequencingType}</Text>
                                <Image style={styles.checkedDeleteImg} source={require('../../images/deleteIcon2x.png')}/>
                            </View>
                        </TouchableOpacity>):(null)

                }
                {
                    carType?(
                        <TouchableOpacity onPress={carTypeClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{carType}</Text>
                                <Image style={styles.checkedDeleteImg} source={require('../../images/deleteIcon2x.png')}/>
                            </View>
                        </TouchableOpacity>):(null)

                }
                {
                    carAge?(
                        <TouchableOpacity onPress={carAgeClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{carAge}</Text>
                                <Image style={styles.checkedDeleteImg} source={require('../../images/deleteIcon2x.png')}/>
                            </View>
                        </TouchableOpacity>):(null)
                }
                {
                    carKM?(
                        <TouchableOpacity onPress={carKMClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{carKM}</Text>
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

                                       checkedClick(data.title);
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
                    <View style={styles.navigatorLoactionView}>
                        <Image style={{marginLeft:15}} source={require('../../images/carSourceImages/location.png')}/>
                        <Text style={styles.navigatorText}>全国</Text>
                    </View>
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

        flexDirection:'row',
        marginTop:20,
        width:44,
        alignItems:'center'
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
        width:ScreenWidth-85-15,
        flexDirection:'row'
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