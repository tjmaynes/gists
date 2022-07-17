load("@build_bazel_rules_swift//swift:swift.bzl", "swift_library")
load("@build_bazel_rules_apple//apple:ios.bzl", "ios_unit_test")

def swift_unit_test(name, srcs, deps,):
  test_lib_name = name + "Lib"

  swift_library(
      name = test_lib_name,
      srcs = srcs,
      deps = deps,
      visibility = ["//visibility:private"],)

  ios_unit_test(
      name = name,
      deps = [test_lib_name],
      minimum_os_version = "14.5",)
