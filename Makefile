# ---- Docker ----
runWeb:
	npm run dev

docBuildWeb:
	docker build --build-arg ORIGIN=http://localhost:3000 -t bblearnweb .

docRunWeb:
	docker run --rm --name bblearnwebcont --env-file .env.local -p 3000:3000 bblearnweb

docStopWeb:
	docker stop bblearnwebcont

docRebuildWeb:
	make docStopWeb
	make docBuildWeb
	make docRunWeb

docExecWeb:
	docker exec -it bblearnwebcont sh


# ---- Docker Compose ----
# Hot reload dev

compWebDevBuild:
	docker compose -f compose_local.yaml build

compWebDevUp:
	docker compose -f compose_local.yaml up

compWebDevDown:
	docker compose -f compose_local.yaml down

# No hot reload, production build

compWebBuild:
	docker compose -f build

compWebUp:
	docker compose -f up

compWebDown:
	docker compose -f down

