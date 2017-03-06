import  React, {Component, PropTypes} from  'react'
import  {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ListView,
    RefreshControl
} from  'react-native'

import * as fontAndClolr from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
import SignContractScene from '../contractManage/SignContractScene'
var Pixel = new PixelUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou.png');
import  LoadMoreFooter from '../../component/LoadMoreFooter';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
let page = 1;
let allPage = 1;
let allSouce = [];
export default class ContractManageScene extends BaseComponent {
    initFinish = () => {
        this.getData();
    }

    componentWillUnmount() {
        allSouce = [];
    }

    getData = () => {
        let maps = {
            page: page,
            rows: 10,
            api : 'api/v1/Contract/contractList',
            sign_status: '1',
        };
        request(Urls.CONTRACT_LIST, 'Post', maps)
            .then((response) => {
            console.log(response.mjson);
                    if (page == 1 && response.mjson.data.contract_list.length <= 0) {
                        this.setState({renderPlaceholderOnly: 'null', isRefreshing: false});
                    } else {
                        allSouce.push(...response.mjson.data);
                        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            dataSource: ds.cloneWithRows(allSouce),
                            renderPlaceholderOnly: 'success',
                            isRefreshing: false
                        });
                    }
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                });
    }
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource: {},
            renderPlaceholderOnly: 'blank',
            isRefreshing: false
        };

    }

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<LoadMoreFooter isLoadAll={page==allPage?true:false}/>)
        }

    }

    refreshingData = () => {
        allSouce = [];
        this.setState({isRefreshing: true});
        page = 1;
        this.getData();
    };

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.rootContainer}>
                <NavigatorView title='合同管理' backIconClick={this.backPage}/>
                {this.loadView()}
            </View>);
        }else {
            return (<View style={styles.container}>
                <NavigatorView title='合同管理' backIconClick={this.backPage}/>


                <ListView style={{backgroundColor:fontAndColor.COLORA3,marginTop:Pixel.getTitlePixel(64)}}
                          dataSource={this.state.dataSource}
                          renderRow={this._renderRow}
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

            </View>);
        }
    }

    // 每一行中的数据
    _renderRow = (rowData, rowID, selectionID) => {
        return (
            <TouchableOpacity
                onPress={()=>{
                    console.log(rowID+"--"+selectionID)
                    this.toNextPage({
                name: 'SignContractScene',
                component: SignContractScene,
                params: {rowID},
            })}}>
                <View style={styles.rowView} >
                    <Text style={styles.rowLeftTitle}>第一车贷是个公司</Text>
                    {selectionID!=='2' ? <Text style={styles.rowRightTitle} >7份合同</Text>:null}
                    <Image source={cellJianTou} style={styles.image}></Image>

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndClolr.COLORA3,
    },
    listStyle: {
        marginTop: Pixel.getPixel(15)
    },
    sectionView: {
        height: Pixel.getPixel(10),
        backgroundColor: fontAndClolr.COLORA3,
    },
    rowView: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: fontAndClolr.COLORA4,
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    rowLeftTitle: {
        marginLeft: Pixel.getPixel(15),
        flex: 1,
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),
        color: fontAndClolr.COLORA0,

    },
    rowRightTitle: {
        marginRight: Pixel.getPixel(10),
        color: fontAndClolr.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),

    },
    image:{
        marginRight:Pixel.getPixel(15),
    }


});