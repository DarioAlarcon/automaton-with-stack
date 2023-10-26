
class State {
    constructor(name, isAccepting) {
        this.name = name;
        this.isAccepting = isAccepting;
    }
}

class Transition {
    constructor(fromState, toState, symbol) {
        this.fromState = fromState;
        this.toState = toState;
        this.symbol = symbol;
    }
}

class Automaton {
    constructor(states, transitions, initialState) {
        this.states = states;
        this.transitions = transitions;
        this.currentState = initialState;
    }

    processInput(input) {
        for (var i = 0; i < input.length; i++) {
            const symbol = input[i];
            const transition = this.transitions.find(t => t.fromState === this.currentState && t.symbol === symbol);
            if (!transition) {
                this.currentState=q0
                return false; 
            }
            this.currentState = transition.toState;
            console.log(symbol)
        }
        var result= this.currentState.isAccepting;
        this.currentState=q0
         return result;
    }
}


const q0  = new State('q0', false);
const q1  = new State('q1', true);
const q2  = new State('q2', false);
const q3  = new State('q3', false);
const q4  = new State('q4', true);
const q5  = new State('q5', false);
const q6  = new State('q6', false);
const q7  = new State('q7', true);
const q8  = new State('q8', false);
const q9  = new State('q9', false);
const q10 = new State('q10', true);
const q11 = new State('q11', true);
const q12 = new State('q12', false);
const q13 = new State('q13', true);
const q14 = new State('q14', false);
const q15 = new State('q15', true);
const q16 = new State('q16', false)

const transitions = [
    new Transition("q0",  "q1",  'a'),
    new Transition("q1",  "q2",  'b'),
    new Transition("q2",  "q3",  'b'),
    new Transition("q3",  "q4",  'a'),
    new Transition("q4",  "q5",  'b'),
    new Transition("q5",  "q6",  'b'),
    new Transition("q6",  "q7",  'a'),
    new Transition("q7",  "q8",  'b'),
    new Transition("q8",  "q9",  'b'),
    new Transition("q9",  "q10", 'a'),
    new Transition("q2",  "q11", 'a'),
    new Transition("q11", "q12", 'b'),
    new Transition("q12", "q13", 'a'),
    new Transition("q13", "q14", 'b'),
    new Transition("q14", "q15", 'a'),
    new Transition("q5",  "q13", 'a'),
    new Transition("q12", "q6",  'b'),
    new Transition("q8",  "q15", 'a'),
    new Transition("q14", "q9",  'b'),
];

const states = [q0, q1, q2, q3, q4, q5, q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16];
const initialState = states.find((state) => state.name === "q0");
const automaton = new Automaton(states, transitions, initialState);


//************************************************************************************************************************************************* */


//******************************************************************************************************************************************************************** */


//*************************************************************************************************************************************************************************** */

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//**************************************************************************************************************************************************************** */
function createHistoryTileItem(userWord){
    const newParagraph = document.createElement('p');
    newParagraph.classList.add('historial-tile'); 
    newParagraph.textContent = userWord;
    return newParagraph;
}

function createHistoryTileSpan(isValidate){
    const newSpan = document.createElement('span');
    if(isValidate){
        newSpan.classList.add('w-validated');
        newSpan.textContent = 'V'
    }else{
        newSpan.classList.add('w-rejected');
        newSpan.textContent = 'R'
    };
    return newSpan;
}

function insertSpanInParagraph(paragraph, span){
    paragraph.appendChild(span);
}

function insertParagraphIntoDOM(paragraph){
    const container = document.getElementById('historial-list');
    container.appendChild(paragraph);
}

function createHistoryTile(userWord, isValidate){
    var historyTile = createHistoryTileItem(userWord);
    var historyTileSpan = createHistoryTileSpan(isValidate);
    insertSpanInParagraph(historyTile,historyTileSpan);
    insertParagraphIntoDOM(historyTile)
    
  
    saveToDatabase(userWord, isValidate);
}

