ENVIRONMENT := development

export PLEX_UID=$(shell echo $UID)
export PLEX_GID=$(shell echo $GID)

include .env.$(ENVIRONMENT)
export $(shell sed 's/=.*//' .env.$(ENVIRONMENT))

start:
	./scripts/$@.sh

stop:
	./scripts/$@.sh

backup:
	@echo "No backups needed for plex"

restore:
	@echo "No restoration needed for plex"
