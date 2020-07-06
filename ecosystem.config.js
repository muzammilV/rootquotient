module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "smartsheet-freshservice",
      script: "app.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
        NODE_ENV: "production"
      },
      log_date_format: "YYYY-MM-DD HH:mm Z"
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: "root",
      host: "51.15.129.138",
      ref: "origin/backend",
      repo: "git@code.spritle.com:freshservice/inc-2188-smartsheet-freshservice.git",
      path: "/root/projects/Sfgov-freshservice",
      "post-deploy":
        "npm i && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
};
