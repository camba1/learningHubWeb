run web:
	npm run dev

docBuildWeb:
	docker build -t bblearnweb .

docRunWeb:
	docker run --rm --name bblearnwebcont --env-file .env.local -p 3000:3000 bblearnweb

docStopWeb:
	docker stop bblearnwebcont