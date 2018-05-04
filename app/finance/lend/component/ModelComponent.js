/**
 * Created by lhc on 2017/2/24.
 */
//弹窗组件
import React, { Component ,PureComponent} from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ListView,
} from 'react-native';

const foncus ='before';
const behand ='after';

import { PAGECOLOR,adapeSize,fontadapeSize,width } from './MethodComponent'

import {CommenButton} from './ComponentBlob'

import dismissKeyboard from 'dismissKeyboard';
import LoginInputText from '../../../login/component/LoginInputText';
var Platform = require('Platform');
import {request} from "../../../utils/RequestUtil";
import * as AppUrls from "../../../constant/appUrls";


export class LendSuccessAlert extends Component{

    state={
        show:false,
        subtitle:''
    }
    setModelVisible=(value)=>{

        this.setState({
            show:value
        })
    }

    setModelVisibleAndSubTitle=(value,subTitle)=>{

        this.setState({
            show:value,
            subtitle:subTitle,
        })
    }

    confimClick=()=>{

        const {confimClick}=this.props;

        this.setModelVisible(false);
        confimClick&&confimClick();

    }
    render(){


        const {title,subtitle,confimTitle}=this.props;

        return(

            <Modal animationType='none'
                   transparent={true}
                   visible={this.state.show}
                   onShow={() => {
                   }}
                   onRequestClose={() => {
                   }}
            >
                <TouchableOpacity style={commentAlertStyle.mask} activeOpacity={1} onPress={()=>{
                    dismissKeyboard();
                }}>
                    <View style={commentAlertStyle.container}>
                        <Text allowFontScaling={false}  style={commentAlertStyle.title}>{title}</Text>
                        <Text allowFontScaling={false}  style={commentAlertStyle.subtitle}>{this.state.subtitle!=''?this.state.subtitle:subtitle}</Text>
                        <View style={commentAlertStyle.successWarp}>
                            <CommenButton buttonStyle={[commentAlertStyle.successButton,{marginBottom:adapeSize(20)},
                             commentAlertStyle.buttonLeft]} onPress={this.confimClick} title={confimTitle?confimTitle:"好的"}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

}

//修改借款金额
export class ModifyBorrowing extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {visible:false};
      }

    static propTypes={

        confimClick:React.PropTypes.func.isRequired,
        cancleClick:React.PropTypes.func.isRequired,
    }
    setModelVisible=(value)=>{

        this.setState({
            visible:value
        })
    }
    _confimClick=()=>{

        const {confimClick}=this.props;

        confimClick(this.setModelVisible);
    }
    _cancleClick=()=>{
        const {cancleClick}=this.props;
        cancleClick(this.setModelVisible)
    }

    render(){

        return(

            <Modal animationType='none'
                   transparent={true}
                   visible={this.state.visible}
                   onShow={() => {
                   }}
                   onRequestClose={() => {
                   }}
            >
                <TouchableOpacity style={styles.mask} activeOpacity={1} onPress={()=>{
                    dismissKeyboard();
                }}>
                    <View style={styles.container}>

                        <Text allowFontScaling={false}  style={styles.title}>修改借款</Text>

                        <View style={styles.input}>
                            <TextInput underlineColorAndroid={"#00000000"} onChangeText={this.props.onchangeText} style={styles.inputText} placeholder='请输入借款金额' keyboardType='decimal-pad'></TextInput>
                        </View>
                        <View style={styles.showMessage}>
                            <Text allowFontScaling={false}  style={styles.showMessageText}>*可借额度{this.props.minLend}-{this.props.maxLend}万</Text>
                        </View>

                        <View style={styles.handelWarp}>
                            <TouchableOpacity style={[styles.button,styles.buttonLeft]} onPress={this._confimClick}>
                                <Text allowFontScaling={false}  style={styles.text}>确认</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button,styles.buttonRight]}onPress={this._cancleClick}>
                                <Text allowFontScaling={false}  style={styles.text}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        )
    }
}


