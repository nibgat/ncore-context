# ncore-context

State Management Library for NCore

## Installation

```sh
yarn add ncore-context
```

## Usage

```js
const ExampleTheme = new NCoreContext({
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
```

## Inheritance
```js
class ThemeContextInheritance<T extends {} | undefined> extends NCoreContext<T> {
    themes = [light, dark];

    constructor(initialState: any, config: ConfigType<T>) {
        super(initialState, config);

        this.prepare(initialState);
    }

    setTheme = (themeKey: NCore.ThemeKeyType) => {
        const currentProjectTheme = this.themes?.find(e => e.key === themeKey);

        if(themeKey !== "light" && themeKey !== "dark" && !(currentProjectTheme)) {
            throw Error(`Can not find a theme for the given themeKey: ${themeKey}`);
        }

        const _typography = mergeGivenTypographyWithNCore(themeKey, currentProjectTheme?.typography);
        const _colors = mergeGivenColorsWithNCore(themeKey, currentProjectTheme?.colors);
        const _designTokens = mergeGivenDesignTokensWithNCore(themeKey, currentProjectTheme?.designTokens);

        this.setState({
            activeTheme: themeKey,
            typography: _typography,
            colors: _colors,
            spaces: _designTokens.spaces,
            borders: _designTokens.borders,
            radiuses: _designTokens.radiuses,
            disabled: _designTokens.disabled
        });
    };

    prepare = (initialState: any) => {
        if(!initialState) {
            return;
        }

        if(initialState.themes) {
            this.themes = initialState.themes;
        }

        if(initialState.initialThemeKey) {
            this.setTheme(initialState.initialThemeKey);
        }
    };
};

const ThemeContext = new ThemeContextInheritance(
    themeStore,
    {
        key: "NCoreTheme"
    }
);
```

## License

MIT + NİBGAT® | License - OSL
