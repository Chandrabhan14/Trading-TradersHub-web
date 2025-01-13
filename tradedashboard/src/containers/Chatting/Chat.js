// import React, { useEffect, useState } from "react";
// import NavBottom from "../../components/nav/NavBottom/NavBottom";
// import ChannelSidebar from "./ChannelSidebar";
// import { RiGalleryFill } from "react-icons/ri";
// import { MdOutlineGifBox } from "react-icons/md";
// import { BsEmojiSmile } from "react-icons/bs";
// import { HiLocationMarker } from "react-icons/hi";
// import { BsTypeBold } from "react-icons/bs";
// import { BiItalic } from "react-icons/bi";
// import { LuCalendarClock } from "react-icons/lu";
// import { AiOutlineBars } from "react-icons/ai";
// import { BsFillSendFill } from "react-icons/bs";
// import ChannelChats from "./ChannelChats";
// import { usePubNub } from "pubnub-react";
// import * as PubComponent from "@pubnub/react-chat-components";
// // import {}
// import chatHeaderImg from "../../assets/img/logo/log.jpg";

// import { getDiscordChannels } from "../../services/DashboardServices";
// import { getChatChannelData, getChatTime, getTimeToken } from "../../services/UserServices";
// import { useAuth } from "../../components/auth/useAuth";
// import WithAuth from "../../components/auth/withAuth";
// import moment from "moment";
// import axios from "axios";
// // import emojiData from "@emoji-mart/data";
// // import Picker, { IEmojiData } from "emoji-picker-react";
// import emojiData from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";



// const initialChannel = [
//   // {
//   //   "name": "Introduction",
//   //   "custom": {
//   //     "profileUrl": "https://www.gravatar.com/avatar/149e60f311749f2a7c6515f7b34?s=256&d=identicon"
//   //   },
//   //   "description": "",
//   //   "eTag": "AbOx6N+6vu3zoAE",
//   //   "updated": "2020-09-23T09:23:37.175764Z"
//   // },
//   // {
//   //   "name": "Annoucements",
//   //   "custom": {
//   //     "profileUrl": "https://www.gravatar.com/avatar/2ada61db17878cd388f95da34f9?s=256&d=identicon"
//   //   },
//   //   "description": "",
//   //   "eTag": "Ab+2+deSmdf/Fw",
//   //   "updated": "2020-09-23T09:23:36.960491Z"
//   // },
//   // {
//   //   "name": " Channel-directory",
//   //   "custom": {
//   //     "profileUrl": "https://www.gravatar.com/avatar/363d9255193e45f190539e0c7d5?s=256&d=identicon"
//   //   },
//   //   "description": "",
//   //   "eTag": "AcrWgrqgmcyHswE",
//   //   "updated": "2020-09-23T09:23:37.183458Z"
//   // },
//   // {
//   //   "name": "Wins:gains",
//   //   "custom": {
//   //     "profileUrl": "https://www.gravatar.com/avatar/a652eb6cc340334ff0b244c4a39?s=256&d=identicon"
//   // },
//   // "description": "",
//   // "eTag": "AfD93cn945yNTA",
//   // "updated": "2020-09-23T09:23:36.951506Z"
//   // },{
//   //   "name": "Wins:lessons",
//   //   "custom": {
//   //     "profileUrl": "https://www.gravatar.com/avatar/515fc9a2a1a895f4059c84b2971?s=256&d=identicon"
//   //   },
//   //   "description": " ",
//   //   "eTag": "AZSu2tPUuLeO2QE",
//   //   "updated": "2020-09-23T09:23:36.935077Z"
//   // },{
//   //   "name": "General-chat",
//   //   "custom": {
//   //     "profileUrl": "https://www.gravatar.com/avatar/a204f87d215a40985d35cf84bf5?s=256&d=identicon"
//   // },
//   // "description": " ",
//   // "eTag": "AZ2/xY3Qv9GGUQ",
//   // "updated": "2020-09-23T09:23:36.945993Z"
//   // },{
//   //   "name": "Options-bot-alerts",
//   //   "custom": {
//   //     "profileUrl": "https://www.gravatar.com/avatar/c1ee1eda28554d0a34f9b9df5cfe?s=256&d=identicon"
//   // },
//   // "description": " ",
//   // "eTag": "Adzu4uSC45jGsgE",
//   // "updated": "2020-09-23T09:23:36.939098Z"
//   // },{
//   //   "name": "Youtube",
//   //   "custom": {
//   //     "profileUrl": "https://www.gravatar.com/avatar/363d9255193e45f190539e0c7d5?s=256&d=identicon"
//   // },
//   // "description": " ",
//   // "eTag": "AcrWgrqgmcyHswE",
//   // "updated": "2020-09-23T09:23:37.183458Z"
//   // },
// ];

