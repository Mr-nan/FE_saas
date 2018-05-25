/**
 * Created by zhengnan on 2018/5/4.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    Modal
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import ContractNewInfoScene from "./ContractNewInfoScene";


export default class ContractListScene extends BaseComponent{


    // 构造
      constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            renderPlaceholderOnly:'blank',
           dataSource:ds.cloneWithRows([])
        };
      }

     initFinish=()=>{
          this.loadData();
     }

    render(){
        if (this.state.renderPlaceholderOnly !== 'success') {
           return this.renderPlaceholderView();
        }
        return(
            <View style={styles.root}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    enableEmptySections={true}
                />
                {
                    this.props.showButton && (
                        <TouchableOpacity activeOpacity={1} style={{backgroundColor:fontAndColor.COLORB0,left:0, right:0,bottom:0,height:Pixel.getPixel(44),position: 'absolute',
                        alignItems:'center',justifyContent:'center'
                    }} onPress={this.contractSign}>
                        <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>签署合同</Text>
                    </TouchableOpacity>)
                }

                <NavigationView title={this.props.showButton?"合同签署":'合同'} backIconClick={this.backPage} />
            </View>
        )
    }

    loadData=()=>{
        let maps = {
            api: Urls.GET_SUB_CONTRACT_DATA,
            payment_number: this.props.loan_code,
            loan_number:this.props.loan_number
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(response.mjson.data[0].contract),
                    renderPlaceholderOnly: 'success',
                });
            }, (error) => {
                this.setState({renderPlaceholderOnly: 'error'});
            });
    }

    contractSign = () => {
        this.props.showModal(true);
        let maps = {
            api: Urls.SUB_CONTRACT_SIGN,
            payment_number: this.props.loan_code,
            loan_number:this.props.loan_number
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                this.props.showToast('签署成功');
                this.props.callbackfresh();
                this.backPage();
            }, (error) => {
                this.props.showToast('签署失败');
            });
    }

    cellClick=(data)=>{
        this.toNextPage({
            name: 'ContractNewInfoScene',
            component: ContractNewInfoScene,
            params: {
                data: data.pic,
                title: data.name,
            }
        });
    }

    renderRow =(data)=>{
        return(
            <TouchableOpacity activeOpacity={1} style={styles.cell} onPress={()=>{this.cellClick(data)}}>
                <View>
                    <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{data.name}</Text>
                    <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),marginTop:Pixel.getPixel(5)}}></Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:fontAndColor.COLORA2, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),marginRight:Pixel.getPixel(3),marginBottom:Pixel.getPixel(1)}}>阅读详情</Text>
                    <Image source={require('../../../images/financeImages/celljiantou.png')}/>
                </View>

            </TouchableOpacity>
        )
    }

    renderSeparator=(sectionId, rowId)=>{

        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, height:Pixel.getPixel(10)}} key={sectionId + rowId}/>
        )
    }

    renderPlaceholderView=()=>{
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView title={this.props.showButton?"合同签署":'合同'} backIconClick={this.backPage} />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
        paddingBottom:Pixel.getPixel(44),
    },
    cell:{
        width:width,
        height:Pixel.getPixel(73),
        paddingHorizontal:Pixel.getPixel(15),
        paddingVertical:Pixel.getPixel(10),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white'
    }
});