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
 * 首页数据
 */
export const HOME = BASEURL + V + "home";//

/**
 * 收藏列表
 */
export const FAVORITES = BASEURL + V + "user.favorites/index";//

/**
 * 员工列表
 */
export const USER_EMPLOYE = BASEURL + V + "user.employe/index";

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