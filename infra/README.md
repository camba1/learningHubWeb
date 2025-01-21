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

Initialize the frontend service. When asked if you would like to deploy an environment, say no as we will need to update
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

#### Deploying the service

To deploy the frontend service, run:
```bash
copilot svc deploy --env dev --name frontend-service
```

Once the service is deployed we want to setup HTTPS. For dev, we will use a self-signed certificate. To create one and
imported to AWS Certificate Manager, run:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout privatekey.pem -out certificate.pem
aws acm import-certificate --certificate fileb://certificate.crt --private-key fileb://private.key
```

Note that when creating the certificate, it will ask for a FQDN. This can be whatever you want but must look like a 
domain name.

Since AWS Copilot does not support self-signed certificates, we need to associate the certificate with the load balancer
manually. Thus, in the AWS console go to the load balancer and add a new listener. Set the listener to listen on for
HTTPS, port 443 and that forwards traffic to the target group that is listening on port 3000. We must then open port
443 in the security group associated with the load balancer
Finally, we need to modify all rules for the HTTP port 80 listener to redirect to HTTPS as a permanent redirect (301).


Once the service is deployed and the HTTPS redirect is setup, set the **DNS name of the load balancer** in the `ORIGIN` **arg** and **environment 
variable** on the manifest. If we forget to do this, you will get an error when trying to do any POST request to the
backend service (`Cross-site POST form submissions are forbidden`). Once the DNS name is in the manifest, we must 
redeploy the service in order to apply the changes.

```bash
copilot svc deploy --env dev --name frontend-service
```

### Deleting the service

To delete the frontend service we must first delete the manually created security group rules and the load balancer https
listener
Once that is done, we can delete the frontend service by running:

```bash
copilot svc delete --env dev --name frontend-service
```

Refer to the backend service documentation on how to delete the complete application (frontend, backend and databases).

#### Troubleshooting
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