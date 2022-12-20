import { useEffect, useRef, useState, React} from 'react'
import './App.css'
import myToolbox from './assets/toolbox'

import * as Blockly from 'blockly'
import * as local from 'blockly/msg/zh-hans';
import {luaGenerator} from 'blockly/lua';
Blockly.setLocale(local)

var effect = true;

function App() {
  const blocklyDiv = useRef();
  let workSpace = useRef();
  const [code, setCode] = useState("");

  const generateCode = () => {
    setCode(luaGenerator.workspaceToCode(workSpace.current));
  }

  useEffect(() => {
    if (effect) {
      effect = false;
      workSpace.current = Blockly.inject(
        blocklyDiv.current,
        {
          toolbox: myToolbox,
          trashcan: true
        }
      );
    }
  }, [workSpace, blocklyDiv]);

  return (
    <>
      <div ref={blocklyDiv} id='blocklyDiv'></div>
      <div id='right'>
        <h1>Lua Code</h1>
        <pre id='codeView'>{code}</pre>
        <button onClick={generateCode} id='codeGen'>Generate Code</button>
      </div>
    </>
  );
}

export default App
