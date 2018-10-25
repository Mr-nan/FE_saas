/**
 * Created by zhengnan on 2018/9/26.
 */

import React,{Component} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    NativeModules,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    StatusBar,
} from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import PersonCertificate from "./PersonCertificate";
import EnterpriseCertificate from "./EnterpriseCertificate";


const Pixel = new PixelUtil();


 export default class CertificateManageScene extends BaseComponent{

     // 构造
       constructor(props) {
         super(props);
         // 初始状态
         this.state = {
             statusStyle:'default'
         };

       }

     componentWillUnmount(){
            this.setState({
                statusStyle:'light-content'
            })
     }

    render(){

        let  authData = this.props.authData;
        return(
            <View style={styles.root}>
                <StatusBar barStyle={this.state.statusStyle}/>
                <ScrollView>
                    {
                        authData.person.person_auth==0?
                            (
                                <CertificateNullItem image ={require('../../../images/mine/geren-da.png')}
                                                     title="申请个人认证" click={this._gerenrenzheng}/>
                            )
                            :
                            (
                                <CertificateItem
                                                 image ={require('../../../images/mine/geren-da.png')}
                                                 title={authData.person.real_name}
                                                 content={authData.person.idcard_number.substring(0,6)+'********'+authData.person.idcard_number.substring(14,authData.person.idcard_number.length)}
                                                 type={this._getRenZhengResult(authData.person.person_auth)}/>
                            )
                    }

                    {
                        authData.enterprise_list.length==0?
                            (
                                <CertificateNullItem image ={require('../../../images/mine/qiye-da.png')}
                                                     title="申请企业认证" click={this._qiyerenzheng}/>

                            )
                            :
                            (
                            authData.enterprise_list.map((data,index)=>{
                                return(
                                    <CertificateItem
                                        key={index}
                                        image ={require('../../../images/mine/qiye-da.png')}
                                        title={data.enterprise_name}
                                        content={'实际控制人：'+authData.person.real_name}
                                        type={this._getRenZhengResult(data.enter_auth)}/>
                                )
                            })


                            )
                    }

                </ScrollView>
                <AllNavigationView title="用户认证" backIconClick={this.backPage} wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
            </View>
        )
    }

     _gerenrenzheng = () => {

         this.toNextPage({
             name:'PersonCertificate',
             component:PersonCertificate,
             params:{
                 callBack:this.props.allRefresh,
             }
         });
     };

     _qiyerenzheng = () => {

         this.toNextPage({
             name:'EnterpriseCertificate',
             component:EnterpriseCertificate,
             params:{
                 qiye_id:this.props.baseID,
                 callBack:this.props.allRefresh,
             }
         });
     };

     _getRenZhengResult = (result) => {

         if (result == 1) {
             renzheng = '审核中';
         }
         if (result == 2) {
             renzheng = '已认证';
         }
         if (result == 3) {
             renzheng = '未通过';
         }
         return renzheng;
     };

 }

class CertificateNullItem extends Component{
     render(){
         return(
             <TouchableOpacity onPress={this.props.click}>
             <View style={styles.itme}>
                <Image style={{width:Pixel.getPixel(26),height:Pixel.getPixel(26),marginRight:Pixel.getPixel(16)}} source={this.props.image}/>
                 <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),marginTop:Pixel.getPixel(3)}} numberOfLines={1}>{this.props.title}</Text>
             </View>
             </TouchableOpacity>
         )
     }
}

class CertificateItem extends Component{
     render(){
         return(
             <View style={[styles.itme,{alignItems:'flex-start',flexDirection:'column'}]}>
                 <View style={{marginLeft:Pixel.getPixel(28), flexDirection:'row',alignItems:'center'}}>
                     <Image style={{width:Pixel.getPixel(17),height:Pixel.getPixel(17),marginRight:Pixel.getPixel(6)}} source={this.props.image}/>
                     <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),width:width-Pixel.getPixel(150)}}>{this.props.title}</Text>
                 </View>
                 <Text style={{color:'#999999', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),marginTop:Pixel.getPixel(15),marginLeft:Pixel.getPixel(28),width:width-Pixel.getPixel(128)}}
                       numberOfLines={1}>{this.props.content}</Text>
                 <View style={{height:Pixel.getPixel(20),borderRadius:Pixel.getPixel(10),paddingHorizontal:Pixel.getPixel(8),
                     alignItems:'center',justifyContent:'center',backgroundColor:'#FFD2CB',
                     top:Pixel.getPixel(19),right:Pixel.getPixel(15),position: 'absolute',
                 }}>
                     <Text style={{color:'#FB803E', fontSize:Pixel.getPixel(11)}}>{this.props.type}</Text>
                 </View>
             </View>
         )
     }
}



const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
        alignItems:'center',
    },
    itme:{
        height:Pixel.getPixel(78),
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        width:width-Pixel.getPixel(30),
        borderRadius:Pixel.getPixel(5),
        marginTop:Pixel.getPixel(16),
        flexDirection:'row',
        shadowColor:'#e8eaf4',
        shadowOffset:{width:0,height:Pixel.getPixel(5)},
        shadowOpacity:0.3,
        shadowRadius:2,
    }
})