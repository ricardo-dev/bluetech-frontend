import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Details extends Component{

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
                        }}>
                        </View>

                    </View>
            </View>
        );
    }
}

export default Details;

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
