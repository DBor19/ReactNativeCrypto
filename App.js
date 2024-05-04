import { StatusBar } from 'expo-status-bar';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
  const [moeda, setMoeda] = useState("");
  const [preco, setPreco] = useState("");
  const [visivel, setVisivel] = useState(false);

  async function buscar() {
    try {
      const resposta = await axios.get("http://192.168.15.10:3000/data?id=" + moeda);

      setMoeda(resposta.data[0].id);
      setPreco(resposta.data[0].priceUsd);
    } catch (error) {
      console.log("Error" + error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Crypto</Text>

      <TextInput 
        style={styles.inputBox}
        placeholder='informe a moeda'
        value={moeda}
        onChangeText={(text) => setMoeda(text.toLowerCase())}
      />

      <Button 
        title='Click'
        onPress={() => {
          buscar();
          setVisivel(!visivel);
        }}
      />

      <Modal
        animationType='fade'
        visible={visivel}
        transparent={true}
        onRequestClose={() => setVisivel(false)} // Adicionado para tratar o fechamento do modal com o botão de voltar do dispositivo
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{moeda}</Text>
            <Text>{preco}</Text>
            <Button 
              title='Fechar'
              onPress={() => setVisivel(!visivel)}
            />
          </View>
        </View>
      </Modal>      

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: 200,
    height: 50,
    backgroundColor: "#A5C9DE",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, 
  },
});
