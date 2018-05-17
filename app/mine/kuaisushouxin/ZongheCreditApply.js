import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
let {height, width} = Dimensions.get('window');
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import *as fontAndColor from '../../constant/fontAndColor';
import *as appUrls from '../../constant/appUrls';
import *as RequestUtil from '../../utils/RequestUtil';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
const data = [
    {
        title: '2016-06-20|5532公里',
        type: '正常维修',
        content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
    },
];

export  default class ZongheCreditApply extends BaseComponent {
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {

            dataSource: ds,
            renderPlaceholderOnly: 'blank',
        }
    }

    /**
     * from @yujinzhong
     *
     * 初始化页面数据
     **/
    initFinish = () => {
        this.loadJieKuanRenData();
    }

    render() {

        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    {this.loadView()}
                    <NavigationView title="综合授信申请" backIconClick={() => {
                        this.backPage();
                    }}/>
                </View>);
        }
        return (
            <View style={styles.rootContainer}>
                <ListView
                    removeClippedSubviews={false}
                    dataSource={this.state.dataSource}
                    renderHeader={() =>
                        <View style={styles.headView}>
                            <Text allowFontScaling={false} style={styles.headViewText}>借款人
                            </Text>
                        </View>
                    }
                    renderRow={this.renderRow}/>
                <NavigationView title="综合授信申请" backIconClick={() => {
                    this.backPage();
                }}/>
                <View style={{
                    height: Pixel.getPixel(54),
                    width: width,
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.backPage();
                            }}
                            style={[styles.selectBtn,{marginRight:Pixel.getPixel(15)}]}
                            activeOpacity={0.6}>
                            <Text allowFontScaling={false}
                                  style={{fontSize: Pixel.getFontPixel(14), color: fontAndColor.COLORB0,}}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectBtn, {backgroundColor: fontAndColor.COLORB0}]}
                            activeOpacity={0.6}
                            onPress={() => {
                                this._applyZongHeCredit();
                            }}>
                            <Text allowFontScaling={false}
                                  style={{fontSize: Pixel.getFontPixel(14), color: 'white'}}>提交</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _applyZongHeCredit = () => {

        RequestUtil.request(appUrls.GETMULTIPLECREDITPHONE, 'post', {'base_id': global.companyBaseID})
            .then((response) => {
                 this.props.showToast("综合授信申请提交成功");
                    if (this.props.callBackRefresh) {
                        this.props.callBackRefresh();
                    }
                    this.timer = setTimeout(
                        () => {
                            if(this.props.FromScene == 'mineZongApply'){
                                this.backToTop();
                            }else {
	                            this.backPage();
                            }
                        },
                        200
                    );


            }, (error) => {


                if (error.mycode == -300 || error.mycode == -500) {
                    this.props.showToast('系统异常');
                } else {
                    this.props.showToast(error.mjson.msg);
                }
            });
    }
    /**
     * from @zhaojian
     *
     * 每条item布局
     **/
    renderRow = (rowData) => {
        return (
            <View style={styles.cellView}>
                <View style={styles.cellTitleView}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text allowFontScaling={false}
                              style={[styles.cellTitleViewTitle, {
                                  fontSize: Pixel.getFontPixel(15),
                                  color: 'black'
                              }]}>{rowData.real_name}

                        </Text >
                        <Text allowFontScaling={false}
                              style={[styles.cellTitleViewValue, {marginLeft: Pixel.getPixel(10)}]}>
                            实际控制人
                        </Text>
                    </View>

                </View>
                <Text allowFontScaling={false}
                      style={[styles.cellContent, {color: fontAndColor.COLORA1}]}>{rowData.enterprise_name}</Text>
            </View>
        )
    }

    /**
     * from @yujinzhong
     *
     * 获取借款人数据
     **/
    loadJieKuanRenData = () => {


        RequestUtil.request(appUrls.GETENTERPRISEBYEUID, 'post', {'enterprise_user_id': global.companyBaseID})
            .then((response) => {

                if (response) {
                    let dataSource = [];
                    dataSource.push(response.mjson.data)
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(dataSource),
                        renderPlaceholderOnly: 'success',

                    });

                } else {
                    this.setState({
                        renderPlaceholderOnly: 'null',
                    });
                }

            }, (error) => {
                this.setState({
                    renderPlaceholderOnly: 'null',
                });
            });
    }

}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingTop: Pixel.getTitlePixel(64),
        paddingBottom: Pixel.getTitlePixel(54),
        backgroundColor: fontAndColor.COLORA3,
    },
    headView: {
        paddingHorizontal: Pixel.getPixel(15),
        paddingVertical: Pixel.getPixel(10),
        backgroundColor: fontAndColor.COLORA3,
    },
    headViewText: {
        color: fontAndColor.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    cellView: {
        paddingHorizontal: Pixel.getPixel(15),
        borderBottomColor: fontAndColor.COLORA4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: Pixel.getPixel(10),
        backgroundColor: 'white',
        flexWrap: 'wrap',

    },
    cellTitleView: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAndColor.COLORA4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Pixel.getPixel(10),

    },
    cellTitleViewTitle: {
        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },
    cellTitleViewValue: {
        color: fontAndColor.COLORB0,
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },
    cellContent: {
        marginTop: Pixel.getPixel(10),
        marginBottom: Pixel.getPixel(10),
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        backgroundColor: 'white'
    },
    selectBtn: {
        height: Pixel.getPixel(36),
        width: Pixel.getPixel(142),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getFontPixel(2),
        borderColor: fontAndColor.COLORB0,
        borderWidth: 1,

    },
});