package main

import (
	"flag"
	"os"

	api "github.com/tjmaynes/tdd-go/pkg/api"
)

func main() {
	var (
		dbSource   = flag.String("DATABASE_URL", os.Getenv("DATABASE_URL"), "Database source such as ./db/my.db.")
		serverPort = flag.String("PORT", os.Getenv("PORT"), "Port to run server from.")
	)

	flag.Parse()

	api.
		NewAPI(*dbSource).
		Run(*serverPort)
}
