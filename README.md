# Twilio Serverless TypeScript

Template repository for Twilio Serverless with TypeScript development capabilities and AirBnB ESLint config.

GitHub Actions are pre-configured for CI/CD in both development and production environments.

---

## How to use it

This project is ready to be forked and developed upon for your Twilio functions and assets. The GH Actions deployment requires some configuration before it can work unassisted.

1. Fork this repository.
2. In **your** repository, head to _settings and secrets_.
3. Create the following secrets:

| Name                         | Description                                                                                                                                                                                                                                          | Required |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TWILIO_ACCOUNT_SID           | Account SID of the Twilio account to deploy to.                                                                                                                                                                                                      | Y        |
| TWILIO_API_KEY               | API Key name used as authentication for deployment.                                                                                                                                                                                                  | Y        |
| TWILIO_API_SECRET            | Secret associated to the above Twilio API Key.                                                                                                                                                                                                       | Y        |
| TWILIO_FUNCTIONS_SERVICE_SID | SID of the functions service that should be promoted from dev to prod. **You won't have this SID until the dev deployment script has run for the first time and the functions service exists.** It is required for the production deployment script. | Y        |

4. Create `main` and `develop` branches. The `develop` will be the working branch and `main` will represent the latest production deployment. This will typically only be updated by pull requests from the `develop` branch.

5. To Test the dev deployment script, push a commit to the `develop` branch.

6. Assuming this has succeeded, update the GH secret with the functions service SID (see step 3) and apply any changes to the `main` branch to trigger the production deployment script.

## GitHub Actions

### Development deploy

[Workflow](./.github/workflows/dev-deploy-serverless.yaml)

**Trigger**

Push to `develop` branch OR _workflow_dispatch_.

**Secrets**

| Name               | Description                                         | Required |
| ------------------ | --------------------------------------------------- | -------- |
| TWILIO_ACCOUNT_SID | Account SID of the Twilio account to deploy to.     | Y        |
| TWILIO_API_KEY     | API Key name used as authentication for deployment. | Y        |
| TWILIO_API_SECRET  | Secret associated to the above Twilio API Key.      | Y        |

This action will take the source code of the repository and attempt a deploymentment to a functions service with a name matching that found in the `package.json`. If an existing service is found then it **will be overwritten** by this deployment. The functions service environment name will be `dev`.

### Production deploy

[Workflow](./.github/workflows/prod-deploy-serverless.yaml)

**Trigger**

Push to `main` branch OR _workflow_dispatch_.

**Secrets**

| Name                         | Description                                                                                                            | Required |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- |
| TWILIO_ACCOUNT_SID           | Account SID of the Twilio account to deploy to.                                                                        | Y        |
| TWILIO_API_KEY               | API Key name used as authentication for deployment.                                                                    | Y        |
| TWILIO_API_SECRET            | Secret associated to the above Twilio API Key.                                                                         | Y        |
| TWILIO_FUNCTIONS_SERVICE_SID | SID of the functions service that should be promoted from dev to prod. Most likely this will be a prior dev deployment | Y        |

This action will attempt to promote an existing functions service, matching the `TWILIO_FUNCTIONS_SERVICE_SID` environment variable. Moving it from a `dev` environment deployed in the dev action to a production environment instead.

### Caveats

Since the deployments are handled within GitHub, the environment variables from a local environment are not accessible to deploy. These will need to be manually entered into the Twilio Console once the service has deployed. These persist across future deploys and different environments so only need to be done at the outset or when variables are added/removed.

## Development

The [/functions](/src/functions/) and [/assets](/src/assets/) folders hold each type respectively. Suffixing files with `.protected` or `.private` will control access levels as required.

[types/index.ts](/src/types/index.ts) contains a `BaseContext` type. This maps to your environment variables for type safety in development. Note the optional mark allowing you to handle the event that these may not always be present. Each function holds an `Event` interface which provides typing capability for parameters passed to the function. This could be a whole range of things depending how what's calling your functions but if you are using internal Twilio webhooks you may be able to find types for these in the runtime-types package.

The [private-message](/src/functions/private-message.ts) function shows briefly how you can accessible assets from functions within the same service.
