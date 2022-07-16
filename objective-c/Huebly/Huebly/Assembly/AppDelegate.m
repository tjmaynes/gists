//
//  AppDelegate.m
//  Huebly
//
//  Created by TJ Maynes on 4/16/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "AppDelegate.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];

    self.rootViewController = [[TMDependencyInjection sharedInstance] rootViewController];

    UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:self.rootViewController];
    self.window.rootViewController = navigationController;

    [self.window makeKeyAndVisible];

    return YES;
}

- (void)applicationWillTerminate:(UIApplication *)application {
    NSError *error = nil;
    [[[TMDependencyInjection sharedInstance] persistenceStack] save:&error];
}

@end
