import {Box,Container, VStack, HStack,Button,Input} from "@chakra-ui/react"
import Message from "./Components/Message"
import {GoogleAuthProvider, signOut, onAuthStateChanged,getAuth, signInWithPopup} from "firebase/auth"
import {getFirestore, addDoc,query,orderBy, collection, serverTimestamp, onSnapshot} from "firebase/firestore"
import {app} from "./Components/Firebase"
import { useEffect, useRef, useState } from "react";

const auth = getAuth(app) ;
const db = getFirestore(app) ;


const LoginHandler = ()=>{
 const Provider = new GoogleAuthProvider();
 signInWithPopup(auth, Provider) ;
}

const LogoutHandler = ()=>{
  signOut(auth);
}
function App() {
  const q = query(collection(db,"Messages"),orderBy("createAt","asc"))
  const [user,setUser] = useState(false);
  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);

const divForScroll = useRef(null);
  const SubmitHandler = async(e) =>{
    e.preventDefault();
    try {
      setMessage("");
      await addDoc(collection(db,"Messages"),{
        text:message,
        uid:user.uid,
        uri:user.photoURL,
        createAt:serverTimestamp(),
      });
      divForScroll.current.scrollIntoView({behaviour:"smooth"})
    } catch (error) {
      alert(error);
    }
    }
  useEffect(()=>{
    const Unsubscribe = onAuthStateChanged(auth,(data)=>{
      setUser(data);
    });
   const UnsubscribeForMessage = onSnapshot(q,(snap)=>{
     setMessages(
      snap.docs.map((item)=>{
        const id  = item.id;
        return {id, ...item.data()};
      })
     ) 
    })
    return()=>{
      Unsubscribe();
      UnsubscribeForMessage();
    };
  },[]);

  return (
  
  <Box bg={"red.50"}>
    {
      user?(
        <Container h={"100vh"} bg={"white"}>
   <VStack h={"full"} paddingY={"4"}>
    <Button onClick={LogoutHandler} colorScheme="red" w={""}>
      Logout
    </Button>
    <VStack w={"full"} h={"full"}  overflowY={"auto"} css={{"&::-webkit-scrollbar":{
      display:"none"
    }}}>
    {
      messages.map(item=>(
        <Message key={item.id} text={item.text} uri={item.uri} user ={item.uid===user.uid?"me":"other"}></Message>
      ))
    }

    <div ref={divForScroll}></div>
    </VStack>
    <form onSubmit={SubmitHandler} style={{width:"100%"}}>
    <HStack>
    <Input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Input message here.."></Input>
    <Button type="submit" colorScheme="whatsapp">Send</Button>
    </HStack>
    </form>
   </VStack>
    </Container>
      ):<VStack h={"100vh"} justifyContent={"center"}>
        <Button onClick={LoginHandler} colorScheme="whatsapp">
          Sign in with Google
        </Button>
      </VStack>
    }
  </Box>
  );
}

export default App;
