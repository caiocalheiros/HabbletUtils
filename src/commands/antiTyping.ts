import { Extension } from "gnode-api"
import { sendNotification } from "../utils"

export const run = (ext: Extension, args: String[], from: String) => {
    ext.state.antiTyping = !ext.state.antiTyping
    sendNotification(`${ext.state.antiTyping ? 'Habilitado' : 'Desabilitado'} ${config.name}`, from)
}

export const config = {
    name: 'antityping',
    description: "Ativa ou desativa o anti typing (balão de fala)"
}
