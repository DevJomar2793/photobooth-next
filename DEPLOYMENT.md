# CI/CD setup

The workflow is local development → push to `dev` → CI → manually review and merge a `dev` to `main` pull request → production deployment. Pushes and pull requests targeting `dev` or `main` run CI. Only pushes to `main` deploy. There is no staging Vercel or Render service.

## GitHub

1. Push this workflow to `dev` and open a pull request into `main`. In **Actions**, open the **CI** run and inspect **Frontend checks** and **Backend checks**. Expand the failed step to read its logs.
2. After the first successful CI run, create an active repository ruleset for `main` in **Settings → Rules → Rulesets**. Require a pull request and the `Frontend checks` and `Backend checks` status checks. Do not add a bypass actor; block force pushes and deletions. This prevents direct pushes and merging with failed checks. Keep the merge manual.
3. Since this is a solo project, leave required approvals off. GitHub does not allow a pull request author to approve their own pull request. Review the changes yourself before merging.
4. Add Actions repository secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` for the production Vercel project. Do not put production database credentials in GitHub Actions.

The workflow uses the existing `frontend/package-lock.json` with `npm ci`. It runs frontend lint and build checks, then checks Python syntax and the backend's `/` endpoint without a database connection. There is no configured unit or integration test suite, so the workflow does not claim to run one. The CI frontend build uses a non-production placeholder API URL.

To commit and push from the `dev` branch:

```bash
git add .github/workflows/ci.yml frontend/vercel.json DEPLOYMENT.md
git commit -m "ci: add gated production deployment"
git push origin dev
```

Then create and manually merge a pull request from `dev` into `main` after the checks pass. Do not push directly to `main`.

## Vercel frontend

Connect the existing repository to one Vercel project. Set root directory to `frontend`, framework preset to Vite, build command to `npm run build`, output directory to `dist`, and production branch to `main`. The `frontend/vercel.json` setting disables Vercel's automatic Git deployments, so the GitHub Actions deployment job runs only after both CI checks pass. Set the Vercel **Production** environment variable `VITE_API_URL` to the public Render API origin, for example `https://your-api.onrender.com`.

Create a Vercel access token and copy the project and organization IDs into the GitHub secrets listed above. See [Vercel's GitHub Actions guide](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel). The workflow builds once with `vercel build` and uploads that result with `vercel deploy --prebuilt --prod`.

## Render backend

Configure one Python web service from this repository: branch `main`, root directory `backend`, build command `pip install -r requirements.txt`, start command `uvicorn main:app --host 0.0.0.0 --port $PORT`, and health check path `/`. Set **Auto-Deploy** to **After CI Checks Pass**, not **On Commit**. Render then waits for the GitHub checks on the new `main` commit before deploying.

Keep `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USER`, and `DATABASE_PASSWORD` in Render's production environment settings. The backend requires PostgreSQL with SSL. Set `CORS_ORIGINS` to the Vercel production origin, for example `https://your-site.vercel.app`. Do not copy production values into local `.env` examples or CI.

After the first deployment, check the Render `/` and `/database/connection` endpoints, then open the production gallery to confirm browser requests work. Review deployment failures in the Vercel and Render dashboards; CI failures are under the GitHub **Actions** tab.

## If GitHub Actions does not start

Check the repository's **Settings → Actions** policy and the failed run or account message first. Standard GitHub-hosted runners are free for public repositories; private repositories have an included allowance. A paid subscription is not automatically required. See [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
