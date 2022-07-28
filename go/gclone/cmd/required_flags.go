package cmd

import (
	"errors"

	"github.com/spf13/cobra"
)

type RequiredFlags struct {
	username        string
	githubToken     string
	targetDirectory string
}

func checkStringFlagExists(cmd *cobra.Command, flag string, errorMessage string) (string, error) {
	flagValue, err := cmd.Flags().GetString(flag)

	if err != nil {
		return "", err
	}

	if len(flagValue) == 0 {
		return "", errors.New(errorMessage)
	}

	return flagValue, nil
}

func CheckRequiredFlagsExist(cmd *cobra.Command) (*RequiredFlags, error) {
	username, usernameErr := checkStringFlagExists(cmd, "username", "'-u, --username' not provided")
	if usernameErr != nil {
		return nil, usernameErr
	}

	githubToken, githubTokenErr := checkStringFlagExists(cmd, "github-token", "'-t, --github-token' not provided")
	if githubTokenErr != nil {
		return nil, githubTokenErr
	}

	targetDirectory, targetDirectoryErr := checkStringFlagExists(cmd, "target-directory", "'-d, --target-directory' not provided")
	if targetDirectoryErr != nil {
		return nil, targetDirectoryErr
	}

	// check target directory exists

	return &RequiredFlags{
		username:        username,
		githubToken:     githubToken,
		targetDirectory: targetDirectory,
	}, nil
}

func ApplyRequiredCmdFlags(cmd *cobra.Command) {
	cmd.Flags().StringP("username", "u", "", "your GitHub Username")
	cmd.Flags().StringP("github-token", "t", "", "your GitHub Personal Access Token")
	cmd.Flags().StringP("target-directory", "d", "", "specify a target directory to clone repositories to")
}