function researchHistoryTile(userWord, isValidate){
  var historyTile = createHistoryTileItem(userWord);
  var historyTileSpan = createHistoryTileSpan(isValidate);
  insertSpanInParagraph(historyTile,historyTileSpan);
  insertParagraphIntoDOM(historyTile)
  
}

function saveToDatabase(userWord, isValidate) {
  fetch('http://127.0.0.1:5000/guardar_historial', {
      method: 'POST',
      body: new URLSearchParams({ userWord, isValidate }),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
  });
}

async function retrieveHistoryData() {
  const response = await fetch('http://127.0.0.1:5000/obtener_historial');
  const historial = await response.json();
  console.log(historial)
  return historial ;
}


function displayHistoryData(historyData) {
  console.log(historyData);
  for (const item of historyData) {
    const userWord = item[0];
    const isValidate = item[1];
    console.log(userWord, isValidate);
    researchHistoryTile(userWord, JSON.parse(isValidate));
  }
}


 async function initializePage() {
  const historyData =  await retrieveHistoryData();
  console.log(historyData) // Await the data
  displayHistoryData(historyData);
}

window.addEventListener('load', initializePage);

/*function retrieveHistoryData() {
  return JSON.parse(localStorage.getItem('historyData')) || [];
}*/
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const $ = go.GraphObject.make;

const myDiagram = $(go.Diagram, "myDiagram", {
    initialContentAlignment: go.Spot.Center,
    "undoManager.isEnabled": true
});

myDiagram.nodeTemplate =
    $(go.Node, "Auto",
        {movable: false},
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Circle", 
            { width: 30, height: 30, strokeWidth: 2 },
            {  fill:  "white" },
            new go.Binding("stroke", "color"),
            new go.Binding("fill", "isSelected", (s, obj) => s ? "#BEAEE2" : "white").ofObject()
            ),
        $(go.TextBlock, 
            { margin: 10 },  
            new go.Binding("text", "name")  
        )
    );

myDiagram.model.addNodeData({ key: "_",  name: "" , color: "transparent", loc: "-1100 -10" });
myDiagram.model.addNodeData({ key: "q0",  name: "q0" , color: "purple", loc: "-1030 -10" });
myDiagram.model.addNodeData({ key: "q1",  name: "q1" , color: "red",   loc: "-960 -10"  });
myDiagram.model.addNodeData({ key: "q2",  name: "q2" , color: "purple", loc: "-890 -10"  });
myDiagram.model.addNodeData({ key: "q3",  name: "q3" , color: "purple", loc: "-820 -10"  });
myDiagram.model.addNodeData({ key: "q4",  name: "q4" , color: "red",   loc: "-750 -10"  });
myDiagram.model.addNodeData({ key: "q5",  name: "q5" , color: "purple", loc: "-680 -10"  });
myDiagram.model.addNodeData({ key: "q6",  name: "q6" , color: "purple", loc: "-610 -10"  });
myDiagram.model.addNodeData({ key: "q7",  name: "q7" , color: "red",   loc: "-540 -10"  });
myDiagram.model.addNodeData({ key: "q8",  name: "q8" , color: "purple", loc: "-470 -10"  });
myDiagram.model.addNodeData({ key: "q9",  name: "q9" , color: "purple", loc: "-400 -10"  });
myDiagram.model.addNodeData({ key: "q10", name: "q10", color: "red",   loc: "-330 -10"     });
myDiagram.model.addNodeData({ key: "q11", name: "q11", color: "red",   loc: "-855 50"   });
myDiagram.model.addNodeData({ key: "q12", name: "q12", color: "purple", loc: "-785 100"  });
myDiagram.model.addNodeData({ key: "q13", name: "q13", color: "red",   loc: "-715 150"  });
myDiagram.model.addNodeData({ key: "q14", name: "q14", color: "purple", loc: "-645 200"  });
myDiagram.model.addNodeData({ key: "q15", name: "q15", color: "red",   loc: "-575 250"  });

