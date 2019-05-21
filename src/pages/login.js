import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, AsyncStorage, ActivityIndicator} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';

class Login extends Component{

    state = {
        email:'',
        senha:'',
        errorMessage:'',

        loading:false,
    }

    Voltar = ()=>{
        this.props.navigation.goBack();
    }

    logar = async ()=> {
        this.setState({errorMessage:'', loading:true})
        const {email, senha} = this.state;

        if(senha.length === 0){
            this.setState({errorMessage:'Senha vazia!'})
        }else{
            const response = await api.post(
                '/auth/',
                {
                    email,
                    senha
                }
            );
            if(response.ok){
                const {token, id, nome, email} = response.data.data;
                await AsyncStorage.multiSet([
                    ['@bluetech:token', token],
                    ['@bluetech:id', id+''],
                    ['@bluetech:nome', nome],
                    ['@bluetech:email', email],
                ]);
                this.setState({loading:false});
                Alert.alert('Login com sucesso!');
                this.redirecionar();
            }else{
                this.setState({errorMessage:'Dados não encontrados!', loading:false})
            }
        }
    }

    redirecionar = ()=> {
        const resetAction = StackActions.reset({
            index:0,
            actions:[NavigationActions.navigate({routeName:'Main'})]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{
                        height: 80,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                        <View style={{
                            flex: 1,
                            height: 80,
                            justifyContent: 'center',
                        }}>
                            <TouchableOpacity
                                style={{ marginLeft: 20, }}
                                onPress={this.Voltar}
                                hitSlop={{ bottom: 15, top: 15, right: 15, left: 15 }}>
                                <Icon name='angle-left' size={30} color='#000' />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex: 1,
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignItems: 'center',
                            paddingTop: 13,
                        }}>
                            <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>BlueTech</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                        </View>

                    </View>

                    <View style={{
                        marginTop:40,
                        marginHorizontal:20
                    }}>
                        <TextInput 
                            style={{
                                paddingBottom:0,
                                borderBottomColor:'#000',
                                borderBottomWidth:0.4,
                                marginHorizontal:20,
                                color:'#000',
                            }}
                            placeholder={'Email'}
                            value={this.state.email}
                            onChangeText={text => this.setState({email:text})}
                            keyboardType={'email-address'}
                            />
                        <TextInput 
                            style={{
                                paddingBottom:0,
                                borderBottomColor:'#000',
                                borderBottomWidth:0.4,
                                marginHorizontal:20,
                                color:'#000',
                                marginTop:15,
                            }}
                            placeholder={'Senha'}
                            value={this.state.senha}
                            onChangeText={text => this.setState({senha:text})}
                            keyboardType={'default'}
                            secureTextEntry={true}
                            />
                    <Text style={{marginTop:8, marginHorizontal:20, color:'red'}}>{this.state.errorMessage}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={()=>this.logar()}
                        style={{
                            marginTop:20,
                            marginHorizontal:40,
                            backgroundColor:'#fff',
                            borderRadius:4,
                            height:42,
                            alignItems:'center',
                            justifyContent:'center',
                        }}>
                        { !this.state.loading ? <Text style={{color:'#000', fontSize:16}}>LOGIN</Text> : <ActivityIndicator color={'#000'} size={16}/>}
                    </TouchableOpacity>
            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#d3d3d3',
    },
    text:{
        color:'#000',
        fontSize:16,
    }
})

