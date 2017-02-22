/**
 * 开发地址
 */
// export const BASEURL = "http://dev.open.bms.dycd.com/api/";

/**
 * 正式地址
 */
//export const BASEURL = "https://openbms.dycd.com/api/";

/**
 * 测试地址
 */
// export const BASEURL = "https://qaopenbms.dycd.com/api/";

/**
 * 测试地址
 */
export const BASEURL = 'http://dev.api-gateway.dycd.com/';

/**
 * 预发布地址
 */
//    export const BASEURL = "http://st.open.bms.dycd.com/api/";

/**
 * 版本号1
 */
export const V = "v1/";

/**
 * 版本号2
 */
export const V2 = "v2/";

/**
 * 版本号3
 */
export const V3 = "v3/";


/**
 * 图形验证码
 */
export const IDENTIFYING = BASEURL + V + "index/captcha";// v1/index/captcha

/**
 * 短信验证码
 *
 * device_code    设备码        必填
 * name    文件资源    object    'name' 名可以自定义
 * user_id    可空
 */
export const SEND_SMS = BASEURL + V + "auth/sendSmsCode";

/**
 * 验证手机号是否有密码
 */
export const NUMBERHASPWD = BASEURL + V + "user/chk_init_pwd";

/**
 * 登录
 *
 *code    短信验证码【必填】    string
 *device_code    设备识别码【必填】    string
 *img_code    图片验证码【必填】    string
 *phone    手机号【必填】    string
 *pwd    密码【必填】
 */
export const LOGIN = BASEURL + V + "auth/login";// auth/login

/**
 * 注册
 code             短信验证码【必填】          number
 confirm_pwd      确认密码【必填】            string
 device_code      设备代号【必填】            string
 idcard_img       身份证照片上传id【必填】     string
 license_img      营业执照照片上传id【必填】   string
 merchant_name    商户名称【必填】            string
 phone            手机号【必填】              string
 pwd              密码【必填】               string
 user_name        用户姓名【必填】            string
 */
export const REGISTER = BASEURL + V + "auth/register";//  auth/register

/**
 * 设置密码
 *
 * token=
 * device_code=
 * confirm_pwd    确认密码【必填】    string
 * pwd    密码【必填】
 */
export const SETPWD = BASEURL + V + "user/setPwd";

/**
 * 修改密码
 *
 * 变量名    含义    类型    备注
 * code    短信验证码【必填】    number
 * confirm_pwd    确认密码【必填】    string
 * phone    用户手机号【必填】    number
 * pwd
 */
export const CHANGEPWD = BASEURL + V + "user/resetPwd";
/**
 * 注册，图片上传
 */
export const AUTH_UPLOAD_FILE = BASEURL + V + "auth/upload";
/**
 * 申诉
 */
export const APPEAL = BASEURL + V + "user/appeal";

/**
 * 通过其他方式登录
 */
export const OTHER = BASEURL + V + "user/chk_phone_code";

/**
 * 获取授信金额和可贷金额
 */
export const GET_MNY = BASEURL + V3 + "account/get_mny";

/**
 * 获取借款记录
 */
export const GET_APPLY = BASEURL + V3
    + "account/get_apply_list";

/**
 * 获取申请借款数据
 */
export const GET_APPLY_LOAN_DATA = BASEURL + V3
    + "account/get_apply_loan_data";

/**
 * 获取信用贷申请借款数据
 */
export const GET_BMS_CREDITLOAN_DATA = BASEURL + V
    + "Account/get_bms_creditloan_data";

/**
 * 申请借款
 */
export const APPLY_LOAN = BASEURL + V3 + "account/apply_loan";

/**
 * 申请信用贷借款
 */
export const CREDITLOAN_APPLY = BASEURL + V + "Account/creditloan_apply";

/**
 * 获取借款详情
 */
export const APPLY_INFO = BASEURL + V3
    + "account/get_apply_info";

/**
 * 获取借款车辆列表
 */
export const APPLY_CARLIST = BASEURL + V2
    + "account/get_apply_carlist";

