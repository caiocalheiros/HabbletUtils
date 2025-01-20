import { Extension, HPacket, HPoint } from "gnode-api"
import { sendNotification } from "../utils/habbo/notify";

export let upcameraInterval: NodeJS.Timer;

export const run = (ext: Extension, args: String[], from: String) => {
   if(!ext.state.blockCamera){
    ext.state.blockCamera = true
    upcameraInterval = setInterval(() => {
      ext.sendToServer(new HPacket (`{out:PurchasePhoto}{s:""}`))
  }, 1000);
    sendNotification(`O up de fotos foi habilitado!`, from)
   }else if(ext.state.blockCamera){
    ext.state.blockCamera = false
    clearInterval(upcameraInterval)
    sendNotification(`O up de fotos foi desativado!`, from)
   }
}
export const config = {
    name: 'upcamera',
    description: "Ativa ou desativa o up de fotos"
}
