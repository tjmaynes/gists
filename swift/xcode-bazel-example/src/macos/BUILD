load("@build_bazel_rules_apple//apple:macos.bzl", "macos_application")
load("//config:custom_rules.bzl", "swift_unit_test")

macos_application(
    name = "rizeppi-macos",
    bundle_id = "com.tjmaynes.Rizeppi",
    minimum_os_version = "11.0",
    infoplists = [":RizeppiDesktop/Info.plist"],
    deps = ["//src/shared:rizeppi-shared"],
)

swift_unit_test(
    name = "RizeppiDesktopTests",
    srcs = glob([ "RizeppiDesktopTests/*.swift" ]),
    deps = [":RizeppiDesktop"],
)