/**
 * 续授信发送短信
 */
export const SEND_SMS_MANAGER = BASEURL + V
    + "user/send_sms_manager";

/**
 * 续授信日志记录
 */
export const LOG_ADD = BASEURL + V + "log/add";

/**
 * 调整借款额度
 */
export const SET_APPLY_MNY = BASEURL + V3
    + "account/set_apply_mny";

/**
 * 获取车辆详情
 */
export const GET_CAR_INFO = BASEURL + V
    + "account/get_car_info";

/**
 * 获取合同数据
 */
export const GET_CONTRACT_DATA = BASEURL + V
    + "account/get_contract_data";

/**
 * 取消借款
 */
export const CANCEL_LOAN = BASEURL + V3
    + "account/cancel_loan";

/**
 * 信用贷取消借款
 */
export const CREDITLOAN_CANCEL = BASEURL + V
    + "Account/creditloan_cancel";

/**
 * 签署合同
 */
export const CONTRACT_SIGN = BASEURL + V
    + "account/contract_sign";

/**
 * 我的首页数据
 */
export const GET_INFO = BASEURL + V3 + "my/get_info";

/**
 * 还款首页列表
 */
export const REPAYMENT_GETLIST = BASEURL + V2
    + "Repayment/getList";

/**
 * 还款详情
 */
export const REPAYMENT_GETINFO = BASEURL + V2
    + "Repayment/getInfo";

/**
 * 还款计划列表
 */
export const REPAYMENT_GETPLANLIST = BASEURL + V2
    + "Repayment/getPlanList";

/**
 * 个人信息
 */
export const GET_USER_INFO = BASEURL + V3 + "My/get_user_info";

/**
 * 收款信息
 */
export const GET_RECEIVABLES_INFO = BASEURL + V3
    + "My/get_receivables_info";

/**
 * 车辆列表
 */
export const CAR_GETLIST = BASEURL + V + "Car/getList";

/**
 * 车品牌列表
 */
export const GERBRANDLIST = BASEURL + V + "Car/gerBrandList";

/**
 * 车系列表
 */
export const GETSERIESLIST = BASEURL + V
    + "Car/getSeriesList";

/**
 * 车系列表
 */
export const GETMODELLIST = BASEURL + V + "Car/getModelList";

/**
 * 还款计划详情
 */
export const REPAYMENT_GETPLANINFO = BASEURL + V2
    + "Repayment/getPlanInfo";

/**
 * 上传头像
 */
export const UPLOADHEADPORTRAIT = BASEURL + V
    + "My/UploadHeadPortrait";

/**
 * 历史列表
 */
export const GETHISTORICALLIST = BASEURL + V
    + "Repayment/getHistoricalList";

/**
 * APP更新
 */
export const APP_UPDATE = BASEURL + V + "App/Update";

/**
 * 申请展期
 */
export const DO_EXTENSION = BASEURL + V
    + "account/do_extension";

/**
 * 展期车辆列表
 */
export const EXTENSION_CARLIST = BASEURL + V
    + "account/apply_extension_carlist";

/**
 * 申请还款
 */
export const APPLYREPAYMENT = BASEURL + V
    + "Repayment/applyRepayment";

/**
 * 查看合同
 */
export const EXTENSION_CONTRACT = BASEURL + V3
    + "account/extension_contract";

/**
 * 闪屏界面节日效果
 */
export const START_UP_IMG = BASEURL + V
    + "user/start_up_img";

/**
 * 信用贷申请提前还款
 */
export const CREDIT_APPLY_REPAYMENT = BASEURL + V
    + "Repayment/credit_apply_repayment";

/**
 * 用户优惠券
 */
export const GET_LOTTER_LIST = "https://market.dycd" +
    ".com/home/prizeapi/get_lotter_list.html";

/**
 * 优惠券规则
 */
export const GET_PRIZE_RULE = "https://market.dycd" +
    ".com/home/prizeapi/get_prize_rule.html";


