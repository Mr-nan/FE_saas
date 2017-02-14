/**
 * Created by zhengnan on 17/2/9.
 */

import React,{Component} from 'react';

import {
    StyleSheet,
    ListView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,

} from 'react-native';

import * as fontAndColor from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';
import HeadView     from './znComponent/CarSourceSelectHeadView';
import SGListView   from 'react-native-sglistview';
import CarCell      from './znComponent/CarCell';
import CarInfoScene from './CarInfoScene';

const carAgeSource = [
    {
        title:'1年以内' ,
        checked:false,
    },
    {
        title:'3年以内' ,
        checked:false,
    },
    {
        title:'5年以内' ,
        checked:false,
    },
    {
        title:'8年以内' ,
        checked:false,
    },
    {
        title:'10年以内' ,
        checked:false,
    },

];

const carKMSource = [
    {
        title:'不限',
        checked:false,
    },
    {
        title:'1万公里以内',
        checked:false,
    },
    {
        title:'3万公里以内' ,
        checked:false,
    },
    {
        title:'5万公里以内' ,
        checked:false,
    },
    {
        title:'10万公里以内' ,
        checked:false,
    },
    {
        title:'10万公里以上',
        checked:false,
    },

];

const sequencingDataSource = [

    {
        title:'最新发布',

    },
    {
        title:'里程少',
        checked:false,
    },
    {
        title:'车龄短' ,
        checked:false,
    },
];

export  default  class  carSourceListScene extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id });

        this.state = {

            dataSource:carSource.cloneWithRows(['h1','h2','h3','h4','h5','h6','h6']),
            checkedSource:carAgeSource,
            isHide:true,
            isHideSequencing:true,
            currentCheckedIndex:1,
            sequencingType:'',
            checkedCarType:'',
            checkedCarAgeType:'',
            checkedCarKMType:'',

        };

    }

    initFinish=()=>{

    };

    //  筛选条件选择
    _headViewOnPres = (index,isHighlighted,setImgHighlighted)=> {


        if(index===1) return;

        this.refs.headView.checkSelect(this.state.currentCheckedIndex); // 取消之前选择按钮状态

        let {checkedSource} = this.state;
        if(!isHighlighted)
        {
            switch(index) {
                case 1:

                    break;
                case 2:
                    checkedSource = carAgeSource;
                    break;
                case 3:
                    checkedSource = carKMSource;
                    break;
                default:
                    break;
            }
        }

        this.setState({

            checkedSource,
            isHide:isHighlighted,
            currentCheckedIndex: index,
        });

        setImgHighlighted(!isHighlighted); // 回调按钮状态

    };

    _sequencingClick=()=>{
        this.setState({
            sequencingType:'',
        });

    };
    _carTypeClick=()=>{
        this.setState({
            checkedCarType:'',
        });

    };
    _carAgeClick=()=>{
        this.setState({
            checkedCarAgeType:'',
        });
    };
    _carKMClick=()=>{
        this.setState({
            checkedCarKMType:'',
        });
    };
    _allDelectClick=()=>{
        this.setState({
            sequencingType:'',
            checkedCarType:'',
            checkedCarAgeType:'',
            checkedCarKMType:'',
        });

    };

    _showSequencingView=()=>{

        this.setState({
            isHideSequencing:false,
        });

    };

    _hideSequencingView=()=>{

        this.setState({
            isHideSequencing:true,
        });
    };

    _sequencingCheckedClick=(title)=>{
        this.setState({
            sequencingType:title,
        });
    };

