import {Text, View} from "react-native";
import moment from "moment/moment";
import React from "react";

export interface DetailProps {
    title: string,
    borderColor?: string,
    customComponent: JSX.Element,
}

function retrieveDetail(): DetailProps[] {
    return [
        {
            title: "核酸检测结果",
            borderColor: '#28dea3',
            customComponent:
                <View style={{alignItems: 'center'}}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#20c490'
                    }}>
                        阴性
                    </Text>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '300',
                        color: 'rgba(30,30,30,0.3)',
                    }}>
                        {moment().format('YYYY-MM-DD 07:21')}
                    </Text>
                    <Text style={{
                        marginTop: 20,
                        padding: 3,
                        borderColor: '#0081ff',
                        borderWidth: 0.5,
                        borderRadius: 13,
                        width: 85,
                        color: '#0081ff',
                        textAlign: 'center'
                    }}>
                        点击查看
                    </Text>
                </View>
        },
        {
            title: "疫苗接种信息",
            customComponent:
                <Text style={{
                    fontSize: 20,
                    color: 'rgba(30,30,30,0.35)',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}>
                    暂无新冠疫苗接种记录
                </Text>
        }
    ];
}

export default {
    retrieveDetail
}