/**
 * 库容还款详情
 */
export const GETONLINEINFO = BASEURL + V2
    + "Repayment/getOnlineInfo";

/**
 * 库容调整详情
 */
export const GETADJUSTINFO = BASEURL + V2
    + "Repayment/getAdjustInfo";

/**
 * 获取当前版本详情
 */
export const APPINFO = BASEURL + V
    + "App/info";

/**
 * 获取车源推广列表
 */
export const APPEXTENSION_LIST = BASEURL + V
    + "app/extension_list";

/**
 * 获取首页推广
 */
export const STARTUP = BASEURL + V
    + "app/start_up";

/**
 * 获取城市列表
 */
export const CITYGET_LIST = BASEURL + V
    + "city/get_list";

/**
 * 获取商户登记人/收车人列表
 */
export const PURCHASELOANBUSINESS_GETBUSINESSLIST = BASEURL + V
    + "purchaseloanBusiness/getBusinessList";

/**
 * 获取采购贷照片分类
 */
export const AUTO_GETPURCHAAUTOPICCATE = BASEURL + V
    + "purchaAuto/getPurchaAutoPicCate";

/**
 * 图片上传公共方法
 */
export const UPLOAD_FILE = BASEURL + V + "upload/file";

/**
 * 通过baiducode匹配城市数据
 */
export const CITY_GET_DATA_FOR_BAIDU_CITY_CODE = BASEURL + V
    + "city/get_data_for_baidu_city_code";

/**
 * 通过车架号判断车辆是否存在
 */
export const PURCHAAUTO_CHECKVIN = BASEURL + V
    + "purchaAuto/checkVin";

/**
 * 获取借款进度列表
 */
export const GET_PAYMENT_SCHEDULE = BASEURL + V
    + "account/get_payment_schedule";

/**
 * 采购贷车辆列表
 */
export const GET_PURCHASE_AUTO_LIST = BASEURL + V
    + "purchaAuto/autoList";

/**
 * 确认金额
 */
export const CONFIRM_AMOUNT = BASEURL + V3
    + "account/confirm_amount";

/**
 * 申请采购贷获取车辆列表
 */
export const PURCHAAUTO_AUTOLIST = BASEURL + V
    + "purchaAuto/autoList";

/**
 * 添加采购贷车辆
 */
export const PURCHAAUTO_ADDAUTO = BASEURL + V
    + "purchaAuto/addAuto";

/**
 * 删除采购贷车辆
 */
export const PURCHAAUTO_DELETEAUTO = BASEURL + V
    + "purchaAuto/deleteAuto";

/**
 * 获取采购贷车辆详情
 */
export const PURCHAAUTO_AUTODETAIL = BASEURL + V
    + "purchaAuto/autoDetail";

/**
 * 更新采购贷车辆
 */
export const PURCHAAUTO_UPDATEAUTO = BASEURL + V
    + "purchaAuto/updateAuto";

/**
 * 获取支付凭证照片
 */
export const PURCHASEPAYMENT_GET_PAYMENT = BASEURL + V
    + "Purchasepayment/get_payment";

/**
 * 根据车架号检测OBD设备
 */
export const AUTODETECTOBD = BASEURL + V
    + "purchaAuto/autoDetectObd";

/**
 * 根据info_id获取车辆详情
 */
export const AUTODETAIL = BASEURL + V
    + "purchaAuto/autoDetail";

/**
 * 上传支付凭证
 */
export const ADD_PAYMENT = BASEURL + V
    + "Purchasepayment/add_payment";

/**
 * 上传采购贷车辆提档资料
 */
export const UPLOADMENTIONDATA = BASEURL + V
    + "purchaAuto/uploadMentionData";

/**
 * 采购贷车辆绑定OBD设备
 */
export const PURCHAAUTO_BINDOBD = BASEURL + V
    + "purchaAuto/bindObd";

/**
 * OBD安装说明
 */
export const PURCHAAUTO_OBD_DESC = BASEURL +
    "obd_installation.html";