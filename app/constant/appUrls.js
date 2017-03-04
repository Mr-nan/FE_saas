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
 * 开发地址
 */
// export const BASEURL = 'http://dev.api-gateway.dycd.com/';

/**
 * 测试地址
 */
export const BASEURL = 'http://api-gateway.test.dycd.com/';
/**
 * 预发布地址
 */
//  export const BASEURL = "http://st.open.bms.dycd.com/api/";

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
 * 上传图片
 */
export const INDEX_UPLOAD = BASEURL + V + 'index/upload';

/**
 *属性配置
 */
export const CAR_CONFIG = BASEURL + V + 'car/config';

/**
 * 获取车辆详情
 */
export const CAR_DETAIL = BASEURL + V + 'car/detail';

/**
 * 根据VIN获取车辆详情
 */
export const VININFO = BASEURL + V + 'car/vininfo';

/**
 * 添加&修改车源
 */
export const CAR_SAVE = BASEURL + V +'car/save';

/**
 * 图形验证码
 */
export const IDENTIFYING = BASEURL + V + "index/captcha";// v1/index/captcha

/**
 * 首页数据
 */
export const HOME = BASEURL + V + "home";//

/**
 * 金融转发
 */
export const FINANCE = BASEURL + V + "finance/index";//

/**
 * 收藏列表
 */
export const FAVORITES = BASEURL + V + "user.favorites/index";//

/**
 * 浏览历史
 */
export const USER_HISTORY = BASEURL + V + "user.history/index";//

/**
 * 取消收藏
 */
export const DELETE = BASEURL + V + "user.favorites/delete";//

/**
 * 清空浏览历史
 */
export const USER_HISTORY_DELETE = BASEURL + V + "user.history/delete";//

/**
 * 员工列表
 */
export const USER_EMPLOYE = BASEURL + V + "user.employe/index";

/**
 * from @zhaojian
 *
 * 获取借款主体
**/
export const LOAN_SUBJECT = 'api/v1/user/get_loan_subject_list';

/**
 * from @zhaojian
 *
 * 获取还款列表
 **/
export const REPAYMENT_GETLIST = 'api/v2/Repayment/getList';

/**
 * from @zhaojian
 *
 * 获取还款历史
 **/
export const GETHISTORICALLIST = 'api/v1/Repayment/getHistoricalList';

/**
 * from @zhaojian
 *
 * 获取还款计划列表
 **/
export const GETPLANLIST = 'api/v2/Repayment/getPlanList';

/**
 * from @zhaojian
 *
 * 获取还款计划详情
 **/
export const GETPLANINFO = 'api/v2/Repayment/getPlanInfo';

/**
 * from @zhaojian
 *
 * 获取借款首页数据
 **/
export const GET_MNY = 'api/v3/account/get_mny';


/**
 * from @lhc
 *
 * 获取借款首页数据
 **/
export const GET_APPLY_INFO='api/v3/account/get_apply_info';
/**
 * from @lhc
 *
 * 修改借款金额
 **/
export const SET_APPLY_MNY ='api/v3/account/set_apply_mny'
/**
 * from @lhc
 * 获取订单车辆列表
 **/
export const  GET_APPLY_CARLIST='api/v2/account/get_apply_carlist';

/**
 * from @lhc
 * 获取订单车辆详情
 **/

export const  GET_CAR_INFO='api/v1/account/get_car_info'
/**
 * from @lhc
 * 取消借款单车/库容
 **/
export const CANCEL_LOAN='api/v3/account/cancel_loan'

/**
 * from @zhaojian
 *
 * 获取借款记录
 **/
export const GET_APPLY_LIST = 'api/v3/account/get_apply_list';

/**
 * from @zhaojian
 *
 * 选择借款主体
 **/
export const OPT_LOAN_SUBJECT = 'api/v1/user/opt_loan_subject';

/**
 * from @zhaojian
 *
 * 单车借款信息
 **/
export const GET_APPLY_LOAN_DATA = 'api/v3/account/get_apply_loan_data';

/**
 * from @zhaojian
 *
 * 申请借款
 **/
export const APPLY_LOAN='api/v3/account/apply_loan'

/**
 * 短信验证码
 *
 * device_code    设备码        必填
 * name    文件资源    object    'name' 名可以自定义
 * user_id    可空
 */
export const SEND_SMS = BASEURL + V + "auth/sendSmsCode";

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