# CI/CD setup

GitHub Actions checks every pull request and pushes to `dev` or `main`. Only a passing push to `dev` deploys production. The frontend job runs ESLint and the Vite build. The backend job checks Python syntax, starts FastAPI, and requests `/`. These checks do not exercise PostgreSQL-backed routes.

## Vercel frontend

1. Create or link a Vercel project to this repository. Set its root directory to `frontend`, framework preset to Vite, build command to `npm run build`, and output directory to `dist`.
2. Set `dev` as the production branch. The `frontend/vercel.json` setting disables automatic Git deployments; GitHub Actions deploys after its checks pass.
3. Set the Vercel **Production** environment variable `VITE_API_URL` to the public Render API origin, such as `https://your-api.onrender.com` (no trailing slash).
4. Add GitHub Actions repository secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` for that Vercel project. Vercel documents how to obtain these values in its [GitHub Actions guide](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel).

## Render backend

1. Create a Python web service from this repository. Select branch `dev`, root directory `backend`, build command `pip install -r requirements.txt`, and start command `uvicorn main:app --host 0.0.0.0 --port $PORT`.
2. Set **Auto-Deploy** to **After CI Checks Pass**. This makes Render wait for GitHub checks before deploying a new commit.
3. Set `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USER`, and `DATABASE_PASSWORD` as Render environment variables for the existing PostgreSQL database. The backend requires an SSL-enabled PostgreSQL connection. Set `CORS_ORIGINS` to the Vercel production origin, such as `https://your-site.vercel.app` (no path).
4. Set Render's health check path to `/`. After deployment, request `/database/connection` to confirm database access, then open the frontend gallery to verify API requests from the browser.

Keep tokens and database credentials in GitHub or Render settings, never in committed files. A first deploy requires the Vercel project, Render service, environment values, and GitHub secrets to be configured.
