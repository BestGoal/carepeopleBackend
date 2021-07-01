import * as dbController from "./dbController";
import { mainUser } from "../models/index";

export const getAllClients = async (req, res) => {
    let { parsedFilter, condition } = req.body;
    let { userslist, pages } = await getClientItems(parsedFilter, condition);
    let returnData = { data: userslist, pages };
    return res.json({ status: true, data: returnData })
}

export const getClientItems = async (parseFilter, mainCondition) => {
    let data = await dbController.bFind(mainUser, { permission: "client" })
    let searchData = await searchUserData(data, mainCondition);
    let count = searchData.length;
    let pages = await setPage(parseFilter, count);

    let newData = searchData.slice(pages.skip, pages.limit);

    pages["skip1"] = newData.length ? pages.skip + 1 : 0;
    pages["skip2"] = (pages.skip) + (newData.length ? newData.length : 0);

    return { userslist: newData, pages };
}

export const searchUserData = async (allData, condition) => {
    const navSearch = (action) => {
        let { key, value } = action;
        if (value.length) {
            let data = allData.filter(item => {
                let uitem = (item[key]).toString();
                let startsWithCondition = uitem.toLowerCase().startsWith(value.toLowerCase());
                let includesCondition = uitem.toLowerCase().includes(value.toLowerCase());
                if (startsWithCondition) {
                    return startsWithCondition
                } else if (!startsWithCondition && includesCondition) {
                    return includesCondition
                } else return null
            })
            return data;
        } else {
            return allData;
        }
    }
    for (const key in condition) {
        allData = await navSearch({ key, value: condition[key] });
    }
    return allData;
}

export const setPage = (params, totalcount) => {
    let {
        page,
        perPage
    } = params;
    let newparams = {}, totalPages;
    if (page !== undefined && perPage !== undefined) {
        totalPages = Math.ceil(totalcount / perPage);
        let calculatedPage = (page - 1) * perPage;
        if (calculatedPage > totalcount) {
            newparams['page'] = 1;
            newparams['perPage'] = parseInt(perPage);
        } else {
            newparams['perPage'] = parseInt(perPage);
            newparams['page'] = parseInt(page);
        }
    } else {
        totalPages = Math.ceil(totalcount / 10);
        newparams['page'] = 1;
        newparams['perPage'] = 10;
    }

    let index1 = newparams.page == 0 ? 0 : newparams.page - 1;
    let index2 = newparams.page == 0 ? 1 : newparams.page;
    let skip = index1 * (newparams.perPage);
    let limit = index2 * (newparams.perPage);

    return {
        totalPages,
        params: newparams,
        skip,
        limit,
        totalRecords: totalcount
    }
}

export const updateClient = async (req, res) => {
    let { userData } = req.body;
    let flag = await dbController.bFindOneAndUpdate(mainUser, { _id: userData._id }, userData);
    if (flag) {
        return getAllClients(req, res)
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const getAllWorker = async (req, res) => {
    let { parsedFilter, condition } = req.body;
    let { userslist, pages } = await getWorkerItem(parsedFilter, condition);
    let returnData = { data: userslist, pages };
    return res.json({ status: true, data: returnData })
}

export const getWorkerItem = async (parseFilter, mainCondition) => {
    let data = await dbController.bFind(mainUser, { permission: "worker" })
    let searchData = await searchUserData(data, mainCondition);
    let count = searchData.length;
    let pages = await setPage(parseFilter, count);
    
    let newData = searchData.slice(pages.skip, pages.limit);
    
    pages["skip1"] = newData.length ? pages.skip + 1 : 0;
    pages["skip2"] = (pages.skip) + (newData.length ? newData.length : 0);
    
    return { userslist: newData, pages };
}

export const updateWorkers = async (req, res) => {
    let { userData } = req.body;
    let flag = await dbController.bFindOneAndUpdate(mainUser, { _id: userData._id }, userData);
    if (flag) {
        return getAllWorker(req, res)
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}