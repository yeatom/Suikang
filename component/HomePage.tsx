import styled from "styled-components/native";
import {Image, ImageSourcePropType, ListRenderItemInfo, ScrollView, View} from "react-native";
import {Header} from "./Header";
import React, {ElementType} from "react";
import DataApi, {DetailProps} from "../data/DataApi";

export default function HomePage() {
    return (
        <HomePageContainer>
            <ScrollView>
                <Header/>
                <FakeCard source={require('../assets/fake-card-1.jpg')} height={105} marginTop={10}/>
                <DetailList/>
                <FakeCard source={require('../assets/fake-card-2.jpg')} height={130} marginTop={-43}/>
                <CaringModelButton/>
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

function DetailList() {
    const DATA = DataApi.retrieveDetail()

    function renderItem(itemData: ListRenderItemInfo<DetailProps>) {
        const {borderColor, title, customComponent} = itemData.item;
        return (
            <DetailFlatListItemContainer>
                <DetailFlatListItemInnerContainer borderColor={borderColor}>
                    <DetailFlatListItemTitleText>{title}</DetailFlatListItemTitleText>
                    <DetailFlatListItemCustomComponentContainer>
                        {customComponent}
                    </DetailFlatListItemCustomComponentContainer>
                </DetailFlatListItemInnerContainer>
            </DetailFlatListItemContainer>
        )
    }

    return (
        <DetailFlatList<ElementType>
            horizontal={true}
            data={DATA} renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingLeft: 10,
                paddingRight: 10,
            }}
        />
    )
}

function CaringModelButton() {
    return (
        <CaringModelButtonContainer>
            <CaringModelButtonImage style={{tintColor: '#449bf1'}} source={require('../assets/refresh-button.png')}
                                    resizeMode={'contain'}/>
            <CaringModelButtonText>切换至关怀模式</CaringModelButtonText>
        </CaringModelButtonContainer>
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

const DetailFlatListItemContainer = (props: { children: React.ReactNode }) =>
    <View style={{
        shadowColor: 'rgba(30,30,30,0.5)',
        shadowRadius: 7,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        height: '72%',
        aspectRatio: 1.25,
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 7,
        padding: 3,
        margin: 5,
        backgroundColor: 'white',
    }}>
        {props.children}
    </View>


const DetailFlatListItemInnerContainer = styled.View<{ borderColor?: string }>`
  height: 100%;
  width: 100%;
  border-radius: 7px;
  background-color: white;
  border-width: 0.35px;
  border-color: ${props => props.borderColor || 'rgba(30,30,30,0.3)'};
`

const DetailFlatListItemTitleText = styled.Text`
  text-align: center;
  font-weight: 600;
  margin: 5px;
`

const DetailFlatListItemCustomComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 20px;
`

const FakeCard = (props: { source: ImageSourcePropType, height: number, marginTop?: number }) =>
    <View
        style={{
            width: '92.5%',
            height: props.height,
            shadowColor: 'rgba(30,30,30,0.5)',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            borderRadius: 7,
            marginTop: props.marginTop,
            padding: 1,
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <Image
            style={{
                width: '100%',
                height: '100%',
            }}
            resizeMode={'contain'}
            source={props.source}/>
    </View>

const CaringModelButtonContainer = styled.View`
  flex: 1;
  height: 50px;
  border-radius: 3px;
  justify-content: center;
  border-color:  #449bf1;
  align-items: center;
  flex-direction: row;
  border-width: 1px;
  margin: 20px 15px 50px 15px;
`

const CaringModelButtonImage = styled.Image`
  height: 25px;
  width: 25px;
`

const CaringModelButtonText = styled.Text`
  color: #449bf1;
  margin-left: 10px;
  font-weight: 700;
  font-size: 17px;
`
