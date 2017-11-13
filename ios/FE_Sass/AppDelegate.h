/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>

#import <BaiduMapAPI_Map/BMKMapView.h>//只引入所需的单个头文件
//#import "Baidu_SDK/BaiduMapAPI_Map.framework/Headers/BMKMapView.h"//为了自动化打包，我才这么写的，不然就用上面的  //#import <BaiduMapAPI_Map/BMKMapView.h>//只引入所需的单个头文件


@interface AppDelegate : UIResponder <UIApplicationDelegate>
{
  BMKMapManager* _mapManager;
}
@property (nonatomic, strong) UIWindow *window;

@end