myDiagram.model.addNodeData({ key: "T1", color:"transparent", loc: "-995 -10"  });
myDiagram.model.addNodeData({ key: "T2", color:"transparent", loc: "-925 -10"  });
myDiagram.model.addNodeData({ key: "T3", color:"transparent", loc: "-855 -10"  });
myDiagram.model.addNodeData({ key: "T4", color:"transparent", loc: "-785 -10"  });
myDiagram.model.addNodeData({ key: "T5", color:"transparent", loc: "-715 -10"  });
myDiagram.model.addNodeData({ key: "T6", color:"transparent", loc: "-645 -10"  });
myDiagram.model.addNodeData({ key: "T7", color:"transparent", loc: "-575 -10"  });
myDiagram.model.addNodeData({ key: "T8", color:"transparent", loc: "-505 -10"  });
myDiagram.model.addNodeData({ key: "T9", color:"transparent", loc: "-435 -10"  });
myDiagram.model.addNodeData({ key: "T10", color:"transparent", loc: "-365 -10"  });
myDiagram.model.addNodeData({ key: "T11", color:"transparent", loc: "-872 20"  });
myDiagram.model.addNodeData({ key: "T12", color:"transparent", loc: "-820 75"  });
myDiagram.model.addNodeData({ key: "T13", color:"transparent", loc: "-750 125"  });
myDiagram.model.addNodeData({ key: "T14", color:"transparent", loc: "-680 175"  });
myDiagram.model.addNodeData({ key: "T15", color:"transparent", loc: "-610 222"  });
myDiagram.model.addNodeData({ key: "T16", color:"transparent", loc: "-697 40"  });
myDiagram.model.addNodeData({ key: "T17", color:"transparent", loc:  "-695 70" });
myDiagram.model.addNodeData({ key: "T18", color:"transparent",  loc: "-522 90"  });
myDiagram.model.addNodeData({ key: "T19", color:"transparent", loc:  "-520 120" });

