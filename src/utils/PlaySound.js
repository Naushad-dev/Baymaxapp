// import { Audio } from "expo-av";

// const PlaySound = async (soundName) => {
//   try {
//     const path = await getSoundPath(soundName);
//     console.log(path);
//     if (path) {
//       const { sound } = await Audio.Sound.createAsync(path);
//       sound.playAsync();
//     } else {
//       return;
//     }
//   } catch (error) {
//     console.log("error while playing sound", error);
//   }
// };

// const getSoundPath = (soundName) => {
//   switch (soundName) {
//     case "ting":
//       return require("../assets/sfx/ting.mp3");
//     case "ting 2":
//       return require("../assets/sfx/ting2.mp3");
//     case "motivation":
//       return require("../assets/sfx/motivation.mp3");
//     case "meditation":
//       return require("../assets/sfx/meditation.mp3");
//     case "laugh":
//       return require("../assets/sfx/laugh.mp3");
//     case "notification":
//       return require("../assets/sfx/notification.mp3");
//     default:
//       throw new Error(`Sound ${soundName} not available`);
//   }
// };
// export default PlaySound;

//code for tts package

import Tts from 'react-native-tts';

export const initializeTtsListeners = async () => {
  Tts.getInitStatus().then(
    e => {
      console.log('All Ok TTS');
    },
    err => {
      if (err.code === 'no_engine') {
        console.log('No Engine TTS ');
        Tts.requestInstallEngine();
      }
    },
  );

  //   const voices= await Tts.voices()
  //   console.log("This are Voices Available",voices);
  Tts.setDefaultVoice('hi-in-x-hic-network');
//   Tts.setDefaultRate(0.3, true);
//   Tts.setDefaultPitch(1.5);
  Tts.setIgnoreSilentSwitch('ignore');
  // Tts.addEventListener('tts-start', event => console.log('start', event));
//   Tts.addEventListener('tts-progress', event => console.log('progress', event));
  // Tts.addEventListener('tts-finish', event => console.log('finish', event));
  // Tts.addEventListener('tts-cancel', event => console.log('cancel', event));
};

export const SpeakTTS=async(msg)=>{
 try {
   Tts.getInitStatus().then(
     e => {
       console.log('All Ok TTS');
     },
     err => {
       if (err.code === 'no_engine') {
         console.log('No Engine TTS ');
         Tts.requestInstallEngine();
       }
     },
   );
   Tts.speak(msg);
 } catch (error) {
  console.log("Error in: " + error)
  
 }

}

