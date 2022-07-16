//
//  TMOperation.m
//  Huebly
//
//  Created by TJ Maynes on 9/21/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMOperation.h"

@interface TMOperation ()

@property (nonatomic, getter = isFinished, readwrite)  BOOL finished;
@property (nonatomic, getter = isExecuting, readwrite) BOOL executing;

@end

@implementation TMOperation

@synthesize finished  = _finished;
@synthesize executing = _executing;

- (id)init {
    self = [super init];
    if (self) {
        _finished  = NO;
        _executing = NO;
    }
    return self;
}

- (void)start {
    if (self.isCancelled) {
        self.finished = YES;
        return;
    }

    self.executing = YES;

    [self main];
}

- (void)finish {
    if (self.isExecuting) {
        self.executing = NO;
        self.finished = YES;
    }
}

- (void)completeOperation {
    self.executing = NO;
    self.finished  = YES;
}

#pragma mark - NSOperation methods

- (BOOL)isAsynchronous {
    return YES;
}

- (BOOL)isExecuting {
    @synchronized(self) {
        return _executing;
    }
}

- (BOOL)isFinished {
    @synchronized(self) {
        return _finished;
    }
}

- (void)setExecuting:(BOOL)executing {
    if (_executing != executing) {
        [self willChangeValueForKey:@"isExecuting"];
        @synchronized(self) {
            _executing = executing;
        }
        [self didChangeValueForKey:@"isExecuting"];
    }
}

- (void)setFinished:(BOOL)finished {
    if (_finished != finished) {
        [self willChangeValueForKey:@"isFinished"];
        @synchronized(self) {
            _finished = finished;
        }
        [self didChangeValueForKey:@"isFinished"];
    }
}

@end
