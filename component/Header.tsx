import styled from "styled-components/native";
import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import QRCodeImage from 'react-native-qrcode-svg';
import {Alert, Animated, Dimensions, Easing, Image, TouchableWithoutFeedback, View} from "react-native";
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
        </TopBarContainer>
    )
}

function Name() {
    function name() {
        return '刘*华'
    }

    return <NameText>{name()}</NameText>
}

function QRCode() {
    function getRandomArbitrary(min: number, max: number) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    const generateCode = `\n${getRandomArbitrary(1000, 9999)} ${getRandomArbitrary(1000, 9999)}\n`;

    function createAlert() {
        Alert.alert(
            "动态验证码", generateCode,
            [{text: "知道了", style: "cancel"},]
        );
    }

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
                    <TouchableWithoutFeedback onPress={createAlert}>
                        <View>
                            <QRCodeImage
                                value={JSON.stringify({
                                    codeId: "0bb0860dd4f43acf7b3ec400391bdb04",
                                    zoning: "440100",
                                    s: "7f1eeb9333fa985850fd3b8888034faaa8974e42810ef170"
                                })}
                                color={'#5AB297'}
                                size={170}
                            />
                        </View>
                    </TouchableWithoutFeedback>
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

function LastReportTime() {
    return (
        <LastReportTimeContainer>
            <LastReportTimeHintText>最新上报时间：</LastReportTimeHintText>
            <LastReportTimeText>2022/02/12</LastReportTimeText>
        </LastReportTimeContainer>
    )
}

function BottomBar() {
    return (
        <BottomBarContainer>
            <BottomBarText>上报健康信息</BottomBarText>
            <BottomBarSeparateLine/>
            <BottomBarText>健康码管理</BottomBarText>
            <BottomBarTopLine/>
        </BottomBarContainer>
    )
}

function SideBar() {
    return (
        <SideBarContainer>
            <SideBarText>常见问题</SideBarText>
        </SideBarContainer>
    )
}

function WavyLines() {
    const windowWidth = Dimensions.get('window').width;
    const singleHeight = windowWidth / 6;
    const linesNum = 4

    const translateAnimBase = useRef(new Animated.Value(0)).current;

    const animates: Animated.AnimatedWithChildren[] = [];
    for (let i = 1; i <= linesNum; i++) {
        const topHeight = 100 * (i / linesNum);
        const translateAnim = translateAnimBase.interpolate({
            inputRange: [0, topHeight, topHeight, 100],
            outputRange: [0, -singleHeight * i, singleHeight * (linesNum - i), 0],
        });
        animates.push(translateAnim)
    }

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateAnimBase, {
                toValue: 100,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true
            }),
        ).start()
    }, [])

    return (
        <WavyLinesContainer>
            {animates.map(function (animate, index) {
                return <WavyLine anim={animate} key={index}/>
            })}
            <WavyLinesMask/>
        </WavyLinesContainer>
    )
}

export function Header() {
    return (
        <Background source={require('../assets/gradient-background.png')}>
            <WavyLines/>
            <TopBar/>
            <Clock/>
            <Name/>
            <QRCode/>
            <LastReportTime/>
            <BottomBar/>
            <SideBar/>
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
  justify-content: flex-start;
  align-items: center;
`

const TopBarBackButton = styled.Image`
  height: 20px;
`

const TopBarText = styled.Text`
  font-size: 18px;
  color: white;
  padding-left: 90px;
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
        locations={[0.1, 0.6, 1]}
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

const LastReportTimeContainer = styled.View`
  margin-top: 17px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const LastReportTimeHintText = styled.Text`
  font-size: 14.5px;
  color: white;
`

const LastReportTimeText = styled.Text`
  color: white;
  font-size: 14.5px;
  font-weight: 500;
`

const BottomBarContainer = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 8%;
  flex-direction: row;
`

const BottomBarText = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  flex: 1;
  text-align: center;
  font-size: 17px;
`

const BottomBarSeparateLine = styled.View`
  height: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  width: 1px;
`

const BottomBarTopLine = styled.View`
  height: 0.5px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 90%;
  position: absolute;
  top: 0;
`

const SideBarContainer = styled.View`
  position: absolute;
  right: 0;
  top: 50%;
  border-radius: 5px;
  transform: translateX(5px);
  background-color: rgba(255, 255, 255, 0.2);
`

const SideBarText = styled.Text`
  margin: 10px 8px 10px 7px;
  width: 15px;
  font-size: 15px;
  color: white;
  line-height: 22px;
`

const WavyLinesContainer = styled.View`
  position: absolute;
  width: 100%;
  top: 0;
  //flex-wrap: wrap;
  height: 32%;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
`

const WavyLine = (pros: { anim: Animated.AnimatedWithChildren }) => {
    const Outer = Animated.createAnimatedComponent(styled.View`
      opacity: 1;
      width: 100%;
      aspect-ratio: 6;
    `)

    return (
        <Outer style={{transform: [{translateY: pros.anim}]}}>
            <Image
                style={{
                    width: '100%',
                    height: '100%',
                }}
                source={require('../assets/wavy-line.png')}
                resizeMode={'contain'}
            />
        </Outer>
    )
}

const WavyLinesMask = () =>
    <LinearGradient
        style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
        }}
        colors={['rgba(79,141,238,0.7)', '#4F8DEE']}
    />
