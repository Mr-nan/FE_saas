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
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
let MovleData = require('./planinfo.json');
let movies = MovleData.retdata;
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import RepaymentInfoTopItem from './component/RepaymentInfoTopItem';
import RepaymentInfoDateItem from './component/RepaymentInfoDateItem';
import RepaymentInfoContentItem from './component/RepaymentInfoContentItem';
import RepaymentInfoBottomItem from './component/RepaymentInfoBottomItem';
import AllBottomItem from './component/AllBottomItem';
import MyButton from '../../component/MyButton';
let moneyList = [];
let nameList = [];
let dateList = [];
export  default class PurchaseLoanStatusScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        let mList = ['1', '2', '3', '4', '5'];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: ds.cloneWithRows(mList),
            renderPlaceholderOnly: 'blank'
        };
    }

    componentWillUnmount() {
        moneyList = [];
        nameList = [];
    }

    initFinish = () => {
        dateList.push({name: '付息区间', data: movies.interval});
        dateList.push({name: '最晚还款日', data: movies.date_str});

        moneyList.push({name: '贷款本金', data: movies.loan_mny_str});
        moneyList.push({name: '计息天数', data: movies.loan_day});
        moneyList.push({name: '综合费率', data: movies.loan_rebate_str});
        moneyList.push({name: '利息总额', data: movies.interest});

        nameList.push({name: '渠道名称', data: movies.qvdaoname});
        nameList.push({name: '还款账户', data: movies.bank_info.repaymentaccount});
        nameList.push({name: '开户行', data: movies.bank_info.bank});
        nameList.push({name: '开户支行', data: movies.bank_info.branch});
        nameList.push({name: '还款账号', data: movies.bank_info.repaymentnumber});
        nameList.push({name: '保证金', data: movies.bondmny});
        this.setState({renderPlaceholderOnly: 'success'});
    }


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <NavigationView
                    title="计划详情"
                    backIconClick={this.backPage}
                />
                <ListView
                    style={{marginTop: Pixel.getTitlePixel(64)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor:fontAndColor.COLORA3,alignItems: 'center'}}>
                <NavigationView
                    title="计划详情"
                    backIconClick={this.backPage}
                />
                {this.loadView()}
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        if (rowId == 0) {
            return (
                <RepaymentInfoTopItem />
            )
        } else if (rowId == 1) {
            return (
                <RepaymentInfoContentItem items={dateList}/>
            )
        } else if (rowId == 2) {
            return (
                <RepaymentInfoContentItem items={moneyList}/>
            )
        } else if (rowId == 3) {
            return (
                <RepaymentInfoContentItem items={nameList}/>
            )
        } else if (rowId == 4) {
            return (
                <RepaymentInfoBottomItem
                    allMoney={movies.repaymentmny_str}
                    formula={'='+movies.loan_mny+'*'+movies.loan_rebate/100+'/360*'
                                         +movies.loan_day+'-'+movies.bondmny}
                    formulaStr={'应还总额=本金*综合费率/360*计息天数-保证金'}
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