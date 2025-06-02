import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:5000");

const VideoCall = () => {
    const location = useLocation();
    const { username: targetUsername } = new URLSearchParams(location.search); // Get the target username from URL params
    const localVideo = useRef();
    const remoteVideo = useRef();
    const peerConnection = useRef(null);
    const [isCalling, setIsCalling] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null);

    const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            localVideo.current.srcObject = stream;
        });

        socket.on("incoming_call", ({ from, callerName, offer }) => {
            setIncomingCall({ from, callerName, offer });
        });

        socket.on("call_answered", async ({ answer }) => {
            await peerConnection.current.setRemoteDescription(answer);
        });

        socket.on("ice_candidate", async ({ candidate }) => {
            if (candidate) {
                await peerConnection.current.addIceCandidate(candidate);
            }
        });
    }, []);

    const callUser = async (targetUsername) => {
        setIsCalling(true);

        peerConnection.current = new RTCPeerConnection(servers);

        // Stream tracks
        const localStream = localVideo.current.srcObject;
        localStream.getTracks().forEach((track) => {
            peerConnection.current.addTrack(track, localStream);
        });

        peerConnection.current.ontrack = (event) => {
            remoteVideo.current.srcObject = event.streams[0];
        };

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice_candidate", { to: targetUsername, candidate: event.candidate });
            }
        };

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        socket.emit("call_user", {
            to: targetUsername,
            offer,
            callerName: "Shivansh", // Replace with dynamic caller name if needed
        });
    };

    const acceptCall = async () => {
        setIncomingCall(null);

        peerConnection.current = new RTCPeerConnection(servers);

        const localStream = localVideo.current.srcObject;
        localStream.getTracks().forEach((track) => {
            peerConnection.current.addTrack(track, localStream);
        });

        peerConnection.current.ontrack = (event) => {
            remoteVideo.current.srcObject = event.streams[0];
        };

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice_candidate", {
                    to: incomingCall.from,
                    candidate: event.candidate,
                });
            }
        };

        await peerConnection.current.setRemoteDescription(incomingCall.offer);
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);

        socket.emit("answer_call", { to: incomingCall.from, answer });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h2 className="text-xl mb-4">Video Call Room</h2>

            <div className="flex gap-4">
                <video ref={localVideo} autoPlay playsInline muted className="w-64 h-48 bg-black" />
                <video ref={remoteVideo} autoPlay playsInline className="w-64 h-48 bg-black" />
            </div>

            {incomingCall && (
                <div className="mt-4 p-4 bg-blue-700 rounded">
                    <p>{incomingCall.callerName} is calling...</p>
                    <button
                        onClick={acceptCall}
                        className="mt-2 p-2 bg-green-500 rounded hover:bg-green-600"
                    >
                        Accept
                    </button>
                </div>
            )}

            {!isCalling && (
                <button
                    onClick={() => callUser(targetUsername)} // Use targetUsername from URL params
                    className="mt-4 p-2 bg-blue-500 rounded hover:bg-blue-600"
                >
                    Call {targetUsername}
                </button>
            )}
        </div>
    );
};

export default VideoCall;
