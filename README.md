<?php
/*
|--------------------------------------------------------------------------
| 文件概述:字段的含义
|--------------------------------------------------------------------------
|描述: 1.订单状态
|创建人  :chumingdao
|创建时间:17-05-11
|--------------------------------------------------------------------------
*/
//    订单状态
define('ORDERS_CREATE', 0); //创建订单
define('ORDERS_PRICING_DOING', 1);
define('ORDERS_PRICING_FINISH', 2);
define('ORDERS_DEPOSIT_FINISH', 4);
//取消状态
define('CANCEL_NO', 0);
define('CANCEL_DOING', 1);
define('CANCEL_FINISH', 2);
//订单商品状态
define('ORDERS_ITEM_CREATE', 0);
define('ORDERS_ITEM_PRINCING_FINISH', 1);
//支付流水状态
define('PAY_TYPE_DEPOSIT', 1);
define('PAY_TYPE_BALANCE', 2);

return [
    'orders_status'=>[
        0=>'创建订单',
        1=>'订单定价中',
        2=>'订单定价完成',//------------代付定金
        3=>'订金支付中',
        4=>'订金支付失败',
        5=>'订金支付完成',//代付尾款
        6=>'尾款支付中',
        7=>'尾款支付失败',
        8=>'尾款支付完成',//
        9=>'确认验收中',//------------
        10=>'确认验收失败',//-----------
        11=>'确认验收完成',//------------订单完成
        12=>'订单融资处理中',
        13=>'订单融资完成',
        14=>'支付首付款中',
        15=>'支付首付款失败',
        16=>'支付首付款完成',
        17=>'融资单确认验收中',//----
        18=>'融资单确认验收失败',//------------
        19=>'融资单确然验收完成',//------------订单完成
    ],
    /    'buyer_orders_status'=>[
    //        0=>'已拍下',
    //        '1,2'=>'待付定金',
    //        4=>'待付尾款',
    //        6=>'待确定验车',
    //        8=>'订单已完成',
    //    ],
        'buyer_cancel_status'=>[
            '1'=>'申请取消订单中',
        ],
    //    'seller_orders_status'=>[
    //        '0'=>'全部',
    //        '0,1'=>'待确认成交价',
    //        '3,4,5,6,7,8'=>'查看到账',
    //    ],
        'seller_cancel_status'=>[
            '1'=>'处理申请取消订单中',
        ],
        'orders_cancel'=>[
            0 =>'没有申请',
            1 =>'取消订单申请中',//----申请取消中
            2 =>'取消订单处理中',
            3 =>'取消完成',
      ],
      'orders_item_status'=>[
          0 =>'创建订单商品',
          1 =>'订单商品定价中',
          2 =>'订单商品定价完成',
          3 =>'订单商品融资中',
          4 =>'订单商品融资完成',
      ],

      'orders_pay_flows_type'=>[
          0 =>'支付定金',
          1 =>'支付补差价',
          2 =>'支付尾款',



  pledge_type	1库融 2单车 3采购贷4订单融资

  'account_status_api'=>[
      0 =>'未开资金账户',
      1 =>'已开资金账户，未绑卡',
      2 =>'已绑卡，未激活',
      3 =>'已激活',
      4 =>'此账户资金卡状态还不能交易',
  ],

  'account_account_status_api'=>[
      '1' =>'正常',
      '2' =>'资金止付（账户只能流入，不能流出）',
      '3' =>'禁止提现',
      '4' =>'已停用',
      '5' =>'此账户状态不能从事此笔交易',
  ],
  account_status

  account_card_status_error


  StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
                          if (data.code == 1) {
                              let datas = JSON.parse(data.result);
                              console.log(datas);
                              if (datas.user_level>0&&datas.enterprise_list[0].role_type == '1') {
                                  StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (datac) => {
                                      if (datac.code == 1) {
                                          let datasc = JSON.parse(datac.result);
                                          let maps = {
                                              enter_base_ids: datasc.company_base_id,
                                              child_type: '1'
                                          };
                                          request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
                                              .then((response) => {
                                                      lastType = response.mjson.data.account.status;
                                                      console.log('========'+lastType);
                                                      if (lastType == '0') {
                                                          this.refs.accountmodal.changeShowType(true,
                                                              '您还未开通资金账户，为方便您使用金融产品及购物车，' +
                                                              '请尽快开通！', '去开户', '看看再说', () => {
                                                                  this.toPage();
                                                              });
                                                      } else if (lastType == '1') {
                                                          this.refs.accountmodal.changeShowType(true,
                                                              '您的资金账户还未绑定银行卡，为方便您使用金融产品及购物车，请尽快绑定。'
                                                              , '去绑卡', '看看再说', () => {
                                                                  this.toPage();
                                                              });
                                                      } else if (lastType == '2') {
                                                          this.refs.accountmodal.changeShowType(true,
                                                              '您的账户还未激活，为方便您使用金融产品及购物车，请尽快激活。'
                                                              , '去激活', '看看再说', () => {
                                                                  this.toPage();
                                                              });
                                                      }
                                                      firstType = lastType;
                                                  },
                                                  (error) => {

                                                  });
                                      }
                                  });
                              }
                          }
                      });