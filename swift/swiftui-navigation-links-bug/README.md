# SwiftUI Navigation Links Bug
[![iOS 14.4](https://github.com/tjmaynes/swiftui-navigation-links-bug/actions/workflows/passing-in-14.4.yml/badge.svg)](https://github.com/tjmaynes/swiftui-navigation-links-bug/actions/workflows/passing-in-14.4.yml)
[![iOS 14.5](https://github.com/tjmaynes/swiftui-navigation-links-bug/actions/workflows/failing-in-14.5.yml/badge.svg)](https://github.com/tjmaynes/swiftui-navigation-links-bug/actions/workflows/failing-in-14.5.yml)

> This is a Swift 2.0 project demonstrating a bug where more than two SwiftUI NavigationLinks in the same view will cause a redirect back to root to occur.

## Requirements

- [Xcode](https://developer.apple.com/xcode/) 
- iOS Simulators 14.4 and 14.5

## Usage

To show the **passing** UI test using iOS 14.4 simulator, run the following command:
```bash
make run_passing_ui_tests
```

To show the **failing** UI test using iOS 14.5 simulator, run the following command:
```bash
make run_failing_ui_tests
```
