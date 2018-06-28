//
//  ZNMapSearchViewController.m
//  百度地图
//
//  Created by zhengnan on 2018/1/9.
//  Copyright © 2018年 zhengnan. All rights reserved.
//

#import "ZNMapSearchViewController.h"
#import <BaiduMapAPI_Base/BMKBaseComponent.h>//引入base相关所有的头文件
#import <BaiduMapAPI_Map/BMKMapComponent.h>//引入地图功能所有的头文件
#import <BaiduMapAPI_Search/BMKSearchComponent.h>//引入检索功能所有的头文件
#import <BaiduMapAPI_Map/BMKMapView.h>//只引入所需的单个头文件
#import "UIView+Additions.h"
#import "MBProgressHUD.h"
@interface ZNMapSearchViewController ()<UITextFieldDelegate,UITableViewDelegate,UITableViewDataSource,BMKPoiSearchDelegate>

@property (nonatomic,strong) UIView *searchView;
@property (nonatomic,strong) UITableView *addressView;
@property (nonatomic,strong) UITextField *searchField;
@property (nonatomic,strong) NSMutableArray *addressData;
@property (nonatomic,strong) BMKPoiSearch *poiSearch;
@property (nonatomic,strong) BMKPoiInfo   *selectBMKPoiInfo;
@end

@implementation ZNMapSearchViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  [self setNavigation];
  self.view.backgroundColor = [UIColor whiteColor];
  [self.view addSubview:self.searchView];
  [self.view addSubview:self.addressView];
}

-(void)viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];
  self.poiSearch.delegate = self;
  
}

-(void)viewWillDisappear:(BOOL)animated
{
  [super viewWillDisappear:animated];
  self.poiSearch.delegate = nil;
}


- (void)textFieldDidChange:(UITextField *)textField
{
  if(textField.text.length >0){
    [self searchPoiCityName:self.cityName PageIndex:1 Keyword:textField.text];
  }
}

-(void)searchPoiCityName:(NSString *)cityName PageIndex:(int)pageIndex Keyword:(NSString *)keyword{
  BMKCitySearchOption *citySearchOption = [[BMKCitySearchOption alloc]init];
  citySearchOption.pageIndex = pageIndex;
  citySearchOption.pageCapacity = 50;
  citySearchOption.city = self.cityName;
  citySearchOption.keyword = keyword;
  
  
  BOOL flag = [self.poiSearch poiSearchInCity:citySearchOption];
  if(flag){
    
  }else{
    [self.addressData removeAllObjects];
    [self.addressView reloadData];
  }
}

-(void)onGetPoiResult:(BMKPoiSearch *)searcher result:(BMKPoiResult *)poiResult errorCode:(BMKSearchErrorCode)errorCode{
  if(errorCode == BMK_SEARCH_NO_ERROR){
    [self.addressData addObjectsFromArray:poiResult.poiInfoList];
    [self.addressView reloadData];
  }else{
    [self.addressData removeAllObjects];
    [self.addressView reloadData];
  }
}

-(void)setNavigation{
  self.title = @"搜索地址";
  self.navigationController.navigationBar.barTintColor = [UIColor colorWithRed:0.02f green:0.77f blue:0.76f alpha:1.00f];
  self.navigationController.navigationBar.translucent = NO;
  self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
  self.navigationController.navigationBar.titleTextAttributes = @{NSFontAttributeName:[UIFont boldSystemFontOfSize:17],NSForegroundColorAttributeName:[UIColor whiteColor]};
  self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc]initWithImage:[UIImage imageNamed:@"navigatorBack"] style:UIBarButtonItemStyleDone target:self action:@selector(navigationLeftBtnClick)];

}

