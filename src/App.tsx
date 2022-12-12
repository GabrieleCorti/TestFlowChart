import { useCallback, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  OnConnect,
  Node,
  NodeTypes,
  NodeProps,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data }: NodeProps<any>) {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
    </>
  );
}
function makeOnClick(onClick: (step: string) => unknown) {
  return function NextStepNode({
    data: { label },
  }: NodeProps<{ label: string }>) {
    return (
      <>
        <div
          style={{
            border: "1px solid #DEDEDE",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            maxWidth: "150px",
            minWidth: "100px",
            backgroundColor: "white",
          }}
        >
          <span style={{ fontSize: "20px" }}>{label}</span>
          <button
            onClick={() => onClick(label)}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "40px",
              backgroundColor: "lightGreen",
              color: "white",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            go
          </button>
        </div>
        <Handle type="target" position={Position.Left} />
      </>
    );
  };
}
function CurrentStepNode({
  data: { label, onClick },
}: NodeProps<{ onClick: (step: string) => unknown; label: string }>) {
  return (
    <>
      <Handle type="source" position={Position.Right} />
      <div
        style={{
          border: "1px solid #DEDEDE",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          maxWidth: "150px",
          minWidth: "100px",
          backgroundColor: "white",
        }}
      >
        <button
          onClick={() => onClick(label)}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "40px",
            backgroundColor: "lightGreen",
            color: "white",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          back
        </button>
        <span style={{ fontSize: "20px" }}>{label}</span>
      </div>
      <Handle type="target" position={Position.Left} />
    </>
  );
}
function HistoryNode({
  data: { label, onClick },
}: NodeProps<{ onClick: (step: string) => unknown; label: string }>) {
  return (
    <>
      <Handle type="source" position={Position.Right} />
      <div
        style={{
          border: "1px solid #DEDEDE",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          maxWidth: "150px",
          minWidth: "100px",
          backgroundColor: "white",
        }}
      >
        <button
          onClick={() => onClick(label)}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "40px",
            backgroundColor: "lightYellow",
            color: "white",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          i
        </button>
        <span style={{ fontSize: "20px" }}>{label}</span>
      </div>
      <Handle type="target" position={Position.Left} />
    </>
  );
}

const initialNodes: Node<any>[] = [
  {
    id: "1",
    position: { x: 20, y: 100 },
    data: {
      label: "stato corrente",
      onClick: (v: string) => console.log(v),
    },
    type: "historyPassage",
  },
  {
    id: "2",
    position: { x: 250, y: 100 },
    data: {
      label: "stato corrente",
      onClick: (v: string) => console.log(v),
    },
    type: "currentPassage",
  },
  {
    id: "3",
    position: { x: 480, y: 50 },
    data: {
      label: "prossimo passaggio 1",
      onClick: (v: string) => console.log(v),
    },
    type: "nextPassage",
  },
  {
    id: "4",
    position: { x: 480, y: 150 },
    data: {
      label: "prossimo passaggio 2",
      onClick: (v: string) => console.log(v),
    },
    type: "nextPassage",
  },
  {
    id: "5",
    position: { x: 480, y: 250 },
    data: {
      label: "prossimo passaggio 3",
      onClick: (v: string) => console.log(v),
    },
    type: "nextPassage",
  },
  {
    id: "6",
    position: { x: 480, y: 350 },
    data: {
      label: "prossimo passaggio 4",
      onClick: (v: string) => console.log(v),
    },
    type: "nextPassage",
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e2-6", source: "2", target: "6" },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      position: { x: 20, y: 100 },
      data: {
        label: "stato corrente",
        onClick: (v: string) => console.log(v),
      },
      type: "historyPassage",
    },
    {
      id: "2",
      position: { x: 250, y: 100 },
      data: {
        label: "stato corrente",
        onClick: (v: string) => console.log(v),
      },
      type: "currentPassage",
    },
    {
      id: "3",
      position: { x: 480, y: 50 },
      data: {
        label: "prossimo passaggio 1",
        onClick: (v: string) => console.log(v),
      },
      type: "nextPassage",
    },
    {
      id: "4",
      position: { x: 480, y: 150 },
      data: {
        label: "prossimo passaggio 2",
        onClick: (v: string) => console.log(v),
      },
      type: "nextPassage",
    },
    {
      id: "5",
      position: { x: 480, y: 250 },
      data: {
        label: "prossimo passaggio 3",
        onClick: (v: string) => console.log(v),
      },
      type: "nextPassage",
    },
    {
      id: "6",
      position: { x: 480, y: 350 },
      data: {
        label: "prossimo passaggio 4",
        onClick: (v: string) => console.log(v),
      },
      type: "nextPassage",
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(
    () => ({
      historyPassage: HistoryNode,
      currentPassage: CurrentStepNode,
      nextPassage: makeOnClick((t) => {
        const id = String(Date.now());
        let nodeCopy: Node<{
          label: string;
          onClick: (v: string) => void;
        }>[] = [];
        setNodes((prev) => {
          nodeCopy = [...prev];
          const oldCurrentNodeIndex = nodeCopy.findIndex(
            (n) => n.type === "currentPassage"
          );
          if (oldCurrentNodeIndex === -1) {
            return prev;
          }
          nodeCopy[oldCurrentNodeIndex] = {
            ...nodeCopy[oldCurrentNodeIndex],
            type: "historyPassage",
            data: {
              label: "vecchi passaggio",
              onClick: console.log,
            },
          };
          return [
            ...nodeCopy,
            {
              id,
              position: {
                x: nodeCopy[oldCurrentNodeIndex].position.x + 60,
                y: nodeCopy[oldCurrentNodeIndex].position.y,
              },
              data: {
                label: "passaggio corrente",
                onClick: (v: string) => console.log(v),
              },
              type: "currentPassage",
            },
          ];
        });
        const runtimeEdge = nodeCopy
          .filter((e) => e.type === "historyPassage")
          .map((e) => Number(e.id))
          .sort()
          .map((e, i, arr) => {
            const nextElement = arr[i + 1];
            if (!nextElement) {
              return { id: `el${e}-${id}`, source: String(e), target: id };
            }
            return {
              id: `el${e}-${nextElement}`,
              source: String(e),
              target: String(nextElement),
            };
          });
        setEdges([
          ...runtimeEdge,
          { id: `el${id}-3`, source: id, target: "3" },
          { id: `el${id}-4`, source: id, target: "4" },
          { id: `el${id}-5`, source: id, target: "5" },
          { id: `el${id}-6`, source: id, target: "6" },
        ]);
      }),
    }),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default App;
