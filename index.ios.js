/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    AppRegistry,
} from 'react-native';

import Root from './app/root';
import GfOpenPersonalCountScene from './app/mine/accountManage/guangfa_account/open_count/GfOpenPersonalCountScene';
import GfOpenCompanyCountScene from './app/mine/accountManage/guangfa_account/open_count/GfOpenCompanyCountScene';
import ACCountManageScene from './app/mine/accountManage/guangfa_account/count_detail/ACCountManageScene';
import AuthenticatePublicScene from './app/mine/accountManage/guangfa_account/count_detail/AuthenticatePublicScene';
import IndexAccountmanageScene from './app/mine/accountManage/guangfa_account/count_detail/IndexAccountmanageScene';
import GFRechargeScene from './app/mine/accountManage/guangfa_account/count_detail/GFRechargeScene';
import WithDrawDepositTipComponent from './app/mine/accountManage/guangfa_account/component/WithDrawDepositTipComponent'
import BankCardScene from './app/mine/accountManage/guangfa_account/count_detail/BankcardScene';
import AddBankcardMessageComponent from './app/mine/accountManage/guangfa_account/component/AddBankcardMessageComponent';
import AccountSettingScene from './app/mine/accountManage/guangfa_account/count_detail/AccountSettingScene';
import CancelAccountScene from './app/mine/accountManage/guangfa_account/count_detail/CancelAccountScene';
import NoAccountScene from './app/mine/accountManage/guangfa_account/count_detail/NoAccountScene';
import WattingTenScendsScene from './app/mine/accountManage/guangfa_account/count_detail/WattingTenScendsScene'
import WithdrawDepositScene from './app/mine/accountManage/guangfa_account/count_detail/WithdrawDepositScene';
import SmallAmountofPawerScene from './app/mine/accountManage/guangfa_account/count_detail/SmallAmountofPawerScene';
AppRegistry.registerComponent('FE_Sass', () => Root);


