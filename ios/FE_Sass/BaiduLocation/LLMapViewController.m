

#import "LLMapViewController.h"


#define isIOS(version) ([[UIDevice currentDevice].systemVersion floatValue] >= version)

@interface LLMapViewController ()<BMKGeoCodeSearchDelegate,BMKLocationServiceDelegate,CLLocationManagerDelegate>{
    BMKLocationService  *_locService;        //定位
    BMKGeoCodeSearch    *_geocodesearch;     //地理编码主类，用来查询、返回结果信息
    NSString            *_cityName;          //定位城市名称
    NSArray<BMKPoiInfo *> *_resultPoiInfos;
    NSArray<BMKPoiInfo *> *_searchPoiInfos;
    BMKPoiInfo          *_poiInfo;
    BMKGeoCodeSearch  *_searcher;
    UIAlertController *AV;
}

/** 定位结果block对象 */
@property (nonatomic, copy) LocateResultInfoBlock locationBlock;

/** 定位管理者 */
@property (nonatomic, strong) CLLocationManager *locationManager;
@end

@implementation LLMapViewController
//单例对象
single_implementation(LLMapViewController)


#pragma mark - 懒加载
-(CLLocationManager *)locationManager{
  if (_locationManager == nil) {
    _locationManager = [[CLLocationManager alloc] init];
    [_locationManager setDelegate:self];
    if (isIOS(8)) {
      //在此处请求授权
      //1.获取项目配置->plist文件
      NSDictionary *infoPlistDict = [[NSBundle mainBundle] infoDictionary];
      //2.获取当前项目中的定位权限设置
      NSString *always = [infoPlistDict objectForKey:@"NSLocationAlwaysUsageDescription"];
      NSString *whenInUse = [infoPlistDict objectForKey:@"NSLocationWhenInUseUsageDescription"];
      //如果开发者设置后台定位模式->
      if (always.length > 0) {
        [_locationManager requestAlwaysAuthorization];
      }else if (whenInUse.length > 0){
        [_locationManager requestWhenInUseAuthorization];
        // 在前台定位授权状态下, 必须勾选后台模式location udpates才能获取用户位置信息
        NSArray *services = [infoPlistDict objectForKey:@"UIBackgroundModes"];
        if (![services containsObject:@"location"]) {
          NSLog(@"友情提示: 当前状态是前台定位授权状态, 如果想要在后台获取用户位置信息, 必须勾选后台模式 location updates");
        }else{
          if (isIOS(9.0)) {
            _locationManager.allowsBackgroundLocationUpdates = YES;
          }
        }
      }else{
        NSLog(@"错误---如果在iOS8.0之后定位, 必须在info.plist, 配置NSLocationWhenInUseUsageDescription 或者 NSLocationAlwaysUsageDescription");
      }
    }
  }
  return _locationManager;
}

/**
 *  直接通过代码块获取用户位置信息
 *
 *  @param block 定位block代码块
 */
-(void)getCurrentLocation:(LocateResultInfoBlock )block onViewController:(UIViewController *)viewController{
  //记录代码块
  self.locationBlock = block;
  //定位更新频率->
  [self.locationManager setDistanceFilter:100];
  //判断当前定位权限->进而开始定位
  [self startLocationOnViewController:viewController];
}

//定位
-(void)startLocationOnViewController:(UIViewController *)viewController{
  
  //初始化BMKLocationService
  _locService = [[BMKLocationService alloc]init];
  _locService.delegate = self;
  _locService.desiredAccuracy = kCLLocationAccuracyNearestTenMeters;
  
  //启动LocationService
  [_locService startUserLocationService];
  
  _geocodesearch = [[BMKGeoCodeSearch alloc] init];
  _geocodesearch.delegate = self;
  _searcher =[[BMKGeoCodeSearch alloc]init];
  _searcher.delegate = self;
  
  
  if (![CLLocationManager locationServicesEnabled]) {
    NSLog(@"定位服务当前可能尚未打开，请设置打开！");
    dispatch_async(dispatch_get_main_queue(), ^{
      AV = [UIAlertController alertControllerWithTitle:@"提示" message:@"定位服务当前可能尚未打开，请设置打开！" preferredStyle:UIAlertControllerStyleAlert];
//      [AV addAction:[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil]];
      [AV addAction:[UIAlertAction actionWithTitle:@"去开启" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
        if ([[UIApplication sharedApplication] canOpenURL:url]) {
          [[UIApplication sharedApplication] openURL: url];
        }
        //启动LocationService
        [_locService startUserLocationService];
      }]];
      [viewController presentViewController:AV animated:YES completion:nil];
    });
    return;
  }
  //如果没有授权则请求用户授权
  if ([CLLocationManager authorizationStatus]==kCLAuthorizationStatusNotDetermined){
    [_locationManager requestWhenInUseAuthorization];
    //启动跟踪定位
    [_locationManager startUpdatingLocation];
  }else if([CLLocationManager authorizationStatus]==kCLAuthorizationStatusAuthorizedWhenInUse || [CLLocationManager authorizationStatus]==kCLAuthorizationStatusAuthorizedAlways ){
    //启动跟踪定位
    //启动LocationService
    [_locService startUserLocationService];
  }else{
    // 跳转核心代码
    dispatch_async(dispatch_get_main_queue(), ^{
      AV = [UIAlertController alertControllerWithTitle:@"提示" message:@"定位服务当前可能尚未打开，请设置打开！" preferredStyle:UIAlertControllerStyleAlert];
//      [AV addAction:[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil]];
      [AV addAction:[UIAlertAction actionWithTitle:@"去开启" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
        if ([[UIApplication sharedApplication] canOpenURL:url]) {
          [[UIApplication sharedApplication] openURL: url];
        }
        //启动LocationService
        [_locService startUserLocationService];
      }]];
      [viewController presentViewController:AV animated:YES completion:nil];
    });
  }
}

