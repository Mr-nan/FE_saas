/**
 * Created by yujinzhong on 2017/2/8.
 */

import  React, {Component, PropTypes} from  'react'
import  {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    InteractionManager,
    TouchableOpacity,
    RefreshControl
} from  'react-native'

let mnyData = {};
let movies = [];
let page = 1;
let allPage = 0;
import  HomeHeaderItem from './component/HomeHeaderItem';
import  PixelUtil from '../utils/PixelUtil'
import KurongDetaileScene from '../finance/lend/KurongDetaileScene';
import CGDDetailSence from '../finance/lend/CGDDetailSence';
import SingDetaileSence from '../finance/lend/SingDetaileSence';
var Pixel = new PixelUtil();
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
import LendMoneySence from '../finance/lend/LendMoneyScene';

import MyButton from '../component/MyButton';
import RepaymentScene from '../finance/repayment/RepaymentScene';
import BaseComponet from '../component/BaseComponent';
import {request} from '../utils/RequestUtil';
import  LoadMoreFooter from '../component/LoadMoreFooter';
import * as Urls from '../constant/appUrls';
import * as fontAndColor from '../constant/fontAndColor';
import SelectCompanyScene from '../finance/SelectCompanyScene';
import AginSelectCompanyScene from '../finance/AginSelectCompanyScene';
import {LendSuccessAlert} from '../finance/lend/component/ModelComponent'
let loanList = [];

export class HomeHeaderItemInfo {
    constructor(ref, key, functionTitle, describeTitle, functionImage) {

        this.ref = ref;
        this.key = key;
        this.functionTitle = functionTitle;
        this.describeTitle = describeTitle;
        this.functionImage = functionImage;
    }

}

const bossFuncArray = [
    new HomeHeaderItemInfo('jiekuan', 'page1', '借款', '一步快速搞定', require('../../images/financeImages/borrowicon.png')),
    new HomeHeaderItemInfo('huankuan', 'page2', '还款', '智能自动提醒', require('../../images/financeImages/repaymenticon.png')),
];


export default class FinanceSence extends BaseComponet {

    initFinish = () => {

        this.getData();
    }

