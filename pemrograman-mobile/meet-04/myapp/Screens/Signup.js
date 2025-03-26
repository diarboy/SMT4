import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { styles } from "./styles";

const Signup = () => {
    const [count, setCount] = useState(9);
    console.log(count);

    const kurang = () => {
        setCount(count - 1);
    };

    const Tambah = () => {
        setCount(count + 1);
    };
    
    return (
        <View>
            <Text style={styles.text}>Halaman Signup</Text>
            <View>
                <Button title="Kurang" onPress={kurang} />
            </View>
            <Text>Count: {count} </Text>
            <View>
            <Button title="Tambah" onPress={Tambah} />
            </View>
        </View>
    );
};

export default Signup;