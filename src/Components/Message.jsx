import React from 'react'
import {HStack, Avatar, Text} from "@chakra-ui/react"


const Message = ({text,uri,user = "other"}) => {
  return (
    <HStack bg={user==="me" ? "green.200" : "blue.200"} alignSelf={user === "me" ? "flex-end" : "flex-start"} paddingX={"4"} paddingY={"2"} borderRadius={"0 20px 20px 20px"}  >
        {
         user==="other" && <Avatar src={uri}/>

        }
        <Text >{text}</Text>
        {
         user==="me" && <Avatar src={uri}/>

        }
    </HStack>

    
  )
}

export default Message

