// For use with PM2 production manager
module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [
        {
            name : 'survey_node_test',
            script : './bin/www',
            watch : true,
            env: {
                'NODE_ENV': 'development',
            },
            env_production : {
                'NODE_ENV': 'production',
            },
            env_test : {
                'NODE_ENV': 'test',
            },
        },
    ],
}
