package cmd_test

import (
	"bytes"
	"errors"
	"strings"
	"testing"

	"github.com/matryer/is"
	"github.com/spf13/cobra"
)

func TestRequiredFlags_WhenGivenANonExistantTargetDirectory_ItShouldAttempToCreateTargetDirectory(t *testing.T) {
	// is := is.New(t)

	// sut := CheckRequiredFlagsExist()
}

func RunRequiredFlagsTest(t *testing.T, sut *cobra.Command) {
	is := is.New(t)

	tt := []struct {
		args []string
		err  error
		out  string
	}{
		{
			args: []string{"-u", "", "-t", "some-token", "-d", "some-directory"},
			err:  errors.New("'-u, --username' not provided"),
		},
		{
			args: []string{"-u", "some-username", "-t", "", "-d", "some-directory"},
			err:  errors.New("'-t, --github-token' not provided"),
		},
		{
			args: []string{"-u", "some-username", "-t", "some-token", "-d", ""},
			err:  errors.New("'-d, --target-directory' not provided"),
		},
		{
			args: []string{"-u", "some-username", "-t", "some-token", "-d", "some-directory"},
			err:  nil,
			out:  "ok",
		},
		{
			args: []string{"--username", "some-username", "--github-token", "some-token", "--target-directory", "some-directory"},
			err:  nil,
			out:  "ok",
		},
	}

	for _, tc := range tt {
		out, err := execute(t, sut, tc.args...)

		is.Equal(tc.err, err)

		if tc.err == nil {
			is.Equal(tc.out, out)
		}
	}
}

func execute(t *testing.T, c *cobra.Command, args ...string) (string, error) {
	t.Helper()

	buf := new(bytes.Buffer)
	c.SetOut(buf)
	c.SetErr(buf)
	c.SetArgs(args)

	err := c.Execute()

	return strings.TrimSpace(buf.String()), err
}
