import styled from "styled-components/native";
import {ListRenderItemInfo, ScrollView, Text, View} from "react-native";
import {Header} from "./Header";
import React, {ElementType} from "react";

export default function HomePage() {
    return (
        <HomePageContainer>
            <ScrollView>
                <Header/>
                <DetailList/>
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

type DetailProps = {
    title: string,
    customComponent: JSX.Element,
}

function DetailList() {
    function renderItem(itemData: ListRenderItemInfo<DetailProps>) {
        return (
            <DetailFlatListItemContainer style={{
                shadowColor: '#d70b0b',
                shadowRadius: 5,
            }}>
                <DetailFlatListItemTitleText>{itemData.item.title}</DetailFlatListItemTitleText>
                {itemData.item.customComponent}
            </DetailFlatListItemContainer>
        )
    }

    const DATA: DetailProps[] = [
        {
            title: "核酸检测结果",
            customComponent: <View/>
        },
        {
            title: "疫苗接种信息",
            customComponent: <Text style={{
                fontSize: 20,
                color: 'rgba(30,30,30,0.5)',
                textAlign: 'center',
            }}>暂无新冠疫苗接种记录</Text>
        }
    ]

    return (
        <DetailFlatList<ElementType> horizontal={true} data={DATA} renderItem={renderItem}/>
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

const DetailFlatList = styled.FlatList`
  height: 20%;
  width: 100%;
`

const DetailFlatListItemContainer = styled.View`
  height: 100%;
  aspect-ratio: 0.7;
`

const DetailFlatListItemTitleText = styled.Text`
  text-align: center;
  font-weight: 500;
`
