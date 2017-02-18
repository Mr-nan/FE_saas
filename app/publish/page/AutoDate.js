/**
 * Created by Administrator on 2017/2/10.
 */
import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet
}from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const arrow = require('../../../images/publish/date-select.png');

export default class AutoDate extends Component{

    constructor(props){
        super(props);
        this.type = '';
        this.state ={
            factoryDate:'2014-06',
            registerDate:'2014-11',
            isDateTimePickerVisible: false
        }
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    _handleDatePicked = (date)=>{
        this.type === 'factory'
            ? this.setState({factoryDate:this.dateFormat(date,'yyyy-MM')})
            : this.setState({registerDate:this.dateFormat(date,'yyyy-MM')});
        this._hideDateTimePicker();
    };

    _hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    _labelPress=(type)=>{
        this.type = type;
        this.setState({ isDateTimePickerVisible: true });
    };

    render(){
        return(
            <View style={styles.container}>
                <Image source={background} style={[styles.img,{height:height-this.props.barHeight}]}>
                    <TouchableOpacity
                        style={[styles.circleContainer,styles.factoryCircle]}
                        activeOpacity={0.6}
                        onPress={()=>{this._labelPress('factory')}}
                    >
                        <View style={styles.center}>
                            <Text style={[styles.fontMain,styles.leftText]}>出厂时间</Text>
                            <Text style={[styles.fontMain,styles.fillSpace]} >{this.state.factoryDate}</Text>
                            <Image style={styles.imgContainer} source={arrow}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.circleContainer,styles.registerCircle]}
                        activeOpacity={0.6}
                        onPress={()=>{this._labelPress('register')}}
                    >
                        <View style={styles.center}>
                            <Text style={[styles.fontMain,styles.leftText]}>初登时间</Text>
                            <Text style={[styles.fontMain,styles.fillSpace]} >{this.state.registerDate}</Text>
                            <Image style={styles.imgContainer} source={arrow}/>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />
                </Image>
            </View>

        );
    };

    dateFormat = (date,fmt) => {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        backgroundColor:'transparent'
    },
    img:{
        width:width,
        backgroundColor:'transparent',
        alignItems:'center'
    },
    factoryCircle:{
        marginTop:136
    },
    registerCircle:{
        marginTop:70
    },
    circleContainer:{
        height:44,
        flexDirection:'row',
        marginHorizontal:35,
        borderColor:'#FFFFFF',
        borderWidth:1,
        borderRadius:22,
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.2)',
    },
    leftText:{
        marginLeft:20,
    },
    fontMain:{
        color:'#FFFFFF',
        fontSize:14
    },
    imgContainer:{
        width:9,
        height:15,
        marginRight:20
    },
    fillSpace:{
        flex:1,
        textAlign:'right',
        marginRight:6
    },
    center:{
        flexDirection:'row',
        alignItems:'center'
    }
});