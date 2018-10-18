/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    AppRegistry,
} from 'react-native';

import Root from './app/root';
import OpenPersonalCountScene from './app/mine/accountManage/guangfa_account/open_count/OpenPersonalCountScene';
import OpenCompanyCountScene from './app/mine/accountManage/guangfa_account/open_count/OpenCompanyCountScene';
AppRegistry.registerComponent('FE_Sass', () => OpenCompanyCountScene);


