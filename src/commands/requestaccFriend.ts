import { Extension, HPacket, HPoint } from "gnode-api"
import { sendNotification } from "../utils"


export let acceptFriendInterval: NodeJS.Timer 

export const run = (ext: Extension, args: String[], from: String) => {
    if(!ext.state.acceptFriend){
    ext.state.acceptFriend = true
    ext.state.selectingUser = true
    sendNotification(`Agora click o usuario para floodar amizade.`, from)
   }else if(ext.state.acceptFriend){
    ext.state.acceptFriend = false
    ext.state.selectedUser = undefined
    clearInterval(acceptFriendInterval)
    sendNotification(`Flood de amizade desativado`, from)
   }
}

export function setAcceptFriendInterval(interval: NodeJS.Timer){
    acceptFriendInterval = interval
}

export const config = {
    name: 'accfriend',
    description: "Aceita e rejeita pedido de amizade de usuario x"
}
