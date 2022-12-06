import styled from "styled-components/native";
import {useEffect, useState} from "react";
import moment from "moment";

function Clock() {
    function currentTime() {
        return moment().format('YYYY/MM/DD hh:mm:ss')
    }

    const [time, setTime] = useState(currentTime())

    useEffect(() => {
        setInterval(() => {
            setTime(currentTime())
        }, 1000)
    }, [])

    return (
        <ClockBackground>
            <ClockText>{time}</ClockText>
        </ClockBackground>
    )
}

function TopBar() {
    return (
        <TopBarContainer>
            <TopBarBackButton source={require('../assets/back-button.png')} resizeMode={'contain'}/>
            <TopBarText>粤康码（广州）</TopBarText>
            <TopBarMenuBackground source={require('../assets/menu-button.png')} resizeMode={'contain'}>
                <TopBarMenuLeftButton source={require('../assets/share-button.png')} resizeMode={'contain'}/>
                <TopBarMenuRightButton source={require('../assets/close-button.png')} resizeMode={'contain'}/>
            </TopBarMenuBackground>
        </TopBarContainer>
    )
}

export function Header() {
    return (
        <Background source={require('../assets/gradient-background.png')}>
            <TopBar/>
            <Clock/>
        </Background>
    )
}

const Background = styled.ImageBackground`
  height: 555px;
  flex-direction: column;
  align-items: center;
`

const TopBarContainer = styled.View`
  margin-top: 20px;
  height: 100px;
  width: 100%;
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

const ClockBackground = styled.ImageBackground`
  background-color: rgba(30, 30, 30, 0.15);
  width: 70%;
  height: 50px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`

const ClockText = styled.Text`
  font-size: 25%;
  color: white;
  font-weight: 500;
`
