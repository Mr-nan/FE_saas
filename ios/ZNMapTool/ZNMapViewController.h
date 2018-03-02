//
//  ViewController.h
//  百度地图
//
//  Created by zhengnan on 2017/10/19.
//  Copyright © 2017年 zhengnan. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>

@interface ZNMapViewController : UIViewController

@property (nonatomic,strong) NSString *cityName;
@property (nonatomic,strong) NSString *addressName;
@property (nonatomic,assign) CLLocationCoordinate2D pt;

@property (nonatomic,strong) void(^mapPoiInfoBlock)(NSDictionary *poiInfo);

@end