// const Chat = () => {
//   const [showMsg, setShowMsg] = useState(false);
//   // const [channels] = useState(initialChannel || []);
//   const [channels, setChannels] = useState([]);

//   const pubnub = usePubNub();

//   const [messages, addMessage] = useState([]);
//   const [message, setMessage] = useState("");
//   const [uid, setUid] = useState();
//   // const [error, setError] = useState("");
//   //  const [channels, fetchPage, total, error] = PubComponent.useChannels();
//   const [selectedChannel, setSelectedChannel] = useState(null);
//   const [unReadMessage, setunReadMessage] = useState([])

//   const [moreKeysWithTimestamp, setMoreKeysWithTimestamp] = useState({});
//   const [timeStamp, setTimestamp] = useState({});
//   const currentChannel = selectedChannel?.name;

//   // console.log(channels, "-------------. channels");
//   const { isAdmin } = useAuth();

//   console.log(isAdmin);

//   const getChannelData = async (uID) => {
//     try {
//       const response = await getChatChannelData(uID);
//       // console.log("channel response ==> ", response.data.data)
//       if (response.status == 200) {
//         const read = response?.data?.data?.read.map((item) => {
//           return {
//             name: item,
//             isWrite: false,
//             count: response?.data?.data?.timeStamp?.[item] || 0,
        
         
//             // messageCount:0
//           };
//         });
//         const write = response?.data?.data?.write.map((item) => {
//           return {
//             name: item,
//             isWrite: true,
//             count: response?.data?.data?.timeStamp?.[item] || 0,
            
//             // messageCount:0
        
//           };
//         });
//         let newObj = [...write, ...read];

//         // newObj.sort((a, b) => a.name.localeCompare(b.name));
//         newObj.sort((a, b) => a.name.localeCompare(b.name));

//         setChannels(newObj);
//         fetchTimeTokenData(newObj);
//         setSelectedChannel(newObj[0]);
//         fetchTimeTokenDataFinal(newObj);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     pubnub.subscribe({ channels });
//     return () => {
//       pubnub.unsubscribe({ channels });
//     };
//   }, [pubnub, channels, selectedChannel]);

//   const disableContextMenu = (e) => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     const dataString = localStorage.getItem("googledata");
//     const userDataFromLocalStorage = JSON.parse(dataString);
//     const uid = userDataFromLocalStorage?.uid;
//     setUid(uid);

//     getChannelData(uid);
//   }, []);

//   // console.log(channels, "--------------> channels");

//   const fetchTimeTokenData = async (channels) => {
//     const channelNames = channels.map((channel) => channel?.name);
//     const channelNamesString = channelNames.join(",");

//     // console.log(channelNamesString, "cNames for send in api 150");
//     const url = `https://ps.pndsn.com/v3/history/sub-key/sub-c-cef51d86-8529-4c04-b216-17ca204e357b/message-counts/${channelNamesString}?timetoken=0`;

//     const headers = {
//       Accept: "application/json",
//     };

//     try {
//       const response = await axios.get(url, { headers });
//       if (response?.status == 200) {
//         const moreKeysWithTimestamp = {};

//         Object.entries(response?.data?.more).forEach(([key, value]) => {
//           const timestamp = value.url.match(/timetoken=(\d+)/);
//           moreKeysWithTimestamp[key] = timestamp ? timestamp[1] : null;
//         });
//         // Object.entries(response?.data?.channels).forEach(([key, value]) => {
//         //   moreKeysWithTimestamp[key] = value;
//         // });
//         setMoreKeysWithTimestamp(moreKeysWithTimestamp);
//       }

//       // console.log(response.data);
//     } catch (error) {
//       console.error("Error making the API request:", error.message);
//     }
//   };

