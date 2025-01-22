import { Extension, HPacket, HPoint } from "gnode-api"
import { sendNotification } from "../utils"


export let requestFriendInterval: NodeJS.Timer 

export const run = (ext: Extension, args: String[], from: String) => {
    if(!ext.state.requestFriend){
    ext.state.requestFriend = true
    ext.state.selectingUser = true
    sendNotification(`Agora click o usuario para floodar amizade.`, from)
   }else if(ext.state.requestFriend){
    ext.state.requestFriend = false
    ext.state.selectedUser = undefined
    clearInterval(requestFriendInterval)
    sendNotification(`Flood de amizade desativado`, from)
   }
}

export function setRequestFriendInterval(interval: NodeJS.Timer){
    requestFriendInterval = interval
}

export const config = {
    name: 'spamfriend',
    description: "Spamma pedido de amizade em usuario x"
}