navigatorParams={
    name:"CarInfoScene",
    component:CarInfoScene,
    params:{

    }
}
    _onPres = (str)=>{

this.toNextPage(this.navigatorParams);
    };

    render(){
        return(

            <View style={styles.contaier}>
                <View style={styles.contaier}>
                    <View style={{top:0,height:64,backgroundColor:'#22C4C1'}}/>
                    <View style={{height:40}}>
                        <HeadView ref="headView" onPres={this._headViewOnPres}/>
                    </View>
                    {
                        (this.state.checkedCarKMType || this.state.checkedCarAgeType || this.state.checkedCarType || this.state.sequencingType)?
                            ( <CheckedContentView
                                sequencingType={this.state.sequencingType}
                                carType={this.state.checkedCarType}
                                carAge={this.state.checkedCarAgeType}
                                carKM={this.state.checkedCarKMType}
                                sequencingClick={this._sequencingClick}
                                carTypeClick={this._carTypeClick}
                                carAgeClick={this._carAgeClick}
                                carKMClick={this._carKMClick}
                                allDelectClick={this._allDelectClick}
                            />):(null)
                    }

                    <SGListView
                        dataSource={this.state.dataSource}
                        ref={'carListView'}
                        initialListSize={10}
                        stickyHeaderIndices={[]}
                        onEndReachedThreshold={1}
                        scrollRenderAheadDistance={1}
                        pageSize={1}
                        renderRow={(item) =>
                            <CarCell style={styles.carCell} carMainText={item} carSubText="奔驰E300L" onPress={this._onPres}/>
                        }/>
                </View>
                <SequencingButton buttonClick={this._showSequencingView}/>
                {
                    this.state.isHideSequencing ?(null):(<SequencingView checkedType={this.state.sequencingType} checkedClick={this._sequencingCheckedClick} hideClick={this._hideSequencingView}/>)
                }
                {

                    this.state.isHide ?(null):(
                        <View style={styles.selectView}>

                            <View style={{backgroundColor:'white'}}>
                                <ScrollView>
                                    {
                                        this.state.checkedSource.map((data,index)=>{
                                            return(
                                                <TouchableOpacity  key={index} onPress={()=>{

                                                    this.refs.headView.checkSelect(this.state.currentCheckedIndex);

                                                    let {checkedCarAgeType,checkedCarKMType} = this.state;

                                                    if(this.state.currentCheckedIndex == 2)
                                                    {
                                                        checkedCarAgeType = this.state.checkedSource[index].title;

                                                    }
                                                    if (this.state.currentCheckedIndex == 3)
                                                    {
                                                        checkedCarKMType = this.state.checkedSource[index].title
                                                    }

                                                    this.setState({

                                                        checkedCarAgeType,
                                                        checkedCarKMType,
                                                        isHide:true,

                                                    });

                                                }}>
                                                    <View style={styles.checkedCell} >

                                                        {
                                                            this.state.currentCheckedIndex == 2 ? (
                                                                <Text  style={[styles.checkedCellText,data.title==this.state.checkedCarAgeType && {color:fontAndColor.COLORB0}]} >{data.title}</Text>
                                                            ) : (
                                                                <Text  style={[styles.checkedCellText,data.title==this.state.checkedCarKMType && {color:fontAndColor.COLORB0}]} >{data.title}</Text>
                                                            )
                                                        }

                                                    </View>
                                                </TouchableOpacity>

                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styles.contaier} onPress={()=>{
                                this.refs.headView.checkSelect(this.state.currentCheckedIndex);
                                this.setState({
                                    isHide:true,
                                });
                            }}>
                            </TouchableOpacity>

                        </View>)
                }
            </View>

        )

    }
}


class CheckedContentView extends  Component {

    render() {
        const {sequencingType,carType,carAge,carKM,sequencingClick,carTypeClick,carAgeClick,carKMClick,allDelectClick} = this.props;
        return (

            <View style={styles.checkedContentView}>
                {
                    sequencingType?(
                        <TouchableOpacity onPress={sequencingClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{sequencingType}</Text>
                                <Image style={styles.checkedDeleteImg}/>
                            </View>
                        </TouchableOpacity>):(null)

                }
                {
                    carType?(
                        <TouchableOpacity onPress={carTypeClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{carType}</Text>
                                <Image style={styles.checkedDeleteImg}/>
                            </View>
                        </TouchableOpacity>):(null)

                }
                {
                    carAge?(
                        <TouchableOpacity onPress={carAgeClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{carAge}</Text>
                                <Image style={styles.checkedDeleteImg}/>
                            </View>
                        </TouchableOpacity>):(null)
                }
                {
                    carKM?(
                        <TouchableOpacity onPress={carKMClick}>
                            <View style={styles.checkedContentItem}>
                                <Text style={styles.checkedItemText}>{carKM}</Text>
                                <Image style={styles.checkedDeleteImg}/>
                            </View>
                        </TouchableOpacity>):(null)
                }


                <TouchableOpacity onPress={allDelectClick}>
                    <View style={styles.checkedDelectView}>
                        <Text style={styles.checkedDelectText}>清空</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

}

class SequencingButton extends  Component{

    render(){

        const {buttonClick} = this.props;
        return(
            <TouchableOpacity onPress={buttonClick}>
                <View style={styles.sequencingButton}>
                    <Image  source={require('../../images/carSourceImages/sort@2x.png')}/>
                    <Text style={styles.sequencingText}>排序</Text>
                </View>
            </TouchableOpacity>
        )
    }

}

class SequencingView extends Component{

    render(){
        const {checkedType,checkedClick,hideClick}=this.props;

        return(
            <View style={styles.SeqencingView}>
                <TouchableOpacity style={styles.contaier} onPress={hideClick}>
                </TouchableOpacity>
                <View style={{backgroundColor:'white'}}>
                    <ScrollView>
                        {
                            sequencingDataSource.map((data,index)=>{

                                return(
                                    <TouchableOpacity  key={index} onPress={()=>{

                                       checkedClick(data.title);
                                        hideClick();

                                    }}>
                                        <View style={styles.checkedCell}>
                                            {
                                                <Text style={[styles.checkedCellText,data.title == checkedType && {color:fontAndColor.COLORB0}]} >{data.title}</Text>
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>

            </View>
        )
    }
}



const styles = StyleSheet.create({

    contaier:{
        flex:1,
    },
    checkedContentView:{

        backgroundColor:fontAndColor.COLORA3,
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'space-between',
        flexWrap: 'wrap',
    },

    checkedContentItem:{

        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:20,
        paddingHorizontal:5,
        marginLeft:15,
        marginRight:5,
        marginTop:10,
        marginBottom:10,
        borderRadius:4,
    },
    checkedItemText:{
        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.CONTENTFONT,

    },
    checkedDeleteImg:{

        width:15,
        height:15,
        marginLeft:5,
        backgroundColor:fontAndColor.COLORA2,
    },
    checkedDelectView:{

        height:20,
        width:50,
        borderRadius:4,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:fontAndColor.COLORA2,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        marginLeft:15,
        marginTop:10,


    },
    checkedDelectText:{
        color:fontAndColor.COLORA2,
        fontSize:fontAndColor.CONTENTFONT,

    },
    selectView:{
        top:104,
        backgroundColor:'rgba(0, 0, 0,0.3)',
        left:0,
        right:0,
        position:'absolute',
        bottom:0,
    },
    carCell:{
        height :110,
    },
    checkedCell:{

        backgroundColor:'white',
        height:44,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:fontAndColor.COLORA4,

    },
    checkedCellText:{

        fontSize:fontAndColor.BUTTONFONT,
        textAlign:'center',
        color:fontAndColor.COLORA0,

    },

    sequencingButton:{

        flexDirection:'row',
        position:'absolute',
        width:70,
        height:30,
        right:20,
        borderRadius:15,
        backgroundColor:'rgba(0, 0, 0,0.7)',
        justifyContent:'center',
        alignItems:'center',
        bottom:70,
    },
    sequencingText:{

        color:'white',
        fontSize:fontAndColor.LITTLEFONT,
        marginLeft:5,

    },

    SeqencingView:{

        position:'absolute',
        backgroundColor:'rgba(0, 0, 0,0.3)',
        justifyContent:'flex-end',
        top:0,
        right:0,
        bottom:0,
        left:0,

    },

});