#pragma mark - 百度获取定位后相关代理

- (void)didUpdateBMKUserLocation:(BMKUserLocation *)userLocation{

    [_locService stopUserLocationService];
    
    //初始化检索对象
    CLLocationCoordinate2D pt = userLocation.location.coordinate;
    BMKReverseGeoCodeOption *reverseGeoCodeSearchOption = [[BMKReverseGeoCodeOption alloc]init];
    reverseGeoCodeSearchOption.reverseGeoPoint = pt;
    BOOL flag = [_searcher reverseGeoCode:reverseGeoCodeSearchOption];

    if(flag)
    {
        NSLog(@"反geo检索发送成功");
    }
    else
    {
        NSLog(@"反geo检索发送失败");
    }

}

///地理反编码的delegate
-(void)onGetReverseGeoCodeResult:(BMKGeoCodeSearch *)searcher result:(BMKReverseGeoCodeResult *)result errorCode:(BMKSearchErrorCode)error {
  if (error == BMK_SEARCH_NO_ERROR) {
    //result  拥有的属性字段
    /*
     ///层次化地址信息
     @property (nonatomic, strong) BMKAddressComponent* addressDetail;
     ///地址名称
     @property (nonatomic, strong) NSString* address;
     ///商圈名称
     @property (nonatomic, strong) NSString* businessCircle;
     ///结合当前位置POI的语义化结果描述
     @property (nonatomic, strong) NSString* sematicDescription;
     ///城市编码
     @property (nonatomic, strong) NSString* cityCode;
     ///地址坐标
     @property (nonatomic) CLLocationCoordinate2D location;
     ///地址周边POI信息，成员类型为BMKPoiInfo
     @property (nonatomic, strong) NSArray* poiList;
     */
    
    
    
    //addressDetail  拥有的属性字段
    /*
     /// 街道号码
     @property (nonatomic, strong) NSString* streetNumber;
     /// 街道名称
     @property (nonatomic, strong) NSString* streetName;
     /// 区县名称
     @property (nonatomic, strong) NSString* district;
     /// 城市名称
     @property (nonatomic, strong) NSString* city;
     /// 省份名称
     @property (nonatomic, strong) NSString* province;
     /// 国家
     @property (nonatomic, strong) NSString* country;
     /// 国家代码
     @property (nonatomic, strong) NSString* countryCode;
     /// 行政区域编码
     @property (nonatomic, strong) NSString* adCode;
     */

    /*
     address  详细地址
     area_id  地区ID
     area_name  地区名字
     city_id  市区id
     city_name  市区名字
     code  短信验证码    【必填】
     confirm_pwd  确认密码    【必填】
     device_code      【必填】
     invi_code  注册邀请码
     merchant_name  商户名称    【必填】
     phone  手机号    【必填】
     province_id  定位省ID
     province_name  省名
     pwd  密码    【必填】
     street_id  街道id
     street_name  街道名称
     user_name
     */
    
    NSDictionary *dict = @{
                           @"address":result.address,
                           @"city_id":result.cityCode,
                           @"city_name":result.addressDetail.city,
                           @"street_name":result.addressDetail.streetName,
                           @"province_name":result.addressDetail.province,
                           @"area_name":result.addressDetail.district,

                           
                           };

    self.locationBlock(dict,nil);
  }
  else {
    NSLog(@"抱歉，未找到结果");
    self.locationBlock(nil,@"error");

  }

     [self reset];

}


- (void)reset {
  _geocodesearch.delegate = nil;
  _locService.delegate = nil;
  _searcher.delegate = nil;
  _locationManager.delegate = nil;

}

-(void)dealloc{
  
  
}

@end
