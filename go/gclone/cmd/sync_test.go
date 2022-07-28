package cmd_test

import (
	"testing"

	"github.com/tjmaynes/gclone/cmd"
)

func TestSyncCmd_RequiredFlags(t *testing.T) {
	RunRequiredFlagsTest(t, cmd.SyncCmd())
}
