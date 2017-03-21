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
    RefreshControl
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
let movies = ['1', '2', '3'];
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import OldPlanScene from './OldPlanListScene';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import StorageUtil from '../../utils/StorageUtil';
import * as StorageKeyNames from "../../constant/storageKeyNames";
import * as fontAndClolr from '../../constant/fontAndColor';
import MyButton from '../../component/MyButton';

const bg = require('../../../images/financeImages/bottomyouhuijuan.png');
const duigou = require('../../../images/financeImages/bottomduigou.png');
let viewWidth = Pixel.getPixel(0);
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export  default class AdjustListScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: [],
            isRefreshing: false,
        };
        this.selected;
        this.adjustmoney = 0;
        this.coupon_id = -1;
        this.coupon_number = -1;
    }

    componentWillUnmount() {
        movies = ['1', '2', '3'];
    }


    initFinish = () => {
        this.getData();
    }

    allRefresh = () => {
        this.setState({renderPlaceholderOnly: 'loading'});
        this.getData();
    }

    getData = () => {
        StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (datas) => {
            if (datas.code == 1) {
                let data = JSON.parse(datas.result);
                let maps = {
                    api: Urls.REPAYMENT_GET_ADJUST_USE,
                    planid: this.props.items.planid,
                    user_id: data.base_user_id,
                };
                request(Urls.FINANCE, 'Post', maps)
                    .then((response) => {
                            movies = response.mjson.data;
                            this.setState({
                                source: ds.cloneWithRows(movies),
                                renderPlaceholderOnly: 'success',
                                isRefreshing: false
                            });
                        },
                        (error) => {
                            if (error.mycode == '-2100045' || error.mycode == '-1') {
                                this.setState({
                                    source: ds.cloneWithRows(movies),
                                    renderPlaceholderOnly: 'success',
                                    isRefreshing: false
                                });
                                // this.setState({renderPlaceholderOnly: 'null', isRefreshing: false});
                            } else {
                                this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                            }
                        });
            }
        });
    }

    refreshingData = () => {
        this.setState({isRefreshing: true});
        this.getData();
    };

    _renderHeader = () => {
        return (
            <View style={styles.listHeader}>
                <View style={styles.textAllStyle}>
                    <Text style={styles.headerTextStyle}>到期日</Text>
                    <Text style={styles.headerTextStyle}>调整前</Text>
                    <Text style={styles.headerTextStyle}>抵扣金额</Text>
                    <Text style={styles.headerTextStyle}>调整后</Text>
                </View>
                <View style={[styles.textAllStyle, {
                    backgroundColor: '#ffffff',
                    marginTop: Pixel.getPixel(5),
                    marginBottom: Pixel.getPixel(15),
                    paddingTop: Pixel.getPixel(10),
                    paddingBottom: Pixel.getPixel(10)
                }]}>
                    <Text style={styles.headerTextsStyle}>{this.props.items.dead_line}</Text>
                    <Text style={styles.headerTextsStyle}>{this.props.items.repaymentmny}</Text>
                    <Text style={styles.headerTextsStyle}>{this.adjustmoney}</Text>
                    <Text style={styles.headerTextsStyle}>{this.props.items.repaymentmny - this.adjustmoney}</Text>
                </View>
            </View>
        );
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1, alignItems: 'center'}}>
                <NavigationView
                    title="选择优惠券"
                    backIconClick={this.backPage}/>
                <ListView
                    style={{marginTop: Pixel.getTitlePixel(70), flex: 1}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderHeader={this._renderHeader}/>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'确定'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={this.submit}/>
            </View>
        );
    }

    // 使用优惠劵
    submit = () => {
        StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (datas) => {
            if (datas.code == 1) {
                let data = JSON.parse(datas.result);
                let maps = {
                    api: Urls.REPAYMENT_GET_ADJUST_SAVE,
                    plan_id: this.props.items.planid,
                    merge_id: data.base_user_id,
                    adjustmoney: this.adjustmoney,
                    coupon_id: this.coupon_id,
                    coupon_number: this.coupon_number,
                    key: '',
                };
                request(Urls.FINANCE, 'Post', maps)
                    .then((response) => {

                        },
                        (error) => {
                            if (error.mycode == '-2100045' || error.mycode == '-1') {

                            } else {

                            }
                        });
            }
        });
    }
    _selectCoupon = (rowId, itemData) => {
        this.selected = rowId;
        this.adjustmoney = rowId;
        this.setState({
            source: ds.cloneWithRows(['1', '2', '3']),
        });
    };

    _renderRow = (itemData, sectionId, rowId) => {
        return (
            <TouchableOpacity onPress={() => this._selectCoupon(rowId, itemData)}>
                <Image style={styles.container} source={bg}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.leftTitle}>还息优惠券</Text>
                        <Text style={styles.leftBottom}>有效期:2016.12.20-2017.02.20</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={styles.rightTitleContainer}>
                            <Text style={[styles.rightTitle, styles.rightTitleAlign]}>¥</Text>
                            <Text style={styles.rightTitle}>25</Text>
                        </View>
                        <TouchableOpacity style={styles.rightBottom} onPress={() => {
                        }}>
                            <View>
                                <Text style={styles.rightBottomText}>使用规则</Text>
                            </View>
                        </TouchableOpacity>
                        {this.selected == rowId ? <Image style={styles.imgContainer} source={duigou}/> : null}
                    </View>
                </Image>
            </TouchableOpacity>
        )
    }

    _renderSeparator(sectionId, rowId) {
        return (
            <View style={styles.Separator} key={sectionId + rowId}/>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height, backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="选择优惠券"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    navigatorParams = {
        name: 'OldPlanScene',
        component: OldPlanScene,
        params: {}
    }

    _navigatorRightView = () => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                this.toNextPage(this.navigatorParams)
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                }}>历史还款</Text>
            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({
    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),
    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)
    },
    topViewStyle: {
        flex: 1,
        height: Pixel.getPixel(44),
        justifyContent: 'center'
    },
    container: {
        width: width - Pixel.getPixel(30),
        flexDirection: 'row',
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(15)
    },
    leftContainer: {
        width: Pixel.getPixel(230),
        justifyContent: 'center',
        paddingLeft: Pixel.getPixel(20),
    },
    leftTitle: {
        fontSize: Pixel.getFontPixel(15),
        color: '#000000'
    },
    leftBottom: {
        marginTop: Pixel.getPixel(5),
        fontSize: Pixel.getFontPixel(12),
        color: '#9e9e9e'
    },
    rightContainer: {
        width: Pixel.getPixel(120),
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightTitleContainer: {
        flexDirection: 'row'
    },
    rightTitle: {
        fontSize: Pixel.getFontPixel(26),
        color: '#05c5c2'
    },
    rightTitleAlign: {
        marginRight: Pixel.getPixel(3)
    },
    rightBottom: {
        width: Pixel.getPixel(80),
        height: Pixel.getPixel(30),
        borderColor: '#9e9e9e',
        borderWidth: Pixel.getPixel(1),
        borderRadius: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightBottomText: {
        fontSize: Pixel.getFontPixel(14),
        color: '#9e9e9e'
    },
    imgContainer: {
        height: Pixel.getPixel(33),
        width: Pixel.getPixel(33),
        position: 'absolute',
        bottom: Pixel.getFontPixel(3),
        right: Pixel.getFontPixel(3),
    },
    listHeader: {
        width: width,
        backgroundColor: fontAndClolr.COLORA3,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textAllStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTextStyle: {
        width: (width - viewWidth) / 4.0,
        textAlign: 'center',
        fontSize: Pixel.getFontPixel(fontAndClolr.CONTENTFONT24),
        color: fontAndClolr.COLORA1
    },
    headerTextsStyle: {
        width: (width - viewWidth) / 4.0,
        color: '#000000',
        textAlign: 'center',
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT)
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: fontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
    },
    loginButtonTextStyle: {
        color: fontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT)
    },
})