import React, { useState } from "react";
import { styles } from "./styles";
import {Text, View, TextInput, TouchableOpacity, FlatList, Alert} from "react-native";
import { Participant } from "../../components/Participant";

export function Home() {
   const [participants, setParticipants] = useState<string[]>([])
   const [participantName, setParticipanteName] = useState('')

  function HandelParticipantAdd(){
    if(participants.includes(participantName)){
      return Alert.alert("Participante existe","Já existe um participante na lista com esse nome")
    }
    setParticipants(prevState => [...prevState, participantName]);
    setParticipanteName('');
  }

  function HandelParticipantRemove(name:string){
    Alert.alert("Remover",`Remover o participante ${name}?`,[
      {
        text:'Sim',
        onPress: () =>  setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text:'Não',
        style:'cancel',
      }
    ])
}

  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Ensaio da Banda
      </Text>
      <Text style={styles.eventDate}>
        Quarta-feira, 31 de Maio de 2023.
      </Text>
      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipanteName}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={HandelParticipantAdd} >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View> 
      <FlatList 
          data={participants}
          keyExtractor={item =>item}
          renderItem={({ item }) =>(
        <Participant 
          key={item}
          name={item} 
          onRemove={()=> HandelParticipantRemove(item)}/>
          )}
        ListEmptyComponent={()=>(
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença. 
          </Text>

        )}
      />
    </View>
  )
}