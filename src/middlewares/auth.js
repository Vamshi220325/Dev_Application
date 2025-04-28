const userAuth=(req,res,next)=>{
    console.log("checking authorized or not");
    const token="xyz";
    const isUserAuthorized=token==="xyz";
    if(!isUserAuthorized)
    {
        res.status(401).send("admin is not authorized");
    }
    else{next();}};
    module.exports={userAuth,};