-(void)navigationLeftBtnClick{
  [self.navigationController popViewControllerAnimated:YES];
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
  return self.addressData.count;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
  UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"cell"];
  if(!cell){
    cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"cell"];
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
  }
  BMKPoiInfo *info = self.addressData[indexPath.row];
  cell.textLabel.attributedText = [self setAttrbutedText:info.name GoalText:self.searchField.text GoalColor:[UIColor redColor]];
  cell.detailTextLabel.attributedText= [self setAttrbutedText:info.address GoalText:self.searchField.text GoalColor:[UIColor redColor]];
  if([self.selectBMKPoiInfo.name isEqualToString:info.name]){
    cell.accessoryType = UITableViewCellAccessoryCheckmark;
  }else{
    cell.accessoryType = UITableViewCellAccessoryNone;
  }
  return cell;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
  BMKPoiInfo *info = self.addressData[indexPath.row];
  self.selectBMKPoiInfo = info;
  self.mapPoiInfoBlock(@{@"name":self.selectBMKPoiInfo.name,@"address":self.selectBMKPoiInfo.address,@"location":@{@"latitude":[NSString stringWithFormat:@"%lf",self.selectBMKPoiInfo.pt.latitude],@"longitude":[NSString stringWithFormat:@"%lf",self.selectBMKPoiInfo.pt.longitude]}});
  [self dismissViewControllerAnimated:YES completion:nil];
  
}

-(NSAttributedString *)setAttrbutedText:(NSString *)text GoalText:(NSString *)goalText GoalColor:(UIColor *)goalColor{
  NSMutableAttributedString *attributedStr = [[NSMutableAttributedString alloc]initWithString:text];
  NSDictionary *dict =@{NSForegroundColorAttributeName:goalColor};
  if(text.length<=0 || goalText.length<=0)
  {
    return attributedStr;
    
  }
  [attributedStr setAttributes:dict range:[text rangeOfString:goalText]];
  return attributedStr;
}

-(void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
  [self.view endEditing:YES];
}

-(UIView *)searchView
{
  if(!_searchView){
    _searchView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, self.view.width, 44)];
    _searchView.backgroundColor = [UIColor colorWithRed:0.94f green:0.93f blue:0.96f alpha:1.00f];
    
    CGFloat cityLabelX = [self.cityName sizeWithAttributes:@{NSFontAttributeName:[UIFont fontWithName:@"PingFangSC-Regular" size:18]}].width+5;
    
    UILabel *cityLabel = [[UILabel alloc]initWithFrame:CGRectMake(15, 0, cityLabelX, _searchView.height)];
    cityLabel.font =[UIFont fontWithName:@"PingFangSC-Regular" size:14];
    cityLabel.text = self.cityName;
    [_searchView addSubview:cityLabel];
    self.searchField.frame = CGRectMake(cityLabel.right,(_searchView.height - 30)/2, _searchView.width - cityLabel.right - 15, 30);
    [_searchView addSubview:self.searchField];
    
  }
  return _searchView;
}

-(UITableView *)addressView
{
  if(!_addressView){
    _addressView = [[UITableView alloc]initWithFrame:CGRectMake(0, self.searchView.bottom, self.view.width, self.view.height - self.searchView.bottom-64) style:UITableViewStylePlain];
    _addressView.delegate = self;
    _addressView.dataSource = self;
  }
  return _addressView;
}

-(UITextField *)searchField
{
  if(!_searchField){
    _searchField = [[UITextField alloc] init];
    _searchField.placeholder = @"  请输入关键字";
    _searchField.delegate = self;
    _searchField.backgroundColor = [UIColor whiteColor];
    [_searchField addTarget:self action:@selector(textFieldDidChange:) forControlEvents:UIControlEventEditingChanged];
    _searchField.font = [UIFont fontWithName:@"PingFangSC-Regular" size:14];
  }
  return _searchField;
  
}

-(NSArray *)addressData
{
  if(!_addressData){
    _addressData = [NSMutableArray array];
  }
  return _addressData;
}
-(BMKPoiSearch *)poiSearch
{
  if(!_poiSearch){
    _poiSearch = [[BMKPoiSearch alloc]init];
  }
  return _poiSearch;
}

@end

