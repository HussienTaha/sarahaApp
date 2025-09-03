import { Router } from "express";
import { createmessage, deleteAllMessages, getMessage, listMessages } from "./message.service.js";
import { createMessageSchema, getMessageSchema, listMessagesSchema } from "./message.vaildation.js";
import { vaildation } from "../../middleware/vaildation.js";
import { authentication } from "../../middleware/authantction.js";

const messageRouter =Router( {  caseSensitive: true , strict : true  }  )


 
 messageRouter.post("/send",vaildation(createMessageSchema),createmessage);
 messageRouter.get("/messages", authentication,vaildation(listMessagesSchema),listMessages);
messageRouter.get("/messages/:id",vaildation(getMessageSchema),authentication,getMessage);
messageRouter.delete("/deleteAllMessages",authentication,deleteAllMessages);
 

export default messageRouter;