//修改借款金额
export class ModifyBorrowingNew extends Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {visible:false};
    }

    static propTypes={

        confimClick:React.PropTypes.func.isRequired,
        cancleClick:React.PropTypes.func.isRequired,
    }
    setModelVisible=(value)=>{

        this.setState({
            visible:value
        })
    }
    _confimClick=()=>{

        const {confimClick}=this.props;

        confimClick(this.setModelVisible);
    }
    _cancleClick=()=>{
        const {cancleClick}=this.props;
        cancleClick(this.setModelVisible)
    }

    render(){

        return(

            <Modal animationType='none'
                   transparent={true}
                   visible={this.state.visible}
                   onShow={() => {
                   }}
                   onRequestClose={() => {
                   }}
            >
                <TouchableOpacity style={styles.mask} activeOpacity={1} onPress={()=>{
                    dismissKeyboard();
                }}>
                    <View style={[styles.container,{marginTop:adapeSize(230), marginLeft:adapeSize(20), marginRight:adapeSize(20)}]}>
                        <Text allowFontScaling={false}  style={{fontSize:adapeSize(14),color:'#333333',marginTop:adapeSize(15),marginBottom:adapeSize(15)}}>修改借款金额申请</Text>
                        <View style={{height:adapeSize(35),flexDirection:'row',marginLeft:adapeSize(5),marginRight:adapeSize(5),borderBottomColor:'#D8D8D8',borderBottomWidth:0.5,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{flex:1,fontSize:adapeSize(12),color:'#999999',marginLeft:adapeSize(5)}}>可借额度区间</Text>
                            <Text allowFontScaling={false}  style={{fontSize:adapeSize(14), color:'#FA5741'}}>{this.props.minLend}-{this.props.maxLend}</Text>
                            <Text style={{fontSize:adapeSize(12),color:'#FA5741',marginRight:adapeSize(5),padding:0,marginLeft:adapeSize(10)}}>万元</Text>
                        </View>
                        <View style={{height:adapeSize(35), marginTop:adapeSize(20), flexDirection:'row',borderBottomColor:'#D8D8D8',borderBottomWidth:0.5,alignItems:'center',marginLeft:adapeSize(5),marginRight:adapeSize(5),justifyContent:'center'}}>
                            <Text style={{color:'#333333',fontSize:adapeSize(14),marginLeft:adapeSize(5)}}>金额</Text>
                            <TextInput underlineColorAndroid={"#00000000"} onChangeText={this.props.onchangeText} style={{flex:1, fontSize:adapeSize(12), color:PAGECOLOR.COLORB4, paddingLeft:adapeSize(10), height:adapeSize(35),padding:0}} placeholder='请输入借修改后的款金额' keyboardType='decimal-pad'></TextInput>
                            <Text style={{color:'#666666',fontSize:adapeSize(12),marginRight:adapeSize(5),marginLeft:adapeSize(10)}}>万元</Text>
                        </View>
                        <View style={styles.handelWarp}>
                            <TouchableOpacity style={[styles.button,styles.buttonRight,{marginLeft:adapeSize(30),marginRight:adapeSize(10),}]}onPress={this._cancleClick}>
                                <Text allowFontScaling={false}  style={{textAlign:'center', color:'#ffffff',fontSize:adapeSize(14)}}>放弃修改</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button,styles.buttonLeft,{marginLeft:adapeSize(10),marginRight:adapeSize(30),}]} onPress={this._confimClick}>
                                <Text allowFontScaling={false}  style={{textAlign:'center', color:'#ffffff',fontSize:adapeSize(14)}}>确认提交</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        )
    }
}



export class ModalList extends PureComponent{


    constructor(props) {
        super(props);
        // 初始状态
        const  ds= new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});

        this.state = {

            dataSource:ds.cloneWithRows(this.genRows({})),
            show:true,
        }
    }
    _pressData={};

    componentWillMount() {
        this._pressData={};
    }

    genRows=(pressData)=>{

        let dataBlob=[];
        for (let i=0;i<2;i++){

            let pressText= pressData[i]?'(X)':'';
            dataBlob.push({title:'cell'+i+pressText,selected:pressData[i]});

        }
        return dataBlob;
    }

    pressRow=(rowId)=>{


        this._pressData[rowId] = !this._pressData[rowId];
        this.setState({dataSource: this.state.dataSource.cloneWithRows(
            this.genRows(this._pressData)
        )});

    }



    renderRow = (rowData,sectionId,rowID)=>{

        return(
            <TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.pressRow(rowID)} underlayColor='aqua'>


                <Text allowFontScaling={false}  style={[{marginTop:10},rowData.selected&&{color:'red'}]}>{rowData.title}</Text>


            </TouchableOpacity>
        )

    }

    setModelVisible=(value)=>{

        this.setState({
            show:value
        })
    }

    confimClick=()=>{

    }

    cancleClick=()=>{


    }

    render(){

        return(

            <Modal animationType='none'
                   transparent={true}
                   visible={this.state.show}
                   onShow={() => {
                   }}
                   onRequestClose={() => {
                   }}
            >
                <TouchableOpacity style={listStyle.mask} activeOpacity={1} onPress={()=>{
                    this.setModelVisible(false)
                }}>
                    <View style={listStyle.container}>

                        <ListView
                            removeClippedSubviews={false}
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />

                    </View>
                </TouchableOpacity>
            </Modal>

        )
    }


}


