//
//  ViewController.m
//  百度地图
//
//  Created by zhengnan on 2017/10/19.
//  Copyright © 2017年 zhengnan. All rights reserved.
//

#import "ZNMapViewController.h"
#import "UIView+Additions.h"
#import <BaiduMapAPI_Base/BMKBaseComponent.h>//引入base相关所有的头文件
#import <BaiduMapAPI_Map/BMKMapComponent.h>//引入地图功能所有的头文件
#import <BaiduMapAPI_Search/BMKSearchComponent.h>//引入检索功能所有的头文件
#import <BaiduMapAPI_Cloud/BMKCloudSearchComponent.h>//引入云检索功能所有的头文件
#import <BaiduMapAPI_Location/BMKLocationComponent.h>//引入定位功能所有的头文件
#import <BaiduMapAPI_Utils/BMKUtilsComponent.h>//引入计算工具所有的头文件
#import <BaiduMapAPI_Radar/BMKRadarComponent.h>//引入周边雷达功能所有的头文件
#import <BaiduMapAPI_Map/BMKMapView.h>//只引入所需的单个头文件
#import "ZNMapSearchViewController.h"

@interface ZNMapViewController ()<BMKLocationServiceDelegate,BMKMapViewDelegate,BMKGeoCodeSearchDelegate,BMKSuggestionSearchDelegate,UITextFieldDelegate,UITableViewDelegate,UITableViewDataSource>

@property (nonatomic,strong) UIView *headView;
@property (nonatomic,strong) BMKMapView *mapView;
@property (nonatomic,strong) BMKLocationService *locService;
@property (nonatomic,strong) BMKGeoCodeSearch *geoSearch;
@property (nonatomic,strong) BMKSuggestionSearch *sugSearch;
@property (nonatomic,strong) BMKPoiInfo  *selectBMKPoiInfo;
@property (nonatomic,strong) NSArray *dataArray;
@property (nonatomic,strong) UITableView *contenView;
@property (nonatomic,strong) UIButton    *geocodeBtn;
@end

@implementation ZNMapViewController{
  BOOL _isAutoMove;
  
}

- (void)viewDidLoad {
  [super viewDidLoad];
  [self setNavigation];
  [self.view addSubview:self.headView];
  [self addMapView];
  [self.view addSubview:self.contenView];
  [self.locService startUserLocationService];
}

-(void)viewWillAppear:(BOOL)animated{
  [super viewWillAppear:animated];
  [self.mapView viewWillAppear];
  
  self.mapView.delegate = self;
  self.geoSearch.delegate = self;
  self.sugSearch.delegate = self;
  [self geoCodeActionCity:self.cityName Address:self.addressName];

//  if(_pt.longitude == 0){
//    [self geoCodeActionCity:self.cityName Address:self.addressName];
//  }else{
//    [self.mapView setCenterCoordinate:CLLocationCoordinate2DMake(12.12300000, 123.44400000) animated:YES];
//  }
  
//      [self.mapView setCenterCoordinate:CLLocationCoordinate2DMake(38.38851506, 115.33146813) animated:YES];


  
  
}

-(void)viewWillDisappear:(BOOL)animated{
  [super viewWillDisappear:animated];
  [self.mapView viewWillDisappear];
  self.mapView.delegate = nil;
  self.geoSearch.delegate = nil;
  self.sugSearch.delegate = nil;
}

-(void)searchClick{
  
  ZNMapSearchViewController *mapSearchVC = [[ZNMapSearchViewController alloc]init];
  mapSearchVC.title = @"搜索地址";
  mapSearchVC.cityName = self.cityName;
  mapSearchVC.mapPoiInfoBlock = self.mapPoiInfoBlock;
  [self.navigationController pushViewController:mapSearchVC animated:YES];
  
}

-(void)addMapView{
  self.mapView = [[BMKMapView alloc]initWithFrame:CGRectMake(0, self.headView.bottom, self.view.width, 220)];
  [self.view addSubview:self.mapView];
  
  self.mapView.showsUserLocation = YES; // 显示定位图层
  self.mapView.userTrackingMode = BMKUserTrackingModeNone; // 设置定位的状态为普通模式
  self.mapView.zoomLevel = 16; // 地图显示的级别
  
  UIButton *loactionBtn = [[UIButton alloc]init];
  UIImage *image = [UIImage imageNamed:@"gpers_icon"];
  [loactionBtn setImage:image forState:UIControlStateNormal];
  loactionBtn.frame = CGRectMake((self.mapView.width - image.size.width)/2, (self.mapView.height - image.size.width)/2, image.size.width, image.size.height);
  [self.mapView addSubview:loactionBtn];
  
}

