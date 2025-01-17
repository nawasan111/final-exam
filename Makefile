default: down up

up:
	docker compose -f ./docker/docker-compose.yml up -d

down:
	docker compose -f ./docker/docker-compose.yml down --rmi local
