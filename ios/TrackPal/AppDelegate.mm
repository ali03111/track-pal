#import "AppDelegate.h"
#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>
#import <Firebase.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <RNGoogleSignin/RNGoogleSignin.h>
#import <React/RCTBundleURLProvider.h>
#import <RaxelPulse/RaxelPulse.h>
#import <FBSDKCoreKit/FBSDKCoreKit-swift.h> // <- Add This Import
#import <React/RCTLinkingManager.h> // <- Add This Import

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [GMSServices provideAPIKey:@"AIzaSyBlHyVz90xxc4lkp-1jGq68Ypmgnw4WCFE"]; // add this line using the api key obtained from Google Console
  [RPEntry initializeWithRequestingPermissions:NO];
  [RPEntry application:application didFinishLaunchingWithOptions:launchOptions];
  self.moduleName = @"TrackPal";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(nonnull NSString *)identifier completionHandler:(nonnull void (^)(void))completionHandler {
    [RPEntry application:application handleEventsForBackgroundURLSession:identifier completionHandler:completionHandler];
}

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
    [RPEntry applicationDidReceiveMemoryWarning:application];
}

- (void)applicationWillTerminate:(UIApplication *)application {
    [RPEntry applicationWillTerminate:application];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    [RPEntry applicationDidEnterBackground:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    [RPEntry applicationDidBecomeActive:application];
}

- (void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    [RPEntry application:application performFetchWithCompletionHandler:^{
        completionHandler(UIBackgroundFetchResultNewData);
    }];
}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}


@end
