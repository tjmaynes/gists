load("@build_bazel_rules_apple//apple:ios.bzl", "ios_application")
load("@build_bazel_rules_apple//apple:ios.bzl", "ios_ui_test")
load("//config:custom_rules.bzl", "swift_unit_test")

ios_application(
    name = "rizeppi-ios",
    bundle_id = "com.tjmaynes.Rizeppi",
    families = [ "iphone" ],
    minimum_os_version = "14.5",
    infoplists = [":RizeppiMobile/Info.plist"],
    deps = ["//src/shared:rizeppi-shared"],
)

swift_unit_test(
    name = "RizeppiMobileTests",
    srcs = glob([ "RizeppiMobileTests/*.swift" ]),
    deps = [":RizeppiMobile"],
)

ios_ui_test(
    name = "RizeppiMobileUITests",
    deps = [":RizeppiMobile"],
    test_host = ":RizeppiMobile",
    minimum_os_version = "14.5",
)
