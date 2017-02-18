/**
 * Created by Administrator on 2017/2/13.
 */
import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';

const {width,height} = Dimensions.get('window');
const imgLogo = require('../../../images/publish/success.png');

export default class SuccessModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    _okClick = ()=>{
        this.setState({
            modalVisible: false
        });
    };

    openModal = ()=>{
        this.setState({
            modalVisible: true
        });
    };

    render(){
        return(
            <Modal
                   transparent={true}
                   visible={this.state.modalVisible}
                   onRequestClose={() => {}}>
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <Image style={styles.imgLogo} source={imgLogo}/>
                        <Text style={styles.fontMain}>发布成功</Text>
                        <Text style={styles.fontHint}>您可以到首页/卖车中查看车辆状态</Text>
                        <View style={styles.fillSpace}/>
                        <TouchableOpacity
                            activeOpacity={0.2}
                            onPress={()=>{this._okClick()}}>
                            <View style={styles.okBtn}>
                                <Text style={styles.okText}>确定</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'rgba(0,0,0,0.3)',
        alignItems:'center'
    },
    contentContainer:{
        width:260,
        height:310,
        borderRadius:2,
        marginTop:157,
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    },
    imgLogo:{
        marginTop:28,
        width:142,
        height:112
    },
    fontMain:{
        marginTop:28,
        color:fontAndColor.COLORA0,
        fontSize:20
    },
    fontHint:{
        marginTop:8,
        color:fontAndColor.COLORA1,
        fontSize:14
    },
    okBtn:{
        width:230,
        height:40,
        backgroundColor:fontAndColor.COLORB0,
        borderRadius:2,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:17
    },
    okText:{
        fontSize:15,
        color:'#FFFFFF'
    },
    fillSpace:{
        flex:1,
    }
});