//   const jsonData = JSON.stringify(moreKeysWithTimestamp);

//   console.log(jsonData, "jsonData");

//   const updateTimeStamp = async (uid, jsonData) => {
//     const jsonPayload = JSON.parse(jsonData);

//     //  console.log(jsonPayload,"consoling json")

//     try {
//       // console.log(jsonData, "jsonDatajsonData------------>");
//       const response = await getChatTime(uid, jsonPayload);
//       // console.log(response, "timeStamp ------------->");
//     } catch (error) {
//       console.log(error);
//     }
//   };



//   useEffect(() => {
//     const dataString = localStorage.getItem("googledata");
//     const userDataFromLocalStorage = JSON.parse(dataString);
//     const uid = userDataFromLocalStorage?.uid;
//     setUid(uid);

//     const jsonData = JSON.stringify(moreKeysWithTimestamp);

//     if (jsonData) {
//       updateTimeStamp(uid, jsonData);
//       fetchChatTimeData(uid);

//     }

//   }, [jsonData]); 


//   const fetchChatTimeData = async (uid) => {
//     try {
//       // setLoading(true);
//       const response = await getTimeToken(uid);

//       // console.log(response, "----------------time give plwaeese")
//       if (response.status == 200) {
//         const newobj = response?.data?.data?.timeStamp;


//         const timeStampArray = Object.entries(newobj).map(([key, value]) => ({ [key.trim()]: value }))

//         // console.log(timeStampArray, "timeStampArray");

//         setunReadMessage(timeStampArray);

//       }
//       // setLoading(false);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     // /
//   };


//   const fetchTimeTokenDataFinal = async (channels) => {
//     const channelNames = channels?.map((channel) => channel?.name);
//     const channelNamesString = channelNames?.join(",");

//     const channelCounts = channels?.map((channel) => channel?.count);
//     const channelCountData = channelCounts?.join(",");
  
//     const url = `https://ps.pndsn.com/v3/history/sub-key/sub-c-cef51d86-8529-4c04-b216-17ca204e357b/message-counts/${channelNamesString}?channelsTimetoken=${channelCountData}`;

//     const headers = {
//       Accept: "application/json",
//     };

//     try {
//       const response = await axios.get(url, { headers });

//       // console.log(response , "-----------------------298")
//       if (response?.status == 200) {

//       const newchannels =  channels.map((item)=> {
        
//             const messageCount =  response?.data?.channels[item.name] || 0
//             return {
//               ...item,
//               messageCount: messageCount
//             }
//         });
//         console.log(newchannels,"=================???=-=======?")
//         setChannels(newchannels)
//         setTimestamp(response?.data?.channels)
//       }
//     } catch (error) {
//       console.error("Error making the API request:", error.message);
//     }
//   }

// // console.log(timeStamp,"----------time stamp-------->")


//   // console.log(unReadMessage, "unReadMessage--------------->")
//   const renderMessage = (props) => {
//     console.log(props)
//     const isActive = props === selectedChannel;
//     const countThreshold = 1;
//     return (
//       <div className={isActive ? 'active' : ''} style={{ cursor: "pointer" }} onClick={() => setSelectedChannel(props)}>
//         <p>
//           <strong >{props.name}</strong>
          
//           {/* if() */}
//           {/* {props?.messageCount > countThreshold && (
//             <strong> {props?.messageCount}</strong>
//           )} */}
//         </p>

//       </div>
//     );
//   };

//   //   const MyFilePreview = (file) => {
//   //   if (file.type.startsWith('image/')) {
//   //     return (
//   //       <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: 100 }} />
//   //     );
//   //   } else {
//   //     return (
//   //       <div>
//   //         <i className={`fa fa-file-${file.type.split('/')[1]}`} /> {file.name}
//   //       </div>
//   //     );
//   //   }
//   // };
//   const MyFilePreview = (file) => {
//     if (!file) {
//       return null;
//     }

//     //     if (file?.type?.startsWith('image/')) {
//     //     return (
//     //       <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: 100 }} />
//     //     );
//     //   } else {
//     //     return (
//     //       <div>
//     //         <i className={`fa fa-file-${file.type?.split('/')[1]}`} /> {file.name}
//     //       </div>
//     //     );
//     //   }
//     // };
//     const fileExtension = file.name.split('.').pop().toLowerCase();

