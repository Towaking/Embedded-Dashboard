import axios from "axios";


export const getDeviceStatus = async () => {
    try{
        const res = await axios.get(`/api/external/api/isHardwareConnected?token=${import.meta.env.VITE_BLYNK_AUTH_TOKEN}`)
        return res.data;
    }catch(e){
        throw e;
    }
}

export const setPurifierON = async (  ) => {
    try{
        const res = await axios.get(`/api/external/api/update?token=${import.meta.env.VITE_BLYNK_AUTH_TOKEN}&v3=1`)
        return res.data;
    }catch(e){
        throw e;
    }
}

export const setPurifierOff = async ( ) => {
    try {
        const res = await axios.get(`/api/external/api/update?token=${import.meta.env.VITE_BLYNK_AUTH_TOKEN}&v3=0`);
        return res.data;
    }catch(e){
        throw e;
    }
}

export const getPurifierStatus = async (  ) => {
    try{
        const res = await axios.get(`/api/external/api/get?token=${import.meta.env.VITE_BLYNK_AUTH_TOKEN}&v0`);
        return res.data;
    }catch (e){
        throw e;
    }
}

export const getDataC02 = async () => {
    try{
        const res = await axios.get(`/api/external/api/get?token=${import.meta.env.VITE_BLYNK_AUTH_TOKEN}&V1`);
        return res.data;
    }catch (e){
        throw e;
    }
}

export const getDataC0 = async () => {
    try{
        const res = await axios.get(`/api/external/api/get?token=${import.meta.env.VITE_BLYNK_AUTH_TOKEN}&V2`);
        return res.data;
    }catch (e){
        throw e;
    }
}
