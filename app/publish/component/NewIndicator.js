/**
 * Created by Administrator on 2017/2/16.
 */
import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const { width } = Dimensions.get('window');
import * as fontAndColor from '../../constant/fontAndColor';
const unselect = require('../../../images/publish/date-select.png');
const select = require('../../../images/publish/car-select.png');

export default class NewIndicator extends Component{

    constructor(props){
        super(props);
        this.viewData=[
            {title:'款型',page:0},
            {title:'照片',page:1},
            {title:'类型',page:2},
            {title:'时间',page:3},
            {title:'里程',page:4},
            {title:'更多',page:5}
        ];
    }


    _onPress = (page) =>{
        if(page !== 5){
            this.props.goToPage(page)
        }else{
            this.props.goToMore();
        }
    };

    _renderIndicator = () => {
       return this.viewData.map((data)=>{
           const isTabActive = this.props.activeTab === data.page;
            return(
                <TouchableOpacity
                    key={'id'+ data.page}
                    style = {isTabActive ? styles.selectContainer : styles.defaultContainer}
                    activeOpacity={0.6}
                    onPress={()=>{this._onPress(data.page)}}>
                    <View style={styles.centerItem}>
                        <Text style={isTabActive ? styles.selectText : styles.defaultText}>{data.title}</Text>
                        <Image style={styles.imgContainer} source={isTabActive ? select : unselect}/>
                    </View>
                </TouchableOpacity>
            );
        });
    };

    render(){
        let indicators = this._renderIndicator();
        return(
            <View style={styles.container}>
                {indicators}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:57,
        backgroundColor:'rgba(47,155,250,0.25)',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    defaultContainer:{
        width:50,
        height:27,
        borderWidth:0.5,
        borderColor:'#FFFFFF',
        borderRadius:2,
        backgroundColor:'transparent',
        justifyContent:'center'
    },
    defaultText:{
        fontSize:14,
        color:'#FFFFFF'
    },
    imgContainer:{
        width:7,
        height:12,
        marginLeft:2
    },
    selectContainer:{
        width:50,
        height:27,
        borderRadius:2,
        backgroundColor:'#FFFFFF',
        justifyContent:'center'
    },
    centerItem:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    selectText:{
        fontSize:14,
        color:fontAndColor.COLORB0
    },
});