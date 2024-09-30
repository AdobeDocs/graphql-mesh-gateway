
After [creating a local environment](https://developer.adobe.com/graphql-mesh-gateway/mesh/advanced/developer-tools/#create-a-local-environment), you can enable scheduled performance testing in GitHub.

<InlineAlert variant="info" slots="text"/>

To add variables, you must have administrative permissions in the target GitHub repository.

1. In your browser, navigate to `https://github.com/<org>/<project_name>/settings/secrets/actions`.

1. On the **Variables** tab, click **New repository variable**.

1. Enter a name for the secret or variable, such as `DURATION`.

1. Enter the corresponding value for the secret or variable, for example, `600`.

1. Repeat this process for all the following variables:
  
   - `VUS` - The number of virtual users for the test scenario.
   - `DURATION` - The number of seconds to run the test scenario.
   - `UPLOAD_REPORT` - Boolean to control uploading the report to your GitHub repository.
   - `MESH_ENDPOINT` - The URL of your edge mesh.

1. You can run the action manually from the **Actions** tab in your GitHub repository, or you can [use a schedule event](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule).

### Local performance testing

You can create a performance testing report locally, by running the following command:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=<FILENAME>.html yarn test:perf
```
