import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Welcome from './pages/welcome';
import Data from './pages/data';
import Samplesignup from './pages/SampleSIgnup';
import Login from './pages/login';
import CodeEditorBase from './pages/CodeEditor';
import PyCodeEditorBase from './pages/pyeditorbase';
import JavaCodeEditorBase from './pages/javacodeeditorbase';
import Chatroom from './pages/chatroom';
import UserProfile from './pages/profile';
import About from './pages/about';
import CppCodeEditorBase from './pages/cppcodeeditorbase';
import CcodeEditorBase from './pages/C-codeeditorbase';
import TypescriptCodeEditorBase from './pages/typescriptBaseeditor';
import CsharpcodeEditorBase from './pages/Csharpcodeeditorbase';
import Createnotes from './pages/createNotes';
import Note from './components/notes';
import VideoCall from './pages/videoCall';


function App() {


  return (
    <Routes>
      <Route path="/" element={<Welcome/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="*" element={<NoPage />} />
      <Route path="/data" element={<Data />} />
      <Route path="/Samplesignup" element={<Samplesignup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/codeeditor" element={<CodeEditorBase />} />
      <Route path="/pycodeeditor" element={<PyCodeEditorBase />} />
      <Route path="/chatroom" element={<Chatroom />} />
      <Route path="/userprofile" element={<UserProfile/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/javaeditor" element={<JavaCodeEditorBase/>} />
      <Route path="/cppeditor" element={<CppCodeEditorBase/>} />
      <Route path="/c-editor" element={<CcodeEditorBase/>} />
      <Route path="/typescripteditor" element={<TypescriptCodeEditorBase/>} />
      <Route path="/Csharpeditor" element={<CsharpcodeEditorBase/>} />
      <Route path="/createnotes" element={<Createnotes/>} />
      <Route path="/note" element={<Note/>} />
      <Route path="/videocall" element={<VideoCall/>} />

    </Routes>
  
  );
}

export default App;
