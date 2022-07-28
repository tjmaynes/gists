package cmd

import (
	"os"

	"github.com/spf13/cobra"
)

func RootCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "github-repo-downloader",
		Short: "A tool for cloning all of your public and private git repos locally.",
	}
}

func Execute() {
	rootCmd := RootCmd()

	rootCmd.CompletionOptions.DisableDefaultCmd = true

	initCmd := InitCmd()
	rootCmd.AddCommand(initCmd)

	syncCmd := SyncCmd()
	rootCmd.AddCommand(syncCmd)

	if err := rootCmd.Execute(); err != nil {
		os.Exit(-1)
	}
}
