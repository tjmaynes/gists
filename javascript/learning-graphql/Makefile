DB_URI ?= some-db-uri

run_server:
	cd server && DB_URI=$(DB_URI) npm start

run_client:
	cd client && npm start

install_client_dependencies:
	cd client && npm install

install_server_dependencies:
	cd server && npm install

install_dependencies: install_client_dependencies install_server_dependencies
