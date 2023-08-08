export const config = {

    db: {
        // railway----------------------
        baseurl: 'https://apm-sensoresgenericos-api-production.up.railway.app/api/v1/',
        mqtt:'sensor3s/all',
        mqttalert:'sensor3s/alerts'

        // local------------------------
        // baseurl: 'http://localhost:9000/api/v1/',
    },

    styles: {
        linecolor: "#bbb",
        chartbackcolor: "#c8ecfa",
        linewidth: 2
    }
}