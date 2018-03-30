/**
 * Created by xujiaqi on 2018/3/20.
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
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
let movies = {};
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import RepaymentInfoTopItem from './component/RepaymentInfoTopItem';
import RepaymentInfoDateItem from './component/RepaymentInfoDateItem';
import RepaymentInfoContentItem from './component/RepaymentInfoContentItem';
import RepaymentInfoBottomItem from './component/RepaymentInfoBottomItem';
import AllBottomItem from './component/AllBottomItem';
import MyButton from '../../component/MyButton';
import ServerMoneyListModal from '../../component/ServerMoneyListModal';
import AccountModal from './component/AccountModal';
let moneyList = [];
let nameList = [];
let adjustLsit = [];
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import RepaymentModal from '../../component/RepaymentModal';
export  default class CancelRepayment extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        let mList = ['1', '2', '3', '4', '5', '6','7'];
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let date = new Date();
        let seperator1 = "/";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        this.state = {
            source: ds.cloneWithRows(mList),
            renderPlaceholderOnly: 'blank',
            loan_day: '',
            loan_dayStr: currentdate
        };
    }

    componentWillUnmount() {
        moneyList = [];
        nameList = [];
        adjustLsit = [];
        this.timer && clearTimeout(this.timer);
    }

    initFinish = () => {
        this.getData();
    }

    allRefresh = () => {
        moneyList = [];
        nameList = [];
        adjustLsit = [];
        this.setState({renderPlaceholderOnly: 'loading'});
        this.getData();
    }

    getData = () => {
        let maps;
        if(this.props.from === 'ChedidaiRepaymentPage'){
             maps = {
                api: Urls.CARLOAN_LOAN_INFO,
                loan_id: this.props.loan_id,
                type: '2',
                loan_number: this.props.loan_number,
                loan_code:this.props.payment_number,
            };
        }else{
             maps = {
                api: Urls.PREPAYMENT_REPAYMENT_DETAIL,
                loan_id: this.props.loan_id,
                type: '2',
                loan_number: this.props.loan_number,
                loan_code:this.props.payment_number,
            };
        }

        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    movies = response.mjson.data.payment_info;
                    moneyList.push({name: '计息天数', data: movies.days+'天'});
                    moneyList.push({name: '综合费率', data: movies.payment_rate_str});
                    moneyList.push({name:'还息费率',data:movies.rate+'%'});
                    moneyList.push({name: '利息总额', data: movies.totalInterest});
                    moneyList.push({name: '已还利息', data: movies.ready_interest});
                    moneyList.push({name: '服务费', data: movies.all_fee});
                    moneyList.push({name: '保证金', data: movies.true_bondmny});
                    nameList.push({name: '渠道名称', data: movies.trench_name});
                    nameList.push({name: '还款账户', data: movies.payment_bankusername});
                    nameList.push({name: '开户行', data: movies.payment_bankname});
                    nameList.push({name: '开户支行', data: movies.payment_branch});
                    nameList.push({name: '还款账号', data: movies.payment_bankaccount});


                    adjustLsit.push({name: '使用优惠券数量', data: movies.coupon_number});
                    adjustLsit.push({name: '使用优惠券金额', data: movies.coupon_usable});
                    adjustLsit.push({name: '优惠券还息金额', data: movies.coupon_repayment});
                    this.setState({renderPlaceholderOnly: 'success', loan_day: movies.days});
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    buttonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: styles.parentStyle,
        childStyle: styles.childStyle,
        opacity: 0.7,
        content: '取消提前还款',
        mOnPress: () => {
            this.refs.accountmodal.changeShowType(true,
                '确认取消提前还款申请?',
                '确定', '取消', () => {
                    this.confirm();
                });

        }
    }
    confirm=()=>{
        this.props.showModal(true);
        let maps = {
            api: Urls.PREPAYMENT_CANCEL_REPAYMENT,
            /*loan_id: this.props.loan_id,
            type: '2',*/
            loan_number: this.props.loan_number,
            payment_number:this.props.payment_number,
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                console.log(response+'----')
                if(response.mjson.code=='1'){
                    this.props.showToast(response.mjson.msg);
                    this.timer = setTimeout(
                        () => {
                            this.backPage();
                            this.props.refreshListPage();
                        },
                        1000
                    );
                }
            },(error)=>{
                this.props.showToast(error.mjson.msg);
                this.timer = setTimeout(
                    () => {
                        this.backPage();
                        this.props.refreshListPage();
                },
                    1000
                );

            });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <NavigationView
                    title="还款详情"
                    backIconClick={this.backPage}
                />
                <ListView
                    removeClippedSubviews={false}
                    style={{marginTop: Pixel.getTitlePixel(64)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    showsVerticalScrollIndicator={false}
                />
                <AccountModal ref="accountmodal"/>
                <MyButton {...this.buttonParams}/>
                <ServerMoneyListModal ref="servermoneylistmodal"/>
                <RepaymentModal ref="repaymentmodal" callBack={()=>{
                    this.allRefresh();
                }}/>
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor:fontAndColor.COLORA3,alignItems: 'center'}}>
                {this.loadView()}
                <NavigationView
                    title="还款详情"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        if (rowId == 0) {
            return (
                <RepaymentInfoTopItem items={movies}  from={this.props.from} loan_number={this.props.loan_number}/>
            )
        } else if (rowId == 1) {
            return (
                <RepaymentInfoDateItem loanday={movies.days} time={movies.repayment_time}
                                      /* status={movies.test_coupon_info.paymen_status}*/
                                       callBack={(time)=>{
                    let selecttime = time/1000;
                    let lasttime = parseFloat(Date.parse(movies.list[0].dead_line)/1000);
                    let firsttime = parseFloat(movies.loan_time);
                    if(selecttime>=lasttime){
                        selecttime = lasttime-(60*60*24)
                    }else{
                        if(selecttime-firsttime<(10*60*60*24)){
                            selecttime = firsttime+(10*60*60*24);
                        }
                    }
                    let date = new Date(selecttime*1000);
                    let seperator1 = "/";
                    let month = date.getMonth() + 1;
                    let strDate = date.getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
                    let newList = ['1', '2', '3', '4', '5', '6','7'];
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        source: ds.cloneWithRows(newList),
                        loan_day:Math.ceil((selecttime-parseFloat(movies.loan_time))/60/60/24),
                        loan_dayStr:currentdate
                    });
                }}/>
            )
        } else if (rowId == 2) {
            return (
                <RepaymentInfoContentItem items={moneyList} onPress={()=>{
                    this.refs.servermoneylistmodal.changeShowType(true,movies.list_fee);
                }}/>
            )
        }else if (rowId == 3) {
            return (
                <RepaymentInfoContentItem items={adjustLsit}/>
            )
        } else if (rowId == 4) {
            return (
                <RepaymentInfoContentItem items={nameList}/>
            )
        } else if (rowId == 5) {
            let name = '';
            let money = movies.total_repayment_money;
            let formula = '';
            if(parseFloat(movies.all_fee)>0){
                // money = (parseFloat(movies.money)
                // +parseFloat(movies.money)*parseFloat(movies.rate)/100/360*
                // this.state.loan_day-parseFloat(movies.money)-parseFloat(movies.test_coupon_info.interest)
                // +parseFloat(movies.test_coupon_info.all_fee)).toFixed(2);
                name = '应还总额=本金+本金*还息费率/利息转换天数*计息天数-已还利息+服务费-保证金-优惠券还息金额';
                formula = '='+movies.money+'+'
                    +movies.money+'*'+(movies.rate/100).toFixed(4)+'/'+movies.changeDays+'*'
                    +this.state.loan_day+'-'+movies.ready_interest+'+'+movies.all_fee
                    +'-'+Math.abs(parseFloat(movies.true_bondmny))+'-'
                    +movies.coupon_repayment;
            }else{
                name = '应还总额=本金+本金*还息费率/利息转换天数*计息天数-已还利息-保证金-优惠券还息金额';
                formula = '='+movies.money+'+'
                    +movies.money+'*'+(movies.rate/100).toFixed(4)+'/'+movies.changeDays+'*'
                    +this.state.loan_day+'-'+movies.ready_interest+'-'+Math.abs(parseFloat(movies.true_bondmny))+'-'
                    +movies.coupon_repayment;
            }
            return (
                <RepaymentInfoBottomItem ref="RepaymentInfoBottomItem"
                                         allMoney={money}
                                         formula={formula}
                                         formulaStr={name}
                />
            )
        } else {
            return (
                <AllBottomItem

                />);
        }

    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        height: Pixel.getPixel(10),
        backgroundColor: fontAndColor.COLORA3

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'},
    parentStyle: {
        height: Pixel.getPixel(44),
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: fontAndColor.COLORB0,
    },
    childStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        color: '#ffffff',
    }
})