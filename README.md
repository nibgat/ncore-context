<p align="center">
    <img
        width="450"
        height="450"
        src="https://ncore.nibgat.space/assets/images/darklogo.png"
    />
    <br/>
    <span style="font-size: 24px; font-weight: bold; text-align: center; width: 100%;">NİBGAT® | NCore Web Component Library</span>
    <br/>
    <br/>
</p>

### Documentation

Please visit for docs: [NCore Web](https://ncore.nibgat.space/web)

### Dependencies

If you install with yarn these packages will already be installed.

- react-jss

### Base Library

-   The library is exporting sample base components to be used in react project you can test it like this :
    -   NPM: `npm install ncore-web --save`
    -   YARN: `yarn add ncore-web`

```js
import {
    NCoreProvider,
    useNCoreTheme,
    Button
} from 'ncore-web';

const Home = () => {
    const {
        activeTheme
    } = useNCoreTheme();

    return <div>
        Welcome to Home Page. Your theme is: {activeTheme}
    </div>;
};

const App = () => {
    return <NCoreProvider>
        <div className="App">
            <Button title="hi" />
        </div>
    </NCoreProvider>;
}
```

### Discord

<a href="https://discord.gg/fMgVPZknuM">NİBGAT® | Community</a>
