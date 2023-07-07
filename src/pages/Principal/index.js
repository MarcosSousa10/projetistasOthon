import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Link } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native';


export default function Lista({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        listarUsuarios();
    }, []);

    const listarUsuarios = async () => {
        try {
            const response = await axios.get('http://192.168.2.181:8080/tudoProjetos');
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <ScrollView >
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: "wrap", margin: 0, padding: 0 ,
                        justifyContent: "center",
                        alignItems: "center"}}>
                {data.map((item, index) => (

                    <View key={index} style={{ width: 160, margin: 0, padding: 0 }}  >
                        {
                            item.status != "true" ? print(item.num_projeto)

                                :

                                <Card style={{ margin: 0, padding: 0 }}>
                                    <Card.Title>{item.num_projeto}</Card.Title>
                                    {/* </Link>  */}
                                    <Card.Divider />

                                    <Card.Image
                                        style={{ padding: 0 ,height:50}}
                                        source={require('../../Image/othon.png')}
                                    />
                                    <Text style={{ marginBottom: 10,textAlign:'center', color:'purple' }} >
                                    {item.num_orcamento}
                                    </Text>
                                    <View style={{
                                        display: "flex", justifyContent: 'center',
                                        alignItems: 'center', margin: 0, padding: 0
                                    }}>
                                        <Button
                                            icon={
                                                <Icon
                                                    name="clipboard-outline"
                                                    type="ionicon"
                                                    color="#ffffff"
                                                    iconStyle={{ marginRight: 1 }}
                                                />
                                            }
                                            title="Historico"
                                            onPress={() => {
                                                navigation.navigate('Historico', {
                                                    num_projeto: item.num_projeto,
                                                    cliente: item.cliente,
                                                    num_orcamento: item.num_orcamento
                                                });

                                            }}
                                        />

                                    </View>
                                </Card>
                        }
                    </View>

                ))}
            </View>
        </ScrollView>

    );
}
