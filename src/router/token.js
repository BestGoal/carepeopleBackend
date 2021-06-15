// const jwt =  require("jwt-simple");
// const config = require('../serverConf');
// const jsonwebtoken = require('jsonwebtoken');

exports.check_token = async(req, res, next) =>{
    // let token = req.headers.authorization;
    // try{
    //     let sessionData = await dbController.bFindOne(userSession, { token });
    //     let thisTime = await providerController.get_timestamp();
    //     if(sessionData) {
    //         if((sessionData.timestamp * 1) + config.session.expiretime < thisTime) {
    //             await dbController.bFindOneAndDelete(userSession, { token });
    //             return res.json({status: false, message: "Session expired", isSession: true});
    //         }else{
    //             await dbController.bFindOneAndUpdate(userSession,{ token }, { timestamp: thisTime});
    //             let user = await dbController.bFindOne(mainUser, {_id: sessionData.id});
    //             let player = await dbController.bFindOne(playUser, {id: sessionData.id});
    //             req.user = user;
    //             req.player = player;
    //             this.check_permission(req, res, next);
    //         }
    //     }else{
    //         return res.json({status: false, message: "Session expired", isSession: true});
    //     }
    // } catch (e) {
        next();
    // }
}

exports.generateToken =async function(data) {
    // try{
    //     let token = jsonwebtoken.sign(data, await providerController.get_timestamp(), {expiresIn: `${config.session.expiretime}s` });
    //     return token;
    // } catch (e) {
    //     return false;
    // }
}

exports.jwt_encode =async function(string) {
    // try{
    //     let token = await jwt.encode(string, config.ADMINPASSMETHOD);
    //     return token;
    // } catch (e) {
    //     return false;
    // }
}

exports.jwt_decode =async function(string) {
    // try{
    //     let token = await jsonwebtoken.decode(string);
    //     return token;
    // } catch(e) {
    //     return false;
    // }
}