    getData = () => {
        loanList = [];
        let maps = {
            api: Urls.LOAN_SUBJECT
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    loanList = response.mjson.data;
                    if (loanList.length > 1) {
                        this.setState({renderPlaceholderOnly: 'select'});
                    } else {
                        if (loanList[0].is_done_credit == 0) {
                            this.setState({renderPlaceholderOnly: 'select'});
                        } else {
                            this.setState({
                                customerName: loanList[0].companyname
                            });
                            this.setLoan();
                        }
                    }
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    setLoan = () => {
        let maps = {
            api: Urls.OPT_LOAN_SUBJECT,
            opt_merge_id: loanList[0].merge_id,
            opt_user_id: loanList[0].user_id,
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {

                    this.getMnyData();
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    getMnyData = () => {
        let that = this;
        let maps = {
            api: Urls.GET_MNY
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    mnyData = response.mjson.data;
                    console.log(mnyData.credit_maxloanmny);
                    that.setState({
                        allData: {
                            keyongedu: mnyData.credit_maxloanmny / 10000,
                            daikuanyue: mnyData.loan_balance_mny / 10000,
                            baozhengjinedu: mnyData.bond_total_mny / 10000,
                            baozhengjinyue: mnyData.bond_mny / 10000,
                        }
                    });
                    that.getApplyData();
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    toEnd = () => {
        if (this.state.isRefreshing) {

        } else {
            if (page < allPage) {
                page++;
                this.getApplyData();
            }
        }

    };

    getApplyData = () => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let maps = {
            api: Urls.GET_APPLY_LIST,
            p: page
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    movies.push(...response.mjson.data.list);
                    allPage = response.mjson.data.page;
                    this.setState({renderPlaceholderOnly: 'success', source: ds.cloneWithRows(movies)});
                    this.setState({isRefreshing: false});
                },
                (error) => {
                    if (error.mycode == '-2100045') {
                        this.setState({
                            isRefreshing: false,
                            renderPlaceholderOnly: 'success',
                            source: ds.cloneWithRows(['1'])
                        });

                    } else {
                        this.setState({renderPlaceholderOnly: 'error'});
                    }
                });
    }

    allRefresh = () => {
        movies = [];
        this.setState({renderPlaceholderOnly: 'loading'});
        page = 1;
        this.getMnyData();
    }

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            source: [],
            allData: {
                keyongedu: mnyData.credit_maxloanmny / 10000,
                daikuanyue: mnyData.loan_balance_mny / 10000,
                baozhengjinedu: mnyData.bond_total_mny / 10000,
                baozhengjinyue: mnyData.bond_mny / 10000,
            },
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            customerName: ''
        };
    }

    refreshingData = () => {
        movies = [];
        this.setState({isRefreshing: true});
        page = 1;
        this.getMnyData();
    };

    render() {
        if (this.state.renderPlaceholderOnly === 'select') {
            return (<SelectCompanyScene showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} loanList={loanList} callBack={(companyname)=>{this.setState({
                customerName:companyname
            });
                            this.allRefresh();
                            }}/>);
        }
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={cellSheet.container}>
                <ListView
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderHeader={this._renderHeader}
                    renderFooter={
                                    this.renderListFooter
                                }
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
                <LendSuccessAlert title="提示" subtitle="采购融资功能正在维护中，请您移步BMS系统申请采购融资" ref='cgdModal'
                                  confimClick={()=>{}}/>
            </View>
        )
    }

    renderListFooter = () => {
        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<LoadMoreFooter isLoadAll={page>=allPage?true:false}/>)
        }
    }

    buttonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: cellSheet.parentStyle,
        childStyle: cellSheet.childStyle,
        opacity: 1,
    }

    typeButtonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: cellSheet.typeParentStyle,
        childStyle: cellSheet.typeChildStyle,
        opacity: 1,
    }

    _renderRow = (movie) => {
        let nextPage = {};
        if (movie == '1') {
            return (<View/>);
        } else {
            if (movie.type == 1) {
                nextPage = KurongDetaileScene;
                this.buttonParams.content = '库容';
                this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB4}];
                this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB4}];
            }
            else if (movie.type == 2) {
                nextPage = SingDetaileSence;
                this.buttonParams.content = '单车';
                this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB0}];
                this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB0}];
            } else if (movie.type == 3) {
                nextPage = KurongDetaileScene;
                this.buttonParams.content = '信贷';
                this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB1}];
                this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB1}];
            } else if (movie.type == 4) {
                nextPage = KurongDetaileScene;
                this.buttonParams.content = '库融';
                this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB4}];
                this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB4}];
            } else {
                if (movie.product_type_change_status == 0) {
                    nextPage = CGDDetailSence;
                    this.buttonParams.content = '采购';
                    this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB1}];
                    this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB1}];
                } else if (movie.product_type_change_status == 1) {
                    nextPage = SingDetaileSence;
                    this.buttonParams.content = '单车采购';
                    this.buttonParams.parentStyle = [cellSheet.parentStyle, {
                        borderColor: fontAndColor.COLORB1,
                        width: Pixel.getPixel(58)
                    }];
                    this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB1}];
                } else {
                    nextPage = SingDetaileSence;
                    this.buttonParams.content = '单车';
                    this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB0}];
                    this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB0}];
                }
            }

            if (movie.status == 1) {
                this.typeButtonParams.childStyle = [cellSheet.typeChildStyle, {color: fontAndColor.COLORB3}];
            } else if (movie.status == 7) {
                this.typeButtonParams.childStyle = [cellSheet.typeChildStyle, {color: fontAndColor.COLORB2}];
            } else if (movie.status == 6 || movie.status == 0 || movie.status == 5) {
                this.typeButtonParams.childStyle = [cellSheet.typeChildStyle, {color: fontAndColor.COLORA1}];
            } else {
                this.typeButtonParams.childStyle = [cellSheet.typeChildStyle, {color: fontAndColor.COLORB0}];
            }
            this.typeButtonParams.content = movie.status_str;
            return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    if(nextPage===CGDDetailSence){
                        this.refs.cgdModal.setModelVisible(true);
                    }else{
                        this.navigatorParams.name = 'DetaileSence';
                        this.navigatorParams.component = nextPage;
                        this.navigatorParams.params={
                        loanNumber:movie.loan_code,
                        backRefresh:()=>{
                            this.allRefresh()
                        }
                    }
                        this.props.callBack(this.navigatorParams);
                    }
            }} style={[cellSheet.row, cellSheet.padding]}>
                    <View style={cellSheet.rowViewStyle}>
                        <View style={[{
                        height: Pixel.getPixel(40),
                        justifyContent: 'flex-start', flex: 3, flexDirection: 'row',
                        alignItems: 'center'
                    }]}>
                            <MyButton {...this.buttonParams}/>
                            <Text numberOfLines={1} style={cellSheet.rowTopTextStyle}>{this.state.customerName}</Text>
                        </View>
                        <View style={[{
                        height: Pixel.getPixel(40),
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'flex-end'
                    }]}>
                            <Text style={cellSheet.rowTopGrayTextStyle}>{movie.loan_code}</Text>
                        </View>
                    </View>
                    <View style={{height: 0.5, backgroundColor: fontAndColor.COLORA4}}></View>
                    <View style={cellSheet.rowBottomViewStyle}>
                        <View style={[cellSheet.rowBottomChildStyle, {alignItems: 'flex-start'}]}>
                            <Text style={cellSheet.rowBottomLittleStyle}>借款金额</Text>
                            <Text
                                style={[cellSheet.rowBottomBigStyle, {color: fontAndColor.COLORB2}]}>{movie.loan_mny}</Text>
                        </View>
                        <View style={[cellSheet.rowBottomChildStyle, {alignItems: 'flex-start'}]}>
                            <Text style={cellSheet.rowBottomLittleStyle}>借款期限</Text>
                            <Text
                                style={[cellSheet.rowBottomBigStyle, {color: fontAndColor.COLORA0}]}>{movie.loan_life}</Text>
                        </View>
                        <View
                            style={[cellSheet.rowBottomChildStyle, {alignItems: 'flex-end', justifyContent: 'center'}]}>
                            <MyButton {...this.typeButtonParams}/>
                        </View>
                    </View>
                </TouchableOpacity>


            )
        }
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={cellSheet.Separator} key={sectionId + rowId}>
            </View>
        )
    }


    _renderPlaceholderView = () => {
        return (
            <View style={{flex:1,backgroundColor:fontAndColor.COLORA3,alignItems: 'center'}}>
                {this.loadView()}
            </View>
        );
    }

    navigatorParams = {
        name: 'LendMoneySence',
        component: LendMoneySence,
        params: {}
    }

    homeItemOnPress = (title) => {
        if (title === '借款') {
            this.navigatorParams.name = 'LendMoneySence';
            this.navigatorParams.component = LendMoneySence;
            this.navigatorParams.params = {
                credit_status: mnyData.credit_status,
                inventory_financing_status: mnyData.inventory_financing_status,
                purchase_archives_after_status: mnyData.purchase_archives_after_status,
                purchase_archives_first_status: mnyData.purchase_archives_first_status,
                purchase_status: mnyData.purchase_status,
                customerName: this.state.customerName,
                backRefresh: () => {
                    this.allRefresh()
                }
            }
            ;
            this.props.callBack(this.navigatorParams);
        } else {
            this.navigatorParams.name = "RepaymentScene";
            this.navigatorParams.component = RepaymentScene;
            this.navigatorParams.params = {
                customerName: this.state.customerName,

            };
            this.props.callBack(this.navigatorParams);
        }
    }


    _renderHeader = () => {
        let tablist;
        tablist = bossFuncArray;
        let items = [];
        tablist.map((data) => {
            let tabItem;

            tabItem = <HomeHeaderItem
                ref={data.ref}
                key={data.key}
                functionTitle={data.functionTitle}
                describeTitle={data.describeTitle}
                functionImage={data.functionImage}
                callBack={this.homeItemOnPress}
            />
            items.push(tabItem);
        });

        return (
            <View>
                <Image style={[cellSheet.titleStyle]}
                       source={require('../../images/financeImages/dinancebg.png')}>
                    <View style={{width:width,height:Pixel.getTitlePixel(105),flexDirection:'row'}}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:3,alignItems: 'center'}}>
                            <Text numberOfLines={1}
                                  style={{fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
                                color:'#fff',marginTop:Pixel.getTitlePixel(25),backgroundColor: '#00000000'}}>
                                金融 ({this.state.customerName})</Text>
                        </View>
                        <View style={{flex:1}}>
                            {loanList.length > 1 ? <TouchableOpacity onPress={()=>{
                            this.props.callBack({name:'AginSelectCompanyScene',
                            component:AginSelectCompanyScene,params:{loanList:loanList,callBack:(companyname)=>{this.setState({
                            customerName:companyname
                                });
                            this.allRefresh();
                            }}})}
                            } activeOpacity={0.8} style={{width:Pixel.getPixel(64),height:Pixel.getPixel(22),borderColor:'#fff',borderWidth:1,
                              borderRadius:3,justifyContent:'center',alignItems:'center',marginTop:Pixel.getTitlePixel(26)}}>
                                    <Text
                                        style={{fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),color: '#fff',backgroundColor: '#00000000'}}>切换公司</Text>
                                </TouchableOpacity> : <View/>}
                        </View>
                    </View>
                    <View
                        style={{width:width,height:Pixel.getBottomPixel(85),flexDirection:'row'}}>
                        <View style={{flex:1,alignItems: 'center'}}>
                            <Text
                                style={{fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),color: '#fff',backgroundColor: '#00000000'}}>可用额度(万)</Text>
                            <Text
                                style={{fontSize: Pixel.getFontPixel(32),color: '#fff',marginTop:Pixel.getPixel(7),fontWeight: 'bold',backgroundColor: '#00000000'}}>{this.state.allData.keyongedu}</Text>
                        </View>
                        <View style={{flex:1,alignItems: 'center'}}>
                            <Text
                                style={{fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),color: '#fff',backgroundColor: '#00000000'}}>贷款余额(万)</Text>
                            <Text
                                style={{fontSize: Pixel.getFontPixel(32),color: '#fff',marginTop:Pixel.getPixel(7),fontWeight: 'bold',backgroundColor: '#00000000'}}>{this.state.allData.daikuanyue}</Text>
                        </View>
                    </View>
                    <View
                        style={{width:width,height:Pixel.getPixel(40),backgroundColor: 'rgba(56,199,232,0.35)',
                        paddingRight:Pixel.getPixel(15),paddingLeft:Pixel.getPixel(15),flexDirection:'row'}}>
                        <View style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent:'flex-start'}}>
                            <Text
                                style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color: '#fff',backgroundColor: '#00000000'}}>保证金额度:</Text>
                            <Text
                                style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color: '#fff',backgroundColor: '#00000000',fontWeight: 'bold'}}>{this.state.allData.baozhengjinedu}万</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent:'flex-end'}}>
                            <Text
                                style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color: '#fff',backgroundColor: '#00000000'}}>保证金余额:</Text>
                            <Text
                                style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color: '#fff',backgroundColor: '#00000000',fontWeight: 'bold'}}>{this.state.allData.baozhengjinyue}万</Text>
                        </View>
                    </View>
                </Image>
                <View style={cellSheet.header}>
                    {items}
                </View>

            </View>

        )
    }
}