//     if (file.type.startsWith('image/')) {
//       // Preview for image files
//       return (
//         <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '200px', maxHeight: '200px', margin: '10px', borderRadius:'8px' ,objectFit: 'cover' }} />
//       );
//     } else if (['mp4', 'webm', 'avi', 'mkv'].includes(fileExtension)) {
//       // Preview for video files
//       return (
//         <video width="200px" height="200" controls style={{ margin: '10px', borderRadius:'8px' }}>
//           <source src={URL.createObjectURL(file)} type={file.type} />
//           Your browser does not support the video tag.
//         </video>
//       );
//     } else {
//       // Preview for other file types
//       return (
//         <div>
//           <i className={`fa fa-file-${fileExtension}`} /> {file.name}
//         </div>
//       );
//     }
//   };


//   const retryOptions = {
//     maxRetries: 5,
//     timeout: 1000,
//     exponentialFactor: 2,
//   };




//   return (
//     <div onContextMenu={disableContextMenu}>
//       <NavBottom isStyleChanged />
//       <div className="notify-overlay"></div>

//       {/* <PubComponent.Chat  {...{ currentChannel, theme }}> */}
//       <PubComponent.Chat currentChannel={selectedChannel?.name} theme="light" retryOptions={retryOptions}>
//         <div className="dashboard-area bg-color area-padding">
//           <div className="container-fluid Chat_section_hp">
//             <div className="row align-items-stretch">
//               <div className="col-xl-3 col-lg-4 col-md-5 col-12 mb-4">
//                 <div className="chat_member_list_area">
//                   {/* <ChannelSidebar /> */}
//                   <PubComponent.ChannelList

//                     onChannelSwitched={(channel) => setSelectedChannel(channel)}
//                     channels={channels}
//                     // extraActionsRenderer={()=> {  <p>{unReadMessage?.map((e)=> e.namee)}</p>}}
//                     channelRenderer={(props) => renderMessage(props)}

//                   />
//                 </div>
//               </div>

//               <div className="col-xl-9 col-lg-8 col-md-7 col-12 mb-4">
//                 <div className="chat_member_Detail_area">
//                   <div className="chat_member_Detail_header_hp">
//                     <div className="chat_member_Detail_header_img">
//                       <img src={chatHeaderImg} />
//                     </div>
//                     <p className="mb-0"> {selectedChannel?.name} </p>
//                   </div>
//                   <PubComponent.MessageList     
                  
//                   extraActionsRenderer = {(message)=>  console.log(message ," message props")}

//                   fileRenderer={(file) => {

//                     // console.log(file,"--------")
//                     if (!file) {
//                       return null;
//                     }
//                     const fileExtension = file?.name.split('.').pop();

//                     if (fileExtension) {
//                       if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension.toLowerCase())) {
//                         return (
//                           <img src={file?.url} alt={file?.name} style={{ width: 100 }} />
//                         );
//                       } else if (['mp4', 'webm', 'avi', 'mkv'].includes(fileExtension.toLowerCase())) {
//                         return (
//                           <video width="320" height="240" controls>
//                             <source src={file?.url} type={`video/${fileExtension}`} />
//                             Your browser does not support the video tag.
//                           </video>
//                         );
//                       } else {
//                         return (
//                           <div>
//                             <a href={file?.url} download={file?.name}>
//                               <i className={`fa fa-download`} /> Download {file?.name}
//                             </a>
//                           </div>
//                         );
//                       }
//                     }
//                   }
//                   }


//                     typingIndicator={true}
//                     // welcomeMessages={"MessageEnvelope"}
//                     enableReactions reactionsPicker={<Picker data={emojiData} />} fetchMessages={10} />
//                   <PubComponent.MessageInput

            
//                   typingIndicator 
//                   fileUpload={"all"}
//                   filePreviewRenderer={MyFilePreview }
//                     emojiPicker={<Picker data={emojiData} />}
//                     disabled={
//                       isAdmin ? false : selectedChannel?.isWrite == false
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </PubComponent.Chat>
//     </div>
//   );
// };

// export default WithAuth(Chat);
