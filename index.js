// CORE IMPORTS FOR APPLICATION
import express from 'express'
import app_config from "./appconfig.js";
import bodyParser from "body-parser";
import constants from "./app/constant/constants.js";
import connection from "./db/connect.js"
import route_collector from "./app/service/route_collector.js";
import cli_spinner from "./app/service/cli_spinner.js";
import helper from "./app/service/helper.js";
import dotenv from "dotenv"
import cors from "cors"
import ip from 'ip'

const app = express()

// load new environment variables into main env object
dotenv.config()

const runOnIp = process.env.npm_config_ip || false
let host = '127.0.0.1' // default localhost
const port = process.env.npm_config_port || process.env.DEFAULT_PORT

console.log(runOnIp)
if(runOnIp === 'true')
    host = ip.address()
else if(runOnIp !== false)
    host = runOnIp

let chatSocket = null;

// INITIALIZE USING APPLICATION
app.use(bodyParser.urlencoded({extended: false, limit: '10mb', parameterLimit: 30000}));
app.use(bodyParser.json());
app.use(cors({
    origin:'*'
}));

// MAIN START SCRIPT
cli_spinner.start({cli_text: `${app_config.APP_NAME} STARTING\n`, loader_color: 'black'})

app.listen(port, host , (err) => {
    if (!err) {
        console.log(`SERVER STARTED AT -> ${host}:${port}`)
        console.log('---------------------')
        console.info(`Collecting routes`)
        // trying to collect routes
        route_collector.collect().then( (data) => {
            try {
                for (const file of data) {
                    // try to import rout files
                    import('./app/rout/' + file).then((data) => {
                        // check if router exists and file is not empty
                        if (data && data.default && data.default.router) {
                            if (!data.default.prefix)
                                app.use(data.default.router) // then use router in app
                            else {
                                app.use(data.default.prefix, data.default.router)
                            }
                        }
                    })
                }

                console.info(`Collecting routes - OK`)
            } catch (e){
                helper.exitApp(0,"Failed to collect routes, exiting application")
            }

            console.log('---------------------')
            console.info(`Connecting to BD`)
            // if routes collected successfully then
            // try to connect to database
            connection.connect().then( () => {
                console.info('Connecting to BD - OK')
                console.log('---------------------\n')

                console.info('Connecting to SOCKET')
                chatSocket = import('./socket.js').then(() => {

                    cli_spinner.changeSpinnerText({cli_text:`${app_config.APP_NAME} STARTED SUCCESSFULLY`})
                    cli_spinner.succeed()
                })
            }).catch( (err) => {
                helper.exitApp(0,err.message?err.message:err)
            })
        })

    } else {
        helper.exitApp(0,constants.APP_RUN_ERROR)
    }
})