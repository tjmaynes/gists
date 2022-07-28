package cmd_test

import (
	"testing"

	"github.com/tjmaynes/gclone/cmd"
)

func TestInitCmd_RequiredFlags(t *testing.T) {
	RunRequiredFlagsTest(t, cmd.InitCmd())
}

func TestInitCmd_WhenPrivateAndPublicRepositoriesExist_AndAreAvailable_ThenItShouldAttemptToLocallyCloneRepositories(t *testing.T) {

}

func TestInitCmd_WhenPrivateAndPublicRepositoriesExist_AndAreNotAvailable_ThenItShouldReturnError(t *testing.T) {

}
