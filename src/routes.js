import {createStackNavigator} from 'react-navigation';

import Main from './pages/main';
import Details from './pages/details';
import Register from './pages/register';
import RegisterPass2 from './pages/registerPass2';
import RegisterPass3 from './pages/registerPass3';
import Login from './pages/login';

export default createStackNavigator(
{
    Main,
    Details,
    Register,
    RegisterPass2,
    RegisterPass3,
    Login,
    
},{
    navigationOptions:{
        header:null,
    }
});