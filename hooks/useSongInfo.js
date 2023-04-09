import { useEffect ,useState} from "react";
import useSpotify from "./useSpotify";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "@/atoms/songAtoms";


const useSongInfo = () => {
    const spotifyApi=useSpotify();
    const [currentIdTrack,setCurrentIdTrack]=useRecoilState(currentTrackIdState);
    const [songInfo,setSongInfo]=useState(null);
    console.log("Token",spotifyApi.getAccessToken());

    useEffect(()=>{
        const fetchSongInfo =async () => {
            if(currentIdTrack){
                 // check if access token has expired

                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers:{
                            Authorization:`Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then(res => res.json());

                setSongInfo(trackInfo);
            }
        }
        fetchSongInfo();
    },[currentIdTrack,spotifyApi]);
    return songInfo;
};

export default useSongInfo;