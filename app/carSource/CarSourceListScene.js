/**
 * Created by zhengnan on 17/2/9.
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    ListView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    RefreshControl,
    Dimensions,
    Modal,

} from 'react-native';

const {width, height} = Dimensions.get('window');

import * as fontAndColor    from '../constant/fontAndColor';
import BaseComponent        from '../component/BaseComponent';
import {CarSourceSelectHeadView,CarSourceSelectView}         from './znComponent/CarSourceSelectHeadView';
import ListFooter           from './znComponent/LoadMoreFooter';
import SGListView           from 'react-native-sglistview';
import CarCell              from './znComponent/CarCell';
import CarInfoScene         from './CarInfoScene';
import CarBrandSelectScene  from './CarBrandSelectScene';
import CityListScene        from './CityListScene';
import {SequencingButton,SequencingView} from './znComponent/CarSequencingView';
import * as AppUrls from "../constant/appUrls";
import  {request}           from '../utils/RequestUtil';
import PixelUtil            from '../utils/PixelUtil';


let Pixel = new PixelUtil();
let carFilterData = require('./carData/carFilterData.json');
let carAgeSource = carFilterData.carAgeSource;
let carKMSource = carFilterData.carKMSource;
let sequencingDataSource = carFilterData.sequencingDataSource;
let currentCheckedIndex = 1;
let checkedSource = [];
let carData = [];

const APIParameter = {

    brand_id: 0,
    series_id: 0,
    model_id: 0,
    provice_id: 0,
    city_id: 0,
    order_type: 0,
    coty: 0,
    mileage: 0,
    rows: 10,
    page: 1,
    start: 0,
    type: 1,
    status: 1,
};


export  default  class carSourceListScene extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

        this.state = {

            isRefreshing: false,
            dataSource: carSource,
            isHide: true,
            isFillData: 1,
            sequencingType: {
                title: '',
                value: '',
            },
            checkedCarType: {
                title: '',
                brand_id: '',
                series_id: '',
            },
            checkedCarAgeType: {
                title: '',
                value: '',
            },
            checkedCarKMType: {
                title: '',
                value: '',
            },
            renderPlaceholderOnly: 'blank',
        };

    }

    initFinish = () => {
        this.loadData();
        console.log(this.props.openSelectBranch);
        if(this.props.openSelectBranch==true){
            this.presCarTypeScene();
        }
    };

    // 下拉刷新数据
    refreshingData = () => {
        carData = [];
        this.setState({isRefreshing:true});
        this.loadData();

    };


    // 筛选数据刷新
    filterData=()=>{
        carData = [];
        this.props.showModal(true);
        this.loadData();

    }

    // 获取数据
    loadData = () => {

        let url = AppUrls.BASEURL + 'v1/car/index';
        APIParameter.page = 0;
        request(url, 'post', APIParameter)
            .then((response) => {

                carData.push(...response.mjson.data.list);
                APIParameter.status = response.mjson.data.status;

                if (this.state.isFillData !== APIParameter.status) {
                    this.setState({
                        isFillData: APIParameter.status,
                        dataSource: this.state.dataSource.cloneWithRows(carData),
                        isRefreshing:false,
                        renderPlaceholderOnly: 'success',
                    });
                }else {
                     this.setState({
                         dataSource: this.state.dataSource.cloneWithRows(carData),
                        isRefreshing:false,
                         renderPlaceholderOnly: 'success',
                    });
                }
                this.props.showModal(false);

            }, (error) => {
                this.props.showModal(false);
                this.setState({
                    isRefreshing:false,
                    renderPlaceholderOnly:'error'
                });

            });

    };

    loadMoreData = () => {

        let url = AppUrls.BASEURL + 'v1/car/index';
        APIParameter.page += 1;

        request(url, 'post', APIParameter)
            .then((response) => {

                APIParameter.status = response.mjson.data.status;
                if (this.state.isFillData !== APIParameter.status) {
                    this.setState({
                        isFillData: APIParameter.status,
                    });
                }
                let data = new Array;
                data = response.mjson.data.list
                for (let i = 0; i < data.length; i++) {
                    carData.push(data[i]);
                }
                console.log(carData.length);

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(carData),
                });

            }, (error) => {


            });
    }

    toEnd =() => {

            if (carData.length && APIParameter.status == 1  && !this.state.isRefreshing) {
                console.log('加载ing');
                this.loadMoreData();
            }

    };

    // 选择城市列表
    loactionClick = () => {

        let navigatorParams = {
            name: "CityListScene",
            component: CityListScene,
            params: {
                checkedCarType: this.state.checkedCarType,
                checkedCarClick: this.checkedCarClick,
            }
        }
        this.props.callBack(navigatorParams);
    }

    presCarTypeScene = () => {

        let navigatorParams = {
            name: "CarBrandSelectScene",
            component: CarBrandSelectScene,
            params: {
                checkedCarType: this.state.checkedCarType,
                checkedCarClick: this.checkedCarClick,
                status:1,
                isHeadInteraction:true,

            }
        };
        this.props.callBack(navigatorParams);

    }


    //  筛选条件事件
    headViewOnPres = (index, isHighlighted, setImgHighlighted) => {

        this.refs.headView.checkSelect(currentCheckedIndex); // 取消之前选择按钮状态
        currentCheckedIndex = index;

        if (index === 1) {

            this.presCarTypeScene();
            if(!this.state.isHide)
            {
                this.setState({
                    isHide:true,
                });
            }
            return;
        }


        if (!isHighlighted) {
            switch (index) {

                case 2:
                    checkedSource = carAgeSource;
                    break;
                case 3:
                    checkedSource = carKMSource;
                    break;
                default:
                    break;
            }
        }

        this.setState({
            isHide:isHighlighted,
        });
        setImgHighlighted(!isHighlighted); // 回调按钮状态


    };

    // 选择意向
    checkRecommendClick = (isCheck) => {

        if (isCheck) {
            APIParameter.type = 1;
            this.allDelectClick();

        } else {
            APIParameter.type = 0;
            this.filterData();
        }

    };

    //  选择车型
    checkedCarClick = (carObject) => {

        APIParameter.brand_id = carObject.brand_id;
        APIParameter.series_id = carObject.series_id;
    console.log(carObject);
        this.setState({
            checkedCarType: {
                title: carObject.series_id==0?carObject.brand_name:carObject.series_name,
                brand_id:carObject.brand_id,
                series_id:carObject.series_id,
            },
        });

        if (this.refs.headView.state.isCheckRecommend) {
            this.refs.headView.setCheckRecommend(false)
        } else {
            this.filterData();
        }

    };

    // 筛选车龄和里程
    checkCarAgeAnKMClick = (data, index) => {

        this.refs.headView.checkSelect(currentCheckedIndex);

        let {checkedCarAgeType, checkedCarKMType} = this.state;

        if (currentCheckedIndex == 2) {
            checkedCarAgeType = {
                title:checkedSource[index].title,
                value:checkedSource[index].value,
            }
            APIParameter.coty = checkedCarAgeType.value;

        }
        if (currentCheckedIndex == 3) {
            checkedCarKMType = {
                title:checkedSource[index].title,
                value:checkedSource[index].value,
            }

            APIParameter.mileage = checkedCarKMType.value;
        }

        this.setState({

            checkedCarAgeType,
            checkedCarKMType,
            isHide: true,

        });

        if (this.refs.headView.state.isCheckRecommend) {
            this.refs.headView.setCheckRecommend(false)
        } else {
            this.filterData();
        }

    };

    hideCheckedView=()=>{
        this.setState({
            isHide: true,
        });
    }

    // 筛选排序
    sequencingCheckedClick = (title, value) => {

        this.setState({
            sequencingType: {

                title: title,
                value: value,

            },
        });
        APIParameter.order_type = value;
        this.filterData();
    };

    sequencingClick = () => {
        this.setState({
            sequencingType: {
                title: '',
                value: '',
            },
        });
        APIParameter.order_type = 0;
        this.filterData();
    };

    carTypeClick = () => {
        this.setState({
            checkedCarType: {
                title: '',
                brand_id: '',
                series_id: '',
            },
        });
        APIParameter.brand_id = 0;
        APIParameter.series_id = 0;
        if (this.refs.headView.state.isCheckRecommend) {
            this.refs.headView.setCheckRecommend(false)
        } else {
            this.filterData();
        }
    };

    carAgeClick = () => {
        this.setState({
            checkedCarAgeType: {
                title: '',
                value: '',
            },
        });

        APIParameter.coty = 0;
        if (this.refs.headView.state.isCheckRecommend) {
            this.refs.headView.setCheckRecommend(false)
        } else {
            this.filterData();
        }
    };

    carKMClick = () => {
        this.setState({
            checkedCarKMType: {
                title: '',
                value: '',
            },
        });
        APIParameter.mileage = 0;
        if (this.refs.headView.state.isCheckRecommend) {
            this.refs.headView.setCheckRecommend(false)
        } else {
            this.filterData();
        }
    };

    allDelectClick =() => {

        this.setState({
            sequencingType: {
                title: '',
                value: '',
            },
            checkedCarType: {
                title: '',
                value: '',
            },
            checkedCarAgeType: {
                title: '',
                value: '',
            },
            checkedCarKMType: {
                title: '',
                value: '',
            },
        });

        APIParameter.order_type = 0;
        APIParameter.mileage = 0;
        APIParameter.coty = 0;
        APIParameter.brand_id = 0;
        APIParameter.series_id = 0;

        if (this.refs.headView.state.isCheckRecommend) {
            this.refs.headView.setCheckRecommend(false);

        } else {
            this.filterData();
        }

    };

    showSequencingView = () => {

      this.refs.SequencingView.visibleCilck(true);

    };


    carCellOnPres = (carID, sectionID, rowID) => {

        let navigatorParams = {

            name: "CarInfoScene",
            component: CarInfoScene,
            params: {
                carID: carID,
            }
        };
        this.props.callBack(navigatorParams);
    };

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {

           let isCarFoot =  true;

            if(APIParameter.brand_id ==0
            && APIParameter.series_id ==0
            && APIParameter.model_id==0
            && APIParameter.provice_id==0
            && APIParameter.city_id==0
            && APIParameter.order_type==0
            && APIParameter.coty==0
           && APIParameter.mileage ==0 && APIParameter.type ==0){

                isCarFoot = false;

            };

            return (<ListFooter isLoadAll={this.state.isFillData==1?false:true} isCarFoot = {isCarFoot} footAllClick = {this.allDelectClick}/>)
        }

    }

    renderPlaceholderView = () => {
        return (
            <View style={{flex:1,backgroundColor:fontAndColor.COLORA3,alignItems: 'center'}}>
                {this.loadView()}
            </View>
        );
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this.renderPlaceholderView();
        }
        return (

            <View style={styles.contaier}>
                <View style={styles.contaier}>
                    <CarListNavigatorView searchClick={this.presCarTypeScene} loactionClick={this.loactionClick}/>
                    <CarSourceSelectHeadView ref="headView" onPres={this.headViewOnPres}
                              checkRecommendClick={this.checkRecommendClick}/>
                    {

                        (this.state.checkedCarKMType.title || this.state.checkedCarAgeType.title || this.state.checkedCarType.title || this.state.sequencingType.title) ?
                            ( <CheckedContentView
                                    sequencingType={this.state.sequencingType}
                                    carType={this.state.checkedCarType}
                                    carAge={this.state.checkedCarAgeType}
                                    carKM={this.state.checkedCarKMType}
                                    sequencingClick={this.sequencingClick}
                                    carTypeClick={this.carTypeClick}
                                    carAgeClick={this.carAgeClick}
                                    carKMClick={this.carKMClick}
                                    allDelectClick={this.allDelectClick}
                                />
                            ) : (null)
                    }

                    {
                        this.state.dataSource && (
                            <SGListView
                                dataSource={this.state.dataSource}
                                ref={'carListView'}
                                initialListSize={10}
                                onEndReachedThreshold={1}
                                stickyHeaderIndices={[]}//仅ios
                                scrollRenderAheadDistance={10}
                                pageSize={10}
                                enableEmptySections = {true}
                                renderRow={(item,sectionID,rowID) =>
                                    <CarCell style={styles.carCell} carCellData={item} onPress={()=>{this.carCellOnPres(item.id,sectionID,rowID)}}/>
                                }
                                renderFooter={this.renderListFooter}
                                onEndReached={this.toEnd}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.refreshingData}
                                        tintColor={[fontAndColor.COLORB0]}
                                        colors={[fontAndColor.COLORB0]}
                                    />
                                }
                            />)
                    }

                </View>
                <SequencingButton buttonClick={this.showSequencingView}/>
                <SequencingView
                    ref="SequencingView"
                    checkedType={this.state.sequencingType}
                    checkedClick={this.sequencingCheckedClick}
                    sequencingDataSource={sequencingDataSource}/>
                {
                    !this.state.isHide && (
                        <CarSourceSelectView
                            ref="CarSourceSelectView"
                            checkedSource={checkedSource}
                            checkCarAgeAnKMClick={this.checkCarAgeAnKMClick}
                            currentCheckedIndex={currentCheckedIndex}
                            hideClick ={this.hideCheckedView}
                            checkedTypeString={currentCheckedIndex == 2 ? this.state.checkedCarAgeType.title:this.state.checkedCarKMType.title}/>)
                }

            </View>

        )

    }
}


class CheckedContentView extends Component {

    render() {
        const {sequencingType, carType, carAge, carKM, sequencingClick, carTypeClick, carAgeClick, carKMClick, allDelectClick} = this.props;
        return (

            <View style={styles.checkedContentView}>
                {
                    sequencingType.title ? (
                            <TouchableOpacity onPress={sequencingClick}>
                                <View style={styles.checkedContentItem}>
                                    <Text style={styles.checkedItemText}>{sequencingType.title}</Text>
                                    <Image style={styles.checkedDeleteImg}
                                           source={require('../../images/deleteIcon2x.png')}/>
                                </View>
                            </TouchableOpacity>) : (null)

                }
                {
                    carType.title ? (
                            <TouchableOpacity onPress={carTypeClick}>
                                <View style={styles.checkedContentItem}>
                                    <Text style={styles.checkedItemText}>{carType.title}</Text>
                                    <Image style={styles.checkedDeleteImg}
                                           source={require('../../images/deleteIcon2x.png')}/>
                                </View>
                            </TouchableOpacity>) : (null)

                }
                {
                    carAge.title ? (
                            <TouchableOpacity onPress={carAgeClick}>
                                <View style={styles.checkedContentItem}>
                                    <Text style={styles.checkedItemText}>{carAge.title}</Text>
                                    <Image style={styles.checkedDeleteImg}
                                           source={require('../../images/deleteIcon2x.png')}/>
                                </View>
                            </TouchableOpacity>) : (null)
                }
                {
                    carKM.title ? (
                            <TouchableOpacity onPress={carKMClick}>
                                <View style={styles.checkedContentItem}>
                                    <Text style={styles.checkedItemText}>{carKM.title}</Text>
                                    <Image style={styles.checkedDeleteImg}
                                           source={require('../../images/deleteIcon2x.png')}/>
                                </View>
                            </TouchableOpacity>) : (null)
                }


                <TouchableOpacity onPress={allDelectClick}>
                    <View style={styles.checkedDelectView}>
                        <Text style={styles.checkedDelectText}>清空</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

}



class CarListNavigatorView extends Component {

    render() {
        return (

            <View style={styles.navigatorView}>
                <View style={styles.navitgatorContentView}>
                    {/*<TouchableOpacity style={styles.navigatorLoactionView} onPress={this.props.loactionClick}>*/}
                    {/*<Image style={{marginLeft:15}} source={require('../../images/carSourceImages/location.png')}/>*/}
                    {/*<Text style={styles.navigatorText}>全国</Text>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity onPress={this.props.searchClick}>
                        <View style={styles.navigatorSousuoView}>
                            <Image style={{marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(10)}}
                                   source={require('../../images/carSourceImages/sousuoicon.png')}/>
                            <Text style={styles.navigatorSousuoText}>按车型信息搜索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}


var ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({

    contaier: {
        flex: 1,
        backgroundColor:fontAndColor.COLORA3
    },
    checkedContentView: {

        backgroundColor: fontAndColor.COLORA3,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'space-between',
        flexWrap: 'wrap',
    },

    checkedContentItem: {

        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: Pixel.getPixel(20),
        paddingHorizontal: Pixel.getPixel(5),
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(5),
        marginBottom: Pixel.getPixel(5),
        borderRadius: 4,
    },
    checkedItemText: {
        color: fontAndColor.COLORA0,
        fontSize: fontAndColor.CONTENTFONT,

    },
    checkedDeleteImg: {

        width: Pixel.getPixel(10),
        height: Pixel.getPixel(10),
        marginLeft: Pixel.getPixel(5),
    },
    checkedDelectView: {

        height: Pixel.getPixel(20),
        width: Pixel.getPixel(50),
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: fontAndColor.COLORA2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Pixel.getPixel(10),
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(10),


    },
    checkedDelectText: {
        color: fontAndColor.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT),

    },

    carCell: {
        height: Pixel.getPixel(110),
    },


    navigatorView: {

        top: 0,
        height: Pixel.getTitlePixel(64),
        backgroundColor: fontAndColor.COLORB0,
        flexDirection: 'row',

    },
    navitgatorContentView: {

        flex: 1,
        flexDirection: 'row',
        marginTop: Pixel.getTitlePixel(20),
        height: Pixel.getPixel(44),
        alignItems: 'center',
        justifyContent: 'center',

    },

    navigatorLoactionView: {

        flexDirection: 'row',
        width: Pixel.getPixel(85),
        alignItems: 'center',


    },
    navigatorSousuoView: {
        height: Pixel.getPixel(25),
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        width: ScreenWidth - Pixel.getPixel(40),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    navigatorText: {
        marginLeft: Pixel.getPixel(6),
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),

    },
    navigatorSousuoText: {

        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),

    },

});