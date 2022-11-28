import {Image} from "react-native";
import styled from "styled-components/native";

export function Header() {
    return (
        <Background source={require('../assets/gradient-background.png')}>
            <TopBar>
                <TopBarBackButton source={require('../assets/back-button.png')} resizeMode={'contain'}/>
                <TopBarText>粤康码（广州）</TopBarText>
            </TopBar>
        </Background>
    )
}

const Background = styled.ImageBackground`
  height: 555px;
`;

const TopBar = styled.View`
  margin-top: 20px;
  height: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TopBarBackButton = styled.Image`
  height: 20px;
`

const TopBarText = styled.Text`
  font-size: 18px;
  color: white;
`
