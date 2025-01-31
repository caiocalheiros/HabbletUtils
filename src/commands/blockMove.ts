import { Extension } from "gnode-api"
import { sendNotification } from "../utils"

export const run = (ext: Extension, args: String[], from) => {
    ext.state.blockMove = !ext.state.blockMove
    sendNotification(`${ext.state.blockMove ? 'Habilitado' : 'Desabilitado'} ${config.name}`, from)
}

export const config = {
    name: 'blockmove',
    description: "Ativa ou desativa a função de andar"
}
