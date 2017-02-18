/**
 * Created by Administrator on 2017/2/10.
 */
import React,{ Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    Dimensions,
    StyleSheet
} from 'react-native';

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const arrow = require('../../../images/publish/date-select.png');

export default class AutoOther extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return(
        <View style={styles.container}>
            <Image style={[styles.img,{height:height-this.props.barHeight}]} source={background}>
                <View style={[styles.rectangleContainer,styles.firstMargin]}>
                    <Text style={[styles.fontMain,styles.leftText]}>销售价：</Text>
                    <TextInput style={[styles.fontMain,styles.leftInput,styles.fillSpace]} underlineColorAndroid='transparent'/>
                    <Text style={[styles.fontMain,styles.rightText]}>万元</Text>
                </View>
                <View style={[styles.rectangleContainer,styles.alignMargin]}>
                    <Text style={[styles.fontMain,styles.leftText]}>车况描述：</Text>
                    <TextInput style={[styles.fontMain,styles.leftInput,styles.fillSpace]} underlineColorAndroid='transparent'/>
                </View>
                <View style={[styles.rectangleContainer,styles.alignMargin]}>
                    <Text style={[styles.fontMain,styles.leftText]}>所属商户：</Text>
                    <TextInput style={[styles.fontMain,styles.leftInput,styles.fillSpace]} underlineColorAndroid='transparent'/>
                    <Image style={[styles.imgContainer,styles.rightText]} source={arrow}/>
                </View>
            </Image>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        backgroundColor:'transparent',
    },
    img:{
        width:width,
        backgroundColor:'transparent',
        alignItems:'center'
    },
    rectangleContainer:{
        width:317,
        height:44,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.2)',
        borderColor:'#FFFFFF',
        borderWidth:1,
        borderRadius:2
    },
    fontMain:{
        fontSize:15,
        color:'#FFFFFF'
    },
    firstMargin:{
        marginTop:166
    },
    alignMargin:{
        marginTop:19
    },
    leftText:{
        marginLeft:10
    },
    rightText:{
        marginRight:10
    },
    leftInput:{
        marginLeft:20
    },
    fillSpace:{
        flex:1,
    },
    imgContainer:{
        width:9,
        height:15,
    },
});
