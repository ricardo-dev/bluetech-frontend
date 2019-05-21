import {create} from 'apisauce';
import {AsyncStorage} from 'react-native';

const api = create({
    baseURL:'http://192.168.1.9:8080',
})

api.addAsyncRequestTransform(
    request => async ()=> {
        const token = await AsyncStorage.getItem("@bluetech:token");
        if(token)
            request.headers['Authorization'] = `Bearer ${token}`;
        request.headers['Content-Type'] = 'application/json';
    }
);

export default api;