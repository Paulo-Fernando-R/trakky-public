import {View, Text, Button} from "react-native"

import noContentStyles from "./no-login-style";

export default function NoLogin({navigation}){


    return(
        <View style={noContentStyles.body}>
            <Text style={noContentStyles.text}>Faça login para poder salvar entregas!</Text>
            <Button
      title="Fazer Login"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Profile'})
      }
    />
        </View>
    );
}