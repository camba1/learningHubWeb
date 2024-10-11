## Deploying to AWS with AWS Copilot

#### Prerequisites

Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html) and [Brew](https://brew.sh/)

Login to AWS ECR:

```bash 
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <accountRepoAddress>
```

install copilot if not already installed

```bash
brew install aws/tap/copilot-cli
```

Ensure that the backend service has been deployed. Note that none of the commands below should throw an error
if the service has not been deployed.

```bash
 copilot app ls
 copilot env ls --app bb-learning
 copilot env show --app bb-learning --name dev
```

After running the last command ensure that the workloads section shows the backend service.


#### Environment and databases setup

Because the backend service has already been deployed, the environment and the database have already been created.
However, we still need to create the appropriate copilot folder so that it can associate our frontend service with 
the bb-learning application that was created earlier (if they have not been created already). Create the following 
inside the `infra` folder:

```bash
mkdir copilot
touch copilot/.workspace
echo  application: bb-learning > copilot/.workspace
```
Only do the commands above if the copilot folder and the .workspace file do not already exist.


#### Frontend service setup

Generate additional secrets to store the required keys and passwords in AWS parameter store.

```bash
copilot secret init --name public_clerk_publishable_key --overwrite --app bb-learning --values dev=<value>
copilot secret init --name clerk_secret_key --overwrite --values dev=<value>
copilot secret init --name backend_url --overwrite --values dev=<value>
```

#### Frontend service

Initialize the backend service. When asked if you would like to deploy an environment, say no as we will need to update
the generated manifest:

```bash
copilot svc init --app bb-learning --name frontend-service --svc-type 'Load Balanced Web Service' --dockerfile '../Dockerfile'
```

#### Updating the copilot manifest

Update the copilot manifest for the service to include the necessary secrets.
This file was automatically created by copilot and is located at ```copilot/frontend-service/manifest.yml```. Add the
following to the file:

```yaml
secrets:                      # Pass secrets from AWS Systems Manager (SSM) Parameter Store.
  PUBLIC_CLERK_PUBLISHABLE_KEY: /copilot/${COPILOT_APPLICATION_NAME}/${COPILOT_ENVIRONMENT_NAME}/secrets/public_clerk_publishable_key
  CLERK_SECRET_KEY: /copilot/${COPILOT_APPLICATION_NAME}/${COPILOT_ENVIRONMENT_NAME}/secrets/clerk_secret_key
  BACKEND_URL: /copilot/${COPILOT_APPLICATION_NAME}/${COPILOT_ENVIRONMENT_NAME}/secrets/backend_url
  #  BL_BACKEND_API_KEY is created by the backend service deployment. We just need to reference it here.
  BL_BACKEND_API_KEY: /copilot/${COPILOT_APPLICATION_NAME}/${COPILOT_ENVIRONMENT_NAME}/secrets/bl-backend-api-key
```

Additionally, by default copilot will build your image as an X64 image. If you would like to build an ARM image,
update the following line in the manifest:

```yaml
platform: linux/arm64  # See https://aws.github.io/copilot-cli/docs/manifest/lb-web-service/#platform
```


Finally, double check the `http` section of the document and ensure the health check is setup properly. It should be
hitting the correct route (Copilot should default this properly from the healthcheck in the Docker file)

```yaml
    healthcheck: '/healthcheck'
```

We need to put the **DNS name of the load balancer** in the `ORIGIN` arg and environment variable on the manifest.
If we forget to do this, you will get an error when trying to do any POST request to the
backend service (`Cross-site POST form submissions are forbidden`).

#### Deploying the service

```bash
copilot svc deploy --env dev --name frontend-service
```

#### Trouble shooting
To troubleshoot the deployment in case something goes wrong, check the logs using:

```bash
copilot svc logs --name frontend-service --env dev
```

Login to the frontend service container using:

```bash
copilot svc exec --app bb-learning --env dev --name frontend-service 
```

Installing curl on container

```bash
apt-get update
apt-get install curl
```