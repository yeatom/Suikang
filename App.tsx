import HomePage from "./component/HomePage";
import {useEffect} from "react";
import * as Brightness from 'expo-brightness';

export default function App() {

    const setBrightness = () => {
        (async () => {
            const { status } = await Brightness.requestPermissionsAsync();
            if (status === 'granted') {
                await Brightness.setSystemBrightnessAsync(0.7);
            }
        })();
    };

    useEffect(setBrightness, []);

    return <HomePage/>
}


