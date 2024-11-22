import SoundPlayer from "react-native-sound-player";

const getSoundPath = (soundName) => {
    switch (soundName) {
      case "ting":
        return require("../assets/sfx/ting.mp3");
      case "ting 2":
        return require("../assets/sfx/ting2.mp3");
      case "motivation":
        return require("../assets/sfx/motivation.mp3");
      case "meditation":
        return require("../assets/sfx/meditation.mp3");
      case "laugh":
        return require("../assets/sfx/laugh.mp3");
      case "notification":
        return require("../assets/sfx/notification.mp3");
      default:
        throw new Error(`Sound ${soundName} not available`);
    }
  };

  export const PlaySound=async(soundpath)=>{
    try {
        const path=await getSoundPath(soundpath)
        // console.log("Getting path: " + path);
        
        SoundPlayer.playAsset(path)
    } catch (error) {
        console.log("Error in playing SOund",error)
        
    }

  }