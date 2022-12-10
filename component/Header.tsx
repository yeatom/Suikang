import styled from "styled-components/native";
import {useEffect, useRef, useState} from "react";
import moment from "moment";
import QRCodeImage from 'react-native-qrcode-svg';
import {Animated, Easing} from "react-native";
import {LinearGradient} from 'expo-linear-gradient'

function Clock() {
    function currentTime() {
        return moment().format('YYYY/MM/DD HH:mm:ss')
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

function Name() {
    return <NameText>{'刘*彤'}</NameText>
}

function QRCode() {
    const translateAnim1 = useRef(new Animated.Value(-230)).current;
    const translateAnim2 = translateAnim1.interpolate({
        inputRange: [-230, 0, 0, 200],
        outputRange: [0, 200, -230, 0]
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateAnim1, {
                toValue: 200,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true
            }),
        ).start()
    }, [])

    return (
        <QRCodeContainer>
            <QRCodeMarqueeBackground>
                <QRCodeMarqueeDiagonalLine anim={translateAnim1}/>
                <QRCodeMarqueeDiagonalLine anim={translateAnim2}/>
                <QRCodeImageBackground>
                    <QRCodeImage
                        value={JSON.stringify({
                            codeId: "0bb0860dd4f43acf7b3ec400391bdb04",
                            zoning: "440100",
                            s: "7f1eeb9333fa985850fd3b8888034faaa8974e42810ef170"
                        })}
                        color={'#5AB297'}
                        size={170}
                    />
                </QRCodeImageBackground>
            </QRCodeMarqueeBackground>
            <QRCodeStatusContainer>
                <QRCodeStatusText>绿码</QRCodeStatusText>
                <QRCodeRefreshContainer>
                    <QRCodeRefreshImage style={{tintColor: 'rgba(30, 30, 30, 0.4)'}}
                                        source={require('../assets/refresh-button.png')}
                                        resizeMode={'contain'}/>
                    <QRCodeRefreshText>刷新</QRCodeRefreshText>
                </QRCodeRefreshContainer>
            </QRCodeStatusContainer>
        </QRCodeContainer>
    )
}

export function Header() {
    return (
        <Background source={require('../assets/gradient-background.png')}>
            <TopBar/>
            <Clock/>
            <Name/>
            <QRCode/>
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

const NameText = styled.TextInput`
  color: white;
  font-size: 22px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
`

const QRCodeContainer = styled.ImageBackground`
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 7px;
  border-radius: 5px;
`

const QRCodeImageBackground = styled.ImageBackground`
  background-color: white;
  margin: 5px;
  padding: 5px;
  justify-content: center;
  align-items: center;
`

const QRCodeMarqueeBackground = styled.ImageBackground`
  background-color: #5cc4a4;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 5px;
`

const QRCodeMarqueeDiagonalLine = (pros: { anim: Animated.AnimatedWithChildren }) => {
    const Gradient = Animated.createAnimatedComponent(styled(LinearGradient)`
      width: 30%;
      height: 200%;
      position: absolute;
    `)

    return <Gradient
        style={{transform: [{translateX: pros.anim}, {rotate: "45deg"}]}}
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        locations={[0.1, 0.6]}
        colors={['rgba(90,178,151,0)', '#26ffba', 'rgba(90,178,151,0)']}
    />
}

const QRCodeStatusContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 3px;
`

const QRCodeStatusText = styled.Text`
  color: #5AB297;
  font-weight: 900;
  font-size: 20px;
`

const QRCodeRefreshContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const QRCodeRefreshImage = styled.Image`
  height: 18px;
  width: 18px;
  margin: 0 5px 0 7px;
`

const QRCodeRefreshText = styled.Text`
  font-size: 20px;
  color: rgba(30, 30, 30, 0.4);
`
