/**
 * Created by zhengnan on 2017/11/2.
 */



import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity,
    Dimensions,
    Animated,

} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import * as fontAndColor from '../constant/fontAndColor';
import AllNavigationView   from '../component/AllNavigationView';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();


const specificationData = [{
    title:'中规',
    subData:['全部','国产','合资','进口']
},{
    title:'非中规',
    subData:['全部','美规','墨规','加规','中东版','欧版']
}];

let currentSubData = [];

const SceneWidth = Dimensions.get('window').width;

let selectData={
    title:'',
    subTitle:'',
};

export default class CarSpecificationScene extends BaseComponent{



    _checkedSpecificationClick=(data)=>{
        this.props.checkedSpecification(data);
        this.backPage();
    }


    render(){
        return(
            <View style={styles.rootContainer}>
                <CarSpecificationView checkedSpecification={this._checkedSpecificationClick}/>
                <AllNavigationView title="选择车规" backIconClick={this.backPage}/>
            </View>)
    }





}

export class CarSpecificationView extends Component{

    componentWillMount() {
        selectData={
            title:'',
            subTitle:'',
        };
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const dataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1===r2,
        });
        this.state = {
            dataSource:dataSource.cloneWithRows(specificationData),
            isShowSubSpecification:false,
            currentTitle:this.props.currentTitle,
        };
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <ListView
                    ref="listView"
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    onScroll={() => {
                        if (this.state.isShowCityList) {
                            this.setState({
                                isShowCityList:false,
                            });
                        }}}/>
                {
                    this.state.isShowSubSpecification && (
                        <SubSpecificationView ref="subSpecificationView"
                                              checkedSpecificationClick={()=>{this.props.checkedSpecification(selectData)}}
                        />)
                }
            </View>
        )
    }

    // 每一行中的数据
    renderRow = (rowData) => {
        return (
            <TouchableOpacity onPress={()=>{

                if(selectData.title == rowData.title){return;}

                currentSubData = rowData.subData;
                this.setState({
                    isShowSubSpecification:true,
                    currentTitle:rowData.title,
                    dataSource:this.state.dataSource.cloneWithRows(specificationData)
                });

                selectData.title=rowData.title;
                selectData.subTitle='';

                this.refs.subSpecificationView && this.refs.subSpecificationView.loadData(currentSubData);

            }} activeOpacity={1}>
                <View style={styles.rowCell}>
                    <Text allowFontScaling={false}  style={[styles.rowCellText,this.state.currentTitle==rowData.title && {color:fontAndColor.COLORB0} ]}>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };

}

class SubSpecificationView extends  Component{

    componentDidMount() {

        this.state.valueRight.setValue(SceneWidth);
        Animated.spring(
            this.state.valueRight,
            {
                toValue: SceneWidth * 0.3,
                friction: 5,
            }
        ).start();

        this.loadData(currentSubData);

    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const dataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!==r2,
        });

        this.state = {
            dataSource:dataSource,
            valueRight: new Animated.Value(0),
        };
    }

    loadData=(data)=>{

        this.setState(
            {dataSource:this.state.dataSource.cloneWithRows(data)}
        );
    }
    render(){
        return(
            <Animated.View style={[styles.cityContainer,{left:this.state.valueRight}]}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                          removeClippedSubviews={false}
                          enableEmptySections={true}
                          />
            </Animated.View>
        )
    }
    // 每一行中的数据
    renderRow = (rowData) => {
        return (

            <TouchableOpacity style={styles.rowCell} onPress={()=>{
                if(rowData!='全部'){
                    selectData.subTitle=rowData;
                }
                this.props.checkedSpecificationClick();
            }} activeOpacity={1}>
                <Text allowFontScaling={false}  style={styles.rowCellText}>{rowData}</Text>
            </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({

    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    sectionHeader: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(40),
        justifyContent: 'center'
    },
    sectionText: {
        marginLeft: Pixel.getPixel(15),
        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
    },
    rowCell: {

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    rowCellText: {
        marginLeft: Pixel.getPixel(15),
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
    },
    cityContainer:{
        backgroundColor: 'white',
        top: 0,
        bottom: 0,
        position: 'absolute',
        width: SceneWidth * 0.7,
        borderLeftWidth: 2,
        borderLeftColor: fontAndColor.COLORA3,
    },

});