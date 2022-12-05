import {Image} from "react-native";
import styled from "styled-components/native";

export function Header() {
    return (
        <Background source={require('../assets/gradient-background.png')}>
            <TopBar>
                <TopBarBackButton source={require('../assets/back-button.png')} resizeMode={'contain'}/>
                <TopBarText>粤康码（广州）</TopBarText>
                <TopBarMenuBackground source={require('../assets/menu-button.png')} resizeMode={'contain'}>
                    <TopBarMenuLeftButton source={require('../assets/share-button.png')} resizeMode={'contain'}/>
                    <TopBarMenuRightButton source={require('../assets/close-button.png')} resizeMode={'contain'}/>
                </TopBarMenuBackground>
            </TopBar>
            <Clock>

            </Clock>
        </Background>
    )
}

const Background = styled.ImageBackground`
  height: 555px;
`

const TopBar = styled.View`
  margin-top: 20px;
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const TopBarBackButton = styled.Image`
  height: 20px;
`

const TopBarText = styled.Text`
  font-size: 18px;
  color: white;
  padding-left: 60px;
`

const TopBarMenuBackground = styled.ImageBackground`
  width: 100px;
  height: 100%;
  margin-right: 10px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const TopBarMenuLeftButton = styled.Image`
  width: 20%;
  margin-left: 15%;
`

const TopBarMenuRightButton = styled.Image`
  width: 20%;
  margin-right: 15%;
`

const Clock = styled.View`

`

const ClockBackground = styled.ImageBackground`
  
`
