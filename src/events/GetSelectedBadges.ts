import { Extension, HDirection, HMessage, HPacket } from "gnode-api"
import { sendNotification } from "../utils/habbo/notify";
import { setClickFloodInterval } from "../commands/floodClick";
import { setHanditemFloodInterval } from "../commands/floodHanditem";

export const run = (ext: Extension , hMessage: HMessage) => {
    const packet = hMessage.getPacket()
    const id = packet.readInteger()
    
    if (ext.state.selectingUser) {
        ext.state.selectingUser = false
        ext.state.selectedUser = id
        const user = ext.roomUsers.find((user) => user.id === ext.state.selectedUser)
        
        if (ext.state.clickFlood) {
            let int = setInterval(() => {
                if (ext.state.selectedUser && ext.state.clickFlood) {
                    ext.sendToServer(new HPacket(`{out:GetSelectedBadges}{i:${ext.state.selectedUser}}`));
                }
            }, 100)
            setClickFloodInterval(int)
            sendNotification(`Habilitado floodclick ${user ? `em ${user.name}` : "mas notei que roomUsers está vazio, reentre na sala para consertar"}`)
        } else if (ext.state.handItemFlood) {
            let int = setInterval(() => {
                if (ext.state.selectedUser && ext.state.handItemFlood) {
                    ext.sendToServer(new HPacket(`{h:355}{i:${ext.state.handItemFurni}}`))
                    ext.sendToServer(new HPacket(`{out:PassCarryItem}{i:${ext.state.selectedUser}}`));
                }
            }, 75)
            setHanditemFloodInterval(int)
            sendNotification(`Habilitado flood de handitem ${user ? `em ${user.name}` : "mas notei que roomUsers está vazio, reentre na sala para consertar"}`)
        }
    }

    if (!ext.state.antiShowClick) return;

    const user = ext.roomUsers.find(user => user.id === id)

    if (!user) {
        return sendNotification(`bloqueei seu click, mas não consigo encontrar o usuário na minha lista de usuários, reentre na sala para consertar`)
    } else if (user.id === ext.userObject.id) return;

    hMessage.blocked = true;
    sendNotification(`Click bloqueado em ${user.name}`)
}

export const config = {
    direction: HDirection.TOSERVER,
    header: 'GetSelectedBadges',
}