-(void)navigationLeftBtnClick{
  [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)navigationRightBtnClick{
  
  self.mapPoiInfoBlock(@{@"name":self.selectBMKPoiInfo.name,@"address":self.selectBMKPoiInfo.address,@"location":@{@"latitude":[NSString stringWithFormat:@"%lf",self.selectBMKPoiInfo.pt.latitude],@"longitude":[NSString stringWithFormat:@"%lf",self.selectBMKPoiInfo.pt.longitude]}});
  [self navigationLeftBtnClick];
}

#pragma mrak -地理编码(将地址转坐标)

-(void)geoCodeActionCity:(NSString *)city Address:(NSString *)address{
  BMKGeoCodeSearchOption *geoCodeSearchOption = [[BMKGeoCodeSearchOption alloc]init];
  geoCodeSearchOption.city = city;
  geoCodeSearchOption.address = address;
  BOOL flag = [self.geoSearch geoCode:geoCodeSearchOption];
  if(flag){
    NSLog(@"geo检索发送成功");
  }else{
    NSLog(@"geo检索发送失败");
  }
}

#pragma mrak -反地理编码（将坐标转地址）

-(void)reverseGeoCodeAction:(CLLocationCoordinate2D)pt{
  
  BMKReverseGeoCodeOption *reverseGeoCodeSearchOption = [[BMKReverseGeoCodeOption alloc]init];
  reverseGeoCodeSearchOption.reverseGeoPoint = pt;
  BOOL flag = [self.geoSearch reverseGeoCode:reverseGeoCodeSearchOption];
  if(flag){
    NSLog(@"反geo检索发送成功");
    
  }else{
    NSLog(@"反geo检索发送失败");
  }
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
  return self.dataArray.count;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
  UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"cell"];
  if(!cell){
    cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"cell"];
  }
  
  BMKPoiInfo *info =self.dataArray[indexPath.row];
  cell.textLabel.text = info.name;
  cell.detailTextLabel.text = info.address;
  if([self.selectBMKPoiInfo.name isEqualToString:info.name]){
    cell.accessoryType = UITableViewCellAccessoryCheckmark;
  }else{
    cell.accessoryType = UITableViewCellAccessoryNone;
  }
  return cell;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
  _isAutoMove = YES;
  BMKPoiInfo *info = self.dataArray[indexPath.row];
  self.selectBMKPoiInfo = info;
  [self.contenView reloadData];
  [self.mapView setCenterCoordinate:info.pt animated:YES];
  
}

#pragma mark - BMKMapViewDelegate

- (void)mapView:(BMKMapView *)mapView regionDidChangeAnimated:(BOOL)animated
{
  BMKCoordinateRegion region;
  CLLocationCoordinate2D centerCoordinate = mapView.region.center;
  region.center = centerCoordinate;
  _pt = centerCoordinate;
  NSLog(@" regionDidChangeAnimated %f,%f",centerCoordinate.latitude, centerCoordinate.longitude);
  [self reverseGeoCodeAction:region.center];
  
}

#pragma mark - BMKLocationServiceDelegate -处理位置坐标更新
-(void)didUpdateBMKUserLocation:(BMKUserLocation *)userLocation{
  [self.mapView updateLocationData:userLocation]; // 更新地图上的位置
}

#pragma mark - BMKGeoCodeSearchDelegate
-(void)onGetReverseGeoCodeResult:(BMKGeoCodeSearch *)searcher result:(BMKReverseGeoCodeResult *)result errorCode:(BMKSearchErrorCode)error
{
  if(error == BMK_SEARCH_NO_ERROR){
    if(_isAutoMove == NO){
      NSMutableArray *tmpArray = [NSMutableArray arrayWithArray:result.poiList];
      self.selectBMKPoiInfo = [tmpArray firstObject];
      self.dataArray = [NSArray arrayWithArray:tmpArray];
      [self.contenView reloadData];
      
    }else{
      _isAutoMove = NO;
    }
    
  }else{
    NSLog(@"抱歉，未找到结果");
  }
}

