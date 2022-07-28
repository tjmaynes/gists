package cmd

import (
	"github.com/spf13/cobra"
)

func InitCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "init",
		Short: "initialize target directory with public and/or private cloned Git repositories",
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
