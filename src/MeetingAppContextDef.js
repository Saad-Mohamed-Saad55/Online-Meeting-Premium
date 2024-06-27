/*import { useContext, createContext, useState, useEffect, useRef } from "react";

export const MeetingAppContext = createContext();

export const useMeetingAppContext = () => useContext(MeetingAppContext);

export const MeetingAppProvider = ({ children }) => {
  const [selectedMic, setSelectedMic] = useState({ id: null, label: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null, label: null });
  const [selectedSpeaker, setSelectedSpeaker] = useState({ id: null, label: null });
  const [isCameraPermissionAllowed, setIsCameraPermissionAllowed] = useState(null);
  const [isMicrophonePermissionAllowed, setIsMicrophonePermissionAllowed] = useState(null);
  const [raisedHandsParticipants, setRaisedHandsParticipants] = useState([]);
  const [sideBarMode, setSideBarMode] = useState(null);
  const [pipMode, setPipMode] = useState(false);

  const useRaisedHandParticipants = () => {
    const raisedHandsParticipantsRef = useRef();

    const participantRaisedHand = (participantId) => {
      const raisedHandsParticipants = [...raisedHandsParticipantsRef.current];

      const newItem = { participantId, raisedHandOn: new Date().getTime() };

      const participantFound = raisedHandsParticipants.findIndex(
        ({ participantId: pID }) => pID === participantId
      );

      if (participantFound === -1) {
        raisedHandsParticipants.push(newItem);
      } else {
        raisedHandsParticipants[participantFound] = newItem;
      }

      setRaisedHandsParticipants(raisedHandsParticipants);
    };

    useEffect(() => {
      raisedHandsParticipantsRef.current = raisedHandsParticipants;
    }, [raisedHandsParticipants]);

    const _handleRemoveOld = () => {
      const raisedHandsParticipants = [...raisedHandsParticipantsRef.current];

      const now = new Date().getTime();

      const persisted = raisedHandsParticipants.filter(({ raisedHandOn }) => {
        return parseInt(raisedHandOn) + 15000 > parseInt(now);
      });

      if (raisedHandsParticipants.length !== persisted.length) {
        setRaisedHandsParticipants(persisted);
      }
    };

    useEffect(() => {
      const interval = setInterval(_handleRemoveOld, 1000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return { participantRaisedHand };
  };

  return (
    <MeetingAppContext.Provider
      value={{
        // states

        raisedHandsParticipants,
        selectedMic,
        selectedWebcam,
        selectedSpeaker,
        sideBarMode,
        pipMode,
        isCameraPermissionAllowed,
        isMicrophonePermissionAllowed,

        // setters

        setRaisedHandsParticipants,
        setSelectedMic,
        setSelectedWebcam,
        setSelectedSpeaker,
        setSideBarMode,
        setPipMode,
        useRaisedHandParticipants,
        setIsCameraPermissionAllowed,
        setIsMicrophonePermissionAllowed,
      }}
    >
      {children}
    </MeetingAppContext.Provider>
  );
};
*/

import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";

export const MeetingAppContext = createContext();

export const useMeetingAppContext = () => useContext(MeetingAppContext);

export const MeetingAppProvider = ({ children }) => {
  const [selectedMic, setSelectedMic] = useState({ id: null, label: null });
  const [selectedWebcam, setSelectedWebcam] = useState({
    id: null,
    label: null,
  });
  const [selectedSpeaker, setSelectedSpeaker] = useState({
    id: null,
    label: null,
  });
  const [isCameraPermissionAllowed, setIsCameraPermissionAllowed] =
    useState(null);
  const [isMicrophonePermissionAllowed, setIsMicrophonePermissionAllowed] =
    useState(null);
  const [raisedHandsParticipants, setRaisedHandsParticipants] = useState([]);
  const [sideBarMode, setSideBarMode] = useState(null);
  const [pipMode, setPipMode] = useState(false);

  const useRaisedHandParticipants = () => {
    const raisedHandsParticipantsRef = useRef(raisedHandsParticipants);

    const participantRaisedHand = (participantId) => {
      const updatedRaisedHands = [...raisedHandsParticipantsRef.current];

      const participantIndex = updatedRaisedHands.findIndex(
        ({ participantId: pID }) => pID === participantId
      );

      if (participantIndex === -1) {
        updatedRaisedHands.push({
          participantId,
          raisedHandOn: new Date().getTime(),
        });
      } else {
        updatedRaisedHands[participantIndex] = {
          participantId,
          raisedHandOn: new Date().getTime(),
        };
      }

      setRaisedHandsParticipants(updatedRaisedHands);
    };

    useEffect(() => {
      raisedHandsParticipantsRef.current = raisedHandsParticipants;
    });

    useEffect(() => {
      const timer = setInterval(() => {
        const updatedRaisedHands = raisedHandsParticipantsRef.current.filter(
          ({ raisedHandOn }) =>
            parseInt(raisedHandOn) + 15000 > new Date().getTime()
        );
        setRaisedHandsParticipants(updatedRaisedHands);
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    return { participantRaisedHand };
  };

  return (
    <MeetingAppContext.Provider
      value={{
        raisedHandsParticipants,
        selectedMic,
        selectedWebcam,
        selectedSpeaker,
        sideBarMode,
        pipMode,
        isCameraPermissionAllowed,
        isMicrophonePermissionAllowed,
        setRaisedHandsParticipants,
        setSelectedMic,
        setSelectedWebcam,
        setSelectedSpeaker,
        setSideBarMode,
        setPipMode,
        useRaisedHandParticipants,
        setIsCameraPermissionAllowed,
        setIsMicrophonePermissionAllowed,
      }}
    >
      {children}
    </MeetingAppContext.Provider>
  );
};