export class ModalAlert extends PureComponent{


    state={
        show:false,
    }

    setModelVisible=(value)=>{

        this.setState({
            show:value
        })
    }

    confimClick=()=>{

        const {confimClick} =this.props;

        confimClick(this.setModelVisible)

    }

    cancleClick=()=>{

        const {cancleClick} =this.props;

        cancleClick(this.setModelVisible)

    }


    render(){


        const {title,subtitle,confimTitle}=this.props;
        return(

            <Modal animationType='none'
                   transparent={true}
                   visible={this.state.show}
                   onShow={() => {
                   }}
                   onRequestClose={() => {
                   }}
            >
                <TouchableOpacity style={commentAlertStyle.mask} activeOpacity={1} onPress={()=>{
                    dismissKeyboard();
                }}>
                    <View style={commentAlertStyle.container}>
                        <Text allowFontScaling={false}  style={commentAlertStyle.title}>{title}</Text>
                        <Text allowFontScaling={false}  style={commentAlertStyle.subtitle}>{subtitle}</Text>
                        <View style={commentAlertStyle.buttonsWarp}>

                            <CommenButton buttonStyle={[commentAlertStyle.buttonstyle,{marginRight:adapeSize(10)}, commentAlertStyle.buttonLeft]}
                                          onPress={this.confimClick}
                                          title={"确定"}/>
                            <CommenButton buttonStyle={[commentAlertStyle.buttonstyle,commentAlertStyle.buttonRight]} onPress={this.cancleClick} title="取消"/>

                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        )
    }


}


export class MMSModalAlert extends PureComponent{
    state={
        show:false,
    }

    setModelVisible=(value)=>{
        this.setState({
            show:value
        })
    }

    confimClick=()=>{
        let verifyCode = this.refs.loginVerifycode.getInputTextValue();
        if(verifyCode != ''){
            const {confimClick} = this.props;
            confimClick(this.setModelVisible,this.imgSid,verifyCode)
        }
    }

