/**
 * Created by lhc on 2017/2/15.
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
    InteractionManager,
    Platform,
    StatusBar

} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
const childItems = [];
import {request} from '../utils/RequestUtil';
import * as Urls from '../constant/appUrls';
import BaseComponent from '../component/BaseComponent';
import MainPage from './MainPage';
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import {observable} from 'mobx';
import {observer} from 'mobx-react';
const IS_ANDROID = Platform.OS === 'android';


export  default class AllSelectCompanyScene extends BaseComponent {


    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 == r2});

        this.state = {
            renderPlaceholderOnly: 'blank',
            source: ds.cloneWithRows([]),
            barStyle:'dark-content',
            currentBaseID:this.props.currentBaseID,
        };

    }

    initFinish = () => {
        this.getData();
        // this.setPushData();
    }

    allRefresh = () => {
        this.setState({
            renderPlaceholderOnly:'loading'
        });
        this.getData();
    }

    getData = () => {


        StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (userData) => {
            if(userData.code ==1 && userData.result != null){

                this.userData = JSON.parse(userData.result);
                let maps = {
                    api: Urls.LOAN_SUBJECT
                };
                request(Urls.FINANCE, 'Post', maps)
                    .then((response) => {

                            this.data  = response.mjson.data;
                            if(this.data==null||this.data.length<=0){
                                this.setState({
                                    renderPlaceholderOnly: 'null',
                                });
                            }
                            else if(this.data.length==1){
                                this.setLoanOne(this.data[0]);
                            }
                            else{
                                this.setState({
                                    renderPlaceholderOnly: 'success',
                                    source: this.state.source.cloneWithRows(this.data)
                                });
                            }

                        },
                        (error) => {
                            this.setState({renderPlaceholderOnly: 'error'});
                        });

            }else {

                this.props.showToast('获取用户信息失败');
                this.setState({renderPlaceholderOnly: 'error'});
            }

        });


    }

    // 上传推送deviceToken
    setPushData =()=>{
        request(Urls.PUSH_BINDING, 'Post', {
            deviceToken:global.pushDeviceToken,
            deviceType:IS_ANDROID?2:1
        })
            .then((response) => {

                },
                (error) => {
                });
    }

    componentWillMount() {

        this.setState({
            barStyle:'dark-content',

        })
    }

    componentWillUnMount() {

        this.setState({
            barStyle:'light-content',

        })
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1,paddingTop:Pixel.getTitlePixel(64)}}>
                <StatusBar barStyle={this.state.barStyle}/>
                <ListView
                    removeClippedSubviews={false}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    showsVerticalScrollIndicator={false}
                />
                <NavigationView title="选择公司" titleStyle={{color:fontAndColor.COLORA0}}  wrapStyle = {{backgroundColor:'white'}}/>
            </View>
        );
    }

    setLoanOne = (movie) => {

        global.companyBaseID = movie.company_base_id;
        global.ISCOMPANY = movie.iscompany;
	    global.MERGE_ID = movie.merge_id;
        request(Urls.USER_GET_SELECT_ENTERPRISE_INFO, 'Post', {
            enterprise_id:movie.company_base_id
        })
            .then((response) => {
                    if (movie.is_done_credit == '1') {
                        let maps = {
                            api: Urls.OPT_LOAN_SUBJECT,
                            opt_merge_id: movie.merge_id,
                            opt_user_id: movie.user_id,
                        };
                        request(Urls.FINANCE, 'Post', maps)
                            .then((response) => {
                                    StorageUtil.mSetItem(StorageKeyNames.LOAN_SUBJECT, JSON.stringify(movie) + "");
                                    this.loginPage({name:'MainPage',component:MainPage,params:{}});
                                },
                                (error) => {
                                    // if (error.mycode == -300 || error.mycode == -500) {
                                    //     this.props.showToast('网络连接失败');
                                    // } else {
                                    //     this.props.showToast(error.mjson.msg);
                                    // }
                                    this.setState({renderPlaceholderOnly: 'error'});
                                });
                    } else {
                        let maps = {

                        };
                        request(Urls.CONTRACT_APPLYPLSEAL, 'Post', maps)
                            .then((response) => {
                                    StorageUtil.mSetItem(StorageKeyNames.LOAN_SUBJECT, JSON.stringify(movie) + "");
                                    this.loginPage({name:'MainPage',component:MainPage,params:{}});
                                },
                                (error) => {
                                    this.setState({renderPlaceholderOnly: 'error'});
                                    // if (error.mycode == -300 || error.mycode == -500) {
                                    //     this.props.showToast('网络连接失败');
                                    // } else {
                                    //     this.props.showToast(error.mjson.msg);
                                    // }
                                });
                    }
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                    // if (error.mycode == -300 || error.mycode == -500) {
                    //     this.props.showToast('网络连接失败');
                    // } else {
                    //     this.props.showToast(error.mjson.msg);
                    // }
                });


    }

    setLoan = (movie) => {

        this.setState({
            source: this.state.source.cloneWithRows(this.data),
            currentBaseID:movie.company_base_id
        });

        global.companyBaseID = movie.company_base_id;
        global.ISCOMPANY = movie.iscompany;
	    global.MERGE_ID = movie.merge_id;
	    this.props.showModal(true);
        request(Urls.USER_GET_SELECT_ENTERPRISE_INFO, 'Post', {
            enterprise_id:movie.company_base_id
        })
            .then((response) => {
                    if (movie.is_done_credit == '1') {
                        let maps = {
                            api: Urls.OPT_LOAN_SUBJECT,
                            opt_merge_id: movie.merge_id,
                            opt_user_id: movie.user_id,
                        };
                        request(Urls.FINANCE, 'Post', maps)
                            .then((response) => {
                                    this.props.showModal(false);
                                    StorageUtil.mSetItem(StorageKeyNames.LOAN_SUBJECT, JSON.stringify(movie) + "");
                                    this.loginPage({name:'MainPage',component:MainPage,params:{}});
                                },
                                (error) => {
                                    if (error.mycode == -300 || error.mycode == -500) {
                                        this.props.showToast('网络连接失败');
                                    } else {
                                        this.props.showToast(error.mjson.msg);
                                    }
                                });
                    } else {
                        this.props.showModal(true);
                        let maps = {

                        };
                        request(Urls.CONTRACT_APPLYPLSEAL, 'Post', maps)
                            .then((response) => {
                                    this.props.showModal(false);
                                    StorageUtil.mSetItem(StorageKeyNames.LOAN_SUBJECT, JSON.stringify(movie) + "");
                                    this.loginPage({name:'MainPage',component:MainPage,params:{}});
                                },
                                (error) => {
                                    if (error.mycode == -300 || error.mycode == -500) {
                                        this.props.showToast('网络连接失败');
                                    } else {
                                        this.props.showToast(error.mjson.msg);
                                    }
                                });
                    }
                },
                (error) => {
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast('网络连接失败');
                    } else {
                        this.props.showToast(error.mjson.msg);
                    }
                });


    }

    loginPage = (mProps) => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.immediatelyResetRouteStack([{
                ...mProps
            }])
        }
    }

    _renderRow = (movie, sectionId, rowId) => {

        return (
            <CertificateItem movie={movie} click={()=>{ this.setLoan(movie);}} userData ={this.userData} currentBaseID={this.state.currentBaseID}/>
        )
    }

    _renderSeparator(sectionId, rowId) {
        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="选择公司"
                />
            </View>
        );
    }


}

class CertificateItem extends Component{



    render(){

        let movie = this.props.movie;
        let image = require('../../images/mine/qiye-da.png');
        let title = movie.is_done_credit == '1'?movie.companyname:movie.name;
        if(movie.iscompany>0){
            title = `${this.props.userData.boss_name}(${movie.name})`
        }
        let content = '实际控制人：'+ this.props.userData.boss_name;
        let isPersonage = 0;
        if(movie.role_type instanceof Array){
            for(let item of movie.role_type){
                if(item == 19){
                    isPersonage = 1;
                    image = require('../../images/mine/geren-da.png');
                    title =this.props.userData.real_name;
                    if(this.props.userData.idcard_number){
                        content = this.props.userData.idcard_number.substring(0,6)+'********'+this.props.userData.idcard_number.substring(14,this.props.userData.idcard_number.length);
                    }else {
                        content='';
                    }
                    break;
                }
            }
        }

        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                this.props.click();

            }} style={{width:width, alignItems:'center'}}>
                <View style={[styles.itme,{alignItems:'flex-start',flexDirection:'column'}]}>
                    <View style={{marginLeft:Pixel.getPixel(28), flexDirection:'row',alignItems:'center'}}>
                        <Image style={{width:Pixel.getPixel(17),height:Pixel.getPixel(17),marginRight:Pixel.getPixel(6)}} source={image}/>
                        <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),width:width-Pixel.getPixel(98)}} numberOfLines={1}>{title}</Text>
                    </View>
                    <Text style={{color:'#999999', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),marginTop:Pixel.getPixel(15),marginLeft:Pixel.getPixel(28),width:width-Pixel.getPixel(108)}} numberOfLines={1} >{content}</Text>
                    {
                        isPersonage ==0 && (
                            <View>
                                {
                                    movie.is_done_credit == '1' ?(
                                            <Image style={{alignItems:'center',marginTop:Pixel.getPixel(13),justifyContent:'center',width:Pixel.getPixel(117),height:Pixel.getPixel(16.5),marginLeft:Pixel.getPixel(28)}} source={require('../../images/login/edu.png')}>
                                                <Text style={{fontSize:fontAndColor.CONTENTFONT24,color:'white',backgroundColor:'transparent'}}>{'授信额度' + movie.credit_mny / 10000 + '万'}</Text>
                                            </Image>
                                        ):(
                                            <View style={{height:Pixel.getPixel(16),marginTop:Pixel.getPixel(11),
                                                borderRadius:Pixel.getPixel(8),backgroundColor:fontAndColor.COLORC1,justifyContent:'center',width:Pixel.getPixel(75),
                                                alignItems:'center',marginLeft:Pixel.getPixel(28)
                                            }}>
                                                <Text style={{fontSize:fontAndColor.MARKFONT22,color:fontAndColor.COLORC2}}>未完成授信</Text>
                                            </View>
                                        )
                                }
                            </View>
                        )
                    }
                    <View style={{
                        height:Pixel.getPixel(30),
                        alignItems:'center',
                        justifyContent:'center',
                        top: Pixel.getPixel(34),
                        right:Pixel.getPixel(15),
                        position: 'absolute',
                        width:Pixel.getPixel(30),
                    }}>
                        <Image style={{width: Pixel.getPixel(29), height: Pixel.getPixel(29)}}
                               source={this.props.currentBaseID== movie.company_base_id? require('../../images/mine/xuanzhong.png'):require('../../images/mine/weixuanzhong.png')}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(1),
    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'},
    itme:{
        height:Pixel.getPixel(108),
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        width:width-Pixel.getPixel(30),
        borderRadius:Pixel.getPixel(5),
        marginTop:Pixel.getPixel(16),
        flexDirection:'row',
        shadowColor:'#e8eaf4',
        shadowOffset:{width:0,height:Pixel.getPixel(5)},
        shadowOpacity:0.3,
        shadowRadius:2,
    }
})