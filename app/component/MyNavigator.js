import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Navigator,
    TouchableHighlight
} from 'react-native';
var Platform = require('Platform');
// var _navigator;
import RootScene from '../main/RootScene';
// import MainPage from '../main/MainPage';
// import CarInfoScene from '../carSource/CarInfoScene';

// export default class MyNavigator extends Component {
//
//     configureScenceAndroid=()=>{
//         return Navigator.SceneConfigs.FadeAndroid;
//     }
//
//     renderSceneAndroid=(route, navigator)=>{
//         _navigator = navigator;
//         if(route.id === 'RootScene'){
//             return (
//                 <RootScene navigator={navigator} route={route}/>
//             );
//         }
//
//         if(route.id === 'MainPage'){
//             return (
//                 <MainPage navigator={navigator} route={route} />
//             );
//         }
//
//         if(route.id === 'CarInfoScene'){
//             return (
//                 <CarInfoScene navigator={navigator} route={route}/>
//             );
//         }
//         if(route.id === 'viewpager'){
//             return (
//                 <ViewPager navigator={navigator} route={route}/>
//             );
//         }
//         if(route.id === 'userinfo'){
//             return (
//                 <UserInfoView navigator={navigator} route={route}/>
//             );
//         }
//         if(route.id === 'news'){
//             return (
//                 <NewsView navigator={navigator} route={route}/>
//             );
//         }
//
//
//     }
//
//     render(){
//         var renderScene = this.renderSceneAndroid;
//         var configureScence = this.configureScenceAndroid;
//         return (
//             <Navigator
//                 debugOverlay={false}
//                 initialRoute={{ title: 'RootScene', id:'RootScene'}}
//                 configureScence={{ configureScence }}
//                 renderScene={renderScene}
//             />
//         );
//     }
// }


export default class MyNavigator extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{
                    component: RootScene,
                    name: 'rootScene'
                }}
                configureScene={(route) => {
                    if (Platform.OS === 'android') {
                        return Navigator.SceneConfigs.FloatFromBottomAndroid;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    if (route.component) {
                        return <Component {...route.params} navigator={navigator}/>
                    }
                }}>
            </Navigator>
        );
    }
}