    cancleClick=()=>{
        const {cancleClick} =this.props;
        cancleClick(this.setModelVisible)
    }
    render(){
        const {title,subtitle,confimTitle}=this.props;
        return(
            <Modal animationType='none'
                   transparent={true}
                   visible={this.state.show}
                   onShow={() => { this.Verifycode() }}
                   onRequestClose={() => { }}>
                <TouchableOpacity
                    style={commentAlertStyle.mask}
                    activeOpacity={1}
                    onPress={()=>{dismissKeyboard();}}>
                    <View style={commentAlertStyle.container}>
                        <Text allowFontScaling={false}  style={commentAlertStyle.title}>{'验证码'}</Text>
                        <View style={{width:adapeSize(200)}}>
                            <LoginInputText
                                ref="loginVerifycode"
                                textPlaceholder={'请输入'}
                                inputTextStyle={{}}
                                viewStytle={{width:adapeSize(200)}}
                                leftIcon={false}
                                rightIconClick={this.Verifycode}
                                keyboardType={'phone-pad'}
                                rightIconSource={this.state.verifyCode ? this.state.verifyCode : null}
                                rightIconStyle={{width: adapeSize(100), height: adapeSize(32)}}/>
                        </View>
                        <View style={commentAlertStyle.buttonsWarp}>
                            <CommenButton buttonStyle={[commentAlertStyle.buttonstyle,{marginRight:adapeSize(10)}, commentAlertStyle.buttonLeft]}
                                          onPress={this.confimClick}
                                          title={"确定"}/>
                            <CommenButton buttonStyle={[commentAlertStyle.buttonstyle,commentAlertStyle.buttonRight]}
                                          onPress={this.cancleClick}
                                          title="取消"/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    //获取图形验证码
    Verifycode = () => {
        this.refs.loginVerifycode.lodingStatus(true);
        let device_code = '';
        if (Platform.OS === 'android') {
            device_code = 'dycd_platform_android';
        } else {
            device_code = 'dycd_platform_ios';
        }
        let maps = {
            device_code: device_code,
        };
        request(AppUrls.IDENTIFYING, 'Post', maps)
            .then((response) => {
                this.refs.loginVerifycode.lodingStatus(false);
                this.imgSrc = response.mjson.data.img_src;
                this.imgSid = response.mjson.data.img_sid;
                this.setState({
                    verifyCode: {uri: this.imgSrc},
                });
            }, (error) => {
                this.refs.loginVerifycode.lodingStatus(false);
                this.setState({
                    verifyCode: null,
                });
                if (error.mycode == -300 || error.mycode == -500) {
                    this.props.showToast("获取失败");
                } else {
                    this.props.showToast(error.mjson.msg + "");
                }
            });
    }
}

export class DDModalAlert extends PureComponent{


	state={
		show:false,
	}

	setModelVisible=(value)=>{

		this.setState({
			show:value
		})
	}

	confimClick=()=>{

		const {confimClick} =this.props;

		confimClick(this.setModelVisible)

	}

	cancleClick=()=>{

		const {cancleClick} =this.props;

		cancleClick(this.setModelVisible)

	}


	render(){


		const {title,subtitle,sureTitle,cancelTitle}=this.props;
		return(

            <Modal animationType='none'
                   transparent={true}
                   visible={this.state.show}
                   onShow={() => {
                   }}
                   onRequestClose={() => {
                   }}
            >
                <TouchableOpacity style={commentAlertStyle.mask} activeOpacity={1} onPress={()=>{
                    dismissKeyboard();
                }}>
                    <View style={commentAlertStyle.container}>
                        <Text allowFontScaling={false}  style={commentAlertStyle.title}>{title}</Text>
                        <Text allowFontScaling={false}  style={commentAlertStyle.subtitle}>{subtitle}</Text>
                        <View style={commentAlertStyle.buttonsWarp}>

                            <CommenButton buttonStyle={[commentAlertStyle.buttonstyle,{marginRight:adapeSize(10)}, commentAlertStyle.buttonLeft]}
                                          onPress={this.confimClick}
                                          title={sureTitle}/>
                            <CommenButton buttonStyle={[commentAlertStyle.buttonstyle,commentAlertStyle.buttonRight]} onPress={this.cancleClick} title={cancelTitle}/>

                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

		)
	}


}

export  class ModalCGD extends PureComponent{


    state={
        show:false,
        selected:behand,
    }

    setModelVisible=(value)=>{

        this.setState({
            show:value
        })
    }

    behandClick=()=>{

        const {getValue}=this.props;
        this.setState({

            selected: behand,
            show:false,
        })

        getValue('2')
    }

    focusClick=()=>{
        const {getValue}=this.props;
        this.setState({

            selected: foncus,
            show:false,
        })
        getValue('1')

    }

    render(){


        return(

            <Modal animationType='none'
                   transparent={true}
                   visible={this.state.show}
                   onShow={() => {
                   }}
                   onRequestClose={() => {
                   }}
            >
                <TouchableOpacity style={lendTypeStyle.mask} activeOpacity={1} onPress={()=>{
                    dismissKeyboard();
                }}>
                    <View style={lendTypeStyle.container}>

                        <TouchableOpacity style={[lendTypeStyle.textWarp,lendTypeStyle.Dividingline] } onPress={this.behandClick}>
                            <Text allowFontScaling={false}  style={[lendTypeStyle.text,this.state.selected===behand&&lendTypeStyle.selcted]}>提档后采购贷</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={lendTypeStyle.textWarp} onPress={this.focusClick}>
                            <Text allowFontScaling={false}  style={[lendTypeStyle.text,this.state.selected===foncus&&lendTypeStyle.selcted]}>提档前采购贷</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        )
    }


}

const lendTypeStyle=StyleSheet.create({

    mask:{

        flex:1,
        justifyContent:'flex-end',
        backgroundColor:'rgba(0,0,0,0.3)',

    },

    container:{

        backgroundColor:'white',
    },

    textWarp:{
        marginBottom:5,
        height:adapeSize(44),
        alignItems:'center',
        justifyContent:'center'
    },
    text:{

        fontSize:adapeSize(14),
    },

    selcted:{
        color:PAGECOLOR.COLORB0
    },


    Dividingline:{

        borderBottomWidth:1,
        borderBottomColor:PAGECOLOR.COLORA4
    }
})

const commentAlertStyle=StyleSheet.create({


    mask:{

        flex:1,
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        alignItems:'center',

    },

    container:{

        backgroundColor:'white',
        alignItems:'center',
        width:adapeSize(260),
        justifyContent:'flex-start',
        borderRadius:5,
        paddingRight:adapeSize(15),
        paddingLeft:adapeSize(15),
    },

    title:{

        marginTop:adapeSize(25),
        fontSize: fontadapeSize(17),
        color:'#000'
    },
    subtitle:{
        marginTop:adapeSize(10),
        fontSize:adapeSize(17),
        color:PAGECOLOR.COLORA1,
        marginLeft:adapeSize(5),
        marginRight:adapeSize(5),
    },
    buttonsWarp:{

        flexDirection:'row',
        marginTop:adapeSize(25),
        alignItems:'center',
    },

    successWarp:{

        flexDirection:'row',
        marginTop:adapeSize(30),
        alignItems:'center',
    },
    buttonstyle:{

        width:adapeSize(100),
        height:adapeSize(44),
        margin:5,
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginBottom:adapeSize(10)
    },

    buttonLeft:{

        backgroundColor:PAGECOLOR.COLORB0

    },
    buttonRight:{

        backgroundColor:PAGECOLOR.COLORA4
    },
    successButton:{

        width:adapeSize(160),
        height:adapeSize(44),
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,

    },


})

const listStyle=StyleSheet.create({


    mask:{

        flex:1,
        justifyContent:'flex-start',
        backgroundColor:'rgba(0,0,0,0.3)',
        alignItems:'center',
        marginTop:64,

    },

    container:{
        backgroundColor:'white',
        width:width,
        height:adapeSize(200),
        justifyContent:'flex-start',
        borderRadius:5,
    },

    title:{

        marginTop:adapeSize(30),
        fontSize:adapeSize(17),
    },
    buttonsWarp:{

        flexDirection:'row',
        marginTop:adapeSize(40),
        alignItems:'center',
    },

    buttonstyle:{

        width:adapeSize(100),
        height:adapeSize(44),
        margin:5,
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
    },
    buttonLeft:{

        backgroundColor:PAGECOLOR.COLORB0

    },
    buttonRight:{

        backgroundColor:PAGECOLOR.COLORA4
    }



})




const styles=StyleSheet.create({

    mask:{
        flex:1,
        alignItems: 'center',
        justifyContent:'flex-start',
        backgroundColor:'rgba(0,0,0,0.3)',
    },
    container:{
        backgroundColor:'white',
        alignItems:'center',
        marginLeft:40,
        marginRight:40,
        marginTop:100,
        borderRadius:3,
    },
    showMessage:{

        marginTop:10,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    showMessageText:{

        flex:1,
        marginLeft:20,
        fontSize:12,
        color:PAGECOLOR.COLORB4,
        paddingLeft:10,

    },
    title:{

        marginTop:20,
        fontSize:17,

    },
    input:{

        borderColor:'darkgray',
        borderWidth:0.5,
        height:44,
        marginLeft:20,
        marginTop:20,
        marginRight:20,
        borderRadius:5,
        flexDirection:'row'

    },
    inputText:{
        flex:1,
        fontSize:12,
        color:PAGECOLOR.COLORB4,
        paddingLeft:10,
    },

    handelWarp:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    button:{
        flex:1,
        alignItems:'center',
        padding:10,
        marginBottom:20,
        borderRadius:3,

    },
    buttonLeft:{
        marginLeft:20,
        marginRight:7,
        backgroundColor:PAGECOLOR.COLORB0,

    },
    buttonRight:{
        marginLeft:7,
        marginRight:20,
        backgroundColor:PAGECOLOR.COLORA2,
    },
    text:{
        textAlign:'center',
        color:'white',
    }
})