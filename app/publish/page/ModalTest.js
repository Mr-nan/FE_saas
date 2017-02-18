/**
 * Created by Administrator on 2017/2/13.
 */
import React,{Component} from 'react'

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import ModelSelect from './ModelSelect';
import DetailAutoPhoto from './DetailAutoPhoto';
import AutoType from './AutoType';
import AutoDate from './AutoDate';
import AutoMileage from './AutoMileage';
import AutoPlate from './AutoPlate';
import AutoEmission from './AutoEmission';
import AutoLabel from './AutoLabel';
import AutoOperation from './AutoOperation';
import AutoColor from './AutoColor';
import AutoTransfer from './AutoTransfer';
import AutoOther from './AutoOther';

import EditIndicator from '../component/EditIndicator';

export default class ModalTest extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <ScrollableTabView
                tabBarPosition='overlayBottom'
                renderTabBar={()=>{return(<EditIndicator/>)}}>

            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1962dd',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});