-(void)onGetGeoCodeResult:(BMKGeoCodeSearch *)searcher result:(BMKGeoCodeResult *)result errorCode:(BMKSearchErrorCode)error
{

  if(error == BMK_SEARCH_NO_ERROR){
    _pt = result.location;
    [self reverseGeoCodeAction:_pt];
    [self.mapView setCenterCoordinate:_pt animated:YES];
  }else{
    NSLog(@"未找到结果");
  }
}

#pragma mark -BMKSuggestionSearchDelegate
-(void)onGetSuggestionResult:(BMKSuggestionSearch *)searcher result:(BMKSuggestionResult *)result errorCode:(BMKSearchErrorCode)error
{
  if(error == BMK_SEARCH_NO_ERROR){
    
  }else{
    NSLog(@"未找到结果");
  }
}

-(void)setNavigation{
  self.navigationController.navigationBar.barTintColor = [UIColor colorWithRed:0.02f green:0.77f blue:0.76f alpha:1.00f];
  self.navigationController.navigationBar.translucent = NO;
  self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
  self.navigationController.navigationBar.titleTextAttributes = @{NSFontAttributeName:[UIFont boldSystemFontOfSize:17],NSForegroundColorAttributeName:[UIColor whiteColor]};
  self.title = @"添加地址";
  self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc]initWithImage:[UIImage imageNamed:@"navigatorBack"] style:UIBarButtonItemStyleDone target:self action:@selector(navigationLeftBtnClick)];
  UIButton *doneBtn = [[UIButton alloc]initWithFrame:CGRectMake(0, 0, 100, 40)];
  [doneBtn setTitle:@"确定" forState:UIControlStateNormal];
  [doneBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  doneBtn.titleLabel.font = [UIFont systemFontOfSize:17];
  doneBtn.contentHorizontalAlignment = UIControlContentHorizontalAlignmentRight;
  [doneBtn addTarget:self action:@selector(navigationRightBtnClick) forControlEvents:UIControlEventTouchUpInside];
  self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc]initWithCustomView:doneBtn];
}

-(UIView *)headView{
  if(_headView == nil){
    
    _headView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, self.view.width, 44)];
    _headView.backgroundColor = [UIColor colorWithRed:0.94f green:0.93f blue:0.96f alpha:1.00f];
    
    UIView *searchView = [[UIView alloc]initWithFrame:CGRectMake(30, 6, self.view.width - 60, 30)];
    searchView.backgroundColor = [UIColor whiteColor];
    searchView.layer.cornerRadius = 15;
    [_headView addSubview:searchView];
    
    UITapGestureRecognizer *gesture = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(searchClick)];
    [_headView addGestureRecognizer:gesture];
    
    UIImage *image = [UIImage imageNamed:@"sousuoicon"];
    
    UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake((searchView.width-100)/2+image.size.width, 0, 100, 30)];
    label.text = @"请输入关键字";
    label.font = [UIFont fontWithName:@"PingFangSC-Regular" size:14];
    label.textColor = [UIColor colorWithRed:204/255.0 green:204/255.0 blue:204/255.0 alpha:1/1.0];
    [searchView addSubview:label];
    
    UIImageView *imageView = [[UIImageView alloc]initWithImage:image];
    imageView.frame = CGRectMake(-image.size.width-5, (label.height - image.size.height)/2, image.size.width, image.size.height);
    [label addSubview:imageView];
  }
  return _headView;
}

-(UITableView *)contenView{
  if(_contenView==nil){
    _contenView = [[UITableView alloc]initWithFrame:CGRectMake(0, self.mapView.bottom, self.view.width, self.view.height - self.mapView.bottom-64)style:UITableViewStylePlain];
    _contenView.delegate = self;
    _contenView.dataSource = self;
    
  }
  return _contenView;
}


-(BMKLocationService *)locService{
  if(_locService == nil){
    _locService = [[BMKLocationService alloc]init];
    _locService.delegate = self;
  }
  return _locService;
}

-(BMKGeoCodeSearch *)geoSearch{
  if(_geoSearch == nil){
    _geoSearch = [[BMKGeoCodeSearch alloc]init];
  }
  return _geoSearch;
}

-(BMKSuggestionSearch *)sugSearch{
  if(_sugSearch == nil){
    _sugSearch = [[BMKSuggestionSearch alloc]init];
  }return _sugSearch;
}

-(NSArray *)dataArray{
  if(_dataArray == nil){
    _dataArray = [NSArray array];
  }
  return _dataArray;
}

@end

