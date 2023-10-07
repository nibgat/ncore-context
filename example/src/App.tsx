import React, {
    useEffect
} from "react";
import {
    Button,
    View,
    Text
} from "react-native";
import NCoreContext from "ncore-context";

const theme = new NCoreContext({
    spaces: {
        container: 20,
        content: 10
    },
    colors: {
        primary: "#00c2a9",
        success: "green",
        accent: "red"
    }
}, {
    isSaveState: true,
    key: "key1"
});

const ContextAPI = () => {
    useEffect(() => {
        theme.addEventListener("a", themeChanged);
        theme.addEventListener("b", themeChanged2);
    }, []);

    const themeChanged = (newState: any) => {
        console.error("STATE CHANGED. NEW STATE:", newState);
    };
  
    const themeChanged2 = (newState: any) => {
        console.error("STATE CHANGED 2. NEW STATE 2:", newState);
    };

    const {
        colors
    } = theme.useContext();

    return <View
        style={{
            backgroundColor: "#242424",
            flex: 1
        }}
    >
        <Text
            style={{
                color: colors.success,
                fontSize: 60
            }}
        >
            Test Text
        </Text>
        <Button
            title="SET PALETTE"
            onPress={() => {
                theme.setState({
                    colors: {
                        success: "pink",
                        accent: "blue",
                        primary: "#00c2a9"
                    }
                });
            }}
        />
        <Button
            title="SET PALETTE WITH 2"
            onPress={() => {
                theme.setState({
                    colors: {
                        primary: "#00c2a9",
                        success: "green",
                        accent: "red"
                    }
                });
            }}
        />
        <Button
            title="REMOVE A LISTENER"
            onPress={() => {
                theme.removeEventListener("a");
            }}
        />
    </View>;
};

const App = () => {
    return <theme.Provider>
        <ContextAPI/>
    </theme.Provider>;
};
export default App;
