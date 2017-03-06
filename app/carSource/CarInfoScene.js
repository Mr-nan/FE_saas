import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Linking,
    InteractionManager,
    Dimensions,
    Modal,

} from 'react-native';

import *as fontAndColor from '../constant/fontAndColor';
import ImagePageView from 'react-native-viewpager';
import BaseComponent from '../component/BaseComponent';
import NavigationView from '../component/AllNavigationView';
import Gallery from 'react-native-gallery';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";

var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;



const carParameterViewColor = [

    'rgba(5, 197, 194,0.15)',
    'rgba(58, 200, 126,0.15)',
    'rgba(47, 155, 250,0.15)',

];

const carParameterTextColor = [

    fontAndColor.COLORB0,
    fontAndColor.COLORB1,
    fontAndColor.COLORB4,

];

const carIconsData = [
    {
        title: '出厂日期',
        image: require('../../images/carSourceImages/factory.png'),
        imageHigh: require('../../images/carSourceImages/factory_h.png'),
    },
    {
        title: '初登日期',
        image: require('../../images/carSourceImages/rollout.png'),
        imageHigh: require('../../images/carSourceImages/rollout_h.png'),
    },
    {
        title: '表显里程',
        image: require('../../images/carSourceImages/mileage.png'),
        imageHigh: require('../../images/carSourceImages/mileage_h.png'),
    },
    {
        title: '过户次数',
        image: require('../../images/carSourceImages/transfer.png'),
        imageHigh: require('../../images/carSourceImages/transfer_h.png'),
    },
    {
        title: '运营性质',
        image: require('../../images/carSourceImages/operation.png'),
        imageHigh: require('../../images/carSourceImages/operation_h.png'),
    },
    {
        title: '车身/内饰颜色',
        image: require('../../images/carSourceImages/carColor.png'),
        imageHigh: require('../../images/carSourceImages/carColor_h.png'),
    },

];


let carImageArray = [];

