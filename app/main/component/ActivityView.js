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
            visible:false
        };

      }

    render(){
        return(
            <View>
            <Modal visible={this.state.visible} transparent={true} onChangeVisibleRows={()=>{this.setVisible(false)}}>
                <View style={styles.root}>
                    <Image source={require('../../../images/login/tanchuang.png')} style={{justifyContent:'flex-end',
                        alignItems:'center'
                    }}>
                        <TouchableOpacity style={{height:45,width:250}} activeOpacity={1} onPress={()=>{
                            this.props.click && this.props.click();
                            this.setVisible(false);
                        }}/>
                    </Image>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{this.setVisible(false)}}>
                  <Image source={require('../../../images/login/guanbi-x.png')} style={{marginTop:20}}/>
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
