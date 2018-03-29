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
    RefreshControl,
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import MyButton from '../../component/MyButton';
import BaseComponent from '../../component/BaseComponent';
//let allList = [];
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import  LoadMoreFooter from '../../component/LoadMoreFooter';
let page = 1;
let allPage = 1;
export  default class InventoryRepaymentPage extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.allList = [];
        this.state = {
            source: [],
            renderPlaceholderOnly: 'blank',
            isRefreshing: false
        };
    }

    componentDidMount() {
        //InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
       // });
    }

    componentWillUnmount() {
         page = 1;
         allPage = 1;
        this.allList = [];
    }

    initFinish = () => {
        this.getData();
    }

    getData = () => {
        let maps = {
            api: Urls.REPAYMENT_GETLIST,
            type: '4',
            p: page
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    this.allList.push(...response.mjson.data.list);
                    allPage = response.mjson.data.total/10;
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        source: ds.cloneWithRows(this.allList),
                        renderPlaceholderOnly: 'success',
                        isRefreshing: false
                    });
                },
                (error) => {
                    if (error.mycode == '-2100045') {
                        this.setState({renderPlaceholderOnly: 'null', isRefreshing: false});
                    } else {
                        this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                    }
                });
    }

    refreshingData = () => {
        this.allList = [];
        this.setState({isRefreshing: true});
        page = 1;
        this.getData();
    };


    refreshingData2 = () => {
        this.allList = [];
        this.props.showModal(true);
        page = 1;
        this.getData2();
    };

    getData2 = () => {
        let maps = {
            api: Urls.REPAYMENT_GETLIST,
            type: '4',
            p: page
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    this.allList = [];
                    this.allList.push(...response.mjson.data.list);
                    allPage = response.mjson.data.total/10;
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        source: ds.cloneWithRows(this.allList)
                    },()=>{
                        this.props.showModal(false);
                    });
                },
                (error) => {
                });
    }
    toEnd = () => {
        if (this.state.isRefreshing) {

        } else {
            if (page < allPage) {
                page++;
                this.getData();
            }
        }

    };

    renderListFooter = () => {
        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<LoadMoreFooter isLoadAll={page>=allPage?true:false}/>)
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (<View style={{backgroundColor: fontAndColor.COLORA3, flex: 1, paddingTop: Pixel.getPixel(15)}}>
                {this.loadView()}
            </View>);
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1, paddingTop: Pixel.getPixel(15)}}>
                <ListView
                    removeClippedSubviews={false}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
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
            </View>
        );
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    buttonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: styles.parentStyle,
        childStyle: styles.childStyle,
        opacity: 1,
    }

    _renderRow = (movie) => {

        return (
            <TouchableOpacity onPress={()=>{
                     this.props.callBack(movie.loan_id,movie.loan_number,movie.payment_number,movie.type,movie.planid,movie.payment_status,this.refreshingData2);
            }} activeOpacity={0.8} style={[styles.allBack]}>
                <View style={[styles.rowViewStyle, styles.margin]}>
                    <View style={[styles.rowTopViewStyle, {justifyContent: 'flex-start', flex: 3,}]}>
                        <MyButton {...this.buttonParams} content="库融"/>
                        <Text allowFontScaling={false}  style={styles.rowTopTextStyle}>{this.props.customerName}</Text>
                    </View>
                    <View style={[styles.rowTopViewStyle, {
                        flex: 2,
                        justifyContent: 'flex-end'
                    }]}>
                        <Text allowFontScaling={false}  style={styles.rowTopGrayTextStyle}>{movie.loan_number}</Text>
                    </View>
                </View>
                <View style={[styles.line]}></View>
                <View
                    style={[styles.centerView]}>
                    <View style={[styles.centerChild, styles.margin, {alignItems: 'flex-start'}]}>
                        <Text allowFontScaling={false}  style={styles.centerText}>
                            到账日期
                        </Text>
                        <Text allowFontScaling={false}  style={[styles.centerBottomText, {
                            color: fontAndColor.COLORA0
                        }]}>
                            {movie.dead_line_str}
                        </Text>
                    </View>
                    <View style={[styles.centerChild, styles.margin, {alignItems: 'flex-end'}]}>
                        <Text allowFontScaling={false}  style={styles.centerText}>
                            本息合计
                        </Text>
                        <Text allowFontScaling={false}  style={[styles.centerBottomText, {
                            color: fontAndColor.COLORB2
                        }]}>
                            {parseFloat(movie.normal_repayment_money).toFixed(2)}
                        </Text>
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
        height: Pixel.getPixel(15),

    },
    rowViewStyle: {
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowTopViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowTopTextStyle: {
        marginLeft: Pixel.getPixel(7), fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA0
    },
    rowTopGrayTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT20),
        color: fontAndColor.COLORA1
    },
    margin: {
        marginLeft: Pixel.getPixel(15), marginRight: Pixel.getPixel(15),
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
    allBack: {
        width: width, height: Pixel.getPixel(123), backgroundColor: '#ffffff', alignItems: 'center'
    },
    line: {
        width: width - Pixel.getPixel(30),
        height: Pixel.getPixel(1),
        backgroundColor: fontAndColor.COLORA3
    },
    centerView: {
        width: width,
        height: Pixel.getPixel(72),
        flexDirection: 'row'
    },
    centerChild: {
        flex: 1, height: Pixel.getPixel(72),
        justifyContent: 'center'
    },
    centerText: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1
    },
    centerBottomText: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        marginTop: Pixel.getPixel(8)
    },
    bottomView: {
        height: Pixel.getPixel(44),
        justifyContent: 'center',
        width: width - Pixel.getPixel(30)
    }
})