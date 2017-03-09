import  React, {Component, PropTypes} from  'react'
import  {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    InteractionManager
} from  'react-native'

import * as fontAndClolr from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
import BaseComponent from "../../component/BaseComponent";
import MyButton from '../../component/MyButton';

const {width, height} = Dimensions.get('window');
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
let ROWID = -1;
let viewWidth = Pixel.getPixel(40);
let list = [];
let relist = [];
export default class PlanInfoPage extends BaseComponent {

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            xuanzhong: '',
            dataSource: [],
            renderPlaceholderOnly: 'blank'
        };

    }

    componentWillUnmount() {
        list = [];
        relist = [];
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
    }

    initFinish = () => {
        this.getData();
    }

    getData = () => {
        let maps = {
            api: Urls.REPAYMENT_GET_ADJUST_INFO,
            loan_number: this.props.loan_number,
            type: '3',
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    list = response.mjson.data.list;
                    relist = response.mjson.data.relist;
                    if (list != null && list.length > 0) {
                        this.setState({renderPlaceholderOnly: 'success', dataSource: ds.cloneWithRows(list)});
                    } else {
                        this.setState({renderPlaceholderOnly: 'null'});
                    }
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                this._renderPlaceholderView()
            );
        }
        return (
            <View style={styles.container}>
                <ListView
                    contentContainerStyle={styles.listStyle}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderHeader={this._renderHeader}
                />
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'使用优惠券'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={this._useCoupon}/>

            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor:fontAndClolr.COLORA3,alignItems: 'center'}}>
                {this.loadView()}
            </View>
        );
    }

    _useCoupon = () => {
        alert("234252")
    }
    // 每一行中的数据
    _renderRow = (rowData, selectionID, rowID,) => {

        let widthnum = 0;
        if (rowID == ROWID) {
            widthnum = Pixel.getPixel(20);
        } else {
            widthnum = 0;
        }

        return (
            <TouchableOpacity style={styles.rowView}
                              onPress={() => {

                                  this._rowClick(rowID)
                              }}>
                <View style={styles.textAllStyle}>
                    <Text style={styles.rowTextStyle}>{rowData.dead_line}</Text>
                    <Text style={styles.rowTextStyle}>{rowData.repaymentmny}</Text>
                    <TouchableOpacity onPress={() => {

                        this._moneyAdjustClick(rowID)
                    }}>
                        <Text style={styles.rowTextStyle}>{rowData.adjustmoney}</Text>
                    </TouchableOpacity>

                    <Text style={styles.rowTextStyle}>{rowData.aftermny}</Text>
                </View>


                <View style={styles.rightGouStyle}>

                    <Image source={require('../../../images/check_iocn.png') }
                           style={[styles.imageStyle,{width:widthnum}]}/>

                </View>
            </TouchableOpacity>
        );
    }
    _rowClick = (rowID) => {
        ROWID = rowID;

        this.setState({
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'ok', 's', 'd', 'h', '3', '3g', 'ddaf', 'ffa', 'fd'
            ]),
        });

    }
    _moneyAdjustClick = (rowID) => {
        alert(rowID)
    }
    // Header
    _renderHeader = () => {
        return (
            <View style={styles.listHeader}>
                <View style={styles.textAllStyle}>
                    <Text style={styles.headerTextStyle}>到期日</Text>
                    <Text style={styles.headerTextStyle}>调整前</Text>
                    <Text style={styles.headerTextStyle}>调整金额</Text>
                    <Text style={styles.headerTextStyle}>调整后</Text>
                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndClolr.COLORA3,
    },
    listStyle: {},

    rowView: {
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: fontAndClolr.COLORA4,
        borderBottomWidth: 1,

    },

    listHeader: {
        flexDirection: 'row',
        height: Pixel.getPixel(33),
        backgroundColor: fontAndClolr.COLORA3,
    },
    textAllStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    rightGouStyle: {
        width: viewWidth + Pixel.getPixel(10),
        justifyContent: 'center',
        alignItems: 'center'

    },
    imageStyle: {
        width: Pixel.getPixel(20),
        height: Pixel.getPixel(20)
    },

    headerTextStyle: {
        width: (width - viewWidth) / 4.0,
        textAlign: 'center',
        fontSize: Pixel.getFontPixel(fontAndClolr.CONTENTFONT24),
        color: fontAndClolr.COLORA1
    },
    rowTextStyle: {
        width: (width - viewWidth) / 4.0,
        textAlign: 'center',
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),
        color: fontAndClolr.COLORA0
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(0),
        backgroundColor: fontAndClolr.COLORB0,
        marginTop: Pixel.getPixel(0),
        marginBottom: Pixel.getPixel(0),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(0),
        marginLeft: Pixel.getPixel(0)
    },
    loginButtonTextStyle: {
        color: fontAndClolr.COLORA3,
        fontSize: Pixel.getFontPixel(fontAndClolr.BUTTONFONT30)
    },


});

