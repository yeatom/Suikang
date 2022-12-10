import styled from "styled-components/native";
import {ScrollView} from "react-native";
import {Header} from "./Header";

export default function HomePage() {
    return (
        <HomePageContainer>
            <ScrollView>
                <Header/>
            </ScrollView>
            <FloatingButton/>
        </HomePageContainer>
    );
}

function FloatingButton() {
    return (
        <FloatingButtonBackground source={require('../assets/menu-button.png')} resizeMode={'contain'}>
            <FloatingButtonLeft source={require('../assets/share-button.png')} resizeMode={'contain'}/>
            <FloatingButtonRight source={require('../assets/close-button.png')} resizeMode={'contain'}/>
        </FloatingButtonBackground>
    )
}

const HomePageContainer = styled.View`
  flex: 1;
`

const FloatingButtonBackground = styled.ImageBackground`
  width: 100px;
  margin-right: 10px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: 0;
  top: 4.5%;
`

const FloatingButtonLeft = styled.Image`
  width: 20%;
  margin-left: 15%;
`

const FloatingButtonRight = styled.Image`
  width: 20%;
  margin-right: 15%;
`
