import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationActions, StackActions} from 'react-navigation';
import api from '../services/api';

class RegisterPass3 extends Component{

    Voltar = ()=>{
        this.props.navigation.goBack();
      }

    state = {
        nome:'',
        email:'',
        senha:'',
        repeteSenha:'',
        errorMessage:'',
        error2Message:'',

        salvando:false,
    }

    componentDidMount(){
        const {nome, email} = this.props.navigation.state.params.data;
        this.setState({nome, email});

        Alert.alert("nome:"+nome+" "+email);
    }

    finishPass2 = async ()=> {
        //this.redirecionar();
        this.setState({salvando:true})
        const {nome, email, senha} = this.state;

        const response = await api.post(
            '/usuario/cadastrar-usuario/',
            {
                nome,
                email,
                senha
            }
        );
        if(response.ok){
            this.setState({salvando:false})
            Alert.alert('Salvo com sucesso!');
            this.redirecionar();
        }else{
            this.setState({salvando:false})
            Alert.alert(response.data.errors.toString());
        }
    }

    finishPass = async ()=> {
        this.setState({errorMessage:'', error2Message:''})
        const {nome, email, senha, repeteSenha} = this.state;
        if(senha.length === 0)
            this.setState({errorMessage:'Senha vazio!'})
        else{
            if(senha !== repeteSenha)
                this.setState({error2Message:'Campos diferentes!'})
            else{
                    this.setState({salvando:true});
                    const response = await api.post(
                        '/usuario/cadastrar-usuario/',
                        {
                            nome,
                            email,
                            senha
                        }
                    );
                    if(response.ok){
                        this.setState({salvando:false})
                        Alert.alert('Salvo com sucesso!');
                        this.redirecionar();
                    }else{
                        this.setState({salvando:false})
                        Alert.alert(response.data.errors.toString());
                    }
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
                                    marginHorizontal:20,
                                    marginTop:30,
                                }}>
                                <Text style={{
                                    marginHorizontal:20,
                                    marginTop:10,
                                    marginBottom:20,
                                    color:'#000',
                                    fontSize:20,
                                }}>Ufa! já está acabando! nos informe sua senha de acesso</Text>
                                <TextInput 
                                    style={{
                                        paddingBottom:0,
                                        borderBottomColor:'#000',
                                        borderBottomWidth:0.4,
                                        marginHorizontal:20,
                                        color:'#000',
                                    }}
                                    placeholder={'Senha'}
                                    value={this.state.senha}
                                    onChangeText={text => this.setState({senha:text})}
                                    keyboardType={'default'}
                                    secureTextEntry={true}
                                    />
                                <Text style={{marginTop:8, marginHorizontal:20, color:'red'}}>{this.state.errorMessage}</Text>

                                <TextInput 
                                    style={{
                                        paddingBottom:0,
                                        borderBottomColor:'#000',
                                        borderBottomWidth:0.4,
                                        marginHorizontal:20,
                                        color:'#000',
                                    }}
                                    placeholder={'Repetir senha'}
                                    value={this.state.repeteSenha}
                                    onChangeText={text => this.setState({repeteSenha:text})}
                                    keyboardType={'default'}
                                    secureTextEntry={true}
                                    />
                                <Text style={{marginTop:8, marginHorizontal:20, color:'red'}}>{this.state.error2Message}</Text>
                            </View>
            
            <TouchableOpacity style={{
                        marginTop:15,
                        height:42,
                        marginRight:40,
                        marginLeft:40,
                        backgroundColor:'#fff',
                        borderRadius:10,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                    onPress={this.finishPass}>
                        { !this.state.salvando ? <Text style={{fontSize:16, color:'#000'}}>Cadastrar</Text>:<ActivityIndicator size={16} color={'#000'} /> }
                    </TouchableOpacity>
            </View>
        );
    }
}

export default RegisterPass3;

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

