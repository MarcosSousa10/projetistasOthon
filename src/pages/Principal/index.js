import React, { useState, useEffect } from 'react';
import {  View, ScrollView } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import axios from 'axios';


export default function Principal({route, navigation }) {
    const [data, setData] = useState([]);
    const { token } = route.params;

    useEffect(() => {
        listarUsuarios();
    }, []);

    const listarUsuarios = async () => {
        axios.get('http://192.168.2.181:5555/tudoProjetos', {
          headers: { 'Authorization': `Bearer ${token}` },
        }).then(Response => {
            setData(Response.data);
        }
        ).catch(
          Response => {
            console.log(Response);
          }
           )
      }


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
                                    <Text style={{ marginBottom: 10,textAlign:'center', color:'dark', fontWeight: 'bold', fontStyle: 'italic'}} >
                                    {item.projetista_responsavel}
                                    </Text>
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
                                                    num_orcamento: item.num_orcamento,
                                                    token:token
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
