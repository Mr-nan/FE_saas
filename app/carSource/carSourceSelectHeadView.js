/**
 * Created by zhengnan on 17/2/9.
 */


import React,{Component} from 'react';
import {

    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity

} from 'react-native';

export default class carSourceSelectHeadView extends Component{


    checkSelect=(index)=>{

        switch(index) {
            case 1:
                this.refs.but1._setImgHighlighted(false);
                break;
            case 2:
                this.refs.but2._setImgHighlighted(false);
                break;
            case 3:
                this.refs.but3._setImgHighlighted(false);
                break;
            default:
                break;
        }
    };

    render(){
        return(

            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.selectView}>
                        <SelectButton ref="but1" title="车型" index={1} btnClick={this.props.onPres}/>
                        <SelectButton ref="but2" title="车龄" index={2} btnClick={this.props.onPres}/>
                        <SelectButton ref="but3" title="里程" index={3} btnClick={this.props.onPres}/>
                    </View>
                    <View style={styles.lineView}>
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.countView}>
                        <Text style={styles.countText}>282221</Text>
                    </View>
                    <View style={styles.unitsView}>
                        <Text style={styles.unitsText}>辆</Text>
                    </View>

                </View>
                <View style={styles.bottomLine}/>
            </View>
        )
    }

}

class SelectButton extends  Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            imgSource:require('../../images/carSourceImages/btnIcon@2x.png'),
            isHighlighted:false,
        };
      }
    _btnClick =()=>{

        // this._setImgHighlighted(!this.state.isHighlighted);
        this.props.btnClick(this.props.index,this.state.isHighlighted,this._setImgHighlighted);

    };

    componentDidMount() {

        this._setImgHighlighted(false);

    }

    // 设置按钮图片类型
    _setImgHighlighted=(bool)=>{

        const {imgSource,isHighlighted} = this.state;
        this.setState({
            imgSource :  bool? (require('../../images/carSourceImages/btnIconHigh@2x.png')):(require('../../images/carSourceImages/btnIcon@2x.png')),
            isHighlighted :bool,
        })
    }

    render(){
        return(
            <TouchableOpacity onPress={this._btnClick}>
            <View style={{width:90,height:40,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <View>
                        <Text>{this.props.title}</Text>
                    </View>
                    <View style={{marginLeft:5}}>
                        <Image source={this.state.imgSource}></Image>
                    </View>
            </View>
            </TouchableOpacity>
        )
    }

}

const  styles = StyleSheet.create({

    container:{

        flex:1,
        flexDirection:'row',
        height:40,

    },
    selectView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    lineView:{
        width:1,
        justifyContent:'center'
    },
    line:{
        height:15,
        backgroundColor:'#C3C3C3'
    },
    countView:{
        marginLeft:10,
        justifyContent:'center'
    },
    countText:{
        color:'#FDB800'
    },
    unitsView:{
        marginRight:15,
        justifyContent:'center'
    },
    unitsText:{

    },
    bottomLine:{
        borderBottomWidth:2,
        borderColor:'#EAEAEA'
    }


});