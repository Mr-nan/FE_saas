                                                                                                                                                                                                                                                                                                                                                                                                               /**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <React/RCTRootView.h>
#import "RCTLinkingManager.h"
#import <React/RCTBundleURLProvider.h>
#import <AdSupport/AdSupport.h>
#import "sys/utsname.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
 NSURL *jsCodeLocation;

   
#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else



    jsCodeLocation = [CodePush bundleURL];
#endif
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSString  *idfaStr = [[ASIdentifierManager sharedManager]advertisingIdentifier].UUIDString;
  NSString* phoneVersion = [[UIDevice currentDevice] systemVersion];
  struct utsname systemInfo;
  uname(&systemInfo);
  NSString* phoneModel = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];;
  NSString *appVersion = [infoDictionary objectForKey:@"CFBundleShortVersionString"];

  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"FE_Sass"
                                               initialProperties:@{@"IDFA":idfaStr,
                                                                   @"phoneVersion":phoneVersion,
                                                                   @"phoneModel":phoneModel,
                                                                   @"appVersion":appVersion}
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
  
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
  
}

@end
