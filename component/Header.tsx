import {Image} from "react-native";
import styled from "styled-components/native";

export function Header() {
    return (
        <Background source={require('../assets/gradient-background.png')}>

        </Background>
    )
}

const Background = styled.ImageBackground`
  flex: 1;
  height: 555px;
`;
