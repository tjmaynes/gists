//
//  NSOperationQueue+DataOperationQueue.m
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "NSOperationQueue+DataOperationQueue.h"

static NSOperationQueue *dataOperationQueue;

@implementation NSOperationQueue (DataOperationQueue)

+ (instancetype)dataOperationQueue {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        dataOperationQueue = [[self alloc] init];
        dataOperationQueue.maxConcurrentOperationCount = 4;
    });
    return dataOperationQueue;
}

@end
