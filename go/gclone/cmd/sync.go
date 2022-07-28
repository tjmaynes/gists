package cmd

import (
	"github.com/spf13/cobra"
)

func SyncCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "sync",
		Short: "sync target directory repositories with latest changes from 'main' Git branch",
		RunE: func(cmd *cobra.Command, args []string) error {
			_, err := CheckRequiredFlagsExist(cmd)
			if err != nil {
				return err
			}

			cmd.Println("ok")

			return nil
		},
	}

	ApplyRequiredCmdFlags(cmd)

	return cmd
}