myDiagram.linkTemplate =
    $(go.Link,
        $(go.Shape, { 
        stroke: "gray"},
        new go.Binding("stroke", "isHighlighted", fla => fla ? "red" : "gray")
    ),
        $(go.Shape, { toArrow: "Standard" }),
        $(go.Panel, "Auto",  
          $(go.Shape,  
            {
              fill: $(go.Brush, "Radial",
                { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
              stroke: null
            },
            ),
            
          $(go.TextBlock, "",  // the label text
            {
              textAlign: "center",
              font: "10pt helvetica, arial, sans-serif",
              stroke: "black",
              margin: 4, 
            },
            new go.Binding("text", "text").makeTwoWay()),
          new go.Binding("segmentOffset", "segmentOffset", go.Point.parse).makeTwoWay(go.Point.stringify)
        )
            
    );

myDiagram.model.addLinkData({ from: "_",  to: "q0"  });
myDiagram.model.addLinkData({ from: "q0",  to: "q1"  , text: "a", key:"T1"});
myDiagram.model.addLinkData({ from: "q1",  to: "q2"  , text: "b", key:"T2"});
myDiagram.model.addLinkData({ from: "q2",  to: "q3"  , text: "b", key:"T3"});
myDiagram.model.addLinkData({ from: "q3",  to: "q4"  , text: "a", key:"T4"});
myDiagram.model.addLinkData({ from: "q4",  to: "q5"  , text: "b", key:"T5"});
myDiagram.model.addLinkData({ from: "q5",  to: "q6"  , text: "b", key:"T6"});
myDiagram.model.addLinkData({ from: "q6",  to: "q7"  , text: "a", key:"T7"});
myDiagram.model.addLinkData({ from: "q7",  to: "q8"  , text: "b", key:"T8"});
myDiagram.model.addLinkData({ from: "q8",  to: "q9"  , text: "b", key:"T9"});
myDiagram.model.addLinkData({ from: "q9",  to: "q10" , text: "a", key:"T10"});
myDiagram.model.addLinkData({ from: "q2",  to: "q11" , text: "a", key:"T11"});
myDiagram.model.addLinkData({ from: "q11", to: "q12" , text: "b", key:"T12"});
myDiagram.model.addLinkData({ from: "q12", to: "q13" , text: "a", key:"T13"});
myDiagram.model.addLinkData({ from: "q13", to: "q14" , text: "b", key:"T14"});
myDiagram.model.addLinkData({ from: "q14", to: "q15" , text: "a", key:"T15"});
myDiagram.model.addLinkData({ from: "q12", to: "q6"  , text: "b", key:"T16"});
myDiagram.model.addLinkData({ from: "q5",  to: "q13" , text: "a", key:"T17"});
myDiagram.model.addLinkData({ from: "q14", to: "q9"  , text: "b", key:"T18"});
myDiagram.model.addLinkData({ from: "q8",  to: "q15" , text: "a", key:"T19"});


async function showCurrentNodeGraph(key) {
    const currentNode = myDiagram.findNodeForKey(key);
    selectNode(currentNode);
    await sleep(1000);
    deselectNode(currentNode);
  }
  
  function selectNode(node) {
    node.isSelected = true;
  }
  
  function deselectNode(node) {
    node.isSelected = false;
  }


function highlightLinkBetweenNodes(startNodeKey, endNodeKey) {
    const linkDataArray = myDiagram.model.linkDataArray;
    for (let i = 0; i < linkDataArray.length; i++) {
      const linkData = linkDataArray[i];
      console.log(linkData)
      if (linkData.from === startNodeKey && linkData.to === endNodeKey) {
        return linkData.key; 
      }
    }
  }
/************************************************************************************************************************************************************************** */
const selectLanguageDom = document.getElementById('languanges-select')

selectLanguageDom.addEventListener('change', handleLanguageChange )

function handleLanguageChange(){
    var selectedLanguage = selectLanguageDom.value;
    changeLanguage(selectedLanguage);
}

function get_speed(){
    const slider = document.getElementById("slider");
    const tiempoSeleccionado = parseFloat(slider.value) * 1000; 
    return tiempoSeleccionado;
}

document.addEventListener("DOMContentLoaded", function() {
    changeLanguage('en');
    var botton = document.getElementById("word-button");
    var input = document.getElementById("word-text");


    botton.addEventListener("click", handleButtonClick);

    function handleButtonClick() {
        const valorInput = input.value;
        displayExpression(valorInput);
        clearInput();
        processString(valorInput);
      }
      
    function displayExpression(expression) {
        const expressionElement = document.getElementById('word-checking');
        expressionElement.innerText = expression;
      }
      
    function clearInput() {
        input.value = '';
      }

      async function processString(wordToValidate) {
        automaton.currentState = initialState; 
        for (let index = 0; index < wordToValidate.length; index++) {
          const symbolSpan = document.getElementById('symbol-checking')
          const symbolOrderSpan = document.getElementById('symbol-checking-number')
          const symbol = wordToValidate[index];
          const symbolOrder = index + 1;
          const transition = automaton.transitions.find(
            (t) => t.fromState === automaton.currentState.name && t.symbol === symbol
          );
          showCurrentNodeGraph(automaton.currentState.name)
          await sleep(get_speed());
          symbolSpan.innerText = symbol;
          symbolOrderSpan.innerText = symbolOrder;
          if (transition) {
            var keyNodeTransiction=highlightLinkBetweenNodes(automaton.currentState.name,transition.toState)
            showCurrentNodeGraph(keyNodeTransiction)
            automaton.currentState = states.find(
              (state) => state.name === transition.toState
              );
          } else {
            automaton.currentState = initialState;
          }
      
          await sleep(get_speed());
      
          if (!transition) {
            speakResult(false);
            createHistoryTile(wordToValidate, false);
            return;
          }
        }
      
        showCurrentNodeGraph(automaton.currentState.name)
        speakResult(automaton.currentState.isAccepting);
        createHistoryTile(wordToValidate, automaton.currentState.isAccepting);
        
    }
      
});