export default class CarInfoScene extends BaseComponent {


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imageArray:  new ImagePageView.DataSource({pageHasChanged: (r1, r2) => r1 !== r2}),
            renderPlaceholderOnly: 'blank',
            carData:{imgs:[]},
            currentImageIndex:1,
        };
    }

    initFinish = () => {
        this.loadData();
    }


    loadData=()=> {

        let url = AppUrls.CAR_DETAIL;
        request(url, 'post', {

            id: this.props.carID,

        }).then((response) => {

            let carData = response.mjson.data;
            carData.carIconsContentData=[
                carData.manufacture!=''? this.dateReversal(carData.manufacture+'000'):'',
                carData.init_reg!=''? this.dateReversal(carData.init_reg+'000'):'',
                carData.mileage+'万公里',
                carData.transfer_times+'次',
                carData.nature_str,
                carData.car_color.split("|")[0]+'/'+carData.trim_color.split("|")[0],
            ];

            if(carData.imgs.length<=0){

                carData.imgs=[ {require:require('../../images/carSourceImages/car_null_img.png')}];
            }

            this.setState({
                carData:carData,
                imageArray: this.state.imageArray.cloneWithPages(carData.imgs),
                renderPlaceholderOnly: 'success'
            });

        }, (error) => {
            this.setState({renderPlaceholderOnly: 'error'});
        });
    }

    dateReversal=(time)=>{

        const date = new Date();
        date.setTime(time);
        return(date.getFullYear()+"-"+(date.getMonth()+1));

    };

    backIconClick = () => {

        this.backPage();
    };

    callClick =() => {
        Linking.openURL('tel:4006561290,100002#');
    };

    // 打开分享
    showShared=()=>{

        this.refs.sharedView.isVisible(true);
    }


    // 浏览图片
    showPhotoView=()=>{

        if(typeof this.state.carData.imgs[0].url == 'undefined')
        {
            this.props.showToast('没有车辆图片');
            return;
        }

        carImageArray=[];
       this.state.carData.imgs.map((data,index)=>{

           carImageArray.push(data.url);

       })
        this.refs.photoView.show(carImageArray,this.state.currentImageIndex);

    };


    // 添加收藏
    addStoreAction=(isStoreClick)=>{

        let url = AppUrls.BASEURL + 'v1/user.favorites/create';
        request(url,'post',{

            id:this.state.carData.id,

        }).then((response) => {

            console.log(response);
            if(response.mycode==1){

                isStoreClick(true);
                this.props.showToast('收藏成功');
            }else {

                this.props.showToast(response.mycode.msg);
            }

        }, (error) => {

            this.props.showToast('收藏失败');

        });

    }

    // 取消收藏
    cancelStoreAction=(isStoreClick)=>{

        let url = AppUrls.BASEURL + 'v1/user.favorites/delete';
        request(url,'post',{

            id:this.state.carData.id,

        }).then((response) => {

            console.log(response);
            if(response.mycode==1){

                isStoreClick(false);
                this.props.showToast('取消收藏');

            }else {

                this.props.showToast(response.mycode.msg);
            }

        }, (error) => {

            this.props.showToast('取消收藏失败');

        });

    }


    navigatorRightView = ()=> {
        return (
           <NavigationRightView isStore={this.state.carData.is_collection==0?false:true} addStoreAction={this.addStoreAction} cancelStoreAction={this.cancelStoreAction} showShared={this.showShared}/>
        );
    };


    setNavitgationBackgroundColor=(event)=>{

        if(event.nativeEvent.contentOffset.y>20){

            this.refs.navtigation.setNavigationBackgroindColor(fontAndColor.COLORB0);
        }else{
            this.refs.navtigation.setNavigationBackgroindColor('rgba(0,0,0,0)');
        }
    }

    renderImagePage=(data,pageID)=>{

        return(
            <TouchableOpacity onPress={()=>{this.showPhotoView()}}>
                <Image source={typeof data.url =='undefined'?data.require:{uri:data.url}} style={styles.carImage}/>
            </TouchableOpacity>

        );
    }



    render() {

        if (this.state.renderPlaceholderOnly!=='success') {
            return (
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    {this.loadView()}
            </View>);
        }

        const carData = this.state.carData;

        return (
            <View ref="carInfoScene" style={{flex: 1, backgroundColor: 'white'}}>

                <ScrollView style={{marginBottom: Pixel.getPixel(44)}}
                            scrollEventThrottle={200}
                            onScroll={this.setNavitgationBackgroundColor}
                >
                    <ImagePageView
                        dataSource={this.state.imageArray}    //数据源（必须）
                        renderPage={this.renderImagePage}     //page页面渲染方法（必须）
                        isLoop={false}                        //是否可以循环
                        autoPlay={false}                      //是否自动
                        locked={false}                        //为true时禁止滑动翻页
                        renderPageIndicator={(index)=>{
                            return(
                                <View style={styles.imageFootView}>
                                    <View style={styles.carAgeView}>
                                        <Text style={styles.carAgeText}>{carData.v_type==1?'车龄 '+carData.init_coty:carData.v_type_str}</Text>
                                    </View>
                                    <Text style={styles.imageIndexText}>{this.state.currentImageIndex+'/'+this.state.carData.imgs.length}</Text>
                                </View>
                            )
                        }}
                        onChangePage={(index)=>{

                            this.setState({
                                currentImageIndex:index+1,
                            });

                        }}/>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentView}>
                            <Text style={styles.titleText}>{carData.model_name+carData.series_name}</Text>
                            <View style={styles.titleFootView}>
                                <View style={styles.browseView}>
                                    {/*<Image style={{marginRight: 5}}*/}
                                           {/*source={require('../../images/carSourceImages/browse.png')}/>*/}
                                    {/*<Text style={styles.browseText}>1024次浏览</Text>*/}
                                </View>
                                <Text style={styles.priceText}>{carData.dealer_price>0?(carData.dealer_price +'万'):''}</Text>
                            </View>
                        </View>
                    </View>
                    {
                        ((typeof(carData.labels)!= "undefined"?(carData.labels.length<=0?false:true):false)|| carData.describe!=='' || carData.city_name!=='' || carData.plate_number!=='') && (
                            <View style={styles.contentContainer}>
                                <View style={styles.contentView}>
                                    {
                                        (typeof(carData.labels)!= "undefined"?(carData.labels.length<=0?false:true):false) &&
                                        (
                                            <View style={styles.carParameterView}>
                                                {
                                                    carData.labels.map((data, index) => {
                                                        return (
                                                            <View
                                                                style={[styles.carParameterItem, {backgroundColor: carParameterViewColor[index % 3]}]}
                                                                key={index}>
                                                                <Text style={[styles.carParameterText, {color: carParameterTextColor[index % 3]}]}>{data.name}</Text>
                                                            </View>)
                                                    })
                                                }
                                            </View>
                                        )
                                    }

                                    {
                                        carData.describe!==''&& <View style={styles.carDepictView}>
                                            <Text style={styles.carDepictText}>{carData.describe}</Text>
                                        </View>
                                    }

                                    <View style={styles.carAddressView}>
                                        <View>
                                            {
                                                carData.city_name!==''&&(<View style={styles.carAddressSubView}>
                                                    <Text style={styles.carAddressTitleText}>所在地: </Text>
                                                    <Text style={styles.carAddressSubTitleText}>{carData.provice_name+carData.city_name}</Text>
                                                </View>)
                                            }
                                        </View>
                                        <View>
                                            {
                                                carData.plate_number!==''&& (<View style={styles.carAddressSubView}>
                                                    <Text style={styles.carAddressTitleText}>挂牌地: </Text>
                                                    <Text style={styles.carAddressSubTitleText}>{carData.plate_number.substring(0,2)}</Text>
                                                </View>)
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )

                    }


                    <View style={styles.carIconsContainer}>
                        <View style={styles.carIconsView}>
                            {
                                carIconsData.map((data, index) => {
                                    return (
                                        <CarIconView imageData={data.image} imageHighData={data.imageHigh}
                                                     content={carData.carIconsContentData&&carData.carIconsContentData[index]} title={data.title}
                                                     key={index}/>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.callView} onPress={this.callClick}>
                    <View style={{alignItems:'center',justifyContent:'center',width:ScreenWidth*0.5}}>
                    <Text style={styles.callText}>{'车源编号:'+carData.serial_num}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', borderLeftWidth: StyleSheet.hairlineWidth,
                        borderLeftColor:'white',width:ScreenWidth*0.5}}>
                    <Image source={require('../../images/carSourceImages/phone.png')}/>
                    <Text style={styles.callText}>客服咨询</Text>
                     </View>
                </TouchableOpacity>
                <NavigationView
                    ref="navtigation"
                    wrapStyle={{backgroundColor:'rgba(0,0,0,0)'}}
                    title="车源详情"
                    backIconClick={this.backIconClick}
                    renderRihtFootView={this.navigatorRightView}
                />
                <PhotoView ref="photoView"/>
                <SharedView ref="sharedView"/>
            </View>

        )
    }

}

