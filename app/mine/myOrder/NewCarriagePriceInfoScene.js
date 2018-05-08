/**
 * Created by zhengnan on 2018/5/7.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    NativeModules,
    Platform,
    Linking,
    TextInput,
    Animated,
    KeyboardAvoidingView,
    ListView
} from 'react-native'

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationBar from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import * as Net from '../../utils/RequestUtil';
import * as AppUrls from '../../constant/appUrls';
import NewLogisticsInfoScene from "./NewLogisticsInfoScene";


export default class NewCarriagePriceInfoScene extends  BaseComponent{
    render(){
        return(
            <View style={styles.root}>
                <ScrollView>
                    <LocationView title="运单号20171212100" startName="太原市" stopName="保定市" typeName="大拌菜运输" />
                    <MessageView imageData={require('../../../images/carriagePriceImage/sendCarIcon.png')}
                                 title={'发车信息'} name={'郑帮 | 18690788221'}
                                 loactionStr={'广西壮族自治区南市江南区'}/>
                    <MessageView imageData={require('../../../images/carriagePriceImage/putCarIcon.png')}
                                 title={'收车信息'}
                                 name={'郑帮 | 18690788221'}
                                 loactionStr={'广西壮族自治区南市江南区'}/>
                    <CarriagePriceView/>
                    <CarView carData={['11','22','33']}/>
                </ScrollView>
                <TouchableOpacity style={styles.footButton} activeOpacity={1} onPress={this.footBtnClick}>
                    <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>查看物流详情</Text>
                </TouchableOpacity>
                <NavigationBar title="运单详情" backIconClick={this.backPage}/>
            </View>
        )
    }

    footBtnClick=()=>{
      this.toNextPage({
          name: 'NewLogisticsInfoScene',
          component: NewLogisticsInfoScene,
          params: {

          }});

    }
}

class LocationView extends Component{

    render(){

        const {title,startName,stopName,typeName} = this.props;

        return(
            <View style={styles.contentView}>
                <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{title}</Text>
                <View style={{backgroundColor:fontAndColor.COLORB10,paddingVertical:Pixel.getFontPixel(20), alignItems:'center',justifyContent:'center',marginTop:Pixel.getPixel(10),
                    flexDirection:'row'}}>
                    <View style={{alignItems:'center',justifyContent:'center',width:Pixel.getPixel(100),}}>
                        <Image source={require('../../../images/carriagePriceImage/startLocation.png')}/>
                        <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),marginTop:Pixel.getPixel(5)}} numberOfLines={1}>{startName}</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{typeName}</Text>
                        <Image source={require('../../../images/carriagePriceImage/typeName.png')}/>
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center',width:Pixel.getPixel(100),}}>
                        <Image source={require('../../../images/carriagePriceImage/stopLocation.png')}/>
                        <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),marginTop:Pixel.getPixel(5)}} numberOfLines={1}>{stopName}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

class MessageView extends Component{

    render(){
        const {imageData,title,name,loactionStr} = this.props;

        return(
            <View style={styles.contentView}>
                <View style={{flexDirection:'row',alignItems:'center',width:width-Pixel.getPixel(30)}}>
                    <Image source={imageData}/>
                    <View style={{marginLeft:Pixel.getPixel(15), flex:1}}>
                        <View style={{justifyContent:'center', flex:1,borderBottomColor:fontAndColor.COLORA4,borderBottomWidth:Pixel.getPixel(1),paddingBottom:Pixel.getPixel(10)}}>
                            <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>{title}</Text>
                        </View>
                        <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),marginTop:Pixel.getPixel(10)}}>{name}</Text>
                        <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),marginTop:Pixel.getPixel(10)}}>{loactionStr}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

class CarriagePriceView extends Component{

    render(){
        let priceData = {
            totalPrice: 30232,
            taxation: 100,
            freight: 100,
            checkCarFee: 100,
            insurance: 100,
            toStoreFee: 100,
            serviceFee: 100,
        }

        return(
            <View style={[styles.contentView,{paddingTop:Pixel.getPixel(0)}]}>
                <View style={{
                    borderBottomColor: fontAndColor.COLORA4,
                    borderBottomWidth: Pixel.getPixel(1),
                    flexDirection: 'row',
                    alignItems: 'center',
                    height:Pixel.getPixel(44),
                    width:width-Pixel.getPixel(30)
                }}>


                    <Text
                        style={{
                            color: fontAndColor.COLORA0,
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                        }}>运费单总价：</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            color: fontAndColor.COLORB2,
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        }}>{priceData.totalPrice}</Text>
                        <Text
                            style={{
                                color: fontAndColor.COLORB2,
                                fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24)
                            }}>元</Text>
                        {
                            <Text style={{
                                color: fontAndColor.COLORA1,
                                fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                            }}>{priceData.taxation > 0 ? `(含税${priceData.taxation}元)` : '(不含税)'}</Text>
                        }
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: width - Pixel.getPixel(30),
                    marginTop: Pixel.getPixel(15)
                }}>
                    <View>
                        <PriceItemView title="运费" value={priceData.freight}/>
                        <PriceItemView title="提验车费" value={priceData.checkCarFee}/>

                    </View>
                    <View>
                        <PriceItemView title="保险费" value={priceData.insurance}/>
                        <PriceItemView title="送店费" value={priceData.toStoreFee}/>

                    </View>
                    <View>
                        <PriceItemView title="服务费" value={priceData.serviceFee}/>
                        <View style={{backgroundColor: 'white', marginBottom: Pixel.getPixel(23)}}>
                            <Text style={{
                                color: fontAndColor.COLORA1,
                                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)
                            }}> </Text>
                            <View style={{
                                marginTop: Pixel.getPixel(10),
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: fontAndColor.COLORA0,
                                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)
                                }}> </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

class PriceItemView extends Component {
    render() {
        let {title, value} = this.props;
        return (
            <View style={{backgroundColor: 'white', marginBottom: Pixel.getPixel(23)}}>
                <Text style={{
                    color: fontAndColor.COLORA1,
                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                }}>{title}</Text>
                <View style={{marginTop: Pixel.getPixel(10), flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{
                        color: fontAndColor.COLORA0,
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                    }}>{value}</Text>
                    <Text style={{
                        color: fontAndColor.COLORA0,
                        fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                    }}>元</Text>
                </View>
            </View>
        )
    }
}

class CarView extends Component{

    // 构造
      constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});

        this.state = {
            dataSource:ds.cloneWithRows(this.props.carData),
        };
      }

    render(){
        const {carData} = this.props;
        return(
            <View style={[styles.contentView,{paddingTop:Pixel.getPixel(0)}]}>
                <View style={{
                    borderBottomColor: fontAndColor.COLORA4,
                    borderBottomWidth: Pixel.getPixel(1),
                    flexDirection: 'row',
                    alignItems: 'center',
                    height:Pixel.getPixel(44),
                    width:width-Pixel.getPixel(30)
                }}>


                    <Text
                        style={{
                            color: fontAndColor.COLORA0,
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                        }}>运输车辆数：</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            color: fontAndColor.COLORA0,
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        }}>{carData.length}</Text>
                        <Text
                            style={{
                                color: fontAndColor.COLORA0,
                                fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24)
                            }}>台</Text>
                    </View>
                </View>
                <ListView dataSource={this.state.dataSource}
                          enableEmptySections={true}
                          renderRow={(data)=>{return(<CarItem/>)}}
                          renderSeparator={(sectionID, rowID)=>{return(<View key={`${sectionID}+${rowID}`} style={{height:Pixel.getPixel(1),backgroundColor:fontAndColor.COLORA3}}/>)}}/>
            </View>
        )
    }
}

class CarItem extends Component{
    render(){
        return(
            <View style={{backgroundColor:'white', flex:1,height:Pixel.getPixel(104),paddingVertical:Pixel.getPixel(12),
                flexDirection:'row'
            }}>
                <Image style={{width:Pixel.getPixel(120),height:Pixel.getPixel(80),backgroundColor:fontAndColor.COLORA3}}/>
                <View style={{flex:1,marginLeft:Pixel.getPixel(12),backgroundColor:'white',justifyContent:'space-between'}}>
                    <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}} numberOfLines={2}>[北京]奔驰M级(进口) 2015款 M奔驰M级(进口) 2015款[北京]奔驰M级(进口) 2015款 M奔驰M级(进口) 2015款[北京]奔驰M级(进口) 2015款 M奔驰M级(进口) 2015款</Text>
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>上牌：</Text>
                            <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>2016-9-09</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:Pixel.getPixel(5)}}>
                            <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>标价：</Text>
                            <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>23.9万</Text>
                        </View>

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        paddingBottom:Pixel.getPixel(44),
        backgroundColor:fontAndColor.COLORA3,
    },
    footButton:{
        left:0,
        right:0,
        bottom:0,
        height:Pixel.getPixel(44),
        backgroundColor:fontAndColor.COLORB0,
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
    },
    contentView:{
        padding:Pixel.getPixel(15),
        backgroundColor:'white',
        marginBottom:Pixel.getPixel(10)
    }
})