import { Dom } from "../core/dom";

export interface Selection {
    current: Dom | null;
    clear: () => void;
    select: ($elem: Dom) => void;
    selectGroup: ($group: Dom[]) => void;
    applyStyle: (style: any) => void;
    selectedIds: () => any;
}