class CarIconView extends Component {

    render() {

        const {imageData, imageHighData, title, content} = this.props;
        const bool = (content&&content!=='/'&&content!=='次'&&content!=='万公里')?true:false;
        return (
            <View style={styles.carIconItem}>
                <Image source={bool ? imageHighData : imageData}/>
                <Text style={[styles.carIconItemContentText, bool && {color: fontAndColor.COLORA0}]}>{bool ? content : '暂无'}</Text>
                <Text style={styles.carIconItemTitleText}>{title}</Text>
            </View>
        )
    }

}

class  SharedView extends Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            isVisible:false,

        };
      }

    isVisible=(visible)=>{

        this.setState({
            isVisible:visible,
        });
    }

    render(){

        return(
            <Modal
                visible={this.state.isVisible}
                transparent={true}
                onRequestClose={()=>{this.isVisible(false)}}
                animationType={'fade'}>

                <TouchableOpacity style={styles.sharedContaier} onPress={()=>{this.isVisible(false)}}>
                    <View style={styles.sharedView}>
                        <View style={styles.sharedViewHead}>
                            <Text style={styles.sharedViewHeadText}>分享到</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={styles.sharedItemView} onPress={()=>{this.isVisible(false)}}>
                                <Image source={require('../../images/carSourceImages/shared_ wx.png')}/>
                                <Text style={styles.sharedText}>微信好友</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sharedItemView} onPress={()=>{this.isVisible(false)}}>
                                <Image source={require('../../images/carSourceImages/shared_ friend.png')}/>
                                <Text style={styles.sharedText}>朋友圈</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        )
    }

}

class PhotoView extends Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            isVisible:false,
        };
      }


      show=(imageArray,index)=>{

          this.setState({
              isVisible:true,
              imageArray:imageArray,
              index:index,
          });
      }

      hide=()=>{

          this.setState({
              isVisible:false,
          });
      }

    render(){
        const {imageArray,index} = this.state;
        return(
            <Modal
                visible={this.state.isVisible}
                transparent={true}
                onRequestClose={()=>{this.hide()}}
                animationType={'fade'}
            >
                <Gallery
                    style={{flex: 1, backgroundColor: 'rgba(1,1,1,0.5)'}}
                    images={imageArray}
                    initialPage={index-1}
                    onSingleTapConfirmed={() => {
                        this.hide();
                    }}
                />
            </Modal>
        )
    }
}

