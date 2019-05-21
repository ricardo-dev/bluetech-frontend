import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, FlatList, Image, AsyncStorage} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';

class Main extends Component{

    state={
        isLoading:false,
        data:[],
        dataVotos:[],
        logado:false,
    }

    votarApi = async (idUsuario, idImovel) => {
        const response = await api.post(
            '/imovel/inserir-voto/',
            {
                idUsuario, 
                idImovel
            }
        )
        if(response.ok){
            Alert.alert('Voto com sucesso!');
            this.getApi();
        }else{
            Alert.alert(response.data.errors.toString());
        }
    }

    getApi = async ()=> {
        this.setState({isLoading:true})
        const response = await api.get(
            '/imovel/listar-imoveis/',
        );
        if(response.ok){
            this.setState({
                data: response.data.data,
                fotoData: response.data.data.Imagem,
            })
            this.setState({isLoading:false})
        }else{
            Alert.alert('Erro');
            this.setState({isLoading:false})
        }
    }

    logoutAsk = () => {
        Alert.alert('Sair', 'Deseja sair?',
                [{text:'sim', onPress: ()=> this.logout()},{text:'Não', onPress: ()=> null}]);
    }

    logout = async ()=> {
        this.setState({logado:false});
        let Keys = ['@bluetech:token', '@bluetech:id', '@bluetech:nome', '@bluetech:email'];
        await AsyncStorage.multiRemove(Keys);
    }

    cadastrar = ()=> {
        this.props.navigation.navigate('Register');
    }

    login = ()=> {
        this.props.navigation.navigate('Login');
    }

    votar = async (idImovel, nomeImovel)=> {
        const token = await AsyncStorage.getItem("@bluetech:token");
        const idUsuario = await AsyncStorage.getItem("@bluetech:id");
        if(token){
            Alert.alert('Tem certeza?', `voto para: ${nomeImovel}\nesta correto?`,[{text:'sim', onPress: ()=>this.votarApi(idUsuario, idImovel)},
            {text:'não', onPress: ()=>null}])
            //this.votarApi(idUsuario, idImovel);
        }else{
            Alert.alert('', 'é necessário estar autenticado',
                [{text:'quero cadastrar', onPress: ()=> this.cadastrar()},{text:'fazer login', onPress: ()=> this.login()}]);
        }
    }

    async componentDidMount(){
        const token = await AsyncStorage.getItem("@bluetech:token");
        if(token){
            this.setState({logado:true})
        }
        this.getApi();
    }

    renderItem = ({item}) => (
        <View>
            <View style={styles.renderItemStyle}>
                <View>
                    <Image style={{width:'100%', height:150, borderTopLeftRadius:10, borderTopRightRadius:10}} source={{uri:item.imagem[0].imagemPath}}/>
                </View>
                <View style={{
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                }}>
                    <View style={{
                        flex:1,
                    }}>
                        <Text style={{
                            fontSize:16,
                            color:'#000'
                        }}>{item.nomeImovel}</Text>
                    </View>
                    <View style={{
                        flex:1,
                        alignItems:'center',
                    }}>
                        <Text>{item.totalVotos} votos</Text>
                    </View>
                    <View style={{
                        flex:1,
                        alignItems:'flex-end'
                    }}>
                        <TouchableOpacity onPress={()=>this.votar(item.id, item.nomeImovel)}>
                            <Text style={{fontSize:16}}>Votar</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>

        </View>
    );

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
                    }}>{ this.state.logado &&
                        <TouchableOpacity
                            onPress={this.logoutAsk}
                            hitSlop={{top:10, bottom:10, right:10, left:10}}
                            style={{
                                marginTop:10,
                                marginRight:20,
                            }}>
                                <FontAwesome name='sign-out' size={25} color={'#000'}/>
                        </TouchableOpacity>
                    }
                    </View>
                </View>
                {
                    this.state.isLoading ? 
                        <View style={styles.loadingView}>
                            <ActivityIndicator size={'large'} color={'#000'}/>
                        </View>
                        :
                        <View style={[styles.listView]}>
                            <FlatList 
                                contentContainerStyle={{paddingRight:20, paddingLeft:20, paddingBottom:30, paddingTop:20}}
                                data={this.state.data}
                                keyExtractor = {item => item.id.toString()}
                                renderItem = {this.renderItem}

                            />
                        </View>
                }


                <TouchableOpacity style={styles.button} onPress={this.getApi}>
                    <FontAwesome name='refresh' color={'#000'} size={20} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Main;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#d3d3d3',
        //alignItems:'center',
        //justifyContent:'center',
    },
    text:{
        color:'#000',
        fontSize:16,
    },
    button:{
        position:'absolute',
        bottom:100,
        left:20,
        width:50,
        height:50,
        borderRadius:50/2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f2f2f2',
        elevation:5,
        borderColor:'#d2d2d2',
        borderWidth:0.4,
    },
    buttonText:{
        fontSize:18,
        color:'#000',
    },
    loadingView:{flex:1, justifyContent:'center', alignItems:'center'},
    listView:{
        flex:1,
        //marginTop:30,
    },
    renderItemStyle:{
        backgroundColor:'#fff',
        marginHorizontal:20,
        marginTop:10,
        //marginBottom:20,
        borderRadius:10,
        elevation:1,
        //height:80,
    }
})
