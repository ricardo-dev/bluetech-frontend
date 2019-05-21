import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Register extends Component{

    Voltar = ()=>{
        this.props.navigation.goBack();
      }
    
    state = {
        errorMessage:'',
        nome:'',
    }

    proximo = ()=> {
        this.setState({errorMessage:''})
        const{nome} = this.state;

        if(nome.length === 0)
            this.setState({errorMessage:'Nome não pode ser vazio!'})
        else
            this.props.navigation.navigate('RegisterPass2', {data:{nome}});
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
                        }}>Por favor, digite seu nome</Text>
                        <TextInput 
                            style={{
                                paddingBottom:0,
                                borderBottomColor:'#000',
                                borderBottomWidth:0.4,
                                marginHorizontal:20,
                                color:'#000',
                            }}
                            placeholder={'Nome'}
                            value={this.state.nome}
                            onChangeText={text => this.setState({nome:text})}
                            keyboardType={'default'}
                            />
                        <Text style={{marginTop:8, marginHorizontal:20, color:'red'}}>{this.state.errorMessage}</Text>
                    </View>

                    <TouchableOpacity style={{
                        marginTop:20,
                        height:42,
                        marginRight:40,
                        marginLeft:'65%',
                        backgroundColor:'#fff',
                        borderRadius:10,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                    onPress={this.proximo}>
                        <Text style={{fontSize:16, color:'#000'}}>Proximo</Text>
                    </TouchableOpacity>
            </View>
        );
    }
}

export default Register;

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

