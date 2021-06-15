export const bSaveData = async (indata, model) => {
    try {
        let savehandle = new model(indata);
        let rdata = false;
        await savehandle.save().then(result => {
            if (!result) {
                rdata = false;
            } else {
                rdata = result;
            }
        });
        return rdata;
    } catch (e) {
        return false;
    }
}

export const bFind = async (model, condition = {}) => {
    try {
        let findhandle = null;
        await model.find(condition).then(rdata => {
            findhandle = rdata;
        });
        if (!findhandle) {
            return false;
        } else {
            return findhandle;
        }
    } catch (e) {
        return false;
    }
}

export const bFindOne = async (model, condition = {}) => {
    try {
        let outdata = null;
        await model.findOne(condition).then(rdata => {
            if (!rdata) {
                outdata = false;
            } else {
                outdata = rdata;
            }
        });
        return outdata;
    } catch (e) {
        return false;
    }
}

export const bSortFind = async (modal, condition = {}, sortcondition = {}) => {
    try {
        let data;
        await modal.find(condition).sort(sortcondition).then(rdata => {
            data = rdata;
        });
        if (!data) {
            return false;
        } else {
            return data;
        }
    } catch (e) {
        return false;
    }
}

export const bSortFindOne = async (modal, condition = {}, sortcondition = {}) => {
    try {
        let data;
        await modal.findOne(condition).sort(sortcondition).then(rdata => {
            data = rdata;
        });
        if (!data) {
            return false;
        } else {
            return data;
        }
    } catch (e) {
        return false;
    }
}

export const bFindOneAndUpdate = async (model, condition = {}, data) => {
    try {
        let updatehandle = await model.findOneAndUpdate(condition, data, {
            new: true,
            upsert: true
        });
        if (!updatehandle) {
            return false
        } else {
            return updatehandle
        }
    } catch (e) {
        return false;
    }
}

export const bFindOneAndDelete = async (model, condition) => {
    try {
        let deletehandle = null;
        await model.findOneAndDelete(condition).then(rdata => {
            deletehandle = rdata;
        });
        if (!deletehandle) {
            return false;
        } else {
            return deletehandle;
        }
    } catch (e) {
        return false;
    }
}