class NavigationRightView extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            isStore:this.props.isStore,
        };
      }

      isStoreClick=(isStore)=>{

          this.setState({
              isStore:isStore,
          })
      }

    render(){
        return(
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=>{

                    if(this.state.isStore){

                        this.props.cancelStoreAction(this.isStoreClick);

                    }else {

                        this.props.addStoreAction(this.isStoreClick);
                    }

                }}>
                    <Image source={ this.state.isStore? require('../../images/carSourceImages/store.png') : require('../../images/carSourceImages/store_nil.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: Pixel.getPixel(10)}} onPress={this.props.showShared}>
                    <Image source={require('../../images/carSourceImages/share_nil.png')}></Image>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({


    carImage: {

        height: Pixel.getPixel(250),
        width:ScreenWidth,
        resizeMode: 'stretch'

    },
    contentContainer: {

        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAndColor.COLORA4,

    },
    contentView: {

        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(10),
        marginRight: Pixel.getPixel(15),
        marginBottom: Pixel.getPixel(15),
        backgroundColor: 'white'

    },
    titleText: {
        color: fontAndColor.COLORA0,
        fontSize: fontAndColor.TITLEFONT,
        backgroundColor: 'transparent',

    },
    subTitleView: {

        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 3,
        borderColor: fontAndColor.COLORB0,
        justifyContent: 'center',
        alignItems: 'center',
        width: Pixel.getPixel(52),
        marginLeft: Pixel.getPixel(5),
        marginTop: Pixel.getPixel(15),
        height: Pixel.getPixel(30),


    },
    subText: {

        color: fontAndColor.COLORB0,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT),
        textAlign: 'center',

    },
    titleFootView: {

        flexDirection: 'row',
        // backgroundColor:'red',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Pixel.getPixel(10),


    },
    browseView: {

        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'yellow',

    },
    browseText: {
        color: fontAndColor.COLORA2,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT),
    },
    priceText: {
        color: fontAndColor.COLORB2,
        fontSize:Pixel.getFontPixel(fontAndColor.TITLEFONT),
        fontWeight: 'bold',

    },
    carParameterView: {

        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        flexWrap: 'wrap',
        marginBottom: Pixel.getPixel(12),

    },
    carParameterItem: {

        marginTop: Pixel.getPixel(5),
        marginBottom: Pixel.getPixel(5),
        marginRight: Pixel.getPixel(5),
        paddingHorizontal: Pixel.getPixel(5),
        height: Pixel.getPixel(18),
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carParameterText: {
        fontSize:Pixel.getFontPixel(fontAndColor.MARKFONT),
    },
    carDepictView: {

        marginBottom: Pixel.getPixel(15),
        paddingHorizontal: Pixel.getPixel(5),
        paddingVertical: Pixel.getPixel(5),
        backgroundColor: 'rgba(158,158,158,0.15)',
        borderRadius: 3,
    },
    carDepictText: {

        color: fontAndColor.COLORA2,
        fontSize:Pixel.getFontPixel(fontAndColor.MARKFONT),
    },
    carAddressView: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    carAddressSubView: {

        flexDirection: 'row',
    },
    carAddressTitleText: {

        color: fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT),

    },
    carAddressSubTitleText: {

        color: fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT),
    },
    carIconsContainer: {

        marginBottom: Pixel.getPixel(15),
        marginHorizontal: Pixel.getPixel(15),
        backgroundColor: 'white',


    },
    carIconsView: {

        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',

    },
    carIconItem: {

        alignItems: 'center',
        marginTop: Pixel.getPixel(25),
        backgroundColor: 'white',
        width:Pixel.getPixel(90),
        height: Pixel.getPixel(95),
        marginRight: Pixel.getPixel(10),
        marginLeft: Pixel.getPixel(10),
    },
    carIconItemTitleText: {

        color: fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT),

    },
    carIconItemContentText: {

        color: fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        marginTop: Pixel.getPixel(5),
        marginBottom:Pixel.getPixel(5),

    },
    callView: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: fontAndColor.COLORB0,
        height: Pixel.getPixel(44),
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    callText: {
        color: 'white',
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT),
    },
    PhotonContaier:{

        left:0,
        right:0,
        top:0,
        bottom:0,
        backgroundColor:'rgba(1,1,1,0.8)',
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',

    },
    imageFootView:{

        height:Pixel.getPixel(50),
        right:Pixel.getPixel(15),
        bottom:0,
        left:Pixel.getPixel(15),
        position:'absolute',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',

    },

    carAgeView:{

        paddingHorizontal:Pixel.getPixel(10),
        paddingVertical:Pixel.getPixel(5),
        backgroundColor:'rgba(1,1,1,0.3)',
        borderRadius:3,

    },

    carAgeText:{

        color:'white',
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT),
        backgroundColor:'transparent'
    },

    imageIndexText:{

        color:'white',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        backgroundColor:'transparent'


    },
    sharedContaier:{

        flex:1,
        backgroundColor:'rgba(1,1,1,0.5)',

    },
    sharedView:{

        left:0,
        right:0,
        bottom:0,
        backgroundColor:fontAndColor.COLORA3,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',

    },

    sharedViewHead:{
        height:Pixel.getPixel(44),
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        width:ScreenWidth
    },
    sharedViewHeadText:{

        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    sharedItemView:{

        justifyContent:'center',
        alignItems:'center',
        marginLeft:Pixel.getPixel(20),
        marginRight:Pixel.getPixel(20),
        marginTop:Pixel.getPixel(10),
        marginBottom:Pixel.getPixel(10),
    },
    sharedText:{
        color:fontAndColor.COLORA1,
        textAlign:'center',
        marginTop:Pixel.getPixel(10),
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    }

})