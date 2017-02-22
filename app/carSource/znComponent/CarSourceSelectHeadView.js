/**
 * Created by zhengnan on 17/2/9.
 */


import React,{Component} from 'react';
import {

    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,

} from 'react-native';


import * as fontAndColor from '../../constant/fontAndColor';

export default class carSourceSelectHeadView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            isCheckRecommend:true,
        };
      }

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


    setCheckRecommend=(isCheck)=>{

        this.setState({

            isCheckRecommend:isCheck,

        });

        this.props.checkRecommendClick(!this.state.isCheckRecommend);

    }

    render(){
        return(

            <Image style={styles.container} source={require('../../../images/carSourceImages/bottomShaow.png')}>

                    <SelectButton ref="but1" title="车型" index={1} btnClick={this.props.onPres}/>
                    <SelectButton ref="but2" title="车龄" index={2} btnClick={this.props.onPres}/>
                    <SelectButton ref="but3" title="里程" index={3} btnClick={this.props.onPres}/>

                <View style={styles.lineView}>
                    <View style={styles.line}/>
                </View>

                <TouchableOpacity style={styles.unitsView} onPress={()=>{

                    this.setCheckRecommend(!this.state.isCheckRecommend);

                }}>
                    <Image style={{marginLeft:10}} source={this.state.isCheckRecommend ? (require('../../../images/carSourceImages/checkIcone.png')):(require('../../../images/carSourceImages/checkIcone_nil.png'))}/>
                    <Text style={styles.unitsText}>推荐</Text>
                </TouchableOpacity>
            </Image>
        )
    }

}

class SelectButton extends  Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            imgSource:require('../../../images/carSourceImages/btnIcon@2x.png'),
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
            imgSource :  bool? (require('../../../images/carSourceImages/btnIconHigh@2x.png')):(require('../../../images/carSourceImages/btnIcon@2x.png')),
            isHighlighted :bool,
        })
    }

    render(){
        return(
            <TouchableOpacity onPress={this._btnClick}>
            <View style={styles.selectBtn}>
                    <View>
                        <Text style={styles.selectBtnText}>{this.props.title}</Text>
                    </View>
                    <View style={{marginLeft:5}}>
                        <Image source={this.state.imgSource}></Image>
                    </View>
            </View>
            </TouchableOpacity>
        )
    }

}

var screenWidth = Dimensions.get('window').width;

const  styles = StyleSheet.create({


    container:{

        flex:1,
        height:40,
        width:screenWidth,
        flexDirection:'row',
        justifyContent:'space-between'

    },

    selectView:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },

    lineView:{

        width:StyleSheet.hairlineWidth,
        justifyContent:'center'
    },

    line:{

        height:15,
        backgroundColor:fontAndColor.COLORA1,
    },

    countView:{

        marginLeft:10,
        justifyContent:'center'
    },

    selectBtn:{

        width:80,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',

    },
    selectBtnText:{

        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.LITTLEFONT,
    },

    countText:{

        color:fontAndColor.COLORB3,
        fontSize:fontAndColor.LITTLEFONT,
    },

    unitsView:{

        marginRight:15,
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },

    unitsText:{
        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.LITTLEFONT,
    },


});