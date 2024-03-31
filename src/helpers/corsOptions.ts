const whiteList = ["http://localhost:6000"];


const corsOptions = (req: any, callback: any) => {
    let corsOptions; 

    if (whiteList.indexOf(req.header("Origin")) !== -1) {
        corsOptions = {origin: true}
    } else {
        corsOptions = {origin: false}
    }

    callback(null, corsOptions)
}


export default corsOptions;