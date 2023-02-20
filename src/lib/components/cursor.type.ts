type Cursor2DKind =
| "alias"
| "all-scroll"
| "auto"
| "cell"
| "context-menu"
| "col-resize"
| "copy"
| "crosshair"
| "default"
| "e-resize"
| "ew-resize"
| "grab"
| "grabbing"
| "help"
| "move"
| "n-resize"
| "ne-resize"
| "nesw-resize"
| "ns-resize"
| "nw-resize"
| "nwse-resize"
| "no-drop"
| "none"
| "not-allowed"
| "pointer"
| "progress"
| "row-resize"
| "s-resize"
| "se-resize"
| "sw-resize"
| "text"
| "w-resize"
| "wait"
| "zoom-in"
| "zoom-out";

type Cursor3DKind = 
'default-3D-cursor'
| 'hover-3D-cursor'
| 'minus-3D-cursor'
| 'plus-3D-cursor'

export type { Cursor2DKind, Cursor3DKind };
