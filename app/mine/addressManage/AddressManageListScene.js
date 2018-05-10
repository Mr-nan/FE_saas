import  React from  'react'
import  {
    StyleSheet,
    View,
    ListView,
    RefreshControl,
    TouchableOpacity,
    Text
} from  'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();

import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import AddressManageItem from './AddressManageItem';
import AddressManageEditScene from './AddressManageEditScene';
import AccountModal from '../../component/AccountModal';


export default class AddressManageListScene extends BaseComponent {

    componentWillUnmount() {
        this.allSouce = [];
    }

    initFinish = () => {
        this.getData();
    };

    getData = () => {

        let maps = {
            company_id:global.companyBaseID,
        };
        if(typeof this.props.item !== 'undefined'){
            maps.screen_code = this.props.item.city_code
        }

        request(Urls.GET_FLOWSOTHER_LIST, 'Post', maps)
            .then((response) => {
                    this.props.showModal(false);
                    if(response.mycode == 1){
                        this.allSouce.push(...response.mjson.data);
                        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            dataSource: ds.cloneWithRows(this.allSouce),
                            isRefreshing: false,
                            renderPlaceholderOnly: 'success'
                        });
                    }else{
                        this.setState({renderPlaceholderOnly: 'error'});
                    }
                },
                (error) => {
                    this.props.showModal(false);
                    this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                });
    };
    // 构造
    constructor(props) {
        super(props);
        this.allSouce = [];
        this.state = {
            dataSource: {},
            renderPlaceholderOnly: 'blank',
            isRefreshing: false
        };

    }

    refreshingData = () => {
        this.allSouce = [];
        this.setState({isRefreshing: true});
        this.getData();
    };

    _onAdd = ()=>{
        this.toNextPage({
            component:AddressManageEditScene,
            name:'AddressManageEditScene',
            params:{
                screenItem:this.props.item,
                item:{},
                refreshData:this.refreshingData}
        });
    };

    _refreshData = () => {
        this.allSouce = [];
        this.getData();
    };

    _onDelete = (item)=>{
        this.defModal.changeShowType(true,
            '确定删除地址？'
            , '确认', '取消', () => {

                this.props.showModal(true);
                let maps = {
                    company_id:global.companyBaseID,
                    address_id:item.id
                };
                request(Urls.DEL_ADDRESS, 'Post', maps)
                    .then(
                        (response) => {
                            if(response.mycode === 1){
                                this._refreshData();
                            }else{
                                this.props.showModal(false);
                            }
                        },
                        (error) => {
                            this.props.showToast(error.mjson.msg);
                        }
                    );
            });
    };

    _onEdit = (item)=>{
        this.toNextPage({
            component:AddressManageEditScene,
            name:'AddressManageEditScene',
            params:{item:item,isEdit:true,refreshData:this.refreshingData}
        });
    };

    onPress = (item) =>{
        if(typeof this.props.callBack !== 'undefined'){
            this.backPage();
            this.props.callBack(item)
        }
    }

    _setDefault = (item)=>{
        let maps = {
            company_id:global.companyBaseID,
            address_id:item.id
        };
        this.props.showModal(true);
        request(Urls.SET_DEFAULT_ADDRESS, 'Post', maps)
            .then(
                (response) => {
                    if(response.mycode == 1){
                        this._refreshData();
                    }else{
                        this.props.showModal(false);
                    }
                },
                (error) => {
                    this.props.showToast(error.msg);
                }
            );
    };

    _renderSeparator =(sectionID,rowID)=>{
        return(
            <View key={rowID} style={styles.rowSeparator} />
        );
    };

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={styles.container}>
                    {this.loadView()}
                    <NavigatorView title='地址管理' backIconClick={this.backPage}/>
                </View>
            );
        } else {
            return (<View style={styles.container}>
                    <ListView style={{backgroundColor:fontAndColor.COLORA3,marginTop:Pixel.getTitlePixel(64),marginBottom:Pixel.getTitlePixel(80)}}
                              dataSource={this.state.dataSource}
                              renderRow={this._renderRow}
                              renderSeparator={this._renderSeparator}
                              enableEmptySections={true}
                              removeClippedSubviews={false}
                              refreshControl={
                                  <RefreshControl
                                      refreshing={this.state.isRefreshing}
                                      onRefresh={this.refreshingData}
                                      tintColor={[fontAndColor.COLORB0]}
                                      colors={[fontAndColor.COLORB0]}
                                  />
                              }
                    />
                    <TouchableOpacity style={styles.btnStyle}
                                      activeOpacity={0.6}
                                      onPress={this._onAdd}
                    >
                        <Text style={styles.btnText}>新增</Text>
                    </TouchableOpacity>
                    <NavigatorView title='地址管理' backIconClick={this.backPage}/>
                    <AccountModal ref={(ref)=>{this.defModal = ref}}/>
                </View>
            );
        }
    }

    // 每一行中的数据
    _renderRow = (rowData) => {
        return (
            <AddressManageItem
                item={rowData}
                onEdit={this._onEdit}
                onPress={this.onPress}
                onDelete={this._onDelete} setDefault={this._setDefault}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },
    listStyle: {
        marginTop: Pixel.getPixel(15)
    },
    sectionView: {
        height: Pixel.getPixel(10),
        backgroundColor: fontAndColor.COLORA3,
    },
    rowView: {
        height: 44,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: fontAndColor.COLORA4,
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    rowLeftTitle: {
        marginLeft: Pixel.getPixel(15),
        flex: 1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA0,

    },
    rowRightTitle: {
        marginRight: Pixel.getPixel(10),
        color: fontAndColor.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),

    },
    rowSeparator:{
        height:Pixel.getPixel(10),
    },
    image: {
        marginRight: Pixel.getPixel(15),
    },
    btnStyle:{
        borderRadius:Pixel.getPixel(5),
        height:Pixel.getPixel(46),
        backgroundColor:fontAndColor.COLORB0,
        marginTop:Pixel.getPixel(30),
        marginHorizontal:Pixel.getPixel(15),
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:0,
        bottom:Pixel.getPixel(10),
        right:0
    },
    btnText:{
        fontSize:Pixel.getFontPixel(15),
        color:'#ffffff'
    }

});