#订单模块字段含义

'orders_status'=>[
        0=>'创建订单',
        1=>'订单订价中',
        2=>'订单订价完成',//------------代付订金
        3=>'订金支付中',
        4=>'订金支付失败',
        5=>'订金支付完成',//代付尾款
        6=>'尾款支付中',
        7=>'尾款支付失败',
        8=>'尾款支付完成',//
        9=>'质押车辆提前还款中',//------------
        90=>'质押车辆提前还款失败',//------------
        91=>'质押车辆提前还款成功',//------------
        10=>'确认验收圈提失败',//-----------
        11=>'确认验收完成',//------------订单完成
        12=>'订单融资处理中',
        13=>'订单融资完成',
        14=>'支付首付款中',
        15=>'支付首付款失败',
        16=>'支付首付款完成',            //--1
        160=>'支付首付款完成',           //--2
        17=>'融资单放款发起成功',        //--3
        18=>'融资单放款发起失败',        //--2
        19=>'融资单放款成功',            //--3
        20=>'融资单放款失败',            //--3
        21=>'融资单质押车辆提前还款中',    //--3
        22=>'融资单质押车辆提前还款失败',  //--3
        23=>'融资单质押车辆提前还款成功',  //--3
        24=>'融资单确认验收失败',         //--3
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


pledge_type   1库融 2单车 3采购贷4订单融资

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


return [
     'orders_status'=>[
         0=>'创建订单',
         1=>'订单订价中',
         2=>'订单订价完成',
         3=>'订金支付中',
         4=>'订金支付失败',
         5=>'订金支付完成',//代付尾款
         6=>'尾款支付中',
         7=>'尾款支付失败',
         8=>'尾款支付完成',//
         9=>'质押车辆提前还款中',//------------
         90=>'质押车辆提前还款失败',//------------
         91=>'质押车辆提前还款成功',//------------
         10=>'确认验收圈提失败',//-----------
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

return [
    'orders_status'=>[
        0=>'创建订单',
        1=>'订单订价中',
        2=>'订单订价完成',//------------代付订金
        3=>'订金支付中',
        4=>'订金支付失败',
        5=>'订金支付完成',//代付尾款
        6=>'尾款支付中',
        7=>'尾款支付失败',
        8=>'尾款支付完成',//
        9=>'质押车辆提前还款中',//------------
        90=>'质押车辆提前还款失败',//------------
        91=>'质押车辆提前还款成功',//------------
        10=>'确认验收圈提失败',//-----------
        11=>'确认验收完成',//------------订单完成
        12=>'订单融资处理中',
        13=>'订单融资完成',
        14=>'支付首付款中',
        15=>'支付首付款失败',
        16=>'支付首付款完成',            //--1
        160=>'支付首付款完成',           //--2
        17=>'融资单放款发起成功',        //--3
        18=>'融资单放款发起失败',        //--2
        19=>'融资单放款成功',            //--3
        20=>'融资单放款失败',            //--3
        21=>'融资单质押车辆提前还款中',    //--3
        22=>'融资单质押车辆提前还款失败',  //--3
        23=>'融资单质押车辆提前还款成功',  //--3
        24=>'融资单确认验收失败',         //--3
        200=>'待付全款',
        201=>'全款支付中',
        202=>'全款支付失败',
        203=>'全款支付完成',
        50=>'鼎城代付中',
        51=>'线下支付中',
    ],
最大贷款额度  ['car_finance_data']['max_loanmny']


    订单数据里：
    cancel_side为：1买家 2卖家 3系统后台
    cancel_is_agree  1卖家同意 2卖家不同意 0后台强制取消

    refund_data为退款单数据
    is_who：1为买家，2为卖家
    status：退款状态：0创建 1处理中 2 退款完成
    done_back_deposit_amount 已退定金
    done_back_balance_amount 已退余款
    done_back_seller_add_amount  已退补差价款
    done_back_firstpay_amount  已退首付款

    下面两个按钮是这样：
    cancel_is_agree==2  && is_who==1 && status==2
    cancel_is_agree==2  && is_who==2 && status==2

    卖家同意： cancel_is_agree == 1
    退买家：  (cancel_is_agree == 0 || cancel_is_agree == 2) && refund_data.is_who == 1 && refund_data.status == 2
    退卖家：  (cancel_is_agree == 0 || cancel_is_agree == 2) && refund_data.is_who == 2 && refund_data.status == 2
    卖家不同意：cancel_is_agree == 2

   {
       "roleList":[
           "taskPGS",
           "taskZBY",
           "taskManager",
           "taskYYZY",
           "taskZJL",
           "taskRemind",
           "taskTenure",
           "taskDC"
       ],
       "accountMobile":"15102373842"
   }

                "contentTypes":[
                            "taskPGS",
                            "taskZBY",
                            "taskManager",
                            "taskYYZY",
                            "taskZJL",
                            "taskRemind",
                            "taskTenure",
                            "taskDC"
                            ]

    'DEPOSIT_NONE' =>array('code'=>'6350139','msg'=>'订金金额不能为空！'),
    'PRICING_AMOUNT_NONE' =>array('code'=>'6350140','msg'=>'成交金额不能为空！'),
    'AMOUNT_EQUAL_LESS_0' =>array('code'=>'6350141','msg'=>'金额不能小于等于0！'),
    'PRICING_AMOUNT_NOT_HUNDREDS' =>array('code'=>'6350142','msg'=>'交易金额必须为整百倍数！'),
    'DEPOSIT_AMOUNT_NOT_HUNDREDS' =>array('code'=>'6350143','msg'=>'订金金额必须为整百倍数！'),
    'DEPOSIT_AMOUNT_MORE' =>array('code'=>'6350144','msg'=>'订金已超出最大金额！'),

    200=>'待付全款',
    201=>'全款支付中',
    202=>'全款支付失败',
    203=>'全款支付完成',

    无订金单子:
    totalpay_amount>0

     'orders_status'=>[
            0=>'创建订单',
            1=>'订单订价中',
            2=>'订单订价完成',  200=>'待付全款',
            3=>'订金支付中',    201=>'全款支付中',
            4=>'订金支付失败',  202=>'全款支付失败',
            5=>'订金支付完成',  203=>'全款支付完成',
            50=>'鼎城代付中',
            51=>'线下支付中',
            6=>'尾款支付中',
            7=>'尾款支付失败',
            8=>'尾款支付完成',
            9=>'质押车辆提前还款中',
            90=>'质押车辆提前还款失败',
            91=>'质押车辆提前还款成功',
            10=>'确认验收圈提失败',
            11=>'确认验收完成',
            12=>'订单融资处理中',
            13=>'订单融资完成',
            14=>'支付首付款中',
            15=>'支付首付款失败',
            16=>'支付首付款完成',
            160=>'支付首付款完成贷款审核完成',
            17=>'融资单放款发起成功',
            18=>'融资单放款发起失败',
            19=>'融资单放款成功',
            20=>'融资单放款失败',
            21=>'融资单质押车辆提前还款中',
            22=>'融资单质押车辆提前还款失败',
            23=>'融资单质押车辆提前还款成功',
            24=>'融资单圈提失败',
        ],
        'trans_status'=>[
            1 =>'填写完',
            100 =>'支付运单中',
            101 =>'支付运单失败',
            2 =>'支付运单成功生成运单',
            200 =>'支付运单成功生成运单失败',
            30 =>'待发运',
            3 =>'发运',
            4 =>'到店',
            5 =>'到库',
            6 =>'申请提车函',
            7 =>'申请提车函支付中',
            8 =>'申请提车函支付失败',
            9 =>'申请提车函支付完成',
            11 =>'终结',
            10 =>'申请转单车',
            12 =>'申请转单车支付中',
            13 =>'申请转单车支付失败',
            14 =>'申请转单车支付成功生成运单',
            15 =>'申请转单车支付成功生成运单失败',
        ],

        logistics_type    0自提 1全款到店 2融资到店 3融资到库 4库到店
            'trans_status'=>[
                1 =>'填写完',
                100 =>'支付运单中',
                101 =>'支付运单失败',
                2 =>'支付运单成功',
                200 =>'支付运单成功生成运单失败',
                201 =>'支付运单成功生成运单成功',
                30 =>'审核成功待发',
                31 =>'审核失败待发',
                3 =>'发运',
                4 =>'到店',
                5 =>'到库',
                6 =>'申请提车函',
                7 =>'申请提车函支付中',
                8 =>'申请提车函支付失败',
                9 =>'申请提车函支付完成',
                11 =>'终结',
                10 =>'申请转单车',
                12 =>'申请转单车支付中',
                13 =>'申请转单车支付失败',
                14 =>'申请转单车支付成功',
                15 =>'申请转单车支付成功生成运单失败',
                16 =>'申请转单车支付成功生成运单成功',
            ],


    'orders_pay_flows_status'=>[
        1 =>'支付成功',
        2 =>'支付失败',
        3 =>'支付处理中',
        4 =>'支付关闭',
        5 =>'支付撤销',
        6 =>'未知',
    ],

    orders_item_data 中的 is_store  是否在店 0没有申请 1申请中 2驳回 3同意


    运单流转：
    非融资
    1 =>'填写完', -> 2 =>'支付运单成功生成运单', -> 3 =>'发运', -> 11 =>'终结',

    融资
    到店 1 =>'填写完', -> 2 =>'支付运单成功生成运单', -> 3 =>'发运', -> 11 =>'终结',
    到库 1 =>'填写完', -> 2 =>'支付运单成功生成运单', -> 3 =>'发运', -> 5 =>'到库', -> 6 =>'申请提车函', -> 11 =>'终结',
                                                                               -> 10 =>'申请转单车', -> 11 =>'终结',