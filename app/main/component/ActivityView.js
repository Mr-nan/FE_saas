/**
 * Created by zhengnan on 2018/8/22.
 *
 * 老带新活动弹出窗
 *
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,

} from  'react-native';

import {observable} from 'mobx';
import {observer} from 'mobx-react'

@observer
export default class ActivityView extends Component{



      constructor(props) {
        super(props);
        this.state = {
            visible:true
        };

      }

    render(){
        return(
            <View>
            <Modal visible={this.state.visible} transparent={true} onChangeVisibleRows={()=>{this.setVisible(false)}}>
                <View style={styles.root}>
                  <Image source={require('../../../images/login/tanchuang.png')}/>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{this.setState({
                        visible:false
                    })}}>
                  <Image source={require('../../../images/login/guanbi-x.png')}/>
                    </TouchableOpacity>
                </View>
            </Modal>
            </View>
        )
    }

    setVisible=(type)=>{
        console.log(type);
        this.setState({
            visible:type
        })
    }


}


const  styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)'
    }
})