const cellSheet = StyleSheet.create({


    header: {
        flex: 1,

        backgroundColor: fontAndColor.COLORA3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: Pixel.getPixel(10),

    },

    headerTitle: {

        fontSize: 20,
    },

    container: {

        flex: 1,
        marginTop: 0,   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },

    row: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(111)
    },
    rightContainer: {

        marginLeft: 20,
        flex: 1,
        alignItems: 'flex-start',
    },
    rightContainerTop: {

        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },

    rightContainerBottom: {

        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

        flex: 1,
        fontSize: 15,
        textAlign: 'left',

    },
    year: {
        fontSize: 15,
        textAlign: 'center',
        marginRight: 20,
    },
    Separator: {

        backgroundColor: fontAndColor.COLORA4,
        height: 1,

    },
    titleStyle: {
        width: width,
        height: Pixel.getPixel(230)
    },
    titleViewStyle: {
        alignItems: 'center',
    },
    titleImageStyle: {
        position: 'absolute'
    },
    titleViewBottomStyle: {
        width: width,
        height: Pixel.getPixel(40),
        marginTop: Pixel.getPixel(25), flexDirection: 'row', alignItems: 'center'
    },
    titleViewBottomBGStyle: {
        backgroundColor: '#0970cf', width: width,
        height: Pixel.getPixel(40), opacity: 0.25, position: 'absolute'
    },
    titleViewBottomViewStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleViewTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: '#ffffff',
        backgroundColor: '#00000000'
    },
    titleOneTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: '#ffffff', marginTop: Pixel.getTitlePixel(71),
        backgroundColor: '#00000000'
    },
    titleTwoTextStyle: {
        fontSize: Pixel.getFontPixel(24),
        color: '#ffffff', marginTop: Pixel.getPixel(8), fontWeight: 'bold',
        backgroundColor: '#00000000'
    },
    titleThreeTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: '#ffffff', marginTop: Pixel.getPixel(21),
        backgroundColor: '#00000000'
    },
    titleFourTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.MARKFONT22), fontWeight: 'bold',
        color: '#ffffff', marginTop: Pixel.getPixel(6), backgroundColor: '#00000000'
    },
    parentStyle: {
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0,
        borderRadius: 3,
        height: Pixel.getPixel(16),
        width: Pixel.getPixel(34),
        justifyContent: 'center',
        alignItems: 'center'
    },
    childStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORB0,
    },
    typeParentStyle: {
        borderWidth: 1,
        borderColor: fontAndColor.COLORA4,
        borderRadius: 100,
        height: Pixel.getPixel(23),
        width: Pixel.getPixel(72),
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeChildStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB3,
    },
    padding: {
        paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
    },
    rowViewStyle: {
        height: Pixel.getPixel(40),
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowTopTextStyle: {
        marginLeft: Pixel.getPixel(7), fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA0
    },
    rowTopGrayTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT20),
        color: fontAndColor.COLORA1
    },
    rowBottomViewStyle: {
        height: Pixel.getPixel(71), flexDirection: 'row'
    },
    rowBottomChildStyle: {
        height: Pixel.getPixel(71),
        flex: 1,
    },
    rowBottomLittleStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1, marginTop: Pixel.getPixel(16)
    },
    rowBottomBigStyle: {
        fontSize: Pixel.getFontPixel(16),
        marginTop: Pixel.getPixel(6)
    },
});
