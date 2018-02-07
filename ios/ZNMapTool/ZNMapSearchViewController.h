//
//  ZNMapSearchViewController.h
//  百度地图
//
//  Created by zhengnan on 2018/1/9.
//  Copyright © 2018年 zhengnan. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>


@interface ZNMapSearchViewController : UIViewController

@property (nonatomic,strong) NSString *cityName;
@property (nonatomic,strong) void(^mapPoiInfoBlock)(NSDictionary *poiInfo);


@end
