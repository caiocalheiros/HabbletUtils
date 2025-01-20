import { Extension, HDirection, HMessage } from "gnode-api"

export const run = (ext: Extension , hMessage: HMessage) => {
  if(ext.state.blockCamera === true) hMessage.blocked = true
}

export const config = {
    direction: HDirection.TOCLIENT,
    header: 'HabboBroadcast',
}